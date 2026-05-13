import { useEffect } from 'react';

export function useAnimate() {
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-animate], [data-animate-stagger]'),
    );

    // Immediately reveal anything already in the viewport — don't wait for the
    // async IntersectionObserver callback which can miss the first paint.
    const vh = window.innerHeight;
    targets.forEach((el) => {
      if (el.getBoundingClientRect().top < vh) {
        el.classList.add('is-visible');
      }
    });

    // Use IntersectionObserver for elements that scroll into view later.
    const remaining = targets.filter((el) => !el.classList.contains('is-visible'));
    if (remaining.length === 0) return;

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
    remaining.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
