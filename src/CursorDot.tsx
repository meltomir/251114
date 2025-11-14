// src/CursorDot.tsx
import { useEffect, useRef } from "react";

/**
 * 半透明の丸いカーソル。マウスに“少し遅れて”追従します。
 *
 * - size: 直径(px)
 * - color: 背景色（#B4CDD7 = 水色）
 * - opacity: 不透明度(0-1)
 * - lerp: 追従スピード(0-1) … 小さいほどゆっくり追従
 */
export default function CursorDot({
  size = 120,
  color = "#B4CDD7",
  opacity = 0.35,
  lerp = 0.12,
  hideDefaultCursor = false,
}: {
  size?: number;
  color?: string;
  opacity?: number;
  lerp?: number;
  hideDefaultCursor?: boolean;
}) {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = dotRef.current;
    if (!el) return;

    // 円の見た目
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.background = color;
    el.style.opacity = String(opacity);
    el.style.borderRadius = "9999px";

    let rafId = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let targetX = x;
    let targetY = y;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const tick = () => {
      // 緩やかに目的地へ（線形補間）
      x += (targetX - x) * lerp;
      y += (targetY - y) * lerp;
      el.style.transform = `translate3d(${x - size / 2}px, ${y - size / 2}px, 0)`;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, [size, color, opacity, lerp]);

  return (
    <div
      ref={dotRef}
      className={[
        "pointer-events-none fixed top-0 left-0 z-[60]",
        "hidden md:block",                 // モバイルは非表示（必要なら削除）
        "mix-blend-multiply",              // 背景となじませる
        "backdrop-saturate-150",
        "will-change-transform",
        hideDefaultCursor ? "cursor-none" : "",
      ].join(" ")}
      style={{
        boxShadow: "0 12px 40px rgba(0,0,0,0.12)", // ほんのり影（任意）
      }}
      aria-hidden="true"
    />
  );
}
