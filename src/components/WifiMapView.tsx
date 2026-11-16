import React from 'react';
import { FileText, Router, Signal, Wifi } from 'lucide-react';
import {
  EffectiveRoomTelemetry,
  RoomTelemetry,
  TelemetryLogEntry
} from '../data/projectData';

export interface TelemetryFormState {
  roomId: string;
  reporter: string;
  measuredSpeed: string;
  measuredSignal: string;
  dropouts: string;
}

interface WifiMapViewProps {
  rooms: RoomTelemetry[];
  effectiveRooms: EffectiveRoomTelemetry[];
  selectedRoomId: string;
  onSelectRoom: (id: string) => void;
  heatmapMetric: 'signal' | 'speed' | 'loss';
  onChangeMetric: (m: 'signal' | 'speed' | 'loss') => void;
  simAp1Active: boolean;
  onToggleSimAp1: (val: boolean) => void;
  simAp2Active: boolean;
  onToggleSimAp2: (val: boolean) => void;
  telemetryForm: TelemetryFormState;
  onChangeTelemetryForm: (next: TelemetryFormState) => void;
  onSubmitTelemetry: (e: React.FormEvent) => void;
  telemetryHistory: TelemetryLogEntry[];
  onOpenAdvocacyModal: () => void;
}

export const WifiMapView: React.FC<WifiMapViewProps> = ({
  rooms,
  effectiveRooms,
  selectedRoomId,
  onSelectRoom,
  heatmapMetric,
  onChangeMetric,
  simAp1Active,
  onToggleSimAp1,
  simAp2Active,
  onToggleSimAp2,
  telemetryForm,
  onChangeTelemetryForm,
  onSubmitTelemetry,
  telemetryHistory,
  onOpenAdvocacyModal
}) => {
  const selectedRoomObj =
    effectiveRooms.find((r) => r.id === selectedRoomId) || effectiveRooms[0];

  return (
    <div className="space-y-6">
      {/* Top Controls & Hardware Repositioning Simulator */}
      <section className="rounded-xl p-5 border border-blue-200/80 dark:border-sky-900/60 bg-white dark:bg-[#0B172E]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-sky-50">
              <Wifi className="w-5 h-5 text-blue-600 dark:text-sky-400 shrink-0" />
              Empirical Wi-Fi Dead-Zone Floor Map
            </h2>
            <p className="text-xs text-slate-600 dark:text-sky-200/75 mt-0.5">
              Peak-hour floor plan telemetry. Toggle proposed Access Point relocations below to simulate coverage gains.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 p-1 rounded-lg bg-blue-100/70 dark:bg-[#081226] border border-blue-200/80 dark:border-sky-900/50">
              {[
                { id: 'signal', label: 'Signal (dBm)' },
                { id: 'speed', label: 'Throughput (Mbps)' },
                { id: 'loss', label: 'Packet Loss (%)' }
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() =>
                    onChangeMetric(m.id as 'signal' | 'speed' | 'loss')
                  }
                  className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                    heatmapMetric === m.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-sky-200/70 hover:text-slate-900 dark:hover:text-sky-50'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={onOpenAdvocacyModal}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
            >
              <FileText className="w-3.5 h-3.5" />
              Export Advocacy Report
            </button>
          </div>
        </div>

        {/* Router Repositioning Simulator Bar (Separated by hairline divider) */}
        <div className="mt-4 pt-4 border-t border-blue-100 dark:border-sky-900/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Router className="w-5 h-5 text-blue-600 dark:text-sky-400 shrink-0" />
            <div>
              <span className="text-xs font-bold text-blue-700 dark:text-sky-400 block">
                Hardware Repositioning Simulator
              </span>
              <span className="text-xs text-slate-600 dark:text-sky-200/75">
                Simulate relocating existing hallway routers to resolve dead zones in Lab 102, Collab Zone A, and Lecture 204.
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-xs font-medium cursor-pointer px-3 py-2 rounded-lg bg-[#F4F8FD] dark:bg-[#081226] text-slate-800 dark:text-sky-100 border border-blue-200/80 dark:border-sky-800/70 hover:border-blue-500 dark:hover:border-sky-400 transition-colors">
              <input
                type="checkbox"
                checked={simAp1Active}
                onChange={(e) => onToggleSimAp1(e.target.checked)}
                className="rounded accent-blue-600"
              />
              <span>Relocate AP-WEST to Central Spine (+Lab 102)</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-medium cursor-pointer px-3 py-2 rounded-lg bg-[#F4F8FD] dark:bg-[#081226] text-slate-800 dark:text-sky-100 border border-blue-200/80 dark:border-sky-800/70 hover:border-blue-500 dark:hover:border-sky-400 transition-colors">
              <input
                type="checkbox"
                checked={simAp2Active}
                onChange={(e) => onToggleSimAp2(e.target.checked)}
                className="rounded accent-blue-600"
              />
              <span>Deploy East-Wing Mesh Repeater (+Collab Zone A)</span>
            </label>
          </div>
        </div>
      </section>

      {/* Floor Plan Grid + Room Diagnostic & Telemetry Logger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Cols: 2D Architectural Floor Plan Heatmap + Recent Logs */}
        <div className="lg:col-span-8 space-y-6">
          <section className="rounded-xl p-5 border border-blue-200/80 dark:border-sky-900/60 bg-white dark:bg-[#0B172E]">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <span className="text-xs font-semibold text-slate-700 dark:text-sky-200/80">
                1st Floor Blueprint — Select any zone to inspect RF metrics
              </span>
              <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-600 dark:text-sky-200/75">
                <span className="font-medium text-emerald-700 dark:text-emerald-400">
                  Optimal (-40 to -65 dBm)
                </span>
                <span className="font-medium text-amber-700 dark:text-amber-400">
                  Degraded (-66 to -77 dBm)
                </span>
                <span className="font-medium text-rose-700 dark:text-rose-400">
                  Dead Zone (&lt; -78 dBm)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 min-h-[420px]">
              {effectiveRooms.map((room) => {
                const isSelected = room.id === selectedRoomId;

                let zoneTheme =
                  'bg-emerald-50/90 dark:bg-emerald-950/35 border-emerald-300 dark:border-emerald-700/60';
                let statusColor = 'text-emerald-700 dark:text-emerald-400';

                if (room.status === 'Dead Zone') {
                  zoneTheme =
                    'bg-rose-50/90 dark:bg-rose-950/35 border-rose-300 dark:border-rose-700/60';
                  statusColor = 'text-rose-700 dark:text-rose-400';
                } else if (room.status === 'Degraded') {
                  zoneTheme =
                    'bg-amber-50/90 dark:bg-amber-950/35 border-amber-300 dark:border-amber-700/60';
                  statusColor = 'text-amber-700 dark:text-amber-400';
                }

                const primaryMetricLabel =
                  heatmapMetric === 'signal'
                    ? `${room.signal} dBm`
                    : heatmapMetric === 'speed'
                    ? `${room.speed} Mbps`
                    : `${room.loss}% Loss`;

                return (
                  <button
                    key={room.id}
                    type="button"
                    onClick={() => onSelectRoom(room.id)}
                    className={`${room.gridArea} text-left cursor-pointer rounded-xl p-4 border transition-all flex flex-col justify-between ${zoneTheme} ${
                      isSelected
                        ? 'ring-2 ring-blue-600 dark:ring-sky-400 shadow-md'
                        : 'hover:border-blue-500 dark:hover:border-sky-400'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 w-full">
                      <div className="min-w-0">
                        <span className="text-[11px] font-mono tabular-nums text-slate-600 dark:text-sky-200/70 block">
                          {room.code} · {room.usersConnected} devices
                        </span>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-sky-50 leading-tight mt-0.5">
                          {room.name}
                        </h4>
                      </div>
                      <span
                        className={`text-[11px] font-bold whitespace-nowrap shrink-0 ${statusColor}`}
                      >
                        {room.isBoosted ? 'Boosted' : room.status}
                      </span>
                    </div>

                    <div className="my-3 flex items-baseline gap-2">
                      <span className="text-2xl font-extrabold font-mono tabular-nums text-slate-900 dark:text-white">
                        {primaryMetricLabel}
                      </span>
                      {room.isBoosted && (
                        <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
                          Simulated Fix
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-2 w-full text-[11px] text-slate-600 dark:text-sky-200/75 pt-2 border-t border-slate-900/10 dark:border-white/10">
                      <span className="truncate">{room.apName}</span>
                      <span className="font-mono tabular-nums whitespace-nowrap shrink-0">
                        {room.speed} Mbps · {room.loss}% loss
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Crowdsourced Telemetry Table */}
          <section className="rounded-xl p-5 border border-blue-200/80 dark:border-sky-900/60 bg-white dark:bg-[#0B172E]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-sky-50">
                Recent Crowdsourced Speed & Signal Logs
              </h3>
              <span className="text-xs text-slate-500 dark:text-sky-300/60 tabular-nums">
                {telemetryHistory.length} latest audits
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-blue-100 dark:border-sky-900/50 text-slate-500 dark:text-sky-300/70">
                    <th className="py-2 pr-3 font-medium">Zone</th>
                    <th className="py-2 pr-3 font-medium">Reporter</th>
                    <th className="py-2 pr-3 font-medium text-right">Signal</th>
                    <th className="py-2 pr-3 font-medium text-right">Downlink</th>
                    <th className="py-2 pr-3 font-medium text-right">Loss</th>
                    <th className="py-2 font-medium text-right">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-50 dark:divide-sky-900/40">
                  {telemetryHistory.map((entry) => (
                    <tr
                      key={entry.id}
                      className="hover:bg-blue-50/50 dark:hover:bg-sky-950/30 transition-colors"
                    >
                      <td className="py-2.5 pr-3 font-mono font-semibold text-blue-700 dark:text-sky-400">
                        {entry.room}
                      </td>
                      <td className="py-2.5 pr-3 text-slate-800 dark:text-sky-100">
                        {entry.reporter}
                      </td>
                      <td className="py-2.5 pr-3 font-mono tabular-nums text-right text-slate-700 dark:text-sky-200">
                        {entry.signal} dBm
                      </td>
                      <td className="py-2.5 pr-3 font-mono tabular-nums text-right text-blue-700 dark:text-sky-400">
                        {entry.speed} Mbps
                      </td>
                      <td className="py-2.5 pr-3 font-mono tabular-nums text-right text-rose-600 dark:text-rose-400">
                        {entry.loss}%
                      </td>
                      <td className="py-2.5 font-mono tabular-nums text-right text-slate-500 dark:text-sky-300/60">
                        {entry.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Right 4 Cols: Selected Zone Diagnostic + Student Telemetry Logger */}
        <div className="lg:col-span-4 space-y-6">
          <section className="rounded-xl p-5 border border-blue-200/80 dark:border-sky-900/60 bg-white dark:bg-[#0B172E]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-mono text-blue-700 dark:text-sky-400">
                Zone Diagnostic · {selectedRoomObj.code}
              </span>
              <span
                className={`text-xs font-bold ${
                  selectedRoomObj.status === 'Optimal'
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : selectedRoomObj.status === 'Degraded'
                    ? 'text-amber-600 dark:text-amber-400'
                    : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                {selectedRoomObj.status}
              </span>
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-sky-50">
              {selectedRoomObj.name}
            </h3>
            <p className="text-xs text-slate-600 dark:text-sky-200/75 mt-1 leading-relaxed">
              {selectedRoomObj.issueNote}
            </p>

            {/* Hairline-divided 3-column metrics (no nested boxes) */}
            <div className="grid grid-cols-3 divide-x divide-blue-100 dark:divide-sky-900/50 mt-4 pt-4 border-t border-blue-100 dark:border-sky-900/50 text-center">
              <div className="px-2">
                <span className="text-[11px] text-slate-500 dark:text-sky-300/60 block">
                  RSSI Signal
                </span>
                <span className="font-mono font-bold text-sm tabular-nums text-slate-900 dark:text-sky-50">
                  {selectedRoomObj.signal} dBm
                </span>
              </div>
              <div className="px-2">
                <span className="text-[11px] text-slate-500 dark:text-sky-300/60 block">
                  Downlink
                </span>
                <span className="font-mono font-bold text-sm tabular-nums text-blue-700 dark:text-sky-400">
                  {selectedRoomObj.speed} Mbps
                </span>
              </div>
              <div className="px-2">
                <span className="text-[11px] text-slate-500 dark:text-sky-300/60 block">
                  Packet Loss
                </span>
                <span className="font-mono font-bold text-sm tabular-nums text-rose-600 dark:text-rose-400">
                  {selectedRoomObj.loss}%
                </span>
              </div>
            </div>
          </section>

          {/* Student Speed-Test & Dead-Zone Logger Form */}
          <form
            onSubmit={onSubmitTelemetry}
            className="rounded-xl p-5 border border-blue-200/80 dark:border-sky-900/60 bg-white dark:bg-[#0B172E] space-y-3"
          >
            <h4 className="font-bold text-sm flex items-center gap-2 text-slate-900 dark:text-sky-50">
              <Signal className="w-4 h-4 text-blue-600 dark:text-sky-400 shrink-0" />
              Log Speed & Dropout Audit
            </h4>
            <p className="text-xs text-slate-600 dark:text-sky-200/70">
              Crowdsourced Phase 1 and Phase 5 survey logs update the live department heatmap immediately.
            </p>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-sky-100 mb-1">
                Department Zone
              </label>
              <select
                value={telemetryForm.roomId}
                onChange={(e) =>
                  onChangeTelemetryForm({ ...telemetryForm, roomId: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg border border-blue-200 dark:border-sky-800 bg-[#F4F8FD] dark:bg-[#081226] text-slate-900 dark:text-sky-50 text-xs focus:outline-none focus:border-blue-500"
              >
                {rooms.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.code} — {r.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-sky-100 mb-1">
                Reporter Name
              </label>
              <input
                type="text"
                required
                value={telemetryForm.reporter}
                onChange={(e) =>
                  onChangeTelemetryForm({
                    ...telemetryForm,
                    reporter: e.target.value
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-blue-200 dark:border-sky-800 bg-[#F4F8FD] dark:bg-[#081226] text-slate-900 dark:text-sky-50 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[11px] text-slate-500 dark:text-sky-300/70 mb-1">
                  Signal (dBm)
                </label>
                <input
                  type="number"
                  value={telemetryForm.measuredSignal}
                  onChange={(e) =>
                    onChangeTelemetryForm({
                      ...telemetryForm,
                      measuredSignal: e.target.value
                    })
                  }
                  className="w-full px-2.5 py-1.5 rounded-lg border border-blue-200 dark:border-sky-800 bg-[#F4F8FD] dark:bg-[#081226] text-slate-900 dark:text-sky-50 text-xs font-mono tabular-nums focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 dark:text-sky-300/70 mb-1">
                  Speed (Mbps)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={telemetryForm.measuredSpeed}
                  onChange={(e) =>
                    onChangeTelemetryForm({
                      ...telemetryForm,
                      measuredSpeed: e.target.value
                    })
                  }
                  className="w-full px-2.5 py-1.5 rounded-lg border border-blue-200 dark:border-sky-800 bg-[#F4F8FD] dark:bg-[#081226] text-slate-900 dark:text-sky-50 text-xs font-mono tabular-nums focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 dark:text-sky-300/70 mb-1">
                  Dropouts/hr
                </label>
                <input
                  type="number"
                  value={telemetryForm.dropouts}
                  onChange={(e) =>
                    onChangeTelemetryForm({
                      ...telemetryForm,
                      dropouts: e.target.value
                    })
                  }
                  className="w-full px-2.5 py-1.5 rounded-lg border border-blue-200 dark:border-sky-800 bg-[#F4F8FD] dark:bg-[#081226] text-slate-900 dark:text-sky-50 text-xs font-mono tabular-nums focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors"
            >
              Record Telemetry to Heatmap
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
