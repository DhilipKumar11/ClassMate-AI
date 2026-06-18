import { useState } from "react";
import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "../../utils/constants";
import { Button } from "../common/Button";
import { useAppSettings } from "../../context/AppSettingsContext";

export function Navbar() {
  const { settings, toggleTheme } = useAppSettings();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 px-4 pt-4 sm:px-6">
      <div className="section-shell glass-panel rounded-[32px] px-5 py-4 shadow-glow">
        <div className="flex items-center justify-between gap-4">
          <NavLink to="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/60 text-lg font-bold text-[var(--accent)]">
              C
            </div>
            <div>
              <p className="text-sm font-bold tracking-[0.24em] text-[var(--accent)]">CLASSMATE AI</p>
              <p className="text-xs muted">Voice classroom copilot</p>
            </div>
          </NavLink>

          <nav className="hidden items-center gap-6 lg:flex">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm transition ${isActive ? "text-[var(--accent)]" : "text-[var(--muted)] hover:text-[var(--text)]"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={toggleTheme} className="hidden sm:inline-flex">
              {settings.theme === "dark" ? "Light Mode" : "Dark Mode"}
            </Button>
            <Button as={NavLink} to="/concept" className="hidden sm:inline-flex">
              Start Teaching
            </Button>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-white/70 lg:hidden"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              <span className="text-xl leading-none">{menuOpen ? "x" : "="}</span>
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className="mt-4 space-y-3 border-t border-[var(--border)] pt-4 lg:hidden">
            <nav className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-2xl px-4 py-3 text-sm transition ${
                      isActive ? "bg-white text-[var(--accent)]" : "text-[var(--muted)] hover:bg-white/70 hover:text-[var(--text)]"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="ghost" onClick={toggleTheme}>
                {settings.theme === "dark" ? "Light Mode" : "Dark Mode"}
              </Button>
              <Button as={NavLink} to="/concept" onClick={() => setMenuOpen(false)}>
                Start Teaching
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
