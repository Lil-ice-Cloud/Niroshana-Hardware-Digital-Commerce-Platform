import Navbar from "@/components/ui/Navbar/Navbar";
import TopPanel from "@/components/ui/Top-Panel/Top-Panel"

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
