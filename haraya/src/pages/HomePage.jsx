import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import categories from '../data/categoryConfig.js';
import { getCategories } from '../services/categories.js';
import { supabase } from '../lib/supabase.js';
import ElegantCarousel from '../components/landing/ElegantCarousel.jsx';

export default function HomePage() {
  const [renderedCategories, setRenderedCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      let finalCategories = categories;

      try {
        const dbCats = await getCategories();
        if (dbCats && dbCats.length > 0) {
          // Fetch all artwork thumbnails and media URLs from database
          let dbArtworks = [];
          try {
            const { data, error } = await supabase
              .from('artworks')
              .select('category_id, media_url, media_type, thumbnail_url')
              .order('created_at', { ascending: false });
            if (!error && data) {
              dbArtworks = data;
            }
          } catch (e) {
            console.warn('Failed to fetch artworks for carousel thumbnails:', e.message);
          }

          // Map over dbCats directly to preserve database display order
          finalCategories = dbCats.map((dbCat) => {
            const localConfig = categories.find((c) => c.slug === dbCat.slug || c.id === dbCat.id) || {};

            // Extract all non-null thumbnail or image URLs for this category
            const catArtworks = dbArtworks
              .filter((art) => art.category_id === dbCat.id)
              .map((art) => art.thumbnail_url || (art.media_type === 'image' ? art.media_url : null))
              .filter(Boolean);

            return {
              id: dbCat.id,
              slug: dbCat.slug,
              name: dbCat.name && !dbCat.name.includes('Silid-') ? dbCat.name : localConfig.name,
              description: dbCat.description && !dbCat.description.includes('Silid-') && !dbCat.description.includes('silid-') ? dbCat.description : localConfig.description,
              expanded_description: dbCat.expanded_description && !dbCat.expanded_description.includes('Silid-') ? dbCat.expanded_description : localConfig.expanded_description,
              icon: localConfig.icon || '🎨',
              gradient: localConfig.gradient,
              cover_image_url: dbCat.cover_image_url || localConfig.cover_image_url,
              hryRef: localConfig.hryRef,
              refName: localConfig.refName || dbCat.name,
              iconText: localConfig.iconText || dbCat.name,
              artwork_images: catArtworks.length > 0 ? catArtworks : [dbCat.cover_image_url || localConfig.cover_image_url].filter(Boolean)
            };
          });
        }
      } catch (err) {
        console.warn('Failed to load categories from Supabase, using local static config fallback:', err.message);
        finalCategories = categories;
      } finally {
        setRenderedCategories(finalCategories);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const section = document.getElementById('categories');
    if (!section) return;

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xOffset = (x - rect.width / 2) / (rect.width / 2);
      const yOffset = (y - rect.height / 2) / (rect.height / 2);

      const maxMove = 20; // subtle movement of 20px max
      const moveX = xOffset * maxMove;
      const moveY = yOffset * maxMove;

      section.style.setProperty('--mouse-x', `${moveX}px`);
      section.style.setProperty('--mouse-y', `${moveY}px`);
    };

    const handleMouseLeave = () => {
      section.style.setProperty('--mouse-x', '0px');
      section.style.setProperty('--mouse-y', '0px');
    };

    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative">
      {/* HERO */}
      <section className="hero" id="home">
        {/* Floating Hero Particles (Lines & Crosses) */}
        <div className="hero-particles">
          {Array.from({ length: 40 }).map((_, i) => {
            // Distribute particles to the left (0-20%) and right (75-95%) sides
            const isRightSide = i % 2 === 0;
            const leftVal = isRightSide
              ? 75 + Math.random() * 20
              : Math.random() * 20;

            const size = Math.random() * 25 + 15; // size from 15px to 40px (bigger)
            const style = {
              left: `${leftVal}%`,
              top: `${Math.random() * 100}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 15 + 10}s`,
            };

            const isCross = i % 2 === 0;

            return (
              <span key={i} className="hero-particle" style={style}>
                {isCross ? (
                  <span className="particle-cross-shape" />
                ) : (
                  <span
                    className="particle-line-shape"
                    style={{
                      transform: `rotate(${Math.random() * 360}deg)`
                    }}
                  />
                )}
              </span>
            );
          })}
        </div>

        <div className="hero-container">
          <span className="eyebrow hero-eyebrow">The Creative Archive</span>
          <h1>HAR<em>A</em>YA</h1>
          <p className="tagline">Inspired by Tradition, Created for Tomorrow</p>
          <p className="lede font-serif">
            A living collection of art, sound, and story — gathered across five mediums and kept open for anyone curious enough to look closer.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#categories">Enter the Archive</a>
            <Link className="btn btn-secondary" to="/about">Our Story</Link>
          </div>
        </div>
        <div className="scroll-cue">
          <span className="line"></span>Scroll
        </div>
      </section>

      {/* ARCHIVE INDEX (CATEGORIES GRID) */}
      <section className="archive-section px-6 md:px-12" id="categories">
        {/* Floating Bokeh Particles */}
        <div className="particles-container">
          {Array.from({ length: 25 }).map((_, i) => {
            const style = {
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 20 + 10}s`,
            };
            return <span key={i} className="particle" style={style} />;
          })}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="pt-8 mb-8 text-center">
            <span className="eyebrow mb-2 block">Five Mediums, One Collection</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading tracking-wide text-[var(--cream)] mb-3">The Index</h2>
            <p className="text-neutral-400 font-serif max-w-2xl mx-auto italic text-base md:text-lg leading-relaxed">
              Every piece in Haraya is filed by medium, not by fame. Choose a drawer to open.
            </p>
          </div>

          <div className="mt-12">
            <ElegantCarousel categories={renderedCategories} />
          </div>
        </div>
      </section>

      {/* ABOUT TEASER (A quiet room for loud ideas) */}
      <section className="about-teaser-section" id="about-teaser">
        <div className="hero-container py-20 md:py-28">
          <span className="eyebrow hero-eyebrow">About Haraya</span>
          <h2 className="about-title">
            Preserving the art of <em>haraya</em>
          </h2>
          <p className="tagline font-kingston tracking-[0.1em]">
            — Est. 2026
          </p>
          <p className="lede font-serif">
            Haraya is a student-curated digital gallery showcasing creative works inspired by Filipino heritage and contemporary life. Through visual art, music, performances, and installations, we celebrate culture, creativity, and the stories that connect generations.          </p>
          <div className="hero-actions">
            <Link to="/about" className="btn btn-primary">
              Read Our Full Story
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
