import Hero from "./Hero";
import Footer from "./Footer";
import CursorDot from "./CursorDot";

export default function App() {
  return (
    <main className="min-h-screen w-screen bg-[#F4F1EA] flex flex-col overflow-x-hidden">
      {/* “少し遅れる”感じを強めに */}
      <CursorDot size={30} color="#B4CDD7" opacity={0.35} lerp={0.12} />

      <Hero />
      <Footer />
    </main>
  );
}
