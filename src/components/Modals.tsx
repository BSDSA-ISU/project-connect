import React, { useEffect } from 'react';
import { HardDrive, X } from 'lucide-react';
import { CollabSpace } from '../data/projectData';

export interface NewPkgFormState {
  name: string;
  category: 'IDE & Toolchains' | 'Datasets' | 'OS & Containers';
  version: string;
  sizeGB: string;
  description: string;
}

export interface BookingFormState {
  studentName: string;
  studentId: string;
  purpose: string;
  size: number;
}

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
  form: NewPkgFormState;
  onChangeForm: (next: NewPkgFormState) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const UploadPackageModal: React.FC<UploadModalProps> = ({
  open,
  onClose,
  form,
  onChangeForm,
  onSubmit
}) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl p-6 border border-blue-200 dark:border-sky-800/80 bg-white dark:bg-[#0B172E] text-slate-900 dark:text-sky-50 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-base flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-blue-600 dark:text-sky-400" />
            Cache Package on Local Mirror
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-sky-900/50 text-slate-500 dark:text-sky-300"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold mb-1">
              Package / Dataset Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Flutter 3.24 Offline SDK + Gradle Cache"
              value={form.name}
              onChange={(e) => onChangeForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-blue-200 dark:border-sky-800 bg-[#F4F8FD] dark:bg-[#081226] focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) =>
                  onChangeForm({
                    ...form,
                    category: e.target.value as NewPkgFormState['category']
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-blue-200 dark:border-sky-800 bg-[#F4F8FD] dark:bg-[#081226] focus:outline-none focus:border-blue-500"
              >
                <option value="IDE & Toolchains">IDE & Toolchains</option>
                <option value="Datasets">Datasets</option>
                <option value="OS & Containers">OS & Containers</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Size (GB)</label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={form.sizeGB}
                onChange={(e) =>
                  onChangeForm({ ...form, sizeGB: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg border border-blue-200 dark:border-sky-800 bg-[#F4F8FD] dark:bg-[#081226] font-mono tabular-nums focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">
              Contents & Course Description
            </label>
            <textarea
              rows={3}
              placeholder="Describe which programming or data science classes need this offline bundle..."
              value={form.description}
              onChange={(e) =>
                onChangeForm({ ...form, description: e.target.value })
              }
              className="w-full px-3 py-2 rounded-lg border border-blue-200 dark:border-sky-800 bg-[#F4F8FD] dark:bg-[#081226] focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-blue-200 dark:border-sky-800 text-slate-600 dark:text-sky-200 hover:bg-blue-50 dark:hover:bg-sky-900/40 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold"
            >
              Sync to Mirror
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface BookingModalProps {
  target: { space: CollabSpace; slot: string } | null;
  onClose: () => void;
  form: BookingFormState;
  onChangeForm: (next: BookingFormState) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  target,
  onClose,
  form,
  onChangeForm,
  onSubmit
}) => {
  useEffect(() => {
    if (!target) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [target, onClose]);

  if (!target) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl p-6 border border-blue-200 dark:border-sky-800/80 bg-white dark:bg-[#0B172E] text-slate-900 dark:text-sky-50 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-base">
            Reserve {target.space.name}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-sky-900/50 text-slate-500 dark:text-sky-300"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-blue-700 dark:text-sky-400 font-medium mb-4">
          {target.slot} · {target.space.zone}
        </p>

        <form onSubmit={onSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold mb-1">
              Lead Student / Group Name
            </label>
            <input
              type="text"
              required
              value={form.studentName}
              onChange={(e) =>
                onChangeForm({ ...form, studentName: e.target.value })
              }
              className="w-full px-3 py-2 rounded-lg border border-blue-200 dark:border-sky-800 bg-[#F4F8FD] dark:bg-[#081226] focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Student ID</label>
              <input
                type="text"
                required
                value={form.studentId}
                onChange={(e) =>
                  onChangeForm({ ...form, studentId: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg border border-blue-200 dark:border-sky-800 bg-[#F4F8FD] dark:bg-[#081226] font-mono tabular-nums focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">
                Group Size (Max {target.space.capacity})
              </label>
              <input
                type="number"
                min="1"
                max={target.space.capacity}
                value={form.size}
                onChange={(e) =>
                  onChangeForm({
                    ...form,
                    size: Math.max(
                      1,
                      Math.min(target.space.capacity, Number(e.target.value) || 1)
                    )
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-blue-200 dark:border-sky-800 bg-[#F4F8FD] dark:bg-[#081226] font-mono tabular-nums focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">
              Academic Purpose / Sprint Goal
            </label>
            <input
              type="text"
              required
              value={form.purpose}
              onChange={(e) =>
                onChangeForm({ ...form, purpose: e.target.value })
              }
              className="w-full px-3 py-2 rounded-lg border border-blue-200 dark:border-sky-800 bg-[#F4F8FD] dark:bg-[#081226] focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-blue-200 dark:border-sky-800 text-slate-600 dark:text-sky-200 hover:bg-blue-50 dark:hover:bg-sky-900/40 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold"
            >
              Confirm Reservation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface AdvocacyModalProps {
  open: boolean;
  onClose: () => void;
  totalBandwidthSavedGB: number;
}

export const AdvocacyReportModal: React.FC<AdvocacyModalProps> = ({
  open,
  onClose,
  totalBandwidthSavedGB
}) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-xl p-6 border border-blue-200 dark:border-sky-800/80 bg-white dark:bg-[#0B172E] text-slate-900 dark:text-sky-50 max-h-[85vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between pb-3 border-b border-blue-100 dark:border-sky-900/60">
          <div>
            <span className="text-[11px] font-mono text-blue-700 dark:text-sky-400">
              Phase 3 Deliverable · Empirical Infrastructure Brief
            </span>
            <h3 className="font-bold text-lg mt-0.5">
              IT Department Connectivity & Space Repurposing Proposal
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-sky-900/50 text-slate-500 dark:text-sky-300"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 my-4 text-xs leading-relaxed">
          <div className="pb-3 border-b border-blue-100 dark:border-sky-900/50 space-y-1">
            <p className="font-semibold text-blue-700 dark:text-sky-400">
              Prepared by: Hays Marayag, Nelo Cabab, CJay Sebastian, Cyrus Troy Bazar, Catlyn Talbo
            </p>
            <p className="text-slate-600 dark:text-sky-200/75">
              Submitted to: IT Department Head & Campus Network Administration
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-sky-100 mb-1">
              1. Empirical Wi-Fi Audit Findings
            </h4>
            <p className="text-slate-700 dark:text-sky-100/80">
              Across 3 days of peak-hour testing, our team identified severe signal attenuation in the East Wing Annex (<strong>-86 dBm / 34% packet loss</strong>) and Lecture Room 204 (<strong>-82 dBm / 24.5% packet loss</strong>). Meanwhile, 74% of external ISP saturation is caused by repetitive student downloads of identical IDEs and datasets.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-sky-100 mb-1">
              2. Zero-Budget Student Technical Interventions
            </h4>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-700 dark:text-sky-100/80">
              <li>
                <strong>Local Mirror Intranet (192.168.10.200):</strong> Configured on a repurposed Ubuntu lab PC, currently offloading{' '}
                <strong className="tabular-nums">
                  {(totalBandwidthSavedGB / 1000).toFixed(2)} TB
                </strong>{' '}
                of external bandwidth at ~98 MB/s over local LAN.
              </li>
              <li>
                <strong>SQL Space Booking System:</strong> Live reservation web portal managing 6 collaborative stations with automated conflict prevention.
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-sky-100 mb-1">
              3. Requested Administrative Sign-Off
            </h4>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-700 dark:text-sky-100/80">
              <li>Approve repositioning of AP-WEST 8 meters toward the Central Spine corridor.</li>
              <li>
                Authorize repurposing the East Wing Storage Annex into <strong>Collab Zone A</strong> (28 student seats with existing folding tables and whiteboards).
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-3 border-t border-blue-100 dark:border-sky-900/60 flex items-center justify-between">
          <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
            Ready for Phase 3 Faculty Presentation
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};
