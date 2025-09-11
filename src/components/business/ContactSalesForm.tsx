"use client";

import { Form, Formik } from "formik";
import Link from "next/link";
import { useState } from "react";
import * as Yup from "yup";

// External UI
import { Dropdown, Input, Textarea } from "@/components";
import { DropdownOption } from "@/interface";
import { useGetGenresQuery, useGetVibesQuery } from "@/redux/features/meta/meta.api";

const annualBudgetOptions: DropdownOption<string>[] = [
  { label: "Under $50k", value: "under-50k" },
  { label: "$50k - $100k", value: "50k-100k" },
  { label: "$100k - $150k", value: "100k-150k" },
  { label: "$150k - $200k", value: "150k-200k" },
  { label: "$200k-$250k", value: "200k-250k" },
  { label: "$250k+", value: "250k+" },
];

/**
 * Types
 */
interface FormValues {
  fullName: string;
  businessName: string;
  genre: string; // maps to categories _id
  vibe: string; // maps to VIBES _id
  businessType: string;
  email: string;
  phoneNumber?: string;
  desirePlaylistLengthMinute: number | ""; // allow "" during typing
  annualBudget: string;
  usage: "daily" | "special" | "";
  useCase: string; // required when usage = "special"
  websiteUrl?: string;
  message?: string;
}

/**
 * Dropdown options
 */
const businessTypeOptions: DropdownOption<string>[] = [
  { label: "Restaurant", value: "restaurant" },
  { label: "Cafe", value: "cafe" },
  { label: "Retail", value: "retail" },
  { label: "Office", value: "office" },
  { label: "Other", value: "other" },
];

const usageOptions: DropdownOption<string>[] = [
  { label: "Daily use", value: "daily" },
  { label: "Special occasion", value: "special" },
];

/**
 * Initial Values
 */
const initialValues: FormValues = {
  fullName: "",
  businessName: "",
  genre: "",
  vibe: "",
  businessType: "",
  email: "",
  phoneNumber: "",
  desirePlaylistLengthMinute: "",
  annualBudget: "",
  usage: "",
  useCase: "",
  websiteUrl: "",
  message: "",
};

/**
 * Validation Schema
 */
const validationSchema = Yup.object({
  fullName: Yup.string().trim().min(2, "Too short").required("Full name is required"),
  businessName: Yup.string()
    .trim()
    .min(2, "Too short")
    .required("Business name is required"),
  genre: Yup.string().required("Genre is required"),
  vibe: Yup.string().required("Vibe is required"),
  businessType: Yup.string().required("Business type is required"),
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  phoneNumber: Yup.string()
    .trim()
    .matches(/^\+?[0-9()\-\s]*$/, "Enter a valid phone number")
    .optional(),
  desirePlaylistLengthMinute: Yup.number()
    .typeError("Enter a valid number")
    .integer("Must be a whole number")
    .min(10, "Minimum 10 minutes")
    .max(24 * 60, "Too long for one day")
    .required("Playlist length is required"),
  annualBudget: Yup.string().required("Annual budget is required"),
  usage: Yup.string()
    .transform((v) => (typeof v === "string" ? v.trim().toLowerCase() : v))
    .oneOf(["daily", "special"], "Select a usage type")
    .required("Select a usage type"),
  useCase: Yup.string().when("usage", {
    is: "special",
    then: (s) => s.trim().min(5, "Add a few details").required("Describe the occasion"),
    otherwise: (s) => s.default("daily use"),
  }),
  websiteUrl: Yup.string()
    .trim()
    .url("Enter a valid URL (e.g. https://example.com)")
    .optional()
    .nullable(),
  message: Yup.string().max(1000, "Message too long").optional(),
});

const ContactSalesForm = () => {
  const { data: genresData } = useGetGenresQuery({});
  const { data: vibesData } = useGetVibesQuery({});
  const genres = genresData?.data || [];
  const vibes = vibesData?.data || [];

  const [categoryOpt, setCategoryOpt] = useState<DropdownOption<string> | null>(null);
  const [businessTypeOpt, setBusinessTypeOpt] = useState<DropdownOption<string> | null>(
    null
  );
  const [vibeOpt, setVibeOpt] = useState<DropdownOption<string> | null>(null);
  const [usageOpt, setUsageOpt] = useState<DropdownOption<string> | null>(null);
  const [annualBudgetOpt, setAnnualBudgetOpt] = useState<DropdownOption<string> | null>(
    null
  );

  const handleSubmit = async (values: FormValues) => {
    // Build human-readable labels for dropdowns
    const genreLabel = genres.find((g) => g._id === values.genre)?.label || values.genre;
    const vibeLabel = vibes.find((v) => v._id === values.vibe)?.label || values.vibe;
    const businessTypeLabel =
      businessTypeOptions.find((o) => o.value === values.businessType)?.label ||
      values.businessType;
    const annualBudgetLabel =
      annualBudgetOptions.find((o) => o.value === values.annualBudget)?.label ||
      values.annualBudget;

    const cleaned = {
      ...values,
      // normalize number field from "" -> null or number
      desirePlaylistLengthMinute:
        values.desirePlaylistLengthMinute === ""
          ? null
          : Number(values.desirePlaylistLengthMinute),
      // ensure useCase has a sensible default for daily
      useCase: values.usage === "daily" ? "daily use" : values.useCase,
    };

    const humanReadable = {
      fullName: cleaned.fullName,
      businessName: cleaned.businessName,
      genre: genreLabel,
      vibe: vibeLabel,
      businessType: businessTypeLabel,
      email: cleaned.email,
      phoneNumber: cleaned.phoneNumber || "",
      desirePlaylistLengthMinute: cleaned.desirePlaylistLengthMinute,
      annualBudget: annualBudgetLabel,
      usage: cleaned.usage,
      useCase: cleaned.useCase,
      websiteUrl: cleaned.websiteUrl || "",
      message: cleaned.message || "",
    };

    // 🔥 Console logs (raw + readable)
    console.log("RAW_FORM_VALUES:", cleaned);
    console.log("HUMAN_READABLE_VALUES:", humanReadable);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange
        validateOnBlur
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          setFieldValue,
          setFieldTouched,
        }) => (
          <Form className="flex flex-col gap-4 p-4">
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                {/* full name */}
                <div>
                  <label className="mb-[4px] block">Full Name</label>
                  <Input
                    className={`bg-brand-2/10 border ${touched.fullName && errors.fullName ? "border-red-500" : "border-white/10"} rounded-2xl px-4 py-3 w-full`}
                    type="text"
                    placeholder="Enter Full Name"
                    name="fullName"
                    value={values.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!(touched.fullName && errors.fullName)}
                  />
                  {touched.fullName && errors.fullName && (
                    <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* business name */}
                <div>
                  <label className="mb-[4px] block">Business Name</label>
                  <Input
                    className={`bg-brand-2/10 border ${touched.businessName && errors.businessName ? "border-red-500" : "border-white/10"} rounded-2xl px-4 py-3 w-full`}
                    type="text"
                    placeholder="Business name"
                    name="businessName"
                    value={values.businessName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!(touched.businessName && errors.businessName)}
                  />
                  {touched.businessName && errors.businessName && (
                    <p className="text-red-400 text-sm mt-1">{errors.businessName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* work email */}
                <div>
                  <label className="mb-[4px] block">Work Email</label>
                  <Input
                    className={`bg-brand-2/10 border ${touched.email && errors.email ? "border-red-500" : "border-white/10"} rounded-2xl px-4 py-3 w-full`}
                    type="email"
                    placeholder="Enter Work Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!(touched.email && errors.email)}
                  />
                  {touched.email && errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* phone number (optional) */}
                <div>
                  <label className="mb-[4px] block">Phone Number (optional)</label>
                  <Input
                    className={`bg-brand-2/10 border ${touched.phoneNumber && errors.phoneNumber ? "border-red-500" : "border-white/10"} rounded-2xl px-4 py-3 w-full`}
                    type="text"
                    placeholder="Enter Phone Number"
                    name="phoneNumber"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!(touched.phoneNumber && errors.phoneNumber)}
                  />
                  {touched.phoneNumber && errors.phoneNumber && (
                    <p className="text-red-400 text-sm mt-1">{errors.phoneNumber}</p>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* desired playlist length (minutes) */}
                <div>
                  <label className="mb-[4px] block">
                    Desired playlist length (minutes)
                  </label>
                  <Input
                    className={`bg-brand-2/10 border ${touched.desirePlaylistLengthMinute && errors.desirePlaylistLengthMinute ? "border-red-500" : "border-white/10"} rounded-2xl px-4 py-3 w-full`}
                    type="number"
                    placeholder="Enter desired playlist length (minutes)"
                    name="desirePlaylistLengthMinute"
                    value={values.desirePlaylistLengthMinute}
                    onChange={(e) => {
                      const v = e.target.value;
                      setFieldValue(
                        "desirePlaylistLengthMinute",
                        v === "" ? "" : Number(v),
                        true
                      );
                    }}
                    onBlur={handleBlur}
                    aria-invalid={
                      !!(
                        touched.desirePlaylistLengthMinute &&
                        errors.desirePlaylistLengthMinute
                      )
                    }
                  />
                  {touched.desirePlaylistLengthMinute &&
                    errors.desirePlaylistLengthMinute && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.desirePlaylistLengthMinute}
                      </p>
                    )}
                </div>

                {/* annual budget */}
                <div>
                  <label className="mb-[4px] block">Annual Budget</label>
                  <Dropdown
                    value={annualBudgetOpt}
                    options={annualBudgetOptions}
                    onChange={(opt) => {
                      setAnnualBudgetOpt(opt);
                      setFieldValue("annualBudget", opt?.value || "", true);
                      setFieldTouched("annualBudget", true, false);
                    }}
                    placeholder="Select Annual Budget"
                    className="w-full"
                    buttonClassName="w-full bg-brand-2/10 rounded-2xl px-4 py-3 text-white/80"
                    panelClassName="w-full"
                    optionClassName="w-full"
                    matchButtonWidth={false}
                    aria-invalid={!!(touched.annualBudget && errors.annualBudget)}
                  />
                  {touched.annualBudget && errors.annualBudget && (
                    <p className="text-red-400 text-sm mt-1">{errors.annualBudget}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                {/* genre (category) */}
                <div>
                  <label className="mb-[4px] block">Genre</label>
                  <Dropdown
                    value={categoryOpt}
                    options={genres.map((genre) => ({
                      label: genre.label,
                      value: genre._id,
                    }))}
                    onChange={(opt) => {
                      setCategoryOpt(opt);
                      setFieldValue("genre", opt?.value || "", true);
                      setFieldTouched("genre", true, false);
                    }}
                    placeholder="Select Genre"
                    className="w-full"
                    buttonClassName="w-full bg-brand-2/10 rounded-2xl px-4 py-3 text-white/80"
                    panelClassName="w-full"
                    optionClassName="w-full"
                    matchButtonWidth={false}
                    aria-invalid={!!(touched.genre && errors.genre)}
                  />
                  {touched.genre && errors.genre && (
                    <p className="text-red-400 text-sm mt-1">{errors.genre}</p>
                  )}
                </div>

                {/* business type */}
                <div>
                  <label className="mb-[4px] block">Business Type</label>
                  <Dropdown
                    value={businessTypeOpt}
                    options={businessTypeOptions}
                    onChange={(opt) => {
                      setBusinessTypeOpt(opt);
                      setFieldValue("businessType", opt?.value || "", true);
                      setFieldTouched("businessType", true, false);
                    }}
                    placeholder="Select business type"
                    className="w-full"
                    buttonClassName="w-full bg-brand-2/10 rounded-2xl px-4 py-3 text-white/80"
                    panelClassName="w-full"
                    optionClassName="w-full"
                    matchButtonWidth={false}
                    aria-invalid={!!(touched.businessType && errors.businessType)}
                  />
                  {touched.businessType && errors.businessType && (
                    <p className="text-red-400 text-sm mt-1">{errors.businessType}</p>
                  )}
                </div>

                {/* environment / vibe */}
                <div>
                  <label className="mb-[4px] block">Vibe</label>
                  <Dropdown
                    value={vibeOpt}
                    options={vibes.map((vibe) => ({
                      label: vibe.label,
                      value: vibe._id,
                    }))}
                    onChange={(opt) => {
                      setVibeOpt(opt);
                      setFieldValue("vibe", opt?.value || "", true);
                      setFieldTouched("vibe", true, false);
                    }}
                    placeholder="Select Vibe"
                    className="w-full"
                    buttonClassName="w-full bg-brand-2/10 rounded-2xl px-4 py-3 text-white/80"
                    panelClassName="w-full"
                    optionClassName="w-full"
                    matchButtonWidth={false}
                    aria-invalid={!!(touched.vibe && errors.vibe)}
                  />
                  {touched.vibe && errors.vibe && (
                    <p className="text-red-400 text-sm mt-1">{errors.vibe}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="mb-[4px] block">Usage Type</label>
                <div>
                  <Dropdown
                    value={usageOpt}
                    options={usageOptions}
                    onChange={(opt) => {
                      setUsageOpt(opt);
                      const usage = (opt?.value as "daily" | "special") ?? "";

                      // 👉 দুটোতেই shouldValidate = true
                      setFieldValue("usage", usage, true);
                      setFieldTouched("usage", true, true);

                      if (usage === "daily") {
                        setFieldValue("useCase", "daily use", true);
                        setFieldTouched("useCase", false, false);
                      } else if (usage === "special") {
                        setFieldValue("useCase", "", true);
                        setFieldTouched("useCase", false, false);
                      } else {
                        setFieldValue("useCase", "", true);
                        setFieldTouched("useCase", false, false);
                      }
                    }}
                    // onBlur={() => setFieldTouched("usage", true, true)}
                    placeholder="Is this for daily use or special occasion?"
                    className="w-full"
                    buttonClassName="w-full bg-brand-2/10 rounded-2xl px-4 py-3 text-white/80"
                    panelClassName="w-full"
                    optionClassName="w-full"
                    matchButtonWidth={false}
                    aria-invalid={!!(touched.usage && errors.usage)}
                  />

                  {touched.usage && errors.usage && (
                    <p className="text-red-400 text-sm mt-1">{errors.usage as string}</p>
                  )}
                </div>

                {/* conditional useCase when usage is special */}
                {values.usage === "special" && (
                  <div className="mt-[10px]">
                    <Input
                      className={`bg-brand-2/10 border ${touched.useCase && errors.useCase ? "border-red-500" : "border-white/10"} rounded-2xl px-4 py-3 w-full`}
                      type="text"
                      placeholder="What is the occasion/theme?"
                      name="useCase"
                      value={values.useCase}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={!!(touched.useCase && errors.useCase)}
                    />
                    {touched.useCase && errors.useCase && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.useCase as string}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="mb-[4px] block">Website URL</label>
                <Input
                  className={`bg-brand-2/10 border ${touched.websiteUrl && errors.websiteUrl ? "border-red-500" : "border-white/10"} rounded-2xl px-4 py-3 w-full`}
                  type="text"
                  placeholder="Enter Website URL"
                  name="websiteUrl"
                  value={values.websiteUrl}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!(touched.websiteUrl && errors.websiteUrl)}
                />
                {touched.websiteUrl && errors.websiteUrl && (
                  <p className="text-red-400 text-sm mt-1">{errors.websiteUrl}</p>
                )}
              </div>

              <div>
                <label className="mb-[4px] block">Message (optional)</label>
                <Textarea
                  className={`bg-brand-2/10 border ${touched.message && errors.message ? "border-red-500" : "border-white/10"} rounded-2xl px-4 py-3 w-full`}
                  placeholder="Enter Message"
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={5}
                  aria-invalid={!!(touched.message && errors.message)}
                />
                {touched.message && errors.message && (
                  <p className="text-red-400 text-sm mt-1">{errors.message}</p>
                )}
              </div>
            </div>

            {/* submit button */}
            <button type="submit" className="btn-primary-light">
              Submit
            </button>

            {/* terms and conditions */}
            <div>
              <p className="text-muted">
                By clicking &quot;Submit&quot;, you agree to our{" "}
                <Link href="/terms-of-service" className="text-white">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" className="text-white">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ContactSalesForm;
