"use client";

import { Outlet } from "react-router-dom";
import Header from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
// import { useScrollToTop } from "@/hooks/useScrollToTop";

const MainLayout = () => {
  // useScrollToTop();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
