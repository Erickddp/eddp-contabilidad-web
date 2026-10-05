"use client";

import type { ReactNode } from "react";

type Variant = "primario" | "secundario" | "fantasma";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ease-[var(--ease-expo)] cursor-pointer active:scale-[0.98]";

const sizes = {
  // 48 px en móvil, 52 px en desktop
  md: "h-12 md:h-[52px] px-5 md:px-7 text-[15px] md:text-base",
  // Botones dentro de tarjetas: 44 px
  sm: "h-11 px-4 text-sm",
};

const variants: Record<Variant, string> = {
  // Cielo con texto negro y brillo al pasar (btn-primary + btn-glow de erickddp.com)
  primario:
    "bg-cielo text-black shadow-[0_0_18px_rgba(56,189,248,0.35)] hover:bg-cielo-300 hover:shadow-[0_0_28px_rgba(56,189,248,0.55)]",
  // Contorno cielo (btn-outline)
  secundario:
    "border border-cielo/60 text-cielo-300 hover:border-cielo hover:bg-cielo/10 hover:shadow-[0_0_18px_rgba(56,189,248,0.2)]",
  // Discreto: borde blanco tenue
  fantasma: "border border-blanco/15 text-blanco/90 hover:border-blanco/30 hover:bg-blanco/5",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
  onClick?: () => void;
  icon?: ReactNode;
  size?: keyof typeof sizes;
};

export function Button({
  href,
  children,
  variant = "primario",
  external,
  className = "",
  onClick,
  icon,
  size = "md",
}: Props) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
    >
      {icon}
      {children}
    </a>
  );
}
