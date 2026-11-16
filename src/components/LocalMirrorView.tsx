import React from 'react';
import { Download, Search, Upload, Zap } from 'lucide-react';
import { MirrorPackage } from '../data/projectData';

export interface ActiveDownloadState {
  pkg: MirrorPackage;
  mode: 'LAN' | 'ISP';
  progress: number;
  speed: number;
}

interface LocalMirrorViewProps {
  packages: MirrorPackage[];
  pkgSearch: string;
  onSearchChange: (val: string) => void;
  pkgCategory: string;
  onCategoryChange: (cat: string) => void;
  activeDownload: ActiveDownloadState | null;
  onStartDownload: (pkg: MirrorPackage, mode: 'LAN' | 'ISP') => void;
  onOpenUploadModal: () => void;
}

const CATEGORIES = ['All', 'IDE & Toolchains', 'Datasets', 'OS & Containers'];

export const LocalMirrorView: React.FC<LocalMirrorViewProps> = ({
  packages,
  pkgSearch,
  onSearchChange,
  pkgCategory,
  onCategoryChange,
  activeDownload,
  onStartDownload,
  onOpenUploadModal
}) => {
  const filteredPackages = packages.filter((pkg) => {
    const matchesCat = pkgCategory === 'All' || pkg.category === pkgCategory;
    const matchesSearch =
      pkg.name.toLowerCase().includes(pkgSearch.toLowerCase()) ||
      pkg.description.toLowerCase().includes(pkgSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Ubuntu Server Header */}
      <section className="rounded-xl p-5 border border-blue-200/80 dark:border-sky-900/60 bg-white dark:bg-[#0B172E]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-blue-700 dark:text-sky-400">
              <span>http://192.168.10.200/mirror</span>
              <span aria-hidden="true">·</span>
              <span className="font-sans text-emerald-700 dark:text-emerald-400 font-medium">
                Ubuntu 24.04.1 LTS (Nginx + Apt-Cacher-NG)
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-sky-50 text-balance">
              Local Mirror High-Speed Intranet Repository
            </h2>
            <p className="text-xs text-slate-600 dark:text-sky-200/75 max-w-2xl">
              Repurposed Lab PC serving multi-gigabyte IDEs, datasets, and ISO containers over the local Gigabit switch with zero external internet consumption.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 shrink-0">
            <div className="text-xs">
              <span className="text-slate-500 dark:text-sky-300/60 block">
                LAN Link Speed
              </span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm tabular-nums">
                1,000 Mbps Full-Duplex
              </span>
            </div>
            <div className="h-8 w-px bg-blue-100 dark:bg-sky-900/60 hidden sm:block" />
            <div className="text-xs">
              <span className="text-slate-500 dark:text-sky-300/60 block">
                RAID Storage
              </span>
              <span className="font-bold text-blue-700 dark:text-sky-400 text-sm tabular-nums">
                1.42 TB / 2.0 TB Free
              </span>
            </div>
            <button
              type="button"
              onClick={onOpenUploadModal}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors whitespace-nowrap shrink-0"
            >
              <Upload className="w-4 h-4" />
              Cache Package
            </button>
          </div>
        </div>

        {/* Active Download Simulator Banner */}
        {activeDownload && (
          <div className="mt-5 pt-4 border-t border-blue-100 dark:border-sky-900/50 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <Zap
                  className={`w-4 h-4 ${
                    activeDownload.mode === 'LAN'
                      ? 'text-sky-500'
                      : 'text-amber-500'
                  }`}
                />
                <span className="font-bold text-slate-900 dark:text-sky-50">
                  {activeDownload.mode === 'LAN'
                    ? 'Local LAN Transfer (192.168.10.200)'
                    : 'External Campus Wi-Fi ISP Transfer'}
                </span>
                <span className="text-slate-500 dark:text-sky-200/70">
                  — {activeDownload.pkg.name}
                </span>
              </div>
              <span className="font-mono font-bold text-blue-700 dark:text-sky-400 tabular-nums">
                {activeDownload.speed} MB/s ({Math.round(activeDownload.progress)}%)
              </span>
            </div>
            <div className="w-full h-2 bg-blue-100 dark:bg-sky-950 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-150 ${
                  activeDownload.mode === 'LAN'
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600'
                    : 'bg-amber-500'
                }`}
                style={{ width: `${activeDownload.progress}%` }}
              />
            </div>
          </div>
        )}
      </section>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 dark:text-sky-400/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={pkgSearch}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search local packages (Android Studio, Kaggle, Ubuntu, VS Code)..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-blue-200/80 dark:border-sky-900/60 bg-white dark:bg-[#0B172E] text-slate-900 dark:text-sky-50 placeholder:text-slate-400 dark:placeholder:text-sky-300/40 text-xs sm:text-sm focus:outline-none focus:border-blue-500 dark:focus:border-sky-400"
          />
        </div>

        <div className="flex items-center gap-1 p-1 rounded-lg bg-blue-100/70 dark:bg-[#081226] border border-blue-200/80 dark:border-sky-900/50 overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                pkgCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-sky-200/70 hover:text-slate-900 dark:hover:text-sky-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Empty State vs Package Grid */}
      {filteredPackages.length === 0 ? (
        <div className="rounded-xl p-10 border border-blue-200/80 dark:border-sky-900/60 bg-white dark:bg-[#0B172E] text-center space-y-2">
          <p className="text-sm font-semibold text-slate-900 dark:text-sky-50">
            No cached packages match "{pkgSearch}"
          </p>
          <p className="text-xs text-slate-500 dark:text-sky-200/60">
            Try clearing the filter or cache a new package to the local mirror server.
          </p>
          <button
            type="button"
            onClick={() => {
              onSearchChange('');
              onCategoryChange('All');
            }}
            className="mt-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPackages.map((pkg) => (
            <article
              key={pkg.id}
              className="rounded-xl p-5 border border-blue-200/80 dark:border-sky-900/60 bg-white dark:bg-[#0B172E] flex flex-col justify-between transition-colors hover:border-blue-400 dark:hover:border-sky-700"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs mb-2">
                  <span className="font-medium text-blue-700 dark:text-sky-400">
                    {pkg.category}
                  </span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                    {pkg.sizeLabel}
                  </span>
                </div>

                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-sky-50 leading-snug">
                  {pkg.name}
                </h3>
                <p className="mt-1.5 text-xs text-slate-600 dark:text-sky-200/75 leading-relaxed">
                  {pkg.description}
                </p>

                {/* Clean hairline-divided comparison table (no nested box) */}
                <div className="mt-4 pt-3 border-t border-blue-100 dark:border-sky-900/50 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-sky-300/60">
                      External Wi-Fi ISP
                    </span>
                    <span className="text-rose-600 dark:text-rose-400 font-medium tabular-nums">
                      {pkg.ispTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-sky-300/60">
                      Local Mirror LAN
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold tabular-nums">
                      {pkg.lanTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1.5 border-t border-blue-50 dark:border-sky-900/30 text-[11px] text-slate-500 dark:text-sky-300/55 font-mono tabular-nums">
                    <span>v{pkg.version}</span>
                    <span>{pkg.downloads} pulls</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-blue-100 dark:border-sky-900/50 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onStartDownload(pkg, 'LAN')}
                  disabled={!!activeDownload}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors disabled:opacity-50 whitespace-nowrap"
                >
                  <Download className="w-3.5 h-3.5" />
                  Pull via LAN
                </button>
                <button
                  type="button"
                  onClick={() => onStartDownload(pkg, 'ISP')}
                  disabled={!!activeDownload}
                  className="py-2 px-3 rounded-lg border border-blue-200 dark:border-sky-800 text-slate-700 dark:text-sky-200 hover:bg-blue-50 dark:hover:bg-sky-950/60 text-xs font-medium transition-colors disabled:opacity-50 whitespace-nowrap"
                  title="Compare with congested External ISP speed"
                >
                  Test ISP
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
