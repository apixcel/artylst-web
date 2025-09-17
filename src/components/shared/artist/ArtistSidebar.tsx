"use client";

import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils";
import { artistDashboardLink } from "@/constants";
import { SidebarUserCard } from "@/components";
import Image from "next/image";
import { useAppSelector } from "@/hooks";
import { IUser } from "@/interface/user.interface";
import { useEffect, useState } from "react";

const ArtistSidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const { user } = useAppSelector((state) => state.user);
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const initial: Record<string, boolean> = {};
    for (const link of artistDashboardLink) {
      if (link.submenu?.length) {
        const activeChild = link.submenu.some(
          (s) => pathname === s.route || pathname.startsWith(s.route + "/")
        );
        if (activeChild) initial[link.route] = true;
      }
    }
    setOpenMenus((prev) => ({ ...prev, ...initial }));
  }, [pathname]);

  const toggleMenu = (route: string) =>
    setOpenMenus((m) => ({ ...m, [route]: !m[route] }));

  const isRouteActive = (route: string) =>
    pathname === route || pathname.startsWith(route + "/");

  const isExact = (route: string) => pathname === route;

  const hasActiveChild = (submenu?: { route: string }[]) =>
    !!submenu?.some((s) => pathname === s.route || pathname.startsWith(s.route + "/"));

  return (
    <aside
      className={cn(
        "hidden lg:flex shrink-0 flex-col border-r border-white/10 bg-gradient-to-b from-brand-3/10 to-base-900/10 backdrop-blur-xl sticky top-0 h-screen overflow-y-auto custom-scrollbar",
        "transition-[width] duration-300 ease-out will-change-[width]",
        isOpen ? "desktop:w-72 w-64" : "desktop:w-20"
      )}
      aria-label="Artist navigation sidebar"
    >
      <div className="flex items-center justify-center">
        {isOpen && (
          <Link
            href="/"
            className="flex flex-col gap-[2px] w-full p-2 mb-2 ml-2"
            aria-label="Go to home"
          >
            <Image
              src="/images/logo/logo-no-text.png"
              alt="ARTYLST logo"
              width={100}
              height={100}
              className="w-[45px] h-[50px] ml-2"
              priority
            />
            <span className="font-logam">ARTYLST</span>
          </Link>
        )}

        <div
          className={cn(
            "px-3 py-6 flex items-center gap-3 float-right",
            isOpen ? "justify-end ml-auto" : "justify-center"
          )}
        >
          <button
            className="text-white/60 hover:text-white rounded-lg p-2 mb-auto transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isOpen ? (
              <ChevronLeft className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Nav */}
      <ul className="px-3 space-y-1">
        {artistDashboardLink.map((link) => {
          if (link.submenu?.length) {
            const parentOpen = !!openMenus[link.route];
            const parentActive = hasActiveChild(link.submenu) || isExact(link.route);
            const ParentIcon = link.icon;

            return (
              <li key={link.route}>
                <button
                  type="button"
                  className={cn(
                    "w-full group flex items-center rounded-xl hover:bg-white/10",
                    isOpen ? "gap-3 px-4 py-3" : "justify-center px-0 py-3",
                    parentActive ? "bg-white/10" : "",
                    "transition-colors"
                  )}
                  onClick={() => (isOpen ? toggleMenu(link.route) : setIsOpen(true))}
                  aria-expanded={parentOpen}
                  aria-controls={`submenu-${link.route}`}
                  title={!isOpen ? link.label : undefined}
                >
                  <ParentIcon
                    className={cn(
                      "text-muted group-hover:light",
                      isOpen ? "h-5 w-5" : "h-6 w-6"
                    )}
                    aria-hidden="true"
                  />
                  {isOpen && (
                    <>
                      <span className="font-heading flex-1 text-left">{link.label}</span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-300 ease-out",
                          parentOpen ? "rotate-180" : "rotate-0"
                        )}
                        aria-hidden="true"
                      />
                    </>
                  )}
                </button>

                {/* Submenu with Tailwind-only collapse/expand animation */}
                <div
                  id={`submenu-${link.route}`}
                  className={cn(
                    "grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out",
                    parentOpen && isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <ul className="min-h-0 mt-1 space-y-1">
                    {link.submenu.map((s) => {
                      const SubIcon = s.icon ?? link.icon;
                      const subActive = isRouteActive(s.route);
                      return (
                        <li key={s.route}>
                          <Link
                            href={s.route}
                            className={cn(
                              "group flex items-center rounded-xl hover:bg-white/10 transition-colors",
                              isOpen
                                ? "gap-3 pl-10 pr-4 py-2"
                                : "justify-center px-0 py-2",
                              subActive ? "bg-white/10" : ""
                            )}
                            aria-current={subActive ? "page" : undefined}
                            title={!isOpen ? s.label : undefined}
                          >
                            <SubIcon
                              className={cn(
                                "text-muted group-hover:light",
                                isOpen ? "h-4 w-4" : "h-6 w-6"
                              )}
                              aria-hidden="true"
                            />
                            {isOpen && <span className="font-heading">{s.label}</span>}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            );
          }

          // simple link (no submenu) — exact match only
          const Icon = link.icon;
          const active = isExact(link.route);

          return (
            <li key={link.route}>
              <Link
                href={link.route}
                className={cn(
                  "group flex items-center rounded-xl hover:bg-white/10 transition-colors",
                  isOpen ? "gap-3 px-4 py-3" : "justify-center px-0 py-3",
                  active ? "bg-white/10" : ""
                )}
                aria-current={active ? "page" : undefined}
                title={!isOpen ? link.label : undefined}
              >
                <Icon
                  className={cn(
                    "text-muted group-hover:light",
                    isOpen ? "h-5 w-5" : "h-6 w-6"
                  )}
                  aria-hidden="true"
                />
                {isOpen && <span className="font-heading">{link.label}</span>}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Footer */}
      <div className="mt-auto p-3">
        <SidebarUserCard isOpen={isOpen} user={user as IUser} />
        <div
          className={cn(
            "text-[11px] text-center text-white/50 mt-3",
            !isOpen && "text-center"
          )}
        >
          {isOpen ? "© 2025 ARTYLST" : "© 2025"}
        </div>
      </div>
    </aside>
  );
};

export default ArtistSidebar;
