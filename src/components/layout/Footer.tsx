import Image from "next/image";
import Link from "next/link";
import { DoubleRule } from "@/components/hero/DoubleRule";
import { waLink } from "@/lib/whatsapp";
import { site } from "@/content/site.config";

const link =
  "inline-flex min-h-11 items-center text-claro/72 transition-colors duration-150 hover:text-claro";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="sobre-tinta relative z-10 bg-tinta pb-[calc(88px+env(safe-area-inset-bottom))] pt-16 text-claro md:pb-12 md:pt-20">
      <div className="contenedor">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <Image src="/brand/logo.png" alt="" width={40} height={40} className="h-10 w-10 object-contain" />
              <span className="font-display text-xl font-semibold tracking-tight">{site.brand}</span>
            </div>
            <p className="mt-5 text-claro/72">
              C.P. {site.owner}
              {site.cedula ? <>. Cédula profesional {site.cedula}.</> : null}
            </p>
            <p className="mt-1 text-claro/72">{site.locality}</p>
            <p className="mt-1 text-claro/72">{site.hours}</p>
          </div>

          <nav aria-label="Pie de página" className="grid gap-8 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h2 className="font-display text-base font-semibold">Servicios</h2>
              <ul className="mt-2">
                <li><Link className={link} href="/frontera">Estímulo región fronteriza</Link></li>
                <li><Link className={link} href="/regularizacion">Regularización fiscal</Link></li>
                <li><Link className={link} href="/constituir-sas">Constituir una SAS</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="font-display text-base font-semibold">Legal</h2>
              <ul className="mt-2">
                <li><Link className={link} href="/aviso-de-privacidad">Aviso de privacidad</Link></li>
                <li><Link className={link} href="/terminos">Términos</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="font-display text-base font-semibold">Contacto</h2>
              <ul className="mt-2">
                <li><a className={link} href={waLink("general")} target="_blank" rel="noopener">WhatsApp</a></li>
                <li><a className={link} href={`mailto:${site.email}`}>Correo</a></li>
                <li><a className={link} href={site.social.linkedin} target="_blank" rel="noopener">LinkedIn</a></li>
                <li><a className={link} href={site.social.facebook} target="_blank" rel="noopener">Facebook</a></li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Tercer y último uso de la doble raya: ancho completo, se dibuja una sola vez. */}
        <DoubleRule className="mt-14 block" />
        <p className="mt-6 text-sm text-claro/72">
          © {year} {site.brand}
        </p>
      </div>
    </footer>
  );
}
