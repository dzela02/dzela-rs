import { useEffect } from 'react';

export function useAnimate() {
  useEffect(() => {
    const targets = document.querySelectorAll('[data-animate], [data-animate-stagger]');
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
