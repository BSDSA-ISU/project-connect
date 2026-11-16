export interface TeamMember {
  name: string;
  role: string;
  focusArea: string;
  avatar: string;
  gradient: string;
}

export interface PhaseDeliverable {
  text: string;
  done: boolean;
}

export interface ImplementationPhase {
  id: number;
  week: string;
  title: string;
  status: string;
  progress: number;
  summary: string;
  deliverables: PhaseDeliverable[];
  metricImpact: string;
}

export interface MirrorPackage {
  id: string;
  name: string;
  category: 'IDE & Toolchains' | 'Datasets' | 'OS & Containers';
  version: string;
  sizeGB: number;
  sizeLabel: string;
  downloads: number;
  sha256: string;
  description: string;
  ispTime: string;
  lanTime: string;
}

export interface RoomTelemetry {
  id: string;
  name: string;
  code: string;
  floor: string;
  gridArea: string;
  baseSignal: number;
  baseSpeed: number;
  baseLoss: number;
  usersConnected: number;
  apInstalled: boolean;
  apName: string;
  issueNote: string;
  boostedBySim: 'sim-ap-1' | 'sim-ap-2' | null;
}

export interface EffectiveRoomTelemetry extends RoomTelemetry {
  signal: number;
  speed: number;
  loss: number;
  status: 'Optimal' | 'Degraded' | 'Dead Zone';
  isBoosted: boolean;
}

export interface SlotReservation {
  bookedBy: string;
  purpose: string;
  size: number;
  studentId: string;
}

export interface CollabSpace {
  id: string;
  name: string;
  zone: string;
  type: 'Collaboration Table' | 'Capstone Pod' | 'Lab Workstation Cluster' | 'Huddle Station';
  capacity: number;
  features: string[];
  slots: Record<string, SlotReservation | null>;
}

export interface ActivityLog {
  id: number;
  time: string;
  module: 'Mirror' | 'Wi-Fi' | 'Booking';
  text: string;
  type: 'success' | 'info' | 'warning';
}

export interface SqlLogEntry {
  id: string;
  timestamp: string;
  type: 'SELECT' | 'INSERT' | 'DELETE';
  query: string;
  rowsAffected: string;
}

export interface TelemetryLogEntry {
  id: number;
  room: string;
  reporter: string;
  signal: number;
  speed: number;
  loss: number;
  time: string;
}

export const TIME_SLOTS = [
  '08:00 - 10:00',
  '10:00 - 12:00',
  '13:00 - 15:00',
  '15:00 - 17:00'
] as const;

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Hays Marayag',
    role: 'Project Lead & Network Systems Architect',
    focusArea: 'Ubuntu Local Mirror & LAN Routing',
    avatar: 'HM',
    gradient: 'from-sky-500 to-blue-700'
  },
  {
    name: 'Nelo Cabab',
    role: 'Infrastructure & Telemetry Engineer',
    focusArea: 'RF Signal Auditing & AP Optimization',
    avatar: 'NC',
    gradient: 'from-blue-500 to-indigo-700'
  },
  {
    name: 'CJay Sebastian',
    role: 'Database & Full-Stack Developer',
    focusArea: 'MySQL Schema & Space Reservation Engine',
    avatar: 'CS',
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    name: 'Cyrus Troy Bazar',
    role: 'Systems Integration & DevOps Lead',
    focusArea: 'Local Package Caching & IDE Images',
    avatar: 'CB',
    gradient: 'from-sky-600 to-indigo-700'
  },
  {
    name: 'Catlyn Talbo',
    role: 'UX Operations & Admin Advocacy Lead',
    focusArea: 'Room Repurposing & Survey Telemetry',
    avatar: 'CT',
    gradient: 'from-blue-600 to-cyan-600'
  }
];

export const IMPLEMENTATION_PHASES: ImplementationPhase[] = [
  {
    id: 1,
    week: 'Week 1',
    title: 'Phase 1: Assessment & Data Gathering',
    status: 'Completed',
    progress: 100,
    summary: 'Empirical baseline of Wi-Fi dead zones, student bottlenecks, and unused department rooms.',
    deliverables: [
      { text: 'Deploy 5-minute student & faculty survey on connectivity pain points (n=142 responses)', done: true },
      { text: 'Conduct 3-day peak-hour Wi-Fi speed & packet-loss audit across all IT rooms', done: true },
      { text: 'Inventory underutilized storage annexes and vacant lecture rooms for collab zones', done: true }
    ],
    metricImpact: 'Identified 3 critical RF dead zones & 12.4 Mbps average ISP bottleneck during lab peaks.'
  },
  {
    id: 2,
    week: 'Weeks 2–3',
    title: 'Phase 2: Technical Development',
    status: 'Completed',
    progress: 100,
    summary: 'Building the student-led booking engine, Local Mirror prototype, and Wi-Fi floor heatmap.',
    deliverables: [
      { text: 'Build lightweight SQL reservation platform for lab & table booking', done: true },
      { text: 'Configure recycled lab PC with Ubuntu 24.04 LTS Server as Local Mirror (192.168.10.200)', done: true },
      { text: 'Compile empirical Wi-Fi Dead-Zone Map with crowdsourced speed logs', done: true }
    ],
    metricImpact: 'Zero-budget prototype achieved 94 MB/s local transfer speed over existing department LAN.'
  },
  {
    id: 3,
    week: 'Week 4',
    title: 'Phase 3: Administrative Proposal & Approval',
    status: 'Active',
    progress: 67,
    summary: 'Presenting empirical findings and zero-cost software prototypes to the IT Department Head.',
    deliverables: [
      { text: 'Present Wi-Fi Heatmap & router repositioning simulation to IT Department Head', done: true },
      { text: 'Demo live Local Mirror & SQL Booking prototype for faculty endorsement', done: true },
      { text: 'Secure formal sign-off to repurpose Old Storage Annex into Collab Zone A', done: false }
    ],
    metricImpact: 'Admin review scheduled; 2 existing access points approved for central corridor relocation.'
  },
  {
    id: 4,
    week: 'Weeks 5–7',
    title: 'Phase 4: Deployment & Space Setup',
    status: 'In Progress',
    progress: 33,
    summary: 'Physical setup of collaboration zones, QR check-in markers, and intranet launch.',
    deliverables: [
      { text: 'Arrange modular tables, power strips, and mobile whiteboards in Collab Zone A', done: true },
      { text: 'Mount table QR codes linked to the SQL Booking Hub for instant student check-in', done: false },
      { text: 'Publish daily automated sync scripts for Kaggle datasets, VS Code, and Android Studio', done: false }
    ],
    metricImpact: 'Adds 28 dedicated collaborative seats and eliminates hallway floor coding.'
  },
  {
    id: 5,
    week: 'Week 8+',
    title: 'Phase 5: Monitoring & Evaluation',
    status: 'Scheduled',
    progress: 0,
    summary: 'Continuous telemetry tracking, bandwidth savings audit, and semester-end review.',
    deliverables: [
      { text: 'Monitor weekly LAN bandwidth offloaded vs external ISP saturation', done: false },
      { text: 'Audit room reservation turnover and enforce 15-min no-show auto-release', done: false },
      { text: 'Publish Post-Implementation Impact Report for campus-wide scaling', done: false }
    ],
    metricImpact: 'Target: >65% reduction in external ISP congestion during programming lab hours.'
  }
];

export const INITIAL_PACKAGES: MirrorPackage[] = [
  {
    id: 'pkg-1',
    name: 'Android Studio Ladybug + SDK Bundle (Offline)',
    category: 'IDE & Toolchains',
    version: '2024.2.1 Patch 2',
    sizeGB: 4.8,
    sizeLabel: '4.80 GB',
    downloads: 184,
    sha256: '8f4b2e9c...a91d',
    description: 'Complete IDE with pre-cached Android 14/15 system images & Gradle offline cache.',
    ispTime: '54 mins (Often Fails)',
    lanTime: '48 secs (98 MB/s)'
  },
  {
    id: 'pkg-2',
    name: 'Kaggle Capstone Dataset Pack: PH Climate & Agri-Tech CSVs',
    category: 'Datasets',
    version: '2026.11-RevB',
    sizeGB: 3.2,
    sizeLabel: '3.20 GB',
    downloads: 142,
    sha256: '3c91e7a1...440b',
    description: 'Curated clean parquet & CSV datasets for Data Science, ML, and Capstone analytics.',
    ispTime: '36 mins',
    lanTime: '32 secs (100 MB/s)'
  },
  {
    id: 'pkg-3',
    name: 'VS Code Universal + IT Dept Extension Pack (Python/C++/React)',
    category: 'IDE & Toolchains',
    version: '1.95.3 LTS',
    sizeGB: 0.65,
    sizeLabel: '650 MB',
    downloads: 319,
    sha256: '9a02f4b1...77e2',
    description: 'Includes offline .vsix extensions for ESLint, Prettier, Pylance, C/C++, and MySQL.',
    ispTime: '7.5 mins',
    lanTime: '6.5 secs (104 MB/s)'
  },
  {
    id: 'pkg-4',
    name: 'Ubuntu 24.04.1 LTS Desktop & Server ISO Images',
    category: 'OS & Containers',
    version: '24.04.1 Noble',
    sizeGB: 5.4,
    sizeLabel: '5.40 GB',
    downloads: 97,
    sha256: '1d77c83e...90f1',
    description: 'Official bootable ISO + local apt-mirror configuration script for Networking Labs.',
    ispTime: '62 mins',
    lanTime: '54 secs (100 MB/s)'
  },
  {
    id: 'pkg-5',
    name: 'XAMPP + MySQL Workbench + Docker Base Images Bundle',
    category: 'OS & Containers',
    version: '8.2.12 / 8.0',
    sizeGB: 2.1,
    sizeLabel: '2.10 GB',
    downloads: 228,
    sha256: '6e19b30d...52c8',
    description: 'Pre-configured relational database stack for Web Dev and Database Management courses.',
    ispTime: '24 mins',
    lanTime: '21 secs (102 MB/s)'
  },
  {
    id: 'pkg-6',
    name: 'PyCharm Community + Local Anaconda Scientific Wheels',
    category: 'IDE & Toolchains',
    version: '2024.3',
    sizeGB: 3.9,
    sizeLabel: '3.90 GB',
    downloads: 156,
    sha256: '4b82d11a...63a0',
    description: 'Includes NumPy, Pandas, Scikit-Learn, TensorFlow CPU, and Matplotlib local wheel cache.',
    ispTime: '45 mins',
    lanTime: '39 secs (100 MB/s)'
  }
];

export const INITIAL_ROOMS: RoomTelemetry[] = [
  {
    id: 'room-lab101',
    name: 'IT Lab 101 (Main Programming)',
    code: 'LAB-101',
    floor: '1st Floor - West Wing',
    gridArea: 'md:col-span-4 md:row-span-2',
    baseSignal: -54,
    baseSpeed: 42.5,
    baseLoss: 1.2,
    usersConnected: 34,
    apInstalled: true,
    apName: 'AP-WEST-01 (Cisco Meraki)',
    issueNote: 'Stable signal, but external ISP saturates when 30+ students download packages simultaneously.',
    boostedBySim: 'sim-ap-1'
  },
  {
    id: 'room-lab102',
    name: 'IT Lab 102 (Networking & Hardware)',
    code: 'LAB-102',
    floor: '1st Floor - Center',
    gridArea: 'md:col-span-4 md:row-span-2',
    baseSignal: -76,
    baseSpeed: 8.4,
    baseLoss: 14.5,
    usersConnected: 29,
    apInstalled: false,
    apName: 'Relies on distant hallway AP',
    issueNote: 'Concrete load-bearing wall blocks signal from West Wing. Frequent SSH and Git timeouts.',
    boostedBySim: 'sim-ap-1'
  },
  {
    id: 'room-server',
    name: 'Local Mirror Server Core',
    code: 'SRV-200',
    floor: '1st Floor - Core',
    gridArea: 'md:col-span-4 md:row-span-1',
    baseSignal: -42,
    baseSpeed: 940.0,
    baseLoss: 0.0,
    usersConnected: 8,
    apInstalled: true,
    apName: 'Gigabit Core Switch + AP-CORE',
    issueNote: 'Houses 192.168.10.200 Ubuntu Local Mirror Server with 1 Gbps LAN backbone.',
    boostedBySim: null
  },
  {
    id: 'room-hallway',
    name: 'Central Corridor & Benches',
    code: 'HAL-01',
    floor: '1st Floor - Spine',
    gridArea: 'md:col-span-4 md:row-span-1',
    baseSignal: -68,
    baseSpeed: 15.2,
    baseLoss: 6.8,
    usersConnected: 22,
    apInstalled: false,
    apName: 'High interference zone',
    issueNote: 'Overcrowded with students sitting on the floor trying to catch spillover Wi-Fi.',
    boostedBySim: 'sim-ap-1'
  },
  {
    id: 'room-annex',
    name: 'Collab Zone A (Repurposed Annex)',
    code: 'CLB-A',
    floor: '1st Floor - East Wing',
    gridArea: 'md:col-span-5 md:row-span-2',
    baseSignal: -86,
    baseSpeed: 2.1,
    baseLoss: 34.0,
    usersConnected: 18,
    apInstalled: false,
    apName: 'Unserved East Wing Corner',
    issueNote: 'Severe Wi-Fi dead zone (-86 dBm). Prime space for group work once East Wing AP is added.',
    boostedBySim: 'sim-ap-2'
  },
  {
    id: 'room-lec204',
    name: 'Lecture Room 204 & Capstone Pods',
    code: 'LEC-204',
    floor: '1st Floor - South-East',
    gridArea: 'md:col-span-4 md:row-span-2',
    baseSignal: -82,
    baseSpeed: 4.3,
    baseLoss: 24.5,
    usersConnected: 26,
    apInstalled: false,
    apName: 'Unserved South-East Wing',
    issueNote: 'Students cannot demo web apps or query cloud APIs during capstone consultations.',
    boostedBySim: 'sim-ap-2'
  },
  {
    id: 'room-faculty',
    name: 'Faculty Consultation & Huddle Hub',
    code: 'FAC-105',
    floor: '1st Floor - South',
    gridArea: 'md:col-span-3 md:row-span-2',
    baseSignal: -62,
    baseSpeed: 24.0,
    baseLoss: 3.1,
    usersConnected: 11,
    apInstalled: true,
    apName: 'AP-SOUTH-02',
    issueNote: 'Moderate signal; router placement behind metal filing cabinets reduces East reach.',
    boostedBySim: 'sim-ap-2'
  }
];

export const INITIAL_SPACES: CollabSpace[] = [
  {
    id: 'SPC-01',
    name: 'Collab Table Alpha (Whiteboard + 6-Port Power)',
    zone: 'Collab Zone A (Repurposed Annex)',
    type: 'Collaboration Table',
    capacity: 6,
    features: ['Mobile Whiteboard', 'Gigabit LAN Drop', 'Surge Tower'],
    slots: {
      '08:00 - 10:00': { bookedBy: 'Hays Marayag & Group 2', purpose: 'Intranet Mirror Sync Testing', size: 5, studentId: '23-10492' },
      '10:00 - 12:00': null,
      '13:00 - 15:00': { bookedBy: 'Catlyn Talbo & UX Team', purpose: 'Survey Telemetry Review', size: 4, studentId: '23-10881' },
      '15:00 - 17:00': null
    }
  },
  {
    id: 'SPC-02',
    name: 'Collab Table Beta (Dual Monitor Dock)',
    zone: 'Collab Zone A (Repurposed Annex)',
    type: 'Collaboration Table',
    capacity: 6,
    features: ['HDMI Split Monitor', 'Local Mirror Fast-Link', 'Power Strip'],
    slots: {
      '08:00 - 10:00': null,
      '10:00 - 12:00': { bookedBy: 'CJay Sebastian & DB Squad', purpose: 'SQL Booking Schema Optimization', size: 4, studentId: '23-10219' },
      '13:00 - 15:00': null,
      '15:00 - 17:00': null
    }
  },
  {
    id: 'SPC-03',
    name: 'Capstone Sprint Pod 1 (Sound-Dampened Corner)',
    zone: 'Lecture Room 204 Rear',
    type: 'Capstone Pod',
    capacity: 5,
    features: ['Glass Board', 'LAN Switch Port', '6x AC Outlets'],
    slots: {
      '08:00 - 10:00': { bookedBy: 'Cyrus Troy Bazar & DevOps Team', purpose: 'Docker Container Packaging', size: 5, studentId: '23-10554' },
      '10:00 - 12:00': { bookedBy: 'BSIT 3A - Group 7', purpose: 'Capstone Defense Dry-Run', size: 5, studentId: '22-09412' },
      '13:00 - 15:00': null,
      '15:00 - 17:00': null
    }
  },
  {
    id: 'SPC-04',
    name: 'Capstone Sprint Pod 2 (Agile Standup Bay)',
    zone: 'Lecture Room 204 Rear',
    type: 'Capstone Pod',
    capacity: 5,
    features: ['Kanban Pinboard', 'Ubuntu Mirror Direct LAN', 'Power Hub'],
    slots: {
      '08:00 - 10:00': null,
      '10:00 - 12:00': null,
      '13:00 - 15:00': { bookedBy: 'Nelo Cabab & NetSec Group', purpose: 'Packet Loss Analysis & RF Mapping', size: 4, studentId: '23-10337' },
      '15:00 - 17:00': null
    }
  },
  {
    id: 'SPC-05',
    name: 'IT Lab 101 - Open Workstation Cluster A (PCs 01–04)',
    zone: 'IT Lab 101 (Vacant Class Hours)',
    type: 'Lab Workstation Cluster',
    capacity: 4,
    features: ['4x Core i7 Rigs', '1 Gbps Local Mirror Mounted', 'Dual Boot Ubuntu/Win'],
    slots: {
      '08:00 - 10:00': { bookedBy: 'Scheduled Class: CS-201', purpose: 'Data Structures Lab Session', size: 4, studentId: 'FACULTY' },
      '10:00 - 12:00': null,
      '13:00 - 15:00': null,
      '15:00 - 17:00': { bookedBy: 'BSIT 2B - ML Study Group', purpose: 'Kaggle Dataset Model Training', size: 4, studentId: '24-11902' }
    }
  },
  {
    id: 'SPC-06',
    name: 'Huddle Bench Delta (Quick Peer Debugging)',
    zone: 'Faculty Consultation Annex',
    type: 'Huddle Station',
    capacity: 4,
    features: ['Fast Charging Bar', 'Strong Wi-Fi Zone', 'Whiteboard Easel'],
    slots: {
      '08:00 - 10:00': null,
      '10:00 - 12:00': null,
      '13:00 - 15:00': null,
      '15:00 - 17:00': null
    }
  }
];

export const BANDWIDTH_CHART_DATA = [
  { time: '08:00', ispTraffic: 14, localMirror: 48 },
  { time: '09:30', ispTraffic: 18, localMirror: 112 },
  { time: '11:00', ispTraffic: 15, localMirror: 165 },
  { time: '13:00', ispTraffic: 19, localMirror: 94 },
  { time: '14:30', ispTraffic: 16, localMirror: 210 },
  { time: '16:00', ispTraffic: 12, localMirror: 178 },
  { time: '17:30', ispTraffic: 9, localMirror: 85 }
];
