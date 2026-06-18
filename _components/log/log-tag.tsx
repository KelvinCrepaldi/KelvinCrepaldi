type LogTagProps = {
  label: string;
};

export function LogTag({ label }: LogTagProps) {
  return (
    <span className="px-1.5 py-0.5 bg-surface-container text-[9px] font-bold uppercase tracking-tighter text-on-surface transition-colors duration-200 group-hover:bg-on-surface group-hover:text-surface">
      {label}
    </span>
  );
}
