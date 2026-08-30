import Navbar from "@/components/ui/Header/Navbar/Navbar";
import TopPanel from "@/components/ui/Header/Top-Panel/Top-Panel"

export default function Home() {
  return (
    <>
      <main className="main-h-screen">
        <Navbar/>
          <TopPanel/>
      </main>
    </>
  );
}
