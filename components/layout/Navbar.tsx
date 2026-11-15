"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { navItems, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openAt, setOpenAt] = useState<string | null>(null);
  // Menu auto-closes on navigation because it is tied to the pathname it was opened on.
  const open = openAt === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        open ? "bg-transparent py-3" : solid ? "bg-transparent py-3 max-lg:bg-navy/95 max-lg:shadow-lg max-lg:backdrop-blur" : "bg-transparent py-4 sm:py-5",
      )}
    >
      <nav aria-label="Main" className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="block" aria-label={`${site.name} home`}>
          <Image
            src="/logo-transparent.png"
            alt={site.name}
            width={1342}
            height={908}
            priority
            className={cn("w-auto drop-shadow-lg transition-all duration-300", solid ? "h-14 sm:h-16" : "h-14 sm:h-24")}
          />
        </Link>

        <ul className="hidden items-center gap-8 rounded-full border border-white/10 bg-navy px-8 py-3 shadow-xl shadow-navy/40 lg:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "relative py-1 text-sm font-semibold transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:bg-turquoise after:transition-transform",
                  isActive(item.href)
                    ? "text-turquoise after:scale-x-100"
                    : "text-white after:scale-x-0 hover:text-turquoise hover:after:scale-x-100",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ButtonLink href="/packages" variant="gold" size="sm" className={cn("px-4 sm:px-5", open && "max-lg:hidden")}>
            Book Now
          </ButtonLink>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full text-white hover:bg-white/10 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpenAt(open ? null : pathname)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            onClick={() => setOpenAt(null)}
            className="fixed inset-0 -z-10 bg-black/50 lg:hidden"
          />
          <div
            id="mobile-menu"
            className="drawer-in fixed inset-y-0 right-0 flex w-72 max-w-[85vw] flex-col overflow-y-auto bg-navy px-5 pb-6 pt-4 shadow-2xl shadow-black/40 lg:hidden"
          >
            <div className="mb-4 flex items-center justify-between">
              <Link href="/" aria-label={`${site.name} home`}>
                <Image src="/logo-transparent.png" alt="" width={1342} height={908} className="h-12 w-auto" />
              </Link>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpenAt(null)}
                className="flex h-11 w-11 items-center justify-center rounded-full text-white hover:bg-white/10"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <ul className="space-y-0.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "block rounded-xl px-4 py-2.5 font-display text-lg",
                      isActive(item.href) ? "bg-white/10 text-turquoise" : "text-white hover:bg-white/5",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ButtonLink href="/packages" variant="gold" size="md" className="mt-6 w-full">
              Book Now
            </ButtonLink>
          </div>
        </>
      )}
    </header>
  );
}
