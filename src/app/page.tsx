import { Hero } from "@/components/hero/Hero";
import { Casos } from "@/components/sections/Casos";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Dolores } from "@/components/sections/Dolores";
import { Estrategia } from "@/components/sections/Estrategia";
import { Franja } from "@/components/sections/Franja";
import { Precios } from "@/components/sections/Precios";
import { Preguntas } from "@/components/sections/Preguntas";
import { Proceso } from "@/components/sections/Proceso";
import { Servicios } from "@/components/sections/Servicios";
import { SobreMi } from "@/components/sections/SobreMi";
import { Tecnologia } from "@/components/sections/Tecnologia";
import { HomeMotion } from "@/components/sections/HomeMotion";

export default function Home() {
  return (
    <>
      <Hero />
      <Franja />
      <Dolores />
      <Servicios />
      <Estrategia />
      <Proceso />
      <Precios />
      <Casos />
      <Tecnologia />
      <SobreMi />
      <Preguntas />
      <CtaFinal />
      <HomeMotion />
    </>
  );
}
