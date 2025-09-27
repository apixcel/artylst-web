"use client";

import { IOrder } from "@/interface/order.interface";
import { useUploadSingleFileMutation } from "@/redux/features/upload/upload.api";
import { FormErrorMessage, VideoUploader } from "@/components";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useDeliverOrderMutation } from "@/redux/features/order/order.api";
import { IQueryMutationErrorResponse } from "@/interface";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const initialValues = { playlistUrl: "", authVideo: "" };

function isValidUrl(v: string) {
  try {
    const u = new URL(v.trim());
    return Boolean(u.protocol && u.host);
  } catch {
    return false;
  }
}

const ValidationSchema = Yup.object({
  playlistUrl: Yup.string()
    .required("Playlist link is required.")
    .test("is-url", "Please enter a valid playlist URL.", (value) =>
      value ? isValidUrl(value) : false
    ),
  authVideo: Yup.string()
    .required("Auth video link is required.")
    .test("is-url", "Please enter a valid video URL.", (value) =>
      value ? isValidUrl(value) : false
    ),
});

type DeliverFormProps = {
  order: IOrder;
};

const DeliverForm = ({ order }: DeliverFormProps) => {
  const router = useRouter();
  const [deliveryFile, setDeliveryFile] = useState<File | null>(null);
  const [uploadingDelivery, setUploadingDelivery] = useState(false);

  const [uploadFile] = useUploadSingleFileMutation();
  const [deliverOrder, { isLoading: isDelivering }] = useDeliverOrderMutation();

  const uploadAndGetUrl = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await uploadFile(formData);
    return res?.data?.data as string | undefined;
  };

  const handleSubmitDelivery = async (values: typeof initialValues) => {
    const payload = {
      order: order?._id,
      authVideo: values.authVideo,
      playlistUrl: values.playlistUrl,
    };

    const res = await deliverOrder(payload);
    const err = res.error as IQueryMutationErrorResponse;
    if (err) {
      toast.error(err.data?.message || "Something went wrong");
      return;
    }
    toast.success("Delivery submitted successfully");
    router.push(`/dashboard/orders/${order?._id}`);
  };

  const platform = order?.platform?.toLowerCase() || "";
  const playlistPlaceholder =
    platform === "spotify"
      ? "https://open.spotify.com/playlist/..."
      : platform === "apple music" || platform === "apple"
        ? "https://music.apple.com/playlist/..."
        : "https://music.youtube.com/playlist?list=...";

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={handleSubmitDelivery}
      >
        {({
          touched,
          errors,
          isSubmitting,
          isValid,
          dirty,
          setFieldValue,
          handleBlur,
          handleChange,
        }) => (
          <Form className="space-y-3">
            {/* Playlist URL */}
            <div>
              <label className="text-sm text-muted">
                Playlist URL <span className="text-red-400">*</span>
              </label>
              <input
                type="url"
                name="playlistUrl"
                className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2 outline-0 focus:ring-1 focus:ring-white/20"
                placeholder={playlistPlaceholder}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {touched.playlistUrl && errors.playlistUrl && (
                <FormErrorMessage message={errors.playlistUrl} />
              )}
            </div>

            {/* Auth Video uploader */}
            <div className="space-y-2">
              <VideoUploader
                label="Upload 30s video"
                file={deliveryFile}
                onChange={async (f) => {
                  setDeliveryFile(f);
                  if (!f) {
                    setFieldValue("authVideo", "");
                    return;
                  }
                  setUploadingDelivery(true);
                  try {
                    const url = await uploadAndGetUrl(f);
                    setFieldValue("authVideo", url || "");
                  } catch (e) {
                    console.error(e);
                    setFieldValue("authVideo", "");
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

              {touched.authVideo && errors.authVideo && (
                <p className="mt-1 text-xs text-red-400">{errors.authVideo}</p>
              )}
            </div>

            <button
              className="btn-secondary"
              type="submit"
              disabled={
                !isValid || !dirty || isSubmitting || uploadingDelivery || isDelivering
              }
              title={!isValid || !dirty ? "Add valid playlist & video to deliver" : ""}
            >
              {isSubmitting || isDelivering ? "Delivering…" : "Deliver now"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DeliverForm;
