import {
  Hero,
  Projects,
  Skills,
  SystemLogs,
  Timeline,
} from "@/_components/sections";
import { LazyRenderOnView } from "@/_components/_ui/LazyRenderOnView";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LazyRenderOnView placeholderClassName="min-h-[70vh]">
        <Projects />
      </LazyRenderOnView>
      <LazyRenderOnView placeholderClassName="min-h-[60vh]">
        <Timeline />
      </LazyRenderOnView>
      <LazyRenderOnView placeholderClassName="min-h-[56vh]">
        <Skills />
      </LazyRenderOnView>
      <LazyRenderOnView placeholderClassName="min-h-[52vh]">
        <SystemLogs />
      </LazyRenderOnView>
    </>
  );
}
