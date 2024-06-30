import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Contact from '../components/Contact';

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        {/* Add your page content here */}
        <Contact />
      </div>
      <Footer />
    </div>
  );
}
