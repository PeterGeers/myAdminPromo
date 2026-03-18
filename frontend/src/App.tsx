/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Loader2, Download, RefreshCw, Layout, Moon, Sun, Shield, BarChart3, ReceiptText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewTheme, setPreviewTheme] = useState<'light' | 'dark'>('light');
  const [variant, setVariant] = useState<'full' | 'icon'>('full');
  const [isTransparentSim, setIsTransparentSim] = useState(true);

  const generateLogo = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: variant === 'full' 
                ? `A professional, fintech-style logo for 'myAdmin', an integrated platform for vacation rental hosts. 
                The logo consists of a geometric, memorable logomark and a wordmark. 
                The logomark uses clean lines and subtle geometric shapes that hint at data, charts, or flow, conveying trust and approachability. 
                The wordmark 'myAdmin' uses a clean sans-serif typeface, with 'my' in a lighter weight or muted indigo and 'Admin' in a bold ${previewTheme === 'dark' ? 'white' : 'deep blue'}. 
                Color palette: ${previewTheme === 'dark' ? 'bright teal, electric indigo, and white' : 'deep blue, teal, and indigo tones'}. 
                Minimalist, high resolution, professional but not corporate. 
                IMPORTANT: The logo must be centered on a solid ${previewTheme === 'dark' ? 'PURE BLACK (#000000)' : 'PURE WHITE (#FFFFFF)'} background. 
                No generic property or house icons, no red or orange colors, no playful or complex illustrations.`
                : `A professional, fintech-style standalone app icon (logomark) for 'myAdmin'. 
                The icon is a geometric, memorable mark without any text or wordmark. 
                It uses clean lines and subtle geometric shapes that hint at data, charts, or flow, conveying trust and approachability. 
                Color palette: ${previewTheme === 'dark' ? 'bright teal, electric indigo, and white' : 'deep blue, teal, and indigo tones'}. 
                Minimalist, high resolution, professional but not corporate. 
                IMPORTANT: The icon must be centered and isolated on a solid ${previewTheme === 'dark' ? 'PURE BLACK (#000000)' : 'PURE WHITE (#FFFFFF)'} background. 
                No text, no generic property or house icons, no red or orange colors, no playful or complex illustrations.`,
            },
          ],
        },
      });

      let foundImage = false;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64Data = part.inlineData.data;
          setImageUrl(`data:image/png;base64,${base64Data}`);
          foundImage = true;
          break;
        }
      }

      if (!foundImage) {
        throw new Error("No image was generated. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Failed to generate logo");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generateLogo();
  }, []);

  return (
    <div className="min-h-screen bg-app-bg text-app-text font-sans selection:bg-teal-100">
      {/* Header */}
      <header className="border-b border-black/5 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold tracking-tight text-lg">myAdmin <span className="text-black/40 font-normal">Brand Kit</span></span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setPreviewTheme(prev => prev === 'light' ? 'dark' : 'light')}
              className="p-2 hover:bg-black/5 rounded-full transition-colors"
              title="Toggle Preview Theme"
            >
              {previewTheme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button 
              onClick={generateLogo}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full font-medium hover:bg-black/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="animate-spin" size={18} /> : <RefreshCw size={18} />}
              Regenerate
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Info */}
          <div className="lg:col-span-1 space-y-8">
            <section>
              <h1 className="text-4xl font-bold tracking-tight mb-4">The myAdmin Identity</h1>
              <p className="text-black/60 leading-relaxed">
                A trustworthy and approachable fintech identity for vacation rental hosts in the Netherlands. 
                Seamlessly blending Airbnb/Booking.com analytics with professional bookkeeping and tax compliance.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-black/40">Variant</h2>
              <div className="flex p-1 bg-black/5 rounded-2xl">
                <button 
                  onClick={() => {
                    setVariant('full');
                    if (variant !== 'full') generateLogo();
                  }}
                  className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all ${variant === 'full' ? 'bg-white shadow-sm text-black' : 'text-black/40 hover:text-black'}`}
                >
                  Full Logo
                </button>
                <button 
                  onClick={() => {
                    setVariant('icon');
                    if (variant !== 'icon') generateLogo();
                  }}
                  className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all ${variant === 'icon' ? 'bg-white shadow-sm text-black' : 'text-black/40 hover:text-black'}`}
                >
                  Icon Only
                </button>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-black/40">Core Pillars</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-black/5 shadow-sm">
                  <BarChart3 className="text-blue-500" size={20} />
                  <span className="font-medium">Rental Analytics</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-black/5 shadow-sm">
                  <ReceiptText className="text-teal-500" size={20} />
                  <span className="font-medium">Financial Admin</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-black/5 shadow-sm">
                  <Shield className="text-indigo-500" size={20} />
                  <span className="font-medium">Tax Compliance</span>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-black/40">Color Palette</h2>
              <div className="flex gap-2">
                <div className="w-12 h-12 rounded-lg bg-brand-blue shadow-inner" title="Deep Blue"></div>
                <div className="w-12 h-12 rounded-lg bg-brand-teal shadow-inner" title="Teal"></div>
                <div className="w-12 h-12 rounded-lg bg-brand-indigo shadow-inner" title="Indigo"></div>
                <div className="w-12 h-12 rounded-lg bg-brand-offwhite border border-black/10 shadow-inner" title="Off-White"></div>
              </div>
            </section>
          </div>

          {/* Right Column: Logo Preview */}
          <div className="lg:col-span-2 space-y-6">
            <div className={`relative aspect-video rounded-[32px] overflow-hidden transition-colors duration-500 flex items-center justify-center border border-black/5 shadow-2xl ${previewTheme === 'light' ? 'bg-white' : 'bg-preview-dark'}`}>
              {/* Checkered Background for Transparency Preview */}
              <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'conic-gradient(#000 0 25%, #ccc 0 50%, #000 0 75%, #ccc 0)', backgroundSize: '24px 24px' }}></div>
              
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div 
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <Loader2 className="animate-spin text-blue-500" size={48} />
                    <p className="text-sm font-medium text-black/40">Crafting your identity...</p>
                  </motion.div>
                ) : error ? (
                  <motion.div 
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center p-8"
                  >
                    <p className="text-red-500 font-medium mb-4">{error}</p>
                    <button onClick={generateLogo} className="text-blue-500 hover:underline">Try again</button>
                  </motion.div>
                ) : imageUrl ? (
                  <motion.div 
                    key="logo"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full h-full flex items-center justify-center p-12"
                  >
                    <img 
                      src={imageUrl} 
                      alt="myAdmin Logo" 
                      className="max-w-full max-h-full object-contain"
                      style={{ mixBlendMode: isTransparentSim ? (previewTheme === 'light' ? 'multiply' : 'screen') : 'normal' }}
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {/* Theme Badge */}
              <div className="absolute bottom-6 left-6 flex gap-2">
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${previewTheme === 'light' ? 'bg-black/5 text-black/40' : 'bg-white/10 text-white/40'}`}>
                  {variant === 'full' ? 'Full Logo' : 'App Icon'} • {previewTheme} Preview
                </div>
                {isTransparentSim && (
                  <div className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-teal-500/10 text-teal-600 border border-teal-500/20">
                    Transparency Active
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-black/40">Simulation</span>
                  <button 
                    onClick={() => setIsTransparentSim(!isTransparentSim)}
                    className={`text-sm font-medium transition-colors ${isTransparentSim ? 'text-teal-600' : 'text-black/40'}`}
                  >
                    {isTransparentSim ? 'Transparency On' : 'Transparency Off'}
                  </button>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-black/40">Format</span>
                  <span className="text-sm font-medium">PNG Transparent</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-black/40">Style</span>
                  <span className="text-sm font-medium">Minimal SaaS</span>
                </div>
              </div>
              <button 
                onClick={() => {
                  if (imageUrl) {
                    const link = document.createElement('a');
                    link.href = imageUrl;
                    link.download = `myAdmin-${variant}.png`;
                    link.click();
                  }
                }}
                disabled={!imageUrl}
                className="flex items-center gap-2 px-6 py-3 bg-white border border-black/10 rounded-2xl font-semibold shadow-sm hover:shadow-md hover:bg-black/5 transition-all disabled:opacity-50"
              >
                <Download size={18} />
                Download Assets
              </button>
            </div>
          </div>
        </div>

        {/* Brand Guidelines Section */}
        <section className="mt-24 pt-12 border-t border-black/5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="font-bold text-xl mb-4">Typography</h3>
              <p className="text-sm text-black/60 leading-relaxed">
                We use a clean, geometric sans-serif to convey precision and modernity. 
                The wordmark uses weight to distinguish between the personal "my" and the professional "Admin".
              </p>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-4">The Symbol</h3>
              <p className="text-sm text-black/60 leading-relaxed">
                A geometric and memorable logomark that hints at data flow and charts. 
                Designed to work as a standalone app icon, conveying fintech-level reliability and precision.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-4">Usage</h3>
              <p className="text-sm text-black/60 leading-relaxed">
                The logo is designed to be legible at all scales, from browser favicons to large-scale physical signage. 
                Always maintain clear space around the mark.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-black/5 flex justify-between items-center text-black/40 text-xs">
        <p>© 2026 myAdmin SaaS Platform. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-black transition-colors">Privacy</a>
          <a href="#" className="hover:text-black transition-colors">Terms</a>
          <a href="#" className="hover:text-black transition-colors">Security</a>
        </div>
      </footer>
    </div>
  );
}
