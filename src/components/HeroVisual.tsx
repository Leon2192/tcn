import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ErrorBoundary } from "./UI";
import { Logo } from "./Logo";
const Scene = lazy(() => import("../scenes/EmblemScene"));
function Fallback() {
  return (
    <div className="emblem-fallback">
      <Logo variant="icon" />
    </div>
  );
}
export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const element = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        try {
          const canvas = document.createElement("canvas");
          const context =
            canvas.getContext("webgl2") ?? canvas.getContext("webgl");
          setReady(Boolean(context));
          context?.getExtension("WEBGL_lose_context")?.loseContext();
        } catch {
          setReady(false);
        }
        observer.disconnect();
      }
    });
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <div className="hero-visual" ref={ref}>
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <span className="visual-coordinate">TCN® / CONCEPT 001</span>
      <ErrorBoundary fallback={<Fallback />}>
        <Suspense fallback={<Fallback />}>
          {ready ? <Scene /> : <Fallback />}
        </Suspense>
      </ErrorBoundary>
      <span className="visual-label">
        THE CABIN NATION<span>ENTERTAINMENT, REIMAGINED.</span>
      </span>
      <span className="visual-cross cross-one">+</span>
      <span className="visual-cross cross-two">+</span>
    </div>
  );
}
