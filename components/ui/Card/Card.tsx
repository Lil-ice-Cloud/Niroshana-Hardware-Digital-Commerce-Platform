"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCart,
  Heart,
  Star,
  Package,
  Zap,
  Truck,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

export type ProductBadge = {
  label: string;
  variant?: "sale" | "new" | "featured" | "info";
};

export interface ProductCardData {
  id: string | number;

  image: string;

  alt: string;

  name: string;

  brand?: string;

  sku?: string;

  price: number;

  originalPrice?: number;

  currency?: string;

  rating?: number;

  reviewCount?: number;

  stock?: StockStatus;

  stockQuantity?: number;

  href: string;

  badges?: ProductBadge[];

  category?: string;

  bulkDiscount?: string;

  freeShipping?: boolean;
}

export interface CardProps {
  product: ProductCardData;

  variant?: "default" | "compact" | "horizontal";

  onAddToCart?: (product: ProductCardData) => void;

  onToggleWishlist?: (product: ProductCardData) => void;

  isWishlisted?: boolean;

  className?: string;
}

const badgeVariantStyles: Record<string, string> = {
  sale: "bg-red-600 text-white",
  new: "bg-emerald-600 text-white",
  featured: "bg-amber-600 text-white",
  info: "bg-primary text-primary-foreground",
};

const stockConfig: Record<
  StockStatus,
  { label: string; dot: string; icon: React.ReactNode }
> = {
  in_stock: {
    label: "In Stock",
    dot: "bg-emerald-500",
    icon: null,
  },
  low_stock: {
    label: "Only {qty} left",
    dot: "bg-amber-500",
    icon: <Zap className="h-3 w-3 text-amber-500" aria-hidden="true" />,
  },
  out_of_stock: {
    label: "Out of Stock",
    dot: "bg-red-500",
    icon: <Package className="h-3 w-3 text-red-500" aria-hidden="true" />,
  },
};

function formatPrice(value: number, currency = "Rs."): string {
  return `${currency} ${value.toLocaleString("en-LK")}`;
}

function renderStars(rating: number) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden="true">
      {Array.from({ length: full }, (_, i) => (
        <Star
          key={`full-${i}`}
          className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
        />
      ))}
      {half && (
        <Star
          key="half"
          className="h-3.5 w-3.5 fill-amber-400/50 text-amber-400"
        />
      )}
      {Array.from({ length: empty }, (_, i) => (
        <Star
          key={`empty-${i}`}
          className="h-3.5 w-3.5 text-muted-foreground/30"
        />
      ))}
    </span>
  );
}

function ImageSection({
  product,
  isWishlisted,
  onToggleWishlist,
}: {
  product: ProductCardData;
  isWishlisted?: boolean;
  onToggleWishlist?: (p: ProductCardData) => void;
}) {
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          (1 - product.price / product.originalPrice) * 100,
        )
      : 0;

  return (
    <div className="relative aspect-square overflow-hidden bg-muted">

      <Image
        src={product.image}
        alt={product.alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className={cn(
          "object-cover transition-transform duration-500 ease-out",
          "group-hover:scale-110",
        )}
        draggable={false}
      />

      <div className="absolute left-2 top-2 z-10 flex flex-col gap-1.5">
        {product.badges?.map((b, i) => (
          <span
            key={i}
            className={cn(
              "inline-block rounded-md px-2 py-0.5 text-[11px] font-bold uppercase leading-tight tracking-wider",
              badgeVariantStyles[b.variant ?? "info"],
            )}
          >
            {b.label}
          </span>
        ))}
        {discount > 0 && (
          <span className="inline-block rounded-md bg-red-600 px-2 py-0.5 text-[11px] font-bold uppercase leading-tight tracking-wider text-white">
            -{discount}%
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          onToggleWishlist?.(product);
        }}
        className={cn(
          "absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full",
          "bg-background/70 backdrop-blur-sm",
          "transition-all duration-200 hover:scale-110",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          isWishlisted && "bg-background",
        )}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart
          className={cn(
            "h-4 w-4 transition-colors",
            isWishlisted
              ? "fill-red-500 text-red-500"
              : "text-muted-foreground",
          )}
        />
      </button>

      {product.stock === "out_of_stock" && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-[2px]">
          <span className="rounded-md bg-foreground/80 px-4 py-1.5 text-sm font-semibold text-background">
            Out of Stock
          </span>
        </div>
      )}
    </div>
  );
}

function PriceSection({
  product,
}: {
  product: ProductCardData;
}) {
  const { price, originalPrice, currency, bulkDiscount } = product;
  const hasDiscount = originalPrice != null && originalPrice > price;

  return (
    <div className="mt-1.5 flex items-baseline gap-2">
      <span className="text-lg font-bold text-foreground">
        {formatPrice(price, currency)}
      </span>
      {hasDiscount && (
        <span className="text-sm text-muted-foreground line-through decoration-muted-foreground/50">
          {formatPrice(originalPrice, currency)}
        </span>
      )}
      {bulkDiscount && (
        <span
          className="ml-auto text-[11px] font-medium text-primary"
          title="Bulk / wholesale discount available"
        >
          Bulk %
        </span>
      )}
    </div>
  );
}

function StockBadge({ product }: { product: ProductCardData }) {
  const status = product.stock ?? "in_stock";
  const cfg = stockConfig[status];
  let label = cfg.label;

  if (status === "low_stock" && product.stockQuantity != null) {
    label = `Only ${product.stockQuantity} left`;
  }

  if (status === "out_of_stock") return null;

  return (
    <div className="mt-1.5 flex items-center gap-1.5">
      <span
        className={cn("inline-block h-1.5 w-1.5 rounded-full", cfg.dot)}
        aria-hidden="true"
      />
      <span className="text-xs text-muted-foreground">{label}</span>
      {product.freeShipping && (
        <span className="ml-auto inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400">
          <Truck className="h-3 w-3" />
          Free ship
        </span>
      )}
    </div>
  );
}

export default function Card({
  product,
  variant = "default",
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
  className,
}: CardProps) {
  const [imgError, setImgError] = useState(false);

  if (variant === "horizontal") {
    return (
      <article
        className={cn(
          "group relative flex gap-4 rounded-xl border border-border bg-card p-3",
          "transition-all duration-200 hover:border-primary/10 hover:shadow-md",
          "sm:gap-5 sm:p-4",
          className,
        )}
      >
        <Link
          href={product.href}
          className="relative aspect-square h-28 shrink-0 overflow-hidden rounded-lg bg-muted sm:h-36"
          aria-label={`View ${product.name}`}
        >
          {imgError ? (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <Package className="h-8 w-8" />
            </div>
          ) : (
            <Image
              src={product.image}
              alt={product.alt}
              fill
              sizes="144px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImgError(true)}
              draggable={false}
            />
          )}
        </Link>

        <div className="flex min-w-0 flex-1 flex-col justify-between gap-1 py-0.5">
          <div className="space-y-0.5">
            {product.brand && (
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {product.brand}
              </span>
            )}
            <Link href={product.href}>
              <h3 className="line-clamp-2 text-sm font-semibold text-foreground leading-snug transition-colors hover:text-primary">
                {product.name}
              </h3>
            </Link>
            {product.rating != null && (
              <div className="flex items-center gap-1.5">
                {renderStars(product.rating)}
                {product.reviewCount != null && (
                  <span className="text-[11px] text-muted-foreground">
                    ({product.reviewCount})
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-2">
            <PriceSection product={product} />
            <button
              type="button"
              onClick={() => onAddToCart?.(product)}
              disabled={product.stock === "out_of_stock"}
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                "bg-primary text-primary-foreground",
                "transition-all duration-200 hover:opacity-90 active:scale-95",
                "disabled:cursor-not-allowed disabled:opacity-40",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
              )}
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
          </div>
        </div>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article
        className={cn(
          "group relative overflow-hidden rounded-xl border border-border bg-card",
          "transition-all duration-200 hover:border-primary/30 hover:shadow-md",
          className,
        )}
      >
        <ImageSection
          product={product}
          isWishlisted={isWishlisted}
          onToggleWishlist={onToggleWishlist}
        />

        <div className="space-y-1 p-3">
          {product.brand && (
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {product.brand}
            </span>
          )}
          <Link href={product.href}>
            <h3 className="line-clamp-2 text-sm font-semibold text-foreground leading-snug transition-colors hover:text-primary">
              {product.name}
            </h3>
          </Link>
          <PriceSection product={product} />
          <StockBadge product={product} />
        </div>

        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 z-10",
            "translate-y-full transition-transform duration-300",
            "group-hover:translate-y-0",
          )}
        >
          <button
            type="button"
            onClick={() => onAddToCart?.(product)}
            disabled={product.stock === "out_of_stock"}
            className={cn(
              "flex w-full items-center justify-center gap-2 py-2.5 text-sm font-semibold",
              "bg-primary text-primary-foreground",
              "transition-opacity hover:opacity-90",
              "disabled:cursor-not-allowed disabled:opacity-40",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
            )}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </button>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card",
        "transition-all duration-200",
        "hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5",
        className,
      )}
    >

      <Link
        href={product.href}
        className="relative aspect-square overflow-hidden bg-muted"
        aria-label={`View ${product.name}`}
        tabIndex={-1}
      >
        {imgError ? (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <Package className="h-12 w-12" />
          </div>
        ) : (
          <Image
            src={product.image}
            alt={product.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={cn(
              "object-cover transition-transform duration-500 ease-out",
              "group-hover:scale-110",
            )}
            onError={() => setImgError(true)}
            draggable={false}
          />
        )}

        <div className="absolute left-2 top-2 z-10 flex flex-col gap-1.5">
          {product.badges?.map((b, i) => (
            <span
              key={i}
              className={cn(
                "inline-block rounded-md px-2 py-0.5 text-[11px] font-bold uppercase leading-tight tracking-wider",
                badgeVariantStyles[b.variant ?? "info"],
              )}
            >
              {b.label}
            </span>
          ))}
          {product.originalPrice != null &&
            product.originalPrice > product.price && (
              <span className="inline-block rounded-md bg-red-600 px-2 py-0.5 text-[11px] font-bold uppercase leading-tight tracking-wider text-white">
                -
                {Math.round(
                  (1 - product.price / product.originalPrice) * 100,
                )}
                %
              </span>
            )}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onToggleWishlist?.(product);
          }}
          className={cn(
            "absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full",
            "bg-background/70 backdrop-blur-sm",
            "opacity-0 transition-all duration-200 group-hover:opacity-100",
            "hover:scale-110 focus-visible:opacity-100",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
            isWishlisted && "opacity-100",
          )}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "text-muted-foreground",
            )}
          />
        </button>

        {product.stock === "out_of_stock" && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-[2px]">
            <span className="rounded-md bg-foreground/80 px-4 py-1.5 text-sm font-semibold text-background">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col justify-between gap-1.5 p-4">

        <div className="flex items-center gap-2">
          {product.category && (
            <span className="rounded bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              {product.category}
            </span>
          )}
          {product.brand && (
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {product.brand}
            </span>
          )}
        </div>

        <Link href={product.href}>
          <h3 className="line-clamp-2 text-sm font-semibold text-foreground leading-snug transition-colors hover:text-primary">
            {product.name}
          </h3>
        </Link>

        {product.sku && (
          <p className="text-[11px] text-muted-foreground/60">
            SKU: {product.sku}
          </p>
        )}

        {product.rating != null && (
          <div className="flex items-center gap-1.5">
            <span className="sr-only">{product.rating} out of 5 stars</span>
            {renderStars(product.rating)}
            {product.reviewCount != null && (
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount})
              </span>
            )}
          </div>
        )}

        <PriceSection product={product} />

        <StockBadge product={product} />

        <button
          type="button"
          onClick={() => onAddToCart?.(product)}
          disabled={product.stock === "out_of_stock"}
          className={cn(
            "mt-2 flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold",
            "bg-primary text-primary-foreground",
            "transition-all duration-200",
            "hover:opacity-90 active:scale-[0.98]",
            "disabled:cursor-not-allowed disabled:opacity-40",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          )}
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingCart className="h-4 w-4" />
          {product.stock === "out_of_stock" ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}
