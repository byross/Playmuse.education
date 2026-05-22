"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

export type SoundType = "pop" | "ding" | "chime" | "boing" | "tada" | "tick";

interface SoundContextValue {
  enabled: boolean;
  toggleSound: () => void;
  playSound: (type?: SoundType) => void;
}

const SoundContext = createContext<SoundContextValue>({
  enabled: false,
  toggleSound: () => {},
  playSound: () => {},
});

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    // Respect prefers-reduced-motion — default to muted
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stored = localStorage.getItem("playmuse-sound");

    if (stored === "on" && !reducedMotion) {
      setEnabled(true);
    } else if (stored === null && !reducedMotion) {
      // First visit — default ON
      setEnabled(true);
      localStorage.setItem("playmuse-sound", "on");
    }
  }, []);

  const getCtx = useCallback((): AudioContext | null => {
    try {
      if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
        audioCtxRef.current = new AudioContext();
      }
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      return audioCtxRef.current;
    } catch {
      return null;
    }
  }, []);

  const playSound = useCallback(
    (type: SoundType = "pop") => {
      if (!enabled) return;
      const ctx = getCtx();
      if (!ctx) return;

      try {
        const now = ctx.currentTime;

        const playTone = (
          freq: number,
          startTime: number,
          endTime: number,
          vol = 0.25,
          oscType: OscillatorType = "sine",
        ) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = oscType;
          osc.frequency.setValueAtTime(freq, startTime);
          gain.gain.setValueAtTime(vol, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, endTime);
          osc.start(startTime);
          osc.stop(endTime + 0.01);
        };

        switch (type) {
          case "pop":
            playTone(680, now, now + 0.1);
            break;

          case "ding":
            playTone(1047, now, now + 0.4, 0.2);
            break;

          case "chime":
            // C major arpeggio 🎵
            [523, 659, 784, 1047].forEach((freq, i) => {
              playTone(freq, now + i * 0.06, now + i * 0.06 + 0.5, 0.18);
            });
            break;

          case "boing": {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = "sine";
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.exponentialRampToValueAtTime(700, now + 0.15);
            osc.frequency.exponentialRampToValueAtTime(350, now + 0.35);
            gain.gain.setValueAtTime(0.18, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
            osc.start(now);
            osc.stop(now + 0.42);
            break;
          }

          case "tada":
            // Fanfare — G major chord then high note
            [392, 494, 587].forEach((freq) => playTone(freq, now, now + 0.3, 0.15));
            playTone(784, now + 0.2, now + 0.7, 0.2);
            break;

          case "tick": {
            // Random pentatonic pluck — always sounds musical 🎵
            const PENTA = [523, 587, 659, 784, 880, 1047, 1175, 1319];
            const freq = PENTA[Math.floor(Math.random() * PENTA.length)];
            playTone(freq, now, now + 0.14, 0.13, "triangle");
            break;
          }
        }
      } catch {
        // Silent fail
      }
    },
    [enabled, getCtx],
  );

  const toggleSound = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      localStorage.setItem("playmuse-sound", next ? "on" : "off");
      if (next) {
        // Small confirmation sound after enabling
        setTimeout(() => {
          const ctx = getCtx();
          if (!ctx) return;
          try {
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = "sine";
            osc.frequency.setValueAtTime(880, now);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
            osc.start(now);
            osc.stop(now + 0.32);
          } catch {
            // ignore
          }
        }, 50);
      }
      return next;
    });
  }, [getCtx]);

  return (
    <SoundContext.Provider value={{ enabled, toggleSound, playSound }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  return useContext(SoundContext);
}
