"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

import { useIsMobileLayout } from "@/hooks/useIsMobileLayout";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isProjectsRoute = pathname.startsWith("/projects");
  const isMobile = useIsMobileLayout();

  if (isProjectsRoute) {
    return <div className="relative z-[5] min-h-0">{children}</div>;
  }

  const motionProps = isMobile
    ? {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        transition: {
          duration: 0.32,
          ease: [0.22, 1, 0.36, 1] as const,
        },
      }
    : {
        initial: { opacity: 0, y: 20, filter: "blur(6px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        exit: { opacity: 0, y: -16, filter: "blur(6px)" },
        transition: {
          duration: 0.42,
          ease: [0.22, 1, 0.36, 1] as const,
        },
      };

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="relative z-[5] min-h-0" {...motionProps}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
