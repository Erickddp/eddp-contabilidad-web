"use client";

import type { ReactNode } from "react";

type Variant = "primario" | "secundario" | "papel-oscuro";

const base =
  "inline-flex items-center justify-center gap-2 rounded-boton font-medium whitespace-nowrap transition-colors duration-150 cursor-pointer";

const sizes = {
  // 48 px en móvil, 52 px en desktop
  md: "h-12 md:h-[52px] px-5 md:px-7 text-[15px] md:text-base",
  // Botones dentro de tarjetas: 44 px
  sm: "h-11 px-4 text-sm",
};

const variants: Record<Variant, string> = {
  // Papel sobre tinta (botón principal)
  primario: "bg-papel text-tinta hover:bg-white",
  // Borde de 1 px con texto claro
  secundario: "border border-claro/40 text-claro hover:bg-claro/10",
  // Para fondos de papel
  "papel-oscuro": "bg-tinta text-claro hover:bg-tinta-2",
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
