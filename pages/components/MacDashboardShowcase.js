import { memo, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PRODUCT_BALLS } from "../../lib/productCatalog";
import {
  MdDashboard,
  MdReceiptLong,
  MdLocalShipping,
  MdInventory2,
  MdAccountBalance,
  MdAssessment,
  MdSchool,
  MdPeople,
  MdDirectionsBus,
  MdPayments,
  MdAssignment,
  MdNotificationsActive,
  MdLocalHospital,
  MdMedicalServices,
  MdMonitorHeart,
  MdMedication,
  MdScience,
  MdFactory,
  MdPrecisionManufacturing,
  MdEngineering,
  MdWarehouse,
  MdSpeed,
  MdSettings,
} from "react-icons/md";
import {
  FaRegCalendarAlt,
  FaRegImages,
  FaVideo,
  FaFolderOpen,
  FaTrash,
  FaStickyNote,
  FaChrome,
  FaWhatsapp,
} from "react-icons/fa";
import { IoApps, IoDocumentText } from "react-icons/io5";
import { VscCode } from "react-icons/vsc";

function clamp(value, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

function smooth(value) {
  return value * value * (3 - 2 * value);
}

const PRODUCT_THEME = {
  books: {
    name: "SmartBooks",
    short: "SB",
    subtitle: "AI Accounting OS",
    accent: "#5244a7",
    accent2: "#6f63bd",
    soft: "rgba(82, 68, 167, 0.12)",
    dark: "#10241f",
    appBg: "#f7f8fb",
    sidebarBg: "rgba(255,255,255,0.92)",
    chipBg: "#f1f5f9",
    alertBg: "#10241f",
  },
  school: {
    name: "SmartSchool",
    short: "SS",
    subtitle: "AI School OS",
    accent: "#0ea5e9",
    accent2: "#10b981",
    soft: "rgba(14, 165, 233, 0.14)",
    dark: "#063b3d",
    appBg: "#f0fdfa",
    sidebarBg: "rgba(240,253,250,0.92)",
    chipBg: "#e0f2fe",
    alertBg: "#064e3b",
  },
  hospital: {
    name: "SmartHospital",
    short: "SH",
    subtitle: "AI Hospital OS",
    accent: "#dc2626",
    accent2: "#06b6d4",
    soft: "rgba(220, 38, 38, 0.12)",
    dark: "#3f0f18",
    appBg: "#fff7f7",
    sidebarBg: "rgba(255,247,247,0.92)",
    chipBg: "#fee2e2",
    alertBg: "#7f1d1d",
  },
  industry: {
    name: "SmartIndustry",
    short: "SI",
    subtitle: "AI Factory OS",
    accent: "#f97316",
    accent2: "#475569",
    soft: "rgba(249, 115, 22, 0.14)",
    dark: "#292524",
    appBg: "#fffaf0",
    sidebarBg: "rgba(255,250,240,0.92)",
    chipBg: "#ffedd5",
    alertBg: "#431407",
  },
};

const months = [
  { label: "Jan", value: 45, amount: "₹3.8L" },
  { label: "Feb", value: 62, amount: "₹5.1L" },
  { label: "Mar", value: 55, amount: "₹4.6L" },
  { label: "Apr", value: 78, amount: "₹6.7L" },
  { label: "May", value: 69, amount: "₹5.9L" },
  { label: "Jun", value: 92, amount: "₹8.4L" },
  { label: "Jul", value: 74, amount: "₹6.3L" },
  { label: "Aug", value: 88, amount: "₹7.8L" },
];

const schoolMonths = [
  { label: "Apr", value: 48, amount: "412" },
  { label: "May", value: 62, amount: "528" },
  { label: "Jun", value: 76, amount: "690" },
  { label: "Jul", value: 86, amount: "812" },
  { label: "Aug", value: 70, amount: "745" },
  { label: "Sep", value: 92, amount: "956" },
];

const hospitalMonths = [
  { label: "Mon", value: 72, amount: "248" },
  { label: "Tue", value: 88, amount: "306" },
  { label: "Wed", value: 76, amount: "272" },
  { label: "Thu", value: 92, amount: "338" },
  { label: "Fri", value: 84, amount: "291" },
  { label: "Sat", value: 68, amount: "224" },
];

const industryMonths = [
  { label: "Line 1", value: 86, amount: "94%" },
  { label: "Line 2", value: 78, amount: "88%" },
  { label: "Line 3", value: 92, amount: "97%" },
  { label: "Line 4", value: 65, amount: "74%" },
  { label: "Line 5", value: 81, amount: "91%" },
  { label: "Line 6", value: 89, amount: "96%" },
];

const booksSidebarItems = [
  { id: "dashboard", label: "Dashboard", Icon: MdDashboard },
  { id: "gst", label: "GST & e-Invoice", Icon: MdReceiptLong },
  { id: "ewaybill", label: "E-Waybill", Icon: MdLocalShipping },
  { id: "invoices", label: "Invoices", Icon: IoDocumentText },
  { id: "banking", label: "Bank Sync", Icon: MdAccountBalance },
  { id: "inventory", label: "Inventory", Icon: MdInventory2 },
  { id: "reports", label: "Reports", Icon: MdAssessment },
];

const schoolSidebarItems = [
  { id: "overview", label: "Overview", Icon: MdDashboard },
  { id: "admissions", label: "Admissions", Icon: MdSchool },
  { id: "students", label: "Students", Icon: MdPeople },
  { id: "fees", label: "Fees", Icon: MdPayments },
  { id: "attendance", label: "Attendance", Icon: MdAssignment },
  { id: "transport", label: "Transport", Icon: MdDirectionsBus },
  { id: "reports", label: "Reports", Icon: MdAssessment },
];

const hospitalSidebarItems = [
  { id: "overview", label: "Overview", Icon: MdDashboard },
  { id: "patients", label: "Patients", Icon: MdPeople },
  { id: "appointments", label: "Appointments", Icon: FaRegCalendarAlt },
  { id: "doctors", label: "Doctors", Icon: MdMedicalServices },
  { id: "beds", label: "Beds & ICU", Icon: MdLocalHospital },
  { id: "pharmacy", label: "Pharmacy", Icon: MdMedication },
  { id: "reports", label: "Reports", Icon: MdMonitorHeart },
];

const industrySidebarItems = [
  { id: "overview", label: "Overview", Icon: MdDashboard },
  { id: "production", label: "Production", Icon: MdFactory },
  { id: "machines", label: "Machines", Icon: MdPrecisionManufacturing },
  { id: "quality", label: "Quality", Icon: MdScience },
  { id: "inventory", label: "Inventory", Icon: MdWarehouse },
  { id: "maintenance", label: "Maintenance", Icon: MdEngineering },
  { id: "reports", label: "Reports", Icon: MdAssessment },
];

const PRODUCT_CONFIG = {
  books: {
    sidebarItems: booksSidebarItems,
    headerTitle: "SmartBooks AI",
    heading: "Accounting, GST, e-Invoice & e-Waybill",
    commandLabel: "Live Accounting Command Center",
    defaultSection: "dashboard",
    alertSection: "ewaybill",
    initialStatus: "AI Auto Sync active",
    syncedStatus: "Latest GST data synced",
    alertText: "18 invoices are ready for e-Waybill generation.",
  },
  school: {
    sidebarItems: schoolSidebarItems,
    headerTitle: "SmartSchool AI",
    heading: "ERP, Admissions, Fees, Attendance & Transport",
    commandLabel: "Live School Command Center",
    defaultSection: "overview",
    alertSection: "fees",
    initialStatus: "School AI Sync active",
    syncedStatus: "School data synced",
    alertText: "82 parents need fee follow-up today.",
  },
  hospital: {
    sidebarItems: hospitalSidebarItems,
    headerTitle: "SmartHospital AI",
    heading: "Patients, OPD, Beds, Pharmacy & Lab Flow",
    commandLabel: "Live Hospital Command Center",
    defaultSection: "overview",
    alertSection: "beds",
    initialStatus: "Hospital AI triage active",
    syncedStatus: "Hospital queue synced",
    alertText: "ICU occupancy is high. 6 discharges need doctor approval.",
  },
  industry: {
    sidebarItems: industrySidebarItems,
    headerTitle: "SmartIndustry AI",
    heading: "Production, Machines, Quality & Maintenance",
    commandLabel: "Live Factory Command Center",
    defaultSection: "overview",
    alertSection: "maintenance",
    initialStatus: "Factory AI monitor active",
    syncedStatus: "Plant telemetry synced",
    alertText: "Line 4 needs preventive maintenance before the next shift.",
  },
};

const dockItems = [
  {
    id: "finder",
    label: "Finder",
    books: "dashboard",
    school: "overview",
    hospital: "overview",
    industry: "overview",
    Icon: FaFolderOpen,
    bg: "linear-gradient(135deg,#40c9ff 0%,#eef9ff 52%,#ffffff 100%)",
    darkText: true,
  },
  {
    id: "launchpad",
    label: "Launchpad",
    books: "dashboard",
    school: "overview",
    hospital: "overview",
    industry: "overview",
    Icon: IoApps,
    bg: "linear-gradient(135deg,#d8dde7 0%,#ffffff 100%)",
    darkText: true,
  },
  {
    id: "photos",
    label: "Photos",
    books: "reports",
    school: "reports",
    hospital: "reports",
    industry: "reports",
    Icon: FaRegImages,
    bg: "conic-gradient(from 20deg,#ff3b30,#ff9500,#ffcc00,#34c759,#5ac8fa,#007aff,#af52de,#ff2d55,#ff3b30)",
  },
  {
    id: "facetime",
    label: "FaceTime",
    books: "gst",
    school: "students",
    hospital: "doctors",
    industry: "production",
    Icon: FaVideo,
    bg: "linear-gradient(135deg,#22c55e,#12d76f,#d9ffe8)",
  },
  {
    id: "reminders",
    label: "Reminders",
    books: "ewaybill",
    school: "attendance",
    hospital: "appointments",
    industry: "maintenance",
    Icon: MdNotificationsActive,
    bg: "linear-gradient(135deg,#ffffff,#e8edf5)",
    darkText: true,
  },
  {
    id: "notes",
    label: "Notes",
    books: "invoices",
    school: "fees",
    hospital: "patients",
    industry: "quality",
    Icon: FaStickyNote,
    bg: "linear-gradient(135deg,#ffd84d 0%,#fff4b8 45%,#ffffff 100%)",
    darkText: true,
  },
  {
    id: "calendar",
    label: "Calendar",
    books: "reports",
    school: "attendance",
    hospital: "appointments",
    industry: "production",
    Icon: FaRegCalendarAlt,
    bg: "linear-gradient(180deg,#ff3b30 0%,#ff3b30 32%,#ffffff 33%,#ffffff 100%)",
    darkText: true,
  },
  {
    id: "settings",
    label: "Settings",
    books: "banking",
    school: "reports",
    hospital: "reports",
    industry: "machines",
    Icon: MdSettings,
    bg: "linear-gradient(145deg,#aab2bd,#eef2f6 48%,#7b8491)",
    image:
      "https://cdn.iconscout.com/icon/free/png-256/free-apple-settings-icon-svg-download-png-493162.png",
  },
  {
    id: "vscode",
    label: "VS Code",
    books: "inventory",
    school: "reports",
    hospital: "reports",
    industry: "reports",
    Icon: VscCode,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/3840px-Visual_Studio_Code_1.35_icon.svg.png",
    bg: "#ffffff",
    darkText: true,
  },
  {
    id: "chrome",
    label: "Chrome",
    books: "gst",
    school: "admissions",
    hospital: "patients",
    industry: "quality",
    Icon: FaChrome,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/1280px-Google_Chrome_icon_%28February_2022%29.svg.png",
    bg: "#ffffff",
    darkText: true,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    books: "invoices",
    school: "fees",
    hospital: "appointments",
    industry: "maintenance",
    Icon: FaWhatsapp,
    image:
      "https://cdn.iconscout.com/icon/free/png-256/free-whatsapp-icon-svg-download-png-493160.png",
    bg: "#06c755",
  },
  {
    id: "files",
    label: "Files",
    books: "reports",
    school: "reports",
    hospital: "reports",
    industry: "reports",
    Icon: IoDocumentText,
    bg: "linear-gradient(135deg,#ffffff,#dbe4f0)",
    darkText: true,
  },
  {
    id: "trash",
    label: "Trash",
    books: "dashboard",
    school: "overview",
    hospital: "overview",
    industry: "overview",
    Icon: FaTrash,
    bg: "white",
    image:"data:image/jpeg;base64,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",
    darkText: true,
  },
];

function MacDock({
  currentProduct,
  activeSections,
  setProductSection,
}) {
  return (
    <div className="absolute bottom-2 left-1/2 z-[55] flex max-w-[94%] -translate-x-1/2 items-end gap-[3px] overflow-visible rounded-[18px] border border-white/40 bg-white/30 px-1.5 py-1.5 shadow-[0_18px_55px_rgba(15,23,42,0.28),inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-2xl md:bottom-4 md:gap-2.5 md:rounded-[30px] md:px-4 md:py-2.5">
      {dockItems.map((item, index) => {
        const Icon = item.Icon;
        const target = item[currentProduct] || PRODUCT_CONFIG[currentProduct].defaultSection;
        const isActive = activeSections[currentProduct] === target;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setProductSection(currentProduct, target)}
            className={`group relative grid h-5 w-5 shrink-0 place-items-center overflow-visible rounded-[6px] text-xs font-black shadow-[0_7px_16px_rgba(15,23,42,0.22),inset_0_1px_0_rgba(255,255,255,0.65)] transition duration-300 hover:-translate-y-3 hover:scale-110 active:scale-95 md:h-12 md:w-12 md:rounded-[14px] md:text-[22px] ${
              item.darkText ? "text-[#111827]" : "text-white"
            }`}
            style={{ background: item.bg }}
          >
            <span className="pointer-events-none absolute inset-[1px] rounded-[inherit] bg-gradient-to-b from-white/45 via-transparent to-black/10" />
            <Icon className="relative z-10" />

            <span className="pointer-events-none absolute -top-9 z-20 scale-90 whitespace-nowrap rounded-md bg-[#202124]/95 px-2.5 py-1 text-[9px] font-semibold text-white opacity-0 shadow-lg transition group-hover:scale-100 group-hover:opacity-100">
              {item.label}
            </span>

            <span
              className={`absolute -bottom-[4px] left-1/2 h-0.5 w-0.5 -translate-x-1/2 rounded-full bg-slate-800 transition-opacity md:-bottom-[7px] md:h-1 md:w-1 ${isActive ? "opacity-100" : "opacity-0"}`}
            />

            {(index === 6 || index === 10) && (
              <span className="absolute -right-[2px] top-0 h-5 w-px bg-white/40 md:-right-[7px] md:top-1 md:h-10" />
            )}
          </button>
        );
      })}
    </div>
  );
}

function PaperLines({ opacity }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center bg-white"
      style={{ opacity }}
    >
      <div className="mb-5 h-8 w-32 rounded-lg bg-slate-100" />

      <div className="space-y-3">
        {[180, 260, 220, 300, 250, 210, 280, 190].map((w, i) => (
          <div
            key={i}
            className="h-2 rounded-full bg-slate-200"
            style={{ width: `${w}px` }}
          />
        ))}
      </div>

      <div className="mt-8 h-20 w-[420px] rounded-2xl bg-slate-100" />
    </div>
  );
}

const sparklineSeries = [
  [16, 24, 21, 36, 31, 48, 44, 62],
  [44, 38, 52, 47, 61, 58, 72, 68],
  [22, 35, 30, 42, 55, 49, 63, 78],
];

function MiniSparkline({ theme, dark, variant = 0 }) {
  const values = sparklineSeries[variant % sparklineSeries.length];
  const points = values
    .map((value, index) => `${(index * 120) / (values.length - 1)},${42 - value * 0.42}`)
    .join(" ");
  const areaPoints = `0,46 ${points} 120,46`;
  const stroke = dark ? theme.accent2 : theme.accent;

  return (
    <svg
      viewBox="0 0 120 48"
      preserveAspectRatio="none"
      className="mt-3 h-8 w-full overflow-visible"
      aria-hidden="true"
    >
      <polygon points={areaPoints} fill={stroke} opacity={dark ? 0.16 : 0.09} />
      <polyline
        points={points}
        fill="none"
        stroke={stroke}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="120"
        cy={42 - values.at(-1) * 0.42}
        r="3"
        fill={stroke}
        stroke={dark ? theme.dark : "white"}
        strokeWidth="2"
      />
    </svg>
  );
}

function StatCard({
  label,
  value,
  note,
  dark = false,
  theme = PRODUCT_THEME.books,
}) {
  const sparklineVariant = label.length % sparklineSeries.length;

  return (
    <button
      type="button"
      className="rounded-[22px] border p-4 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{
        background: dark ? theme.dark : "#ffffff",
        color: dark ? "#ffffff" : "#10241f",
        borderColor: dark ? theme.dark : "#e2e8f0",
      }}
    >
      <p
        className="text-[10px] font-black uppercase tracking-[0.2em]"
        style={{
          color: dark ? "rgba(255,255,255,0.45)" : "#94a3b8",
        }}
      >
        {label}
      </p>

      <h4 className="mt-2 text-2xl font-black tracking-[-0.04em]">
        {value}
      </h4>

      <p
        className="mt-1 text-xs"
        style={{
          color: dark ? "rgba(255,255,255,0.65)" : "#64748b",
        }}
      >
        {note}
      </p>

      <MiniSparkline
        theme={theme}
        dark={dark}
        variant={sparklineVariant}
      />
    </button>
  );
}

function AnalyticsPanel({ title, theme = PRODUCT_THEME.books }) {
  const values = [28, 41, 36, 58, 52, 71, 66, 84, 78, 92];
  const linePoints = values
    .map((value, index) => `${28 + index * 61},${150 - value * 1.22}`)
    .join(" ");

  return (
    <div className="mt-4 grid grid-cols-[1.55fr_0.7fr] gap-4">
      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p
              className="text-[10px] font-black uppercase tracking-[0.2em]"
              style={{ color: theme.accent }}
            >
              {title} Intelligence
            </p>
            <h4 className="mt-1 text-xl font-black text-[#10241f]">
              Performance overview
            </h4>
          </div>
          <div className="flex gap-2">
            {["7D", "30D", "90D"].map((range, index) => (
              <span
                key={range}
                className="rounded-full px-2.5 py-1 text-[9px] font-black"
                style={{
                  background: index === 1 ? theme.soft : "#f8fafc",
                  color: index === 1 ? theme.accent : "#94a3b8",
                }}
              >
                {range}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mt-4 h-44 overflow-hidden rounded-2xl bg-slate-50/80 px-3 pt-3">
          <div className="absolute inset-x-3 top-3 bottom-7 flex flex-col justify-between">
            {[0, 1, 2, 3].map((line) => (
              <span key={line} className="border-t border-dashed border-slate-200" />
            ))}
          </div>

          <svg
            viewBox="0 0 610 170"
            preserveAspectRatio="none"
            className="absolute inset-x-3 top-2 h-[145px] w-[calc(100%-24px)]"
            aria-hidden="true"
          >
            {values.map((value, index) => (
              <rect
                key={index}
                x={12 + index * 61}
                y={160 - value}
                width="31"
                height={value}
                rx="7"
                fill={theme.accent}
                opacity={index === values.length - 2 ? 0.75 : 0.13}
              />
            ))}
            <polyline
              points={linePoints}
              fill="none"
              stroke={theme.accent2}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {values.map((value, index) => (
              <circle
                key={`point-${index}`}
                cx={28 + index * 61}
                cy={150 - value * 1.22}
                r={index === values.length - 1 ? 6 : 3.5}
                fill="white"
                stroke={theme.accent2}
                strokeWidth="3"
              />
            ))}
          </svg>

          <div className="absolute inset-x-4 bottom-2 flex justify-between text-[8px] font-bold text-slate-400">
            {["W1", "W2", "W3", "W4", "W5"].map((week) => (
              <span key={week}>{week}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Mix Analysis
        </p>
        <div
          className="mx-auto mt-4 grid h-32 w-32 place-items-center rounded-full"
          style={{
            background: `conic-gradient(${theme.accent} 0 48%, ${theme.accent2} 48% 76%, ${theme.soft} 76% 100%)`,
          }}
        >
          <div className="grid h-20 w-20 place-items-center rounded-full bg-white text-center shadow-inner">
            <span>
              <b className="block text-xl font-black text-[#10241f]">92%</b>
              <small className="text-[8px] font-black uppercase tracking-wide text-slate-400">
                Health
              </small>
            </span>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          {[
            ["Automated", "48%", theme.accent],
            ["Assisted", "28%", theme.accent2],
            ["Manual", "24%", theme.soft],
          ].map(([label, value, color]) => (
            <div key={label} className="flex items-center justify-between text-[10px] font-bold">
              <span className="flex items-center gap-2 text-slate-500">
                <i className="h-2 w-2 rounded-full" style={{ background: color }} />
                {label}
              </span>
              <b className="text-[#10241f]">{value}</b>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProgressRow({ label, value, width, theme = PRODUCT_THEME.books }) {
  return (
    <button type="button" className="w-full text-left">
      <div className="mb-1 flex justify-between text-xs font-bold">
        <span className="text-slate-500">{label}</span>
        <span className="text-[#10241f]">{value}</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${width}%`,
            background: `linear-gradient(90deg, ${theme.accent}, ${theme.accent2})`,
          }}
        />
      </div>
    </button>
  );
}

function MarkedBarChart({
  title = "Revenue Overview",
  amount = "₹8.42L",
  subtitle = "Sales, GST invoices and payment collections",
  data = months,
  marks = ["₹10L", "₹7.5L", "₹5L", "₹2.5L", "₹0"],
  theme = PRODUCT_THEME.books,
}) {
  return (
    <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p
            className="text-[10px] font-black uppercase tracking-[0.22em]"
            style={{ color: theme.accent }}
          >
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-black tracking-[-0.05em] text-[#10241f]">
            {amount}
          </h3>

          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>

        <button
          className="rounded-full px-3 py-1 text-[11px] font-black transition"
          style={{
            background: theme.soft,
            color: theme.accent,
          }}
        >
          +18.4%
        </button>
      </div>

      <div className="mt-6 grid h-52 grid-cols-[42px_1fr] gap-3">
        <div className="flex h-full flex-col justify-between pb-6 text-right text-[10px] font-bold text-slate-400">
          {marks.map((mark) => (
            <span key={mark}>{mark}</span>
          ))}
        </div>

        <div className="relative h-full">
          <div className="absolute inset-0 flex flex-col justify-between pb-6">
            {marks.map((mark) => (
              <div
                key={mark}
                className="border-t border-dashed border-slate-200"
              />
            ))}
          </div>

          <div className="relative z-10 flex h-full items-end gap-3 pb-6">
            {data.map((item, index) => (
              <button
                type="button"
                key={index}
                className="group flex h-full flex-1 flex-col justify-end"
              >
                <span className="mb-2 text-center text-[10px] font-black text-slate-400 opacity-0 transition group-hover:opacity-100">
                  {item.amount}
                </span>

                <div
                  className="w-full rounded-t-2xl shadow-[inset_0_10px_20px_rgba(255,255,255,0.18)] transition duration-300"
                  style={{
                    height: `${item.value}%`,
                    background: `linear-gradient(180deg, ${theme.accent2}, ${theme.accent})`,
                  }}
                />

                <p className="mt-2 text-center text-[10px] font-bold text-slate-400">
                  {item.label}
                </p>
              </button>
            ))}
          </div>

          <svg
            viewBox="0 0 800 180"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[calc(100%-24px)] w-full overflow-visible"
            aria-hidden="true"
          >
            <polyline
              points={data
                .map(
                  (item, index) =>
                    `${((index + 0.5) * 800) / data.length},${164 - item.value * 1.35}`,
                )
                .join(" ")}
              fill="none"
              stroke={theme.accent2}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {data.map((item, index) => (
              <circle
                key={`${item.label}-trend`}
                cx={((index + 0.5) * 800) / data.length}
                cy={164 - item.value * 1.35}
                r="5"
                fill="white"
                stroke={theme.accent2}
                strokeWidth="3"
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}

function CashFlowCard({ theme = PRODUCT_THEME.books }) {
  return (
    <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">
            Cash Flow
          </p>
          <h4 className="mt-2 text-xl font-black text-[#10241f]">
            ₹3.18L net cash
          </h4>
        </div>

        <div
          className="grid h-12 w-12 place-items-center rounded-2xl text-lg font-black"
          style={{
            background: theme.soft,
            color: theme.accent,
          }}
        >
          ₹
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <ProgressRow label="Cash In" value="₹5.76L" width={82} theme={theme} />
        <ProgressRow label="Cash Out" value="₹2.58L" width={46} theme={theme} />
        <ProgressRow label="Bank Match" value="96%" width={96} theme={theme} />
      </div>
    </div>
  );
}

function BooksHome({ setActiveSection }) {
  const theme = PRODUCT_THEME.books;

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Total Sales" value="₹8.42L" note="+18.4% this month" theme={theme} />
        <StatCard label="GST Payable" value="₹1.82L" note="GSTR ready" theme={theme} />
        <StatCard label="Invoices" value="428" note="94 auto-reconciled" theme={theme} />
        <StatCard label="Net Profit" value="₹2.74L" note="32.5% margin" dark theme={theme} />
      </div>

      <div className="mt-4 grid grid-cols-[1.35fr_0.8fr] gap-4">
        <MarkedBarChart theme={theme} />

        <div className="space-y-4">
          <CashFlowCard theme={theme} />

          <button
            type="button"
            onClick={() => setActiveSection("gst")}
            className="w-full rounded-[26px] border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">
              AI Reconciliation
            </p>

            <h4 className="mt-2 text-xl font-black text-[#10241f]">
              96% matched
            </h4>

            <p className="mt-1 text-xs text-slate-500">
              Bank entries, GST invoices, e-Invoices and receipts matched
              automatically.
            </p>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {[
                ["UPI", "₹2.1L"],
                ["Cash", "₹86K"],
                ["Bank", "₹4.8L"],
              ].map(([label, value], i) => (
                <div key={i} className="rounded-xl bg-slate-50 p-3">
                  <p className="text-[10px] font-black text-slate-400">
                    {label}
                  </p>
                  <p className="mt-1 text-sm font-black text-[#10241f]">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

function GSTWorkspace({ setActiveSection }) {
  const theme = PRODUCT_THEME.books;

  return (
    <div className="grid grid-cols-[1.1fr_0.9fr] gap-4">
      <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
        <p
          className="text-[10px] font-black uppercase tracking-[0.22em]"
          style={{ color: theme.accent }}
        >
          GST & e-Invoice Center
        </p>

        <h3 className="mt-2 text-3xl font-black tracking-[-0.05em] text-[#10241f]">
          ₹1.82L GST payable
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          GSTR-1, GSTR-3B, e-Invoice and ITC tracking in one place.
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <StatCard label="GSTR-1" value="Ready" note="284 invoices" theme={theme} />
          <StatCard label="GSTR-3B" value="92%" note="Auto-filled" theme={theme} />
          <StatCard label="ITC Match" value="₹64K" note="Claim eligible" dark theme={theme} />
        </div>

        <div className="mt-5 rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
            Filing progress
          </p>

          <div className="mt-4 space-y-3">
            <ProgressRow label="Sales invoices mapped" value="284/300" width={94} theme={theme} />
            <ProgressRow label="GSTIN validation" value="98%" width={98} theme={theme} />
            <ProgressRow label="HSN/SAC check" value="88%" width={88} theme={theme} />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <button
          type="button"
          onClick={() => setActiveSection("ewaybill")}
          className="w-full rounded-[26px] p-5 text-left text-white shadow-sm transition hover:-translate-y-1"
          style={{ background: theme.alertBg }}
        >
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/45">
            Smart Action
          </p>
          <h4 className="mt-2 text-xl font-black">Generate e-Waybill</h4>
          <p className="mt-2 text-sm leading-6 text-white/70">
            18 GST invoices are eligible for transport document generation.
          </p>
        </button>

        <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">
            Compliance Health
          </p>
          <h4 className="mt-2 text-xl font-black text-[#10241f]">Excellent</h4>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full w-[91%] rounded-full"
              style={{
                background: `linear-gradient(90deg, ${theme.accent}, ${theme.accent2})`,
              }}
            />
          </div>
          <p className="mt-3 text-xs text-slate-500">
            No duplicate invoice numbers detected.
          </p>
        </div>
      </div>
    </div>
  );
}

function EWayBillWorkspace() {
  const theme = PRODUCT_THEME.books;

  return (
    <div className="grid grid-cols-[1fr_0.85fr] gap-4">
      <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
        <p
          className="text-[10px] font-black uppercase tracking-[0.22em]"
          style={{ color: theme.accent }}
        >
          E-Waybill Automation
        </p>

        <h3 className="mt-2 text-3xl font-black tracking-[-0.05em] text-[#10241f]">
          18 transport bills ready
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Auto-check distance, GSTIN, vehicle number and invoice value.
        </p>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
          {[
            ["INV-2841", "Kadapa → Hyderabad", "₹76,400", "Ready"],
            ["INV-2842", "Kadapa → Tirupati", "₹42,800", "Ready"],
            ["INV-2843", "Kadapa → Vijayawada", "₹1.12L", "Check vehicle"],
            ["INV-2844", "Kadapa → Bengaluru", "₹88,900", "Ready"],
          ].map((row, i) => (
            <button
              type="button"
              key={i}
              className="grid w-full grid-cols-[1fr_1.3fr_0.8fr_0.9fr] items-center border-b border-slate-100 px-4 py-3 text-left text-xs font-bold last:border-b-0 hover:bg-slate-50"
            >
              <span className="text-[#10241f]">{row[0]}</span>
              <span className="text-slate-500">{row[1]}</span>
              <span className="text-[#10241f]">{row[2]}</span>
              <span
                className={`rounded-full px-2 py-1 text-center text-[10px] ${
                  row[3] === "Ready"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-amber-50 text-amber-600"
                }`}
              >
                {row[3]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">
          AI Validation
        </p>

        <div className="mt-5 space-y-4">
          <ProgressRow label="GSTIN verified" value="100%" width={100} theme={theme} />
          <ProgressRow label="Pincode distance check" value="92%" width={92} theme={theme} />
          <ProgressRow label="Vehicle format check" value="78%" width={78} theme={theme} />
          <ProgressRow label="Invoice threshold check" value="96%" width={96} theme={theme} />
        </div>

        <button
          className="mt-6 w-full rounded-2xl px-4 py-3 text-sm font-black text-white transition"
          style={{ background: theme.accent }}
        >
          Generate selected e-Waybills
        </button>
      </div>
    </div>
  );
}

function SimpleWorkspace({
  title,
  subtitle,
  cards,
  theme = PRODUCT_THEME.books,
}) {
  return (
    <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm">
      <p
        className="text-[10px] font-black uppercase tracking-[0.22em]"
        style={{ color: theme.accent }}
      >
        {title}
      </p>

      <h3 className="mt-2 text-3xl font-black tracking-[-0.05em] text-[#10241f]">
        {subtitle}
      </h3>

      <div className="mt-6 grid grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <StatCard
            key={index}
            label={card.label}
            value={card.value}
            note={card.note}
            dark={card.dark}
            theme={theme}
          />
        ))}
      </div>

      <AnalyticsPanel title={title} theme={theme} />
    </div>
  );
}

function SchoolHome({ setActiveSection }) {
  const theme = PRODUCT_THEME.school;

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Admissions" value="1,248" note="2026 leads tracked" theme={theme} />
        <StatCard label="Fee Collection" value="₹42.8L" note="+21% this term" theme={theme} />
        <StatCard label="Attendance" value="94%" note="Today average" theme={theme} />
        <StatCard label="Transport" value="18 Routes" note="Live bus tracking" dark theme={theme} />
      </div>

      <div className="mt-4 grid grid-cols-[1.35fr_0.8fr] gap-4">
        <MarkedBarChart
          title="Admissions Growth"
          amount="956 Leads"
          subtitle="New enquiries, application forms and walk-ins"
          data={schoolMonths}
          marks={["1000", "750", "500", "250", "0"]}
          theme={theme}
        />

        <div className="space-y-4">
          <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">
              Fee Automation
            </p>
            <h4 className="mt-2 text-xl font-black text-[#10241f]">
              ₹12.4L pending
            </h4>
            <div className="mt-5 space-y-3">
              <ProgressRow label="Paid fees" value="78%" width={78} theme={theme} />
              <ProgressRow label="Pending reminders" value="82 parents" width={58} theme={theme} />
              <ProgressRow label="WhatsApp delivery" value="96%" width={96} theme={theme} />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveSection("fees")}
            className="w-full rounded-[26px] p-5 text-left text-white shadow-sm transition hover:-translate-y-1"
            style={{ background: theme.alertBg }}
          >
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/40">
              School AI Suggestion
            </p>
            <h4 className="mt-2 text-xl font-black">Send fee reminders</h4>
            <p className="mt-2 text-sm leading-6 text-white/70">
              Class 8 and Class 9 collections are lower this week. AI found 82
              parents to contact today.
            </p>
          </button>
        </div>
      </div>
    </>
  );
}

function SchoolWorkspace({ activeSection, setActiveSection }) {
  const theme = PRODUCT_THEME.school;

  if (activeSection === "admissions") {
    return (
      <SimpleWorkspace
        title="Admissions CRM"
        subtitle="Track enquiries, walk-ins and follow-ups"
        theme={theme}
        cards={[
          { label: "New Leads", value: "956", note: "This campaign" },
          { label: "Follow-ups", value: "312", note: "Assigned to staff" },
          { label: "Converted", value: "184", note: "Admissions completed", dark: true },
        ]}
      />
    );
  }

  if (activeSection === "students") {
    return (
      <SimpleWorkspace
        title="Student Management"
        subtitle="Profiles, classes, attendance and parent records"
        theme={theme}
        cards={[
          { label: "Students", value: "2,840", note: "Active records" },
          { label: "Classes", value: "42", note: "Sections mapped" },
          { label: "Parent App", value: "91%", note: "Installed users", dark: true },
        ]}
      />
    );
  }

  if (activeSection === "fees") {
    return (
      <SimpleWorkspace
        title="Fees & Payments"
        subtitle="Collect fees, send receipts and WhatsApp reminders"
        theme={theme}
        cards={[
          { label: "Collected", value: "₹42.8L", note: "This term" },
          { label: "Pending", value: "₹12.4L", note: "82 priority parents" },
          { label: "Receipts", value: "1,982", note: "Auto generated", dark: true },
        ]}
      />
    );
  }

  if (activeSection === "attendance") {
    return (
      <SimpleWorkspace
        title="Attendance"
        subtitle="Daily attendance, absent alerts and teacher updates"
        theme={theme}
        cards={[
          { label: "Today", value: "94%", note: "Average attendance" },
          { label: "Absent", value: "128", note: "SMS/WhatsApp ready" },
          { label: "Staff", value: "98%", note: "Checked in", dark: true },
        ]}
      />
    );
  }

  if (activeSection === "transport") {
    return (
      <SimpleWorkspace
        title="Transport"
        subtitle="Routes, bus tracking, driver updates and parent alerts"
        theme={theme}
        cards={[
          { label: "Routes", value: "18", note: "Active buses" },
          { label: "Live GPS", value: "16", note: "Buses online" },
          { label: "Alerts", value: "Ready", note: "Delay notifications", dark: true },
        ]}
      />
    );
  }

  if (activeSection === "reports") {
    return (
      <SimpleWorkspace
        title="School Reports"
        subtitle="Admissions, fees, attendance and staff analytics"
        theme={theme}
        cards={[
          { label: "Principal View", value: "Live", note: "Daily summary" },
          { label: "Fee Report", value: "Ready", note: "Exportable" },
          { label: "AI Risk", value: "Low", note: "No major issues", dark: true },
        ]}
      />
    );
  }

  return <SchoolHome setActiveSection={setActiveSection} />;
}

function HospitalHome({ setActiveSection }) {
  const theme = PRODUCT_THEME.hospital;

  return (
    <div className="grid grid-cols-[0.9fr_1.7fr_0.95fr] gap-4">
      <div className="space-y-4">
        <div className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mx-auto grid h-24 w-24 place-items-center rounded-[24px] bg-[#9eece9] text-5xl">
            <MdMedicalServices />
          </div>
          <h3 className="mt-3 text-center text-lg font-black text-[#10241f]">
            Dr. Petra Winsburry
          </h3>
          <p className="text-center text-[11px] font-bold text-slate-400">
            Routine Check-Ups
          </p>
          <button
            type="button"
            onClick={() => setActiveSection("doctors")}
            className="mx-auto mt-3 block rounded-full px-4 py-1.5 text-[10px] font-black"
            style={{ background: theme.soft, color: theme.accent }}
          >
            Available
          </button>
          <div className="mt-4 border-t border-slate-100 pt-4 text-xs leading-5 text-slate-500">
            Senior general medicine practitioner with live OPD queue, patient
            history, prescriptions and discharge approvals in one view.
          </div>
        </div>

        <div className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            Patient Overview
          </p>
          <div className="mt-4 flex items-center gap-4">
            <div className="grid h-28 w-28 place-items-center rounded-full bg-[conic-gradient(#263d5f_0_35%,#9eece9_35%_72%,#dffafa_72%_100%)]">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-white text-center">
                <span className="text-lg font-black text-[#10241f]">1,890</span>
              </div>
            </div>
            <div className="space-y-2 text-xs font-bold text-slate-500">
              <p><span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#263d5f]" />Emergency 35%</p>
              <p><span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#9eece9]" />General 28%</p>
              <p><span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#dffafa]" />Internal 20%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <StatCard label="Total Patients" value="965" note="+45 today" theme={theme} />
          <StatCard label="Appointments" value="128" note="18 less than yesterday" theme={theme} />
          <StatCard label="Beds" value="315" note="+1.64% available" theme={theme} />
        </div>

        <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.accent }}>
                Appointment Stats
              </p>
              <h3 className="mt-1 text-2xl font-black text-[#10241f]">320 Visits</h3>
            </div>
            <button className="rounded-full bg-[#263d5f] px-4 py-2 text-[11px] font-black text-white">
              This Week
            </button>
          </div>

          <div className="mt-5 flex h-40 items-end gap-4 border-b border-slate-100 px-4">
            {hospitalMonths.map((item, index) => (
              <button key={item.label} type="button" className="group flex h-full flex-1 flex-col justify-end gap-2">
                <div className="flex h-full flex-col justify-end rounded-t-xl">
                  <span
                    className="w-full rounded-t-xl bg-[#9eece9]"
                    style={{ height: `${item.value}%` }}
                  />
                  <span
                    className="w-full rounded-b-xl bg-[#263d5f]"
                    style={{ height: `${Math.max(18, item.value - 42)}%` }}
                  />
                </div>
                <p className="text-center text-[10px] font-bold text-slate-400">{item.label}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setActiveSection("pharmacy")}
            className="rounded-[22px] border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-1"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Report</p>
            {["Room cleaning needed", "Medication restock", "Patient transport required"].map((item, index) => (
              <div key={item} className="mt-3 flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#9eece9] text-[#263d5f]">
                  {index + 1}
                </span>
                <p className="text-xs font-bold text-slate-600">{item}</p>
              </div>
            ))}
          </button>

          <button
            type="button"
            onClick={() => setActiveSection("beds")}
            className="rounded-[22px] p-5 text-left text-white shadow-sm transition hover:-translate-y-1"
            style={{ background: theme.alertBg }}
          >
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/40">
              Hospital AI
            </p>
            <h4 className="mt-2 text-xl font-black">Balance ICU capacity</h4>
            <p className="mt-2 text-sm leading-6 text-white/70">
              6 stable patients are ready for discharge approval.
            </p>
          </button>
        </div>
      </div>

      <div className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-[#10241f]">Schedule</h3>
          <button className="text-lg font-black text-slate-400">...</button>
        </div>
        <div className="mt-4 grid grid-cols-6 gap-1 rounded-2xl bg-[#e8fbfb] p-2 text-center text-[10px] font-black text-slate-400">
          {["17", "18", "19", "20", "21", "22"].map((day) => (
            <span
              key={day}
              className={`rounded-xl py-2 ${day === "20" ? "bg-[#263d5f] text-white" : ""}`}
            >
              {day}
            </span>
          ))}
        </div>
        <p className="mt-4 text-xs font-bold text-slate-400">5 schedules today</p>
        <div className="mt-2 space-y-3">
          {[
            ["Rupert Twinny", "Routine Check-Up", "09:00 AM"],
            ["Ruth Herdinger", "Follow-Up Visit", "10:00 AM"],
            ["Caren G. Simpson", "Routine Check-Up", "11:00 AM"],
            ["Staff Meeting", "Meeting", "01:00 PM"],
          ].map(([name, type, time], index) => (
            <button key={name} type="button" className="flex w-full gap-3 border-b border-slate-100 py-3 text-left last:border-b-0">
              <span
                className="mt-1 h-8 w-1 rounded-full"
                style={{ background: index === 3 ? "#fecaca" : "#9eece9" }}
              />
              <span>
                <span className="block text-xs font-black text-[#10241f]">{name}</span>
                <span className="text-[10px] font-bold text-slate-400">{type} · {time}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function HospitalWorkspace({ activeSection, setActiveSection }) {
  const theme = PRODUCT_THEME.hospital;

  if (activeSection === "patients") {
    return (
      <SimpleWorkspace
        title="Patient CRM"
        subtitle="OPD records, IPD history and care follow-ups"
        theme={theme}
        cards={[
          { label: "Registered", value: "3,842", note: "Active patients" },
          { label: "Today OPD", value: "186", note: "24 priority cases" },
          { label: "Follow-ups", value: "72", note: "WhatsApp ready", dark: true },
        ]}
      />
    );
  }

  if (activeSection === "appointments") {
    return (
      <SimpleWorkspace
        title="Appointments"
        subtitle="Doctor slots, token queue and patient reminders"
        theme={theme}
        cards={[
          { label: "Booked", value: "248", note: "Today" },
          { label: "Waiting", value: "38", note: "Live queue" },
          { label: "No-shows", value: "Low", note: "AI reminders sent", dark: true },
        ]}
      />
    );
  }

  if (activeSection === "doctors") {
    return (
      <SimpleWorkspace
        title="Doctor Desk"
        subtitle="Rounds, availability, departments and digital notes"
        theme={theme}
        cards={[
          { label: "Doctors", value: "46", note: "On schedule" },
          { label: "Rounds", value: "84%", note: "Completed" },
          { label: "Notes", value: "Live", note: "Voice to EMR", dark: true },
        ]}
      />
    );
  }

  if (activeSection === "beds") {
    return (
      <SimpleWorkspace
        title="Beds & ICU"
        subtitle="Ward occupancy, ICU pressure and discharge planning"
        theme={theme}
        cards={[
          { label: "Occupancy", value: "72%", note: "Hospital wide" },
          { label: "ICU", value: "86%", note: "High attention" },
          { label: "Discharge", value: "6", note: "Doctor approval", dark: true },
        ]}
      />
    );
  }

  if (activeSection === "pharmacy") {
    return (
      <SimpleWorkspace
        title="Pharmacy"
        subtitle="Medicine stock, billing and critical reorder alerts"
        theme={theme}
        cards={[
          { label: "Stock Health", value: "98%", note: "Critical ready" },
          { label: "Bills", value: "₹4.8L", note: "This week" },
          { label: "Reorder", value: "12", note: "AI suggested", dark: true },
        ]}
      />
    );
  }

  if (activeSection === "reports") {
    return (
      <SimpleWorkspace
        title="Hospital Reports"
        subtitle="Patient flow, revenue, care quality and pharmacy analytics"
        theme={theme}
        cards={[
          { label: "Admin View", value: "Live", note: "Daily summary" },
          { label: "Care SLA", value: "92%", note: "Within target" },
          { label: "Risk", value: "Medium", note: "ICU pressure", dark: true },
        ]}
      />
    );
  }

  return <HospitalHome setActiveSection={setActiveSection} />;
}

function IndustryHome({ setActiveSection }) {
  const theme = PRODUCT_THEME.industry;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-[0.55fr_1.35fr_0.65fr] gap-4">
        <div className="rounded-[22px] border border-slate-200 bg-[#e8eeee] p-4 shadow-sm">
          {[
            ["Operation Status", "#10b981"],
            ["Shipping Status", "#94a3b8"],
            ["Maintenance", "#ef4444"],
          ].map(([label, color], index) => (
            <button
              key={label}
              type="button"
              onClick={() => index === 2 && setActiveSection("maintenance")}
              className={`mb-3 flex w-full items-center justify-between rounded-xl p-3 text-left text-xs font-black ${
                index === 0 ? "bg-white text-[#10241f] shadow-sm" : "text-slate-500"
              }`}
            >
              {label}
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
            </button>
          ))}
        </div>

        <div className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: theme.accent }}>
            Statistics
          </p>
          <div className="mt-4 flex h-36 items-end gap-4 border-b border-slate-100 px-3">
            {industryMonths.concat(industryMonths.slice(0, 4)).map((item, index) => (
              <button key={`${item.label}-${index}`} type="button" className="flex h-full flex-1 flex-col justify-end">
                <span
                  className="w-full rounded-t-xl"
                  style={{
                    height: `${item.value}%`,
                    background: index === 5 ? "#0faaa0" : "rgba(15,170,160,0.24)",
                  }}
                />
                <span className="mt-2 text-center text-[9px] font-bold text-slate-400">
                  {index * 2 + 2}:00
                </span>
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setActiveSection("reports")}
          className="rounded-[22px] border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-1"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            Plant Share
          </p>
          <div className="mx-auto mt-5 grid h-28 w-28 place-items-center rounded-full bg-[conic-gradient(#0faaa0_0_56%,#9bded9_56%_81%,#0f766e_81%_100%)]">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-white text-lg font-black text-[#10241f]">
              56%
            </div>
          </div>
          <div className="mt-4 space-y-1 text-[10px] font-bold text-slate-500">
            <p><span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#0faaa0]" />Assembly</p>
            <p><span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#9bded9]" />Packing</p>
            <p><span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#0f766e]" />Dispatch</p>
          </div>
        </button>
      </div>

      <div className="rounded-[26px] border border-slate-200 bg-gradient-to-b from-[#f8fbfb] to-[#eef6f5] p-5 shadow-sm">
        <div className="relative h-48 overflow-hidden rounded-[22px] bg-[#e7eeee]">
          <div className="absolute left-8 top-8 space-y-3 text-[#0faaa0]">
            {[MdSpeed, MdInventory2, MdLocalShipping].map((Icon, index) => (
              <div key={index} className="flex items-center gap-3">
                <Icon className="text-2xl" />
                <span className="h-0.5 w-10 border-t-2 border-dotted border-[#0faaa0]" />
              </div>
            ))}
          </div>
          <div className="absolute bottom-12 left-44 right-20 h-4 rounded-full bg-slate-300" />
          {[
            ["left-[180px]", "h-20 w-20", "bg-slate-200"],
            ["left-[300px]", "h-24 w-20", "bg-slate-100"],
            ["left-[430px]", "h-24 w-16", "bg-slate-200"],
            ["left-[540px]", "h-24 w-24", "bg-white"],
            ["left-[680px]", "h-16 w-24", "bg-slate-100"],
            ["left-[820px]", "h-12 w-20", "bg-amber-100"],
          ].map(([left, size, bg], index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveSection(index === 2 ? "machines" : "production")}
              className={`absolute bottom-14 ${left} ${size} ${bg} rounded-xl border border-slate-200 shadow-sm transition hover:-translate-y-1`}
            >
              <span className="mx-auto mt-3 block h-3 w-8 rounded-full bg-[#0faaa0]" />
              <span className="mx-auto mt-2 block h-2 w-10 rounded-full bg-slate-300" />
            </button>
          ))}
          <div className="absolute bottom-8 left-44 right-20 flex justify-between border-t-2 border-slate-300" />
        </div>
      </div>

      <div className="grid grid-cols-[0.8fr_1fr_0.85fr_0.85fr] gap-4">
        <div className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm">
          <ProgressRow label="Units Completed" value="37,604" width={88} theme={theme} />
          <div className="mt-4" />
          <ProgressRow label="Packages Ready" value="5,624" width={74} theme={theme} />
          <div className="mt-4" />
          <ProgressRow label="Material Flow" value="175,224" width={82} theme={theme} />
        </div>

        <StatCard label="MD-0303F-10" value="94%" note="Cycle trend improving" theme={theme} />
        <StatCard label="G3000-DX" value="31,323" note="782 errors flagged" theme={theme} />
        <button
          type="button"
          onClick={() => setActiveSection("maintenance")}
          className="rounded-[22px] p-5 text-left text-white shadow-sm transition hover:-translate-y-1"
          style={{ background: theme.alertBg }}
        >
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/40">
            Industry AI
          </p>
          <h4 className="mt-2 text-xl font-black">Service Line 4</h4>
          <p className="mt-2 text-sm leading-6 text-white/70">
            Vibration is rising before night shift.
          </p>
        </button>
      </div>
    </div>
  );
}

function IndustryWorkspace({ activeSection, setActiveSection }) {
  const theme = PRODUCT_THEME.industry;

  if (activeSection === "production") {
    return (
      <SimpleWorkspace
        title="Production Control"
        subtitle="Targets, work orders, output and shift performance"
        theme={theme}
        cards={[
          { label: "Output", value: "12,480", note: "Units today" },
          { label: "Target", value: "94%", note: "On plan" },
          { label: "Bottleneck", value: "Line 4", note: "AI detected", dark: true },
        ]}
      />
    );
  }

  if (activeSection === "machines") {
    return (
      <SimpleWorkspace
        title="Machine Telemetry"
        subtitle="Live status, vibration, temperature and energy draw"
        theme={theme}
        cards={[
          { label: "Online", value: "42", note: "Machines live" },
          { label: "Warnings", value: "3", note: "Needs review" },
          { label: "Energy", value: "8% down", note: "Optimized", dark: true },
        ]}
      />
    );
  }

  if (activeSection === "quality") {
    return (
      <SimpleWorkspace
        title="Quality Control"
        subtitle="Inspections, defects, batch traceability and AI vision checks"
        theme={theme}
        cards={[
          { label: "Pass Rate", value: "98.2%", note: "This shift" },
          { label: "Defects", value: "24", note: "Across 6 batches" },
          { label: "Traceability", value: "Live", note: "Batch records", dark: true },
        ]}
      />
    );
  }

  if (activeSection === "inventory") {
    return (
      <SimpleWorkspace
        title="Warehouse"
        subtitle="Raw material, finished goods and dispatch planning"
        theme={theme}
        cards={[
          { label: "Raw Stock", value: "82%", note: "Healthy" },
          { label: "Dispatch", value: "48", note: "Orders ready" },
          { label: "Shortage", value: "7 SKUs", note: "AI reorder", dark: true },
        ]}
      />
    );
  }

  if (activeSection === "maintenance") {
    return (
      <SimpleWorkspace
        title="Maintenance"
        subtitle="Preventive schedules, breakdown risk and technician jobs"
        theme={theme}
        cards={[
          { label: "Jobs", value: "14", note: "Scheduled" },
          { label: "Risk", value: "Line 4", note: "Vibration rising" },
          { label: "Downtime", value: "18 min", note: "Today", dark: true },
        ]}
      />
    );
  }

  if (activeSection === "reports") {
    return (
      <SimpleWorkspace
        title="Industry Reports"
        subtitle="OEE, production, quality, energy and downtime analytics"
        theme={theme}
        cards={[
          { label: "OEE", value: "91%", note: "Plant average" },
          { label: "Quality", value: "98.2%", note: "Pass rate" },
          { label: "Risk", value: "Medium", note: "Line 4 watch", dark: true },
        ]}
      />
    );
  }

  return <IndustryHome setActiveSection={setActiveSection} />;
}

const AppFrame = memo(function AppFrame({
  product,
  activeSection,
  setActiveSection,
  setActiveProduct,
}) {
  const config = PRODUCT_CONFIG[product];
  const theme = PRODUCT_THEME[product];
  const [status, setStatus] = useState(config.initialStatus);

  return (
    <div className="h-full overflow-hidden">
      <div className="flex h-12 items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <button className="h-3.5 w-3.5 rounded-full bg-red-400" />
          <button className="h-3.5 w-3.5 rounded-full bg-yellow-400" />
          <button className="h-3.5 w-3.5 rounded-full bg-green-400" />
        </div>

        <button
          onClick={() => {
            setActiveSection(config.defaultSection);
            setActiveProduct(product);
          }}
          className="rounded-full px-5 py-1.5 text-[11px] font-black transition"
          style={{
            background: theme.chipBg,
            color: theme.accent,
          }}
        >
          {config.headerTitle}
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setStatus(config.syncedStatus)}
            className="rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-black text-slate-500 transition hover:text-white"
          >
            Sync
          </button>
          <button
            onClick={() => setStatus("Report exported")}
            className="rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-black text-slate-500 transition hover:bg-[#10241f] hover:text-white"
          >
            Export
          </button>
        </div>
      </div>

      <div
        className="grid h-[calc(100%-48px)] grid-cols-[220px_1fr]"
        style={{ background: theme.appBg }}
      >
        <aside
          className="border-r border-slate-200 p-4 text-left backdrop-blur-xl"
          style={{ background: theme.sidebarBg }}
        >
          <div className="flex items-center gap-3">
            <div
              className="grid h-11 w-11 place-items-center rounded-2xl text-lg font-black text-white shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})`,
                boxShadow: `0 14px 30px ${theme.soft}`,
              }}
            >
              {theme.short}
            </div>

            <div>
              <h4 className="text-sm font-black text-[#10241f]">
                {theme.name}
              </h4>
              <p className="text-[10px] font-bold text-slate-400">
                {theme.subtitle}
              </p>
            </div>
          </div>

          <nav className="mt-7 space-y-2">
            {config.sidebarItems.map((item) => {
              const Icon = item.Icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveSection(item.id);
                    setActiveProduct(product);
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-black transition hover:-translate-y-[1px]"
                  style={{
                    background:
                      activeSection === item.id ? theme.accent : "transparent",
                    color: activeSection === item.id ? "#ffffff" : "#64748b",
                    boxShadow:
                      activeSection === item.id
                        ? `0 14px 28px ${theme.soft}`
                        : "none",
                  }}
                >
                  <span
                    className="grid h-7 w-7 place-items-center rounded-lg text-base"
                    style={{
                      background:
                        activeSection === item.id
                          ? "rgba(255,255,255,0.16)"
                          : theme.soft,
                      color:
                        activeSection === item.id ? "#ffffff" : theme.accent,
                    }}
                  >
                    <Icon />
                  </span>
                  {item.label}
                </button>
              );
            })}
          </nav>

          <button
            onClick={() => {
              setActiveSection(config.alertSection);
              setActiveProduct(product);
            }}
            className="mt-6 w-full rounded-2xl p-4 text-left text-white transition hover:-translate-y-1"
            style={{ background: theme.alertBg }}
          >
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/40">
              AI Alert
            </p>
            <p className="mt-2 text-xs leading-5 text-white/80">
              {config.alertText}
            </p>
          </button>
        </aside>

        <main className="overflow-hidden p-5 text-left">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">
                {config.commandLabel}
              </p>

              <h2 className="mt-1 text-2xl font-black tracking-[-0.04em] text-[#10241f]">
                {config.heading}
              </h2>
            </div>

            <button className="rounded-full bg-white px-4 py-2 text-xs font-black text-[#10241f] shadow-sm transition hover:bg-[#10241f] hover:text-white">
              {status}
            </button>
          </div>

          {product === "school" ? (
            <SchoolWorkspace
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          ) : product === "hospital" ? (
            <HospitalWorkspace
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          ) : product === "industry" ? (
            <IndustryWorkspace
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          ) : activeSection === "gst" ? (
            <GSTWorkspace setActiveSection={setActiveSection} />
          ) : activeSection === "ewaybill" ? (
            <EWayBillWorkspace />
          ) : activeSection === "invoices" ? (
            <SimpleWorkspace
              title="Invoice Studio"
              subtitle="428 GST invoices created this month"
              theme={theme}
              cards={[
                { label: "Paid", value: "₹6.12L", note: "312 invoices" },
                { label: "Unpaid", value: "₹1.04L", note: "46 invoices pending" },
                {
                  label: "Overdue",
                  value: "₹38K",
                  note: "AI reminders ready",
                  dark: true,
                },
              ]}
            />
          ) : activeSection === "banking" ? (
            <SimpleWorkspace
              title="Bank Sync"
              subtitle="140+ bank support with auto reconciliation"
              theme={theme}
              cards={[
                { label: "Matched", value: "96%", note: "Bank entries reconciled" },
                { label: "UPI", value: "₹2.1L", note: "PhonePe, GPay, Paytm" },
                { label: "Unmatched", value: "14", note: "Needs review", dark: true },
              ]}
            />
          ) : activeSection === "inventory" ? (
            <SimpleWorkspace
              title="Inventory"
              subtitle="Stock, purchase, GST and product movement"
              theme={theme}
              cards={[
                { label: "Items", value: "1,284", note: "Across 8 categories" },
                { label: "Low Stock", value: "24", note: "Reorder required" },
                { label: "Purchase", value: "₹2.4L", note: "This month", dark: true },
              ]}
            />
          ) : activeSection === "reports" ? (
            <SimpleWorkspace
              title="AI Reports"
              subtitle="Profit, GST, sales and tax-ready summaries"
              theme={theme}
              cards={[
                { label: "P&L", value: "Ready", note: "Generated today" },
                { label: "GST Report", value: "92%", note: "Filing ready" },
                {
                  label: "Tax Risk",
                  value: "Low",
                  note: "No duplicate GSTIN",
                  dark: true,
                },
              ]}
            />
          ) : (
            <BooksHome setActiveSection={setActiveSection} />
          )}
        </main>
      </div>
    </div>
  );
});

function ServiceDashboardWindow({
  product,
  enterProgress,
  exitProgress,
  activeSection,
  setActiveSection,
  setActiveProduct,
  zIndex = 45,
}) {
  const enter = smooth(clamp(enterProgress));
  const exit = smooth(clamp(exitProgress));
  const visible = enter * (1 - smooth(clamp((exit - 0.72) / 0.28)));

  const radius = 26 + exit * 52;
  const rotateX = exit * 44;
  const baseScale = 0.92 + enter * 0.08;
  const scaleX = baseScale * (1 - exit * 0.895);
  const scaleY = baseScale * (1 - exit * 0.95);
  const translateY = (1 - enter) * 480 - exit * 260;
  const contentOpacity = 1 - smooth(clamp((exit - 0.12) / 0.44));
  const paperOpacity = smooth(clamp((exit - 0.08) / 0.34)) * (1 - exit);

  return (
    <div
      className="absolute left-1/2 overflow-hidden bg-white will-change-transform"
      style={{
        width: "94%",
        height: "76%",
        maxWidth: "1180px",
        top: "50%",
        zIndex,
        opacity: visible,
        transform: `
          translate3d(-50%, calc(-50% + ${translateY}px), 0)
          perspective(1200px)
          rotateX(${rotateX}deg)
          scaleX(${scaleX})
          scaleY(${scaleY})
        `,
        transformOrigin: "top center",
        borderRadius: `${radius}px`,
        backfaceVisibility: "hidden",
        contain: "layout paint",
      }}
    >
      <div className="h-full overflow-hidden" style={{ opacity: contentOpacity }}>
        <AppFrame
          product={product}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          setActiveProduct={setActiveProduct}
        />
      </div>

      <PaperLines opacity={paperOpacity} />
    </div>
  );
}

const floatingServiceLayouts = {
  books: { x: -545, y: 18, targetX: -100, rotate: -12 },
  school: { x: 525, y: 42, targetX: 100, rotate: 11 },
  gym: { x: -610, y: 176, targetX: -72, rotate: 8 },
  hospital: { x: 595, y: 218, targetX: 72, rotate: -8 },
  lawyer: { x: -575, y: 342, targetX: -90, rotate: 6 },
  payments: { x: 555, y: 385, targetX: 45, rotate: -7 },
  attendance: { x: -470, y: 505, targetX: -45, rotate: 8 },
  voice: { x: 485, y: 535, targetX: 90, rotate: -10 },
  lift: { x: -265, y: 590, targetX: -65, rotate: -6 },
  restaurant: { x: 300, y: 620, targetX: 0, rotate: 4 },
};

const floatingServiceApps = [
  ...PRODUCT_BALLS.map((product) => ({
    ...product,
    label: product.name,
    soft: product.color,
    ...floatingServiceLayouts[product.id],
  })),
  {
    id: "industry",
    label: "SmartIndustry",
    Icon: MdFactory,
    x: 0,
    y: 655,
    targetX: 65,
    rotate: -9,
    color: "#f97316",
    soft: "#fff2e8",
  },
];

function FloatingServiceApps({ progress }) {
  const drop = smooth(clamp(progress));
  const opacity = 1 - smooth(clamp((drop - 0.7) / 0.3));

  return (
    <div className="pointer-events-none absolute inset-0 z-0 hidden md:block" aria-hidden="true">
      {floatingServiceApps.map((app, index) => {
        const Icon = app.Icon;
        const staggeredDrop = smooth(clamp((drop - index * 0.018) / 0.86));
        const x = app.x + (app.targetX - app.x) * staggeredDrop;
        const y = app.y + 245 * staggeredDrop;
        const scale = 1 - staggeredDrop * 0.66;
        const rotation = app.rotate * (1 - staggeredDrop) + index * 3 * staggeredDrop;

        return (
          <div
            key={app.id}
            className="absolute left-1/2 top-0 will-change-transform"
            style={{
              opacity,
              transform: `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${rotation}deg)`,
            }}
          >
            <div
              className="relative grid h-[78px] w-[78px] place-items-center overflow-hidden rounded-full border border-white/90 shadow-[20px_18px_32px_rgba(18,28,52,0.28),0_4px_12px_rgba(18,28,52,0.18),inset_0_1.5px_2px_rgba(255,255,255,0.22)]"
              style={{
                color: app.color,
                background: app.ball || app.soft,
              }}
            >
              {app.image ? (
                <>
                  <span
                    className="absolute z-[1] overflow-hidden rounded-full"
                    style={{ inset: `${app.inset || 0}px`, background: app.ball }}
                  >
                    <Image
                      src={app.image}
                      alt=""
                      fill
                      sizes="78px"
                      className="object-fill"
                      style={{
                        filter: app.logoFilter,
                        mixBlendMode: app.blend ? "multiply" : undefined,
                      }}
                    />
                  </span>
                  <span className="pointer-events-none absolute left-3 top-2 z-[2] h-5 w-10 -rotate-[18deg] rounded-full bg-gradient-to-b from-white/70 to-transparent blur-[2px]" />
                  <span className="pointer-events-none absolute inset-0 z-[2] rounded-full shadow-[inset_-10px_-12px_18px_rgba(10,18,35,0.22),inset_5px_5px_10px_rgba(255,255,255,0.22)]" />
                </>
              ) : (
                <span
                  className="grid h-12 w-12 place-items-center rounded-full"
                  style={{ backgroundColor: app.soft }}
                >
                  <Icon className="text-[27px]" />
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function MacDashboardShowcase() {
  const sectionRef = useRef(null);
  const targetProgressRef = useRef(0);
  const displayedProgressRef = useRef(0);
  const [rawProgress, setRawProgress] = useState(0);

  const [activeProduct, setActiveProduct] = useState("books");
  const [activeBooksSection, setActiveBooksSection] = useState("dashboard");
  const [activeSchoolSection, setActiveSchoolSection] = useState("overview");
  const [activeHospitalSection, setActiveHospitalSection] = useState("overview");
  const [activeIndustrySection, setActiveIndustrySection] = useState("overview");

  useEffect(() => {
    let frame;
    let lastFrameTime = performance.now();

    const readProgress = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const current = scrollable > 0 ? clamp(-rect.top / scrollable) : 0;

      targetProgressRef.current = current;
    };

    const animateProgress = (time) => {
      const current = displayedProgressRef.current;
      const target = targetProgressRef.current;
      const difference = target - current;
      const delta = Math.min((time - lastFrameTime) / 1000, 0.05);
      const easing = 1 - Math.exp(-delta * 10.5);
      lastFrameTime = time;

      if (Math.abs(difference) > 0.00005) {
        const next = current + difference * easing;
        displayedProgressRef.current = next;
        setRawProgress(next);
      } else if (current !== target) {
        displayedProgressRef.current = target;
        setRawProgress(target);
      }

      frame = requestAnimationFrame(animateProgress);
    };

    readProgress();
    displayedProgressRef.current = targetProgressRef.current;
    setRawProgress(targetProgressRef.current);
    frame = requestAnimationFrame(animateProgress);

    window.addEventListener("scroll", readProgress, { passive: true });
    window.addEventListener("resize", readProgress);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", readProgress);
      window.removeEventListener("resize", readProgress);
    };
  }, []);

  const centerProgress = smooth(clamp(rawProgress / 0.18));
  const booksExit = clamp((rawProgress - 0.15) / 0.16);
  const schoolEnter = clamp((rawProgress - 0.265) / 0.105);
  const schoolExit = clamp((rawProgress - 0.42) / 0.15);
  const hospitalEnter = clamp((rawProgress - 0.515) / 0.115);
  const hospitalExit = clamp((rawProgress - 0.67) / 0.15);
  const industryEnter = clamp((rawProgress - 0.765) / 0.115);
  const industryExit = clamp((rawProgress - 0.9) / 0.1);

  const activeSections = {
    books: activeBooksSection,
    school: activeSchoolSection,
    hospital: activeHospitalSection,
    industry: activeIndustrySection,
  };

  const setProductSection = useCallback((product, section) => {
    if (product === "school") {
      setActiveSchoolSection(section);
    } else if (product === "hospital") {
      setActiveHospitalSection(section);
    } else if (product === "industry") {
      setActiveIndustrySection(section);
    } else {
      setActiveBooksSection(section);
    }
    setActiveProduct(product);
  }, []);

  const setBooksSection = useCallback((value) => {
    setActiveBooksSection(value);
    setActiveProduct("books");
  }, []);

  const setSchoolSection = useCallback(
    (value) => setProductSection("school", value),
    [setProductSection],
  );

  const setHospitalSection = useCallback(
    (value) => setProductSection("hospital", value),
    [setProductSection],
  );

  const setIndustrySection = useCallback(
    (value) => setProductSection("industry", value),
    [setProductSection],
  );

  const currentProduct =
    industryEnter > 0.35
      ? "industry"
      : hospitalEnter > 0.35
        ? "hospital"
        : schoolEnter > 0.35
          ? "school"
          : activeProduct;

  const headlineOpacity = 1 - smooth(clamp((centerProgress - 0.52) / 0.48));
  const headlineMove = centerProgress * 118;

  const macMoveY = 12 - centerProgress * 82;
  const macScale = 0.86 + centerProgress * 0.1;

  const islandPulse = Math.max(
    ...[booksExit, schoolExit, hospitalExit, industryExit].map((progress) =>
      Math.sin(smooth(progress) * Math.PI),
    ),
  );
  const receivedCount =
    Number(booksExit > 0.82) +
    Number(schoolExit > 0.82) +
    Number(hospitalExit > 0.82) +
    Number(industryExit > 0.82);
  const islandWidth = 86 + receivedCount * 24 + islandPulse * 22;
  const islandHeight = 20 + islandPulse * 8;

  const islandServices = [
    { id: "SB", progress: booksExit, color: PRODUCT_THEME.books.accent },
    { id: "SS", progress: schoolExit, color: PRODUCT_THEME.school.accent },
    { id: "SH", progress: hospitalExit, color: PRODUCT_THEME.hospital.accent },
    { id: "SI", progress: industryExit, color: PRODUCT_THEME.industry.accent },
  ];

  return (
    <section
      ref={sectionRef}
      id="ecosystem"
      className="relative min-h-[460vh] overflow-visible bg-white"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-white px-4 pt-10 pb-4 md:pt-12 md:pb-5">
        <div className="relative mt-20 z-10 mx-auto w-full max-w-7xl text-center">
          <FloatingServiceApps progress={centerProgress} />

          <div
            className="relative z-10 will-change-transform"
            style={{
              opacity: headlineOpacity,
              transform: `translateY(${headlineMove}px)`,
              pointerEvents: headlineOpacity < 0.2 ? "none" : "auto",
            }}
          >
            <p className="mb-5 inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.26em] text-slate-500">
              <span className="h-px w-8 bg-slate-400/60" />
              SmartLocal AI Ecosystem
              <span className="h-px w-8 bg-slate-400/60" />
            </p>

            <h2 className="mx-auto mt-4 max-w-4xl text-4xl font-black leading-[1.06] tracking-[-0.055em] text-[#0d1c18] md:text-6xl lg:text-[5.2rem]">
              One ecosystem.<br />
              <span className="font-[430] text-slate-500">Every business.</span>
            </h2>


          </div>

          <div
            className="relative z-20 mx-auto mt-6 w-full max-w-6xl will-change-transform"
            style={{
              transform: `translateY(${macMoveY}px) scale(${macScale})`,
            }}
          >
            <div className="relative aspect-[16/9.6] rounded-t-[24px] rounded-b-[12px] border border-white/20 bg-gradient-to-b from-[#17191d] via-[#050607] to-[#111318] p-[8px] shadow-[0_48px_110px_rgba(15,23,42,0.34),inset_0_1px_1px_rgba(255,255,255,0.18)] md:rounded-t-[32px] md:rounded-b-[15px] md:p-[12px]">
              <span className="absolute left-1/2 top-[3px] z-[90] h-1 w-1 -translate-x-1/2 rounded-full bg-[#1f2937] ring-1 ring-white/10 md:top-[4px] md:h-1.5 md:w-1.5" />

              <div className="relative h-full w-full overflow-hidden rounded-t-[17px] rounded-b-[7px] bg-black ring-1 ring-black md:rounded-t-[22px] md:rounded-b-[9px]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,#d7fbff_0%,#8edcff_30%,#ffd6bb_65%,#ff8057_100%)]" />
                <div className="absolute inset-0 bg-white/10" />

                <ServiceDashboardWindow
                  product="books"
                  enterProgress={1}
                  exitProgress={booksExit}
                  activeSection={activeBooksSection}
                  setActiveSection={setBooksSection}
                  setActiveProduct={setActiveProduct}
                />

                <ServiceDashboardWindow
                  product="school"
                  enterProgress={schoolEnter}
                  exitProgress={schoolExit}
                  activeSection={activeSchoolSection}
                  setActiveSection={setSchoolSection}
                  setActiveProduct={setActiveProduct}
                />

                <ServiceDashboardWindow
                  product="hospital"
                  enterProgress={hospitalEnter}
                  exitProgress={hospitalExit}
                  activeSection={activeHospitalSection}
                  setActiveSection={setHospitalSection}
                  setActiveProduct={setActiveProduct}
                  zIndex={48}
                />

                <ServiceDashboardWindow
                  product="industry"
                  enterProgress={industryEnter}
                  exitProgress={industryExit}
                  activeSection={activeIndustrySection}
                  setActiveSection={setIndustrySection}
                  setActiveProduct={setActiveProduct}
                  zIndex={51}
                />

                <MacDock
                  currentProduct={currentProduct}
                  activeSections={activeSections}
                  setProductSection={setProductSection}
                />

                <div
                  className="absolute left-1/2 top-[2px] z-[58] h-7 -translate-x-1/2 rounded-full bg-white/25 blur-lg"
                  style={{
                    width: `${islandWidth + 20}px`,
                    opacity: islandPulse,
                  }}
                />

                <div
                  className="absolute left-1/2 top-0 z-[65] -translate-x-1/2 bg-black"
                  style={{
                    width: `${islandWidth + 10}px`,
                    height: `${islandHeight + 7}px`,
                    borderBottomLeftRadius: `${14 + islandPulse * 8}px`,
                    borderBottomRightRadius: `${14 + islandPulse * 8}px`,
                    opacity: islandPulse,
                  }}
                />

                <div
                  className="absolute left-1/2 top-0 z-[80] flex -translate-x-1/2 items-center justify-center overflow-hidden bg-black shadow-[0_10px_28px_rgba(0,0,0,0.42)]"
                  style={{
                    width: `${islandWidth}px`,
                    height: `${islandHeight}px`,
                    borderBottomLeftRadius: `${13 + islandPulse * 7}px`,
                    borderBottomRightRadius: `${13 + islandPulse * 7}px`,
                  }}
                >
                  <div className="flex items-center justify-center gap-1 px-2">
                    {islandServices.map((service) => {
                      const tokenProgress = smooth(
                        clamp((service.progress - 0.68) / 0.25),
                      );

                      return (
                        <span
                          key={service.id}
                          className="grid h-3.5 w-3.5 place-items-center rounded-full text-[5px] font-black text-white shadow-sm"
                          style={{
                            backgroundColor: service.color,
                            opacity: tokenProgress,
                            transform: `scale(${0.35 + tokenProgress * 0.65})`,
                            width: `${14 * tokenProgress}px`,
                          }}
                        >
                          {service.id}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>

            <div className="relative mx-auto -mt-[1px] h-4 w-[102%] bg-gradient-to-b from-[#eef0f2] via-[#bec3c8] to-[#8d949b] shadow-[0_10px_24px_rgba(15,23,42,0.24),inset_0_1px_0_white] [clip-path:polygon(1%_0,99%_0,97%_72%,93%_100%,7%_100%,3%_72%)] md:h-5">
              <span className="absolute left-1/2 top-0 h-1.5 w-[15%] -translate-x-1/2 rounded-b-xl bg-gradient-to-b from-[#8f969d] to-[#d9dde0] shadow-inner" />
            </div>
            <div className="mx-auto -mt-1 h-8 w-[82%] rounded-full bg-black/20 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
