import { useState } from "react";
import buttonGreen from "@assets/buttonGreen_1786159594596.png";
import buttonGreenOver from "@assets/buttonGreenOver_1786159594595.png";
import helpSprite from "@assets/Без_названия_1786160061065.png";
import originalLogo from "@assets/image_1786106261914.png";
import originalBackground from "@assets/image_1786106129787.png";

const base = import.meta.env.BASE_URL;

const navigation = [
  ["game", "Game"],
  ["materials", "Materials"],
  ["tournaments", "Tournaments"],
  ["forum", "Forum"],
  ["wiki", "Wiki"],
];

function Spinner() {
  return <img className="spinner" src={`${base}images/spinner.png`} alt="" />;
}

export default function App() {
  const [open, setOpen] = useState<"language" | "server" | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);
  const [fightState, setFightState] = useState(false);

  return (
    <main className="game-page" style={{ backgroundImage: `url(${originalBackground})` }}>
      <header className="topbar">
        <nav className="topnav" aria-label="Main navigation">
          {navigation.map(([icon, label], index) => (
            <button
              className={index === 0 ? "nav-item active" : "nav-item"}
              key={label}
              type="button"
              onClick={() => window.scrollTo({ top: index ? 340 : 0, behavior: "smooth" })}
            >
              <span className="nav-icon" aria-hidden="true">
                <img src={`${base}images/${icon}.png`} alt="" />
                <img src={`${base}images/${icon}-active.png`} alt="" />
              </span>
              {label}
            </button>
          ))}
        </nav>

        <div className="top-actions">
          <div className="language-wrap">
            <button
              className="language-button"
              type="button"
              aria-expanded={open === "language"}
              onClick={() => setOpen(open === "language" ? null : "language")}
            >
              <span className="uk-flag" />
              <span>English</span>
              <span className="chevron" aria-hidden="true" />
            </button>
            {open === "language" && (
              <div className="menu language-menu">
                <button type="button" onClick={() => setOpen(null)}>English</button>
                <button type="button" onClick={() => setOpen(null)}>Русский</button>
                <button type="button" onClick={() => setOpen(null)}>Deutsch</button>
              </div>
            )}
          </div>
          <button
            className={helpOpen ? "help-button open" : "help-button"}
            type="button"
            aria-label="Help"
            style={{ backgroundImage: `url(${helpSprite})` }}
            onClick={() => setHelpOpen(!helpOpen)}
          >
            <span className="help-icon" aria-hidden="true" />
          </button>
          {helpOpen && <div className="help-popover">Select a server and press FIGHT!</div>}
        </div>
      </header>

      <section className="hero" aria-label="Tanki Online">
        <img className="tanki-logo" src={originalLogo} alt="Tanki Online" />
        <div className="game-controls">
          <div className="server-row">
            <span className="server-label">Server</span>
            <button
              className="server-button"
              type="button"
              aria-expanded={open === "server"}
              onClick={() => setOpen(open === "server" ? null : "server")}
            >
              <span>1</span>
              <span className="server-input" />
              <span>0 players</span>
              <span className="chevron" aria-hidden="true" />
            </button>
            {open === "server" && (
              <div className="menu server-menu">
                <button type="button" onClick={() => setOpen(null)}>1&nbsp;&nbsp; 0 players</button>
                <button type="button" onClick={() => setOpen(null)}>2&nbsp;&nbsp; 0 players</button>
              </div>
            )}
          </div>
          <button
            className={fightState ? "fight-button pressed" : "fight-button"}
            type="button"
            onClick={() => {
              setFightState(true);
              window.setTimeout(() => setFightState(false), 1800);
            }}
          >
            <img className="fight-button-bg" src={buttonGreen} alt="" />
            <img className="fight-button-bg fight-button-bg-over" src={buttonGreenOver} alt="" />
            <span>{fightState ? "LOADING..." : "FIGHT!"}</span>
          </button>
          <div className="players-online">
            <span>Players online:</span>
            <span>0</span>
          </div>
        </div>
      </section>

      <section className="content-wrap">
        <div className="promo-frame">
          <img src={`${base}images/promo-reference.png`} alt="Join us on Facebook" />
        </div>
        <div className="loading-grid">
          <a className="loading-panel" href="#news" aria-label="News loading"><Spinner /></a>
          <a className="loading-panel" href="#news" aria-label="News loading"><Spinner /></a>
          <a className="loading-panel" href="#news" aria-label="News loading"><Spinner /></a>
        </div>
        <div className="loading-wide" id="news"><Spinner /></div>

        <div className="content-grid">
          <article className="content-card">
            <h2>Top 10 clans</h2>
            <time dateTime="2014-02-23">23.02.2014</time>
            {Array.from({ length: 10 }, (_, index) => <p key={index}>{index + 1}. null</p>)}
          </article>
          <article className="content-card">
            <h2>Top 10 players</h2>
            <time dateTime="2014-02-23">23.02.2014</time>
            {Array.from({ length: 10 }, (_, index) => <p key={index}>{index + 1}. {index === 9 ? "MypCak" : "Nickname"}</p>)}
          </article>
          <article className="content-card poll-card">
            <h2>Polls</h2>
            <strong>When do you usually check your email?</strong>
            {["In the morning", "In the afternoon", "In the evening", "At night"].map((option) => (
              <label key={option}><input type="radio" name="poll" /> {option}</label>
            ))}
            <button type="button" className="poll-button">Vote</button>
            <button type="button" className="results-button">Results</button>
          </article>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-inner">
          <p>© Tanki Online Europe Ltd. All rights reserved.<br />Contact us regarding any issues: <a href="mailto:help@tankionline.com">help@tankionline.com</a></p>
          <nav aria-label="Footer navigation">
            <a href="#eula">EULA</a>
            <a href="#rules">Game rules</a>
            <a href="#privacy">Privacy and Cookies Policy</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}