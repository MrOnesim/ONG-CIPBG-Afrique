"use client";

import { useEffect, useRef } from "react";

type CountUpProps = {
  value: string;
  duration?: number;
};

export function CountUp({ value, duration = 1600 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      el.textContent = value;
      return;
    }

    const match = value.match(/^(\d+)(.*)$/);
    if (!match) {
      el.textContent = value;
      return;
    }

    const target = parseInt(match[1], 10);
    const suffix = match[2] || "";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const startTime = performance.now();

            const tick = (now: number) => {
              const progress = Math.min((now - startTime) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              el.textContent = `${Math.round(target * eased)}${suffix}`;
              if (progress < 1) requestAnimationFrame(tick);
            };

            requestAnimationFrame(tick);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    el.textContent = value;
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={ref} className="tabular-nums">{value}</span>;
}
