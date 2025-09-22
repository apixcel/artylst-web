"use client";

import Link from "next/link";
import { AlertCircle, MessageSquare } from "lucide-react";
import type { IOrder } from "@/interface";
import { useMemo, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { VideoUploader } from "@/components";
import { useUploadSingleFileMutation } from "@/redux/features/upload/upload.api";

const initialValues = { playlist: "", video: "" };

type Brief = { occasion: string; vibe: string; dont: string };
type OrderWithBrief = IOrder & { brief?: Brief };

const MOCK_ORDER: OrderWithBrief = {
  _id: "2342_id",
  orderId: "2342",
  maxRevision: 2,
  artist: "artist_1",
  buyer: "Mila",
  price: 80,
  eta: "tomorrow",
  platform: "Apple Music",
  revision: 0,
  status: "in_progress",
  deliveryInfo: { email: "mila@gmail.com", name: "Mila" },
  tierId: "tier_b",
  tier: "Pro",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  brief: { occasion: "Birthday", vibe: "Fun & upbeat", dont: "sad songs" },
};

function isValidUrl(v: string) {
  try {
    const u = new URL(v);
    return !!u.protocol && !!u.host;
  } catch {
    return false;
  }
}

const ValidationSchema = Yup.object({
  playlist: Yup.string()
    .required("Playlist link is required.")
    .test("is-url", "Please enter a valid playlist URL.", (value) =>
      value ? isValidUrl(value) : false
    ),
  video: Yup.string()
    .required("Video link is required.")
    .test("is-url", "Please enter a valid video URL.", (value) =>
      value ? isValidUrl(value) : false
    ),
});

export default function ArtistDeliverDesignOnlyPage() {
  const [deliveryFile, setDeliveryFile] = useState<File | null>(null);
  const [uploadingDelivery, setUploadingDelivery] = useState(false);
  const selectedOrder = useMemo(() => MOCK_ORDER, []);
  const [uploadFile] = useUploadSingleFileMutation();

  const uploadAndGetUrl = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await uploadFile(formData);
    return res?.data?.data as string | undefined;
  };

  const submitDelivery = async (values: typeof initialValues) => {
    console.log(values);
  };

  const playlistPlaceholder =
    selectedOrder.platform?.toLowerCase() === "spotify"
      ? "https://open.spotify.com/playlist/..."
      : selectedOrder.platform?.toLowerCase() === "apple music" ||
          selectedOrder.platform?.toLowerCase() === "apple"
        ? "https://music.apple.com/playlist/..."
        : "https://music.youtube.com/playlist?list=...";

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl md:text-3xl">
          Deliver • Order #{selectedOrder.orderId ?? selectedOrder._id}
        </h1>

        <div className="flex items-center gap-2">
          <Link
            href={`/dashboard/messages?order=${selectedOrder._id}`}
            className="btn-tertiary"
          >
            <MessageSquare className="inline h-4 w-4 mr-1" /> Message buyer
          </Link>
        </div>
      </div>

      {/* Body */}
      <div>
        <div className="rounded-2xl p-6 border border-white/10 bg-gradient-to-b from-brand-2/10 to-brand-1/10 backdrop-blur-2xl space-y-6">
          {/* Buyer brief */}
          {selectedOrder.brief ? (
            <div>
              <div className="text-sm text-muted">Buyer brief</div>
              <div className="text-sm">
                Occasion: {selectedOrder.brief.occasion} • Vibe:{" "}
                {selectedOrder.brief.vibe} • Don&apos;t: {selectedOrder.brief.dont}
              </div>
            </div>
          ) : (
            <div className="text-sm text-muted">No brief attached to this order.</div>
          )}

          {/* Order details */}
          <div className="grid sm:grid-cols-3 gap-3 text-sm">
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-muted mb-1">Buyer</h4>
              <p className="text-base">{selectedOrder.deliveryInfo?.name}</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-muted mb-1">Platform</h4>
              <p className="text-base">{selectedOrder.platform}</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-muted mb-1">Due</h4>
              <p className="text-base">{selectedOrder.eta || "-"}</p>
            </div>
          </div>

          {/* Formik Form */}
          <Formik
            initialValues={initialValues}
            validationSchema={ValidationSchema}
            onSubmit={submitDelivery}
          >
            {({
              touched,
              errors,
              isSubmitting,
              isValid,
              dirty,
              setFieldValue,
              getFieldProps,
            }) => (
              <Form className="space-y-3">
                {/* Playlist URL */}{" "}
                <div>
                  {" "}
                  <label className="text-sm text-muted">
                    {" "}
                    Playlist URL <span className="text-red-400">*</span>{" "}
                  </label>{" "}
                  <input
                    className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2 outline-0 focus:ring-1 focus:ring-white/20"
                    placeholder={playlistPlaceholder}
                    {...getFieldProps("playlist")}
                  />{" "}
                  {touched.playlist && errors.playlist && (
                    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                      {" "}
                      <AlertCircle className="h-3 w-3" /> {errors.playlist}{" "}
                    </p>
                  )}{" "}
                </div>
                {/* Replaces Video URL input */}
                <div className="space-y-2">
                  <VideoUploader
                    label="Upload 30s video"
                    file={deliveryFile}
                    onChange={async (f) => {
                      setDeliveryFile(f);
                      if (!f) {
                        setFieldValue("video", "");
                        return;
                      }
                      setUploadingDelivery(true);
                      try {
                        const url = await uploadAndGetUrl(f);
                        await setFieldValue("video", url, true);
                      } finally {
                        setUploadingDelivery(false);
                      }
                    }}
                    defaultUrl={undefined}
                    maxMB={200}
                    maxDurationSec={100}
                    busy={uploadingDelivery}
                    helperText="Required • ≤ 30s"
                    onError={(msg) => console.error(msg)}
                  />
                  {touched.video && errors.video && (
                    <p className="mt-1 text-xs text-red-400">{errors.video}</p>
                  )}
                </div>
                <button
                  className="btn-secondary"
                  type="submit"
                  disabled={!isValid || !dirty || isSubmitting || uploadingDelivery}
                  title={
                    !isValid || !dirty ? "Add valid playlist & video to deliver" : ""
                  }
                >
                  {isSubmitting ? "Delivering…" : "Deliver now"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
}
