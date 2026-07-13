import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

const getCategoryFallbackImage = (slug) => {
  switch (slug) {
    case 'photography':
      return 'https://images.unsplash.com/photo-1534113414509-0eec2bfb493f?w=900&h=1200&fit=crop&q=80';
    case 'digital-art':
      return 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=1200&fit=crop&q=80';
    case 'traditional-painting':
    case 'silid-lona':
      return 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=900&h=1200&fit=crop&q=80';
    case 'sculpture-3d':
      return 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=900&h=1200&fit=crop&q=80';
    case 'music-audio':
      return 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=900&h=1200&fit=crop&q=80';
    case 'film-video':
      return 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=900&h=1200&fit=crop&q=80';
    case 'writing-poetry':
      return 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&h=1200&fit=crop&q=80';
    default:
      return 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=900&h=1200&fit=crop&q=80';
  }
};

const getCategoryAccent = (slug) => {
  switch (slug) {
    case 'photography':
      return '#C4956A';
    case 'digital-art':
      return '#8BA7B8';
    case 'traditional-painting':
    case 'silid-lona':
      return '#7A9E7E';
    case 'sculpture-3d':
      return '#D4A955';
    case 'music-audio':
      return '#C57E7E';
    case 'film-video':
      return '#C89B3C';
    case 'writing-poetry':
      return '#A44A3F';
    default:
      return '#C89B3C';
  }
};

export default function ElegantCarousel({ categories }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState('next');
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const progressRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const SLIDE_DURATION = 6000;
  const TRANSITION_DURATION = 800;

  const slidesCount = categories?.length || 0;

  const [subImageIndex, setSubImageIndex] = useState(0);

  const currentSlide = slidesCount > 0 ? categories[currentIndex] : null;

  // Reset subImageIndex when main slide changes
  useEffect(() => {
    setSubImageIndex(0);
  }, [currentIndex]);

  // Cycle subImageIndex if there are multiple images
  useEffect(() => {
    const imagesCount = currentSlide?.artwork_images?.length || 0;
    if (imagesCount <= 1 || isPaused) return;

    const subInterval = setInterval(() => {
      setSubImageIndex((prev) => (prev + 1) % imagesCount);
    }, 3000); // cycle every 3 seconds

    return () => clearInterval(subInterval);
  }, [currentIndex, currentSlide, isPaused]);

  const goToSlide = useCallback(
    (index, dir) => {
      if (isTransitioning || index === currentIndex || slidesCount === 0) return;
      setDirection(dir || (index > currentIndex ? 'next' : 'prev'));
      setIsTransitioning(true);
      setProgress(0);

      setTimeout(() => {
        setCurrentIndex(index);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, TRANSITION_DURATION / 2);
    },
    [isTransitioning, currentIndex, slidesCount]
  );

  const goNext = useCallback(() => {
    if (slidesCount === 0) return;
    const nextIndex = (currentIndex + 1) % slidesCount;
    goToSlide(nextIndex, 'next');
  }, [currentIndex, goToSlide, slidesCount]);

  const goPrev = useCallback(() => {
    if (slidesCount === 0) return;
    const prevIndex = (currentIndex - 1 + slidesCount) % slidesCount;
    goToSlide(prevIndex, 'prev');
  }, [currentIndex, goToSlide, slidesCount]);

  useEffect(() => {
    if (slidesCount === 0 || isPaused) return;

    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 100 / (SLIDE_DURATION / 50);
      });
    }, 50);

    intervalRef.current = setInterval(() => {
      goNext();
    }, SLIDE_DURATION);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [currentIndex, isPaused, goNext, slidesCount]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 60) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  if (slidesCount === 0 || !currentSlide) return null;

  const accent = getCategoryAccent(currentSlide.slug);
  const imageUrl = currentSlide.cover_image_url || getCategoryFallbackImage(currentSlide.slug);

  return (
    <div
      className="carousel-wrapper select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background accent wash */}
      <div
        className="carousel-bg-wash"
        style={{
          background: `radial-gradient(ellipse at 70% 50%, ${accent}18 0%, transparent 70%)`,
        }}
      />

      {/* Floating Navigation Arrows */}
      <button
        onClick={goPrev}
        className="carousel-arrow-btn prev-btn"
        aria-label="Previous slide"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goNext}
        className="carousel-arrow-btn next-btn"
        aria-label="Next slide"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>

      <div className="carousel-inner">
        {/* Left: Text Content */}
        <div className="carousel-content">
          <div className="carousel-content-inner">
            {/* Collection number */}
            <div
              className={`carousel-collection-num ${isTransitioning ? 'transitioning' : 'visible'}`}
            >
              <span className="carousel-num-line" />
              <span className="carousel-num-text">
                {String(currentIndex + 1).padStart(2, '0')} / {String(slidesCount).padStart(2, '0')}
              </span>
            </div>

            {/* Title */}
            <h2
              className={`carousel-title ${isTransitioning ? 'transitioning' : 'visible'}`}
            >
              {currentSlide.name}
            </h2>



            {/* Description */}
            <p
              className={`carousel-description ${isTransitioning ? 'transitioning' : 'visible'}`}
            >
              {currentSlide.description}
            </p>

            {/* Explore CTA */}
            <div className={`mt-8 ${isTransitioning ? 'transitioning opacity-0' : 'visible transition-all duration-300'}`}>
              <Link
                to={`/category/${currentSlide.slug}`}
                className="carousel-cta-btn"
                style={{
                  borderColor: accent,
                  color: 'var(--cream)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = accent;
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--cream)';
                }}
              >
                Explore <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Image */}
        <div className="carousel-image-container">
          <div
            className={`carousel-image-frame ${isTransitioning ? 'transitioning' : 'visible'}`}
          >
            {currentSlide.artwork_images && currentSlide.artwork_images.length > 0 ? (
              currentSlide.artwork_images.map((imgUrl, imgIdx) => (
                <img
                  key={imgIdx}
                  src={imgUrl}
                  alt={`${currentSlide.name} ${imgIdx + 1}`}
                  className="carousel-image absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
                  style={{
                    opacity: imgIdx === subImageIndex ? 1 : 0,
                    zIndex: imgIdx === subImageIndex ? 2 : 1,
                  }}
                />
              ))
            ) : (
              <img
                src={imageUrl}
                alt={currentSlide.name}
                className="carousel-image absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div
              className="carousel-image-overlay"
              style={{
                background: `linear-gradient(135deg, ${accent}22 0%, transparent 50%)`,
                zIndex: 3,
              }}
            />
          </div>

          {/* Decorative frame corner */}
          <div className="carousel-frame-corner carousel-frame-corner--tl" style={{ borderColor: accent }} />
          <div className="carousel-frame-corner carousel-frame-corner--br" style={{ borderColor: accent }} />
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="carousel-progress-bar">
        {categories.map((slide, index) => {
          const slideAccent = getCategoryAccent(slide.slug);
          return (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`carousel-progress-item ${index === currentIndex ? 'active' : ''}`}
              aria-label={`Go to slide ${index + 1}`}
            >
              <div className="carousel-progress-track">
                <div
                  className="carousel-progress-fill"
                  style={{
                    width: index === currentIndex ? `${progress}%` : index < currentIndex ? '100%' : '0%',
                    backgroundColor: index === currentIndex ? slideAccent : undefined,
                  }}
                />
              </div>
              <span className="carousel-progress-label">{slide.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
