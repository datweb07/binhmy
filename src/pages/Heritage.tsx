import { useState } from 'react';
import {
  Play, Building, ShieldCheck, MapPin, Camera, MessageCircle, Heart,
  CheckCircle2, ChevronDown, Leaf, ChevronRight, Clock, Ticket,
  CalendarDays, Mic2, BookOpen, Fish, Wheat
} from 'lucide-react';
import TopNav from '../components/TopNav';

type Role = 'all' | 'government' | 'zone' | 'tourist';

const ROLE_META: Record<Exclude<Role, 'all'>, { label: string; color: string; bg: string }> = {
  government: { label: 'Chính quyền', color: '#b53a2f', bg: 'rgba(181,58,47,0.1)' },
  zone: { label: 'Ban quản lý/Dịch vụ', color: '#4A7C44', bg: 'rgba(74,124,68,0.1)' },
  tourist: { label: 'Du khách', color: '#6A9EAA', bg: 'rgba(106,158,170,0.1)' },
};

interface Activity { title: string; desc: string; }
interface Event { name: string; month: string; desc: string; }
interface Location {
  id: string; name: string; type: string; year: string;
  hours: string; admission: string; description: string; story: string;
  image: string; gallery: string[]; address: string; manager: string;
  phone: string; audioTitle: string; accent: string;
  activities: Activity[]; events: Event[];
}

const LOCATIONS: Location[] = [
  {
    id: 'dinh-binh-my',
    name: 'Đình Bình Mỹ',
    type: 'Di tích Lịch sử - Văn hóa',
    year: 'Thế kỷ XIX',
    hours: '06:00 – 18:00',
    admission: 'Miễn phí',
    address: 'Tỉnh lộ 9, xã Bình Mỹ, TP.HCM',
    manager: 'Ban Quản lý Di tích Bình Mỹ',
    phone: '1900 6868',
    audioTitle: 'Huyền thoại Lập làng Bình Mỹ',
    accent: '#8B5A2B',
    image: '/assets/images/dinh-binh-my-1.jpg',
    gallery: [
      '/assets/images/dinh-binh-my-1.jpg',
      '/assets/images/dinh-binh-my-2.jpg',
      '/assets/images/dinh-binh-my-3.jpg',
      '/assets/images/dinh-binh-my-4.jpg',
    ],
    description: 'Nơi kết nối các giá trị lịch sử và cộng đồng, lưu giữ ký ức và phát triển văn hóa địa phương.',
    story: 'Được xây dựng vào thế kỷ XIX, Đình Bình Mỹ là trái tim tinh thần của cả xã — nơi những người khai hoang đầu tiên tìm về cúng bái và gửi gắm ước nguyện. Mái ngói âm dương, cột gỗ chạm khắc rồng phụng và sân đình rộng rãi toát lên vẻ trang nghiêm mà gần gũi của kiến trúc đình làng Nam Bộ.',
    activities: [
      { title: 'Tham quan kiến trúc cổ', desc: 'Chiêm ngưỡng công trình đình làng với mái ngói âm dương và cột gỗ chạm khắc rồng phụng tinh xảo gần 200 năm tuổi.' },
      { title: 'Nghe thuyết minh tự động', desc: 'Lắng nghe huyền thoại lập làng qua giọng kể sống động của người địa phương — có sẵn tiếng Việt và tiếng Anh.' },
      { title: 'Nhiếp ảnh kiến trúc', desc: 'Ánh sáng buổi sớm tràn qua cổng tam quan tạo ra những khung hình vàng — lý tưởng cho nhiếp ảnh phong cảnh.' },
      { title: 'Trải nghiệm lễ hội', desc: 'Tham gia Lễ Kỳ Yên — lễ hội cộng đồng lớn nhất xã, diễn ra 3 ngày với hát bội, múa lân và ẩm thực truyền thống.' },
    ],
    events: [
      { name: 'Lễ hội Kỳ Yên', month: 'Tháng 10 ÂL', desc: 'Lễ hội lớn nhất xã Bình Mỹ, kéo dài 3 ngày với hát bội, cúng đình và chợ phiên ẩm thực.' },
      { name: 'Giỗ Tiền Hiền', month: 'Tháng 3 ÂL', desc: 'Ngày tưởng nhớ các bậc tiền nhân có công khai phá vùng đất Bình Mỹ — buổi lễ trang trọng và cảm động.' },
      { name: 'Ngày Di sản Văn hóa', month: '23/11 DL', desc: 'Triển lãm ảnh, tư liệu và giao lưu với các nghệ nhân dân gian địa phương.' },
    ],
  },
  {
    id: 'vuon-trung-an',
    name: 'Vườn Trái Cây Trung An',
    type: 'Không gian Sinh thái & Nông nghiệp',
    year: 'Hơn 50 năm',
    hours: '07:00 – 17:00',
    admission: '50.000đ/người',
    address: 'Xã Trung An, TP.HCM',
    manager: 'HTX Nông nghiệp Sinh thái Trung An',
    phone: '0901 234 567',
    audioTitle: 'Nghe kể chuyện Nghề Vườn',
    accent: '#4A7C44',
    image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80',
    gallery: [
      'https://focusasiatravel.vn/wp-content/uploads/2022/06/vuon-trai-cay-trung-an-cu-chi-1.jpg',
      'https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/10/du-lich-vuon-trai-cay-xu-huong-moi-danh-cho-gioi-tre.png',
      'https://ik.imagekit.io/tvlk/blog/2023/06/vuon-trai-cay-cu-chi-3.jpg',
      'https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/10/vui-choi-an-uong-thoai-mai-tai-vuon-trai-cay-cu-chi.jpg',
    ],
    description: 'Khu miệt vườn trù phú ven sông, lưu giữ phương thức canh tác truyền thống của người Nam Bộ.',
    story: 'Hơn nửa thế kỷ nay, những tán cây xoài, chôm chôm, măng cụt trải dài theo bờ kênh rạch tạo thành một mảng xanh không thể thiếu của Trung An. Các nhà vườn nơi đây không chỉ trồng cây — họ nuôi dưỡng một lối sống, một triết lý canh tác thuận theo thiên nhiên được truyền từ thế hệ này sang thế hệ khác.',
    activities: [
      { title: 'Hái trái cây tự tay', desc: 'Tự mình leo vào vườn chọn và hái măng cụt, chôm chôm, xoài chín trực tiếp từ cành — thưởng thức tại chỗ không giới hạn.' },
      { title: 'Chèo xuồng qua vườn', desc: 'Ngồi xuồng len lỏi qua các kênh rạch nhỏ dưới tán cây xanh mát — trải nghiệm yêu thích của mọi gia đình.' },
      { title: 'Học ủ phân hữu cơ', desc: 'Cùng chủ vườn tìm hiểu kỹ thuật canh tác hữu cơ truyền thống — cách người Nam Bộ nuôi đất, giữ cây.' },
      { title: 'Ăn trưa dưới tán vườn', desc: 'Thưởng thức bữa cơm miệt vườn với cá kho tộ, canh chua, rau dân dã ngay bên bờ kênh rợp bóng cây.' },
    ],
    events: [
      { name: 'Mùa Hái Măng Cụt', month: 'Tháng 5 – 6', desc: 'Đỉnh cao thu hoạch — vào mùa, có thể tự tay hái và thưởng thức buffet trái cây không giới hạn tại vườn.' },
      { name: 'Ngày Hội Nhà Vườn', month: 'Tháng 8 hàng năm', desc: 'Hội thi trái cây đẹp, giao lưu nhà vườn và trưng bày sản phẩm nông nghiệp sạch của cả xã.' },
    ],
  },
  {
    id: 'lang-banh-trang',
    name: 'Làng Cuốn',
    type: 'Di sản Văn hóa Phi vật thể',
    year: 'Hơn 100 năm',
    hours: '05:00 – 16:00',
    admission: 'Miễn phí',
    address: 'Ấp Bình Thượng, xã Bình Mỹ, TP.HCM',
    manager: 'Dự án Làng Cuốn',
    phone: '0912 345 678',
    audioTitle: 'Nghề Tráng Bánh Trăm Năm',
    accent: '#6A9EAA',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80',
    gallery: [
      'https://image.sggp.org.vn/w1000/Uploaded/2026/zotnae/2026_02_06/1000015804-1563-2437.jpg.webp',
      'https://banhtrangthienthat.com/wp-content/uploads/2025/01/banh-trang-thien-that-ben-tre-17-1024x677.jpg',
      'https://banhtrangthienthat.com/wp-content/uploads/2025/02/banh-trang-my-long-ben-tre-banh-trang-nuong-san-thien-that-2-700x394.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScNWqswJnXQ6NG-W7gFYQj1ntDYwKNX9047A1s6nF_PliO3dzPhsLWC-s&s=10',
    ],
    description: 'Dự án văn hoá lấy cảm hứng từ nghề làm bánh tráng phơi sương thủ công — đặc sản mang hương vị quê nhà.',
    story: 'Làng Cuốn là một dự án đặc biệt nhằm khôi phục và tôn vinh những giá trị truyền thống của nghề làm bánh tráng. Dù nghề gốc phát triển mạnh ở Phú Hòa Đông, Làng Cuốn tại Bình Mỹ tái hiện lại không gian lao động chân chất: từ khâu nhóm lửa, xay bột cho đến tráng những tấm bánh mỏng manh trong sương sớm.',
    activities: [
      { title: 'Tự tay tráng bánh', desc: 'Được hướng dẫn trực tiếp bởi nghệ nhân — học cách đổ bột, tráng mỏng và phơi bánh đúng kỹ thuật truyền thống.' },
      { title: 'Xem phơi bánh buổi sớm', desc: 'Cảnh hàng nghìn tấm bánh trắng tinh phơi trên giàn tre dưới ánh bình minh — một khung cảnh thuần Việt khó quên.' },
      { title: 'Mua bánh trực tiếp tại xưởng', desc: 'Mua bánh tráng tươi hoặc khô thẳng từ tay người làm — giá gốc, chất lượng đảm bảo không qua trung gian.' },
      { title: 'Nghe kể lịch sử nghề', desc: 'Các cụ cao niên trong làng kể chuyện nghề từ thời cha ông — nguồn gốc, bí quyết và những thăng trầm qua bao thế hệ.' },
    ],
    events: [
      { name: 'Sự kiện Làng Cuốn', month: 'Tháng 9 hàng năm', desc: 'Triển lãm nghề tráng bánh, thi làm bánh và chợ ẩm thực địa phương — thu hút hàng nghìn du khách mỗi năm.' },
      { name: 'Tham quan xưởng mở', month: 'Thứ 7 & Chủ Nhật', desc: 'Mỗi cuối tuần, 3 xưởng bánh trong làng mở cửa đón khách tham quan và trải nghiệm miễn phí.' },
    ],
  },
  {
    id: 'ben-do-rach-tra',
    name: 'Bến Đò Rạch Tra',
    type: 'Di tích Lịch sử & Cảnh quan Sông nước',
    year: 'Thế kỷ XX',
    hours: '05:00 – 19:00',
    admission: 'Miễn phí (thuyền: 30.000đ/người)',
    address: 'Bờ sông Sài Gòn, xã Bình Mỹ, TP.HCM',
    manager: 'UBND Xã Bình Mỹ',
    phone: '028 3789 1234',
    audioTitle: 'Bến Sông Và Ký Ức Miền Nam',
    accent: '#5A7A6A',
    image: 'https://i.ytimg.com/vi/Npe_FrGuPck/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD2AdatpMlrgYoK9a9QpVe8p3RkkA',
    gallery: [
      'https://hanoidep.vn/wp-content/uploads/2025/10/z6620498249982-b21df1ef3507876f6d3833bdf908159a-2138-1944-5999-7349.jpg',
      'https://cdn2.fptshop.com.vn/unsafe/800x0/xa_binh_my_cua_tphcm_2_822df4b26f.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4d_2YBzTnEJvCEspV-Td5qdItffzCh9JsK1m8Wt4EYpp8vt8JPz3cv7w&s=10',
      'https://thanhnien.mediacdn.vn/Uploaded/trangtt/2021_10_27/pha-5295.jpeg',
    ],
    description: 'Bến đò cổ trên sông Sài Gòn — nơi giao thương, gặp gỡ và lưu giữ ký ức của nhiều thế hệ người Bình Mỹ.',
    story: 'Từ khi con sông Sài Gòn còn là huyết mạch duy nhất nối Bình Mỹ với thế giới bên ngoài, bến đò Rạch Tra đã là điểm hội tụ của cả xã. Tiếng gõ mạn thuyền, tiếng trả giá của thương hồ và mùi nước sông mỗi buổi sớm tạo nên một nhịp sống đặc biệt không thể tìm thấy ở bất cứ đô thị nào.',
    activities: [
      { title: 'Thuyền ngắm hoàng hôn', desc: 'Đi thuyền trên sông Sài Gòn lúc chiều tà — khi mặt trời đổ xuống sau hàng dừa nước tạo ra cảnh đẹp không thể quên.' },
      { title: 'Câu cá dân dã', desc: 'Ngồi bên bờ hoặc trên thuyền thả câu kiểu truyền thống — cá lăng, cá trê, tôm càng là những loài hay gặp nhất.' },
      { title: 'Chụp ảnh sông nước', desc: 'Bến đò lúc bình minh với sương mù giăng trên mặt sông và những chiếc ghe chở hàng là khung cảnh thuần Việt hiếm có.' },
      { title: 'Xem chợ thuyền buổi sáng', desc: 'Từ 5–7 giờ sáng, thương lái và nhà vườn trao đổi nông sản ngay trên thuyền — một phiên chợ sông còn sót lại.' },
    ],
    events: [
      { name: 'Đua thuyền Mừng Xuân', month: 'Mùng 4 Tết ÂL', desc: 'Lễ hội đua thuyền truyền thống trên sông Sài Gòn — thu hút hàng nghìn người xem từ khắp vùng.' },
      { name: 'Chợ Phiên Sông Nước', month: 'Hàng tháng (ngày Rằm)', desc: 'Chợ nổi nhỏ họp trên sông — bán đặc sản, nông sản và đồ thủ công của người dân địa phương.' },
    ],
  },
  {
    id: 'canh-dong-sen',
    name: 'Cánh Đồng Sen Bình Mỹ',
    type: 'Khu Cảnh quan Sinh thái',
    year: 'Tự nhiên',
    hours: '05:30 – 10:00 (sáng sớm tốt nhất)',
    admission: '20.000đ/người',
    address: 'Ấp Bình Thạnh, xã Bình Mỹ, TP.HCM',
    manager: 'HTX Hoa Sen Bình Mỹ',
    phone: '0933 456 789',
    audioTitle: 'Sen Hồng Trên Đồng Bình Mỹ',
    accent: '#A0659A',
    image: 'https://photo-cms-vovworld.zadn.vn/w730/uploaded/vovworld/qjhmn/2023_06_08/a5_pihc.jpg',
    gallery: [
      'https://ktx.vnmediacdn.com/stores/news_dataimages/thuky1/072020/02/13/in_article/1745_canh_dong_sen-22.jpg',
      'https://thamhiemmekong.com/wp-content/uploads/2019/12/dong-sen-thap-muoi-4.jpg',
      'https://media-cdn-v2.laodong.vn/Storage/newsportal/2018/6/5/611242/_MG_2055.jpg',
      'https://photo-cms-vovworld.zadn.vn/w730/uploaded/vovworld/qjhmn/2023_06_08/a5_pihc.jpg',
    ],
    description: 'Đầm sen rộng lớn với hàng nghìn bông nở rộ mỗi sáng — điểm check-in thiên nhiên không thể bỏ qua của Bình Mỹ.',
    story: 'Mỗi buổi bình minh, hàng nghìn bông sen hồng đua nhau nở trên mặt hồ yên tĩnh, tỏa hương thơm ngát hòa quyện với sương mai và tiếng chim hót líu lo. Cánh đồng sen Bình Mỹ không chỉ là chỗ chụp ảnh — đây là không gian chữa lành mà người địa phương gìn giữ như một báu vật thiên nhiên.',
    activities: [
      { title: 'Chụp ảnh bình minh', desc: 'Đến trước 6 giờ sáng để bắt trọn khoảnh khắc sen nở trong ánh hồng bình minh — khung cảnh đẹp nhất trong ngày.' },
      { title: 'Chèo thuyền qua đầm sen', desc: 'Ngồi thuyền nhỏ len lỏi giữa những bông sen cao quá đầu người — trải nghiệm độc đáo chỉ có ở Bình Mỹ.' },
      { title: 'Thưởng trà ướp sen', desc: 'Uống trà xanh được ướp trực tiếp trong hoa sen tươi hái buổi sáng — hương vị thanh khiết đặc biệt.' },
      { title: 'Vẽ tranh thiên nhiên', desc: 'Tham gia buổi vẽ ký họa ngoài trời với cánh đồng sen làm hậu cảnh — tổ chức mỗi cuối tuần.' },
    ],
    events: [
      { name: 'Lễ hội Sen Bình Mỹ', month: 'Tháng 5 – 6 hàng năm', desc: 'Lễ hội sen mùa nở rộ — trưng bày nghệ thuật, thưởng thức ẩm thực từ sen và nhiều hoạt động trải nghiệm.' },
      { name: 'Workshop Nhiếp ảnh Sen', month: 'Thứ 7 đầu tháng', desc: 'Nhiếp ảnh gia địa phương hướng dẫn kỹ thuật chụp ảnh hoa và cảnh đồng — phù hợp mọi cấp độ.' },
    ],
  },
];

const ALL_POSTS = [
  { id: '1', locationId: 'dinh-binh-my', author: 'UBND & Ban Quản lý Di tích', role: 'government' as Role, avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150', verified: true, time: '2 giờ trước', content: 'Kế hoạch bảo tồn và Lễ hội Kỳ Yên: Từ ngày 15-17 tháng Mười Âm lịch, chính quyền địa phương phối hợp tổ chức tuần lễ Văn hóa - Ẩm thực. Xin mời bà con và du khách đến tham gia.', likes: 245, comments: 32 },
  { id: '2', locationId: 'dinh-binh-my', author: 'KDL Sinh thái Bình Mỹ', role: 'zone' as Role, avatar: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=150', verified: true, time: '5 giờ trước', content: 'Hưởng ứng lễ hội, khu du lịch sẽ mở bến neo đỗ thuyền miễn phí cho du khách viếng Đình trong suốt 3 ngày. Kèm voucher giảm 20% cho khách mặc áo bà ba.', likes: 128, comments: 18 },
  { id: '3', locationId: 'dinh-binh-my', author: 'Gia Đình nhà Su', role: 'tourist' as Role, avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=150', time: '1 ngày trước', content: 'Hai bé nhà mình được nghe các bác lớn tuổi kể chuyện khai hoang rất thú vị và xúc động. Ai biết gần đây có cơ sở tráng bánh tráng thủ công nào cho tham quan không ạ?', images: ['https://images.unsplash.com/photo-1610014077699-b132ee9eabc9?auto=format&fit=crop&q=80'], likes: 89, comments: 15 },
  { id: '4', locationId: 'vuon-trung-an', author: 'Phòng Nông nghiệp Xã Bình Mỹ', role: 'government' as Role, avatar: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=150', verified: true, time: '3 giờ trước', content: 'Thông báo: Tuần tới dự báo có mưa lớn kéo dài. Đề nghị các nhà vườn khu vực chủ động khơi thông mương liếp, tránh ngập úng gốc sầu riêng và măng cụt. Tổ khuyến nông sẽ hỗ trợ từ sáng thứ 2.', likes: 112, comments: 10 },
  { id: '5', locationId: 'vuon-trung-an', author: 'Gia Đình Táo Đỏ', role: 'tourist' as Role, avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=150', time: '4 giờ trước', content: 'Bọn trẻ thích mê vì được tận tay hái chôm chôm từ trên cây. Quả ngọt, giòn và siêu tươi! Các cô chú chủ vườn còn hướng dẫn cách ủ phân hữu cơ rất hay nữa. Sẽ sớm quay lại! 🌳🍎', images: ['https://images.unsplash.com/photo-1622288062590-78a4eaee82f4?auto=format&fit=crop&q=80'], likes: 310, comments: 24 },
  { id: '6', locationId: 'vuon-trung-an', author: 'Nhà vườn Cô Tư', role: 'zone' as Role, avatar: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&q=80&w=150', verified: true, time: '1 ngày trước', content: 'Sắp vào mùa măng cụt chín rộ (cuối tháng 5), vườn sẽ có tiệc buffet trái cây dân dã dọc bờ kênh. Ai muốn giữ chỗ trước thì nhắn tin cho Cô Tư nhé.', likes: 195, comments: 42 },
  { id: '7', locationId: 'lang-banh-trang', author: 'Dự án Làng Cuốn', role: 'government' as Role, avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150', verified: true, time: '1 ngày trước', content: 'Sự kiện Làng Cuốn tháng 9 sắp tới! Năm nay sẽ có thêm khu trình diễn nghề tráng bánh trực tiếp và cuộc thi "Tấm Bánh Đẹp Nhất" với giải thưởng hấp dẫn. Đón chờ nhé 🎉', likes: 156, comments: 28 },
  { id: '8', locationId: 'lang-banh-trang', author: 'Du Khách Miền Bắc', role: 'tourist' as Role, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150', time: '2 ngày trước', content: 'Lần đầu tiên được tận tay tráng bánh — thật sự không dễ chút nào! Mỏng đều, không rách là cả một kỹ năng. Rất phục các cô chú thợ làm việc từ 4 giờ sáng mỗi ngày.', likes: 203, comments: 19 },
  { id: '9', locationId: 'canh-dong-sen', author: 'CLB Nhiếp ảnh TP.HCM', role: 'zone' as Role, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150', verified: true, time: '5 giờ trước', content: 'Buổi chụp ảnh bình minh hôm nay tại đầm sen Bình Mỹ — ánh sáng vàng, hương sen ngào ngạt và không khí trong lành. Đây thực sự là báu vật thiên nhiên cần được bảo tồn.', images: ['https://images.unsplash.com/photo-1591617009365-6f4b8f28cfdf?auto=format&fit=crop&q=80'], likes: 412, comments: 67 },
];

const FILTER_LABELS: { key: Role; label: string }[] = [
  { key: 'all', label: 'Tất cả' },
  { key: 'government', label: 'CQ Quản lý' },
  { key: 'zone', label: 'Nhà Vườn/Dịch Vụ' },
  { key: 'tourist', label: 'Du Khách' },
];

export default function Heritage() {
  const [selectedId, setSelectedId] = useState(LOCATIONS[0].id);
  const [filter, setFilter] = useState<Role>('all');
  const [activeVoice, setActiveVoice] = useState(false);
  const [activeGallery, setActiveGallery] = useState(0);

  const loc = LOCATIONS.find(l => l.id === selectedId) || LOCATIONS[0];
  const posts = ALL_POSTS.filter(p => p.locationId === selectedId && (filter === 'all' || p.role === filter));

  return (
    <>
      <TopNav />
      <main className="w-full min-h-screen font-body pt-[72px]"
        style={{ color: 'var(--color-on-surface)', background: '#fff' }}>

        {/* ── HERO ── */}
        <section className="relative overflow-hidden" style={{ height: '60vh', minHeight: 380 }}
          key={loc.id}>
          <img src={loc.image} alt={loc.name}
            className="absolute inset-0 w-full h-full object-cover animate-fade-in"
            style={{ filter: 'brightness(0.7) saturate(0.8)' }} />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(14,34,12,0.2) 0%, rgba(14,34,12,0.88) 100%)' }} />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, rgba(14,34,12,0.7) 0%, transparent 55%)' }} />

          <div className="absolute bottom-0 left-0 w-full max-w-4xl px-8 md:px-16 pb-14 animate-fade-up">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-widest mb-4"
              style={{ background: `${loc.accent}25`, border: `1px solid ${loc.accent}50`, color: loc.accent }}>
              {loc.type}
            </span>
            <h1 className="font-bold text-white mb-2 leading-tight"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
              {loc.name}
            </h1>
            <p className="text-base text-white/60 max-w-xl leading-relaxed">{loc.description}</p>
          </div>
        </section>

        {/* ── LOCATION TABS ── */}
        <div className="sticky top-[72px] z-20 w-full"
          style={{
            background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--color-outline)'
          }}>
          <div className="max-w-6xl mx-auto px-6 flex items-center gap-2 overflow-x-auto scrollbar-none py-3">
            {LOCATIONS.map(l => (
              <button key={l.id} onClick={() => { setSelectedId(l.id); setActiveGallery(0); }}
                className="flex items-center gap-2.5 px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-200 shrink-0 text-sm font-medium"
                style={{
                  background: selectedId === l.id ? `${l.accent}15` : 'transparent',
                  color: selectedId === l.id ? l.accent : 'var(--color-on-surface-variant)',
                  border: selectedId === l.id ? `1.5px solid ${l.accent}40` : '1.5px solid transparent',
                }}>
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: l.accent }} />
                {l.name}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-8">

          {/* ── STORY + FACTS ── */}
          <section className="py-14 grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] mb-4"
                style={{ color: loc.accent }}>Câu chuyện</p>
              <h2 className="font-bold leading-tight mb-5"
                style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}>
                {loc.name}
              </h2>
              <p className="text-base leading-relaxed" style={{ color: 'var(--color-on-surface-variant)' }}>
                {loc.story}
              </p>

              {/* Facts strip */}
              <div className="grid grid-cols-2 gap-3 mt-8">
                {[
                  { icon: Clock, label: 'Giờ mở cửa', val: loc.hours },
                  { icon: Ticket, label: 'Vé vào cổng', val: loc.admission },
                  { icon: MapPin, label: 'Địa chỉ', val: loc.address },
                  { icon: Building, label: 'Quản lý', val: loc.manager },
                ].map(({ icon: Icon, label, val }) => (
                  <div key={label} className="p-3.5 rounded-xl"
                    style={{ background: 'var(--color-surface-container)', border: '1px solid var(--color-outline)' }}>
                    <Icon className="w-4 h-4 mb-1.5" style={{ color: loc.accent }} />
                    <p className="text-[10px] font-semibold uppercase tracking-wider mb-0.5"
                      style={{ color: 'var(--color-on-surface-variant)' }}>{label}</p>
                    <p className="text-xs font-medium leading-snug" style={{ color: 'var(--color-on-surface)' }}>{val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery */}
            <div className="flex flex-col gap-3">
              <div className="relative rounded-2xl overflow-hidden" style={{ height: 260 }}>
                <img src={loc.gallery[activeGallery]} alt={loc.name}
                  className="w-full h-full object-cover transition-all duration-500" />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {loc.gallery.map((img, i) => (
                  <button key={i} onClick={() => setActiveGallery(i)}
                    className="relative rounded-xl overflow-hidden transition-all"
                    style={{
                      height: 64, opacity: activeGallery === i ? 1 : 0.6,
                      border: activeGallery === i ? `2px solid ${loc.accent}` : '2px solid transparent'
                    }}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* ── ACTIVITIES ── */}
          <section className="py-14" style={{ borderTop: '1px solid var(--color-outline)' }}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] mb-3"
              style={{ color: loc.accent }}>Trải nghiệm</p>
            <h2 className="font-bold mb-10"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}>
              Bạn Có Thể Làm Gì Ở Đây
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {loc.activities.map((act, i) => (
                <div key={i} className="p-5 rounded-2xl flex flex-col gap-3 animate-fade-up card-hover"
                  style={{
                    animationDelay: `${i * 60}ms`,
                    background: 'var(--color-surface-container)',
                    border: '1px solid var(--color-outline)'
                  }}>
                  <span className="text-xs font-bold tracking-widest"
                    style={{ color: loc.accent }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-semibold text-sm" style={{ color: 'var(--color-on-surface)' }}>{act.title}</h3>
                  <p className="text-xs leading-relaxed flex-1" style={{ color: 'var(--color-on-surface-variant)' }}>{act.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── EVENTS ── */}
          <section className="py-14" style={{ borderTop: '1px solid var(--color-outline)' }}>
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] mb-3"
                  style={{ color: loc.accent }}>Lịch sự kiện</p>
                <h2 className="font-bold"
                  style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}>
                  Đừng Bỏ Lỡ
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {loc.events.map((ev, i) => (
                <div key={i} className="p-6 rounded-2xl animate-fade-up"
                  style={{
                    animationDelay: `${i * 80}ms`,
                    background: `${loc.accent}08`,
                    border: `1px solid ${loc.accent}22`
                  }}>
                  <div className="flex items-center gap-2 mb-3">
                    <CalendarDays className="w-4 h-4" style={{ color: loc.accent }} />
                    <span className="text-xs font-bold uppercase tracking-wider"
                      style={{ color: loc.accent }}>{ev.month}</span>
                  </div>
                  <h3 className="font-semibold text-base mb-2" style={{ color: 'var(--color-on-surface)' }}>{ev.name}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-on-surface-variant)' }}>{ev.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── AUDIO + FEED ── */}
          <section className="py-14 grid grid-cols-1 lg:grid-cols-12 gap-10"
            style={{ borderTop: '1px solid var(--color-outline)' }}>

            {/* Feed */}
            <div className="lg:col-span-8 flex flex-col gap-5">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-bold"
                  style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem' }}>
                  Cộng Đồng Chia Sẻ
                </h2>
              </div>

              {/* Filter */}
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
                {FILTER_LABELS.map(({ key, label }) => {
                  const meta = key !== 'all' ? ROLE_META[key as Exclude<Role, 'all'>] : null;
                  const active = filter === key;
                  return (
                    <button key={key} onClick={() => setFilter(key)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all"
                      style={{
                        background: active ? (meta?.color ?? 'var(--color-primary)') : 'var(--color-surface-container)',
                        color: active ? 'white' : 'var(--color-on-surface-variant)',
                        border: `1.5px solid ${active ? (meta?.color ?? 'var(--color-primary)') : 'var(--color-outline)'}`,
                      }}>
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* Post input */}
              <div className="p-5 rounded-2xl"
                style={{ background: 'var(--color-surface-container)', border: '1px solid var(--color-outline)' }}>
                <div className="flex gap-3">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=80"
                    alt="Avatar" className="w-9 h-9 rounded-full object-cover shrink-0" />
                  <textarea placeholder={`Chia sẻ về ${loc.name}...`} rows={2}
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm resize-none outline-none"
                    style={{ background: 'white', border: '1px solid var(--color-outline)', color: 'var(--color-on-surface)' }} />
                </div>
                <div className="flex justify-between mt-3 pl-12">
                  <div className="flex gap-1">
                    {[Camera, MapPin].map((Icon, i) => (
                      <button key={i} className="w-8 h-8 flex items-center justify-center rounded-lg"
                        style={{ color: 'var(--color-on-surface-variant)' }}>
                        <Icon className="w-4 h-4" />
                      </button>
                    ))}
                  </div>
                  <button className="px-5 py-2 rounded-xl text-xs font-semibold text-white"
                    style={{ background: loc.accent }}>Đăng tải</button>
                </div>
              </div>

              {/* Posts */}
              {posts.length === 0 ? (
                <div className="p-8 rounded-2xl text-center"
                  style={{ background: 'var(--color-surface-container)', border: '1px solid var(--color-outline)' }}>
                  <p className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
                    Chưa có bài viết nào — hãy là người đầu tiên chia sẻ!
                  </p>
                </div>
              ) : posts.map((post, i) => {
                const meta = post.role !== 'all' ? ROLE_META[post.role as Exclude<Role, 'all'>] : null;
                return (
                  <div key={post.id}
                    className="p-5 rounded-2xl animate-fade-up"
                    style={{
                      animationDelay: `${i * 50}ms`, background: 'white',
                      border: '1px solid var(--color-outline)',
                      boxShadow: '0 2px 8px rgba(26,58,24,0.05)'
                    }}>
                    <div className="flex items-center gap-3 mb-3">
                      <img src={post.avatar} alt={post.author}
                        className="w-10 h-10 rounded-full object-cover shrink-0"
                        style={{ border: '1px solid var(--color-outline)' }} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-sm" style={{ color: 'var(--color-on-surface)' }}>{post.author}</span>
                          {post.verified && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: loc.accent }} />}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          {meta && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                              style={{ background: meta.bg, color: meta.color }}>{meta.label}</span>
                          )}
                          <span className="text-[11px]" style={{ color: 'var(--color-on-surface-variant)' }}>{post.time}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--color-on-surface-variant)' }}>
                      {post.content}
                    </p>
                    {post.images && (
                      <div className="mb-3 rounded-xl overflow-hidden"
                        style={{ border: '1px solid var(--color-outline)' }}>
                        <img src={post.images[0]} alt="Attachment"
                          className="w-full max-h-60 object-cover hover:scale-105 transition-transform duration-500" />
                      </div>
                    )}
                    <div className="flex items-center gap-5 pt-3"
                      style={{ borderTop: '1px solid var(--color-outline)' }}>
                      <button className="flex items-center gap-1.5 text-xs font-medium"
                        style={{ color: 'var(--color-on-surface-variant)' }}>
                        <Heart className="w-4 h-4" /> {post.likes}
                      </button>
                      <button className="flex items-center gap-1.5 text-xs font-medium"
                        style={{ color: 'var(--color-on-surface-variant)' }}>
                        <MessageCircle className="w-4 h-4" /> {post.comments}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              {/* Audio */}
              <div className="p-5 rounded-2xl"
                style={{ background: 'var(--color-surface-container)', border: '1px solid var(--color-outline)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-sm" style={{ color: 'var(--color-on-surface)' }}>Thuyết minh tự động</h3>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] cursor-pointer"
                    style={{ background: 'white', border: '1px solid var(--color-outline)', color: 'var(--color-on-surface-variant)' }}>
                    VN <ChevronDown className="w-3 h-3" />
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <button onClick={() => setActiveVoice(!activeVoice)}
                    className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 text-white"
                    style={{
                      background: `linear-gradient(135deg, ${loc.accent}, ${loc.accent}aa)`,
                      boxShadow: `0 4px 14px ${loc.accent}40`
                    }}>
                    {activeVoice
                      ? <span className="w-3 h-3 rounded-sm bg-white" />
                      : <Play className="w-4.5 h-4.5 ml-0.5" style={{ width: 18, height: 18 }} fill="white" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium" style={{ color: 'var(--color-on-surface-variant)' }}>{loc.type}</p>
                    <p className="font-semibold text-sm line-clamp-1" style={{ color: 'var(--color-on-surface)' }}>{loc.audioTitle}</p>
                  </div>
                </div>
                <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--color-outline)' }}>
                  <div className="h-full rounded-full transition-all duration-1000"
                    style={{ width: activeVoice ? '55%' : '0%', background: loc.accent }} />
                </div>
              </div>

              {/* Quick info */}
              <div className="p-5 rounded-2xl"
                style={{ background: 'var(--color-surface-container)', border: '1px solid var(--color-outline)' }}>
                <h3 className="font-semibold text-sm mb-4" style={{ color: 'var(--color-on-surface)' }}>Thông tin nhanh</h3>
                <ul className="space-y-3.5">
                  {[
                    { icon: MapPin, label: 'Địa chỉ', val: loc.address },
                    { icon: Building, label: 'Đơn vị quản lý', val: loc.manager },
                    { icon: ShieldCheck, label: 'Khẩn cấp', val: loc.phone, urgent: true },
                  ].map(({ icon: Icon, label, val, urgent }) => (
                    <li key={label} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: urgent ? 'rgba(181,58,47,0.1)' : `${loc.accent}12` }}>
                        <Icon className="w-4 h-4" style={{ color: urgent ? 'var(--color-error)' : loc.accent }} />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider mb-0.5"
                          style={{ color: 'var(--color-on-surface-variant)' }}>{label}</p>
                        <p className="text-xs leading-snug font-medium"
                          style={{ color: urgent ? 'var(--color-error)' : 'var(--color-on-surface)' }}>{val}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Rules */}
              <div className="p-5 rounded-2xl"
                style={{ background: 'rgba(181,58,47,0.05)', border: '1px solid rgba(181,58,47,0.18)' }}>
                <h3 className="font-semibold text-sm flex items-center gap-2 mb-2" style={{ color: 'var(--color-error)' }}>
                  <ShieldCheck className="w-4 h-4" /> Quy định cộng đồng
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-on-surface-variant)' }}>
                  Diễn đàn dành để gắn kết các bên tại <strong>{loc.name}</strong>. Nghiêm cấm phát ngôn sai lệch lịch sử hoặc quảng cáo rác.
                </p>
              </div>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
