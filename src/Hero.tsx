// src/Hero.tsx
import { MarbleCanvas } from "./MarbleCanvas";

export default function Hero() {
  return (
    <section
      className="relative w-full bg-[#F4F1EA] overflow-hidden"
      style={{ minHeight: "100vh", display: "flex" }} // ← 強制的に横並び
    >
      {/* ───────── Left: Marble（画面の左側ぜんぶ） ───────── */}
      <div
        className="relative overflow-hidden"
        style={{
          width: "26vw",    // 左カラムの幅
          minWidth: 260,
          height: "100vh",  // 画面の高さぜんぶ
        }}
      >
        <MarbleCanvas />
      </div>

      {/* ───────── Right: Copy ───────── */}
      <div
        className="relative flex-1 px-8 md:px-16 lg:px-24"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="w-full max-w-[720px] text-left">
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

      {/* ───────── Bottom-right: Shape + Star ───────── */}
      <div className="pointer-events-none fixed bottom-6 right-6 z-30">
        <div
          style={{
            position: "relative",
            width: "160px",
            height: "160px",
            overflow: "visible",
          }}
        >
          {/* shape */}
          <img
            src="/shape.png"
            alt="shape"
            style={{
              width: "160px",
              height: "auto",
              display: "block",
            }}
          />

          {/* star（200px のまま） */}
          <img
            src="/star.png"
            alt="star"
            style={{
              position: "absolute",
              right: "-40px",
              bottom: "-40px",
              width: "200px",
              height: "200px",
              opacity: 0.9,
              objectFit: "contain",
            }}
          />
        </div>
      </div>
    </section>
  );
}
