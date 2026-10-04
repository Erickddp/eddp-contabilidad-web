"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EASE_EXPO } from "@/lib/motion";
import { waLink } from "@/lib/whatsapp";
import { trackWhatsapp } from "@/lib/analytics";
import { site } from "@/content/site.config";
import { navLinks } from "./nav-links";

const MENU_ID = "menu-movil";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback((returnFocus = false) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloqueo de scroll, Esc y trampa de foco mientras el menú está abierto.
  useEffect(() => {
    const html = document.documentElement;
    if (!open) {
      delete html.dataset.menu;
      document.body.style.overflow = "";
      return;
    }
    html.dataset.menu = "open";
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close(true);
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = [
        buttonRef.current,
        ...(panelRef.current?.querySelectorAll<HTMLElement>("a[href]") ?? []),
      ].filter(Boolean) as HTMLElement[];
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      delete html.dataset.menu;
      document.body.style.overflow = "";
    };
  }, [open, close]);

  // Si se pasa a desktop con el menú abierto, se cierra.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header
      data-hero="nav"
      className={`sobre-tinta fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled && !open ? "bg-tinta/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="contenedor flex h-[var(--nav-h)] items-center justify-between gap-4">
        <Link
          href="/"
          className="flex min-h-11 items-center gap-3 text-claro"
          aria-label={`${site.brand}, inicio`}
        >
          <Image
            src="/brand/logo.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />
          <span className="font-display text-lg font-semibold tracking-tight">
            <span className="md:hidden">{site.shortBrand}</span>
            <span className="hidden md:inline">{site.brand}</span>
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="vidrio flex items-center gap-1 rounded-full p-1.5">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex min-h-11 items-center rounded-full px-4 text-[15px] text-claro/85 transition-colors duration-150 hover:bg-claro/10 hover:text-claro"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            href={waLink("general")}
            external
            className="max-lg:!hidden !h-11"
            onClick={() => trackWhatsapp("nav", "general")}
          >
            Escríbeme
          </Button>

          <button
            ref={buttonRef}
            type="button"
            className="relative inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-boton border border-claro/25 text-claro transition-colors duration-150 hover:bg-claro/10 lg:hidden"
            aria-expanded={open}
            aria-controls={MENU_ID}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            {/* Los dos íconos siempre montados: se cruzan rotando. */}
            <Menu
              size={22}
              aria-hidden="true"
              className="absolute transition-all duration-300 ease-[var(--ease-expo)]"
              style={{ opacity: open ? 0 : 1, transform: `rotate(${open ? 90 : 0}deg)` }}
            />
            <X
              size={22}
              aria-hidden="true"
              className="absolute transition-all duration-300 ease-[var(--ease-expo)]"
              style={{ opacity: open ? 1 : 0, transform: `rotate(${open ? 0 : -90}deg)` }}
            />
          </button>
        </div>
      </div>

      {/* Menú móvil: panel de vidrio que baja con escala 0.97→1. */}
      <motion.div
        id={MENU_ID}
        ref={panelRef}
        className="vidrio absolute inset-x-[var(--gutter)] top-[calc(var(--nav-h)-4px)] bg-tinta/90 p-3 lg:hidden"
        initial={false}
        animate={{ opacity: open ? 1 : 0, scale: open ? 1 : 0.97, y: open ? 0 : -8 }}
        transition={{ duration: 0.6, ease: EASE_EXPO }}
        style={{ pointerEvents: open ? "auto" : "none", transformOrigin: "top center" }}
        aria-hidden={!open}
        inert={!open}
      >
        <ul>
          {navLinks.map((l, i) => (
            <motion.li
              key={l.href}
              initial={false}
              animate={{ opacity: open ? 1 : 0, y: open ? 0 : 8 }}
              transition={{ duration: 0.5, ease: EASE_EXPO, delay: open ? 0.08 + i * 0.05 : 0 }}
            >
              <Link
                href={l.href}
                onClick={() => close()}
                className="flex min-h-12 items-center rounded-boton px-4 font-display text-xl text-claro transition-colors duration-150 hover:bg-claro/10"
              >
                {l.label}
              </Link>
            </motion.li>
          ))}
        </ul>
        <div className="p-3 pt-4">
          <Button
            href={waLink("general")}
            external
            className="w-full"
            onClick={() => trackWhatsapp("menu", "general")}
          >
            Escríbeme por WhatsApp
          </Button>
        </div>
      </motion.div>
    </header>
  );
}
