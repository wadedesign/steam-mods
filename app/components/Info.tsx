// app/components/Info.tsx

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Search, Shield, Code } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Card className="h-full">
      <CardHeader>
        <Icon className="w-12 h-12 text-primary mb-2" />
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  </motion.div>
);

const Info = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to Delta Mod</h1>
          <p className="text-xl text-gray-600 mb-6">
            The modern solution for Steam Workshop mod management
          </p>
          <Badge variant="secondary" className="text-lg py-1 px-3">
            Est. 2024
          </Badge>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-12">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Why We Built Delta Mod</h2>
              <p className="text-gray-700 mb-4">
                As avid gamers and server administrators, we noticed a gap in the mod management landscape. 
                Many communities rely on outdated, sketchy-looking websites to find mod names and Workshop IDs. 
                We believed it was time for a change.
              </p>
              <p className="text-gray-700">
                Delta Mod was born out of the need for a reliable, modern, and user-friendly tool to streamline 
                the process of managing Steam Workshop mods for server communities. Weve combined cutting-edge 
                technology with a sleek design to create a tool thats not only functional but also a joy to use.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <FeatureCard
            icon={Activity}
            title="Steam Integration"
            description="Seamlessly connects with Steam Workshop for up-to-date mod information."
          />
          <FeatureCard
            icon={Search}
            title="Efficient Search"
            description="Quickly find the mods you need with our powerful search functionality."
          />
          <FeatureCard
            icon={Shield}
            title="Secure & Reliable"
            description="Say goodbye to sketchy websites. Delta Mod is open-source and trustworthy."
          />
          <FeatureCard
            icon={Code}
            title="Modern Tech Stack"
            description="Built with Next.js, TypeScript, and shadcn/ui for a robust, scalable solution."
          />
        </motion.div>

        <motion.div variants={itemVariants} className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Upgrade Your Mod Management?</h2>
          <Button size="lg" className="text-lg px-8">
            Get Started with Delta Mod
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Info;