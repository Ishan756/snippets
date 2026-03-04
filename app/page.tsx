"use client";

import { Icons } from "@/components/icons";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { ArrowRight, Code2, GitBranch, Share2, Search, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const { data: session } = useSession();
  const [snippets, setSnippets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const response = await fetch("/api/snippets?sort=likes&limit=6");
        if (response.ok) {
          const data = await response.json();
          setSnippets(data);
        }
      } catch (error) {
        console.error("Failed to fetch snippets:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSnippets();
  }, []);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-background flex flex-col relative overflow-hidden">
      {/* Background Effects (Cool Stuff) */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        {/* Animated Glows */}
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" 
        />
      </div>

      {/* Hero Section - Clean & Centered */}
      <section className="container mx-auto px-6 py-24 lg:py-32 flex flex-col items-center text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl space-y-8"
        >
          <div className="space-y-4">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[11px] tracking-[0.4em] uppercase text-primary font-semibold"
            >
              The Hub for College Assignments & Tools
            </motion.p>
            <h1 className="text-5xl lg:text-7xl font-extralight leading-[1.1] tracking-tighter text-foreground">
              CodeSnippets collections as a{" "}
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="italic font-light text-primary/80 relative inline-block"
              >
                blank canvas
                <motion.div 
                  className="absolute -bottom-2 left-0 w-full h-px bg-primary/30"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 1.5 }}
                />
              </motion.span> {" "}
              for developers.
            </h1>
          </div>
          
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto font-light">
            A repository evolving through shared intelligence. Find, share, and optimize 
            logic blocks for your next big project or assignment.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button asChild size="lg" className="rounded-full px-8 h-12 text-sm font-medium tracking-wide shadow-xl shadow-primary/20 hover:shadow-primary/30 active:scale-95 transition-all">
              <Link href="/snippets">
                <Search className="mr-2 h-4 w-4" />
                Browse Snippets
              </Link>
            </Button>
            {session && (
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-12 text-sm font-medium tracking-wide backdrop-blur-sm bg-background/50 hover:bg-background/80 transition-all">
                <Link href="/snippets/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New
                </Link>
              </Button>
            )}
          </div>
        </motion.div>
      </section>

      {/* Featured Gallery Section */}
      <section className="container mx-auto px-6 py-24 border-t border-border/10">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-3">
            <h2 className="text-3xl font-light tracking-tight">Recent Logic</h2>
            <p className="text-xs text-muted-foreground uppercase tracking-[0.2em]">
              Latest contributions from the network
            </p>
          </div>
          <Link href="/snippets" className="text-[10px] tracking-[0.3em] uppercase hover:text-primary transition-colors flex items-center gap-2 group">
            All Collections
            <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="h-[200px] bg-muted/20 animate-pulse rounded-lg" />
            ))
          ) : (
            snippets.slice(0, 3).map((snippet: any) => (
              <Link 
                key={snippet.id} 
                href={`/snippets/${snippet.id}`}
                className="group p-6 bg-muted/5 border border-border/40 hover:border-primary/30 transition-all rounded-lg hover:shadow-2xl hover:shadow-primary/5"
              >
                <div className="flex justify-between items-start mb-6">
                  <Badge variant="secondary" className="text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-sm">
                    {snippet.language}
                  </Badge>
                  <p className="text-[10px] font-mono text-muted-foreground">
                    {formatDistanceToNow(new Date(snippet.createdAt), { addSuffix: true })}
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-light group-hover:text-primary transition-colors">{snippet.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {snippet.description}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-muted/5 py-32 mt-auto border-t border-border/5">
        <div className="container mx-auto px-6 text-center space-y-12">
            <Icons.sparkles className="h-6 w-6 mx-auto text-primary animate-pulse" />
            <p className="text-xl lg:text-2xl text-foreground/80 max-w-2xl mx-auto leading-relaxed font-extralight italic">
              "Logic is the beginning of wisdom, not the end."
            </p>
            <div className="flex justify-center gap-12 pt-8 opacity-20 group-hover:opacity-100 transition-opacity">
               <Share2 className="h-5 w-5 hover:text-primary transition-colors cursor-pointer" />
               <Code2 className="h-5 w-5 hover:text-primary transition-colors cursor-pointer" />
               <GitBranch className="h-5 w-5 hover:text-primary transition-colors cursor-pointer" />
            </div>
        </div>
      </section>
    </div>
  );
}
