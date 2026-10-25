import { useEffect, useRef, useState } from 'react';
import { useScrollLock } from '@/hooks/useScrollLock';
import './IntroScreen.css';

const SEEN_KEY = 'synth:intro-seen';
const FADE_MS = 700;

function hasSeenIntro() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

function markIntroSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, '1');
  } catch {
    /* storage unavailable: the intro may simply play again */
  }
}

function shouldPlay() {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  return !hasSeenIntro();
}

/**
 * Full-screen animated logo shown once per browser session on the home page.
 * Ends by fading into the site; Skip (or Esc) ends it early.
 */
export function IntroScreen({ video }) {
  const [phase, setPhase] = useState(() => (video && shouldPlay() ? 'playing' : 'done'));
  const skipRef = useRef(null);
  useScrollLock(phase === 'playing');

  const finish = () => {
    markIntroSeen();
    setPhase((current) => (current === 'playing' ? 'leaving' : current));
  };

  useEffect(() => {
    if (phase === 'playing') {
      skipRef.current?.focus({ preventScroll: true });
      const onKeyDown = (event) => event.key === 'Escape' && finish();
      window.addEventListener('keydown', onKeyDown);
      return () => window.removeEventListener('keydown', onKeyDown);
    }
    if (phase === 'leaving') {
      const timer = window.setTimeout(() => setPhase('done'), FADE_MS);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [phase]);

  if (phase === 'done') return null;

  return (
    <div
      className={`intro-screen ${phase === 'leaving' ? 'is-leaving' : ''}`.trim()}
      style={{ '--intro-fade': `${FADE_MS}ms` }}
      role="dialog"
      aria-label="SYNTH intro"
    >
      <video
        className="intro-screen__video"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={finish}
        onError={finish}
        aria-hidden="true"
      >
        <source src={video.webm} type="video/webm" />
        <source src={video.mp4} type="video/mp4" />
      </video>

      <button ref={skipRef} type="button" className="intro-screen__skip" onClick={finish}>
        Skip
      </button>
    </div>
  );
}
