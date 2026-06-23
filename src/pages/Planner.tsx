import { useState } from 'react';
import TopNav from '../components/TopNav';
import { Flower2, Sun, CloudDrizzle, Wind, CalendarDays, CheckCircle2,
         ArrowRight, Clock, MapPin, Lightbulb, Car, Home, Backpack, ChevronDown } from 'lucide-react';

const seasons = [
  {
    id:1, name:'Quý 1', title:'Mùa Du Xuân', months:'Tháng 1 – 3',
    icon: Flower2, color:'#4A7C44', gradient:'linear-gradient(135deg, #4A7C44 0%, #6A9EAA 100%)',
    image:'https://baocantho.com.vn/image/news/2026/20260218/thumbnail/810x478/1771399293.webp',
    description:'Bình Mỹ đón chào năm mới với nắng trải vàng nhẹ, thời tiết mát mẻ và không khí lễ hội ngập tràn. Thời điểm tuyệt vời nhất để gia đình thực hiện những chuyến du xuân trọn vẹn, tìm hiểu văn hóa bản địa và check-in bên những cung đường hoa rực rỡ.',
    highlights:['Tham gia Lễ hội Kỳ Yên tại Đình Bình Mỹ cầu bình an đầu năm','Đạp xe dạo quanh các cung đường hoa xuân sắc màu','Thưởng thức các món mứt, bánh tét truyền thống ngày Tết','Chụp ảnh hoàng hôn trên sông Sài Gòn đoạn qua Bình Mỹ','Tham quan xưởng làm bánh tráng và tự tay tráng thử'],
    itinerary:[
      { time:'06:30', activity:'Xuất phát từ trung tâm TP.HCM', note:'~50 phút đi xe máy hoặc ô tô' },
      { time:'07:30', activity:'Ăn sáng tại quán ven đường', note:'Bún mắm, hủ tiếu Nam Vang địa phương' },
      { time:'08:30', activity:'Tham quan Đình Bình Mỹ', note:'Nghe thuyết minh lịch sử, chụp ảnh kiến trúc' },
      { time:'10:00', activity:'Ghé thăm dự án Làng Cuốn', note:'Xem tráng bánh, mua đặc sản làm quà' },
      { time:'11:30', activity:'Dạo bộ bờ sông Rạch Tra', note:'Ngắm cảnh, chụp ảnh, thả hồn' },
      { time:'12:30', activity:'Ăn trưa tại nhà hàng miệt vườn', note:'Cơm niêu, canh chua cá lăng, rau rừng' },
      { time:'14:00', activity:'Thăm vườn trái cây Trung An', note:'Hái trái cây, uống nước dừa tươi' },
      { time:'16:00', activity:'Mua đặc sản mang về', note:'Bánh tráng, rau móp, trái cây theo mùa' },
      { time:'17:00', activity:'Trở về TP.HCM', note:'Về trước kẹt xe giờ cao điểm' },
    ],
    tips:'Mùa Tết nên đặt bàn ăn trưa trước. Mang theo kem chống nắng và nón lá.',
  },
  {
    id:2, name:'Quý 2', title:'Mùa Thu Hoạch', months:'Tháng 4 – 6',
    icon: Sun, color:'#8B5A2B', gradient:'linear-gradient(135deg, #8B5A2B 0%, #c97d2e 100%)',
    image:'https://media-cdn-v2.laodong.vn/storage/newsportal/2021/12/23/987709/4-1-A.jpg',
    description:'Thời điểm nhộn nhịp và được mong đợi nhất trong năm. Toàn bộ các nhà vườn tại Bình Mỹ bước vào thời vụ thu hoạch măng cụt, chôm chôm, sầu riêng chín rộ — mang đến trải nghiệm hái trái và thưởng thức tận tay cực kỳ thú vị.',
    highlights:['Mua vé trọn gói thưởng thức trái cây không giới hạn tại vườn','Hóa thân thành người nông dân tự tay thu hoạch sầu riêng, măng cụt','Thưởng thức đặc sản gỏi gà măng cụt trứ danh Bình Mỹ','Tham quan quy trình đóng gói và vận chuyển trái cây đi các tỉnh','Mua sầu riêng, chôm chôm thẳng tại vườn — giá tốt nhất'],
    itinerary:[
      { time:'06:00', activity:'Xuất phát sớm để tránh nắng trưa', note:'Mùa hè nắng gắt, đi sáng sớm thoải mái hơn' },
      { time:'07:00', activity:'Ghé vườn Ba Thi — vườn sầu riêng Cơm Vàng', note:'Đặt trước để được hướng dẫn hái trực tiếp' },
      { time:'09:00', activity:'Tham quan vườn Trung An — hái chôm chôm, măng cụt', note:'Buffet trái cây tại chỗ 80.000đ/người' },
      { time:'11:00', activity:'Thăm xưởng chế biến trái cây xuất khẩu', note:'Hiểu quy trình từ vườn ra thị trường' },
      { time:'12:30', activity:'Ăn trưa — thực đơn gỏi gà măng cụt đặc trưng', note:'Đặt trước tại Nhà hàng Cô Tư' },
      { time:'14:00', activity:'Nghỉ ngơi — tham quan chợ nông sản địa phương', note:'Mua trái cây tươi, đặc sản mang về' },
      { time:'16:00', activity:'Chụp ảnh vườn buổi chiều', note:'Ánh sáng chiều tạo không gian đẹp hơn buổi sáng' },
      { time:'17:00', activity:'Khởi hành về TP.HCM', note:'Kết thúc chuyến đi' },
    ],
    tips:'Mặc quần áo nhẹ, thoáng mát. Đặt vườn trước ít nhất 1 ngày vào mùa cao điểm.',
  },
  {
    id:3, name:'Quý 3', title:'Mùa Sông Nước', months:'Tháng 7 – 9',
    icon: CloudDrizzle, color:'#6A9EAA', gradient:'linear-gradient(135deg, #6A9EAA 0%, #4A7C44 100%)',
    image:'https://vcdn1-dulich.vnecdn.net/2021/10/08/12-1633575870-1633576539-1633701767.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=J9QeOkUAeLV_L8v-ncvRYg',
    description:'Những cơn mưa mát lành làm thảm thực vật ven bờ sông Sài Gòn trở nên xanh mướt và đầy ắp nhựa sống. Thật lãng mạn khi được chèo xuồng len lỏi qua các con rạch nhỏ êm đềm bám quanh những rặng dừa nước râm mát.',
    highlights:['Du ngoạn ngắm sông Sài Gòn bằng xuồng chèo truyền thống buổi chiều','Trải nghiệm câu cá dân dã trên sông — thả câu và nướng cá tại chỗ','Thưởng thức cá lăng, lươn đồng, tôm càng vào mùa béo nhất trong năm','Tắm mưa điền dã và cắm trại ven sông qua đêm','Chụp ảnh sương mù buổi sáng trên mặt sông'],
    itinerary:[
      { time:'07:00', activity:'Xuất phát — tranh thủ thời tiết mát', note:'Mùa mưa thường mưa chiều, sáng nắng đẹp' },
      { time:'08:30', activity:'Ăn sáng tại chợ nổi Bến sông', note:'Bún bò, cháo cá — đặc sản buổi sáng địa phương' },
      { time:'09:30', activity:'Thuê xuồng chèo — khởi hành dọc rạch', note:'30.000đ/người · 2 tiếng · hướng dẫn viên người địa phương' },
      { time:'12:00', activity:'Ăn trưa trên thuyền hoặc nhà vườn ven sông', note:'Cá lăng kho tộ, canh chua, rau dân dã' },
      { time:'14:00', activity:'Câu cá dân dã buổi chiều', note:'Dụng cụ cho thuê tại bến đò' },
      { time:'15:30', activity:'Tham quan rừng chồi ngập nước', note:'Đi bộ trên lối mòn gỗ ven rừng' },
      { time:'17:00', activity:'Xem hoàng hôn tại Bến Đò Rạch Tra', note:'Khung cảnh đẹp nhất ngày' },
      { time:'18:00', activity:'Khởi hành về', note:'Hoặc ở lại cắm trại qua đêm nếu đã đặt trước' },
    ],
    tips:'Mang theo áo mưa, thuốc chống muỗi và dép dễ tháo. Kiểm tra dự báo thời tiết trước khi đi.',
  },
  {
    id:4, name:'Quý 4', title:'Mùa Yên Bình', months:'Tháng 10 – 12',
    icon: Wind, color:'#5A7A6A', gradient:'linear-gradient(135deg, #5A7A6A 0%, #8FB8C2 100%)',
    image:'https://cdn.tcdulichtphcm.vn/upload/4-2022/images/2022-11-22/1669083848-thumbnail-width750height563-auto-crop-640x335-watermark.jpg',
    description:'Gió bấc ùa về mang theo chút se lạnh. Nhịp sống dần chậm lại, yên bình nhường chỗ cho sự chuẩn bị những vụ mùa mới. Thích hợp cho những ai muốn tìm không gian chữa lành, trốn khỏi ồn ào khói bụi phố thị.',
    highlights:['Nghỉ dưỡng cắm trại (glamping) ven sông đón gió bấc se lạnh','Tham quan xưởng làm bánh tráng, mứt dừa chuẩn bị cho mùa Tết','Ngồi quây quần bên bếp lửa thưởng thức ẩm thực đồng quê','Chụp ảnh sương mù buổi sáng sớm trên cánh đồng và dòng sông','Mua rượu nếp than và đặc sản khô làm quà Tết sớm'],
    itinerary:[
      { time:'07:00', activity:'Xuất phát — trời mát, gió nhẹ', note:'Mùa này khí hậu lý tưởng nhất trong năm' },
      { time:'08:30', activity:'Thăm Làng Cuốn — tìm hiểu nghề tráng bánh', note:'Xem phơi bánh, tráng bánh, mua trực tiếp' },
      { time:'10:00', activity:'Đạp xe vòng quanh làng', note:'Thuê xe đạp tại trung tâm xã — 30.000đ/ngày' },
      { time:'12:00', activity:'Ăn trưa cơm nhà dân — trải nghiệm homestay', note:'Liên hệ trước để ăn cùng gia đình địa phương' },
      { time:'14:00', activity:'Thăm cánh đồng sen Bình Mỹ', note:'Mùa này hoa ít hơn nhưng trời mát, không đông khách' },
      { time:'16:00', activity:'Mua đặc sản — rượu nếp than, mứt dừa, bánh tráng Tết', note:'Mua sớm trước khi hết hàng mùa cuối năm' },
      { time:'17:30', activity:'Xem bình minh trên sông (nếu ở lại)', note:'Hoặc trở về TP.HCM' },
    ],
    tips:'Mang theo áo khoác nhẹ cho buổi sáng và tối. Đây là mùa lý tưởng để ở lại qua đêm.',
  },
];

const ANNUAL_EVENTS = [
  { name:'Lễ Kỳ Yên Đình Bình Mỹ', month:'Tháng 10 ÂL', type:'Văn hoá', desc:'Lễ hội cúng đình lớn nhất xã, kéo dài 3 ngày với hát bội, múa lân và ẩm thực.' },
  { name:'Mùa Hái Măng Cụt', month:'Tháng 5 – 6', type:'Nông nghiệp', desc:'Vào mùa chính, các nhà vườn mở cửa đón khách hái trái không giới hạn.' },
  { name:'Đua Thuyền Mừng Xuân', month:'Mùng 4 Tết ÂL', type:'Thể thao', desc:'Lễ hội đua thuyền truyền thống trên sông Sài Gòn, thu hút hàng nghìn người xem.' },
  { name:'Sự Kiện Làng Cuốn', month:'Tháng 9', type:'Làng nghề', desc:'Triển lãm nghề tráng bánh và chợ ẩm thực địa phương — sự kiện du lịch nổi bật.' },
  { name:'Lễ hội Sen Bình Mỹ', month:'Tháng 5 – 6', type:'Sinh thái', desc:'Lễ hội mùa sen nở rộ — nghệ thuật, ẩm thực từ sen và workshop nhiếp ảnh.' },
  { name:'Chợ Phiên Sông Nước', month:'Ngày Rằm hàng tháng', type:'Văn hoá', desc:'Chợ nổi nhỏ họp trên sông — nông sản, đặc sản và đồ thủ công địa phương.' },
  { name:'Ngày Di sản Văn hoá', month:'23/11', type:'Giáo dục', desc:'Triển lãm ảnh, tư liệu và giao lưu với các nghệ nhân dân gian địa phương.' },
  { name:'Tết Nguyên Đán', month:'Tháng 1 – 2 ÂL', type:'Truyền thống', desc:'Không khí Tết tại làng quê — trang hoàng, pháo hoa và bữa cơm gia đình ấm áp.' },
];

const TYPE_COLORS: Record<string,string> = {
  'Văn hoá':'#8B5A2B', 'Nông nghiệp':'#4A7C44', 'Thể thao':'#6A9EAA',
  'Làng nghề':'#6A9EAA', 'Sinh thái':'#4A7C44', 'Giáo dục':'#5A7A6A',
  'Truyền thống':'#A0659A',
};

export default function Planner() {
  const [selected, setSelected] = useState(seasons[0]);
  const [openTip, setOpenTip] = useState(false);

  return (
    <div className="min-h-screen font-body" style={{ color:'var(--color-on-surface)', background:'#fff' }}>
      <TopNav />
      <div className="pt-[72px]">

        {/* ── HEADER ── */}
        <div className="max-w-5xl mx-auto px-8 pt-16 pb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] mb-3" style={{ color:'var(--color-primary)' }}>
            Khám phá theo mùa
          </p>
          <h1 className="font-bold leading-tight mb-4"
              style={{ fontFamily:'var(--font-display)', fontSize:'clamp(2.8rem, 6vw, 4.5rem)' }}>
            Lịch Trình Mùa Vụ
          </h1>
          <p className="text-base leading-relaxed max-w-2xl" style={{ color:'var(--color-on-surface-variant)' }}>
            Mỗi mùa tại Bình Mỹ mang một sắc thái riêng — từ tiếng chuông đình ngân vang mùa xuân đến tiếng mái chèo khỏa nước mùa mưa. Chọn thời điểm, chúng tôi lo phần còn lại.
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-8">

          {/* ── SEASON CARDS ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
            {seasons.map((season, i) => {
              const Icon = season.icon;
              const active = selected.id === season.id;
              return (
                <button key={season.id} onClick={() => setSelected(season)}
                        className="relative overflow-hidden text-left rounded-2xl transition-all duration-300 animate-fade-up"
                        style={{ animationDelay:`${i*80}ms`, height:210,
                                 border: active ? `2px solid ${season.color}` : '2px solid transparent',
                                 boxShadow: active ? `0 12px 32px ${season.color}30` : '0 2px 12px rgba(26,58,24,0.08)',
                                 transform: active ? 'scale(1.02)' : 'scale(1)' }}>
                  <img src={season.image} alt={season.title}
                       className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
                       style={{ transform: active ? 'scale(1.05)' : 'scale(1)' }} />
                  <div className="absolute inset-0" style={{
                    background: active
                      ? `linear-gradient(160deg, ${season.color}CC 0%, ${season.color}88 100%)`
                      : 'linear-gradient(160deg, rgba(14,34,12,0.72) 0%, rgba(14,34,12,0.4) 100%)',
                  }} />
                  <div className="absolute inset-0 p-4 flex flex-col justify-between">
                    <div>
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-2"
                           style={{ background:'rgba(255,255,255,0.18)', backdropFilter:'blur(8px)' }}>
                        <Icon style={{ width:16, height:16, color:'white' }} />
                      </div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-white/70">{season.name}</p>
                      <h3 className="font-bold text-white text-sm leading-tight mt-0.5">{season.title}</h3>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CalendarDays className="w-3 h-3 text-white/60" />
                      <span className="text-[10px] text-white/60 font-medium">{season.months}</span>
                    </div>
                  </div>
                  {active && (
                    <div className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center bg-white">
                      <div className="w-2 h-2 rounded-full" style={{ background: season.color }} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* ── SEASON DETAIL ── */}
          <div key={selected.id} className="rounded-3xl overflow-hidden mb-16 animate-scale-in"
               style={{ border:`1px solid ${selected.color}22`,
                        boxShadow:`0 24px 60px ${selected.color}16, 0 4px 16px rgba(26,58,24,0.08)` }}>
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-5/12 relative overflow-hidden" style={{ minHeight:300 }}>
                <img src={selected.image} alt={selected.title}
                     className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0"
                     style={{ background:'linear-gradient(to right, transparent 55%, rgba(255,255,255,0.97) 100%)' }} />
                <div className="absolute top-6 left-6">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
                       style={{ background:'rgba(255,255,255,0.92)', backdropFilter:'blur(12px)' }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: selected.color }} />
                    <span className="text-xs font-bold" style={{ color: selected.color }}>{selected.name}</span>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-7/12 p-8 md:p-10"
                   style={{ background:'var(--color-surface-container-lowest)' }}>
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em]"
                      style={{ color: selected.color }}>{selected.months}</span>
                <h2 className="font-bold leading-tight mt-2 mb-4"
                    style={{ fontFamily:'var(--font-display)', fontSize:'clamp(2rem, 4vw, 3rem)' }}>
                  {selected.title}
                </h2>
                <p className="text-base leading-relaxed mb-6" style={{ color:'var(--color-on-surface-variant)' }}>
                  {selected.description}
                </p>
                <div className="rounded-2xl p-5 mb-6"
                     style={{ background:`${selected.color}08`, border:`1px solid ${selected.color}1F` }}>
                  <h3 className="font-semibold text-xs uppercase tracking-wider mb-4"
                      style={{ color: selected.color }}>Hoạt động nổi bật</h3>
                  <ul className="space-y-2.5">
                    {selected.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: selected.color }} />
                        <span className="text-sm leading-relaxed" style={{ color:'var(--color-on-surface)' }}>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Tip accordion */}
                <button className="w-full flex items-center justify-between p-4 rounded-xl mb-4 text-left"
                        style={{ background:'var(--color-surface-container)', border:'1px solid var(--color-outline)' }}
                        onClick={() => setOpenTip(!openTip)}>
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" style={{ color: selected.color }} />
                    <span className="text-sm font-semibold" style={{ color:'var(--color-on-surface)' }}>
                      Mẹo cho mùa này
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 transition-transform"
                               style={{ color:'var(--color-on-surface-variant)', transform: openTip ? 'rotate(180deg)' : 'none' }} />
                </button>
                {openTip && (
                  <p className="text-sm leading-relaxed px-4 pb-4 -mt-2 animate-fade-up"
                     style={{ color:'var(--color-on-surface-variant)' }}>
                    {selected.tips}
                  </p>
                )}
                <button className="flex items-center gap-3 px-7 py-3.5 rounded-2xl font-semibold text-sm text-white transition-all hover:gap-5"
                        style={{ background: selected.gradient, boxShadow:`0 8px 24px ${selected.color}40` }}>
                  Sắp xếp chuyến đi <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ── SAMPLE ITINERARY ── */}
          <section className="mb-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] mb-3"
               style={{ color: selected.color }}>Gợi ý lịch trình</p>
            <h2 className="font-bold mb-10"
                style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.8rem, 3vw, 2.6rem)' }}>
              Hành Trình 1 Ngày — {selected.title}
            </h2>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[22px] top-0 bottom-0 w-px"
                   style={{ background:`linear-gradient(to bottom, ${selected.color}, transparent)` }} />
              <div className="flex flex-col gap-0">
                {selected.itinerary.map((step, i) => (
                  <div key={i} className="flex items-start gap-5 pb-6 animate-fade-up"
                       style={{ animationDelay:`${i*50}ms` }}>
                    <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 z-10"
                         style={{ background: i === 0 || i === selected.itinerary.length-1
                                    ? selected.color : 'white',
                                  border:`2px solid ${selected.color}`,
                                  boxShadow:`0 2px 8px ${selected.color}30` }}>
                      <Clock className="w-4 h-4" style={{ color: i === 0 || i === selected.itinerary.length-1 ? 'white' : selected.color }} />
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-bold" style={{ color: selected.color }}>{step.time}</span>
                      </div>
                      <p className="font-semibold text-sm mb-0.5" style={{ color:'var(--color-on-surface)' }}>
                        {step.activity}
                      </p>
                      <p className="text-xs" style={{ color:'var(--color-on-surface-variant)' }}>{step.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── ANNUAL EVENTS ── */}
          <section className="mb-16 py-16" style={{ borderTop:'1px solid var(--color-outline)' }}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] mb-3"
               style={{ color:'var(--color-primary)' }}>Quanh năm</p>
            <h2 className="font-bold mb-10"
                style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.8rem, 3vw, 2.6rem)' }}>
              Sự Kiện Trong Năm
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ANNUAL_EVENTS.map((ev, i) => {
                const color = TYPE_COLORS[ev.type] || 'var(--color-primary)';
                return (
                  <div key={i} className="p-5 rounded-2xl flex items-start gap-4 animate-fade-up card-hover"
                       style={{ animationDelay:`${i*50}ms`, background:'var(--color-surface-container)',
                                border:'1px solid var(--color-outline)' }}>
                    <div className="px-2 py-4 rounded-xl text-center shrink-0"
                         style={{ background:`${color}12`, minWidth:60 }}>
                      <p className="text-[10px] font-bold leading-tight" style={{ color }}>{ev.month}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                              style={{ background:`${color}15`, color }}>{ev.type}</span>
                      </div>
                      <h3 className="font-semibold text-sm mb-1" style={{ color:'var(--color-on-surface)' }}>{ev.name}</h3>
                      <p className="text-xs leading-relaxed" style={{ color:'var(--color-on-surface-variant)' }}>{ev.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── PRACTICAL INFO ── */}
          <section className="mb-20 py-16" style={{ borderTop:'1px solid var(--color-outline)' }}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] mb-3"
               style={{ color:'var(--color-primary)' }}>Thông tin hữu ích</p>
            <h2 className="font-bold mb-10"
                style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.8rem, 3vw, 2.6rem)' }}>
              Chuẩn Bị Cho Chuyến Đi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Car, title:'Cách đến Bình Mỹ',
                  items:['Ô tô / xe máy: ~50 phút từ trung tâm TP.HCM qua Quốc lộ 22',
                         'Xe bus: Tuyến 13 từ Bến xe Miền Tây (45 phút)',
                         'Thuê xe máy tại TP.HCM: ~150.000đ/ngày',
                         'Thuyền từ Bạch Đằng: theo thỏa thuận'],
                },
                {
                  icon: Home, title:'Nơi lưu trú',
                  items:['Homestay miệt vườn: 350.000 – 600.000đ/đêm',
                         'Cắm trại ven sông: 150.000đ/người/đêm',
                         'Nhà nghỉ địa phương: 200.000 – 400.000đ/phòng',
                         'Đặt trước qua UBND xã hoặc HTX du lịch'],
                },
                {
                  icon: Backpack, title:'Nên mang theo',
                  items:['Kem chống nắng SPF 50+, nón lá hoặc mũ rộng vành',
                         'Thuốc chống muỗi (quan trọng vào mùa mưa)',
                         'Dép hoặc giày dễ tháo khi qua sông, vào vườn',
                         'Nước uống đủ dùng — trời nắng mất nước rất nhanh'],
                },
              ].map(({ icon: Icon, title, items }, i) => (
                <div key={i} className="p-6 rounded-2xl"
                     style={{ background:'var(--color-surface-container)', border:'1px solid var(--color-outline)' }}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                         style={{ background:'var(--color-primary-container)' }}>
                      <Icon className="w-5 h-5" style={{ color:'var(--color-primary)' }} />
                    </div>
                    <h3 className="font-semibold text-sm" style={{ color:'var(--color-on-surface)' }}>{title}</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {items.map((item, j) => (
                      <li key={j} className="text-xs leading-relaxed"
                          style={{ color:'var(--color-on-surface-variant)' }}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
