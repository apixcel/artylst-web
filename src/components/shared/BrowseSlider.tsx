"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperProps } from "swiper/react";
import { FreeMode } from "swiper/modules";

export type BrowseItem = {
  name: string;
  image: string;
  route: string;
  imageAlt?: string;
};

type ViewAllConfig = { href: string; label?: string; ariaLabel?: string } | false;

type Shape = "circle" | "rounded";

export interface BrowseSwiperProps {
  items: BrowseItem[];
  viewAll?: ViewAllConfig;
  className?: string;
  imageClassName?: string;
  itemTitleClassName?: string;
  shape?: Shape;
  imageSizes?: string;
  breakpoints?: SwiperProps["breakpoints"];
  spaceBetween?: number;
  baseSlidesPerView?: number;
  freeMode?: boolean;
  ariaLabel?: string;
}

const DEFAULT_BREAKPOINTS: SwiperProps["breakpoints"] = {
  1440: { slidesPerView: 8 },
  1280: { slidesPerView: 7.5 },
  1024: { slidesPerView: 7.3 },
  768: { slidesPerView: 5.9 },
  640: { slidesPerView: 5.3 },
  480: { slidesPerView: 4 },
  420: { slidesPerView: 3.5 },
  320: { slidesPerView: 3 },
};

const BrowseSlider = ({
  items,
  viewAll = { href: "/browse", label: "View all" },
  className,
  imageClassName,
  itemTitleClassName,
  shape = "circle",
  imageSizes = "(max-width: 1024px) 33vw, 12vw",
  breakpoints = DEFAULT_BREAKPOINTS,
  spaceBetween = 12,
  baseSlidesPerView = 1,
  freeMode = true,
  ariaLabel,
}: BrowseSwiperProps) => {
  const roundedClass = shape === "circle" ? "rounded-full" : "rounded-2xl";

  return (
    <Swiper
      aria-label={ariaLabel}
      className={className}
      modules={[FreeMode]}
      spaceBetween={spaceBetween}
      slidesPerView={baseSlidesPerView}
      freeMode={freeMode}
      breakpoints={breakpoints}
    >
      {items.map((star) => (
        <SwiperSlide key={star.name} className="!h-auto">
          <Link href={star.route} className="group block" aria-label={star.name}>
            <div className="mb-[10px] aspect-square relative">
              <Image
                src={star.image}
                alt={star.imageAlt ?? star.name}
                fill
                sizes={imageSizes}
                className={`object-cover border border-light group-hover:border-muted ${roundedClass} ${imageClassName ?? ""}`}
              />
            </div>
            <h4
              className={`text-center group-hover:text-muted underline ${itemTitleClassName ?? ""}`}
            >
              {star.name}
            </h4>
          </Link>
        </SwiperSlide>
      ))}

      {viewAll && (
        <SwiperSlide className="!h-auto">
          <div className="mb-[10px] aspect-square">
            <Link
              href={viewAll.href}
              aria-label={viewAll.ariaLabel ?? viewAll.label ?? "View all"}
              className={`w-full h-full ${roundedClass} border border-light hover:text-muted hover:border-muted underline flex items-center justify-center text-center`}
            >
              {viewAll.label ?? "View all"}
            </Link>
          </div>
        </SwiperSlide>
      )}
    </Swiper>
  );
};

export default BrowseSlider;
