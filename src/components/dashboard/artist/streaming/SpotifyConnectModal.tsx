"use client";

import React from "react";
import { DialogProvider } from "@/components";
import { useGetSpotifyPlaylistsMutation } from "@/redux/features/streaming/streaming.api";
import { toast } from "sonner";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { IQueryMutationErrorResponse } from "@/interface";

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  onConnected: (userId: string) => void | Promise<void>;
};

const validationSchema = Yup.object({
  userId: Yup.string().required("User ID is required."),
});

const SpotifyConnectModal: React.FC<Props> = ({ open, setOpen }) => {
  const [getSpotifyPlaylists, { isLoading }] = useGetSpotifyPlaylistsMutation();

  const handleSubmit = async (
    values: { userId: string },
    { resetForm }: FormikHelpers<{ userId: string }>
  ) => {
    const res = await getSpotifyPlaylists({ userId: values.userId });
    const err = res.error as IQueryMutationErrorResponse;

    if (err) {
      toast.error(err.data.message || "Something went wrong");
      return;
    }
    toast.success("Spotify playlists fetched successfully");
    resetForm();
  };

  return (
    <DialogProvider
      state={open}
      setState={setOpen as React.Dispatch<React.SetStateAction<boolean>>}
      className="w-[min(92vw,480px)]"
    >
      <Formik
        initialValues={{ userId: "" }}
        validationSchema={validationSchema}
        validateOnBlur
        validateOnChange
        onSubmit={handleSubmit}
      >
        {({ isValid, isSubmitting, dirty }) => {
          const canSubmit = isValid && dirty && !isSubmitting && !isLoading;

          return (
            <Form className="rounded-2xl bg-zinc-900 border border-white/10 p-6 space-y-4 shadow-2xl">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold">Connect Spotify</h3>
                <p className="text-sm text-muted">
                  Enter your Spotify user ID. We&apos;ll use it to get your playlists
                  only.
                </p>
              </div>

              <label className="block text-sm">
                <span className="text-muted">Spotify User ID</span>
                <Field
                  name="userId"
                  autoFocus
                  placeholder="e.g. wizzler"
                  className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 outline-none focus:ring-2 focus:ring-white/10"
                />
              </label>
              <ErrorMessage
                name="userId"
                component="p"
                className="text-xs text-red-400"
              />

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="btn-tertiary px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="btn-secondary px-4 py-2 rounded-lg disabled:opacity-60"
                >
                  {isSubmitting || isLoading ? "Connecting…" : "Connect"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </DialogProvider>
  );
};

export default SpotifyConnectModal;
