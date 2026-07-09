import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FocusRail } from '../components/ui/focus-rail.jsx';
import categories from '../data/categoryConfig.js';
import { getCategories } from '../services/categories.js';
import ScrollReveal from '../components/ui/ScrollReveal.jsx';
import PillarBorder from '../components/landing/PillarBorder.jsx';

export default function HomePage() {
  const [railItems, setRailItems] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      let finalCategories = categories;

      try {
        const dbCats = await getCategories();
        if (dbCats && dbCats.length > 0) {
          // Merge database category metadata with local config styles (icons, gradients)
          finalCategories = dbCats.map((dbCat) => {
            const localConfig = categories.find((c) => c.slug === dbCat.medium_type) || {};
            return {
              id: dbCat.id,
              slug: dbCat.medium_type,
              name: dbCat.name,
              description: dbCat.description,
              icon: localConfig.icon || '🎨',
              gradient: localConfig.gradient || 'from-neutral-800 to-neutral-900',
              cover_image_url: dbCat.cover_image_url || localConfig.cover_image_url,
            };
          });
        }
      } catch (err) {
        console.warn('Failed to load categories from Supabase, using local static config fallback:', err.message);
      } finally {
        // Map categories to FocusRail items format
        const items = finalCategories.map((cat) => ({
          id: cat.id || cat.slug,
          title: cat.name,
          description: cat.description,
          meta: `${cat.icon} Category`,
          imageSrc: cat.cover_image_url || null,
          href: `/category/${cat.slug}`,
        }));
        setRailItems(items);
      }
    };

    loadCategories();
  }, []);

  return (
    <div className="relative">
      {/* STATIC WIREFRAME HERO */}
      <header className="relative pt-36 pb-20 border-b" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-subtle)' }}>
        <div className="mx-auto max-w-7xl px-6 text-center flex flex-col items-center">
          {/* Main Heading */}
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-[0.2em] font-kingston uppercase mb-6" style={{ color: 'var(--text-primary)' }}>
            Haraya
          </h1>

          {/* Subheading */}
          <h2 className="text-lg sm:text-xl font-bold tracking-widest font-heading mb-6" style={{ color: 'var(--text-secondary)' }}>
            Art in Every Form.
          </h2>

          <p className="mb-8 max-w-2xl text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Explore a curated collection of creative works spanning photography, digital art,
            music, film, writing, sculpture, and more.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#gallery"
              className="inline-flex items-center gap-2 rounded-lg border-2 px-6 py-2.5 text-xs font-bold transition-all duration-300"
              style={{
                borderColor: 'var(--text-primary)',
                backgroundColor: 'var(--text-primary)',
                color: 'var(--bg-primary)',
              }}
              id="cta-explore"
            >
              Explore the Gallery &rarr;
            </a>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-lg border-2 px-6 py-2.5 text-xs font-bold transition-all duration-300"
              style={{
                borderColor: 'var(--border-subtle)',
                backgroundColor: 'transparent',
                color: 'var(--text-primary)',
              }}
              id="cta-about"
            >
              Learn More
            </Link>
          </div>
        </div>
      </header>

      {/* GALLERY / CATEGORIES SECTION */}
      <section className="relative py-20" id="gallery">
        <PillarBorder />
        <div
          className="absolute inset-0 transition-colors duration-300"
          style={{ backgroundColor: 'var(--bg-primary)' }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-[250px]">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <h2
              className="mb-3 text-2xl font-bold sm:text-3xl md:text-4xl"
              style={{ color: 'var(--text-primary)' }}
            >
              Choose Your Door
            </h2>
            <p className="mx-auto max-w-2xl text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
              Each door opens into a world of creativity. Select an art medium
              to discover the works within.
            </p>
          </div>

          {/* Category Focus Rail */}
          {railItems.length > 0 ? (
            <FocusRail
              items={railItems}
              autoPlay={false}
              loop
              className="rounded-2xl border"
              style={{ borderColor: 'var(--border-subtle)' }}
            />
          ) : (
            <div className="flex gap-6 overflow-hidden h-[600px] w-full justify-center items-center px-4">
              <div className="hidden lg:block w-[280px] h-[420px] opacity-30 bg-neutral-100 rounded-2xl animate-pulse border" />
              <div className="w-[340px] sm:w-[380px] h-[520px] bg-neutral-50 rounded-2xl animate-pulse border relative overflow-hidden flex flex-col justify-end p-6">
                <div className="space-y-3 relative z-10 w-full p-5 rounded-xl border bg-white shadow">
                  <div className="h-7 w-1/2 bg-neutral-200 rounded animate-pulse" />
                  <div className="h-4 w-1/3 bg-neutral-200 rounded animate-pulse" />
                  <div className="space-y-1.5 pt-2">
                    <div className="h-3 w-full bg-neutral-200 rounded animate-pulse" />
                    <div className="h-3 w-5/6 bg-neutral-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>
              <div className="hidden lg:block w-[280px] h-[420px] opacity-30 bg-neutral-100 rounded-2xl animate-pulse border" />
            </div>
          )}
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="relative overflow-hidden py-20 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
        <div
          className="absolute inset-0 transition-colors duration-300"
          style={{ 
            background: 'var(--bg-primary)' 
          }}
        />

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <div className="flex flex-col items-center justify-center">
            <ScrollReveal
              enableBlur
              baseOpacity={0.1}
              baseRotation={4}
              blurStrength={6}
              containerClassName="mb-6 mx-auto text-center"
              textClassName="!text-2xl sm:!text-3xl md:!text-4xl font-heading text-theme-primary leading-tight text-center"
            >
              {"A Space for Every Art Form"}
            </ScrollReveal>
            
            <ScrollReveal
              enableBlur
              baseOpacity={0.1}
              baseRotation={2}
              blurStrength={4}
              containerClassName="mb-6 mx-auto text-center"
              textClassName="!text-xs sm:!text-sm leading-relaxed text-theme-secondary font-sans !font-normal text-center"
            >
              {"This virtual gallery is designed to celebrate the diversity of artistic expression. From traditional paintings to digital compositions, from poetry to film, every medium has a dedicated space to shine."}
            </ScrollReveal>
            
            <ScrollReveal
              enableBlur
              baseOpacity={0.1}
              baseRotation={2}
              blurStrength={4}
              containerClassName="mb-6 mx-auto text-center"
              textClassName="!text-xs sm:!text-sm leading-relaxed text-theme-muted font-sans !font-normal text-center"
            >
              {"Rate your favorite pieces, leave feedback, and immerse yourself in a curated experience that bridges the gap between artist and audience."}
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
