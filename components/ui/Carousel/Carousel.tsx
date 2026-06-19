"use client";

import React, { useState, useEffect, useCallback, useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface CarouselSlide {
  image: string;
  imageMobile?: string;
  alt: string;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  gradient?: "left" | "right" | "center" | "none";
}

export interface CarouselProps {
  slides: CarouselSlide[];
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  height?: "sm" | "md" | "lg" | "xl";
  className?: string;
  overlay?: (slide: CarouselSlide, index: number) => ReactNode;
}

const heightClasses: Record<NonNullable<CarouselProps["height"]>, string> = {
  sm: "h-[40vh] max-h-[360px]",
  md: "h-[50vh] max-h-[480px]",
  lg: "h-[60vh] max-h-[600px]",
  xl: "h-[80vh] max-h-[720px]",
};

const gradientMap: Record<string, string> = {
  left: "bg-gradient-to-r from-black/70 via-black/40 to-transparent",
  right: "bg-gradient-to-l from-black/70 via-black/40 to-transparent",
  center: "bg-gradient-to-t from-black/70 via-black/30 to-transparent",
  none: "",
};

export default function Carousel({
  slides,
  interval = 5000,
  showArrows = true,
  showDots = true,
  height = "lg",
  className,
  overlay,
}: CarouselProps) {
  const total = slides.length;
  const realTotal = total;

  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning || realTotal <= 1) return;
      setIsTransitioning(true);
      setCurrent(((index % realTotal) + realTotal) % realTotal);
    },
    [isTransitioning, realTotal],
  );

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  const startAutoPlay = useCallback(() => {
    if (interval <= 0 || realTotal <= 1) return;
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % realTotal);
    }, interval);
  }, [interval, realTotal, stopAutoPlay]);

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [startAutoPlay, stopAutoPlay]);

  useEffect(() => {
    if (isPaused) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  }, [isPaused, startAutoPlay, stopAutoPlay]);

  useEffect(() => {
    if (!isTransitioning) return;
    const timer = setTimeout(() => setIsTransitioning(false), 500);
    return () => clearTimeout(timer);
  }, [isTransitioning, current]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    const el = containerRef.current;
    el?.addEventListener("keydown", handleKeyDown);
    return () => el?.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (diff > threshold) goNext();
    else if (diff < -threshold) goPrev();
  };

  if (total === 0) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-xl bg-muted text-muted-foreground",
          heightClasses[height],
          className,
        )}
        role="region"
        aria-roledescription="carousel"
        aria-label="Promotional carousel — no slides available"
      >
        <p className="text-sm">No slides to display.</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative w-full overflow-hidden rounded-xl",
        heightClasses[height],
        className,
      )}
      role="region"
      aria-roledescription="carousel"
      aria-label="Promotional offers"
      tabIndex={0}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="relative h-full w-full"
        aria-live="polite"
        aria-atomic="true"
      >
        {slides.map((slide, idx) => {
          const isActive = idx === current;
          const gradient = slide.gradient ?? "center";

          return (
            <div
              key={idx}
              className={cn(
                "absolute inset-0 h-full w-full transition-opacity duration-500 ease-in-out",
                isActive
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0 pointer-events-none",
              )}
              aria-hidden={!isActive}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${idx + 1} of ${realTotal}: ${slide.alt}`}
            >
              <picture>
                {slide.imageMobile && (
                  <source
                    media="(max-width: 640px)"
                    srcSet={slide.imageMobile}
                  />
                )}
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading={idx === 0 ? "eager" : "lazy"}
                  draggable={false}
                />
              </picture>

              {gradient !== "none" && (
                <div
                  className={cn("absolute inset-0 z-10", gradientMap[gradient])}
                  aria-hidden="true"
                />
              )}

              {overlay ? (
                overlay(slide, idx)
              ) : (
                <div
                  className={cn(
                    "absolute z-20 flex flex-col justify-end p-6 sm:p-10 lg:p-16",
                    "inset-0",
                    gradient === "left"
                      ? "items-start text-left"
                      : gradient === "right"
                        ? "items-end text-right"
                        : "items-center text-center justify-center",
                  )}
                >
                  <div className="max-w-2xl">
                    {slide.title && (
                      <h2 className="font-heading text-2xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                        {slide.title}
                      </h2>
                    )}
                    {slide.subtitle && (
                      <p className="mt-3 text-sm text-white/80 sm:text-base lg:text-lg">
                        {slide.subtitle}
                      </p>
                    )}
                    {slide.ctaLabel && (
                      <div className="mt-6">
                        {slide.ctaHref ? (
                          <Link
                            href={slide.ctaHref}
                            className={cn(
                              "inline-flex items-center rounded-full px-6 py-3",
                              "bg-primary text-primary-foreground",
                              "text-sm font-semibold shadow-lg",
                              "transition-transform hover:scale-105 active:scale-95",
                              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                            )}
                          >
                            {slide.ctaLabel}
                          </Link>
                        ) : (
                          <span
                            className={cn(
                              "inline-flex items-center rounded-full px-6 py-3",
                              "bg-primary text-primary-foreground",
                              "text-sm font-semibold shadow-lg",
                            )}
                          >
                            {slide.ctaLabel}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showArrows && realTotal > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            disabled={isTransitioning}
            className={cn(
              "absolute left-3 top-1/2 z-30 -translate-y-1/2",
              "flex h-10 w-10 items-center justify-center rounded-full",
              "bg-white/20 text-white backdrop-blur-sm",
              "opacity-0 transition-opacity duration-200 group-hover:opacity-100",
              "hover:bg-white/35 focus-visible:opacity-100",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
              "disabled:cursor-not-allowed",
            )}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={isTransitioning}
            className={cn(
              "absolute right-3 top-1/2 z-30 -translate-y-1/2",
              "flex h-10 w-10 items-center justify-center rounded-full",
              "bg-white/20 text-white backdrop-blur-sm",
              "opacity-0 transition-opacity duration-200 group-hover:opacity-100",
              "hover:bg-white/35 focus-visible:opacity-100",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
              "disabled:cursor-not-allowed",
            )}
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {showDots && realTotal > 1 && (
        <div
          className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2"
          role="tablist"
          aria-label="Slide indicators"
        >
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={idx === current}
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => goTo(idx)}
              disabled={isTransitioning}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                idx === current
                  ? "w-8 bg-white shadow-md"
                  : "w-2.5 bg-white/50 hover:bg-white/75",
              )}
            />
          ))}
        </div>
      )}

    </div>
  );
}
