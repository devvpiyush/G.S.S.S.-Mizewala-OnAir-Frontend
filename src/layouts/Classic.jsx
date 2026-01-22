// Dependencies
import { Outlet } from "react-router-dom";

// Local Components
import Navbar from "@components/Navbar";
import Navigation from "@components/Navigation";
import Hero from "@components/Hero";
import Footer from "@components/Footer";

function Classic() {
  return (
    <>
      <header className="sticky top-0 z-index-100 ">
        <Navbar />
      </header>
      <main className="min-h-screen">
        <Hero>
          <Outlet />
        </Hero>
        <Navigation />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default Classic;
