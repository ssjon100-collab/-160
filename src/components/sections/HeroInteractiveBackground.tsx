import React, { useEffect, useRef, useState } from 'react';

interface HeroInteractiveBackgroundProps {
  accentColor: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxAlpha: number;
  pulseSpeed: number;
  pulsePhase: number;
  color: string;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export const HeroInteractiveBackground: React.FC<HeroInteractiveBackgroundProps> = ({
  accentColor,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Smooth mouse coordinates for ambient spotlight (lerped)
  const [mousePos, setMousePos] = useState<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  const targetMouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  const currentMouseRef = useRef<{ x: number; y: number }>({
    x: -1000,
    y: -1000,
  });

  const ripplesRef = useRef<Ripple[]>([]);

  // Attach pointer events to the entire parent <section> so movement anywhere triggers interactions
  useEffect(() => {
    const parent = containerRef.current?.parentElement;
    if (!parent) return;

    const onPointerMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      targetMouseRef.current = { x, y, active: true };
    };

    const onPointerLeave = () => {
      targetMouseRef.current.active = false;
    };

    const onPointerDown = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ripplesRef.current.push({
        x,
        y,
        radius: 6,
        maxRadius: 220,
        alpha: 0.65,
      });
    };

    parent.addEventListener('pointermove', onPointerMove, { passive: true });
    parent.addEventListener('pointerleave', onPointerLeave, { passive: true });
    parent.addEventListener('pointerdown', onPointerDown, { passive: true });

    return () => {
      parent.removeEventListener('pointermove', onPointerMove);
      parent.removeEventListener('pointerleave', onPointerLeave);
      parent.removeEventListener('pointerdown', onPointerDown);
    };
  }, []);

  // Canvas particle and constellation animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Color tones for particles: soft royal violet, electric lilac, starlight white
    const particleColors = [
      'rgba(243, 232, 255,',
      'rgba(216, 180, 254,',
      'rgba(192, 132, 252,',
      'rgba(232, 121, 249,',
    ];

    // Generate balanced, delicate particles
    const particleCount = Math.min(Math.floor((width * height) / 20000), 55);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.32,
        vy: -0.16 - Math.random() * 0.28, // gentle upward drift like stardust
        size: Math.random() * 1.8 + 0.8,
        alpha: Math.random() * 0.45 + 0.2,
        maxAlpha: Math.random() * 0.55 + 0.35,
        pulseSpeed: 0.016 + Math.random() * 0.02,
        pulsePhase: Math.random() * Math.PI * 2,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
      });
    }

    // Animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Lerp mouse pos
      const target = targetMouseRef.current;
      const current = currentMouseRef.current;
      if (target.active) {
        if (current.x === -1000) {
          current.x = target.x;
          current.y = target.y;
        } else {
          current.x += (target.x - current.x) * 0.08;
          current.y += (target.y - current.y) * 0.08;
        }
        setMousePos({ x: current.x, y: current.y, active: true });
      } else {
        // Slowly glide spotlight back to top-center if idle
        const centerX = width * 0.5;
        const centerY = height * 0.36;
        current.x += (centerX - current.x) * 0.02;
        current.y += (centerY - current.y) * 0.02;
        setMousePos({ x: current.x, y: current.y, active: false });
      }

      // Draw subtle interactive ripples from clicks
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const rip = ripplesRef.current[i];
        rip.radius += 3.2;
        rip.alpha *= 0.952;

        ctx.save();
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(192, 132, 252, ${rip.alpha})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(rip.x, rip.y, Math.max(0, rip.radius - 18), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(232, 121, 249, ${rip.alpha * 0.45})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.restore();

        if (rip.alpha < 0.01 || rip.radius >= rip.maxRadius) {
          ripplesRef.current.splice(i, 1);
        }
      }

      // Draw subtle constellation connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 95) {
            const lineAlpha = (1 - dist / 95) * 0.15 * Math.min(p1.alpha, p2.alpha);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(192, 132, 252, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        // Mouse proximity connection line
        if (current.x !== -1000) {
          const mdx = p1.x - current.x;
          const mdy = p1.y - current.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mDist < 140) {
            const mAlpha = (1 - mDist / 140) * 0.28;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(current.x, current.y);
            ctx.strokeStyle = `rgba(216, 180, 254, ${mAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Gentle repulsion/attraction physics
            const force = (1 - mDist / 140) * 0.45;
            p1.x += (mdx / mDist) * force;
            p1.y += (mdy / mDist) * force;
          }
        }
      }

      // Update and draw particles
      particles.forEach((p) => {
        p.pulsePhase += p.pulseSpeed;
        const currentAlpha = p.alpha + Math.sin(p.pulsePhase) * (p.maxAlpha - p.alpha) * 0.5;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges smoothly
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw soft glow around particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${currentAlpha * 0.22})`;
        ctx.fill();

        // Core star point
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${currentAlpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Dynamic Cursor Spotlight Glow (Smoothly interpolates to cursor position) */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700 ease-out"
        style={{
          background:
            mousePos.x !== -1000
              ? `radial-gradient(circle 540px at ${mousePos.x}px ${mousePos.y}px, rgba(168, 85, 247, 0.24), rgba(126, 34, 206, 0.08) 45%, transparent 75%)`
              : `radial-gradient(circle 620px at 50% 36%, rgba(168, 85, 247, 0.20), rgba(126, 34, 206, 0.07) 45%, transparent 75%)`,
        }}
      />

      {/* 2. Soft Ambient Aurora Beams */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[450px] bg-gradient-to-br from-purple-600/15 via-fuchsia-600/10 to-transparent rounded-full blur-[130px] pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/3 right-1/4 w-[520px] h-[400px] bg-gradient-to-bl from-indigo-600/12 via-purple-700/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

      {/* 3. Architectural Luxury Grid & Compass Lines (Subtle SVG Overlay) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.16]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 64px architectural blueprint grid */}
          <pattern id="hero-arch-grid" width="64" height="64" patternUnits="userSpaceOnUse">
            <path
              d="M 64 0 L 0 0 0 64"
              fill="none"
              stroke="#a855f7"
              strokeWidth="0.5"
              strokeOpacity="0.75"
            />
            {/* Small intersection crosshair */}
            <path
              d="M 32 28 L 32 36 M 28 32 L 36 32"
              fill="none"
              stroke="#c084fc"
              strokeWidth="0.6"
              strokeOpacity="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-arch-grid)" />
      </svg>

      {/* 4. Concentric Architectural Orbit Arcs (Slowly Rotating Ambient Motif) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] sm:w-[960px] sm:h-[960px] pointer-events-none opacity-[0.24]">
        {/* Outer Ring */}
        <div
          className="absolute inset-0 rounded-full border border-dashed border-purple-400/40 animate-spin"
          style={{ animationDuration: '140s' }}
        />
        {/* Middle Ring with tick accents */}
        <div
          className="absolute inset-[80px] rounded-full border border-purple-500/30 animate-spin"
          style={{ animationDuration: '95s', animationDirection: 'reverse' }}
        >
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-purple-400/80 shadow-[0_0_12px_#c084fc]" />
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-purple-300/70" />
        </div>
        {/* Inner Ring */}
        <div
          className="absolute inset-[180px] rounded-full border border-dotted border-purple-300/35 animate-spin"
          style={{ animationDuration: '60s' }}
        />
      </div>

      {/* 5. Architectural Corner Crosshairs & Coordinates HUD (Desktop) */}
      <div className="hidden lg:flex items-center justify-between absolute top-28 inset-x-8 text-[11px] font-montserrat tracking-widest text-purple-300/45 uppercase pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="text-purple-400">+</span>
          <span>MASTER PLAN B11-BL</span>
          <span className="w-8 h-px bg-purple-500/25" />
          <span>ELEV. 112M</span>
        </div>
        <div className="flex items-center gap-2">
          <span>LAT 37°11&apos;56&quot;N</span>
          <span className="text-purple-400/60">·</span>
          <span>LONG 127°07&apos;23&quot;E</span>
          <span className="text-purple-400">+</span>
        </div>
      </div>

      <div className="hidden lg:flex items-center justify-between absolute bottom-12 inset-x-8 text-[10px] font-montserrat tracking-widest text-purple-300/40 uppercase pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 border-l border-b border-purple-400/60" />
          <span>TERRACE HOUSE EDITION</span>
          <span className="text-purple-500/50">/</span>
          <span>160 EXCLUSIVE RESIDENCES</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-purple-400/80">INTERACTIVE LIGHTING &amp; PARTICLES</span>
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400/70 animate-pulse" />
        </div>
      </div>

      {/* 6. Interactive Particle & Star Constellation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* 7. Soft Luxury Vignette & Depth Blending */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#07070a]/75 via-transparent to-[#07070a] pointer-events-none" />
    </div>
  );
};
