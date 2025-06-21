import React, { useMemo } from "react";
import { Wrench } from "lucide-react";

interface GooeyButtonProps {
  href: string;
  children?: React.ReactNode;
}

// Inspired from a Pen by Unleashed Design (https://codepen.io/Unleashed-Design/pen/gOrEvMV)
export function GooeyButton({ href, children }: GooeyButtonProps) {
  const bubbles = useMemo(() => {
    const arr: {
      left: number;
      size: number;
      duration: number;
      delay: number;
    }[] = [];
    for (let i = 0; i < 10; i++) {
      arr.push({
        left: Math.random() * 80 + 10, // 10% - 90%
        size: Math.random() * 16 + 16, // 16px - 32px
        duration: 3 + i * 0.2 + Math.random() * 1, // slightly different per bubble
        delay: i * 0.2,
      });
    }
    return arr;
  }, []);

  return (
    <div className="relative inline-block" style={{ filter: "url(#gooey)" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        className="absolute -left-[4000px] -top-[4000px]"
      >
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="highContrastGraphic"
            />
            <feComposite
              in="SourceGraphic"
              in2="highContrastGraphic"
              operator="atop"
            />
          </filter>
        </defs>
      </svg>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative inline-flex items-center justify-center px-6 py-3 text-lg font-semibold rounded-md text-white bg-sky-500 hover:bg-sky-600  transition-colors duration-300 select-none group"
      >
        <Wrench className="h-4 w-4 mr-2" />
        {children}
        <span className="absolute inset-0 pointer-events-none">
          {bubbles.map((b, idx) => (
            <span
              key={idx}
              className="absolute rounded-full bg-sky-500 opacity-80 group-hover:bg-sky-600 transition-colors duration-300"
              style={{
                left: `${b.left}%`,
                bottom: 0,
                width: `${b.size}px`,
                height: `${b.size}px`,
                animation: `bubbleMove ${b.duration}s infinite`,
                animationDelay: `${b.delay}s`,
                zIndex: -1,
                transformOrigin: "center bottom",
              }}
            />
          ))}
        </span>
      </a>
    </div>
  );
}
