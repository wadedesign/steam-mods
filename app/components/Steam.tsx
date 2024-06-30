'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useSWR from 'swr';
import { Activity, Loader2, Copy } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Steam = () => {
  const [url, setUrl] = useState('');
  const { toast } = useToast();

  const { data, error, isValidating, mutate } = useSWR(
    url ? `/api/steam?url=${encodeURIComponent(url)}` : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    console.log('Data changed:', data);
    console.log('Error:', error);
    console.log('Is validating:', isValidating);
  }, [data, error, isValidating]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting URL:', url);
    await mutate();
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: "The text has been copied to your clipboard.",
      });
    } catch (err) {
      console.error('Failed to copy text: ', err);
      toast({
        title: "Copy failed",
        description: "Please try selecting the text manually and copying.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <Activity className="mr-2" /> Steam Workshop Mod Fetcher
          </CardTitle>
          <CardDescription>
            Enter a Steam Workshop URL to fetch mod details from the community pack.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-2">
              <Input
                type="url"
                placeholder="https://steamcommunity.com/sharedfiles/filedetails/?id=..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-grow"
                required
              />
              <Button type="submit" disabled={isValidating}>
                {isValidating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Fetch Mods'}
              </Button>
            </div>
          </form>
          {isValidating && (
            <motion.div variants={itemVariants} className="mt-4">
              Loading...
            </motion.div>
          )}
          {error && (
            <motion.div
              variants={itemVariants}
              className="mt-4 p-4 bg-red-100 text-red-700 rounded-md"
            >
              Error: {error.message}
            </motion.div>
          )}
          {data && !data.mods && (
            <motion.div
              variants={itemVariants}
              className="mt-4 p-4 bg-yellow-100 text-yellow-700 rounded-md"
            >
              No mods found or unexpected data structure.
            </motion.div>
          )}
          {data && data.mods && (
            <motion.div variants={itemVariants} className="mt-6">
              <p className="mb-4">Total mods: {data.mods.length}</p>
              <Tabs defaultValue="table">
                <TabsList>
                  <TabsTrigger value="table">Table View</TabsTrigger>
                  <TabsTrigger value="text">Text View</TabsTrigger>
                </TabsList>
                <TabsContent value="table">
                  <ScrollArea className="h-[400px] w-full">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Mod ID</TableHead>
                          <TableHead>Name</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data.mods.map((mod: { id: string; name: string }, index: number) => (
                          <TableRow key={index}>
                            <TableCell>{mod.id}</TableCell>
                            <TableCell>{mod.name}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="text">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Mod IDs</h3>
                      <div className="flex">
                        <Textarea
                          readOnly
                          value={data.mods.map((mod: { id: any; }) => mod.id).join('; ')}
                          className="flex-grow"
                        />
                        <Button
                          onClick={() => copyToClipboard(data.mods.map((mod: { id: any; }) => mod.id).join('; '))}
                          className="ml-2"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Mod Names</h3>
                      <div className="flex">
                        <Textarea
                          readOnly
                          value={data.mods.map((mod: { name: any; }) => mod.name).join('; ')}
                          className="flex-grow"
                        />
                        <Button
                          onClick={() => copyToClipboard(data.mods.map((mod: { name: any; }) => mod.name).join('; '))}
                          className="ml-2"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Steam;