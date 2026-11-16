import React from 'react';
import { Calendar, Database, Terminal } from 'lucide-react';
import { CollabSpace, SqlLogEntry, TIME_SLOTS } from '../data/projectData';

interface SpaceBookingViewProps {
  spaces: CollabSpace[];
  selectedSlotFilter: string;
  onSelectSlotFilter: (slot: string) => void;
  spaceTypeFilter: string;
  onSelectSpaceTypeFilter: (type: string) => void;
  showSqlInspector: boolean;
  onToggleSqlInspector: () => void;
  sqlQueries: SqlLogEntry[];
  onOpenBookingModal: (space: CollabSpace, slot: string) => void;
  onReleaseSlot: (space: CollabSpace, slot: string) => void;
}

const SPACE_TYPES = [
  'All',
  'Collaboration Table',
  'Capstone Pod',
  'Lab Workstation Cluster',
  'Huddle Station'
];

export const SpaceBookingView: React.FC<SpaceBookingViewProps> = ({
  spaces,
  selectedSlotFilter,
  onSelectSlotFilter,
  spaceTypeFilter,
  onSelectSpaceTypeFilter,
  showSqlInspector,
  onToggleSqlInspector,
  sqlQueries,
  onOpenBookingModal,
  onReleaseSlot
}) => {
  const filteredSpaces = spaces.filter((sp) =>
    spaceTypeFilter === 'All' ? true : sp.type === spaceTypeFilter
  );

  return (
    <div className="space-y-6">
      {/* Booking Header & Filters */}
      <section className="rounded-xl p-5 border border-blue-200/80 dark:border-sky-900/60 bg-white dark:bg-[#0B172E] space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-sky-50">
              <Calendar className="w-5 h-5 text-blue-600 dark:text-sky-400 shrink-0" />
              Smart Space Allocation & SQL Booking
            </h2>
            <p className="text-xs text-slate-600 dark:text-sky-200/75 mt-0.5">
              Student-developed SQL reservation system turning vacant classrooms and the repurposed storage annex into structured collaboration hubs.
            </p>
          </div>

          <button
            type="button"
            onClick={onToggleSqlInspector}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-xs font-mono font-semibold transition-colors whitespace-nowrap shrink-0 self-start lg:self-auto ${
              showSqlInspector
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-blue-200 dark:border-sky-800 text-slate-700 dark:text-sky-200 hover:bg-blue-50 dark:hover:bg-sky-950/60'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            {showSqlInspector ? 'Hide SQL Engine' : 'Show SQL Engine'}
          </button>
        </div>

        {/* Time Slot & Space Type Filter Row */}
        <div className="pt-4 border-t border-blue-100 dark:border-sky-900/50 flex flex-col xl:flex-row xl:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-slate-500 dark:text-sky-300/70">
              Time Slot:
            </span>
            <div className="flex items-center gap-1 p-1 rounded-lg bg-blue-100/70 dark:bg-[#081226] border border-blue-200/80 dark:border-sky-900/50 overflow-x-auto">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => onSelectSlotFilter(slot)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium font-mono tabular-nums whitespace-nowrap transition-colors ${
                    selectedSlotFilter === slot
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-sky-200/70 hover:text-slate-900 dark:hover:text-sky-50'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-lg bg-blue-100/70 dark:bg-[#081226] border border-blue-200/80 dark:border-sky-900/50 overflow-x-auto">
            {SPACE_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => onSelectSpaceTypeFilter(type)}
                className={`px-2.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  spaceTypeFilter === type
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-sky-200/70 hover:text-slate-900 dark:hover:text-sky-50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Space Cards Grid */}
        <div className={showSqlInspector ? 'lg:col-span-7' : 'lg:col-span-12'}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSpaces.map((space) => {
              const currentReservation = space.slots[selectedSlotFilter];
              const isAvailable = !currentReservation;

              return (
                <article
                  key={space.id}
                  className="rounded-xl p-5 border border-blue-200/80 dark:border-sky-900/60 bg-white dark:bg-[#0B172E] flex flex-col justify-between transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs mb-2">
                      <span className="font-mono font-semibold text-blue-700 dark:text-sky-400">
                        {space.id} · {space.type}
                      </span>
                      <span
                        className={`font-semibold whitespace-nowrap ${
                          isAvailable
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-amber-600 dark:text-amber-400'
                        }`}
                      >
                        {isAvailable ? 'Available' : 'Reserved'}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-sky-50">
                      {space.name}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-sky-200/70 mt-0.5 tabular-nums">
                      {space.zone} · Max {space.capacity} seats
                    </p>

                    {/* Clean unboxed amenities metadata line */}
                    <p className="text-[11px] text-slate-500 dark:text-sky-300/65 mt-2.5">
                      {space.features.join(' · ')}
                    </p>

                    {/* Current Slot Status Section (Hairline divider, no nested box) */}
                    <div className="mt-4 pt-3 border-t border-blue-100 dark:border-sky-900/50 text-xs space-y-1">
                      <div className="flex items-center justify-between font-medium text-slate-700 dark:text-sky-200">
                        <span className="font-mono tabular-nums">
                          {selectedSlotFilter}
                        </span>
                        {currentReservation && (
                          <span className="font-mono text-[11px] text-blue-700 dark:text-sky-400 tabular-nums">
                            ID: {currentReservation.studentId}
                          </span>
                        )}
                      </div>
                      {isAvailable ? (
                        <p className="text-emerald-700 dark:text-emerald-400">
                          Ready for instant group check-in via QR or portal.
                        </p>
                      ) : (
                        <div className="space-y-0.5">
                          <p className="font-medium text-amber-700 dark:text-amber-300">
                            Booked by: {currentReservation.bookedBy}
                          </p>
                          <p className="text-slate-600 dark:text-sky-200/70">
                            Purpose: {currentReservation.purpose} (
                            {currentReservation.size} members)
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-blue-100 dark:border-sky-900/50">
                    {isAvailable ? (
                      <button
                        type="button"
                        onClick={() =>
                          onOpenBookingModal(space, selectedSlotFilter)
                        }
                        className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors"
                      >
                        Reserve Table ({selectedSlotFilter})
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onReleaseSlot(space, selectedSlotFilter)}
                        className="w-full py-2 rounded-lg border border-rose-300 dark:border-rose-500/40 text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-semibold transition-colors"
                      >
                        Release Slot
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Live SQL Database Inspector Panel */}
        {showSqlInspector && (
          <aside className="lg:col-span-5">
            <div className="rounded-xl p-5 border border-blue-200/80 dark:border-sky-900/60 bg-white dark:bg-[#081226] sticky top-20 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-blue-600 dark:text-sky-400 shrink-0" />
                  <h3 className="font-mono font-bold text-sm text-blue-700 dark:text-sky-400">
                    MySQL 8.0 Query Log
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400">
                  db: it_collab_hub
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-sky-200/70">
                Tracks student space reservations and prevents double-booking conflicts in real time.
              </p>

              {/* Schema Quick Reference */}
              <div className="pt-3 border-t border-blue-100 dark:border-sky-900/50 font-mono text-[11px] text-slate-600 dark:text-sky-200/75 space-y-1">
                <div className="text-blue-700 dark:text-sky-400 font-bold">
                  TABLE reservations (PK: res_id)
                </div>
                <div>· space_id VARCHAR(12) REFERENCES department_spaces(id)</div>
                <div>· student_id VARCHAR(16), booked_by VARCHAR(64)</div>
                <div>· time_slot VARCHAR(20), group_size INT, created_at TIMESTAMP</div>
              </div>

              {/* Executed SQL Statements Stream */}
              <div className="divide-y divide-blue-100 dark:divide-sky-900/50 border-t border-blue-100 dark:border-sky-900/50 max-h-[380px] overflow-y-auto">
                {sqlQueries.map((q) => (
                  <div
                    key={q.id}
                    className="py-3 font-mono text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span
                        className={`font-bold ${
                          q.type === 'INSERT'
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : q.type === 'DELETE'
                            ? 'text-rose-600 dark:text-rose-400'
                            : 'text-blue-600 dark:text-sky-400'
                        }`}
                      >
                        {q.type}
                      </span>
                      <span className="text-slate-500 dark:text-sky-300/60 tabular-nums">
                        {q.timestamp}
                      </span>
                    </div>
                    <pre className="text-[11px] text-slate-800 dark:text-sky-200 whitespace-pre-wrap overflow-x-auto leading-relaxed bg-[#F4F8FD] dark:bg-[#0B172E] p-2.5 rounded-lg">
                      {q.query}
                    </pre>
                    <div className="text-[11px] text-emerald-700 dark:text-emerald-400">
                      {q.rowsAffected}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
