"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { withBasePath } from "@/lib/paths";

export function ProjectImageCarousel({
  title,
  images,
  details,
}: {
  title: string;
  images: readonly string[];
  details: readonly { label: string; value: string }[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Manual image change only
  const changeImage = (direction: 1 | -1) => {
    setPreviousIndex(currentIndex);

    setCurrentIndex(
      (prev) => (prev + direction + images.length) % images.length
    );
  };

  const goToPrevious = () => {
    changeImage(-1);
  };

  const goToNext = () => {
    changeImage(1);
  };

  return (
    <div className="mt-6 md:mt-8">
      {/* Main Image Carousel */}
      <div className="relative mx-auto max-w-[1100px] overflow-hidden border border-cream/10 bg-ink/40 shadow-[0_30px_60px_rgba(0,0,0,0.35)]">

        {/* Previous image - fades out */}
        {previousIndex !== null && (
          <img
            src={withBasePath(images[previousIndex])}
            alt=""
            className="absolute inset-0 h-[360px] w-full rounded-none object-cover scale-[1.03] opacity-0 transition-all duration-700 ease-out md:h-[520px]"
          />
        )}

        {/* Current image - normal view */}
        <img
          src={withBasePath(images[currentIndex])}
          alt={`${title} gallery view ${currentIndex + 1}`}
          onClick={() => setIsFullscreen(true)}
          className="relative h-[360px] w-full rounded-none object-cover scale-100 opacity-100 transition-all duration-700 ease-out md:h-[520px] cursor-zoom-in"
        />

        {/* Previous button */}
        <button
          type="button"
          aria-label="Previous image"
          onClick={goToPrevious}
          className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/60 text-white shadow-[0_4px_24px_rgba(0,0,0,0.6)] backdrop-blur-md transition duration-200 hover:scale-110 hover:border-orange hover:bg-orange md:left-6 md:h-12 md:w-12"
        >
          <ChevronLeft className="size-5 md:size-6" strokeWidth={2.25} />
        </button>

        {/* Next button */}
        <button
          type="button"
          aria-label="Next image"
          onClick={goToNext}
          className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/60 text-white shadow-[0_4px_24px_rgba(0,0,0,0.6)] backdrop-blur-md transition duration-200 hover:scale-110 hover:border-orange hover:bg-orange md:right-6 md:h-12 md:w-12"
        >
          <ChevronRight className="size-5 md:size-6" strokeWidth={2.25} />
        </button>
      </div>

      {/* Project Details */}
      <div className="mx-auto mt-6 max-w-[1100px] border-t border-cream/10 pt-4 md:mt-8 md:pt-5">
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-6 md:gap-x-6 md:gap-y-5">
          {details.map((item) => (
            <div key={item.label} className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.28em] text-sky/90 md:text-[11px]">
                {item.label}
              </p>

              <p className="mt-2 text-sm text-cream md:text-base">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Image Viewer */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-[9990] flex items-center justify-center bg-black/95"
          onClick={() => setIsFullscreen(false)}
        >
          {/* Close button */}
          <button
            type="button"
            aria-label="Close fullscreen"
            onClick={() => setIsFullscreen(false)}
            className="absolute right-4 top-4 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-black/60 text-white shadow-[0_4px_24px_rgba(0,0,0,0.6)] backdrop-blur-md transition duration-200 hover:scale-110 hover:border-orange hover:bg-orange md:right-8 md:top-8 md:h-14 md:w-14"
          >
            <X className="size-6 md:size-7" strokeWidth={2.25} />
          </button>

          {/* Previous image */}
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/60 text-white shadow-[0_4px_24px_rgba(0,0,0,0.6)] backdrop-blur-md transition duration-200 hover:scale-110 hover:border-orange hover:bg-orange md:left-8 md:h-14 md:w-14"
          >
            <ChevronLeft className="size-6 md:size-7" strokeWidth={2.25} />
          </button>

          {/* Fullscreen image - NO CROP */}
          <img
            src={withBasePath(images[currentIndex])}
            alt={`${title} fullscreen view ${currentIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[95vh] max-w-[95vw] object-contain"
          />

          {/* Next image */}
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/60 text-white shadow-[0_4px_24px_rgba(0,0,0,0.6)] backdrop-blur-md transition duration-200 hover:scale-110 hover:border-orange hover:bg-orange md:right-8 md:h-14 md:w-14"
          >
            <ChevronRight className="size-6 md:size-7" strokeWidth={2.25} />
          </button>
        </div>
      )}
    </div>
  );
}