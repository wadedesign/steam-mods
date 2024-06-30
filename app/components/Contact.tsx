// app/components/Contact.tsx

'use client';

import React, { useState } from 'react';
import { Mail, Handshake, Gamepad, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

const ContactMethod = ({ icon: Icon, title, description, link, linkText }: { icon: any, title: string, description: string, link?: string, linkText?: string }) => (
  <motion.div
    className="flex items-start space-x-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Icon size={32} className="text-primary" />
    <div>
      <h4 className="text-lg font-medium">{title}</h4>
      <p className="text-sm">{description}</p>
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
          {linkText}
        </a>
      )}
    </div>
  </motion.div>
);

const Contact = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, message }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: "We've received your message and will get back to you soon.",
        });
        setEmail('');
        setMessage('');
      } else {
        toast({
          title: "Error",
          description: result.message,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Contact Us</CardTitle>
            <CardDescription>Were excited to hear from you! Reach out through any of these channels:</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ContactMethod
                icon={Handshake}
                title="Join our Discord"
                description="Connect with us and the community on our Discord server."
                link="https://discord.gg/your-discord-link"
                linkText="Join Discord"
              />
              <ContactMethod
                icon={Mail}
                title="Email Us"
                description="Send us an email for any inquiries or support."
                link="mailto:contact@deltamod.com"
                linkText="contact@deltamod.com"
              />
              <ContactMethod
                icon={Gamepad}
                title="Delta Co Gaming"
                description="Join our gaming servers where we play and run private servers using our own infrastructure. Games like Arma 3, Project Zomboid, and more!"
              />
            </div>
          </CardContent>
          <Separator className="my-6" />
          <CardFooter>
            <form onSubmit={handleSubmit} className="space-y-4 w-full">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Send Message <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Contact;
