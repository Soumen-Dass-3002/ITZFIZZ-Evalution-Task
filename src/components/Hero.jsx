import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroArtwork from '../assets/hero-sculpture.png';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const screenRef = useRef(null);
  const copyRef = useRef(null);
  const artworkRef = useRef(null);
  const orbitRef = useRef(null);
  const ruleRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const introTargets = gsap.utils.toArray('.hero-reveal');
      const metrics = gsap.utils.toArray('.hero-metric');

      if (reducedMotion) {
        gsap.set(introTargets, { autoAlpha: 1, clearProps: 'transform' });
        return;
      }

      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo('.site-header', { y: -22, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 })
        .fromTo(introTargets, { y: 34, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.85, stagger: 0.075 }, '-=0.35')
        .fromTo(metrics, { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.48, stagger: 0.1 }, '-=0.42')
        .fromTo(artworkRef.current, { x: 50, scale: 1.08, autoAlpha: 0 }, { x: 0, scale: 1, autoAlpha: 1, duration: 1.35, ease: 'power4.out' }, '-=0.88');

      gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${Math.round(window.innerHeight * 1.65)}`,
          pin: screenRef.current,
          scrub: 0.9,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
        .to(copyRef.current, { yPercent: -18, autoAlpha: 0.14, duration: 0.55 }, 0)
        .to(metrics, { y: (index) => index * 11 - 12, x: (index) => index * 8, autoAlpha: 0.38, duration: 0.55 }, 0)
        .to(artworkRef.current, { xPercent: 10, yPercent: -7, scale: 1.16, rotation: -4, duration: 0.8 }, 0)
        .to(orbitRef.current, { scale: 1.35, xPercent: 8, rotation: 16, duration: 0.8 }, 0)
        .to(ruleRef.current, { scaleX: 1, duration: 0.8 }, 0)
        .to('.hero-scroll-note', { autoAlpha: 0, y: 8, duration: 0.25 }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="hero-section" id="top">
      <div ref={screenRef} className="hero-screen">
        <header className="site-header">
          <a className="brand" href="#top" aria-label="Itzfizz home">ITZ<span>FIZZ</span></a>
          <nav aria-label="Primary navigation"><a href="#studio">Studio</a><a href="#work">Work</a><a href="#contact">Contact</a></nav>
          <a className="header-dot" href="#contact"><span /> Start a project</a>
        </header>

        <div className="hero-copy" ref={copyRef}>
          <p className="eyebrow hero-reveal">Independent digital studio · 2026</p>
          <p className="hero-wordmark hero-reveal">W E L C O M E <span>I T Z F I Z Z</span></p>
          <h1 className="hero-title"><span className="hero-reveal">We make</span><span className="hero-reveal hero-title--outline">presence</span><span className="hero-reveal">impossible <i>to ignore.</i></span></h1>
          <div className="hero-meta hero-reveal"><p>Digital experiences for brands who would rather set the pace than follow it.</p><a href="#studio" className="round-link" aria-label="Explore the studio">↓</a></div>
          <div className="hero-metrics" aria-label="Impact metrics">
            <article className="hero-metric"><strong>58%</strong><span>more meaningful engagement</span></article>
            <article className="hero-metric"><strong>27%</strong><span>increase in return visits</span></article>
            <article className="hero-metric"><strong>40%</strong><span>faster digital delivery</span></article>
          </div>
        </div>

        <div className="hero-art" ref={orbitRef} aria-hidden="true"><div className="hero-orbit hero-orbit--one" /><div className="hero-orbit hero-orbit--two" /><img ref={artworkRef} src={heroArtwork} alt="" /></div>

        <div className="hero-bottom"><p className="hero-scroll-note">Scroll to enter <span>↓</span></p><div ref={ruleRef} className="hero-progress" /><p>Strategy / Identity / Digital</p></div>
      </div>
    </section>
  );
}
