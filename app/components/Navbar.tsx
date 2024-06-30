'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Menu, X } from 'lucide-react';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type ReleaseNote = {
  id: number;
  name: string;
  tag_name: string;
  body: string;
};

const fetchReleaseNotes = async (): Promise<ReleaseNote[]> => {
  const response = await fetch('/api/releases');
  if (!response.ok) {
    throw new Error('Failed to fetch release notes');
  }
  const data = await response.json();
  console.log('Fetched release notes:', data);
  return data;
};

const NavItem = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
    {children}
  </Link>
);

const Navbar = () => {
  const [version, setVersion] = useState<string>('Loading...');
  const [changelog, setChangelog] = useState<ReleaseNote[]>([]);

  useEffect(() => {
    fetchReleaseNotes()
      .then(data => {
        if (data.length > 0) {
          setVersion(data[0].tag_name);
          setChangelog(data);
        } else {
          setVersion('No version found');
        }
      })
      .catch(error => {
        console.error(error);
        setVersion('Error fetching version');
      });
  }, []);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/whywe', label: 'Why we Built' },
    { href: '/contact', label: 'Contact' },
    { href: '/api', label: 'API', badge: 'Coming Soon' },
  ];

  return (
    <div className="p-4">
      <motion.nav
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-background rounded-lg shadow-lg border border-border"
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-primary">
            DeltaMod
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {navItems.map((item) => (
              <NavItem key={item.href} href={item.href}>
                {item.label}
                {item.badge && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {item.badge}
                  </Badge>
                )}
              </NavItem>
            ))}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">Changelog</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Changelog</SheetTitle>
                  <SheetDescription>Recent updates and improvements</SheetDescription>
                </SheetHeader>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Version {version}</h3>
                  {changelog.map(note => (
                    <div key={note.id} className="mb-4">
                      <h4 className="font-bold">{note.name}</h4>
                      <p>{note.body}</p>
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
            <a
              href="https://github.com/wadedesign/steam-mods"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github size={20} />
            </a>
            <span className="text-sm text-muted-foreground">{version}</span>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-4">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} className="text-lg font-medium text-primary">
                    {item.label}
                    {item.badge && (
                      <Badge variant="secondary" className="ml-2">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                ))}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline">Changelog</Button>
                  </SheetTrigger>
                  <SheetContent side="right">
                    <SheetHeader>
                      <SheetTitle>Changelog</SheetTitle>
                      <SheetDescription>Recent updates and improvements</SheetDescription>
                    </SheetHeader>
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold">Version {version}</h3>
                      {changelog.map(note => (
                        <div key={note.id} className="mb-4">
                          <h4 className="font-bold">{note.name}</h4>
                          <p>{note.body}</p>
                        </div>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
                <div className="flex items-center space-x-4">
                  <a
                    href="https://github.com/wadedesign/steam-mods"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    <Github size={24} />
                  </a>
                  <span className="text-sm text-muted-foreground">{version}</span>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;
