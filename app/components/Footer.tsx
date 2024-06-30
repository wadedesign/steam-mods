// app/components/Footer.tsx

import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Mail } from 'lucide-react';
import { Separator } from "@/components/ui/separator"

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background text-muted-foreground py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">DeltaMod</h3>
            <p className="text-sm">
              Easily fetch and manage Steam mod information with DeltaMod.
            </p>
          </div>
          <div>
            <h4 className="text-base font-medium text-primary mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/why-we-built-it" className="text-sm hover:text-primary transition-colors">Why We Built It</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/api" className="text-sm hover:text-primary transition-colors">API</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-base font-medium text-primary mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="https://github.com/yourusername/deltamod" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Github size={20} />
              </a>
              <a href="https://twitter.com/deltamod" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="mailto:contact@deltamod.com" className="hover:text-primary transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; {currentYear} wadedev.us All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-sm hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-sm hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;