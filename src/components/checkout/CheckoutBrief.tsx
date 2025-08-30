"use client";

import { Dropdown } from "@/components";
import { DropdownOption } from "@/interface";
import { useState } from "react";

const occasionOptions = [
  { label: "Workout", value: "workout" },
  { label: "Study / Focus", value: "study-focus" },
  { label: "Chill", value: "chill" },
  { label: "Wedding", value: "wedding" },
  { label: "Business ambiance", value: "business-ambiance" },
];

const platformOptions = [
  { label: "Spotify", value: "spotify" },
  { label: "Apple Music", value: "apple-music" },
  { label: "YouTube Music", value: "youtube-music" },
];

const languageOptions = [
  { label: "English", value: "english" },
  { label: "Bangla", value: "bangla" },
  { label: "Both", value: "both" },
];

const deliveryWindowOptions = [
  { label: "~48h", value: "48" },
  { label: "~72h", value: "72" },
];

const CheckoutBrief = () => {
  const [occasionSort, setOccasionSort] = useState<DropdownOption<string> | null>(
    occasionOptions[0]
  );
  const [platformSort, setPlatformSort] = useState<DropdownOption<string> | null>(
    platformOptions[0]
  );
  const [languageSort, setLanguageSort] = useState<DropdownOption<string> | null>(
    languageOptions[0]
  );
  const [deliveryWindowSort, setDeliveryWindowSort] =
    useState<DropdownOption<string> | null>(deliveryWindowOptions[0]);
  return (
    <div className="card p-5 bg-gradient-to-b from-brand-1/10 to-brand-1/10">
      <h2 className="font-heading text-lg">Your brief</h2>
      <div className="grid sm:grid-cols-2 gap-4 mt-3">
        {/* occasion */}
        <div className="flex flex-col gap-2">
          <label>Occasion / use</label>
          <Dropdown
            value={occasionSort}
            options={occasionOptions}
            onChange={setOccasionSort}
            placeholder="Choose occasion"
            buttonClassName="w-full"
          />
        </div>
        {/* platform */}
        <div className="flex flex-col gap-2">
          <label>Preferred platform</label>
          <Dropdown
            value={platformSort}
            options={platformOptions}
            onChange={setPlatformSort}
            placeholder="Choose platform"
            buttonClassName="w-full"
          />
        </div>

        {/* language */}
        <div className="flex flex-col gap-2">
          <label className="label">Languages</label>
          <Dropdown
            value={languageSort}
            options={languageOptions}
            onChange={setLanguageSort}
            placeholder="Choose language"
            buttonClassName="w-full"
          />
        </div>

        {/* delivery window */}
        <div className="flex flex-col gap-2">
          <label className="label">Delivery window</label>
          <Dropdown
            value={deliveryWindowSort}
            options={deliveryWindowOptions}
            onChange={setDeliveryWindowSort}
            placeholder="Choose delivery window"
            buttonClassName="w-full"
          />
        </div>

        {/* personal note to artist */}
        <div className="sm:col-span-2">
          <label className="label">Personal note to artist</label>
          <textarea
            className="input mt-1 h-28"
            placeholder="Tell the artist about your vibe, artists you like, songs to include/avoid..."
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default CheckoutBrief;
