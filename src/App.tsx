import React, { useEffect, useMemo, useState } from 'react';
import {
  Calendar,
  FileText,
  HardDrive,
  LayoutDashboard,
  Menu,
  Moon,
  Server,
  Sparkles,
  Sun,
  Users,
  Wifi,
  X
} from 'lucide-react';
import {
  ActivityLog,
  CollabSpace,
  EffectiveRoomTelemetry,
  IMPLEMENTATION_PHASES,
  INITIAL_PACKAGES,
  INITIAL_ROOMS,
  INITIAL_SPACES,
  ImplementationPhase,
  MirrorPackage,
  RoomTelemetry,
  SqlLogEntry,
  TIME_SLOTS,
  TelemetryLogEntry
} from './data/projectData';
import { CommandCenter } from './components/CommandCenter';
import { ActiveDownloadState, LocalMirrorView } from './components/LocalMirrorView';
import { TelemetryFormState, WifiMapView } from './components/WifiMapView';
import { SpaceBookingView } from './components/SpaceBookingView';
import {
  AdvocacyReportModal,
  BookingFormState,
  BookingModal,
  NewPkgFormState,
  UploadPackageModal
} from './components/Modals';

type ActiveTab = 'dashboard' | 'mirror' | 'wifi' | 'booking';

const NAV_ITEMS: {
  id: ActiveTab;
  label: string;
  breadcrumb: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: 'dashboard',
    label: 'Command Center',
    breadcrumb: 'Command Center',
    icon: LayoutDashboard
  },
  {
    id: 'mirror',
    label: 'Local Mirror',
    breadcrumb: 'Local Mirror Server',
    icon: HardDrive
  },
  {
    id: 'wifi',
    label: 'Wi-Fi Map',
    breadcrumb: 'Wi-Fi Dead-Zone Map',
    icon: Wifi
  },
  {
    id: 'booking',
    label: 'Space Booking',
    breadcrumb: 'Space & SQL Booking',
    icon: Calendar
  }
];

export default function App() {
  // Navigation & Theme State
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync Tailwind dark class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Global KPI & Activity Feed State
  const [totalBandwidthSavedGB, setTotalBandwidthSavedGB] = useState(1482.4);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([
    {
      id: 1,
      time: 'Just now',
      module: 'Mirror',
      text: 'BSIT-3A synced Android Studio SDK (4.80 GB) at 98 MB/s via Local Mirror.',
      type: 'success'
    },
    {
      id: 2,
      time: '6m ago',
      module: 'Booking',
      text: 'CJay Sebastian reserved Collab Table Beta (10:00 - 12:00).',
      type: 'info'
    },
    {
      id: 3,
      time: '14m ago',
      module: 'Wi-Fi',
      text: 'Nelo Cabab logged -86 dBm dead zone in Collab Zone A (East Wing).',
      type: 'warning'
    },
    {
      id: 4,
      time: '28m ago',
      module: 'Mirror',
      text: 'Cyrus Troy Bazar updated Kaggle Agri-Tech Dataset Pack v2026.11.',
      type: 'success'
    }
  ]);

  // Phase Roadmap Interactive State
  const [phases, setPhases] = useState<ImplementationPhase[]>(IMPLEMENTATION_PHASES);
  const [selectedPhaseId, setSelectedPhaseId] = useState(3);

  // Module 1: Local Mirror State
  const [packages, setPackages] = useState<MirrorPackage[]>(INITIAL_PACKAGES);
  const [pkgSearch, setPkgSearch] = useState('');
  const [pkgCategory, setPkgCategory] = useState('All');
  const [activeDownload, setActiveDownload] = useState<ActiveDownloadState | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newPkgForm, setNewPkgForm] = useState<NewPkgFormState>({
    name: '',
    category: 'Datasets',
    version: '1.0.0',
    sizeGB: '1.5',
    description: ''
  });

  // Module 2: Wi-Fi Heatmap & Simulator State
  const [rooms, setRooms] = useState<RoomTelemetry[]>(INITIAL_ROOMS);
  const [selectedRoomId, setSelectedRoomId] = useState('room-annex');
  const [heatmapMetric, setHeatmapMetric] = useState<'signal' | 'speed' | 'loss'>('signal');
  const [simAp1Active, setSimAp1Active] = useState(false);
  const [simAp2Active, setSimAp2Active] = useState(false);
  const [telemetryForm, setTelemetryForm] = useState<TelemetryFormState>({
    roomId: 'room-annex',
    reporter: 'Nelo Cabab',
    measuredSpeed: '3.2',
    measuredSignal: '-84',
    dropouts: '4'
  });
  const [telemetryHistory, setTelemetryHistory] = useState<TelemetryLogEntry[]>([
    { id: 101, room: 'CLB-A', reporter: 'Nelo Cabab', signal: -86, speed: 2.1, loss: 34.0, time: '10:15 AM' },
    { id: 102, room: 'LEC-204', reporter: 'Catlyn Talbo', signal: -82, speed: 4.3, loss: 24.5, time: '09:50 AM' },
    { id: 103, room: 'LAB-102', reporter: 'Hays Marayag', signal: -76, speed: 8.4, loss: 14.5, time: '09:20 AM' },
    { id: 104, room: 'LAB-101', reporter: 'Cyrus Troy Bazar', signal: -54, speed: 42.5, loss: 1.2, time: '08:45 AM' }
  ]);
  const [showAdvocacyModal, setShowAdvocacyModal] = useState(false);

  // Module 3: Space Allocation & SQL Booking State
  const [spaces, setSpaces] = useState<CollabSpace[]>(INITIAL_SPACES);
  const [selectedSlotFilter, setSelectedSlotFilter] = useState<string>('10:00 - 12:00');
  const [spaceTypeFilter, setSpaceTypeFilter] = useState('All');
  const [bookingModalSpace, setBookingModalSpace] = useState<{
    space: CollabSpace;
    slot: string;
  } | null>(null);
  const [bookingForm, setBookingForm] = useState<BookingFormState>({
    studentName: 'Hays Marayag & Capstone Team',
    studentId: '23-10492',
    purpose: 'Full-Stack Sprint & Dataset Sync',
    size: 4
  });
  const [showSqlInspector, setShowSqlInspector] = useState(true);
  const [sqlQueries, setSqlQueries] = useState<SqlLogEntry[]>([
    {
      id: 'sql-1',
      timestamp: '10:32:14',
      type: 'SELECT',
      query: `SELECT s.space_id, s.space_name, s.capacity, r.booked_by, r.time_slot \nFROM department_spaces s \nLEFT JOIN reservations r ON s.space_id = r.space_id AND r.date = CURRENT_DATE \nWHERE r.status = 'ACTIVE';`,
      rowsAffected: '6 rows returned (1.8ms)'
    },
    {
      id: 'sql-2',
      timestamp: '10:18:05',
      type: 'INSERT',
      query: `INSERT INTO reservations (space_id, student_id, booked_by, time_slot, purpose, group_size, created_at) \nVALUES ('SPC-02', '23-10219', 'CJay Sebastian & DB Squad', '10:00 - 12:00', 'SQL Booking Schema Optimization', 4, NOW());`,
      rowsAffected: '1 row inserted (2.4ms)'
    }
  ]);

  const addActivity = (
    module: ActivityLog['module'],
    text: string,
    type: ActivityLog['type'] = 'info'
  ) => {
    setActivityLogs((prev) => [
      { id: Date.now(), time: 'Just now', module, text, type },
      ...prev.slice(0, 9)
    ]);
  };

  // ==========================================
  // COMPUTED METRICS & SIMULATIONS
  // ==========================================

  const effectiveRooms: EffectiveRoomTelemetry[] = useMemo(() => {
    return rooms.map((room) => {
      let signal = room.baseSignal;
      let speed = room.baseSpeed;
      let loss = room.baseLoss;
      let isBoosted = false;

      if (room.boostedBySim === 'sim-ap-1' && simAp1Active) {
        signal = Math.min(-46, signal + 22);
        speed = Math.min(92, +(speed + 48.5).toFixed(1));
        loss = Math.max(0.4, +(loss * 0.12).toFixed(1));
        isBoosted = true;
      }
      if (room.boostedBySim === 'sim-ap-2' && simAp2Active) {
        signal = Math.min(-49, signal + 34);
        speed = Math.min(88, +(speed + 64.0).toFixed(1));
        loss = Math.max(0.5, +(loss * 0.08).toFixed(1));
        isBoosted = true;
      }

      let status: EffectiveRoomTelemetry['status'] = 'Optimal';
      if (signal <= -78 || speed < 6 || loss >= 18) status = 'Dead Zone';
      else if (signal <= -67 || speed < 18 || loss >= 6) status = 'Degraded';

      return { ...room, signal, speed, loss, status, isBoosted };
    });
  }, [rooms, simAp1Active, simAp2Active]);

  const wifiSummary = useMemo(() => {
    const deadZones = effectiveRooms.filter((r) => r.status === 'Dead Zone').length;
    const avgSignal = Math.round(
      effectiveRooms.reduce((acc, r) => acc + r.signal, 0) / effectiveRooms.length
    );
    const coverageScore = Math.min(
      100,
      Math.round(
        ((effectiveRooms.length - deadZones * 1.1) / effectiveRooms.length) * 100
      )
    );
    return { deadZones, avgSignal, coverageScore };
  }, [effectiveRooms]);

  const bookingSummary = useMemo(() => {
    const totalSlots = spaces.length * TIME_SLOTS.length;
    let bookedCount = 0;
    let currentSlotAvailable = 0;

    spaces.forEach((sp) => {
      TIME_SLOTS.forEach((slot) => {
        if (sp.slots[slot]) bookedCount++;
      });
      if (!sp.slots[selectedSlotFilter]) currentSlotAvailable++;
    });

    const utilization = Math.round((bookedCount / totalSlots) * 100);
    return { totalSlots, bookedCount, currentSlotAvailable, utilization };
  }, [spaces, selectedSlotFilter]);

  const activePhaseSummary = useMemo(() => {
    const completedPhases = phases.filter((p) => p.progress === 100).length;
    const overallProgress = Math.round(
      phases.reduce((sum, p) => sum + p.progress, 0) / phases.length
    );
    return { completedPhases, overallProgress };
  }, [phases]);

  // ==========================================
  // INTERACTIVE HANDLERS
  // ==========================================

  const toggleDeliverable = (phaseId: number, idx: number) => {
    setPhases((prev) =>
      prev.map((p) => {
        if (p.id !== phaseId) return p;
        const updatedDeliverables = p.deliverables.map((d, i) =>
          i === idx ? { ...d, done: !d.done } : d
        );
        const doneCount = updatedDeliverables.filter((d) => d.done).length;
        const progress = Math.round((doneCount / updatedDeliverables.length) * 100);
        const status =
          progress === 100 ? 'Completed' : progress > 0 ? 'Active' : 'Scheduled';
        return { ...p, deliverables: updatedDeliverables, progress, status };
      })
    );
  };

  const startSimulatedDownload = (pkg: MirrorPackage, mode: 'LAN' | 'ISP') => {
    if (activeDownload) return;
    setActiveDownload({
      pkg,
      mode,
      progress: 0,
      speed: mode === 'LAN' ? 96.4 : 1.4
    });
  };

  useEffect(() => {
    if (!activeDownload) return;
    const interval = setInterval(() => {
      setActiveDownload((prev) => {
        if (!prev) return null;
        const step = prev.mode === 'LAN' ? 18 : 2.5;
        const nextProgress = prev.progress + step;
        const jitter = (Math.random() - 0.5) * (prev.mode === 'LAN' ? 8 : 0.6);
        const nextSpeed =
          prev.mode === 'LAN'
            ? Math.max(84, Math.min(112, +(98 + jitter).toFixed(1)))
            : Math.max(0.4, Math.min(2.4, +(1.3 + jitter).toFixed(1)));

        if (nextProgress >= 100) {
          clearInterval(interval);
          if (prev.mode === 'LAN') {
            setTotalBandwidthSavedGB((b) => +(b + prev.pkg.sizeGB).toFixed(2));
            setPackages((pkgs) =>
              pkgs.map((p) =>
                p.id === prev.pkg.id ? { ...p, downloads: p.downloads + 1 } : p
              )
            );
            addActivity(
              'Mirror',
              `Downloaded "${prev.pkg.name}" (${prev.pkg.sizeLabel}) via Local Mirror at ~98 MB/s.`,
              'success'
            );
          } else {
            addActivity(
              'Mirror',
              `Tested External ISP download for "${prev.pkg.name}" (throttled at 1.3 MB/s).`,
              'warning'
            );
          }
          setTimeout(() => setActiveDownload(null), 900);
          return { ...prev, progress: 100, speed: nextSpeed };
        }
        return { ...prev, progress: nextProgress, speed: nextSpeed };
      });
    }, 220);

    return () => clearInterval(interval);
  }, [activeDownload]);

  const handleAddPackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPkgForm.name.trim()) return;
    const sizeNum = parseFloat(newPkgForm.sizeGB) || 1.2;
    const newPkg: MirrorPackage = {
      id: `pkg-${Date.now()}`,
      name: newPkgForm.name.trim(),
      category: newPkgForm.category,
      version: newPkgForm.version || '2026.1',
      sizeGB: sizeNum,
      sizeLabel: `${sizeNum.toFixed(2)} GB`,
      downloads: 1,
      sha256: `${Math.random().toString(16).substring(2, 10)}...e4f1`,
      description:
        newPkgForm.description.trim() ||
        'Locally cached resource uploaded by IT Department student maintainers.',
      ispTime: `${Math.round(sizeNum * 11)} mins`,
      lanTime: `${Math.max(4, Math.round(sizeNum * 10))} secs (100 MB/s)`
    };
    setPackages((prev) => [newPkg, ...prev]);
    setShowUploadModal(false);
    setNewPkgForm({
      name: '',
      category: 'Datasets',
      version: '1.0.0',
      sizeGB: '1.5',
      description: ''
    });
    addActivity(
      'Mirror',
      `Indexed new local package "${newPkg.name}" (${newPkg.sizeLabel}) on 192.168.10.200.`,
      'success'
    );
  };

  const handleTelemetrySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetRoom = rooms.find((r) => r.id === telemetryForm.roomId);
    if (!targetRoom) return;

    const parsedSignal = Math.min(
      -35,
      Math.max(-95, parseInt(telemetryForm.measuredSignal, 10) || -75)
    );
    const parsedSpeed = Math.max(0.5, parseFloat(telemetryForm.measuredSpeed) || 5.0);
    const parsedLoss = Math.min(
      60,
      Math.max(0, (parseInt(telemetryForm.dropouts, 10) || 1) * 5.5)
    );

    setRooms((prev) =>
      prev.map((r) =>
        r.id === telemetryForm.roomId
          ? {
              ...r,
              baseSignal: parsedSignal,
              baseSpeed: parsedSpeed,
              baseLoss: +parsedLoss.toFixed(1)
            }
          : r
      )
    );

    const newEntry: TelemetryLogEntry = {
      id: Date.now(),
      room: targetRoom.code,
      reporter: telemetryForm.reporter.trim() || 'Student Auditor',
      signal: parsedSignal,
      speed: parsedSpeed,
      loss: +parsedLoss.toFixed(1),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setTelemetryHistory((prev) => [newEntry, ...prev.slice(0, 7)]);
    setSelectedRoomId(telemetryForm.roomId);
    addActivity(
      'Wi-Fi',
      `${newEntry.reporter} logged ${parsedSignal} dBm / ${parsedSpeed} Mbps in ${targetRoom.code}.`,
      parsedSignal <= -78 ? 'warning' : 'info'
    );
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingModalSpace) return;
    const { space, slot } = bookingModalSpace;

    setSpaces((prev) =>
      prev.map((sp) => {
        if (sp.id !== space.id) return sp;
        return {
          ...sp,
          slots: {
            ...sp.slots,
            [slot]: {
              bookedBy: bookingForm.studentName,
              studentId: bookingForm.studentId,
              purpose: bookingForm.purpose,
              size: Number(bookingForm.size)
            }
          }
        };
      })
    );

    const nowStr = new Date().toTimeString().split(' ')[0];
    const insertSql = `INSERT INTO reservations (space_id, student_id, booked_by, time_slot, purpose, group_size, created_at) \nVALUES ('${space.id}', '${bookingForm.studentId}', '${bookingForm.studentName.replace(/'/g, "''")}', '${slot}', '${bookingForm.purpose.replace(/'/g, "''")}', ${bookingForm.size}, NOW());`;

    setSqlQueries((prev) => [
      {
        id: `sql-${Date.now()}`,
        timestamp: nowStr,
        type: 'INSERT',
        query: insertSql,
        rowsAffected: '1 row inserted (1.9ms)'
      },
      ...prev
    ]);

    addActivity(
      'Booking',
      `${bookingForm.studentName} booked ${space.name} for ${slot}.`,
      'info'
    );
    setBookingModalSpace(null);
  };

  const handleReleaseSlot = (space: CollabSpace, slot: string) => {
    const existing = space.slots[slot];
    if (!existing) return;

    setSpaces((prev) =>
      prev.map((sp) => {
        if (sp.id !== space.id) return sp;
        return {
          ...sp,
          slots: {
            ...sp.slots,
            [slot]: null
          }
        };
      })
    );

    const nowStr = new Date().toTimeString().split(' ')[0];
    const deleteSql = `DELETE FROM reservations \nWHERE space_id = '${space.id}' AND time_slot = '${slot}' AND date = CURRENT_DATE;`;

    setSqlQueries((prev) => [
      {
        id: `sql-${Date.now()}`,
        timestamp: nowStr,
        type: 'DELETE',
        query: deleteSql,
        rowsAffected: '1 row deleted — slot released (1.4ms)'
      },
      ...prev
    ]);

    addActivity(
      'Booking',
      `Released reservation on ${space.id} (${slot}) back to open pool.`,
      'warning'
    );
  };

  const activeNavItem = NAV_ITEMS.find((n) => n.id === activeTab) || NAV_ITEMS[0];

  const handleSelectNav = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex bg-[#F4F8FD] dark:bg-[#060E1E] text-slate-900 dark:text-sky-50 transition-colors duration-200">
      {/* DESKTOP SIDEBAR (256px) */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 border-r border-blue-200/80 dark:border-sky-900/60 bg-white dark:bg-[#081226]">
        {/* Brand Zone */}
        <div className="h-16 px-5 flex items-center gap-3 border-b border-blue-100 dark:border-sky-900/50">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center text-white shrink-0">
            <Server className="w-4 h-4" />
          </div>
          <span className="font-display font-bold text-base tracking-tight text-slate-900 dark:text-sky-50 whitespace-nowrap">
            Project Connect
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            let rightHint = '';
            if (item.id === 'mirror') rightHint = '1 Gbps';
            if (item.id === 'wifi') {
              rightHint =
                wifiSummary.deadZones > 0
                  ? `${wifiSummary.deadZones} alerts`
                  : 'Clear';
            }
            if (item.id === 'booking') {
              rightHint = `${bookingSummary.currentSlotAvailable} open`;
            }

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectNav(item.id)}
                className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 dark:text-sky-200/75 hover:bg-blue-50 dark:hover:bg-sky-950/60 hover:text-slate-900 dark:hover:text-sky-50'
                }`}
              >
                <span className="flex items-center gap-2.5 min-w-0">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </span>
                {rightHint && (
                  <span
                    className={`text-[11px] font-mono tabular-nums shrink-0 ${
                      isActive
                        ? 'text-sky-100'
                        : item.id === 'wifi' && wifiSummary.deadZones > 0
                        ? 'text-rose-600 dark:text-rose-400'
                        : 'text-slate-400 dark:text-sky-300/60'
                    }`}
                  >
                    {rightHint}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer: Subnet Info + Theme Switch */}
        <div className="p-4 border-t border-blue-100 dark:border-sky-900/50 space-y-3">
          <div className="text-xs space-y-0.5">
            <span className="text-slate-500 dark:text-sky-300/60 block">
              Intranet Host
            </span>
            <span className="font-mono font-semibold text-blue-700 dark:text-sky-400 tabular-nums">
              192.168.10.200
            </span>
          </div>

          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-blue-200 dark:border-sky-900/60 bg-[#F4F8FD] dark:bg-[#0B172E] text-xs font-medium text-slate-700 dark:text-sky-100 hover:border-blue-400 dark:hover:border-sky-700 transition-colors"
          >
            <span className="flex items-center gap-2">
              {darkMode ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-blue-600" />
              )}
              <span>{darkMode ? 'Light Theme' : 'Cobalt Dark'}</span>
            </span>
            <span className="text-[11px] text-slate-400 dark:text-sky-300/50">
              Switch
            </span>
          </button>
        </div>
      </aside>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-64 h-full bg-white dark:bg-[#081226] border-r border-blue-200 dark:border-sky-900/60 flex flex-col justify-between p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-blue-100 dark:border-sky-900/50">
                <span className="font-display font-bold text-base text-slate-900 dark:text-sky-50">
                  Project Connect
                </span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-500 dark:text-sky-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <nav className="mt-4 space-y-1">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectNav(item.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-700 dark:text-sky-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-blue-200 dark:border-sky-900/60 text-xs font-medium"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span>{darkMode ? 'Switch to Light Mode' : 'Switch to Cobalt Dark'}</span>
            </button>
          </div>
        </div>
      )}

      {/* MAIN WORKSPACE SHELL */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* TOP BAR CONTRACT: Breadcrumb on Left, Primary CTA on Right */}
        <header className="sticky top-0 z-30 h-16 px-4 sm:px-6 lg:px-8 border-b border-blue-200/80 dark:border-sky-900/60 bg-white/90 dark:bg-[#081226]/90 backdrop-blur-md flex items-center justify-between gap-8">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg border border-blue-200 dark:border-sky-800 text-slate-700 dark:text-sky-200"
              aria-label="Open navigation"
            >
              <Menu className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-sm truncate">
              <span className="font-semibold text-slate-900 dark:text-sky-50 whitespace-nowrap">
                Project Connect
              </span>
              <span className="text-slate-400 dark:text-sky-500/60">/</span>
              <span className="text-blue-700 dark:text-sky-400 font-medium truncate">
                {activeNavItem.breadcrumb}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setShowAdvocacyModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
            >
              <FileText className="w-3.5 h-3.5" />
              Export Phase 3 Brief
            </button>
          </div>
        </header>

        {/* WORKSPACE VIEWPORT */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* 4-COLUMN GLOBAL KPI RIBBON */}
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <button
              type="button"
              onClick={() => setActiveTab('mirror')}
              className="text-left rounded-xl p-4 border border-blue-200/80 dark:border-sky-900/60 bg-white dark:bg-[#0B172E] hover:border-blue-400 dark:hover:border-sky-600 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-blue-700 dark:text-sky-400">
                  External ISP Offloaded
                </span>
                <HardDrive className="w-4 h-4 text-blue-600 dark:text-sky-400" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                  {(totalBandwidthSavedGB / 1000).toFixed(3)} TB
                </span>
                <span className="text-xs font-mono tabular-nums text-emerald-600 dark:text-emerald-400 font-medium">
                  {totalBandwidthSavedGB.toFixed(1)} GB
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500 dark:text-sky-200/65">
                Served at ~98 MB/s via Ubuntu Local Mirror
              </p>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('wifi')}
              className="text-left rounded-xl p-4 border border-blue-200/80 dark:border-sky-900/60 bg-white dark:bg-[#0B172E] hover:border-blue-400 dark:hover:border-sky-600 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-blue-700 dark:text-sky-400">
                  Wi-Fi Coverage Score
                </span>
                <Wifi className="w-4 h-4 text-blue-600 dark:text-sky-400" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                  {wifiSummary.coverageScore}%
                </span>
                <span
                  className={`text-xs font-medium tabular-nums ${
                    wifiSummary.deadZones === 0
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {wifiSummary.deadZones === 0
                    ? '0 Dead Zones'
                    : `${wifiSummary.deadZones} Dead Zones`}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500 dark:text-sky-200/65 tabular-nums">
                Avg floor signal: {wifiSummary.avgSignal} dBm across 7 zones
              </p>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('booking')}
              className="text-left rounded-xl p-4 border border-blue-200/80 dark:border-sky-900/60 bg-white dark:bg-[#0B172E] hover:border-blue-400 dark:hover:border-sky-600 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-blue-700 dark:text-sky-400">
                  Space Utilization
                </span>
                <Users className="w-4 h-4 text-blue-600 dark:text-sky-400" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                  {bookingSummary.utilization}%
                </span>
                <span className="text-xs font-mono tabular-nums text-blue-600 dark:text-sky-400 font-medium">
                  {bookingSummary.bookedCount}/{bookingSummary.totalSlots} slots
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500 dark:text-sky-200/65">
                {bookingSummary.currentSlotAvailable} open seats for {selectedSlotFilter}
              </p>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className="text-left rounded-xl p-4 border border-blue-200/80 dark:border-sky-900/60 bg-white dark:bg-[#0B172E] hover:border-blue-400 dark:hover:border-sky-600 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-blue-700 dark:text-sky-400">
                  Action Plan Velocity
                </span>
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-sky-400" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                  {activePhaseSummary.overallProgress}%
                </span>
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  ₱0 Capital Cost
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500 dark:text-sky-200/65 tabular-nums">
                {activePhaseSummary.completedPhases}/5 phases completed on open-source stack
              </p>
            </button>
          </section>

          {/* ACTIVE TAB VIEW */}
          {activeTab === 'dashboard' && (
            <CommandCenter
              darkMode={darkMode}
              phases={phases}
              selectedPhaseId={selectedPhaseId}
              onSelectPhase={setSelectedPhaseId}
              onToggleDeliverable={toggleDeliverable}
              activityLogs={activityLogs}
            />
          )}

          {activeTab === 'mirror' && (
            <LocalMirrorView
              packages={packages}
              pkgSearch={pkgSearch}
              onSearchChange={setPkgSearch}
              pkgCategory={pkgCategory}
              onCategoryChange={setPkgCategory}
              activeDownload={activeDownload}
              onStartDownload={startSimulatedDownload}
              onOpenUploadModal={() => setShowUploadModal(true)}
            />
          )}

          {activeTab === 'wifi' && (
            <WifiMapView
              rooms={rooms}
              effectiveRooms={effectiveRooms}
              selectedRoomId={selectedRoomId}
              onSelectRoom={setSelectedRoomId}
              heatmapMetric={heatmapMetric}
              onChangeMetric={setHeatmapMetric}
              simAp1Active={simAp1Active}
              onToggleSimAp1={setSimAp1Active}
              simAp2Active={simAp2Active}
              onToggleSimAp2={setSimAp2Active}
              telemetryForm={telemetryForm}
              onChangeTelemetryForm={setTelemetryForm}
              onSubmitTelemetry={handleTelemetrySubmit}
              telemetryHistory={telemetryHistory}
              onOpenAdvocacyModal={() => setShowAdvocacyModal(true)}
            />
          )}

          {activeTab === 'booking' && (
            <SpaceBookingView
              spaces={spaces}
              selectedSlotFilter={selectedSlotFilter}
              onSelectSlotFilter={setSelectedSlotFilter}
              spaceTypeFilter={spaceTypeFilter}
              onSelectSpaceTypeFilter={setSpaceTypeFilter}
              showSqlInspector={showSqlInspector}
              onToggleSqlInspector={() => setShowSqlInspector(!showSqlInspector)}
              sqlQueries={sqlQueries}
              onOpenBookingModal={(space, slot) =>
                setBookingModalSpace({ space, slot })
              }
              onReleaseSlot={handleReleaseSlot}
            />
          )}
        </main>
      </div>

      {/* MODALS */}
      <UploadPackageModal
        open={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        form={newPkgForm}
        onChangeForm={setNewPkgForm}
        onSubmit={handleAddPackage}
      />

      <BookingModal
        target={bookingModalSpace}
        onClose={() => setBookingModalSpace(null)}
        form={bookingForm}
        onChangeForm={setBookingForm}
        onSubmit={handleConfirmBooking}
      />

      <AdvocacyReportModal
        open={showAdvocacyModal}
        onClose={() => setShowAdvocacyModal(false)}
        totalBandwidthSavedGB={totalBandwidthSavedGB}
      />
    </div>
  );
}
