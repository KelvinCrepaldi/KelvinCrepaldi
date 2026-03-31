import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative z-10 px-6 md:px-12 pt-24 pb-28">
      <div className="w-full lg:max-w-5xl lg:mx-auto">
        <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-outline">
          ERROR_PROTOCOL // 404_NOT_FOUND
        </p>
        <h1 className="mt-4 text-4xl md:text-6xl font-black uppercase tracking-tighter text-on-surface">
          Página não encontrada
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-on-surface/70">
          O recurso solicitado não existe (ou foi movido). Você pode voltar para
          a home e continuar navegando pelo arquivo.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center border border-outline-variant/40 bg-surface-container-low/80 px-4 py-3 text-xs font-bold uppercase tracking-widest text-on-surface hover:bg-surface-container-low hover:border-outline-variant/70 transition-colors"
          >
            Voltar para home
          </Link>
        </div>
      </div>
    </main>
  );
}

