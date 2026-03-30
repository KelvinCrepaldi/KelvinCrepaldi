import { BlinkingDotRow } from "@/_components/_ui/animations/BlinkingDotRow";

type TechStackProps = {
  items: { label: string; index: string }[];
};

export function TechStack({ items }: TechStackProps) {
  return (
    <div className="col-span-1 md:col-span-4 flex flex-col justify-end py-8 md:py-12 border-t md:border-t-0 border-outline-variant/30 md:border-l md:pl-8">
      <div className="space-y-8">
        <div>
          <p className="text-[10px] font-bold tracking-[0.4em] text-outline mb-4 flex items-center gap-2 flex-wrap">
            <BlinkingDotRow count={3} size="sm" />
            TECH_STACK // CORE
          </p>
          <div className="grid grid-cols-1 gap-2">
            {items.map(({ label, index }) => (
              <div
                key={label}
                className="flex items-center justify-between text-sm group"
              >
                <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                  <span
                    className="w-1 h-1 bg-on-surface/35 shrink-0"
                    aria-hidden
                  />
                  {label}
                </span>
                <span className="text-[10px] opacity-40">{index}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
