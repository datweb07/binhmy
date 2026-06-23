import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Leaf, Menu, X } from "lucide-react";

interface TopNavProps {
  transparent?: boolean;
}

const navLinks = [
  { to: "/map", label: "Khám phá" },
  { to: "/planner", label: "Lịch trình" },
  { to: "/heritage", label: "Di sản" },
  { to: "/specialties", label: "Đặc sản" },
  { to: "/dashboard", label: "Quy hoạch" },
  { to: "/nou", label: "NOU" },
];

export default function TopNav({ transparent = false }: TopNavProps) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isActive = (path: string) => location.pathname === path;

  const textMain = transparent
    ? "rgba(255,255,255,0.95)"
    : "var(--color-on-surface)";
  const textMuted = transparent
    ? "rgba(255,255,255,0.60)"
    : "var(--color-on-surface-variant)";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: transparent ? "transparent" : "rgba(255,255,255,0.96)",
        backdropFilter: transparent ? "none" : "blur(24px) saturate(180%)",
        WebkitBackdropFilter: transparent
          ? "none"
          : "blur(24px) saturate(180%)",
        borderBottom: transparent ? "none" : "1px solid rgba(192,216,187,0.45)",
      }}
    >
      <div
        className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between"
        style={{
          height: 72,
          backgroundColor: isActive("/map") ? "rgb(79,124,73,0.6)" : "none",
          borderRadius: isActive("/map") ? "15px" : "0",
          marginTop: isActive("/map") ? "15px" : "0",
        }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{
              background: transparent
                ? "rgba(255,255,255,0.15)"
                : "var(--color-primary-container)",
            }}
          >
            <Leaf
              className="w-4 h-4"
              style={{ color: transparent ? "white" : "var(--color-primary)" }}
            />
          </div>
          <div>
            <span
              className="font-black text-base tracking-[0.14em] uppercase block leading-none"
              style={{ color: textMain }}
            >
              Bình Mỹ
            </span>
            <span
              className="text-[9px] uppercase tracking-widest"
              style={{ color: textMuted }}
            >
              Xã sinh thái · TP.HCM
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navLinks.map(({ to, label, external }) => {
            const active = isActive(to);
            const commonProps = {
              key: to,
              className: "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
              style: {
                color: active
                  ? transparent
                    ? "white"
                    : "var(--color-primary)"
                  : textMuted,
                background:
                  active && !transparent
                    ? "var(--color-primary-container)"
                    : "transparent",
                borderBottom:
                  active && transparent
                    ? "2px solid rgba(255,255,255,0.6)"
                    : "2px solid transparent",
              }
            };

            if (external) {
              return (
                <a href={to} target="_blank" rel="noreferrer" {...commonProps}>
                  {label}
                </a>
              );
            }

            return (
              <Link to={to} {...commonProps}>
                {label}
              </Link>
            );
          })}
        </nav>

        {/* CTA + Mobile */}
        <div className="flex items-center gap-3">
          <Link
            to="/specialties"
            className="hidden md:inline-flex items-center px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{
              background: "var(--color-primary)",
              boxShadow: "0 4px 14px rgba(74,124,68,0.35)",
            }}
          >
            Đặt trước
          </Link>
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl"
            style={{
              color: textMain,
              background: transparent
                ? "rgba(255,255,255,0.12)"
                : "var(--color-surface-container)",
            }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden px-4 pb-4 flex flex-col gap-1 animate-fade-up"
          style={{
            background: "rgba(255,255,255,0.98)",
            borderTop: "1px solid var(--color-outline)",
          }}
        >
          {navLinks.map(({ to, label, external }) => {
            const commonProps = {
              key: to,
              onClick: () => setMobileOpen(false),
              className: "px-4 py-3 rounded-xl text-sm font-medium",
              style: {
                color: isActive(to)
                  ? "var(--color-primary)"
                  : "var(--color-on-surface-variant)",
                background: isActive(to)
                  ? "var(--color-primary-container)"
                  : "transparent",
              }
            };

            if (external) {
              return (
                <a href={to} target="_blank" rel="noreferrer" {...commonProps}>
                  {label}
                </a>
              );
            }

            return (
              <Link to={to} {...commonProps}>
                {label}
              </Link>
            );
          })}
          <Link
            to="/specialties"
            onClick={() => setMobileOpen(false)}
            className="mt-1 px-4 py-3 rounded-xl text-sm font-semibold text-white text-center"
            style={{ background: "var(--color-primary)" }}
          >
            Đặt trước
          </Link>
        </div>
      )}
    </header>
  );
}
