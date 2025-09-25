"use client";

import React, { useMemo, useState } from "react";
import { DialogProvider } from "@/components";

const SoundCloudConnectModal: React.FC<{
  open: boolean;
  setOpen: (v: boolean) => void;
  onConnected: (userId: string) => void;
}> = ({ open, setOpen, onConnected }) => {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const error = useMemo(() => {
    if (!touched) return null;
    if (!value.trim()) return "User ID is required.";
    return null;
  }, [touched, value]);

  const canSubmit = !error && value.trim().length > 0 && !submitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    console.log(value);
    if (error) return;
    try {
      setSubmitting(true);
      await onConnected(value.trim());
      setOpen(false);
      setValue("");
      setTouched(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DialogProvider
      state={open}
      setState={setOpen as React.Dispatch<React.SetStateAction<boolean>>}
      className="w-[min(92vw,480px)]"
    >
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-zinc-900 border border-white/10 p-6 space-y-4 shadow-2xl"
      >
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Connect SoundCloud</h3>
          <p className="text-sm text-muted">Enter your SoundCloud user id.</p>
        </div>

        <label className="block text-sm">
          <span className="text-muted">Sound Cloud User ID</span>
          <input
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="e.g. 948745750"
            className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 outline-none focus:ring-2 focus:ring-white/10"
          />
        </label>
        {error && <p className="text-xs text-red-400">{error}</p>}

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="btn-tertiary px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            disabled={!canSubmit}
            className="btn-secondary px-4 py-2 rounded-lg disabled:opacity-60"
          >
            {submitting ? "Connecting…" : "Connect"}
          </button>
        </div>
      </form>
    </DialogProvider>
  );
};

export default SoundCloudConnectModal;
