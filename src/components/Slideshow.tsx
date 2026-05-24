import { useEffect, useRef, useState } from 'react';
import { useContent } from '../content/ContentContext';
import SmartImage from './SmartImage';

export default function Slideshow() {
  const { content } = useContent();
  // Pull slides from CMS; ignore any empty entries so blanks never show.
  const slides = content.slideshow.images.filter((s) => s.src).map((s) => s.src);

  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (index: number) => {
    if (animating || index === current) return;
    setPrev(current);
    setCurrent(index);
    setAnimating(true);
    setTimeout(() => {
      setPrev(null);
      setAnimating(false);
    }, 800);
  };

  useEffect(() => {
    if (slides.length <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrent((c) => {
        const next = (c + 1) % slides.length;
        setPrev(c);
        setAnimating(true);
        setTimeout(() => {
          setPrev(null);
          setAnimating(false);
        }, 800);
        return next;
      });
    }, 4000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [slides.length]);

  // Nothing to show → render a branded dark band rather than an empty/broken area.
  if (slides.length === 0) {
    return <section className="w-full bg-gray-900" style={{ height: '90vh' }} aria-hidden="true" />;
  }

  return (
    <section className="relative w-full overflow-hidden" style={{ height: '90vh' }}>
      {slides.map((src, i) => (
        <div
          key={src + i}
          className="absolute inset-0 transition-opacity"
          style={{
            opacity: i === current ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out',
            zIndex: i === current ? 2 : i === prev ? 1 : 0,
          }}
        >
          <SmartImage
            src={src}
            alt=""
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>
      ))}

      {/* subtle dark vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)',
          zIndex: 3,
        }}
      />

      {/* dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5" style={{ zIndex: 4 }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className="rounded-full transition-all duration-300 focus:outline-none"
            style={{
              width: i === current ? 28 : 8,
              height: 8,
              background: i === current ? '#fff' : 'rgba(255,255,255,0.45)',
            }}
          />
        ))}
      </div>
    </section>
  );
}
