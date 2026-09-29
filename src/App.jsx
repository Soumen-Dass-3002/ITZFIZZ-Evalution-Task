import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './components/Hero.jsx';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  ['01', 'Brand worlds', 'Identity systems with a pulse, built to live beyond a logo.'],
  ['02', 'Digital flagships', 'Websites that feel as exacting as the brands behind them.'],
  ['03', 'Motion systems', 'Interaction, campaign and product motion with a point of view.'],
];

const projects = [
  ['NOVA / 24', 'A zero-gravity brand system for a new energy company.', 'nova'],
  ['TIDEFORM', 'An adaptive digital home for the next generation of hospitality.', 'tide'],
  ['ÆTHER', 'Making climate technology feel optimistic, immediate and human.', 'aether'],
];

export default function App() {
  const appRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.utils.toArray('.reveal-up').forEach((element) => {
        gsap.fromTo(element, { y: 52, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.95, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 82%', once: true } });
      });
      gsap.to('.manifesto__drift', { xPercent: -9, ease: 'none', scrollTrigger: { trigger: '.manifesto', start: 'top bottom', end: 'bottom top', scrub: 1 } });

      gsap.utils.toArray('.capability').forEach((card, index) => {
        gsap.fromTo(card, { y: 70, rotate: index === 1 ? 2 : -2, autoAlpha: 0 }, { y: 0, rotate: 0, autoAlpha: 1, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 83%', once: true } });
      });

      gsap.utils.toArray('.case').forEach((caseItem, index) => {
        const visual = caseItem.querySelector('.case__visual');
        gsap.fromTo(visual, { scale: 1.12, yPercent: 10 }, { scale: 1, yPercent: -4, ease: 'none', scrollTrigger: { trigger: caseItem, start: 'top bottom', end: 'bottom top', scrub: 0.7 } });
        gsap.fromTo(caseItem.querySelector('.case__caption'), { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.75, delay: index * 0.06, ease: 'power3.out', scrollTrigger: { trigger: caseItem, start: 'top 74%', once: true } });
      });
      gsap.to('.ticker__track', { xPercent: -18, ease: 'none', scrollTrigger: { trigger: '.ticker', start: 'top bottom', end: 'bottom top', scrub: 1.2 } });
    }, appRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={appRef}>
      <Hero />

      <section className="manifesto" id="studio">
        <p className="section-kicker reveal-up">The studio / 01</p>
        <div className="manifesto__drift"><p className="manifesto__line">The internet has enough</p><p className="manifesto__line manifesto__line--accent">forgettable things.</p></div>
        <div className="manifesto__foot reveal-up"><p>Itzfizz is an independent creative technology studio. We use sharp strategy, singular design and intelligent motion to create a feeling people want to return to.</p><a href="#work" className="text-link">Our selected work <span>↘</span></a></div>
      </section>

      <section className="capabilities" aria-label="Capabilities">
        <div className="section-heading reveal-up"><p className="section-kicker">What we do / 02</p><p>From first thought to final pixel.</p></div>
        <div className="capability-grid">
          {capabilities.map(([number, title, description]) => <article className="capability" key={number}><span>{number}</span><div className="capability__line" /><h2>{title}</h2><p>{description}</p><i>↗</i></article>)}
        </div>
      </section>

      <section className="ticker" aria-hidden="true"><div className="ticker__track">BOLD IDEAS <span>✦</span> MADE TANGIBLE <span>✦</span> BOLD IDEAS <span>✦</span> MADE TANGIBLE <span>✦</span></div></section>

      <section className="work" id="work">
        <div className="section-heading reveal-up"><p className="section-kicker">Selected work / 03</p><p>Three worlds, no repeats.</p></div>
        <div className="work-grid">
          {projects.map(([name, description, tone]) => <article className={`case case--${tone}`} key={name}><div className="case__visual"><span className="case__orb" /><span className="case__shape" /><b>{name.split(' ')[0]}</b></div><div className="case__caption"><p>{name}</p><span>{description}</span><i>View case study ↗</i></div></article>)}
        </div>
      </section>

      <section className="contact" id="contact">
        <p className="section-kicker reveal-up">Ready when you are / 04</p><h2 className="reveal-up">Let’s make the<br /><em>next thing matter.</em></h2><a className="contact__mail reveal-up" href="mailto:hello@itzfizz.studio">hello@itzfizz.studio <span>↗</span></a>
        <footer><span>© Itzfizz 2026</span><span>Built with intent, not noise.</span><a href="#top">Back to top ↑</a></footer>
      </section>
    </main>
  );
}
