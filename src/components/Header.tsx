import { Bell, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/planner',  label: 'Lịch trình' },
  { to: '/dashboard', label: 'Quy hoạch' },
  { to: '/heritage', label: 'Di sản' },
  { to: '/nou', label: 'NOU' },
];

export default function Header() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-30 w-full" style={{
      background: 'rgba(242, 248, 241, 0.85)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderBottom: '1px solid rgba(192, 216, 187, 0.6)',
    }}>
      <div className="flex items-center justify-between px-8 h-16">
        {/* Search bar */}
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl transition-all"
             style={{ background: 'rgba(232, 243, 230, 0.8)', border: '1px solid rgba(192, 216, 187, 0.7)' }}>
          <Search className="w-4 h-4" style={{ color: 'var(--color-on-surface-variant)' }} />
          <input
            type="text"
            placeholder="Tìm địa điểm, hoạt động..."
            className="bg-transparent outline-none text-sm w-48"
            style={{ color: 'var(--color-on-surface)', fontFamily: 'var(--font-body)' }}
          />
        </div>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(({ to, label, external }) => {
            const commonProps = {
              key: to,
              className: "px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 relative",
              style: {
                color: isActive(to) ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
                background: isActive(to) ? 'var(--color-primary-container)' : 'transparent',
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
                {isActive(to) && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                        style={{ background: 'var(--color-primary)' }} />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button className="relative w-9 h-9 flex items-center justify-center rounded-xl transition-colors"
                  style={{ color: 'var(--color-on-surface-variant)' }}>
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                  style={{ background: 'var(--color-tertiary)' }} />
          </button>
          <button className="w-9 h-9 rounded-xl overflow-hidden border-2 transition-all"
                  style={{ borderColor: 'var(--color-primary)' }}>
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=80"
                 alt="Avatar" className="w-full h-full object-cover" />
          </button>
        </div>
      </div>
    </header>
  );
}
