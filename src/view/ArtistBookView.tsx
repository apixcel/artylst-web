"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { BookBrief, CheckoutAddOnns, CheckoutProgress, Input } from "@/components";
import { useParams, useRouter } from "next/navigation";
import { useGetArtistProfileByUserNameQuery } from "@/redux/features/artist/artist.api";
import { useCreateFanOrderMutation } from "@/redux/features/order/order.api";
import { IQueryMutationErrorResponse } from "@/interface";
import { toast } from "sonner";

type FormValues = {
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
  password: string;
  confirmPassword: string;
};

const SERVICE_FEE_RATE = 0.2; // 20%
const ADDONS_PRICE: Record<string, number> = {
  rush: 12,
  length: 10,
  business: 25,
  notes: 5,
};

const stepSchemas = [
  // 1) brief
  Yup.object({
    occasion: Yup.string().required("Choose an occasion"),
    platform: Yup.string().required("Pick a platform"),
    language: Yup.string().required("Select language"),
    deliveryWindow: Yup.string().required("Select delivery window"),
    note: Yup.string().max(500, "Max 500 characters"),
  }),
  // 2) add-ons (optional)
  Yup.object({
    addon: Yup.object({
      label: Yup.string(),
      price: Yup.number(),
    }).optional(),
  }),
  // 3) buyer info (WITH password here)
  Yup.object({
    name: Yup.string().required("Your name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/\d/, "Password must contain a number")
      .matches(/[a-z]/, "Password must contain a lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[@$!%*?&^#_\-]/, "Password must contain at least one special character")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
  }),
] as const;

const initialValues: FormValues = {
  occasion: "workout",
  price: 0,
  platform: "spotify",
  language: "english",
  deliveryWindow: "1-3 days",
  note: "",
  addon: undefined,
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const stepsLabels = ["1. Brief", "2. Add-ons", "3. Pay"] as const;

const ArtistBookView = () => {
  const params = useParams();
  const userName = params.userName as string;

  const router = useRouter();
  const { data, isLoading } = useGetArtistProfileByUserNameQuery({ userName });
  const artist = data?.data || null;

  const [createOrder, { isLoading: isCreating }] = useCreateFanOrderMutation();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const isLast = step === 3;
  const currentSchema = stepSchemas[step - 1];

  if (isLoading) {
    return <div className="p-10">Loading…</div>;
  }

  if (!artist) {
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

    const payload = {
      artist: artist._id,
      addOn: values.addon
        ? {
            label: values.addon.label || "",
            price: values.addon?.price || 0,
          }
        : undefined,
      deliveryInfo: {
        email: values.email,
        name: values.name,
        password: values.password,
      },
      deliveryWindow: values.deliveryWindow || undefined,
      platform: values.platform || "spotify",
      price: 100,
      brief: {
        occasion: values.occasion,
        language: values.language,
        note: values.note,
      },
    };

    console.log(payload);

    const res = await createOrder(payload);
    const error = res.error as IQueryMutationErrorResponse;

    if (error) {
      toast.error(error.data?.message || "Failed to create order");
      return;
    }
    toast.success("Order created successfully");
    router.push(`/dashboard/orders`);
  };

  return (
    <>
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
          const addonPrice = values.addon ? (ADDONS_PRICE[values.addon.price] ?? 0) : 0;
          const tierPrice = values.price || 0;
          const subtotal = tierPrice + addonPrice;
          const fee = +(subtotal * SERVICE_FEE_RATE).toFixed(2);
          const total = +(subtotal + fee).toFixed(2);

          const goNext = async () => {
            const stepErr = await validateForm();
            const hasErr = Object.keys(stepErr).some((k) =>
              Object.prototype.hasOwnProperty.call(stepSchemas[step - 1].fields, k)
            );
            if (!hasErr) {
              setStep((s) => (s === 1 ? 2 : s === 2 ? 3 : 3));
            } else {
              Object.keys(stepErr).forEach((key) => setFieldTouched(key, true));
            }
          };

          const goBack = () => {
            setStep((s) => (s === 3 ? 2 : s === 2 ? 1 : 1));
          };

          return (
            <Form>
              {/* Main */}
              <main className="pb-16 grid lg:grid-cols-[1fr_380px] gap-6">
                {/* LEFT */}
                <section className="space-y-6">
                  {/* Artist summary */}
                  <div className="card p-4 flex items-center gap-4 bg-gradient-to-b from-brand-2/10 to-brand-1/10">
                    <div className="h-14 w-14 rounded-full overflow-hidden">
                      <Image
                        src={artist.avatar}
                        alt={artist.displayName}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div className="flex-1">
                      <span className="font-heading text-base mb-1 inline-block">
                        {artist.displayName}
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="chip flex items-center gap-1 text-[11px] bg-mario-coin/15 border border-mario-coin/40">
                          <Star className="w-3 h-3 text-gold" /> <span>4.9</span> (1.2k)
                        </span>
                        <span className="chip bg-brand-4/10 border border-brand-4/40 text-[11px]">
                          48h ETA
                        </span>
                      </div>
                    </div>
                    <Link
                      className="text-sm text-muted hover:text-light underline"
                      href={`/artists/${userName}`}
                    >
                      View profile
                    </Link>
                  </div>

                  {/* STEP CONTENT */}
                  {step === 1 && (
                    <BookBrief
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

                  {step === 2 && (
                    <CheckoutAddOnns
                      selected={values.addon?.label}
                      onChange={(val) =>
                        setFieldValue("addon", {
                          label: val?.title,
                          price: val?.price,
                        })
                      }
                    />
                  )}

                  {step === 3 && (
                    <div className="card p-5 bg-gradient-to-b from-brand-4/8 to-brand-1/10 backdrop-blur-2xl">
                      <h2 className="font-heading text-lg">Your info</h2>
                      <div className="grid md:grid-cols-2 gap-4 mt-3">
                        {/* name */}
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
                        {/* email */}
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
                        {/* password */}
                        <div>
                          <label className="label">Password</label>
                          <Field
                            as={Input}
                            name="password"
                            type="password"
                            className="input mt-1"
                            placeholder="Password"
                          />
                          {touched.password && errors.password && (
                            <p className="text-xs text-red-400 mt-1">{errors.password}</p>
                          )}
                        </div>
                        {/* confirm password */}
                        <div>
                          <label className="label">Confirm password</label>
                          <Field
                            as={Input}
                            name="confirmPassword"
                            type="password"
                            className="input mt-1"
                            placeholder="Re-type password"
                          />
                          {touched.confirmPassword && errors.confirmPassword && (
                            <p className="text-xs text-red-400 mt-1">
                              {errors.confirmPassword}
                            </p>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-white/60 mt-2">
                        ARTYLST will email your private playlist link and 30s
                        authentication video. We never share personal contact info.
                      </p>
                    </div>
                  )}

                  {/* Controls */}
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={goBack}
                      disabled={step === 1}
                      className="btn btn-ghost disabled:opacity-50"
                    >
                      Back
                    </button>

                    {!isLast ? (
                      <button type="button" onClick={goNext} className="btn btn-primary">
                        Next
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={!isValid || isCreating}
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
                        <span>Service tier</span>
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
    </>
  );
};

export default ArtistBookView;
