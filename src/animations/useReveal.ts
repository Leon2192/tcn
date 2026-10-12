import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../hooks/useReducedMotion";
gsap.registerPlugin(ScrollTrigger);
export function useReveal(
  ref: RefObject<HTMLElement | null>,
  dependency?: string,
) {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !ref.current) return;
    const context = gsap.context(() => {
      const opening = gsap.utils.toArray<HTMLElement>(
        ".hero-copy, .page-hero > *, .about-hero > div:first-child, .contact-intro > *",
      );
      if (opening.length)
        gsap.from(opening, {
          y: 16,
          duration: 0.7,
          stagger: 0.06,
          ease: "power3.out",
        });
      gsap.utils
        .toArray<HTMLElement>("[data-reveal]")
        .forEach((element) =>
          gsap.from(element, {
            y: 35,
            opacity: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 94%", once: true },
          }),
        );
      gsap.utils
        .toArray<HTMLElement>("[data-parallax]")
        .forEach((element) =>
          gsap.to(element, {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }),
        );
    }, ref);
    return () => context.revert();
  }, [ref, reduced, dependency]);
}
