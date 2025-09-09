"use client";

import { Dropdown } from "@/components";
import type { DropdownOption } from "@/interface";

type BriefValue = {
  occasion: string | null;
  platform: string | null;
  language: string | null;
  deliveryWindow: string | null;
  note: string;
};

type Props = {
  value: BriefValue;
  onChange: (patch: Partial<BriefValue>) => void;
  errors?: Record<string, string>;
  touched?: Record<string, boolean>;
};

const occasionOptions: DropdownOption<string>[] = [
  { label: "Workout", value: "workout" },
  { label: "Study / Focus", value: "study-focus" },
  { label: "Chill", value: "chill" },
  { label: "Wedding", value: "wedding" },
  { label: "Business ambiance", value: "business-ambiance" },
];
const platformOptions: DropdownOption<string>[] = [
  { label: "Spotify", value: "spotify" },
  { label: "Apple Music", value: "apple-music" },
  { label: "YouTube Music", value: "youtube-music" },
];
const languageOptions: DropdownOption<string>[] = [
  { label: "English", value: "english" },
  { label: "Other", value: "other" },
];
const deliveryWindowOptions: DropdownOption<string>[] = [
  { label: "~48h", value: "48" },
  { label: "~72h", value: "72" },
];

const CheckoutBrief = ({ value, onChange, errors, touched }: Props) => {
  const findOpt = (opts: DropdownOption<string>[], v?: string | null) =>
    opts.find((o) => o.value === v) ?? null;

  return (
    <div className="card p-5 bg-gradient-to-b from-brand-1/10 to-brand-1/10">
      <h2 className="font-heading text-lg">Your brief</h2>
      <div className="grid sm:grid-cols-2 gap-4 mt-3">
        {/* occasion */}
        <div className="flex flex-col gap-2">
          <label>Occasion / use</label>
          <Dropdown
            value={findOpt(occasionOptions, value.occasion)}
            options={occasionOptions}
            onChange={(opt) => onChange({ occasion: opt?.value ?? null })}
            placeholder="Choose occasion"
            buttonClassName="w-full"
          />
          {touched?.occasion && errors?.occasion && (
            <p className="text-xs text-red-400">{errors.occasion as string}</p>
          )}
        </div>

        {/* platform */}
        <div className="flex flex-col gap-2">
          <label>Preferred platform</label>
          <Dropdown
            value={findOpt(platformOptions, value.platform)}
            options={platformOptions}
            onChange={(opt) => onChange({ platform: opt?.value ?? null })}
            placeholder="Choose platform"
            buttonClassName="w-full"
          />
          {touched?.platform && errors?.platform && (
            <p className="text-xs text-red-400">{errors.platform as string}</p>
          )}
        </div>

        {/* language */}
        <div className="flex flex-col gap-2">
          <label className="label">Languages</label>
          <Dropdown
            value={findOpt(languageOptions, value.language)}
            options={languageOptions}
            onChange={(opt) => onChange({ language: opt?.value ?? null })}
            placeholder="Choose language"
            buttonClassName="w-full"
          />
          {touched?.language && errors?.language && (
            <p className="text-xs text-red-400">{errors.language as string}</p>
          )}
        </div>

        {/* delivery window */}
        <div className="flex flex-col gap-2">
          <label className="label">Delivery window</label>
          <Dropdown
            value={findOpt(deliveryWindowOptions, value.deliveryWindow)}
            options={deliveryWindowOptions}
            onChange={(opt) => onChange({ deliveryWindow: opt?.value ?? null })}
            placeholder="Choose delivery window"
            buttonClassName="w-full"
          />
          {touched?.deliveryWindow && errors?.deliveryWindow && (
            <p className="text-xs text-red-400">{errors.deliveryWindow as string}</p>
          )}
        </div>

        {/* personal note */}
        <div className="sm:col-span-2">
          <label className="label">Personal note to artist</label>
          <textarea
            className="input mt-1 h-28"
            placeholder="Tell the artist about your vibe, artists you like, songs to include/avoid..."
            value={value.note}
            onChange={(e) => onChange({ note: e.target.value })}
          />
          {touched?.note && errors?.note && (
            <p className="text-xs text-red-400">{errors.note as string}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutBrief;
