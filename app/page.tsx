import {
  Hero,
  Projects,
  RecentLogs,
  Skills,
  Timeline,
} from "@/_components/sections";
import { ScrollToTop } from "@/_components/_ui/ScrollToTop";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Projects />
      <Timeline />
      <Skills />
      <RecentLogs />
      <ScrollToTop variant="above-footer" />
    </>
  );
}
