import {
  CornerBracket,
  CrosshairMark,
  PerforatedStrip,
  RegistrationMark,
} from "@/_components/_ui/technical-margin-marks";

export function TechnicalCornerMarks() {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-0 hidden md:block`}
      aria-hidden
    >
      <div className="absolute right-10 top-5 flex flex-col items-end gap-4">
        <CornerBracket corner="top-right" />
        <RegistrationMark />
        <PerforatedStrip count={3} />
        <div className="w-[1px] h-[20vh] bg-outline-variant"></div>
        <div className="w-[1px] h-4 bg-outline-variant"></div>
        <div className="w-[1px] h-1 bg-outline-variant"></div>
      </div>

      <div className="absolute bottom-10 left-5 flex flex-col items-start gap-4">
        <div className="w-[1px] h-1 bg-outline-variant"></div>
        <div className="w-[1px] h-4 bg-outline-variant"></div>
        <div className="w-[1px] h-[20vh] bg-outline-variant"></div>
        <CrosshairMark />
        <CornerBracket corner="bottom-left" />
        <p className="font-mono text-[7px] uppercase tracking-[0.28em] text-on-surface/30">
          041.2026
        </p>
      </div>
    </div>
  );
}
