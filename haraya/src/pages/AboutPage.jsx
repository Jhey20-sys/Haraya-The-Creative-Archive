import { useRef } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ui/ScrollReveal';

export default function AboutPage() {
  const scrollContainerRef = useRef(null);

  return (
    <div className="relative z-0 flex-1 flex flex-col justify-start overflow-hidden min-h-0">
      {/* Style block to control styling on About page */}
      <style dangerouslySetInnerHTML={{
        __html: `
        html, body {
          overflow: hidden !important;
          height: 100vh !important;
          height: 100dvh !important;
        }
        
        /* Lock standard layout wrapper scroll and force viewport height */
        .flex.min-h-screen.flex-col {
          height: 100vh !important;
          height: 100dvh !important;
          min-height: 100vh !important;
          min-height: 100dvh !important;
          overflow: hidden !important;
        }

        /* Make main tag fill remaining space and be a flex container */
        main {
          display: flex !important;
          flex-direction: column !important;
          overflow: hidden !important;
          flex: 1 1 0% !important;
          min-height: 0 !important;
        }

        /* Ensure footer does not shrink */
        footer {
          flex-shrink: 0 !important;
        }

        /* Hide scrollbars but keep functionality */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        
        /* Justify ScrollReveal paragraphs */
        .justify-paragraphs .scroll-reveal-text {
          text-align: justify !important;
          text-justify: inter-word !important;
        }
      `}} />



      {/* Header (stays static above the scrollable area) */}
      <header className="relative pt-28 pb-8 flex flex-col items-center justify-center text-center select-none z-10 shrink-0">
        <span
          className="uppercase tracking-[0.2em] font-sans font-semibold mb-2"
          style={{
            fontSize: '0.85rem',
            color: 'var(--text-primary)',
            opacity: 0.55
          }}
        >
          All About
        </span>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-10 px-6 animate-fade-in"
        >
          <span className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-[0.2em] text-theme-primary font-kingston uppercase">
            Haraya
          </span>
        </motion.div>
      </header>

      {/* Content wrapper */}
      <div
        ref={scrollContainerRef}
        className="flex-1 w-full px-6 md:px-8 justify-paragraphs overflow-y-auto no-scrollbar min-h-0"
      >
        <div className="mx-auto max-w-[680px] w-full pb-24 space-y-10">
          <ScrollReveal
            scrollContainerRef={scrollContainerRef}
            enableBlur={true}
            baseOpacity={0.1}
            baseRotation={2}
            blurStrength={4}
            containerClassName="mx-auto text-justify"
            textClassName="!text-sm leading-relaxed text-theme-secondary font-sans !font-normal text-justify"
          >
            {"Haraya is a student-curated digital gallery showcasing creative works inspired by Filipino heritage and contemporary life. Through visual art, music, performances, and installations, we celebrate culture, creativity, and the stories that connect generations."}
          </ScrollReveal>

          <ScrollReveal
            scrollContainerRef={scrollContainerRef}
            enableBlur={true}
            baseOpacity={0.1}
            baseRotation={2}
            blurStrength={4}
            containerClassName="mx-auto text-justify"
            textClassName="!text-sm leading-relaxed text-theme-secondary font-sans !font-normal text-justify"
          >
            <strong>Princess Lynmiel A. Batchar</strong>
            {" - I love all forms of art because they allow me to express my creativity, unwind, and transform ordinary things into something meaningful. I am especially inspired by The Starry Night by Vincent van Gogh. Its vivid colors, emotional depth, and dynamic composition remind me that art can tell a story beyond what we see."}
          </ScrollReveal>

          <ScrollReveal
            scrollContainerRef={scrollContainerRef}
            enableBlur={true}
            baseOpacity={0.1}
            baseRotation={2}
            blurStrength={4}
            containerClassName="mx-auto text-justify"
            textClassName="!text-sm leading-relaxed text-theme-secondary font-sans !font-normal text-justify"
          >
            <strong>April Veniza D. Galvizo</strong>
            {" - Creating allows me to translate feelings, memories, and quiet ideas into something visible and real. I believe that beauty doesn’t always shout; sometimes it’s in the small details of daily life. Through my art, I want to show people that it is very important to look a little deeper, to appreciate the little things, every detail in the world around us."}
          </ScrollReveal>

          <ScrollReveal
            scrollContainerRef={scrollContainerRef}
            enableBlur={true}
            baseOpacity={0.1}
            baseRotation={2}
            blurStrength={4}
            containerClassName="mx-auto text-justify"
            textClassName="!text-sm leading-relaxed text-theme-secondary font-sans !font-normal text-justify"
          >
            <strong>Richard Lloydd G. Mangga</strong>
            {" - A student whose academic world is defined by the precise structures, microscopic details, and evolutionary patterns of life. I am eager to expand my perspective through this creative exploration, discovering how a deeper engagement with human expression can enrich my overall understanding of life, form, and meaning."}
          </ScrollReveal>

          <ScrollReveal
            scrollContainerRef={scrollContainerRef}
            enableBlur={true}
            baseOpacity={0.1}
            baseRotation={2}
            blurStrength={4}
            containerClassName="mx-auto text-justify"
            textClassName="!text-sm leading-relaxed text-theme-secondary font-sans !font-normal text-justify"
          >
            <strong>Fretzie Jean C. Pabatang</strong>
            {" - An art enthusiast, I admire the works of Vincent Van Gogh, Claude Monet, Alfred Sisley, and J.M.W. Turner, as well as classic Hollywood films with well-written scripts and contemporary music."}
          </ScrollReveal>

          <ScrollReveal
            scrollContainerRef={scrollContainerRef}
            enableBlur={true}
            baseOpacity={0.1}
            baseRotation={2}
            blurStrength={4}
            containerClassName="mx-auto text-justify"
            textClassName="!text-sm leading-relaxed text-theme-secondary font-sans !font-normal text-justify"
          >
            <strong>Ylla Liann G. Pawang</strong>
            {" - I enjoy exploring art as a form of creativity and self-expression. I believe that both science and art inspire curiosity, innovation, and meaningful connections with the world around us. I hope to encourage others to see beauty, purpose, and possibility in things that are often overlooked."}
          </ScrollReveal>

          <ScrollReveal
            scrollContainerRef={scrollContainerRef}
            enableBlur={true}
            baseOpacity={0.1}
            baseRotation={2}
            blurStrength={4}
            containerClassName="mx-auto text-justify"
            textClassName="!text-sm leading-relaxed text-theme-secondary font-sans !font-normal text-justify"
          >
            <strong>Abegail L. Reloba</strong>
            {" - I am inspired by Claude Monet and Gustav Klimt for their ability to capture beauty, emotion, and meaning in their work. Their artistry has taught me to appreciate both the quiet wonders of nature and the richness of human expression, reminding me that curiosity and creativity go hand in hand."}
          </ScrollReveal>

          <ScrollReveal
            scrollContainerRef={scrollContainerRef}
            enableBlur={true}
            baseOpacity={0.1}
            baseRotation={2}
            blurStrength={4}
            containerClassName="mx-auto text-justify"
            textClassName="!text-sm leading-relaxed text-theme-secondary font-sans !font-normal text-justify"
          >
            <strong>Guen Micah B. Tamayo</strong>
            {" - I enjoy expressing creativity through crafts, with a particular interest in handmade projects. I draw inspiration from my surroundings, everyday observations, and moments of reflection, transforming these experiences into meaningful expressions."}
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
