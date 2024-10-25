"use client";
import { motion } from "framer-motion";
import Home from "@/components/Home";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8 md:py-16"
      >
        <header className="mb-8 md:mb-12 text-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-primary mb-2"
          >
            Email Campaign Manager
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl text-muted-foreground"
          >
            Create and send personalized emails with ease
          </motion.p>
        </header>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Home />
        </motion.div>
      </motion.div>
    </div>
  );
}
