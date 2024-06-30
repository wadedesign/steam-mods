import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Info from '../components/Info';

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        {/* Add your page content here */}
        <Info />
      </div>
      <Footer />
    </div>
  );
}
