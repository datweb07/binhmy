import { Map, Calendar, LayoutDashboard, BookOpen, HelpCircle, MessageSquare, ShoppingBag, Leaf } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/',            icon: Map,             label: 'Bản đồ du lịch' },
  { to: '/planner',     icon: Calendar,        label: 'Lịch trình Mùa vụ' },
  { to: '/heritage',    icon: BookOpen,        label: 'Địa điểm tham quan' },
  { to: '/specialties', icon: ShoppingBag,     label: 'Đặc sản địa phương' },
  { to: '/dashboard',   icon: LayoutDashboard, label: 'Quy hoạch' },
];

export default function Sidebar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 z-40 py-6 gap-1"
      style={{ background: 'linear-gradient(180deg, #0E2410 0%, #122B12 60%, #0A1E0A 100%)' }}
    >
      {/* Logo */}
      <div className="px-5 mb-6">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
               style={{ background: 'rgba(74, 124, 68, 0.35)', border: '1px solid rgba(181, 212, 173, 0.25)' }}>
            <Leaf className="w-5 h-5" style={{ color: '#B5D4AD' }} />
          </div>
          <div>
            <h1 className="font-headline text-lg font-bold leading-tight tracking-tight" style={{ color: '#D9EDD4' }}>
              Bình Mỹ
            </h1>
            <p className="text-[10px] font-medium tracking-widest uppercase" style={{ color: 'rgba(181,212,173,0.5)' }}>
              Xã sinh thái
            </p>
          </div>
        </Link>
      </div>

      {/* Nav label */}
      <p className="px-5 mb-1 text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.25)' }}>
        Khám phá
      </p>

      {/* Nav Items */}
      <div className="flex-1 overflow-y-auto px-3 space-y-0.5">
        {navItems.map(({ to, icon: Icon, label }) => {
          const active = isActive(to);
          return (
            <Link
              key={to}
              to={to}
              className="px-3 py-2.5 flex items-center gap-3 rounded-xl transition-all duration-200 relative group"
              style={{
                background: active ? 'rgba(74, 124, 68, 0.28)' : 'transparent',
                color: active ? '#B5D4AD' : 'rgba(255,255,255,0.5)',
              }}
              onMouseEnter={e => {
                if (!active) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
                if (!active) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.85)';
              }}
              onMouseLeave={e => {
                if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent';
                if (!active) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
              }}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full"
                      style={{ background: '#B5D4AD' }} />
              )}
              <Icon className="w-4.5 h-4.5 shrink-0" style={{ width: 18, height: 18 }} />
              <span className="font-medium text-sm">{label}</span>
            </Link>
          );
        })}
      </div>

      {/* Divider */}
      <div className="mx-5 my-3" style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

      {/* Bottom actions */}
      <div className="px-3 space-y-0.5">
        {[
          { icon: HelpCircle, label: 'Trợ giúp' },
          { icon: MessageSquare, label: 'Phản hồi' },
        ].map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="w-full text-left px-3 py-2.5 flex items-center gap-3 rounded-xl transition-all duration-200"
            style={{ color: 'rgba(255,255,255,0.35)' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
              (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)';
            }}
          >
            <Icon style={{ width: 16, height: 16 }} />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>

      {/* Version tag */}
      <p className="px-5 mt-2 text-[10px]" style={{ color: 'rgba(255,255,255,0.18)' }}>
        Bình Mỹ TourMap v1.0
      </p>
    </nav>
  );
}
