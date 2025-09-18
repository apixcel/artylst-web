"use client";

import { useAppSelector } from "@/hooks";
import { Check, HeadphonesIcon, Info, MegaphoneIcon, MusicIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MouseEvent } from "react";
import {
  useGetBusinessPricingTierByUserNameQuery,
  useGetPricingTierByUserNameQuery,
} from "@/redux/features/artist/pricingTier.api";

const ArtistWhatOffer = () => {
  const { userName } = useParams<{ userName: string }>();
  const { user } = useAppSelector((state) => state.user);
  const role = user?.role;

  // fetch tiers
  const { data: personalTiersData, isLoading: isPersonalTiersLoading } =
    useGetPricingTierByUserNameQuery({ userName });
  const personalTiers = personalTiersData?.data || [];

  const { data: businessTiersData, isLoading } = useGetBusinessPricingTierByUserNameQuery(
    { userName }
  );
  const businessTiers = businessTiersData?.data || [];

  // permission rules
  const isPersonalDisabledBase = role === "artist" || role === "business";
  const isBusinessDisabledBase = role === "artist" || role === "fan";
  const isMoreDisabled = role === "artist";

  // === Availability rules (consider ACTIVE state) ===
  const hasActivePersonal = personalTiers.some((t) => t.isActive);
  const noPersonalAvailable = !isPersonalTiersLoading && !hasActivePersonal;
  const isPersonalDisabled = isPersonalDisabledBase || noPersonalAvailable;

  const hasActiveBusiness = businessTiers.some((t) => t.isActive);
  const noBusinessAvailable = !isLoading && !hasActiveBusiness;
  const isBusinessDisabled = isBusinessDisabledBase || noBusinessAvailable;

  const guardClick = (disabled: boolean) => (e: MouseEvent) => {
    if (disabled) e.preventDefault();
  };

  const linkProps = (
    href: string,
    disabled: boolean,
    variant: "primary" | "ghost" = "primary"
  ) => ({
    href,
    onClick: guardClick(disabled),
    "aria-disabled": disabled || undefined,
    tabIndex: disabled ? -1 : 0,
    className: [
      "btn",
      variant === "primary" ? "btn-primary" : "btn-ghost",
      "w-full mt-3",
      disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "",
    ].join(" "),
  });

  const DisabledMsg = ({
    message,
    cta,
  }: {
    message: string;
    cta?: { href: string; label?: string };
  }) => (
    <p className="text-xs text-gray inline-flex gap-1.5 mt-2">
      <Info className="max-w-3.5 w-full h-3.5 text-gold mt-[2px]" />
      <span>
        {message}{" "}
        {cta && (
          <Link
            href={cta.href}
            className="underline text-xs text-gold hover:text-gold/80"
          >
            {cta.label ?? "click here"}
          </Link>
        )}
      </span>
    </p>
  );

  return (
    <div className="xl:w-full w-full sm:w-1/2">
      <h4 className="text-lg font-semibold mb-2">What I Offer</h4>

      {/* Personal Playlist */}
      <div className="relative mb-4">
        <div
          className={`card p-4 ${noPersonalAvailable ? "blur-[2px] select-none" : ""}`}
        >
          <h5 className="font-medium mb-2 flex items-center gap-2">
            <HeadphonesIcon className="w-5 h-5" /> Personal Playlist
          </h5>
          <ul className="list-disc list-inside text-sm space-y-1 text-muted">
            <li>Customized to your mood &amp; taste</li>
            <li>Handpicked by top artists</li>
            <li>Perfect for daily listening</li>
          </ul>
          <Link {...linkProps(`/artists/${userName}/book`, isPersonalDisabled)}>
            Request Personal Playlist
          </Link>
          {isPersonalDisabled && (
            <DisabledMsg
              message="Sorry, you cannot request personal playlist using this account"
              cta={{ href: "/register", label: "Click here" }}
            />
          )}
        </div>

        {/* Overlay when no ACTIVE personal tiers */}
        {noPersonalAvailable && (
          <div className="absolute inset-0 z-10 grid place-items-center rounded-xl bg-black/40 backdrop-blur-sm">
            <div className="text-center px-6 py-4">
              <p className="text-white font-medium">
                This artist doesn&apos;t offer a personal playlist right now
              </p>
              <p className="text-white/80 text-xs mt-1">
                Try another artist or{" "}
                <Link href="/business/contact" className="underline">
                  contact us
                </Link>{" "}
                for custom options.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Business Playlist (with blur + overlay if no ACTIVE tiers) */}
      <div className="relative mb-4">
        {/* Card content */}
        <div
          className={`card p-4 ${noBusinessAvailable ? "blur-[2px] select-none" : ""}`}
        >
          <h5 className="font-medium mb-2 flex items-center gap-2">
            <MusicIcon className="w-5 h-5" /> Business Playlist
          </h5>
          <ul className="text-sm space-y-1 text-muted">
            <li className="flex gap-2">
              <Check className="w-3 h-3 text-brand-4 mt-[2px]" /> Curated for restaurants,
              cafés &amp; events
            </li>
            <li className="flex gap-2">
              <Check className="w-3 h-3 text-brand-4 mt-[2px]" /> Enhance your brand
              identity with music
            </li>
            <li className="flex gap-2">
              <Check className="w-3 h-3 text-brand-4 mt-[2px]" /> Licensed &amp; ready for
              commercial use
            </li>
          </ul>
          <Link
            {...linkProps(
              `/artists-for-business/${userName}/checkout`,
              isBusinessDisabled
            )}
          >
            Request Business Playlist
          </Link>
          {isBusinessDisabledBase && (
            <DisabledMsg
              message="Sorry, you cannot request business playlist using this account. To get access to this feature,"
              cta={{ href: "/business-form", label: "Click here" }}
            />
          )}
        </div>

        {/* Overlay when no ACTIVE business tiers */}
        {noBusinessAvailable && (
          <div className="absolute inset-0 z-10 grid place-items-center rounded-xl bg-black/40 backdrop-blur-sm">
            <div className="text-center px-6 py-4">
              <p className="text-white font-medium">
                This artist doesn&apos;t offer a business playlist right now
              </p>
              <p className="text-white/80 text-xs mt-1">
                Try another artist or{" "}
                <Link href="/business/contact" className="underline">
                  contact us
                </Link>{" "}
                for custom options.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* More Features */}
      <div className="card p-4">
        <h5 className="font-medium mb-2 flex items-center gap-2">
          <MegaphoneIcon className="w-5 h-5" /> Looking for more?
        </h5>
        <p className="text-sm text-muted">
          We can help you with more features. Just let us know what you need.
        </p>
        <Link {...linkProps(`/business/contact`, isMoreDisabled, "ghost")}>
          Request More Features
        </Link>
        {isMoreDisabled && (
          <DisabledMsg message="Sorry, you cannot request more features using this account" />
        )}
      </div>
    </div>
  );
};

export default ArtistWhatOffer;
