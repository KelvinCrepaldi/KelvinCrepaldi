import { Activity } from "lucide-react";

import { BlinkingDotRow } from "@/_components/_ui/animations/BlinkingDotRow";
import { WaitingCursor } from "@/_components/_ui/animations/WaitingCursor";

import { SystemLogFeed, type SystemLogFeedEntry } from "./system-log-feed";
import { SystemLogRow } from "./system-log-row";

const SYSTEM_LOG_FEED_ENTRIES: SystemLogFeedEntry[] = [
  {
    status: "[SUCCESS]",
    time: "08:30:00",
    message: "TOTEM_PLATFORM_V3_DEPLOYED // 600+_CLIENTS",
  },
  {
    status: "[SUCCESS]",
    time: "11:04:12",
    message: "PAGE_LOAD_TIME_REDUCED_30%",
  },
  {
    status: "[SUCCESS]",
    time: "14:55:01",
    message: "OFFLINE_FIRST_SYNC_STABILIZED",
  },
];

export function SystemLogs() {
  return (
    <section
      id="system-logs"
      className="relative z-10 px-6 md:px-12 pt-24 pb-36 md:pb-44 bg-surface-container-low overflow-hidden"
    >
      <div className="w-full lg:max-w-6xl lg:mx-auto">
        <header className="relative z-10 mb-12 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-1 flex flex-wrap items-center gap-3">
              <BlinkingDotRow count={4} size="sm" />
              <h3 className="text-4xl font-black uppercase tracking-tighter text-on-surface md:text-6xl">
                System_Logs
              </h3>
            </div>
            <p className="mt-2 flex flex-wrap items-center gap-2 font-mono text-sm opacity-60">
              <BlinkingDotRow count={3} size="sm" className="opacity-70" />
              ATIVIDADE // registros recentes e princípios que guiam o trabalho
            </p>
          </div>
          <div className="mb-4 hidden h-px flex-grow bg-outline-variant md:mx-8 md:block" />
          <Activity
            className="h-10 w-10 shrink-0 text-on-surface opacity-20 md:h-12 md:w-12"
            strokeWidth={1.25}
            aria-hidden
          />
        </header>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.4em] text-outline">
              RECENT_ACTIVITY // FEED
            </p>
            <div className="space-y-4">
              <SystemLogFeed
                entries={SYSTEM_LOG_FEED_ENTRIES}
                maxVisible={4}
                baseIntervalMs={400}
                lengthFactorMs={15}
              />
              <SystemLogRow
                level={<span className="text-on-surface/60">[WAITING]</span>}
                time="--:--:--"
                message={<WaitingCursor />}
              />
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-on-surface opacity-[0.02] flex items-center justify-center pointer-events-none">
              <span className="text-[20rem] font-black opacity-10">ARCH</span>
            </div>
            <div className="relative z-10 p-8 border border-outline-variant/20 bg-surface-container-highest/30">
              <h5 className="text-xl font-bold mb-6 italic">
                &quot;Interfaces performáticas e resilientes são a base de
                produtos que escalam.&quot;
              </h5>
              <p className="text-sm leading-relaxed opacity-70">
                Desenvolvedor de Software com 2 anos de experiência em sistemas
                web de telemedicina e gestão administrativa. Especialista em
                interfaces dinâmicas com React, Vite e Electron, fluxos de
                formulários complexos e integração com APIs — garantindo
                performance, escalabilidade e consistência em cada entrega.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
