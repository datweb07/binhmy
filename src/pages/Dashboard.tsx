import TopNav from "../components/TopNav";
import {
  ChevronRight,
  Train,
  Droplets,
  AlertTriangle,
  TrendingUp,
  TreePine,
  Users,
} from "lucide-react";

const stats = [
  {
    label: "Diện tích khai thác",
    value: "42",
    unit: "ha",
    trend: null,
    color: "var(--color-on-surface-variant)",
  },
  {
    label: "Quy hoạch mở rộng",
    value: "85",
    unit: "ha",
    trend: "+102%",
    color: "var(--color-primary)",
  },
  {
    label: "Cây xanh bảo tồn",
    value: "1.240",
    unit: "cây",
    trend: "+18%",
    color: "#6A9EAA",
  },
  {
    label: "Lượt khách / tháng",
    value: "3.800",
    unit: "",
    trend: "+24%",
    color: "#8B5A2B",
  },
];

export default function Dashboard() {
  return (
    <div
      className="flex flex-col font-body mesh-bg"
      style={{ height: "100vh", color: "var(--color-on-surface)" }}
    >
      <TopNav />

      <div
        className="flex flex-1 overflow-hidden"
        style={{ marginTop: 72, height: "calc(100vh - 72px)" }}
      >
        {/* Map */}
        <div className="flex-1 relative overflow-hidden">
          <img
            src="/assets/images/dashboard_bg.jpg"
            alt="Map"
            className="absolute inset-0 w-full h-full object-contain"
          />
          {/* <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80"
               alt="Map" className="absolute inset-0 w-full h-full object-cover"
               style={{ filter: 'saturate(0.68) brightness(0.76)' }} /> */}
          {/* <div className="absolute inset-0"
               style={{ background: 'linear-gradient(135deg, rgba(14,34,12,0.52) 0%, rgba(106,158,170,0.18) 100%)' }} /> */}

          {/* Layer Panel */}
          <div
            className="absolute top-5 left-5 rounded-2xl p-5 animate-fade-up"
            style={{
              background: "rgba(255,255,255,0.93)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.7)",
              boxShadow: "0 8px 28px rgba(26,58,24,0.14)",
              width: 220,
            }}
          >
            <h3
              className="text-[10px] font-bold uppercase tracking-widest mb-3"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              Lớp dữ liệu
            </h3>
            {[
              {
                label: "Khu dân cư mật độ cao",
                color: "var(--color-primary)",
                checked: true,
              },
              {
                label: "Tuyến đi bộ ven sông",
                color: "#6A9EAA",
                checked: true,
              },
              {
                label: "Cảnh báo Sinh thái",
                color: "var(--color-error)",
                checked: false,
              },
            ].map(({ label, color, checked }) => (
              <label
                key={label}
                className="flex items-center gap-2.5 cursor-pointer py-1.5"
              >
                <div
                  className="w-4 h-4 rounded-md flex items-center justify-center shrink-0"
                  style={{
                    background: checked ? color : "transparent",
                    border: `1.5px solid ${checked ? color : "var(--color-outline)"}`,
                  }}
                >
                  {checked && (
                    <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3">
                      <path
                        d="M2.5 7L5.5 10L11.5 4"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        stroke="white"
                      />
                    </svg>
                  )}
                </div>
                <span
                  className="text-xs font-medium"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  {label}
                </span>
                <div
                  className="w-2 h-2 rounded-full ml-auto"
                  style={{ background: color }}
                />
              </label>
            ))}
            <div
              className="mt-3 pt-3"
              style={{ borderTop: "1px solid var(--color-outline)" }}
            >
              <p
                className="text-[10px] font-bold uppercase tracking-widest mb-2"
                style={{ color: "var(--color-on-surface-variant)" }}
              >
                Phân vùng
              </p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  ["Di sản", false],
                  ["Sáng tạo", true],
                  ["Nông nghiệp", false],
                ].map(([tag, active]) => (
                  <button
                    key={tag as string}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-semibold"
                    style={{
                      background: active
                        ? "var(--color-primary-container)"
                        : "var(--color-surface-container)",
                      color: active
                        ? "var(--color-primary)"
                        : "var(--color-on-surface-variant)",
                      border: active
                        ? "1px solid var(--color-primary)"
                        : "1px solid var(--color-outline)",
                    }}
                  >
                    {tag as string}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Map chips */}
          <div className="absolute top-[30%] right-[25%] cursor-pointer">
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold"
              style={{
                background: "rgba(255,255,255,0.93)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.6)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                color: "var(--color-on-surface)",
              }}
            >
              <TreePine className="w-3.5 h-3.5" style={{ color: "#6A9EAA" }} />
              Bảo tồn Cảnh quan
            </div>
          </div>
          <div className="absolute bottom-[28%] left-[38%] cursor-pointer">
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold"
              style={{
                background: "rgba(255,255,255,0.93)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.6)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                color: "var(--color-on-surface)",
              }}
            >
              <AlertTriangle
                className="w-3.5 h-3.5"
                style={{ color: "var(--color-error)" }}
              />
              Nút thắt Giao thông
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div
          className="w-[380px] shrink-0 overflow-y-auto flex flex-col"
          style={{
            borderLeft: "1px solid var(--color-outline)",
            background: "var(--color-surface-container-lowest)",
          }}
        >
          <div className="p-7 pb-4">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.25em] mb-1"
              style={{ color: "var(--color-primary)" }}
            >
              Bảng điều khiển
            </p>
            <h2
              className="font-bold leading-tight mb-1"
              style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem" }}
            >
              Quy hoạch & Đầu tư
            </h2>
            <p
              className="text-sm"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              Tổng quan chiến lược Giai đoạn III.
            </p>
          </div>

          <div className="px-7 pb-7 flex flex-col gap-5">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl animate-fade-up"
                  style={{
                    animationDelay: `${i * 60}ms`,
                    background:
                      i === 1
                        ? `${s.color}0D`
                        : "var(--color-surface-container)",
                    border:
                      i === 1
                        ? `1px solid ${s.color}2A`
                        : "1px solid var(--color-outline)",
                  }}
                >
                  <p
                    className="text-[10px] font-semibold uppercase tracking-wider mb-1.5"
                    style={{
                      color:
                        i === 1 ? s.color : "var(--color-on-surface-variant)",
                    }}
                  >
                    {s.label}
                  </p>
                  <div className="flex items-end gap-1">
                    <span
                      className="font-black text-2xl leading-none"
                      style={{ color: s.color }}
                    >
                      {s.value}
                    </span>
                    {s.unit && (
                      <span
                        className="text-xs mb-0.5"
                        style={{ color: "var(--color-on-surface-variant)" }}
                      >
                        {s.unit}
                      </span>
                    )}
                  </div>
                  {s.trend && (
                    <div className="flex items-center gap-1 mt-1.5">
                      <TrendingUp
                        className="w-3 h-3"
                        style={{ color: s.color }}
                      />
                      <span
                        className="text-[11px] font-semibold"
                        style={{ color: s.color }}
                      >
                        {s.trend}
                      </span>
                    </div>
                  )}
                  <div
                    className="mt-2 h-1 rounded-full overflow-hidden"
                    style={{
                      background: "var(--color-surface-container-highest)",
                    }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width:
                          i === 0
                            ? "40%"
                            : i === 1
                              ? "85%"
                              : i === 2
                                ? "62%"
                                : "75%",
                        background: s.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Key Zones */}
            <div>
              <p
                className="text-[10px] font-bold uppercase tracking-widest mb-3"
                style={{ color: "var(--color-on-surface-variant)" }}
              >
                Khu vực trọng điểm
              </p>
              <div className="flex flex-col gap-2.5">
                {[
                  {
                    icon: Train,
                    iconBg: "var(--color-primary-container)",
                    iconColor: "var(--color-primary)",
                    title: "Nhà ga Phía Bắc",
                    desc: "Tích hợp khu dân cư mật độ cao với giao thông công cộng.",
                  },
                  {
                    icon: Droplets,
                    iconBg: "var(--color-secondary-container)",
                    iconColor: "var(--color-secondary)",
                    title: "Đường đi bộ Ven sông",
                    desc: "Đề xuất khu phố đi bộ giúp tăng cường tiếp cận di sản.",
                  },
                  {
                    icon: Users,
                    iconBg: "var(--color-tertiary-container)",
                    iconColor: "var(--color-tertiary)",
                    title: "Trung tâm Cộng đồng",
                    desc: "Không gian giao lưu văn hoá và hỗ trợ nông dân địa phương.",
                  },
                ].map(({ icon: Icon, iconBg, iconColor, title, desc }) => (
                  <div
                    key={title}
                    className="p-4 rounded-2xl flex items-start gap-3.5 cursor-pointer group card-hover"
                    style={{
                      background: "var(--color-surface-container)",
                      border: "1px solid var(--color-outline)",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: iconBg }}
                    >
                      <Icon className="w-5 h-5" style={{ color: iconColor }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4
                        className="font-semibold text-sm mb-0.5"
                        style={{ color: "var(--color-on-surface)" }}
                      >
                        {title}
                      </h4>
                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                      >
                        {desc}
                      </p>
                    </div>
                    <ChevronRight
                      className="w-4 h-4 shrink-0 mt-0.5 transition-transform group-hover:translate-x-1"
                      style={{ color: "var(--color-outline)" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
