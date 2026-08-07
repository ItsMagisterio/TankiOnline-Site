import { useState } from "react";

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
    <main className="game-page">
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
            className="help-button"
            type="button"
            aria-label="Help"
            onClick={() => setHelpOpen(!helpOpen)}
          >
            <span className="help-icon" aria-hidden="true" />
          </button>
          {helpOpen && <div className="help-popover">Select a server and press FIGHT!</div>}
        </div>
      </header>

      <section className="hero" aria-label="Tanki Online">
        <img className="tanki-logo" src={`${base}images/tanki-logo.png`} alt="Tanki Online" />
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
            {fightState ? "LOADING..." : "FIGHT!"}
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
          <div className="loading-panel"><Spinner /></div>
          <div className="loading-panel"><Spinner /></div>
          <div className="loading-panel"><Spinner /></div>
        </div>
        <div className="loading-wide"><Spinner /></div>
      </section>
    </main>
  );
}