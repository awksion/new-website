import { useEffect, useRef } from 'react';

export default function NeonWaves({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);
  const lastFrameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Neon pulse waveform — EQ bar style
    // Two waveform layers: mirrored top/bottom like a real audio waveform
    const NUM_BARS = 80;
    // Each bar has an independent random phase offset so they don't all move together
    const phases = Array.from({ length: NUM_BARS }, () => Math.random() * Math.PI * 2);
    const speeds = Array.from({ length: NUM_BARS }, () => 0.6 + Math.random() * 0.8);

    const FPS_CAP = 30;
    const FRAME_MS = 1000 / FPS_CAP;

    const loop = (timestamp: number) => {
      rafRef.current = requestAnimationFrame(loop);

      // Throttle to ~30fps
      if (timestamp - lastFrameRef.current < FRAME_MS) return;
      lastFrameRef.current = timestamp;
      timeRef.current += 0.022;
      const t = timeRef.current;

      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      // Background
      ctx.fillStyle = '#09090e';
      ctx.fillRect(0, 0, w, h);

      const barW = Math.max(2, (w / NUM_BARS) * 0.55);
      const barSpacing = w / NUM_BARS;

      for (let i = 0; i < NUM_BARS; i++) {
        const x = i * barSpacing + barSpacing / 2;

        // Distance from center (0=center, 1=edge) for gaussian envelope
        const dist = Math.abs(x - cx) / cx;
        const envelope = Math.exp(-dist * dist * 2.2) * 0.85 + 0.15;

        // Animated height: sum of sine waves at different frequencies
        const barHeight =
          (Math.sin(t * speeds[i] + phases[i]) * 0.4 +
           Math.sin(t * speeds[i] * 1.7 + phases[i] * 1.3) * 0.3 +
           Math.sin(t * 1.1 + (i / NUM_BARS) * Math.PI * 4) * 0.3) *
          0.5 + 0.5; // normalise to 0-1

        const maxH = (h * 0.38) * envelope;
        const bh = Math.max(2, barHeight * maxH);

        // Colour: horizontal gradient from cyan → magenta → cyan
        const hue = 170 + (i / NUM_BARS) * 120; // 170 cyan → 290 magenta
        const brightness = 0.55 + barHeight * 0.45;
        const alpha = 0.7 + barHeight * 0.3;

        // Glow pass (thick, low opacity)
        ctx.save();
        ctx.shadowColor = `hsla(${hue}, 100%, 65%, 0.9)`;
        ctx.shadowBlur = 14;
        ctx.fillStyle = `hsla(${hue}, 100%, ${brightness * 100}%, ${alpha})`;

        // Top bar (above center)
        ctx.fillRect(x - barW / 2, cy - bh, barW, bh);
        // Bottom bar (below center) — mirror
        ctx.fillRect(x - barW / 2, cy, barW, bh);
        ctx.restore();

        // Bright core (thin, fully opaque)
        ctx.fillStyle = `hsla(${hue}, 100%, 92%, 0.85)`;
        const coreW = Math.max(1, barW * 0.3);
        ctx.fillRect(x - coreW / 2, cy - bh, coreW, bh);
        ctx.fillRect(x - coreW / 2, cy, coreW, bh);
      }

      // Centre line
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fillRect(0, cy - 1, w, 2);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ display: 'block' }}
    />
  );
}
