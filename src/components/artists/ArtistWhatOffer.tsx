"use client";

import { useAppSelector } from "@/hooks";
import { Check, HeadphonesIcon, Info, MegaphoneIcon, MusicIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MouseEvent } from "react";

const ArtistWhatOffer = () => {
  const { userName } = useParams<{ userName: string }>();
  const { user } = useAppSelector((state) => state.user);
  const role = user?.role;

  // permission rules
  const isPersonalDisabled = role === "artist";
  const isBusinessDisabled = role === "artist" || role === "fan";
  const isMoreDisabled = role === "artist";

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

  const DisabledMsg = ({ message }: { message: string }) => (
    <p className="text-xs text-gray flex gap-1.5 mt-2">
      <Info className="w-3.5 h-3.5 mt-[2px] text-gold" /> {message}
    </p>
  );

  return (
    <div className="xl:w-full w-full sm:w-1/2">
      <h4 className="text-lg font-semibold mb-2">What I Offer</h4>

      {/* Personal Playlist */}
      <div className="mb-4 card p-4">
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
          <DisabledMsg message="Sorry, you cannot request personal playlist using this account" />
        )}
      </div>

      {/* Business Playlist */}
      <div className="card p-4 mb-4">
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
          {...linkProps(`/artists-for-business/${userName}/checkout`, isBusinessDisabled)}
        >
          Request Business Playlist
        </Link>
        {isBusinessDisabled && (
          <DisabledMsg message="Sorry, you cannot request business playlist using this account" />
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
