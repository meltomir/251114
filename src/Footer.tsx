// src/Footer.tsx
export default function Footer() {
  return (
    <footer className="w-full mt-10">
      <div className="mx-auto w-[92%] max-w-[1200px]">
        {/* 区切り線（ヘアライン風） */}
        <div
          aria-hidden="true"
          className="h-px w-full bg-gradient-to-r from-transparent via-[#2D2D2D]/15 to-transparent"
        />
        <p
          className="py-6 text-center text-sm text-[#2D2D2D]/70 tracking-wide"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          © 2025 meltomir. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
