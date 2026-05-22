"use client";

import { useCallback, useEffect, useRef } from "react";
import { useSound } from "@/components/audio/SoundProvider";

interface ClickSparkProps {
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: "linear" | "ease-in" | "ease-out" | "ease-in-out";
  extraScale?: number;
}

interface Spark {
  x: number;
  y: number;
  angle: number;
  startTime: number;
  color: string;
}

// Rainbow candy palette for sparks 🌈
const SPARK_COLORS = [
  "#f7c600", // sun
  "#f05590", // coral/pink
  "#5aad40", // leaf
  "#28b4e0", // sky
  "#8b60d0", // crystal
  "#ff7220", // tangerine
  "#10c896", // mint
  "#ff3878", // hot-pink
];

/**
 * Global click-spark effect with rainbow candy colours.
 * Each burst picks a random palette colour for delight.
 */
export default function ClickSpark({
  sparkSize = 12,
  sparkRadius = 22,
  sparkCount = 10,
  duration = 460,
  easing = "ease-out",
  extraScale = 1.0,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const lastSoundAt = useRef(0);

  // Store playSound in a ref so the click useEffect never re-registers
  const { playSound } = useSound();
  const playSoundRef = useRef(playSound);
  playSoundRef.current = playSound;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resizeCanvas = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const easeFunc = useCallback(
    (t: number) => {
      switch (easing) {
        case "linear": return t;
        case "ease-in": return t * t;
        case "ease-in-out": return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default: return t * (2 - t);
      }
    },
    [easing],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const draw = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) return false;

        const progress = elapsed / duration;
        const eased = easeFunc(progress);
        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.strokeStyle = spark.color;
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.globalAlpha = 1 - eased * 0.6;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.globalAlpha = 1;

        return true;
      });

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationId);
  }, [sparkSize, sparkRadius, duration, easeFunc, extraScale]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const now = performance.now();

      // Throttle sound to one per 100 ms — feels snappy, not spammy
      if (now - lastSoundAt.current > 100) {
        lastSoundAt.current = now;
        playSoundRef.current("tick");
      }

      // Pick a random color for each burst
      const color = SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)];
      const newSparks: Spark[] = Array.from({ length: sparkCount }, (_, i) => ({
        x,
        y,
        angle: (2 * Math.PI * i) / sparkCount,
        startTime: now,
        color,
      }));
      sparksRef.current.push(...newSparks);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [sparkCount]); // playSoundRef is stable — no need to list it

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999]"
    />
  );
}
