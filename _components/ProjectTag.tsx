type ProjectTagProps = {
  label: string;
};

export function ProjectTag({ label }: ProjectTagProps) {
  return (
    <span className="px-2 py-1 bg-surface-container text-[10px] font-bold uppercase tracking-tighter text-on-surface transition-colors duration-200 group-hover:bg-[#363322] group-hover:text-[#fef9ed]">
      {label}
    </span>
  );
}
