import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation({
  containerRef,
  headlineRef,
  subtitleRef,
  visualContainerRef,
  visualInnerRef,
  layer1Ref,
  layer2Ref,
  layer3Ref,
  orbRef,
  statsContainerRef,
  statsRefs
}) {
  useEffect(() => {
    // 1. Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Use gsap.context for clean scoping and easy unmount cleanup
    const ctx = gsap.context(() => {
      
      // ================= INITIAL LOAD TIMELINE =================
      const loadTl = gsap.timeline({
        defaults: { ease: 'power3.out' }
      });

      // Split headline letters or words stagger reveal
      const headlineWords = headlineRef.current?.querySelectorAll('.headline-word') || headlineRef.current;

      loadTl
        // Reveal Subtitle Badge
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.8 }
        )
        // Stagger Reveal "W E L C O M E  I T Z F I Z Z"
        .fromTo(
          headlineWords,
          { opacity: 0, y: 35, rotateX: -25 },
          { opacity: 1, y: 0, rotateX: 0, duration: 1.0, stagger: 0.08 },
          '-=0.5'
        )
        // Centerpiece 3D Visual Entrance
        .fromTo(
          visualContainerRef.current,
          { opacity: 0, scale: 0.85, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power4.out' },
          '-=0.7'
        )
        // Statistics Cards Stagger Entrance
        .fromTo(
          statsRefs.current.filter(Boolean),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'back.out(1.4)' },
          '-=0.8'
        );

      // If user prefers reduced motion, skip scroll pinning scrub
      if (prefersReducedMotion) return;

      // ================= SCROLL-DRIVEN SCRAMBLE / SCRUB TIMELINE =================
      const isMobile = window.innerWidth < 768;
      const scrollDistance = isMobile ? '+=1400' : '+=2200';

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: scrollDistance,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      // --- PHASE 1 (0% -> 30% Scroll): Headline Recedes & Visual Tilts 3D ---
      scrollTl
        .to(headlineRef.current, {
          y: -60,
          opacity: 0.25,
          scale: 0.92,
          duration: 0.3
        }, 0)
        .to(statsContainerRef.current, {
          y: 40,
          scale: 0.96,
          duration: 0.3
        }, 0)
        .to(visualInnerRef.current, {
          rotateX: isMobile ? 12 : 22,
          rotateY: isMobile ? -10 : -20,
          scale: isMobile ? 1.02 : 1.08,
          duration: 0.4
        }, 0)
        .to(orbRef.current, {
          scale: 1.6,
          opacity: 0.8,
          duration: 0.4
        }, 0);

      // --- PHASE 2 (30% -> 70% Scroll): 3D Layer Explosion & Spatial Shift ---
      scrollTl
        // Layer 1 (Back Code Matrix) recedes in 3D
        .to(layer1Ref.current, {
          z: -120,
          y: -20,
          opacity: 0.6,
          duration: 0.4
        }, 0.3)
        // Layer 2 (Middle Glass Panel) elevates & transforms
        .to(layer2Ref.current, {
          z: 60,
          borderColor: 'rgba(6, 182, 212, 0.6)',
          boxShadow: '0 30px 80px rgba(6, 182, 212, 0.4)',
          duration: 0.4
        }, 0.3)
        // Layer 3 (Foreground Floating Chips) explode outward
        .to(layer3Ref.current, {
          z: 160,
          scale: 1.15,
          rotateZ: 4,
          duration: 0.4
        }, 0.3)
        // Parallax outward shift for stats cards
        .to(statsRefs.current[0], { x: -25, y: 15, duration: 0.4 }, 0.3)
        .to(statsRefs.current[1], { x: -10, y: 25, duration: 0.4 }, 0.3)
        .to(statsRefs.current[2], { x: 10, y: 25, duration: 0.4 }, 0.3)
        .to(statsRefs.current[3], { x: 25, y: 15, duration: 0.4 }, 0.3);

      // --- PHASE 3 (70% -> 100% Scroll): Realignment into Final Focus ---
      scrollTl
        .to(visualInnerRef.current, {
          rotateX: 0,
          rotateY: 0,
          scale: isMobile ? 1.05 : 1.15,
          duration: 0.3
        }, 0.7)
        .to(layer1Ref.current, { z: -30, opacity: 0.9, duration: 0.3 }, 0.7)
        .to(layer2Ref.current, { z: 10, duration: 0.3 }, 0.7)
        .to(layer3Ref.current, { z: 40, scale: 1, rotateZ: 0, duration: 0.3 }, 0.7)
        .to([headlineRef.current, statsContainerRef.current], {
          opacity: 0.1,
          duration: 0.3
        }, 0.7);

    }, containerRef); // Scope context to containerRef

    return () => ctx.revert(); // Clean up GSAP context on unmount
  }, [
    containerRef,
    headlineRef,
    subtitleRef,
    visualContainerRef,
    visualInnerRef,
    layer1Ref,
    layer2Ref,
    layer3Ref,
    orbRef,
    statsContainerRef,
    statsRefs
  ]);
}
