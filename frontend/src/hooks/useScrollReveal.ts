import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    // Use requestAnimationFrame to defer observation until after the browser has
    // fully painted and React has completed hydration. Without this, the observer
    // fires immediately on mount and adds classes before hydration is complete,
    // causing SSR mismatch warnings.
    let rafId: number;
    let observer: IntersectionObserver;

    rafId = requestAnimationFrame(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("reveal--visible");
            }
          });
        },
        {
          threshold: 0.04,
          rootMargin: "0px 0px -20px 0px",
        },
      );

      // Watch key structural sections, cards, steps, and list elements
      const targets = document.querySelectorAll(
        "section, .service-block, .process__step, .testimonial-primary, .testimonial-secondary, .plan-card, .about__stat, .calc-container, .form-card, .why__item, .claim-step, .trust-bar__inner span",
      );

      targets.forEach((el) => {
        observer.observe(el);
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);
}
