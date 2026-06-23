import { useCallback, useEffect, useRef, useState } from "react";
// import { renderToString } from "react-dom/server";
import TopNav from "../components/TopNav";
import {
  Search,
  MapPin,
  Clock,
  Camera,
  Building,
  Leaf,
  Navigation2,
  ChevronRight,
  Users,
  Star,
  Thermometer,
  Wind,
  Info,
  Bike,
  LucideProps,
  Layers,
} from "lucide-react";

import * as turf from "@turf/turf";
import mapboxgl from "mapbox-gl";
import createMarkerElement from "../utils/createMarkerElement";
import MapComp from "../components/MapComp/Map";

const tours: {
  id: number;
  name: string;
  tagline: string;
  description: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  color: string;
  colorBg: string;
  duration: string;
  difficulty: string;
  groupSize: string;
  rating: number;
  reviews: number;
  highlights: string[];
  points: {
    name: string;
    time: string;
    lnglat: [number, number];
    desc: string;
  }[];
}[] = [
    {
      id: 1,
      name: "Tour Miệt Vườn Xuân",
      tagline: "Hành trình xanh · Thư giãn",
      description:
        "Khám phá văn hóa miệt vườn đặc sắc, thưởng thức trái cây tại vườn và tận hưởng không gian thanh bình.",
      icon: Leaf,
      color: "#4A7C44",
      colorBg: "rgba(74,124,68,0.15)",
      duration: "4 Giờ",
      difficulty: "Dễ · Phù hợp gia đình",
      groupSize: "2–15 người",
      rating: 4.8,
      reviews: 124,
      highlights: [
        "Hái trái cây tươi tại vườn",
        "Chèo xuồng qua kênh rạch",
        "Ăn trưa tại nhà vườn",
      ],
      points: [
        {
          name: "Bến đò Bình Mỹ",
          time: "08:00",
          lnglat: [106.595029, 11.011642],
          desc: "Tập trung và đón khách tại Bến đò Bình Mỹ.",
        },
        {
          name: "Kênh Xáng",
          time: "08:45",
          lnglat: [106.596131, 11.012911],
          desc: "Lên xuồng chèo dọc theo dòng Kênh Xáng thơ mộng.",
        },
        {
          name: "Vườn rau sạch công nghệ cao",
          time: "09:30",
          lnglat: [106.597857, 11.014585],
          desc: "Tham quan mô hình trồng rau sạch nhà lưới.",
        },
        {
          name: "Nhà cổ Bình Mỹ",
          time: "10:30",
          lnglat: [106.599271, 11.013446],
          desc: "Ghé thăm kiến trúc nhà cổ hơn 100 năm tuổi.",
        },
        {
          name: "Vườn trái cây Hai Đẹp",
          time: "11:30",
          lnglat: [106.597372, 11.011973],
          desc: "Tham quan & tự tay hái trái cây chín mọng tại vườn.",
        },
        {
          name: "Khu du lịch sinh thái Bình Mỹ",
          time: "12:30",
          lnglat: [106.598787, 11.010337],
          desc: "Thưởng thức bữa trưa với các món ăn miệt vườn đặc trưng.",
        },
        {
          name: "Trại cá lăng Bình Mỹ",
          time: "14:00",
          lnglat: [106.599622, 11.010699],
          desc: "Tham quan mô hình nuôi cá lăng lồng bè trên sông.",
        },
        {
          name: "Quán nước ven sông Sài Gòn",
          time: "15:00",
          lnglat: [106.600986, 11.01287],
          desc: "Nghỉ ngơi, hóng gió và thưởng thức nước dừa tươi.",
        },
      ],
    },
    {
      id: 2,
      name: "Tour Dấu ấn Di sản",
      tagline: "Lịch sử · Văn hoá · Kiến trúc",
      description:
        "Ngược dòng thời gian tìm hiểu về các công trình kiến trúc cổ và lịch sử hình thành vùng đất Bình Mỹ.",
      icon: Bike,
      color: "#8B5A2B",
      colorBg: "rgba(139,90,43,0.15)",
      duration: "3 Giờ",
      difficulty: "Dễ · Mọi độ tuổi",
      groupSize: "2–20 người",
      rating: 4.7,
      reviews: 89,
      highlights: [
        "Tham quan Đình Bình Mỹ",
        "Trải nghiệm tráng bánh thủ công",
        "Thuyền chiều hoàng hôn",
      ],
      points: [
        {
          name: "Bến phà Bình Mỹ",
          time: "14:00",
          lnglat: [106.604468, 11.011863],
          desc: "Đón khách và bắt đầu hành trình di sản.",
        },
        {
          name: "Đình thần Bình Mỹ",
          time: "14:45",
          lnglat: [106.602507, 11.011766],
          desc: "Tìm hiểu lịch sử và kiến trúc độc đáo của Đình thần.",
        },
        {
          name: "Nhà thờ họ Bình Mỹ",
          time: "15:30",
          lnglat: [106.601858, 11.010333],
          desc: "Tham quan không gian thờ tự truyền thống.",
        },
        {
          name: "Chợ nông sản Bình Mỹ",
          time: "16:15",
          lnglat: [106.602981, 11.008475],
          desc: "Giao lưu với người dân và tìm hiểu các sản vật địa phương.",
        },
        {
          name: "Làng Cuốn",
          time: "17:00",
          lnglat: [106.599734, 11.008609],
          desc: "Trải nghiệm tự tay tráng bánh thủ công.",
        },
        {
          name: "Quán lá ven sông",
          time: "17:45",
          lnglat: [106.598714, 11.00768],
          desc: "Thưởng thức bữa nhẹ chiều quê với bánh xèo, bánh khọt.",
        },
        {
          name: "Bến thuyền ven sông Sài Gòn",
          time: "18:30",
          lnglat: [106.60135, 11.006263],
          desc: "Lên thuyền ngắm hoàng hôn rực rỡ buông xuống.",
        },
      ],
    },
    {
      id: 3,
      name: "Tour Nhiếp ảnh Sinh thái",
      tagline: "Thiên nhiên · Sáng tạo · Chill",
      description:
        "Hành trình dành riêng cho người yêu thiên nhiên và nhiếp ảnh với những góc check-in tuyệt đẹp ven sông.",
      icon: Camera,
      color: "#6A9EAA",
      colorBg: "rgba(106,158,170,0.15)",
      duration: "5 Giờ",
      difficulty: "Trung bình · Cần đi bộ",
      groupSize: "2–10 người",
      rating: 4.9,
      reviews: 67,
      highlights: ["Bình minh sông nước", "Đầm sen rực rỡ", "Cầu tre lắt lẻo"],
      points: [
        {
          name: "Bến đò Bình Mỹ",
          time: "05:30",
          lnglat: [106.593993, 11.011188],
          desc: "Đón nhận ánh bình minh và săn sương sớm.",
        },
        {
          name: "Đầm sen Bình Mỹ",
          time: "06:30",
          lnglat: [106.596329, 11.012354],
          desc: "Chụp ảnh hoa sen nở rộ trong sương mai.",
        },
        {
          name: "Làng bè nuôi cá",
          time: "07:30",
          lnglat: [106.598513, 11.011168],
          desc: "Ghi lại nhịp sống mưu sinh trên sông nước.",
        },
        {
          name: "Rừng tràm cựa gà",
          time: "08:30",
          lnglat: [106.601057, 11.012841],
          desc: "Sáng tác ảnh với không gian xanh mướt của rừng tràm.",
        },
        {
          name: "Cầu tre lắt lẻo",
          time: "09:30",
          lnglat: [106.600164, 11.011132],
          desc: "Góc check-in quen thuộc mang đậm chất miền Tây.",
        },
        {
          name: "Làng nghề đan mây tre",
          time: "10:30",
          lnglat: [106.600498, 11.010105],
          desc: "Chụp ảnh chân dung những người thợ thủ công lành nghề.",
        },
        {
          name: "Quán ăn Đồng Quê",
          time: "11:30",
          lnglat: [106.599027, 11.007431],
          desc: "Dùng cơm trưa và chia sẻ các tác phẩm nhiếp ảnh.",
        },
      ],
    },
    {
      id: 4,
      name: "Tour Ẩm thực Sông nước",
      tagline: "Đặc sản · Chế biến · Trải nghiệm",
      description:
        "Theo chân người dân địa phương ra chợ, vào bếp và lên bàn ăn — hành trình khám phá ẩm thực đồng quê từ gốc rễ.",
      icon: Users,
      color: "#A0659A",
      colorBg: "rgba(160,101,154,0.15)",
      duration: "4 Giờ",
      difficulty: "Dễ · Mọi lứa tuổi",
      groupSize: "2–12 người",
      rating: 4.9,
      reviews: 43,
      highlights: [
        "Đi chợ sáng với đầu bếp",
        "Nấu ăn cùng gia đình địa phương",
        "Bữa cơm miệt vườn",
      ],
      points: [
        {
          name: "Chợ sáng Bình Mỹ",
          time: "06:00",
          lnglat: [106.593993, 11.011188],
          desc: "Cùng đầu bếp đi chợ chọn nguyên liệu tươi sống.",
        },
        {
          name: "Quán hủ tiếu nam vang địa phương",
          time: "07:00",
          lnglat: [106.596329, 11.012354],
          desc: "Thưởng thức bữa sáng quen thuộc của người dân bản địa.",
        },
        {
          name: "Dự án Làng Cuốn",
          time: "08:00",
          lnglat: [106.598513, 11.011168],
          desc: "Tham quan và thử sức với công đoạn tráng bánh.",
        },
        {
          name: "Vườn rau nông dân",
          time: "09:30",
          lnglat: [106.601057, 11.012841],
          desc: "Tự tay thu hoạch các loại rau thơm và gia vị.",
        },
        {
          name: "Nhà vườn sinh thái",
          time: "10:30",
          lnglat: [106.600164, 11.011132],
          desc: "Bắt tay vào sơ chế và nấu các món ăn dân dã.",
        },
        {
          name: "Bàn ăn dưới tán cây",
          time: "12:00",
          lnglat: [106.600498, 11.010105],
          desc: "Thưởng thức thành quả là những món ngon miệt vườn do chính tay mình nấu.",
        },
        {
          name: "Quán cà phê võng ven sông",
          time: "13:30",
          lnglat: [106.599027, 11.007431],
          desc: "Ngả lưng nghỉ trưa, nhâm nhi ly trà đá mát lạnh.",
        },
      ],
    },
  ];

const WEATHER = {
  temp: "31°C",
  condition: "Nắng nhẹ",
  wind: "12 km/h",
  humidity: "72%",
  bestTime: "06:00 – 10:00",
};

export default function MapBase() {
  const mapRef = useRef<mapboxgl.Map>(null);
  const currentCheckinPoints = useRef<mapboxgl.Marker[]>([]);

  const [selectedTour, setSelectedTour] = useState(tours[0]);
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const overlayMarkersRef = useRef<mapboxgl.Marker[]>([]);

  const renderCheckinPoints = useCallback(
    (map: mapboxgl.Map) => {

      currentCheckinPoints.current.forEach((marker) => marker.remove());

      selectedTour.points.forEach((point, idx) => {

        let marker = new mapboxgl.Marker({
          element: createMarkerElement(
            `
              <div style="background-color: ${selectedTour.color}; opacity: 0.18; animation: pulse-ring 2s cubic-bezier(0.215,0.61,0.355,1) infinite" class="absolute -inset-3 rounded-full scale-[1.4] transition-all duration-300"></div>
              <div style="border-color: ${selectedTour.color}" class="relative w-8 h-8 flex items-center justify-center rounded-full border-[2.5px] shadow-lg bg-surface transition-transform group-hover:scale-[1.2]">
                <span style="color: ${selectedTour.color}" class="font-headline font-bold text-sm">
                    ${idx + 1}
                </span>

                <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-surface-container-lowest p-4 rounded-xl shadow-xl min-w-50 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none border border-outline translate-y-2 group-hover:translate-y-0 z-30">
                  <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-surface-container-lowest border-r border-b border-outline rotate-45"></div>
                    <div class="relative z-10">
                      <p class="font-headline font-bold text-base text-on-surface">
                        ${point.name}
                      </p>
                    <div class="flex items-center gap-1 mt-1 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock-icon lucide-clock"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                      <p style="color: ${selectedTour.color}" class="font-body text-xs font-bold">
                        ${point.time}
                      </p>
                    </div>
                    <p style="color: ${selectedTour.color}" class="font-body text-xs font-medium leading-relaxed">
                      ${point.desc}
                    </p>
                  </div>
                </div>
              </div>
            `,
            {
              rootCls: "group cursor-pointer",
            },
          ),
        })
          .setLngLat(point.lnglat)
          .addTo(map);

        currentCheckinPoints.current.push(marker);
      });
    },
    [selectedTour],
  );

  const renderTourLine = useCallback(
    (map: mapboxgl.Map) => {

      if (map.getSource("route")) {
        map.removeLayer("line-animation");
        map.removeSource("route");
      }

      const lineGeoJson = selectedTour.points.map(
        (point) => point.lnglat as [number, number],
      );

      const bboxx = turf.bbox(turf.lineString(lineGeoJson));

      fitBounds(map, [bboxx[0], bboxx[1]], [bboxx[2], bboxx[3]]);

      const geojson: any = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: lineGeoJson,
            },
          },
        ],
      };

      map.addSource("route", {
        type: "geojson",
        data: geojson,
      });

      map.addLayer({
        id: "line-animation",
        type: "line",
        source: "route",
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": selectedTour.color,
          "line-width": 3,
          "line-opacity": 0.8,
          "line-dasharray": [6, 6],
        },
      });

      const duration = 3000;
      let animation;
      let startTime = 0;

      function animateLine(timestamp: number) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;

        const progress = Math.min(elapsed / duration, 1);

        const segmentCount = lineGeoJson.length - 1;

        const rawSegmentIndex = progress * segmentCount;
        const segmentIndex = Math.floor(rawSegmentIndex);

        const segmentProgress = rawSegmentIndex - segmentIndex;
        const coordinates: [number, number][] = [];

        for (let i = 0; i <= segmentIndex; i++) {
          coordinates.push(lineGeoJson[i]);
        }

        if (segmentIndex < segmentCount) {
          const start = lineGeoJson[segmentIndex];
          const end = lineGeoJson[segmentIndex + 1];

          const lng = start[0] + (end[0] - start[0]) * segmentProgress;
          const lat = start[1] + (end[1] - start[1]) * segmentProgress;

          coordinates.push([lng, lat]);
        }

        geojson.features[0].geometry.coordinates = coordinates;

        // then update the map
        const source = map.getSource("route") as mapboxgl.GeoJSONSource;
        if (source !== undefined) {
          source.setData(geojson);
        }

        // Request the next frame of the animation.
        if (progress < 1) {
          animation = requestAnimationFrame(animateLine);
        }
      }

      animation = requestAnimationFrame(animateLine);
    },
    [selectedTour],
  );

  const fitBounds = (
    map: mapboxgl.Map,
    sw: [number, number] | mapboxgl.LngLatLike,
    ne: [number, number] | mapboxgl.LngLatLike,
  ) => {
    const isMobile = window.innerWidth < 800;

    const bound = new mapboxgl.LngLatBounds(sw, ne);

    map.fitBounds(bound, {
      padding: isMobile
        ? { top: 50, bottom: 50, left: 20, right: 20 }
        : { top: 200, bottom: 550, left: 150, right: 150 },
    });
  };

  useEffect(() => {
    mapRef.current &&
      fitBounds(
        mapRef.current,
        new mapboxgl.LngLat(106.591432, 11.012972),
        new mapboxgl.LngLat(106.605236, 11.011751),
      );
  }, []);

  // const renderOverlay = useCallback((map: mapboxgl.Map) => {
  //   // Add sources if they don't exist
  //   if (!map.getSource("waterways")) {
  //     map.addSource("waterways", {
  //       type: "geojson",
  //       data: waterwaysGeoJSON as any,
  //     });
  //     map.addLayer({
  //       id: "waterways-layer",
  //       type: "line",
  //       source: "waterways",
  //       layout: {
  //         "line-cap": "round",
  //         "line-join": "round",
  //       },
  //       paint: {
  //         "line-color": "#3b82f6", // blue-500
  //         "line-width": 8,
  //         "line-opacity": 0.8,
  //       },
  //     });

  //     map.addSource("mainRoads", {
  //       type: "geojson",
  //       data: mainRoadsGeoJSON as any,
  //     });
  //     map.addLayer({
  //       id: "mainRoads-layer-outline",
  //       type: "line",
  //       source: "mainRoads",
  //       layout: {
  //         "line-cap": "round",
  //         "line-join": "round",
  //       },
  //       paint: {
  //         "line-color": "#fbbf24", // yellow-400
  //         "line-width": 8,
  //         "line-opacity": 0.9,
  //       },
  //     });
  //     map.addLayer({
  //       id: "mainRoads-layer-inner",
  //       type: "line",
  //       source: "mainRoads",
  //       layout: {
  //         "line-cap": "round",
  //         "line-join": "round",
  //       },
  //       paint: {
  //         "line-color": "#fef3c7", // yellow-100
  //         "line-width": 2,
  //         "line-dasharray": [2, 2],
  //       },
  //     });
  //   }

  //   if (isOverlayVisible) {
  //     map.setLayoutProperty("waterways-layer", "visibility", "visible");
  //     map.setLayoutProperty("mainRoads-layer-outline", "visibility", "visible");
  //     map.setLayoutProperty("mainRoads-layer-inner", "visibility", "visible");

  //     // Render markers
  //     overlayMarkersRef.current.forEach((m) => m.remove());
  //     overlayMarkersRef.current = [];

  //     overlayPOIs.forEach((poi) => {
  //       const IconHtml = renderToString(<poi.icon size={18} color="white" />);

  //       let marker = new mapboxgl.Marker({
  //         element: createMarkerElement(
  //           `
  //             <div class="group cursor-pointer relative flex items-center justify-center">
  //               <div style="background-color: ${poi.color};" class="w-10 h-10 flex items-center justify-center rounded-full shadow-lg border-2 border-white transition-transform group-hover:scale-110">
  //                 ${IconHtml}
  //               </div>

  //               <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-surface-container-lowest p-3 rounded-xl shadow-xl min-w-max opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none border border-outline translate-y-2 group-hover:translate-y-0 z-40">
  //                 <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-surface-container-lowest border-r border-b border-outline rotate-45"></div>
  //                 <div class="relative z-10 text-center">
  //                   <p class="font-headline font-bold text-[10px] uppercase tracking-wider" style="color: ${poi.color}">
  //                     ${poi.type}
  //                   </p>
  //                   <p class="font-headline font-bold text-sm text-on-surface mt-0.5 whitespace-nowrap">
  //                     ${poi.name}
  //                   </p>
  //                   <p class="font-body text-xs font-medium mt-1 max-w-[200px] whitespace-normal text-on-surface-variant">
  //                     ${poi.description}
  //                   </p>
  //                 </div>
  //               </div>
  //             </div>
  //           `,
  //           { rootCls: "" }
  //         ),
  //       })
  //         .setLngLat(poi.lnglat)
  //         .addTo(map);

  //       overlayMarkersRef.current.push(marker);
  //     });
  //   } else {
  //     map.setLayoutProperty("waterways-layer", "visibility", "none");
  //     map.setLayoutProperty("mainRoads-layer-outline", "visibility", "none");
  //     map.setLayoutProperty("mainRoads-layer-inner", "visibility", "none");

  //     overlayMarkersRef.current.forEach((m) => m.remove());
  //     overlayMarkersRef.current = [];
  //   }
  // }, [isOverlayVisible]);

  useEffect(() => {
    if (mapRef.current && isMapReady) {
      renderCheckinPoints(mapRef.current);
      renderTourLine(mapRef.current);
      // renderOverlay(mapRef.current);
    }
  }, [selectedTour, isMapReady, isOverlayVisible, renderCheckinPoints, renderTourLine]);

  return (
    <div className="font-body h-screen w-screen overflow-hidden text-on-surface relative">
      <TopNav transparent />

      {/* Map Background */}
      <div className="absolute inset-0 z-0">
        <MapComp
          ref={mapRef}
          onReady={() => {
            setIsMapReady(true);
          }}
        />
      </div>

      {/* Search & Map Controls */}
      <div
        className="absolute z-30 pointer-events-auto flex items-center gap-3"
        style={{ top: 88, right: 24 }}
      >
        <div
          className="flex items-center gap-3 px-4 py-2.5 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.6)",
            boxShadow: "0 4px 20px rgba(26,58,24,0.12)",
            minWidth: 280,
          }}
        >
          <Search
            className="w-4 h-4 shrink-0"
            style={{ color: "var(--color-on-surface-variant)" }}
          />
          <input
            type="text"
            placeholder="Tìm địa điểm, lịch trình..."
            className="bg-transparent outline-none text-sm flex-1"
            style={{ color: "var(--color-on-surface)" }}
          />
        </div>
      </div>

      {/* Weather + Info strip */}
      <div
        className="absolute z-30 pointer-events-auto flex gap-2"
        style={{ top: 148, right: 24 }}
      >
        <div
          className="flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-medium"
          style={{
            background: "rgba(255,255,255,0.88)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.6)",
            boxShadow: "0 4px 16px rgba(26,58,24,0.1)",
          }}
        >
          <div className="flex items-center gap-1.5">
            <Thermometer className="w-3.5 h-3.5" style={{ color: "#8B5A2B" }} />
            <span style={{ color: "var(--color-on-surface)" }}>
              {WEATHER.temp}
            </span>
          </div>
          <div
            className="w-px h-4"
            style={{ background: "var(--color-outline)" }}
          />
          <div className="flex items-center gap-1.5">
            <Wind className="w-3.5 h-3.5" style={{ color: "#6A9EAA" }} />
            <span style={{ color: "var(--color-on-surface)" }}>
              {WEATHER.wind}
            </span>
          </div>
          <div
            className="w-px h-4"
            style={{ background: "var(--color-outline)" }}
          />
          <span style={{ color: "var(--color-on-surface-variant)" }}>
            ⏰ Tốt nhất: {WEATHER.bestTime}
          </span>
        </div>
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
          style={{
            background: showInfo
              ? "var(--color-primary)"
              : "rgba(255,255,255,0.88)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.6)",
            color: showInfo ? "white" : "var(--color-on-surface-variant)",
          }}
        >
          <Info className="w-4 h-4" />
        </button>
      </div>

      {/* Quick facts panel */}
      {showInfo && (
        <div
          className="absolute z-30 animate-scale-in"
          style={{ top: 200, right: 24, width: 260 }}
        >
          <div
            className="rounded-2xl p-5"
            style={{
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.7)",
              boxShadow: "0 8px 28px rgba(26,58,24,0.14)",
            }}
          >
            <h3
              className="font-semibold text-sm mb-4"
              style={{ color: "var(--color-on-surface)" }}
            >
              Thông tin Bình Mỹ
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "Diện tích", val: "85 ha canh tác" },
                { label: "Dân số", val: "~15.000 người" },
                { label: "Nông sản", val: "Sầu riêng, măng cụt, chôm chôm" },
                { label: "Đặc sản", val: "Bánh tráng, cá lăng, lươn đồng" },
                { label: "Sự kiện lớn", val: "Kỳ Yên, Đua thuyền Tết" },
              ].map(({ label, val }) => (
                <li key={label} className="flex justify-between gap-2">
                  <span
                    className="text-xs font-medium"
                    style={{ color: "var(--color-on-surface-variant)" }}
                  >
                    {label}
                  </span>
                  <span
                    className="text-xs font-semibold text-right"
                    style={{ color: "var(--color-on-surface)" }}
                  >
                    {val}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Tour Panel */}
      <aside
        className="absolute z-20 pointer-events-auto flex flex-col gap-3 max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-none"
        style={{ top: 88, left: 24, width: 320 }}
      >
        {tours.map((tour, i) => {
          const Icon = tour.icon;
          const active = selectedTour.id === tour.id;
          return (
            <div
              key={tour.id}
              onClick={() => setSelectedTour(tour)}
              className="animate-fade-up cursor-pointer rounded-2xl p-4 transition-all duration-300"
              style={{
                animationDelay: `${i * 80}ms`,
                background: active
                  ? "rgba(255,255,255,0.97)"
                  : "rgba(255,255,255,0.78)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: active
                  ? `1.5px solid ${tour.color}`
                  : "1px solid rgba(255,255,255,0.55)",
                boxShadow: active
                  ? `0 8px 28px ${tour.color}28`
                  : "0 2px 12px rgba(26,58,24,0.08)",
                transform: active ? "scale(1.01)" : "scale(1)",
              }}
            >
              <div className="flex items-start gap-3 mb-2">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: tour.colorBg }}
                >
                  <Icon style={{ width: 18, height: 18, color: tour.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className="font-semibold text-sm leading-tight"
                    style={{
                      color: active ? tour.color : "var(--color-on-surface)",
                    }}
                  >
                    {tour.name}
                  </h3>
                  <p
                    className="text-[10px] mt-0.5"
                    style={{ color: "var(--color-on-surface-variant)" }}
                  >
                    {tour.tagline}
                  </p>
                </div>
                <ChevronRight
                  className="w-4 h-4 shrink-0 mt-0.5"
                  style={{ color: tour.color, opacity: active ? 1 : 0.4 }}
                />
              </div>
              <p
                className="text-xs leading-relaxed mb-3 line-clamp-2"
                style={{ color: "var(--color-on-surface-variant)" }}
              >
                {tour.description}
              </p>
              <div className="flex items-center gap-3 text-xs mb-3">
                <span
                  className="flex items-center gap-1 font-medium"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  <Clock className="w-3 h-3" /> {tour.duration}
                </span>
                <span
                  className="flex items-center gap-1 font-medium"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  <MapPin className="w-3 h-3" /> {tour.points.length} điểm
                </span>
                <span
                  className="flex items-center gap-1 font-medium"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  <Users className="w-3 h-3" /> {tour.groupSize}
                </span>
              </div>
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star
                    className="w-3 h-3 fill-current"
                    style={{ color: "#f59e0b" }}
                  />
                  <span
                    className="text-xs font-bold"
                    style={{ color: "var(--color-on-surface)" }}
                  >
                    {tour.rating}
                  </span>
                </div>
                <span
                  className="text-[10px]"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  ({tour.reviews} đánh giá)
                </span>
              </div>
              {/* Highlights - only when active */}
              {active && (
                <div
                  className="mt-3 pt-3 animate-fade-up"
                  style={{ borderTop: `1px solid ${tour.color}20` }}
                >
                  <p
                    className="text-[10px] font-semibold uppercase tracking-wider mb-2"
                    style={{ color: tour.color }}
                  >
                    Điểm nổi bật
                  </p>
                  <ul className="space-y-1">
                    {tour.highlights.map((h, j) => (
                      <li
                        key={j}
                        className="flex items-center gap-2 text-xs"
                        style={{ color: "var(--color-on-surface-variant)" }}
                      >
                        <div
                          className="w-1 h-1 rounded-full shrink-0"
                          style={{ background: tour.color }}
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </aside>

      {/* Map Pins */}
      {/* {selectedTour.points.map((point, idx) => (
        <div
          key={idx}
          className="absolute z-20 cursor-pointer"
          onMouseEnter={() => setHoveredPin(idx)}
          onMouseLeave={() => setHoveredPin(null)}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: selectedTour.color,
              opacity: 0.18,
              transform: "scale(2.4)",
              animation:
                "pulse-ring 2s cubic-bezier(0.215,0.61,0.355,1) infinite",
            }}
          />
          <div
            className="relative w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-200"
            style={{
              background: hoveredPin === idx ? selectedTour.color : "white",
              border: `2.5px solid ${selectedTour.color}`,
              transform: hoveredPin === idx ? "scale(1.2)" : "scale(1)",
              boxShadow: `0 4px 16px ${selectedTour.color}50`,
            }}
          >
            <span
              className="font-bold text-sm"
              style={{
                color: hoveredPin === idx ? "white" : selectedTour.color,
              }}
            >
              {idx + 1}
            </span>
          </div>
          {hoveredPin === idx && (
            <div
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 min-w-56 animate-scale-in"
              style={{
                background: "rgba(255,255,255,0.97)",
                backdropFilter: "blur(16px)",
                borderRadius: 14,
                border: `1px solid ${selectedTour.color}40`,
                boxShadow: "0 8px 28px rgba(0,0,0,0.16)",
                padding: "12px 14px",
              }}
            >
              <div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45"
                style={{
                  background: "white",
                  borderRight: `1px solid ${selectedTour.color}40`,
                  borderBottom: `1px solid ${selectedTour.color}40`,
                }}
              />
              <div className="relative z-10">
                <p
                  className="font-semibold text-sm mb-0.5"
                  style={{ color: "var(--color-on-surface)" }}
                >
                  {point.name}
                </p>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center gap-1">
                    <Clock
                      className="w-3 h-3"
                      style={{ color: selectedTour.color }}
                    />
                    <span
                      className="text-xs font-bold"
                      style={{ color: selectedTour.color }}
                    >
                      {point.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock
                      className="w-3 h-3"
                      style={{ color: "var(--color-on-surface-variant)" }}
                    />
                    <span
                      className="text-xs"
                      style={{ color: "var(--color-on-surface-variant)" }}
                    >
                      {(point as any).duration}
                    </span>
                  </div>
                </div>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  {point.desc}
                </p>
              </div>
            </div>
          )}
        </div>
      ))} */}

      {/* Bottom Timeline */}
      <div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 animate-fade-up"
        style={{ width: "88%", maxWidth: 820 }}
      >
        <div
          className="rounded-2xl p-5"
          style={{
            background: "rgba(255,255,255,0.94)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.7)",
            boxShadow: "0 12px 40px rgba(26,58,24,0.18)",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: selectedTour.colorBg }}
              >
                <Navigation2
                  className="w-4 h-4"
                  style={{ color: selectedTour.color }}
                />
              </div>
              <div>
                <p
                  className="text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  Hành trình đang chọn
                </p>
                <h4
                  className="font-bold text-base leading-tight"
                  style={{ color: selectedTour.color }}
                >
                  {selectedTour.name}
                </h4>
              </div>
            </div>
            <div
              className="flex items-center gap-2 text-xs"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              <Star
                className="w-3.5 h-3.5 fill-current"
                style={{ color: "#f59e0b" }}
              />
              <span
                className="font-bold"
                style={{ color: "var(--color-on-surface)" }}
              >
                {selectedTour.rating}
              </span>
              <span>({selectedTour.reviews})</span>
              <span>·</span>
              <span>{selectedTour.difficulty}</span>
            </div>
          </div>
          <div className="relative flex items-start justify-between">
            <div
              className="absolute top-5 left-8 right-8 h-px rounded-full"
              style={{
                background: `linear-gradient(90deg, ${selectedTour.color}, ${selectedTour.color}20)`,
              }}
            />
            {selectedTour.points.map((point, idx) => (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center gap-2.5 cursor-pointer"
                onMouseEnter={() => setHoveredPin(idx)}
                onMouseLeave={() => setHoveredPin(null)}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm z-10 transition-all duration-200 border-2"
                  style={{
                    background:
                      hoveredPin === idx ? selectedTour.color : "white",
                    borderColor: selectedTour.color,
                    color: hoveredPin === idx ? "white" : selectedTour.color,
                    boxShadow:
                      hoveredPin === idx
                        ? `0 4px 14px ${selectedTour.color}50`
                        : "none",
                    transform: hoveredPin === idx ? "scale(1.15)" : "scale(1)",
                  }}
                >
                  {idx + 1}
                </div>
                <div className="text-center px-1">
                  <p
                    className="text-xs font-bold mb-0.5"
                    style={{ color: selectedTour.color }}
                  >
                    {point.time}
                  </p>
                  <p
                    className="text-xs font-semibold line-clamp-1"
                    style={{ color: "var(--color-on-surface)" }}
                  >
                    {point.name}
                  </p>
                  <p
                    className="text-[10px] mt-0.5"
                    style={{ color: "var(--color-on-surface-variant)" }}
                  >
                    {(point as any).duration}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
