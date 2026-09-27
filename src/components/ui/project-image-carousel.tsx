"use client";
import { withBasePath } from "@/lib/basePath";
import { useEffect, useState } from "react";

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

  // Automatic image change every 3.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setPreviousIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearTimeout(timer);
  }, [currentIndex, images.length]);

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
      <div className="relative mx-auto max-w-[1100px] overflow-hidden border border-cream/10 bg-ink/40 shadow-[0_30px_60px_rgba(0,0,0,0.35)]">

        {/* Previous image - fades out */}
        {previousIndex !== null && (
          <img
            src={withBasePath(images[previousIndex])}
            alt=""
            className="absolute inset-0 h-[360px] w-full rounded-none object-cover scale-[1.03] opacity-0 transition-all duration-700 ease-out md:h-[520px]"
          />
        )}

        {/* Current image - fades in */}
        <img
          src={withBasePath(images[currentIndex])}
          alt={`${title} gallery view ${currentIndex + 1}`}
          className="relative h-[360px] w-full rounded-none object-cover scale-100 opacity-100 transition-all duration-700 ease-out md:h-[520px]"
        />

        <button
          type="button"
          aria-label="Previous image"
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-cream/20 bg-black/30 text-xl text-cream transition hover:bg-black/50"
        >
          ‹
        </button>

        <button
          type="button"
          aria-label="Next image"
          onClick={goToNext}
          className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-cream/20 bg-black/30 text-xl text-cream transition hover:bg-black/50"
        >
          ›
        </button>
      </div>
      <div className="mx-auto mt-6 max-w-[1100px] border-t border-cream/10 pt-4 md:mt-8 md:pt-5">
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-7 md:gap-x-6 md:gap-y-5">
          {details.map((item) => (
            <div
              key={item.label}
              className={item.label === "Client" ? "min-w-0 md:col-span-2" : "min-w-0"}
            >
              <p className="text-[10px] uppercase tracking-[0.28em] text-sky/90 md:text-[11px]">
                {item.label}
              </p>

              <p className="mt-2 whitespace-nowrap text-sm text-cream md:text-base">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}