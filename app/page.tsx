// app/page.tsx
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Steam from './components/Steam';
import { generateMetadata } from './components/SEOHead';

export const metadata = generateMetadata({
  title: 'Home - Steam Workshop Mod Fetcher',
  description: 'Fetch and display mod details from the Steam Workshop community pack.',
  url: 'https://steam-mods.wadedev.us/',
  imageUrl: 'https://steam-mods.wadedev.us/seo/seoimage.png',
});

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        {/* where to add content */}
        <Steam />
      </div>
      <Footer />
    </div>
  );
}
