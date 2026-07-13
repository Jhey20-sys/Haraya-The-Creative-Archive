import { useEffect, useRef, useMemo, isValidElement, cloneElement } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom',
  scrub = 1
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    let wordIndex = 0;

    const processNode = (node) => {
      if (node === null || node === undefined) {
        return node;
      }
      if (typeof node === 'string' || typeof node === 'number') {
        return String(node).split(/(\s+)/).map((word) => {
          if (word.match(/^\s+$/)) return word;
          wordIndex++;
          return (
            <span className="word" key={`word-${wordIndex}`}>
              {word}
            </span>
          );
        });
      }
      if (Array.isArray(node)) {
        return node.map((child, index) => {
          const res = processNode(child);
          return isValidElement(res) ? cloneElement(res, { key: res.key || index }) : res;
        });
      }
      if (isValidElement(node)) {
        if (node.props && node.props.children !== undefined) {
          return cloneElement(node, {
            children: processNode(node.props.children)
          });
        }
        return node;
      }
      return node;
    };

    return processNode(children);
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    gsap.fromTo(
      el,
      { transformOrigin: '0% 50%', rotate: baseRotation },
      {
        ease: 'none',
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom',
          end: rotationEnd,
          scrub: scrub
        }
      }
    );

    const wordElements = el.querySelectorAll('.word');

    gsap.fromTo(
      wordElements,
      { opacity: baseOpacity, willChange: 'opacity' },
      {
        ease: 'none',
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom-=20%',
          end: wordAnimationEnd,
          scrub: scrub
        }
      }
    );

    if (enableBlur) {
      gsap.fromTo(
        wordElements,
        { filter: `blur(${blurStrength}px)` },
        {
          ease: 'none',
          filter: 'blur(0px)',
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top bottom-=20%',
            end: wordAnimationEnd,
            scrub: scrub
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength, scrub]);

  return (
    <h2 ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <p className={`scroll-reveal-text ${textClassName}`}>{splitText}</p>
    </h2>
  );
};

export default ScrollReveal;
