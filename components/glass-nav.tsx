"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface GlassNavProps {
  active: "home" | "writings";
}

export function GlassNav({ active }: GlassNavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          justifyContent: "center",
          padding: "0 24px",
          pointerEvents: scrolled ? "auto" : "none",
          transition: "opacity 0.4s ease, transform 0.4s ease",
          opacity: scrolled ? 1 : 0,
          transform: scrolled ? "translateY(0)" : "translateY(-8px)",
        }}
      >
        <div
          style={{
            marginTop: "12px",
            padding: "10px 24px",
            borderRadius: "100px",
            backdropFilter: "blur(20px) saturate(1.8)",
            WebkitBackdropFilter: "blur(20px) saturate(1.8)",
            backgroundColor: "rgba(245, 242, 238, 0.65)",
            border: "1px solid rgba(255,255,255,0.6)",
            boxShadow:
              "0 4px 24px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)",
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Link
            href="/"
            style={{
              fontSize: "14px",
              fontFamily: "var(--font-lora), serif",
              color: "#1a1a1a",
              textDecoration: "none",
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            Vinod Biradar
          </Link>
          <span style={{ color: "#ddd", fontSize: "12px" }}>·</span>
          <Link
            href="/"
            style={{
              fontSize: "13px",
              fontFamily: "var(--font-lora), serif",
              color: active === "home" ? "#1a1a1a" : "#999",
              textDecoration: "none",
              fontWeight: active === "home" ? 500 : 400,
            }}
          >
            Home
          </Link>
          <Link
            href="/writings"
            style={{
              fontSize: "13px",
              fontFamily: "var(--font-lora), serif",
              color: active === "writings" ? "#1a1a1a" : "#999",
              textDecoration: "none",
              fontWeight: active === "writings" ? 500 : 400,
            }}
          >
            Writings
          </Link>
        </div>
      </div>
    </>
  );
}
