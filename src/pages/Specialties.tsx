import { useState } from 'react';
import { Plus, Minus, X, Search, ShoppingCart, Leaf, Star, ArrowRight, Sprout } from 'lucide-react';
import TopNav from '../components/TopNav';

interface Specialty {
  id: string; name: string; price: number; unit: string; image: string;
  description: string; category: string; rating?: number; badge?: string;
  season?: string; farmer?: string;
}

const SPECIALTIES: Specialty[] = [
  { id: '1', name: 'Rau Móp Muối Chua', price: 65000, unit: 'Hũ 500g', image: 'https://danviet.ex-cdn.com/files/f1/296231569849192448/2023/9/14/eed132e19a463303f67f3aa89bf23102-1694256082-800-width640height640-1694656257085-1694656257277874959193.jpeg', description: 'Đặc sản trứ danh ven sông Sài Gòn, vị chua thanh, giòn rụm. Thích hợp ăn kèm thịt luộc hoặc nấu canh chua.', category: 'Thực phẩm', rating: 4.8, badge: 'Bán chạy', season: 'Quanh năm', farmer: 'Cô Tư Nguyệt' },
  { id: '2', name: 'Bò Tơ Củ Chi', price: 250000, unit: 'Phần 500g', image: 'https://tuyhoafoods.vn/wp-content/uploads/2024/03/image-148.png', description: 'Thịt bò tơ đặc sản mềm, da giòn sực. Ướp theo vị truyền thống, tặng kèm rau rừng tươi và mắm nêm đậm đà.', category: 'Món ăn', rating: 4.9, badge: 'Đặc sản', season: 'Quanh năm', farmer: 'Nông trại Xanh Bình Mỹ' },
  { id: '3', name: 'Măng Cụt Trung An', price: 85000, unit: '1 Kg', image: 'https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2024_1_17_638411194870995791_cach-an-mang-cut-11.jpg', description: 'Măng cụt thu hoạch mỗi sáng sớm tại nhà vườn. Trái nhỏ, vỏ mỏng mịn, múi chua chua ngọt ngọt thanh mát.', category: 'Trái cây', rating: 4.7, season: 'T4 – T6', farmer: 'Vườn Ba Thi' },
  { id: '4', name: 'Bánh Tráng Phơi Sương', price: 40000, unit: 'Xấp 500g', image: 'https://dacsantayninh.info/wp-content/uploads/2015/06/banh-trang-phoi-suong-ngoc-han-2.jpg', description: 'Bánh tráng thủ công dẻo thơm từ gạo tẻ nguyên chất, phơi sương tự nhiên lúc nửa đêm để có độ mềm đặc trưng.', category: 'Đặc sản khô', rating: 4.6, badge: 'Thủ công', season: 'Quanh năm', farmer: 'Cô Tư Nguyệt' },
  { id: '5', name: 'Cá Lăng Sông Cắt Khúc', price: 180000, unit: '1 Kg', image: 'https://product.hstatic.net/200000401369/product/unnamed_9f1fe6eae95e4fe593634cee83881725.png', description: 'Cá lăng đánh bắt tự nhiên trên sông Sài Gòn. Đã làm sạch và cắt khúc. Thịt chắc, ngọt, không có xương dăm.', category: 'Thực phẩm tươi', rating: 4.8, season: 'T7 – T9', farmer: 'Anh Năm Rạch Tra' },
  { id: '6', name: 'Dừa Xiêm Lùn', price: 18000, unit: '1 Trái', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR693k2JLKh6oyCFvbU2mNcX9VBQFwp243Nhg&s', description: 'Dừa trồng trên bãi đất phù sa, nước ngọt lịm và nhiều, giải khát tức thì cho ngày hè nắng gắt.', category: 'Trái cây', rating: 4.5, season: 'Quanh năm', farmer: 'Vườn Ba Thi' },
  { id: '7', name: 'Sầu Riêng Cơm Vàng', price: 150000, unit: '1 Kg', image: 'https://cdn.tgdd.vn/Files/2022/05/26/1435152/sau-rieng-ri-6-loai-1-com-vang-hat-lep-chi-co-tai-bachhoaxanh-202205261941423003.jpg', description: 'Sầu riêng hạt lép, cơm vàng dày, vị ngọt béo đặc trưng của vùng đất phù sa ven sông. Mùa chín rộ tháng 5–6.', category: 'Trái cây', rating: 4.9, badge: 'Mùa vụ', season: 'T5 – T6', farmer: 'Vườn Ba Thi' },
  { id: '8', name: 'Chôm Chôm Java', price: 45000, unit: '1 Kg', image: 'https://fruitstt.vn/wp-content/uploads/2019/07/chom-chom-java-fruits-tT-3.jpg', description: 'Chôm chôm vỏ đỏ tươi, múi giòn, bóc dễ — loại Java giòn ngọt hơn chôm chôm thường, thích hợp làm quà.', category: 'Trái cây', rating: 4.6, season: 'T4 – T5', farmer: 'Vườn Ba Thi' },
  { id: '9', name: 'Mứt Dừa Thủ Công', price: 55000, unit: 'Hộp 300g', image: 'https://cdn.tgdd.vn/2022/01/CookRecipe/Avatar/muc-dua-non-thumbnail.jpg', description: 'Mứt dừa làm từ dừa tươi, sên tay theo phương pháp truyền thống — không dùng phẩm màu hay hương liệu nhân tạo.', category: 'Đặc sản khô', rating: 4.7, badge: 'Thủ công', season: 'T10 – T12', farmer: 'Cô Tư Nguyệt' },
  { id: '10', name: 'Rượu Nếp Than', price: 120000, unit: 'Chai 500ml', image: 'https://cdn.tgdd.vn/2021/02/CookProduct/BeFunky-collage(1)-1200x676-5.jpg', description: 'Rượu nếp than ủ truyền thống từ gạo nếp đen địa phương — màu tím đẹp, vị ngọt dịu, nồng độ nhẹ, rất được phụ nữ ưa chuộng.', category: 'Đồ uống', rating: 4.5, season: 'T10 – T1', farmer: 'Anh Năm Rạch Tra' },
  { id: '11', name: 'Lươn Đồng Um Tiêu', price: 200000, unit: 'Phần 400g', image: 'https://cdn.tgdd.vn/2020/07/CookRecipe/Avatar/luon-om-sa-ot-thumbnail.jpg', description: 'Lươn đồng đánh bắt tự nhiên, um với tiêu xanh, sả và nước dừa tươi — đậm đà vị miền Nam, ăn kèm cơm hoặc bánh mì.', category: 'Món ăn', rating: 4.7, season: 'T7 – T9', farmer: 'Anh Năm Rạch Tra' },
  { id: '12', name: 'Tôm Càng Sông', price: 280000, unit: '500g', image: 'https://i0.wp.com/onggiau.com.vn/wp-content/uploads/2024/07/1_Tom-cang-xanh-song-900-2.jpg', description: 'Tôm càng xanh đánh bắt tự nhiên từ sông Sài Gòn — con lớn, thịt chắc ngọt, chế biến theo nhiều cách đều ngon.', category: 'Thực phẩm tươi', rating: 4.9, badge: 'Tươi sống', season: 'T6 – T9', farmer: 'Anh Năm Rạch Tra' },
];

const FARMERS = [
  {
    name: 'Ông Ba Thi',
    farm: 'Vườn Ba Thi',
    specialty: 'Sầu riêng · Măng cụt · Chôm chôm',
    years: 35,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    image: 'https://danviet.ex-cdn.com/files/f1/296231569849192448/2023/6/6/img7628-16860370370241008038574.jpeg',
    quote: '"Tôi trồng cây như nuôi con — mỗi trái cây ra đời đều có câu chuyện của nó."',
  },
  {
    name: 'Cô Tư Nguyệt',
    farm: 'Xưởng Cô Tư',
    specialty: 'Bánh tráng · Mứt dừa · Rau móp muối',
    years: 28,
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=200',
    image: 'https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2024_1_21_638414600206287472_cach-lam-mut-dua-banh-te.jpg',
    quote: '"Làm bánh tráng là cả một nghệ thuật — phải có tình yêu thật sự mới làm được tấm bánh mỏng đều."',
  },
  {
    name: 'Anh Năm Rạch Tra',
    farm: 'Thủy sản Rạch Tra',
    specialty: 'Cá lăng · Tôm càng · Lươn đồng',
    years: 20,
    avatar: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&q=80&w=200',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4_vdRHG-1utHv991vmp4ByTFdZrYgezemaSa5ibq0hBmfsot4NzErI28&s=10',
    quote: '"Sông Sài Gòn nuôi sống gia đình tôi ba đời. Tôi chỉ lấy vừa đủ để sông còn có cá cho con cháu."',
  },
];

const MONTHS = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];
const SEASONAL: { name: string; months: number[]; color: string }[] = [
  { name: 'Măng cụt', months: [4, 5, 6], color: '#8B5A2B' },
  { name: 'Chôm chôm', months: [4, 5], color: '#c0392b' },
  { name: 'Sầu riêng', months: [5, 6], color: '#e67e22' },
  { name: 'Cá lăng', months: [7, 8, 9], color: '#6A9EAA' },
  { name: 'Tôm càng', months: [6, 7, 8, 9], color: '#2980b9' },
  { name: 'Lươn đồng', months: [7, 8, 9], color: '#5A7A6A' },
  { name: 'Bánh tráng', months: [1, 2, 3, 10, 11, 12], color: '#4A7C44' },
  { name: 'Dừa xiêm', months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], color: '#27ae60' },
];

export default function Specialties() {
  const [cart, setCart] = useState<{ [id: string]: number }>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [search, setSearch] = useState('');

  const categories = ['Tất cả', ...Array.from(new Set(SPECIALTIES.map(i => i.category)))];
  const addToCart = (id: string) => setCart(p => ({ ...p, [id]: (p[id] || 0) + 1 }));
  const updateQty = (id: string, d: number) => setCart(p => {
    const n = (p[id] || 0) + d;
    if (n <= 0) { const { [id]: _, ...rest } = p; return rest; }
    return { ...p, [id]: n };
  });
  const totalItems = Object.values(cart).reduce((s, c) => s + c, 0);
  const totalPrice = Object.entries(cart).reduce((s, [id, c]) => s + (SPECIALTIES.find(p => p.id === id)?.price ?? 0) * c, 0);
  const filtered = SPECIALTIES.filter(i =>
    (activeCategory === 'Tất cả' || i.category === activeCategory) &&
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <TopNav />
      <main className="min-h-screen font-body pt-[72px]"
        style={{ color: 'var(--color-on-surface)', background: '#fff' }}>

        {/* ── HERO ── */}
        <section className="relative overflow-hidden" style={{ height: 340 }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/ARS_copper_rich_foods.jpg"
            alt="Đặc sản" className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'saturate(0.82) brightness(0.72)' }} />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(14,34,12,0.25) 0%, rgba(14,34,12,0.85) 100%)' }} />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, rgba(14,34,12,0.7) 0%, transparent 55%)' }} />
          <div className="relative h-full flex flex-col justify-end px-8 md:px-16 pb-14 animate-fade-up">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full"
                style={{ background: 'rgba(181,212,173,0.2)', border: '1px solid rgba(181,212,173,0.35)' }}>
                <Sprout className="w-3.5 h-3.5" style={{ color: '#B5D4AD' }} />
                <span className="text-xs font-semibold" style={{ color: '#B5D4AD' }}>Nông sản sạch · Thẳng từ nhà vườn</span>
              </div>
            </div>
            <h1 className="font-bold text-white mb-2"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
              Đặc Sản Bình Mỹ
            </h1>
            <p className="text-base text-white/60 max-w-xl leading-relaxed">
              12 sản vật tinh túy từ những nhà vườn, xưởng thủ công và dòng sông Sài Gòn — được tuyển chọn kỹ lưỡng để mang hương vị quê nhà đến tận tay bạn.
            </p>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-8">

          {/* ── FARMER PROFILES ── */}
          <section className="py-20">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] mb-4"
              style={{ color: 'var(--color-primary)' }}>Người làm ra sản phẩm</p>
            <h2 className="font-bold mb-12"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Những Bàn Tay Tài Hoa
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FARMERS.map((f, i) => (
                <div key={i} className="rounded-2xl overflow-hidden animate-fade-up"
                  style={{
                    animationDelay: `${i * 80}ms`, border: '1px solid var(--color-outline)',
                    boxShadow: '0 2px 12px rgba(26,58,24,0.07)'
                  }}>
                  <div className="relative overflow-hidden" style={{ height: 180 }}>
                    <img src={f.image} alt={f.farm}
                      className="w-full h-full object-cover" />
                    <div className="absolute inset-0"
                      style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(14,34,12,0.85) 100%)' }} />
                    <div className="absolute bottom-0 left-0 p-4 flex items-end gap-3">
                      <img src={f.avatar} alt={f.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shrink-0" />
                      <div>
                        <p className="font-bold text-sm text-white leading-tight">{f.name}</p>
                        <p className="text-[11px] text-white/65">{f.farm} · {f.years} năm kinh nghiệm</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4"
                    style={{ background: 'var(--color-surface-container)' }}>
                    <p className="text-xs font-medium mb-3"
                      style={{ color: 'var(--color-primary)' }}>
                      {f.specialty}
                    </p>
                    <p className="text-sm italic leading-relaxed"
                      style={{ fontFamily: 'var(--font-display)', color: 'var(--color-on-surface-variant)', fontSize: '1rem' }}>
                      {f.quote}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── SEASONAL AVAILABILITY ── */}
          <section className="py-16" style={{ borderTop: '1px solid var(--color-outline)' }}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] mb-3"
              style={{ color: 'var(--color-primary)' }}>Theo mùa</p>
            <h2 className="font-bold mb-10"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}>
              Lịch Thu Hoạch Trong Năm
            </h2>
            <div className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid var(--color-outline)' }}>
              {/* Month header */}
              <div className="grid grid-cols-13 border-b"
                style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container)' }}>
                <div className="p-3 text-xs font-semibold" style={{ color: 'var(--color-on-surface-variant)' }}>Sản phẩm</div>
                {MONTHS.map(m => (
                  <div key={m} className="p-3 text-xs font-semibold text-center"
                    style={{ color: 'var(--color-on-surface-variant)' }}>{m}</div>
                ))}
              </div>
              {SEASONAL.map((item, i) => (
                <div key={i} className="grid grid-cols-13 border-b last:border-b-0"
                  style={{ borderColor: 'var(--color-outline)' }}>
                  <div className="p-3 text-xs font-medium" style={{ color: 'var(--color-on-surface)' }}>
                    {item.name}
                  </div>
                  {MONTHS.map((_, mi) => {
                    const active = item.months.includes(mi + 1);
                    return (
                      <div key={mi} className="p-2 flex items-center justify-center">
                        {active && (
                          <div className="w-full h-5 rounded-full"
                            style={{ background: item.color, opacity: 0.75 }} />
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </section>

          {/* ── PRODUCT GRID ── */}
          <section className="py-16" style={{ borderTop: '1px solid var(--color-outline)' }}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] mb-3"
              style={{ color: 'var(--color-primary)' }}>Cửa hàng</p>
            <h2 className="font-bold mb-8"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}>
              Đặt Trước Sản Phẩm
            </h2>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none flex-1">
                {categories.map(cat => (
                  <button key={cat} onClick={() => setActiveCategory(cat)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all"
                    style={{
                      background: activeCategory === cat ? 'var(--color-primary)' : 'var(--color-surface-container)',
                      color: activeCategory === cat ? 'white' : 'var(--color-on-surface-variant)',
                      border: activeCategory === cat ? '1.5px solid var(--color-primary)' : '1.5px solid var(--color-outline)',
                      boxShadow: activeCategory === cat ? '0 4px 14px rgba(74,124,68,0.3)' : 'none',
                    }}>
                    {cat}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl shrink-0"
                style={{ background: 'var(--color-surface-container)', border: '1.5px solid var(--color-outline)' }}>
                <Search className="w-4 h-4" style={{ color: 'var(--color-on-surface-variant)' }} />
                <input type="text" placeholder="Tìm sản phẩm..." value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="bg-transparent outline-none text-sm w-36"
                  style={{ color: 'var(--color-on-surface)' }} />
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-16">
              {filtered.map((item, i) => {
                const inCart = cart[item.id] || 0;
                return (
                  <div key={item.id}
                    className="rounded-2xl overflow-hidden flex flex-col animate-fade-up card-hover"
                    style={{
                      animationDelay: `${i * 45}ms`,
                      background: 'var(--color-surface-container-lowest)',
                      border: '1px solid var(--color-outline)',
                      boxShadow: '0 2px 10px rgba(26,58,24,0.06)'
                    }}>
                    <div className="relative overflow-hidden" style={{ height: 200 }}>
                      <img src={item.image} referrerPolicy="no-referrer" alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                      <div className="absolute inset-0"
                        style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(14,34,12,0.28) 100%)' }} />
                      {item.badge && (
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold text-white"
                          style={{ background: 'var(--color-primary)' }}>{item.badge}</span>
                      )}
                      {item.season && (
                        <span className="absolute top-3 right-3 px-2 py-1 rounded-lg text-[10px] font-semibold"
                          style={{ background: 'rgba(255,255,255,0.92)', color: 'var(--color-primary)' }}>
                          {item.season}
                        </span>
                      )}
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-base leading-snug" style={{ color: 'var(--color-on-surface)' }}>
                          {item.name}
                        </h3>
                        {item.rating && (
                          <div className="flex items-center gap-1 shrink-0">
                            <Star className="w-3 h-3 fill-current" style={{ color: '#f59e0b' }} />
                            <span className="text-xs font-semibold" style={{ color: 'var(--color-on-surface-variant)' }}>
                              {item.rating}
                            </span>
                          </div>
                        )}
                      </div>
                      {item.farmer && (
                        <p className="text-[11px] font-medium mb-2" style={{ color: 'var(--color-primary)' }}>
                          {item.farmer}
                        </p>
                      )}
                      <p className="text-sm leading-relaxed mb-4 flex-1 line-clamp-2"
                        style={{ color: 'var(--color-on-surface-variant)' }}>
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <div>
                          <span className="font-bold text-lg" style={{ color: 'var(--color-primary)' }}>
                            {item.price.toLocaleString('vi-VN')}đ
                          </span>
                          <span className="text-xs block" style={{ color: 'var(--color-on-surface-variant)' }}>
                            / {item.unit}
                          </span>
                        </div>
                        {inCart === 0 ? (
                          <button onClick={() => addToCart(item.id)}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white"
                            style={{ background: 'var(--color-primary)', boxShadow: '0 4px 14px rgba(74,124,68,0.35)' }}>
                            <Plus className="w-4 h-4" /> Thêm
                          </button>
                        ) : (
                          <div className="flex items-center gap-1 rounded-xl overflow-hidden"
                            style={{ border: '1.5px solid var(--color-primary)' }}>
                            <button onClick={() => updateQty(item.id, -1)}
                              className="w-9 h-9 flex items-center justify-center"
                              style={{ color: 'var(--color-primary)' }}>
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-6 text-center font-bold text-sm" style={{ color: 'var(--color-primary)' }}>
                              {inCart}
                            </span>
                            <button onClick={() => updateQty(item.id, 1)}
                              className="w-9 h-9 flex items-center justify-center text-white"
                              style={{ background: 'var(--color-primary)' }}>
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Floating Cart */}
        {totalItems > 0 && (
          <button onClick={() => setIsCartOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl text-white font-semibold text-sm transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, var(--color-primary), #6A9EAA)',
              boxShadow: '0 8px 28px rgba(74,124,68,0.45)'
            }}>
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 flex items-center justify-center rounded-full text-[9px] font-bold"
                style={{ background: 'white', color: 'var(--color-primary)', width: 18, height: 18 }}>
                {totalItems}
              </span>
            </div>
            <span>{totalPrice.toLocaleString('vi-VN')}đ</span>
          </button>
        )}

        {/* Cart Drawer */}
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/40" style={{ backdropFilter: 'blur(4px)' }}
              onClick={() => setIsCartOpen(false)} />
            <div className="relative w-full md:w-[400px] h-full flex flex-col"
              style={{ background: 'var(--color-surface)', boxShadow: '-12px 0 40px rgba(0,0,0,0.15)' }}>
              <div className="p-6 flex items-center justify-between"
                style={{ borderBottom: '1px solid var(--color-outline)' }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: 'var(--color-primary-container)' }}>
                    <Leaf style={{ width: 18, height: 18, color: 'var(--color-primary)' }} />
                  </div>
                  <div>
                    <h2 className="font-bold text-base" style={{ color: 'var(--color-on-surface)' }}>Đơn đặt trước</h2>
                    <p className="text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>{totalItems} sản phẩm</p>
                  </div>
                </div>
                <button onClick={() => setIsCartOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg"
                  style={{ color: 'var(--color-on-surface-variant)' }}>
                  <X style={{ width: 18, height: 18 }} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
                {Object.entries(cart).map(([id, qty]) => {
                  const item = SPECIALTIES.find(p => p.id === id)!;
                  return (
                    <div key={id} className="flex gap-3 p-3 rounded-xl"
                      style={{ border: '1px solid var(--color-outline)', background: 'var(--color-surface-container-lowest)' }}>
                      <img src={item.image} referrerPolicy="no-referrer" alt={item.name}
                        className="rounded-xl object-cover shrink-0" style={{ width: 72, height: 72 }} />
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <p className="font-semibold text-sm truncate" style={{ color: 'var(--color-on-surface)' }}>{item.name}</p>
                        <p className="text-xs font-bold" style={{ color: 'var(--color-primary)' }}>
                          {(item.price * qty).toLocaleString('vi-VN')}đ
                        </p>
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQty(id, -1)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center"
                            style={{ background: 'var(--color-surface-container)', color: 'var(--color-on-surface)' }}>
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-5 text-center text-sm font-bold">{qty}</span>
                          <button onClick={() => updateQty(id, 1)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
                            style={{ background: 'var(--color-primary)' }}>
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {totalItems > 0 && (
                  <div className="mt-2 pt-5 flex flex-col gap-3"
                    style={{ borderTop: '1px solid var(--color-outline)' }}>
                    <h3 className="font-semibold text-sm">Thông tin nhận hàng</h3>
                    {['Họ và tên', 'Số điện thoại'].map(p => (
                      <input key={p} type="text" placeholder={p}
                        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                        style={{ background: 'var(--color-surface-container)', border: '1px solid var(--color-outline)', color: 'var(--color-on-surface)' }} />
                    ))}
                    <textarea placeholder="Ghi chú (ngày nhận, địa điểm...)" rows={3}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
                      style={{ background: 'var(--color-surface-container)', border: '1px solid var(--color-outline)', color: 'var(--color-on-surface)' }} />
                  </div>
                )}
              </div>
              {totalItems > 0 && (
                <div className="p-5" style={{ borderTop: '1px solid var(--color-outline)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium" style={{ color: 'var(--color-on-surface-variant)' }}>Tổng tạm tính</span>
                    <span className="font-bold text-xl" style={{ color: 'var(--color-primary)' }}>
                      {totalPrice.toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                  <button className="w-full py-3.5 rounded-2xl font-semibold text-sm text-white"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-primary), #6A9EAA)',
                      boxShadow: '0 8px 24px rgba(74,124,68,0.35)'
                    }}>
                    Gửi yêu cầu đặt trước
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
