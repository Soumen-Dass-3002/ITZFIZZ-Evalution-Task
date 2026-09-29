import React from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import Footer from './components/Footer.jsx';
import ReducedMotionNotice from './components/ReducedMotionNotice.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-[#080B11] text-slate-100 selection:bg-cyan-500 selection:text-black">
      <Header />
      <main>
        <Hero />
        <Services />
      </main>
      <Footer />
      <ReducedMotionNotice />
    </div>
  );
}
