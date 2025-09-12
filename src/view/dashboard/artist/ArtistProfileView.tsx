"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Music4,
  Pencil,
  ShieldCheck,
  Sparkles,
  Tally5,
  Trash2,
  User,
} from "lucide-react";
import { ArtistMedia, Dropdown, MultiDropdown, UnauthorizedMsgBox } from "@/components";
import {
  DropdownOption,
  IArtist,
  IQueryMutationErrorResponse,
  IGenre,
  IUpdateArtistProfile,
} from "@/interface";
import { useAppSelector } from "@/hooks";
import { useGetGenresQuery } from "@/redux/features/meta/meta.api";
import {
  useGetMyArtistProfileQuery,
  useUpdateMyArtistProfileMutation,
} from "@/redux/features/artist/artist.api";
import { toast } from "sonner";
import ArtistSocialLinks from "./ArtistSocialLinks";

const languageOptions: DropdownOption<string>[] = [
  { label: "English", value: "English" },
  { label: "Hindi", value: "Hindi" },
  { label: "Spanish", value: "Spanish" },
  { label: "French", value: "French" },
  { label: "German", value: "German" },
  { label: "Japanese", value: "Japanese" },
  { label: "Korean", value: "Korean" },
  { label: "Chinese (Mandarin)", value: "Chinese (Mandarin)" },
];

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/10 border border-white/10 text-xs">
    {children}
  </span>
);

const SectionSaveButton = ({
  label,
  onClick,
  disabled,
  isSaving,
}: {
  label: string;
  onClick: () => void | Promise<void>;
  disabled?: boolean;
  isSaving?: boolean;
}) => (
  <button
    className="bg-brand-4/60 px-3 rounded-lg flex gap-2 py-3 whitespace-nowrap items-center hover:bg-brand-4/70 disabled:opacity-60"
    onClick={onClick}
    disabled={!!disabled || !!isSaving}
    type="button"
  >
    <Pencil className="h-4 w-4" /> {isSaving ? "Saving…" : label}
  </button>
);

type FormState = {
  displayName: string;
  bio: string;
  language: DropdownOption<string>;
  timezone: string;
  country: string;
  genre: DropdownOption<string>[];
  socials: {
    spotify: string;
    youtube: string;
    instagram: string;
    tiktok: string;
    website: string;
    playlist: string;
  };
};

const emptySocials = {
  spotify: "",
  youtube: "",
  instagram: "",
  tiktok: "",
  website: "",
  playlist: "",
};

function deepEqual(a: unknown, b: unknown) {
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch {
    return a === b;
  }
}

function parseLanguages(s: string) {
  return s
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

function isValidUrlOrEmpty(v: string) {
  if (!v) return true;
  try {
    new URL(v);
    return true;
  } catch {
    return false;
  }
}

export default function ArtistProfileView() {
  const { data } = useGetMyArtistProfileQuery(undefined);
  const profile = data?.data as IArtist | undefined;

  const { user } = useAppSelector((state) => state.user);
  const role = user?.role;

  const { data: genresData } = useGetGenresQuery({});
  const genreOptions: DropdownOption<string>[] = (genresData?.data || []).map((g) => ({
    label: g.label,
    value: g._id,
  }));

  const [updateProfile] = useUpdateMyArtistProfileMutation();

  // ----- Form state -----
  const [form, setForm] = useState<FormState>({
    displayName: "",
    bio: "",
    language: languageOptions[0],
    timezone: "GMT+6 (Dhaka)",
    country: "",
    genre: [],
    socials: emptySocials,
  });

  // Keep a snapshot of the original values to compute per-section dirty states
  const original = useMemo(() => {
    if (!profile)
      return {
        displayName: "",
        bio: "",
        language: languageOptions[0],
        timezone: "GMT+6 (Dhaka)",
        country: "",
        genre: [] as DropdownOption<string>[],
        socials: emptySocials,
      };

    return {
      displayName: profile.displayName || "",
      bio: profile.bio || "",
      language: profile.language || languageOptions[0],
      timezone: profile.timezone || "GMT+6 (Dhaka)",
      country: profile.country || "",
      genre: (profile.genre || []).map((g) => ({
        label: (g as IGenre).label ?? (g as IGenre).label ?? "",
        value: (g as IGenre)._id ?? (g as IGenre)._id,
      })),
      socials: {
        spotify: profile.socials?.spotify || "",
        youtube: profile.socials?.youtube || "",
        instagram: profile.socials?.instagram || "",
        tiktok: profile.socials?.tiktok || "",
        website: profile.socials?.website || "",
        playlist: profile.socials?.playlist || "",
      },
    } as FormState;
  }, [profile]);

  // Load initial values from profile into form
  useEffect(() => {
    setForm(original);
  }, [original]);

  if (role !== "artist") return <UnauthorizedMsgBox />;

  // --- Controlled setters ---
  const setField = <K extends keyof FormState>(key: K, val: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: val }));

  const setSocial = (key: keyof FormState["socials"], val: string) =>
    setForm((f) => ({ ...f, socials: { ...f.socials, [key]: val } }));

  // --- Per-section dirty flags ---
  const dirty = {
    displayName: form.displayName.trim() !== original.displayName.trim(),
    bio: form.bio !== original.bio,
    genre: !deepEqual(
      form.genre.map((g) => g.value),
      original.genre.map((g) => g.value)
    ),
    locale:
      form.language.value !== original.language.value ||
      form.timezone !== original.timezone ||
      form.country.trim() !== original.country.trim(),
    socials: !deepEqual(form.socials, original.socials),
  };

  // --- Per-section saving flags ---
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [saving, setSaving] = useState({
    displayName: false,
    bio: false,
    genre: false,
    locale: false,
    socials: false,
  });

  // --- Shared updater helper (send only the fields you intend to change) ---
  async function patchProfile(partial: IUpdateArtistProfile, onSuccess?: () => void) {
    const res = await updateProfile(partial);
    const err = res.error as IQueryMutationErrorResponse;
    if (err) {
      toast.error(err?.data?.message || "Failed to update profile");
      return;
    }

    toast.success("Updated successfully!");
  }

  // --- Save handlers ---
  async function saveDisplayName() {
    if (!dirty.displayName) return;
    setSaving((s) => ({ ...s, displayName: true }));
    await patchProfile({ displayName: form.displayName.trim() }, () =>
      setForm((f) => ({ ...f, displayName: f.displayName.trim() }))
    );
    setSaving((s) => ({ ...s, displayName: false }));
  }

  async function saveBio() {
    if (form.bio.length > 1000) {
      toast.error("Bio must be at most 1000 characters.");
      return;
    }
    if (!dirty.bio) return;
    setSaving((s) => ({ ...s, bio: true }));
    await patchProfile({ bio: form.bio.trim() });
    setSaving((s) => ({ ...s, bio: false }));
  }

  async function saveGenres() {
    if (!dirty.genre) return;
    setSaving((s) => ({ ...s, genre: true }));
    await patchProfile({ genre: form.genre.map((g) => g.value) });
    setSaving((s) => ({ ...s, genre: false }));
  }

  async function saveLocale() {
    if (!dirty.locale) return;
    const languages = parseLanguages(form.language.value);
    if (languages.length === 0) {
      toast.error("Please enter at least one language.");
      return;
    }
    setSaving((s) => ({ ...s, locale: true }));
    await patchProfile({
      language: form.language.value,
      timezone: form.timezone,
      country: form.country.trim(),
    });
    setSaving((s) => ({ ...s, locale: false }));
  }

  async function saveSocials() {
    if (!dirty.socials) return;
    // basic URL validation (allow empty)
    const badKey = (Object.keys(form.socials) as (keyof FormState["socials"])[]).find(
      (k) => !isValidUrlOrEmpty(form.socials[k])
    );
    if (badKey) {
      toast.error(`Invalid URL in ${badKey}`);
      return;
    }
    setSaving((s) => ({ ...s, socials: true }));
    await patchProfile({ socials: { ...form.socials } });
    setSaving((s) => ({ ...s, socials: false }));
  }

  // Overall completeness (optional demo)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const completeness = useMemo(() => {
    let pct = 0;
    if (form.displayName.trim()) pct += 20;
    if (form.bio.trim()) pct += 20;
    if (form.genre.length) pct += 20;
    if (parseLanguages(form.language.value).length) pct += 20;
    if (Object.values(form.socials).some(Boolean)) pct += 20;
    return Math.min(100, pct);
  }, [form]);

  return (
    <section className="space-y-6">
      {/* header */}
      <div className="flex md:items-end flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="dashboard-page-title">Public Profile</h1>
          <p className="text-muted text-sm mt-1">
            What fans and businesses see on your public page
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/artist/tiers" className="btn-tertiary btn gap-1">
            <Tally5 className="h-4 w-4" /> Manage tiers
          </Link>
          {/* Global Save removed in favor of per-section saves; keep if you still want */}
        </div>
      </div>

      {/* Completeness meter */}
      <div className="rounded-2xl p-5 border border-white/10 bg-brand-2/10 backdrop-blur-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" /> Profile completeness
          </div>
          <div className="text-base text-muted">{completeness}%</div>
        </div>
        <div className="h-2 mt-3 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-white/70 rounded-full"
            style={{ width: `${completeness}%` }}
          />
        </div>
        <ul className="mt-3 flex flex-wrap gap-2 text-xs text-white/70">
          <li className="flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" /> Display name
          </li>
          <li className="flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" /> Bio
          </li>
          <li className="flex items-center gap-1 opacity-60">
            <CheckCircle2 className="h-3 w-3" /> Intro video
          </li>
          <li className="flex items-center gap-1 opacity-60">
            <CheckCircle2 className="h-3 w-3" /> Streaming connected
          </li>
        </ul>
      </div>

      {/* Content card */}
      <div className="xl:col-span-2 rounded-2xl p-6 border border-white/10 bg-gradient-to-b from-brand-2/10 to-brand-1/10 backdrop-blur-2xl space-y-6">
        {/* Media (unchanged) */}
        <ArtistMedia />

        {/* Basics */}
        <div className="flex flex-col gap-4 border-b border-white/10 pb-4">
          {/* display name */}
          <div>
            <label className="text-sm text-muted">Display name</label>
            <div className="flex gap-2 items-center">
              <input
                className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-3"
                value={form.displayName}
                onChange={(e) => setField("displayName", e.target.value)}
              />
              <SectionSaveButton
                label="Save name"
                onClick={saveDisplayName}
                disabled={!dirty.displayName}
                isSaving={saving.displayName}
              />
            </div>
          </div>

          {/* bio */}
          <div>
            <label className="text-sm text-muted">
              Bio <span className="text-muted">(max 300)</span>
            </label>
            <div className="flex sm:flex-row flex-col gap-2 items-end mt-1">
              <textarea
                rows={4}
                className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-3"
                value={form.bio}
                onChange={(e) => setField("bio", e.target.value)}
              />
              <SectionSaveButton
                label="Save bio"
                onClick={saveBio}
                disabled={!dirty.bio}
                isSaving={saving.bio}
              />
            </div>
            <div className="text-xs text-muted mt-1">
              Tip: mention notable credits, moods you excel at, and turnaround time.
            </div>
          </div>
        </div>

        {/* Genres */}
        <div className="border-b border-white/10 pb-4">
          <label className="text-sm text-muted block mb-1">Genres</label>
          <div className="flex items-center gap-2">
            <MultiDropdown
              options={genreOptions}
              values={form.genre}
              onChange={(vals) => setField("genre", vals)}
              className="w-full"
            />
            <SectionSaveButton
              label="Save genres"
              onClick={saveGenres}
              disabled={!dirty.genre}
              isSaving={saving.genre}
            />
          </div>
        </div>

        {/* Locale */}
        <div className="grid gap-4 border-b border-white/10 pb-4">
          <div className="grid sm:grid-cols-3 gap-4">
            {/* Language */}
            <div>
              <label className="text-sm text-white/60">Language</label>
              <Dropdown<string>
                // form.language (string) -> Dropdown expects DropdownOption or null
                value={
                  languageOptions.find((o) => o.value === form.language.value) ?? null
                }
                options={languageOptions}
                onChange={(opt) =>
                  setField("language", { label: opt.label, value: opt.value })
                }
                placeholder="Select language"
                className="w-full mt-1"
                buttonClassName="w-full"
                panelClassName="w-full"
              />
            </div>
            <div>
              <label className="text-sm text-white/60">Timezone</label>
              {/* You can swap to a select if you maintain a list */}
              <input
                className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2"
                value={form.timezone}
                onChange={(e) => setField("timezone", e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-white/60">Location</label>
              <input
                className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2"
                placeholder="Country"
                value={form.country}
                onChange={(e) => setField("country", e.target.value)}
              />
            </div>
          </div>
          <div className="flex">
            <SectionSaveButton
              label="Save locale"
              onClick={saveLocale}
              disabled={!dirty.locale}
              isSaving={saving.locale}
            />
          </div>
        </div>

        {/* Links */}
        <ArtistSocialLinks
          values={form.socials}
          onChange={(key, val) => setSocial(key, val)}
          onSave={saveSocials}
          dirty={dirty.socials}
          isSaving={saving.socials}
        />

        {/* Connections & availability (display only) */}
        <div className="rounded-xl p-4 border border-white/10 bg-white/5">
          <div className="font-heading mb-2">Connections</div>
          <div className="flex flex-wrap gap-2 text-sm">
            <Chip>
              <Music4 className="h-3 w-3" /> Spotify{" "}
              <span className="opacity-70">• Not connected</span>
            </Chip>
            <Chip>
              <Music4 className="h-3 w-3" /> Apple Music{" "}
              <span className="opacity-70">• Connected</span>
            </Chip>
            <Chip>
              <ShieldCheck className="h-3 w-3" /> KYC{" "}
              <span className="opacity-70">• Pending</span>
            </Chip>
            <Chip>
              <User className="h-3 w-3" /> Availability{" "}
              <span className="opacity-70">• Open</span>
            </Chip>
          </div>
          <div className="mt-3 text-xs text-white/60">
            Manage at{" "}
            <Link href="/streaming" className="underline">
              /streaming
            </Link>{" "}
            •{" "}
            <Link href="/kyc" className="underline">
              /kyc
            </Link>{" "}
            •{" "}
            <Link href="/availability" className="underline">
              /availability
            </Link>
          </div>
        </div>

        {/* Danger zone */}
        <div className="rounded-xl p-4 border border-rose-500/30 bg-rose-500/10">
          <div className="font-heading mb-2">Danger zone</div>
          <div className="flex flex-wrap gap-2 text-sm">
            <button
              className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 inline-flex items-center gap-2"
              type="button"
            >
              <Trash2 className="h-4 w-4" /> Deactivate profile
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
