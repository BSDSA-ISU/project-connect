import React from 'react';
import {
  Activity,
  Check,
  Layers,
  Radio,
  ShieldCheck
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import {
  TEAM_MEMBERS,
  BANDWIDTH_CHART_DATA,
  ImplementationPhase,
  ActivityLog
} from '../data/projectData';

interface CommandCenterProps {
  darkMode: boolean;
  phases: ImplementationPhase[];
  selectedPhaseId: number;
  onSelectPhase: (id: number) => void;
  onToggleDeliverable: (phaseId: number, idx: number) => void;
  activityLogs: ActivityLog[];
}

export const CommandCenter: React.FC<CommandCenterProps> = ({
  darkMode,
  phases,
  selectedPhaseId,
  onSelectPhase,
  onToggleDeliverable,
  activityLogs
}) => {
  const selectedPhaseObj =
    phases.find((p) => p.id === selectedPhaseId) || phases[0];

  return (
    <div className="space-y-6">
      {/* Core Engineering & Operations Team */}
      <section className="rounded-xl p-5 border border-blue-200/80 dark:border-sky-900/60 bg-white dark:bg-[#0B172E]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-blue-100 dark:border-sky-900/50">
          <div>
            <h2 className="text-base font-bold flex items-center gap-2 text-slate-900 dark:text-sky-50 text-balance">
              <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-sky-400 shrink-0" />
              Core Engineering & Operations Team
            </h2>
            <p className="text-xs text-slate-600 dark:text-sky-200/70 mt-0.5">
              Student-led initiative resolving IT department bandwidth bottlenecks and collaboration space shortages.
            </p>
          </div>
          <span className="text-xs font-medium text-blue-700 dark:text-sky-300 whitespace-nowrap">
            IT Department Action Plan · 5 Core Pillars
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-4">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.name}
              className="p-3.5 rounded-lg border border-blue-100 dark:border-sky-900/50 bg-[#F8FBFF] dark:bg-[#081226] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white font-bold text-xs shrink-0`}
                >
                  {member.avatar}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-slate-900 dark:text-sky-50 truncate">
                    {member.name}
                  </p>
                  <p className="text-[11px] font-medium text-blue-600 dark:text-sky-400 truncate">
                    {member.role.split('&')[0].trim()}
                  </p>
                </div>
              </div>
              <p className="mt-2.5 text-xs text-slate-700 dark:text-sky-100/80 leading-relaxed">
                {member.role}
              </p>
              <p className="mt-1.5 text-[11px] text-slate-500 dark:text-sky-300/60">
                Focus: {member.focusArea}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5-Phase Implementation Roadmap + Telemetry Chart & Activity Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7 Cols: 5-Phase Action Plan Explorer */}
        <section className="lg:col-span-7 rounded-xl p-5 border border-blue-200/80 dark:border-sky-900/60 bg-white dark:bg-[#0B172E]">
          <div className="pb-4 border-b border-blue-100 dark:border-sky-900/50">
            <h3 className="font-bold text-base flex items-center gap-2 text-slate-900 dark:text-sky-50">
              <Layers className="w-4 h-4 text-blue-600 dark:text-sky-400 shrink-0" />
              5-Phase Implementation Roadmap
            </h3>
            <p className="text-xs text-slate-600 dark:text-sky-200/70 mt-0.5">
              Select a phase to inspect deliverables or toggle completion milestones in real time.
            </p>
          </div>

          {/* Interactive Phase Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 py-4">
            {phases.map((phase) => {
              const isSelected = phase.id === selectedPhaseId;
              return (
                <button
                  key={phase.id}
                  type="button"
                  onClick={() => onSelectPhase(phase.id)}
                  className={`text-left p-2.5 rounded-lg border transition-colors ${
                    isSelected
                      ? 'border-blue-600 dark:border-sky-400 bg-blue-50 dark:bg-sky-950/60'
                      : 'border-blue-100 dark:border-sky-900/50 bg-[#F8FBFF] dark:bg-[#081226] hover:border-blue-300 dark:hover:border-sky-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[11px] font-semibold text-blue-700 dark:text-sky-400 whitespace-nowrap">
                      {phase.week}
                    </span>
                    <span
                      className={`text-[11px] font-mono font-semibold tabular-nums ${
                        phase.progress === 100
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-sky-600 dark:text-sky-300'
                      }`}
                    >
                      {phase.progress}%
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-sky-50 mt-1 truncate">
                    Phase {phase.id}
                  </p>
                  <div className="w-full h-1.5 bg-blue-100 dark:bg-sky-950 rounded-full overflow-hidden mt-2">
                    <div
                      className={`h-full transition-all duration-200 ${
                        phase.progress === 100
                          ? 'bg-emerald-500'
                          : 'bg-blue-600 dark:bg-sky-400'
                      }`}
                      style={{ width: `${phase.progress}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Phase Details (Separated by hairline divider, no nested card box) */}
          <div className="pt-4 border-t border-blue-100 dark:border-sky-900/50">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <h4 className="font-bold text-sm sm:text-base text-blue-700 dark:text-sky-300">
                {selectedPhaseObj.title}
              </h4>
              <span
                className={`text-xs font-semibold tabular-nums ${
                  selectedPhaseObj.progress === 100
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-amber-600 dark:text-amber-400'
                }`}
              >
                {selectedPhaseObj.status} · {selectedPhaseObj.progress}%
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-sky-200/75 mb-4">
              {selectedPhaseObj.summary}
            </p>

            <div className="divide-y divide-blue-100 dark:divide-sky-900/40 border-y border-blue-100 dark:border-sky-900/40">
              {selectedPhaseObj.deliverables.map((item, idx) => (
                <label
                  key={idx}
                  onClick={() => onToggleDeliverable(selectedPhaseObj.id, idx)}
                  className="flex items-start gap-3 py-3 cursor-pointer hover:bg-blue-50/50 dark:hover:bg-sky-950/30 px-2 transition-colors"
                >
                  <span
                    className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border shrink-0 transition-colors ${
                      item.done
                        ? 'bg-blue-600 border-blue-600 dark:bg-sky-500 dark:border-sky-500 text-white'
                        : 'border-slate-300 dark:border-sky-700 bg-white dark:bg-[#081226]'
                    }`}
                  >
                    {item.done && <Check className="w-3 h-3" />}
                  </span>
                  <span
                    className={`text-xs flex-1 leading-relaxed ${
                      item.done
                        ? 'line-through text-slate-400 dark:text-sky-200/45'
                        : 'text-slate-800 dark:text-sky-100'
                    }`}
                  >
                    {item.text}
                  </span>
                </label>
              ))}
            </div>

            <p className="mt-3 text-xs text-emerald-700 dark:text-emerald-400 font-medium">
              Outcome: {selectedPhaseObj.metricImpact}
            </p>
          </div>
        </section>

        {/* Right 5 Cols: Bandwidth Chart & Portal Event Stream */}
        <div className="lg:col-span-5 space-y-6">
          {/* Chart Card */}
          <section className="rounded-xl p-5 border border-blue-200/80 dark:border-sky-900/60 bg-white dark:bg-[#0B172E]">
            <div className="mb-3">
              <h3 className="font-bold text-sm flex items-center gap-2 text-slate-900 dark:text-sky-50">
                <Activity className="w-4 h-4 text-blue-600 dark:text-sky-400 shrink-0" />
                LAN Local Mirror vs External ISP Traffic (GB/hr)
              </h3>
              <p className="text-xs text-slate-600 dark:text-sky-200/70 mt-0.5">
                Heavy IDE and dataset traffic remains on the 1 Gbps LAN rather than saturating campus Wi-Fi.
              </p>
            </div>

            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={BANDWIDTH_CHART_DATA}>
                  <defs>
                    <linearGradient id="colorMirrorBlue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.45} />
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorIspRed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={darkMode ? '#1e3a5f' : '#dbeafe'}
                    opacity={0.6}
                  />
                  <XAxis
                    dataKey="time"
                    stroke={darkMode ? '#7dd3fc' : '#475569'}
                    fontSize={11}
                  />
                  <YAxis
                    stroke={darkMode ? '#7dd3fc' : '#475569'}
                    fontSize={11}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkMode ? '#081226' : '#ffffff',
                      borderColor: darkMode ? '#1e3a5f' : '#bfdbfe',
                      borderRadius: '0.5rem',
                      fontSize: '12px',
                      color: darkMode ? '#f0f9ff' : '#0f172a'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Area
                    type="monotone"
                    dataKey="localMirror"
                    name="Local Mirror Intranet (GB)"
                    stroke="#0ea5e9"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorMirrorBlue)"
                  />
                  <Area
                    type="monotone"
                    dataKey="ispTraffic"
                    name="External ISP Load (GB)"
                    stroke="#f43f5e"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorIspRed)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Portal Event Stream */}
          <section className="rounded-xl p-5 border border-blue-200/80 dark:border-sky-900/60 bg-white dark:bg-[#0B172E]">
            <h3 className="font-bold text-sm flex items-center gap-2 mb-3 text-slate-900 dark:text-sky-50">
              <Radio className="w-4 h-4 text-blue-600 dark:text-sky-400 shrink-0" />
              Portal Activity Log
            </h3>
            <div className="divide-y divide-blue-100 dark:divide-sky-900/40 max-h-52 overflow-y-auto">
              {activityLogs.map((log) => (
                <div
                  key={log.id}
                  className="py-2.5 text-xs flex items-start justify-between gap-3"
                >
                  <div className="space-y-0.5 min-w-0">
                    <span
                      className={`font-semibold ${
                        log.module === 'Mirror'
                          ? 'text-sky-600 dark:text-sky-400'
                          : log.module === 'Wi-Fi'
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-blue-600 dark:text-blue-400'
                      }`}
                    >
                      {log.module}
                    </span>
                    <span className="mx-1.5 text-slate-400">·</span>
                    <span className="text-slate-700 dark:text-sky-100/85">
                      {log.text}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono tabular-nums text-slate-500 dark:text-sky-300/60 whitespace-nowrap shrink-0">
                    {log.time}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
