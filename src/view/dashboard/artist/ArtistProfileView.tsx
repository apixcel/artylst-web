"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Music4, Pencil, ShieldCheck, Trash2, User } from "lucide-react";
import {
  ArtistMedia,
  Dropdown,
  ManageTiersButton,
  MultiDropdown,
  ProfileCompletenessMeter,
  UnauthorizedMsgBox,
} from "@/components";
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

// === genre limits ===
const MAX_GENRES = 5;
const MIN_GENRES = 3;

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

// --- helper: map API profile -> FormState (no UI/design changes) ---
function profileToForm(profile?: IArtist): FormState {
  if (!profile)
    return {
      displayName: "",
      bio: "",
      language: languageOptions[0],
      timezone: "GMT+6 (Dhaka)",
      country: "",
      genre: [],
      socials: { ...emptySocials },
    };

  return {
    displayName: profile.displayName || "",
    bio: profile.bio || "",
    language:
      typeof profile.language === "string"
        ? { label: profile.language, value: profile.language }
        : (profile.language as DropdownOption<string>) || languageOptions[0],
    timezone: profile.timezone || "GMT+6 (Dhaka)",
    country: profile.country || "",
    genre: (profile.genre || []).map((g) => ({
      label: (g as IGenre).label ?? "",
      value: (g as IGenre)._id ?? "",
    })),
    socials: {
      spotify: profile.socials?.spotify || "",
      youtube: profile.socials?.youtube || "",
      instagram: profile.socials?.instagram || "",
      tiktok: profile.socials?.tiktok || "",
      website: profile.socials?.website || "",
      playlist: profile.socials?.playlist || "",
    },
  };
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

  // ----- Form + baseline state (fixes: button stays disabled after save without reload) -----
  const [original, setOriginal] = useState<FormState>(profileToForm(profile));
  const [form, setForm] = useState<FormState>(profileToForm(profile));

  // sync from API when profile changes
  useEffect(() => {
    const next = profileToForm(profile);
    setOriginal(next);
    setForm(next);
  }, [profile]);

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
  const [saving, setSaving] = useState({
    displayName: false,
    bio: false,
    genre: false,
    locale: false,
    socials: false,
  });

  // --- Shared updater helper (now calls onSuccess, uses unwrap) ---
  async function patchProfile(partial: IUpdateArtistProfile, onSuccess?: () => void) {
    try {
      await updateProfile(partial).unwrap();
      toast.success("Updated successfully!");
      onSuccess?.();
    } catch (e) {
      const err = e as IQueryMutationErrorResponse;
      toast.error(err?.data?.message || "Failed to update profile");
    }
  }

  // --- Save handlers ---
  async function saveDisplayName() {
    if (!dirty.displayName) return;
    setSaving((s) => ({ ...s, displayName: true }));
    const trimmed = form.displayName.trim();
    await patchProfile({ displayName: trimmed }, () => {
      setForm((f) => ({ ...f, displayName: trimmed }));
      setOriginal((o) => ({ ...o, displayName: trimmed }));
    });
    setSaving((s) => ({ ...s, displayName: false }));
  }

  async function saveBio() {
    if (form.bio.length > 1000) {
      toast.error("Bio must be at most 1000 characters.");
      return;
    }
    if (!dirty.bio) return;
    setSaving((s) => ({ ...s, bio: true }));
    const trimmed = form.bio.trim();
    await patchProfile({ bio: trimmed }, () => {
      setForm((f) => ({ ...f, bio: trimmed }));
      setOriginal((o) => ({ ...o, bio: trimmed }));
    });
    setSaving((s) => ({ ...s, bio: false }));
  }

  async function saveGenres() {
    if (!dirty.genre) return;
    if (form.genre.length > MAX_GENRES) {
      toast.error(`You can select up to ${MAX_GENRES} genres.`);
      return;
    }
    if (form.genre.length < MIN_GENRES) {
      toast.error(`Please select at least ${MIN_GENRES} genres.`);
      return;
    }
    setSaving((s) => ({ ...s, genre: true }));
    await patchProfile({ genre: form.genre.map((g) => g.value) }, () => {
      // reset baseline for just this section
      setOriginal((o) => ({ ...o, genre: form.genre }));
    });
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
    await patchProfile(
      {
        language: form.language.value,
        timezone: form.timezone,
        country: form.country.trim(),
      },
      () => {
        setForm((f) => ({ ...f, country: f.country.trim() }));
        setOriginal((o) => ({
          ...o,
          language: form.language,
          timezone: form.timezone,
          country: form.country.trim(),
        }));
      }
    );
    setSaving((s) => ({ ...s, locale: false }));
  }

  async function saveSocials() {
    if (!dirty.socials) return;
    const badKey = (Object.keys(form.socials) as (keyof FormState["socials"])[]).find(
      (k) => !isValidUrlOrEmpty(form.socials[k])
    );
    if (badKey) {
      toast.error(`Invalid URL in ${badKey}`);
      return;
    }
    setSaving((s) => ({ ...s, socials: true }));
    await patchProfile({ socials: { ...form.socials } }, () => {
      setOriginal((o) => ({ ...o, socials: { ...form.socials } }));
    });
    setSaving((s) => ({ ...s, socials: false }));
  }

  function handleGenresChange(vals: DropdownOption<string>[]) {
    if (vals.length > MAX_GENRES) {
      toast.error(`You can select up to ${MAX_GENRES} genres.`);
      return; // ignore the extra selection
    }
    setField("genre", vals);
  }

  if (role !== "artist") return <UnauthorizedMsgBox />;

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
        <ManageTiersButton />
      </div>

      <ProfileCompletenessMeter />

      {/* Content card */}
      <div className="xl:col-span-2 rounded-2xl p-6 border border-white/10 bg-gradient-to-b from-brand-2/10 to-brand-1/10 backdrop-blur-2xl space-y-6">
        {/* avatar and cover image */}
        <ArtistMedia />

        {/* display name, bio, genres */}
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
            <label className="text-sm text-muted">Bio</label>
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
            <p className="text-xs text-muted mt-1">
              Tip: mention notable credits, moods you excel at, and turnaround time.
            </p>
          </div>
        </div>

        {/* Genres */}
        <div className="border-b border-white/10 pb-4">
          <label className="text-sm text-muted block mb-1">Genres</label>
          <div className="flex items-center gap-2">
            <MultiDropdown
              options={genreOptions}
              values={form.genre}
              onChange={handleGenresChange}
              className="w-full"
            />
            <SectionSaveButton
              label="Save genres"
              onClick={saveGenres}
              disabled={
                !dirty.genre ||
                form.genre.length < MIN_GENRES ||
                form.genre.length > MAX_GENRES
              }
              isSaving={saving.genre}
            />
          </div>
          <div className="text-xs text-muted mt-2">Pick up to {MAX_GENRES} genres.</div>
        </div>

        {/* Locale */}
        <div className="grid gap-4 border-b border-white/10 pb-4">
          <div className="grid sm:grid-cols-3 gap-4">
            {/* Language */}
            <div>
              <label className="text-sm text-white/60">Language</label>
              <Dropdown<string>
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
          <div className="flex justify-end">
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
