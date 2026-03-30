import type { ReactNode } from "react";

type SystemLogRowProps = {
  level: ReactNode;
  time: string;
  message: ReactNode;
};

export function SystemLogRow({ level, time, message }: SystemLogRowProps) {
  return (
    <div className="flex items-center gap-4 text-xs font-mono">
      <span>{level}</span>
      <span className="opacity-40">{time}</span>
      <span>{message}</span>
    </div>
  );
}
