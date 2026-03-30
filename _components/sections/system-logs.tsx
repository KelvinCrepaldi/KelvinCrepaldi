import { BlinkingDotRow } from "@/_components/_ui/animations/BlinkingDotRow";
import { WaitingCursor } from "@/_components/_ui/animations/WaitingCursor";

import { SystemLogRow } from "./system-log-row";

export function SystemLogs() {
  return (
    <section className="relative z-10 px-6 md:px-12 py-24 bg-surface/94 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <div className="flex items-center gap-3 mb-12 flex-wrap">
            <BlinkingDotRow count={5} size="sm" />
            <h3 className="text-xs font-bold tracking-[0.5em] uppercase text-outline">
              SYSTEM_LOGS // RECENT_ACTIVITY
            </h3>
          </div>
          <div className="space-y-4">
            <SystemLogRow
              level={<span className="text-on-surface/60">[SUCCESS]</span>}
              time="08:30:00"
              message="TOTEM_PLATFORM_V3_DEPLOYED // 600+_CLIENTS"
            />
            <SystemLogRow
              level={<span className="text-on-surface/60">[SUCCESS]</span>}
              time="11:04:12"
              message="PAGE_LOAD_TIME_REDUCED_30%"
            />
            <SystemLogRow
              level={<span className="text-on-surface/60">[SUCCESS]</span>}
              time="14:55:01"
              message="OFFLINE_FIRST_SYNC_STABILIZED"
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
              Desenvolvedor Front-end com 2 anos de experiência em sistemas web
              de telemedicina e gestão administrativa. Especialista em interfaces
              dinâmicas com React, Vite e Electron, fluxos de formulários
              complexos e integração com APIs — garantindo performance,
              escalabilidade e consistência em cada entrega.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
