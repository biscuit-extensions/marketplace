
/**
 * Precision SVG crosshair tick mark for corners and grid intersections.
 */
export function Crosshair({
  className = "text-zinc-600",
  size = 11,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none pointer-events-none ${className}`}
    >
      <path
        d="M5.5 0V11M0 5.5H11"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
      />
    </svg>
  );
}

/**
 * 4 Corner crosshairs positioned at the four corners of a relative container.
 */
export function CornerCrosshairs({
  className = "text-zinc-700/80 group-hover:text-amber-400/70 transition-colors",
  offset = "-translate-x-1/2 -translate-y-1/2",
}: {
  className?: string;
  offset?: string;
}) {
  return (
    <>
      <div className={`absolute top-0 left-0 ${offset} z-10 pointer-events-none`}>
        <Crosshair className={className} />
      </div>
      <div className={`absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none`}>
        <Crosshair className={className} />
      </div>
      <div className={`absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 z-10 pointer-events-none`}>
        <Crosshair className={className} />
      </div>
      <div className={`absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 z-10 pointer-events-none`}>
        <Crosshair className={className} />
      </div>
    </>
  );
}

/**
 * Technical geometric grid backdrop with coordinate lines and subtle gradient fade.
 */
export function GeometricGridBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* 40px Geometric Line Grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 15%, #000 60%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 15%, #000 60%, transparent 100%)",
        }}
      />

      {/* Primary Vertical Guideline Accents */}
      <div className="container mx-auto max-w-7xl h-full relative">
        <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-white/[0.04]" />
        <div className="absolute right-4 sm:right-6 top-0 bottom-0 w-px bg-white/[0.04]" />
      </div>
    </div>
  );
}
