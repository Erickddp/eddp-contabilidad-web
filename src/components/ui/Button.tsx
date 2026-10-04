"use client";

import type { ReactNode } from "react";

type Variant = "primario" | "secundario" | "papel-oscuro";

const base =
  "inline-flex h-12 md:h-[52px] items-center justify-center gap-2 rounded-boton px-6 md:px-7 text-[15px] md:text-base font-medium whitespace-nowrap transition-colors duration-150 cursor-pointer";

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
};

export function Button({
  href,
  children,
  variant = "primario",
  external,
  className = "",
  onClick,
  icon,
}: Props) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
    >
      {icon}
      {children}
    </a>
  );
}
