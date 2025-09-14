"use client";

import { Field, Form, Formik } from "formik";
import { Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import * as Yup from "yup";

import {
  CheckoutAddOnns,
  CheckoutBrief,
  CheckoutProgress,
  CheckoutTier,
} from "@/components";
import CheckoutSkeleton from "@/components/checkout/CheckoutSkeleton";
import { IQueryMutationErrorResponse } from "@/interface";
import { IOrder } from "@/interface/order.interface";
import { useGetArtistProfileByUserNameQuery } from "@/redux/features/artist/artist.api";
import { useCreateBusinessOrderMutation } from "@/redux/features/order/order.api";
import numberUtils from "@/utils/number";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import ProtectedRoute from "@/provider/ProtectedRoute";

// ---- Types
type FormValues = {
  tierId: string | null;
  // brief
  occasion: string | null;
  platform: string | null;
  language: string | null;
  deliveryWindow: string | null;
  price: number;
  note: string;
  // add-ons
  addon?: {
    label: string;
    price: number;
  };
  // buyer
  name: string;
  email: string;
};

const SERVICE_FEE_RATE = 0.2;

// ---- Per-step validation
const stepSchemas = [
  // step 1: tier
  Yup.object({
    price: Yup.number().required("Please select a tier."),
    tierId: Yup.string().required("Please select a tier."),
  }),
  // step 2: brief
  Yup.object({
    occasion: Yup.string().required("Choose an occasion"),
    platform: Yup.string().required("Pick a platform"),
    language: Yup.string().required("Select language"),
    deliveryWindow: Yup.string().required("Select delivery window"),
    note: Yup.string().max(500, "Max 500 characters"),
  }),
  // step 3: add-ons (optional) — no required fields
  Yup.object({
    addon: Yup.object({
      label: Yup.string(),
      price: Yup.number(),
    }).optional(),
  }),
  // step 4: buyer info
  Yup.object({
    name: Yup.string().required("Your name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  }),
];

const initialValues: FormValues = {
  tierId: "",
  price: 0,
  occasion: "workout",
  platform: "spotify",
  language: "english",
  deliveryWindow: "48",
  note: "",
  addon: undefined,
  name: "",
  email: "",
};

const stepsLabels = ["1. Choose tier", "2. Brief", "3. Add-ons", "4. Pay"] as const;

export default function CheckoutPage() {
  const params = useParams();
  const userName = params.userName as string;

  const router = useRouter();

  const { data, isLoading } = useGetArtistProfileByUserNameQuery({ userName });
  const [createOrder, { isLoading: isCreating }] = useCreateBusinessOrderMutation();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const isLast = step === 4;
  const currentSchema = stepSchemas[step - 1];

  if (isLoading) {
    return <CheckoutSkeleton stepsLabels={[...stepsLabels]} />;
  }

  if (!data?.data) {
    return (
      <div className="h-[50vh] flex items-center justify-center gap-3 flex-col">
        <p className="text-[22px] font-bold">Artist not found</p>
        <Link href="/artists" className="btn btn-ghost">
          Browse Other Artists
        </Link>
      </div>
    );
  }

  const handleSubmit = async (values: FormValues) => {
    if (isCreating) return;
    const payload: Partial<IOrder> = {
      artist: data.data._id,

      addOn: values.addon?.label
        ? {
            label: values.addon?.label || "",
            price: values.addon?.price || 0,
          }
        : undefined,
      deliveryInfo: {
        email: values.email,
        name: values.name,
      },
      deliveryWindow: values.deliveryWindow || undefined,
      price: values.price,
      tierId: values.tierId || "",
      platform: values.platform || "spotify",
    };

    const res = await createOrder(payload);
    const error = res.error as IQueryMutationErrorResponse;

    if (error) {
      toast.error(error.data.message);
      return;
    }
    router.push(`/`);
    toast.success("Order created successfully");
  };
  return (
    <ProtectedRoute role="business">
      {/* Progress */}
      <section className="py-8">
        <CheckoutProgress current={step} steps={[...stepsLabels]} className="mx-auto" />
      </section>

      <Formik
        initialValues={initialValues}
        validationSchema={currentSchema}
        validateOnMount
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          isValid,
          setFieldValue,
          validateForm,
          setFieldTouched,
        }) => {
          const addonPrice = values.addon ? (values.addon.price ?? 0) : 0;
          const tierPrice = values.price ?? 0;
          const subtotal = tierPrice + addonPrice;
          const fee = +(subtotal * SERVICE_FEE_RATE).toFixed(2);
          const total = +(subtotal + fee).toFixed(2);

          const goNext = async () => {
            const stepErr = await validateForm();

            const hasErr = Object.keys(stepErr).some((k) =>
              Object.prototype.hasOwnProperty.call(stepSchemas[step - 1].fields, k)
            );
            if (!hasErr) {
              setStep((s) => {
                const nextStep = Math.min(4, s + 1) as 1 | 2 | 3 | 4;
                return nextStep;
              });
            } else {
              Object.entries(stepErr).forEach(([key, value]) => {
                setFieldTouched(key, true);
              });
            }
          };

          const goBack = () =>
            setStep((s) => {
              const prevStep = Math.max(1, s - 1) as 1 | 2 | 3 | 4;
              return prevStep;
            });

          return (
            <Form>
              {/* Main */}
              <main className="pb-16 grid lg:grid-cols-[1fr_380px] gap-6">
                {/* LEFT: step-by-step */}
                <section className="space-y-6">
                  {/* Artist summary (static) */}
                  <div className="card p-4 flex items-center gap-4 bg-gradient-to-b from-brand-2/10 to-brand-1/10">
                    <div className="h-14 w-14 rounded-full bg-white/10 border border-white/10 grid place-items-center text-[10px]">
                      IMG
                    </div>
                    <div className="flex-1">
                      <span className="font-heading text-base mb-1 inline-block">
                        {data.data.displayName}
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="chip flex items-center gap-1 text-[11px] bg-mario-coin/15 border border-mario-coin/40">
                          <Star className="w-3 h-3 text-gold" />{" "}
                          <span>{data.data.avgRating}</span> (
                          {numberUtils.formatNumberWithSuffix(data.data.reviewCount)})
                        </span>
                        <span className="chip bg-brand-4/10 border border-brand-4/40 text-[11px]">
                          48h ETA
                        </span>
                      </div>
                    </div>
                    <Link
                      target="_blank"
                      className="text-sm text-muted hover:text-light underline"
                      href={`/artists/${userName}`}
                    >
                      View profile
                    </Link>
                  </div>

                  {/* STEP CONTENT */}
                  {step === 1 && (
                    <>
                      <CheckoutTier
                        userName={userName}
                        selected={values.tierId}
                        onSelect={(price) => {
                          setFieldValue("tierId", price._id);
                          setFieldValue("price", price.priceUsd);
                        }}
                      />
                    </>
                  )}

                  {step === 2 && (
                    <CheckoutBrief
                      value={{
                        occasion: values.occasion,
                        platform: values.platform,
                        language: values.language,
                        deliveryWindow: values.deliveryWindow,
                        note: values.note,
                      }}
                      onChange={(patch) => {
                        Object.entries(patch).forEach(([k, v]) => setFieldValue(k, v));
                      }}
                      errors={errors}
                      touched={touched}
                    />
                  )}

                  {step === 3 && (
                    <CheckoutAddOnns
                      selected={values.addon?.label}
                      onChange={(val) => {
                        console.log("val", val);

                        setFieldValue("addon", {
                          label: val?.title,
                          price: val?.price,
                        });
                      }}
                    />
                  )}

                  {step === 4 && (
                    <div className="card p-5 bg-gradient-to-b from-brand-4/8 to-brand-1/10 backdrop-blur-2xl">
                      <h2 className="font-heading text-lg">Your info</h2>
                      <div className="grid md:grid-cols-2 gap-4 mt-3">
                        <div>
                          <label className="label">Your name</label>
                          <Field
                            name="name"
                            className="input mt-1"
                            placeholder="Full name"
                          />
                          {touched.name && errors.name && (
                            <p className="text-xs text-red-400 mt-1">{errors.name}</p>
                          )}
                        </div>
                        <div>
                          <label className="label">Email (delivery)</label>
                          <Field
                            name="email"
                            className="input mt-1"
                            placeholder="you@email.com"
                          />
                          {touched.email && errors.email && (
                            <p className="text-xs text-red-400 mt-1">{errors.email}</p>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-white/60 mt-2">
                        ARTYLST will email your private playlist link and 30s
                        authentication video. We never share personal contact info.
                      </p>
                    </div>
                  )}

                  {/* Step Controls */}
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={goBack}
                      disabled={step === 1}
                      className="btn btn-ghost disabled:opacity-50 cursor-pointer"
                    >
                      Back
                    </button>

                    {!isLast ? (
                      <button
                        type="button"
                        onClick={goNext}
                        className="btn btn-primary cursor-pointer"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-primary cursor-pointer"
                        disabled={!isValid}
                        title={!isValid ? "Complete required fields" : undefined}
                      >
                        Continue to payment
                      </button>
                    )}
                  </div>
                </section>

                {/* RIGHT: summary */}
                <aside className="space-y-3">
                  <div className="card p-5 bg-gradient-to-b from-brand-2/10 to-brand-1/10">
                    <h2>Order summary</h2>
                    <div className="mt-3 space-y-2 text-sm" id="summary">
                      <div className="flex justify-between">
                        <span>Selected tier</span>
                        <span id="tier-price">${tierPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Add-ons</span>
                        <span id="addons-price">${addonPrice}</span>
                      </div>
                      <hr className="border-white/10" />
                      <div className="flex justify-between text-white/80">
                        <span>Subtotal</span>
                        <span id="subtotal">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs text-white/60">
                        <span>ARTYLST service fee (20%)</span>
                        <span id="fee">${fee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-lg pt-1">
                        <span>Total</span>
                        <span id="total">${total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* NOTE: এখানে "Continue to payment" আর ডানপাশে আলাদা নেই;
                        আমরা বামপাশের কন্ট্রোলের submit বাটনকেই final ব্যবহার করছি। */}
                    <p className="text-[11px] text-white/60 mt-2">
                      Payment is held in escrow and released to the artist upon delivery.
                    </p>
                  </div>

                  <div className="card p-4 bg-gradient-to-b from-brand-1/10 to-brand-1/10">
                    <h2 className="text-sm">What you’ll receive</h2>
                    <ul className="mt-2 text-sm text-muted space-y-1">
                      <li>• Private playlist link (Spotify/Apple/YTM)</li>
                      <li>• 30s authentication video (saying your name)</li>
                      <li>• Privacy-first delivery via ARTYLST</li>
                    </ul>
                  </div>
                </aside>
              </main>
            </Form>
          );
        }}
      </Formik>
    </ProtectedRoute>
  );
}
