// src/Hero.tsx
import { MarbleCanvas } from "./MarbleCanvas";
import { withBase } from "./lib/asset";

export default function Hero() {
  return (
    <section className="relative flex h-[calc(100vh-80px)] w-full bg-[#F4F1EA] overflow-hidden">
      {/* ───────── Left: Marble ───────── */}
      <div className="relative h-full w-[28vw] min-w-[240px] overflow-hidden">
        <MarbleCanvas />
      </div>

      {/* ───────── Right: Copy ───────── */}
      <div className="relative flex flex-1 items-center justify-end px-8 md:px-16 lg:px-24">
        <div className="w-full max-w-[640px] text-right">
          <div className="mb-12">
            <p
              className="italic leading-[1.05] text-[#2D2D2D]"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(40px, 4vw, 56px)",
                letterSpacing: "0.03em",
              }}
            >
              Melt the shapes.
            </p>
            <p
              className="font-semibold leading-[0.9] text-[#000000]"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(48px, 6vw, 88px)",
                letterSpacing: "-0.03em",
              }}
            >
              Reveal the <span className="text-[#DC282D]">form</span>.
            </p>
          </div>
        </div>
      </div>

      {/* ───────── Bottom-right: shape + star ───────── */}
      <div className="pointer-events-none fixed bottom-6 right-6 z-30">
        <div
          style={{
            position: "relative",
            width: "160px",
            height: "160px",
            overflow: "hidden",
          }}
        >
          {/* public/shape.png を BASE_URL 経由で参照 */}
          <img
            src={withBase("shape.png")}
            alt="shape"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
          {/* public/star.png を BASE_URL 経由で参照（ちょこんと 200px） */}
          <img
            src={withBase("star.png")}
            alt="star"
            style={{
              position: "absolute",
              right: "-4px",
              bottom: "-4px",
              width: "200px",
              height: "200px",
              objectFit: "contain",
              opacity: 0.9,
            }}
          />
        </div>
      </div>
    </section>
  );
}
