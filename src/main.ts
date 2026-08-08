import "../css/normalize.min.css";
import "../css/fontgoogle.css";
import "../css/local_pt.css";
import "../css/style.css";
import "../css/colorbox.css";
import "../css/flags.css";

type NewsDate = { Y: number; m: string; d: string };
type NewsItem = { l: string; i?: string; t: string; d: NewsDate };
type NewsResponse = NewsItem[];
type ServerNode = { online?: number; endpoint?: { status?: string } };
type ServerResponse = { nodes?: Record<string, ServerNode> };

function parseJsonObject<T>(raw: string): T {
  const start = raw.indexOf("{");
  if (start < 0) throw new Error("Response does not contain JSON");
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let index = start; index < raw.length; index += 1) {
    const character = raw[index];
    if (inString) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === "\"") inString = false;
      continue;
    }
    if (character === "\"") {
      inString = true;
    } else if (character === "{") {
      depth += 1;
    } else if (character === "}" && --depth === 0) {
      return JSON.parse(raw.slice(start, index + 1)) as T;
    }
  }
  throw new Error("Response contains incomplete JSON");
}

const VIDEO_IDS = [
  "IQZTK74ocxI", "PuwOU1-WPoQ", "P0IWmjhUDuE", "CZ0xOJdD-EY",
  "GSmAC_Mk498", "is_5o5O-DnI", "0KwlQHeAufs", "675gM79N3Ws",
  "OrZPdH506wM", "lq03s7eNc7w", "-IOBLiR-41A", "ssNKXje0Wks",
];

const $ = <T extends Element>(selector: string, parent: ParentNode = document): T | null =>
  parent.querySelector<T>(selector);
const $$ = <T extends Element>(selector: string, parent: ParentNode = document): T[] =>
  Array.from(parent.querySelectorAll<T>(selector));

function setupLanguageMenu(): void {
  const menu = $("#langs");
  const active = $(".js-active", menu ?? document);
  const options = $(".js-options", menu ?? document);
  if (!menu || !active || !options) return;

  const close = () => {
    menu.classList.remove("active");
    options.setAttribute("style", "display:none");
  };
  active.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = menu.classList.toggle("active");
    options.setAttribute("style", isOpen ? "display:block" : "display:none");
  });
  $$(".js-option", options).forEach((option) => {
    option.addEventListener("click", () => {
      const url = option.getAttribute("data-url");
      if (url) window.location.href = url;
    });
  });
  document.addEventListener("click", close);
  document.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Escape") close();
  });
}

function setupServerPicker(): void {
  const picker = $(".server-picker");
  const control = $(".server-picker__control", picker ?? document) as HTMLElement | null;
  const number = $(".server-picker__number", picker ?? document) as HTMLElement | null;
  if (!picker || !control || !number) return;

  const options = $$(".server-picker__option", picker) as HTMLButtonElement[];
  const setOpen = (open: boolean) => {
    picker.classList.toggle("is-open", open);
    control.setAttribute("aria-expanded", String(open));
  };
  control.setAttribute("role", "button");
  control.setAttribute("tabindex", "0");
  control.setAttribute("aria-expanded", "false");
  control.addEventListener("click", () => setOpen(!picker.classList.contains("is-open")));
  control.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      control.dispatchEvent(new MouseEvent("click"));
    }
    if (event.key === "Escape") setOpen(false);
  });
  options.forEach((option) => {
    option.addEventListener("click", () => {
      number.textContent = option.dataset.server ?? "1";
      options.forEach((item) => {
        const selected = item === option;
        item.classList.toggle("is-selected", selected);
        item.setAttribute("aria-selected", String(selected));
      });
      setOpen(false);
    });
  });
  document.addEventListener("click", (event) => {
    if (!picker.contains(event.target as Node)) setOpen(false);
  });
}

function setupCookieNotice(): void {
  const notice = $(".cookie-policy") as HTMLElement | null;
  const button = $(".cookie-ok", notice ?? document);
  if (!notice || !button || localStorage.getItem("tanki-cookie-policy")) return;
  notice.style.display = "block";
  button.addEventListener("click", () => {
    localStorage.setItem("tanki-cookie-policy", "true");
    notice.style.display = "none";
  });
}

function setupAndroidDownload(): void {
  if (!/android/i.test(navigator.userAgent)) return;
  const header = $("#top-container");
  if (!header || $("#android-download", header)) return;
  const download = document.createElement("a");
  download.id = "android-download";
  download.href = "https://redirect.appmetrica.yandex.com/serve/674334194213595588";
  download.setAttribute("aria-label", "Baixar na Google Play");
  download.style.cssText = [
    "display:block", "height:150px", "width:345px", "margin:0 auto",
    "background:url(images/google-play-btn_BR.png) no-repeat center / contain",
  ].join(";");
  header.append(download);
}

function setupVisualCarousel(): void {
  const wrapper = $(".visual__wrapper") as HTMLElement | null;
  const slides = $$(".visual__image", wrapper ?? document);
  const previous = $(".visual__button.prev");
  const next = $(".visual__button.next");
  if (!wrapper || slides.length <= 1 || !previous || !next) return;

  let current = 0;
  const render = () => {
    wrapper.style.transform = `translateX(-${current * 100}%)`;
    previous.classList.toggle("hidden", current === 0);
    next.classList.toggle("hidden", current === slides.length - 1);
  };
  previous.addEventListener("click", () => {
    current = Math.max(0, current - 1);
    render();
  });
  next.addEventListener("click", () => {
    current = Math.min(slides.length - 1, current + 1);
    render();
  });
  render();
}

function setupVideoCarousel(): void {
  const block = $("#js-video-block");
  const target = $("#ytc1", block ?? document);
  const previous = $(".video-block__button.prev", block ?? document);
  const next = $(".video-block__button.next", block ?? document);
  if (!block || !target || !previous || !next) return;

  let current = 0;
  const render = () => {
    const iframe = document.createElement("iframe");
    iframe.className = "video-block__youtube-container";
    iframe.width = "1006";
    iframe.height = "610";
    iframe.src = `https://www.youtube.com/embed/${VIDEO_IDS[current]}?wmode=opaque`;
    iframe.title = "Vídeo Tanki Online";
    iframe.allowFullscreen = true;
    iframe.setAttribute("frameborder", "0");
    target.replaceChildren(iframe);
    previous.classList.toggle("hidden", current === 0);
    next.classList.toggle("hidden", current === VIDEO_IDS.length - 1);
  };
  previous.addEventListener("click", () => {
    current = Math.max(0, current - 1);
    render();
  });
  next.addEventListener("click", () => {
    current = Math.min(VIDEO_IDS.length - 1, current + 1);
    render();
  });
  render();
}

function createNewsCard(item: NewsItem): HTMLAnchorElement {
  const card = document.createElement("a");
  card.className = "news-block__block js-block";
  card.href = item.l || "#";
  const image = document.createElement("img");
  image.className = "news-block__image";
  image.src = item.i || "images/migracao_redes-326x216.png";
  image.alt = item.t;
  const text = document.createElement("span");
  text.className = "news-block__text";
  const date = document.createElement("time");
  date.className = "time";
  date.dateTime = `${item.d.Y}-${item.d.m}-${item.d.d}`;
  date.textContent = `${item.d.d}.${item.d.m}.${item.d.Y}`;
  const title = document.createElement("span");
  title.className = "title";
  title.textContent = item.t;
  text.append(date, title);
  card.append(image, text);
  return card;
}

async function setupNewsCarousel(): Promise<void> {
  const block = $("#js-news-block") as HTMLElement | null;
  const container = $("#js-news-inner") as HTMLElement | null;
  const previous = $(".news-block__button.prev", block ?? document);
  const next = $(".news-block__button.next", block ?? document);
  if (!block || !container || !previous || !next) return;

  try {
    const response = await fetch("/br/posts/posts_30.json");
    if (!response.ok) throw new Error(`News request failed: ${response.status}`);
    const news = (await response.json()) as NewsResponse;
    container.replaceChildren(...news.map(createNewsCard));
    if (news.length <= 3) return;

    let current = 0;
    const render = () => {
      const visible = window.innerWidth < 480 ? 1 : window.innerWidth < 760 ? 2 : 3;
      const max = Math.max(0, news.length - visible);
      current = Math.min(current, max);
      container.style.transform = `translateX(-${current * (100 / visible)}%)`;
      previous.classList.toggle("hidden", current === 0);
      next.classList.toggle("hidden", current === max);
    };
    previous.addEventListener("click", () => {
      current = Math.max(0, current - 1);
      render();
    });
    next.addEventListener("click", () => {
      current += 1;
      render();
    });
    window.addEventListener("resize", render);
    render();
  } catch (error) {
    console.warn("Unable to load news", error);
    block.hidden = true;
  }
}

async function updateServerStatus(): Promise<void> {
  const active = $(".main-header__server-active") as HTMLElement | null;
  const inactive = $(".main-header__server-inactive") as HTMLElement | null;
  const online = $("#onlineNow");
  if (!active || !inactive || !online) return;
  try {
    const response = await fetch("/s/status_us.js");
    if (!response.ok) throw new Error(`Status request failed: ${response.status}`);
    const raw = await response.text();
    const data = parseJsonObject<ServerResponse>(raw);
    const nodes = Object.values(data.nodes ?? {});
    const total = nodes.reduce((sum, node) => sum + Number(node.online ?? 0), 0);
    online.textContent = total.toLocaleString("pt-BR");
    const isOnline = nodes.some((node) => node.endpoint?.status === "NORMAL");
    active.style.display = isOnline ? "" : "none";
    inactive.style.display = isOnline ? "none" : "";
  } catch (error) {
    console.warn("Unable to load server status", error);
    active.style.display = "none";
    inactive.style.display = "";
  }
}

function setupParallax(): void {
  const page = $(".page-wrapper") as HTMLElement | null;
  if (!page || !CSS.supports("transform", "translate3d(0, 0, 0)")) return;
  const background = getComputedStyle(page).backgroundImage;
  if (!background || background === "none") return;
  const layer = document.createElement("div");
  layer.id = "parallaxWrapper";
  layer.style.cssText = [
    "position:fixed", "inset:0", "height:100%", "z-index:-1",
    `background-image:${background}`, "background-position:center top",
    "background-repeat:no-repeat", "pointer-events:none",
  ].join(";");
  page.style.backgroundImage = "none";
  document.body.prepend(layer);
  const onScroll = () => {
    layer.style.transform = `translate3d(0, -${Math.max(0, window.scrollY / 2)}px, 0)`;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function removeExpiredEvent(): void {
  const event = $("#event-block");
  if (event) event.remove();
}

function init(): void {
  document.documentElement.classList.remove("no-js");
  setupLanguageMenu();
  setupServerPicker();
  setupCookieNotice();
  setupAndroidDownload();
  setupVisualCarousel();
  setupVideoCarousel();
  void setupNewsCarousel();
  void updateServerStatus();
  window.setInterval(() => void updateServerStatus(), 10_000);
  setupParallax();
  removeExpiredEvent();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}