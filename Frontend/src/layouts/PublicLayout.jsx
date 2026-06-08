import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBer";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default PublicLayout;

