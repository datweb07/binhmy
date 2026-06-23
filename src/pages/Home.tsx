import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopNav from '../components/TopNav';
import { ArrowRight, MapPin, Calendar, Leaf, ChevronDown } from 'lucide-react';

const experiences = [
  {
    id: 1,
    title: 'Vườn Trái Cây',
    subtitle: 'Sinh thái & Nông nghiệp',
    image: 'https://static.vinwonders.com/production/2025/02/Trai-cay-tai-miet-vuon-Cu-lao-Thoi-Son.jpg',
    link: '/heritage',
  },
  {
    id: 2,
    title: 'Di Sản & Lịch Sử',
    subtitle: 'Văn hoá truyền thống',
    image: '/assets/images/dinh-binh-my-1.jpg',
    link: '/heritage',
  },
  {
    id: 3,
    title: 'Sông Nước & Thiên Nhiên',
    subtitle: 'Trải nghiệm miệt vườn',
    image: 'https://doanhnghiephoinhap.vn/stores/news_dataimages/2026/022026/13/21/hinh-120260213213103.jpg?rt=20260214084038',
    link: '/planner',
  },
  {
    id: 4,
    title: 'Ẩm Thực Địa Phương',
    subtitle: 'Từ vườn đến bàn ăn',
    image: 'https://ngaymoionline.com.vn/stores/news_dataimages/2026/012026/11/18/z7420188490792-01dfb229979d31cccd5e6e64f1fbf8bc20260111184317.jpg?rt=20260111184320',
    link: '/specialties',
  },
];

const stats = [
  { value: '85', unit: 'ha', label: 'Vùng canh tác sinh thái' },
  { value: '4', unit: 'mùa', label: 'Trải nghiệm quanh năm' },
  { value: '3.800', unit: 'khách', label: 'Lượt khách mỗi tháng' },
  { value: '1.240', unit: 'cây xanh', label: 'Được bảo tồn' },
];

const seasons = [
  { name: 'Mùa Du Xuân', months: 'T1 – T3', image: 'https://baocantho.com.vn/image/news/2026/20260218/thumbnail/810x478/1771399293.webp' },
  { name: 'Mùa Thu Hoạch', months: 'T4 – T6', image: 'https://media-cdn-v2.laodong.vn/storage/newsportal/2021/12/23/987709/4-1-A.jpg' },
  { name: 'Mùa Sông Nước', months: 'T7 – T9', image: 'https://vcdn1-dulich.vnecdn.net/2021/10/08/12-1633575870-1633576539-1633701767.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=J9QeOkUAeLV_L8v-ncvRYg' },
  { name: 'Mùa Yên Bình', months: 'T10 – T12', image: 'https://cdn.tcdulichtphcm.vn/upload/4-2022/images/2022-11-22/1669083848-thumbnail-width750height563-auto-crop-640x335-watermark.jpg' },
];

const specialtyPreviews = [
  { name: 'Măng Cụt Trung An', price: '85.000đ / kg', image: 'https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2024_1_17_638411194870995791_cach-an-mang-cut-11.jpg' },
  { name: 'Bánh Tráng Phơi Sương', price: '40.000đ / xấp', image: 'https://dacsantayninh.info/wp-content/uploads/2015/06/banh-trang-phoi-suong-ngoc-han-2.jpg' },
  { name: 'Bò Tơ Củ Chi', price: '250.000đ / phần', image: 'https://tuyhoafoods.vn/wp-content/uploads/2024/03/image-148.png' },
];

export default function Home() {
  const [atTop, setAtTop] = useState(true);
  const [hoveredExp, setHoveredExp] = useState<number | null>(null);

  useEffect(() => {
    const handler = () => setAtTop(window.scrollY < window.innerHeight * 0.75);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div className="w-full font-body" style={{ color: 'var(--color-on-surface)', background: '#fff' }}>
      <TopNav transparent={atTop} />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ height: '100vh', minHeight: 600 }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.75) saturate(0.9)' }}
        >
          <source src="/assets/videos/Dji_0765.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.6) 50%, rgba(14,34,12,0.9) 100%)' }} />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] mb-8 animate-fade-up"
            style={{ color: 'rgba(181,212,173,0.85)', animationDelay: '0.1s' }}>
            Xã Bình Mỹ · TP. Hồ Chí Minh
          </p>

          <h1
            className="text-white mb-8 animate-fade-up"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(5rem, 14vw, 11rem)',
              lineHeight: 0.88,
              letterSpacing: '-0.01em',
              animationDelay: '0.2s',
            }}
          >
            Bình Mỹ
          </h1>

          <p className="text-lg md:text-xl max-w-lg leading-relaxed mb-12 animate-fade-up"
            style={{ color: 'rgba(255,255,255,0.68)', animationDelay: '0.38s' }}>
            Vùng đất sinh thái ven sông Sài Gòn miệt vườn trù phú, dòng nước hiền hoà, lịch sử hào hùng - cộng đồng gắn kết.
          </p>

          <div className="flex items-center gap-4 animate-fade-up" style={{ animationDelay: '0.52s' }}>
            <Link to="/map"
              className="flex items-center gap-2.5 px-8 py-4 rounded-2xl text-sm font-semibold text-white transition-all duration-300 hover:gap-4"
              style={{ background: 'var(--color-primary)', boxShadow: '0 8px 28px rgba(74,124,68,0.55)' }}>
              Khám phá ngay <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/planner"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-semibold transition-all"
              style={{
                background: 'rgba(255,255,255,0.14)',
                color: 'white',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.28)',
              }}>
              Lịch trình mùa vụ
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-float">
          <span className="text-[9px] font-semibold uppercase tracking-[0.3em]"
            style={{ color: 'rgba(255,255,255,0.4)' }}>
            Cuộn xuống
          </span>
          <ChevronDown className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.4)' }} />
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────── */}
      <section className="py-16 px-8" style={{ borderBottom: '1px solid var(--color-outline)' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
          {stats.map((s, i) => (
            <div key={i} className="text-center animate-fade-up" style={{ animationDelay: `${i * 70}ms` }}>
              <p className="font-black leading-none mb-1"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
                  color: 'var(--color-primary)',
                }}>
                {s.value}
                {s.unit && (
                  <span className="ml-1.5 font-light text-2xl" style={{ color: 'var(--color-on-surface-variant)' }}>
                    {s.unit}
                  </span>
                )}
              </p>
              <p className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────── */}
      <section className="py-28 px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] font-semibold mb-5"
              style={{ color: 'var(--color-primary)' }}>
              Về Bình Mỹ
            </p>
            <h2 className="font-bold leading-tight mb-6"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)' }}>
              Miệt vườn xanh mướt giữa lòng thành phố
            </h2>
            <p className="text-base leading-relaxed mb-5" style={{ color: 'var(--color-on-surface-variant)' }}>
              Bình Mỹ là xã ven sông Sài Gòn, thuộc TP. Hồ Chí Minh. Vùng đất này nổi tiếng với những miệt vườn trù phú, nghề trồng cây ăn trái truyền thống và các di tích lịch sử văn hoá đặc sắc.
            </p>
            <p className="text-base leading-relaxed mb-10" style={{ color: 'var(--color-on-surface-variant)' }}>
              Nơi đây đang trở thành điểm đến du lịch sinh thái bền vững — nơi du khách có thể tự tay hái trái cây, ngồi thuyền dạo sông và khám phá văn hoá làng xã Nam Bộ nguyên sơ.
            </p>
            <Link to="/map"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:gap-4"
              style={{ color: 'var(--color-primary)' }}>
              Xem bản đồ du lịch <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="relative">
            <img
              src="https://cdn2.fptshop.com.vn/unsafe/800x0/xa_binh_my_cua_tphcm_1_a8f319ea28.jpg"
              alt="Vườn Bình Mỹ"
              className="w-full object-cover rounded-3xl"
              style={{ aspectRatio: '4/5', boxShadow: '0 32px 70px rgba(26,58,24,0.18)' }}
            />
            <div className="absolute -bottom-6 -left-6 px-6 py-5 rounded-2xl"
              style={{
                background: 'var(--color-primary)',
                boxShadow: '0 16px 40px rgba(74,124,68,0.45)',
              }}>
              <p className="font-black text-3xl text-white leading-none"
                style={{ fontFamily: 'var(--font-display)' }}>85 ha</p>
              <p className="text-xs text-white/65 mt-1">vùng sinh thái</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCES ───────────────────────────────────────── */}
      <section className="py-28 px-8" style={{ background: 'var(--color-surface-container)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[11px] uppercase tracking-[0.28em] font-semibold mb-5"
              style={{ color: 'var(--color-primary)' }}>
              Trải nghiệm
            </p>
            <h2 className="font-bold"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 3.75rem)' }}>
              Khám Phá Bình Mỹ
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {experiences.map((exp, i) => (
              <Link
                key={exp.id}
                to={exp.link}
                className="relative overflow-hidden group"
                style={{
                  height: i < 2 ? 440 : 300,
                  borderRadius: 20,
                  display: 'block',
                }}
                onMouseEnter={() => setHoveredExp(exp.id)}
                onMouseLeave={() => setHoveredExp(null)}
              >
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                  style={{ transform: hoveredExp === exp.id ? 'scale(1.07)' : 'scale(1)' }}
                />
                <div
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    background: hoveredExp === exp.id
                      ? 'linear-gradient(to top, rgba(14,34,12,0.92) 0%, rgba(14,34,12,0.35) 100%)'
                      : 'linear-gradient(to top, rgba(14,34,12,0.72) 0%, rgba(14,34,12,0.08) 55%)',
                  }}
                />
                <div className="absolute bottom-0 left-0 p-7">
                  <p className="text-[10px] uppercase tracking-wider font-semibold mb-2"
                    style={{ color: 'rgba(181,212,173,0.8)' }}>
                    {exp.subtitle}
                  </p>
                  <h3 className="font-bold text-xl text-white mb-3"
                    style={{ fontFamily: 'var(--font-display)' }}>
                    {exp.title}
                  </h3>
                  <div
                    className="flex items-center gap-2 text-xs font-semibold text-white transition-all duration-300 overflow-hidden"
                    style={{
                      maxHeight: hoveredExp === exp.id ? '24px' : '0',
                      opacity: hoveredExp === exp.id ? 1 : 0,
                    }}
                  >
                    Khám phá <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PULL QUOTE ────────────────────────────────────────── */}
      <section className="py-28 px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="w-10 h-px mx-auto mb-10" style={{ background: 'var(--color-primary)' }} />
          <blockquote
            className="font-light italic leading-relaxed mb-8"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.6rem, 3vw, 2.6rem)',
              color: 'var(--color-on-surface)',
            }}
          >
            "Bình Mỹ là nơi bạn có thể nghe tiếng lá rơi, ngửi mùi đất ẩm sau mưa và cảm nhận nhịp thở chậm rãi của thiên nhiên."
          </blockquote>
          <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-primary)' }}>
            — Nhà vườn Cô Tư, Trung An
          </p>
          <div className="w-10 h-px mx-auto mt-10" style={{ background: 'var(--color-outline)' }} />
        </div>
      </section>

      {/* ── SEASONS ───────────────────────────────────────────── */}
      <section className="py-28 px-8" style={{ background: '#0E2410' }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] font-semibold mb-4"
                style={{ color: 'rgba(181,212,173,0.55)' }}>
                Du lịch quanh năm
              </p>
              <h2 className="font-bold text-white"
                style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)' }}>
                Bình Mỹ Theo Mùa
              </h2>
            </div>
            <Link to="/planner"
              className="hidden md:flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:gap-4"
              style={{ color: 'rgba(181,212,173,0.7)' }}>
              Xem lịch trình <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {seasons.map((s, i) => (
              <Link key={i} to="/planner"
                className="relative overflow-hidden group rounded-2xl"
                style={{ height: 300 }}>
                <img src={s.image} alt={s.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-106"
                  style={{ filter: 'brightness(0.6) saturate(0.75)' }} />
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(14,34,12,0.92) 0%, transparent 55%)' }} />
                <div className="absolute bottom-0 p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-wider mb-1.5"
                    style={{ color: 'rgba(181,212,173,0.65)' }}>
                    {s.months}
                  </p>
                  <p className="font-semibold text-sm text-white">{s.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPECIALTIES PREVIEW ───────────────────────────────── */}
      <section className="py-28 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] font-semibold mb-5"
                style={{ color: 'var(--color-primary)' }}>
                Từ vườn đến bàn ăn
              </p>
              <h2 className="font-bold"
                style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 3.75rem)' }}>
                Đặc Sản Bình Mỹ
              </h2>
            </div>
            <Link to="/specialties"
              className="hidden md:flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:gap-4"
              style={{ color: 'var(--color-primary)' }}>
              Xem tất cả <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {specialtyPreviews.map((item, i) => (
              <Link key={i} to="/specialties"
                className="group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{
                  borderRadius: 20,
                  border: '1px solid var(--color-outline)',
                  background: 'var(--color-surface-container-lowest)',
                  boxShadow: '0 2px 12px rgba(26,58,24,0.06)',
                }}>
                <div className="overflow-hidden" style={{ height: 220 }}>
                  <img src={item.image} referrerPolicy="no-referrer" alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-base mb-0.5" style={{ color: 'var(--color-on-surface)' }}>
                      {item.name}
                    </h3>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>
                      {item.price}
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                    style={{ background: 'var(--color-primary-container)' }}>
                    <ArrowRight className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISIT INFO ────────────────────────────────────────── */}
      <section className="py-28 px-8" style={{ background: 'var(--color-surface-container)' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] font-semibold mb-5"
              style={{ color: 'var(--color-primary)' }}>
              Cách đến Bình Mỹ
            </p>
            <h2 className="font-bold leading-tight mb-8"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)' }}>
              Tìm Đường Đến<br />Vùng Sinh Thái
            </h2>
            <div className="space-y-5 mb-10">
              {[
                { icon: MapPin, title: 'Vị trí', desc: 'Xã Bình Mỹ, TP. Hồ Chí Minh — ven sông Sài Gòn, cách trung tâm TP khoảng 40km' },
                { icon: Calendar, title: 'Thời điểm lý tưởng', desc: 'Quanh năm — mỗi mùa mang một vẻ đặc sắc riêng biệt' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ background: 'var(--color-primary-container)' }}>
                    <Icon className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-0.5" style={{ color: 'var(--color-on-surface)' }}>{title}</p>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-on-surface-variant)' }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/map"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: 'var(--color-primary)', boxShadow: '0 6px 20px rgba(74,124,68,0.38)' }}>
              Xem bản đồ <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200"
            alt="Bản đồ Bình Mỹ"
            className="w-full rounded-3xl object-cover"
            style={{
              aspectRatio: '1/1',
              filter: 'saturate(0.65) brightness(0.82)',
              boxShadow: '0 28px 65px rgba(26,58,24,0.16)',
            }}
          />
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer className="py-16 px-8" style={{ background: '#0E2410' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 pb-12"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(74,124,68,0.3)' }}>
                  <Leaf className="w-4 h-4" style={{ color: '#B5D4AD' }} />
                </div>
                <span className="font-black text-base tracking-[0.14em] uppercase text-white">Bình Mỹ</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Xã sinh thái bền vững — nơi bảo tồn văn hoá và thiên nhiên Nam Bộ.
              </p>
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-5"
                style={{ color: 'rgba(255,255,255,0.28)' }}>
                Khám phá
              </p>
              <div className="space-y-2.5">
                {[
                  { to: '/map', label: 'Bản đồ du lịch' },
                  { to: '/planner', label: 'Lịch trình mùa vụ' },
                  { to: '/heritage', label: 'Địa điểm tham quan' },
                  { to: '/specialties', label: 'Đặc sản địa phương' },
                  { to: '/dashboard', label: 'Quy hoạch' },
                ].map(({ to, label }) => (
                  <Link key={to} to={to}
                    className="block text-sm transition-colors hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.42)' }}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-5"
                style={{ color: 'rgba(255,255,255,0.28)' }}>
                Liên hệ
              </p>
              <div className="space-y-2 text-sm" style={{ color: 'rgba(255,255,255,0.42)' }}>
                <p>UBND Xã Bình Mỹ</p>
                <p>Tỉnh lộ 9, Xã Bình Mỹ</p>
                <p>TP. Hồ Chí Minh</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.22)' }}>
              © 2026 Bình Mỹ TourMap. Dự án du lịch sinh thái bền vững.
            </p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.16)' }}>
              Xã Bình Mỹ · TP.HCM
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
