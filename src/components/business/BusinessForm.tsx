"use client";

import { Form, Formik } from "formik";
import Link from "next/link";
import { useState } from "react";
import * as Yup from "yup";

// External UI
import { Dropdown, Input } from "@/components";
import { DropdownOption, IQueryMutationErrorResponse } from "@/interface";

import { useAppDispatch } from "@/hooks";
import { useRegisterBusinessMutation } from "@/redux/features/auth/auth.api";
import { setUser } from "@/redux/features/auth/user.slice";
import { useGetGenresQuery, useGetVibesQuery } from "@/redux/features/meta/meta.api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

/**
 * Types
 */
interface FormValues {
  fullName: string;
  businessName: string;
  genre: string; // maps to `categories`
  vibe: string; // maps to `VIBES`
  businessType: string;
  email: string;
  desirePlaylistLengthMinute: number;
  desirePriceUsd: number;
  password: string;
  confirmPassword: string;
  usage: "daily" | "special" | "";
  useCase: string; // optional free text (e.g., theme/occasion); required when usage = "special"
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
  desirePlaylistLengthMinute: 0,
  desirePriceUsd: 0,
  password: "",
  confirmPassword: "",
  usage: "",
  useCase: "",
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
  desirePlaylistLengthMinute: Yup.number()
    .typeError("Enter a valid number")
    .integer("Must be a whole number")
    .min(10, "Minimum 10 minutes")
    .max(24 * 60, "Too long for one day")
    .required("Playlist length is required"),
  desirePriceUsd: Yup.number()
    .typeError("Enter a valid amount")
    .min(1, "Cannot be less than 1")
    .max(100000, "Seems unrealistically high")
    .required("Desired price is required"),
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
  usage: Yup.mixed<FormValues["usage"]>()
    .oneOf(["daily", "special", ""], "Invalid option")
    .required("Select a usage type"),
  useCase: Yup.string().when("usage", {
    is: "special",
    then: (s) => s.trim().min(5, "Add a few details").required("Describe the occasion"),
    otherwise: (s) => s.default("daily use"),
  }),
});

const BusinessForm = () => {
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

  const [registerBusiness, { isLoading }] = useRegisterBusinessMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async ({ usage, ...rest }: FormValues) => {
    if (isLoading) return;

    const payload = {
      ...rest,
      useCase: usage === "daily" ? "daily" : rest.useCase,
    };

    const res = await registerBusiness(payload);
    const error = res.error as IQueryMutationErrorResponse;

    if (error) {
      if (error.data?.message) toast.error(error.data.message);
      else toast.error("Something went wrong");
      return;
    }

    toast.success(
      "Business account created successfully! Verify your email to continue."
    );

    const email = res.data?.data.email;
    console.log("logging from business form email", email);

    dispatch(setUser({ email }));
    router.push("/business-form/verification");
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
          validateField,
        }) => (
          <Form className="flex flex-col gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {/* full name */}
              <div className="w-full">
                <label className="mb-[4px] block">Full name</label>
                <Input
                  className={`bg-brand-2/10 border ${touched.fullName && errors.fullName ? "border-red-500" : "border-white/10"} rounded-2xl px-4 py-3 w-full`}
                  type="text"
                  placeholder="Full name"
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

              {/* work email */}
              <div className="w-full">
                <label className="mb-[4px] block">Work email</label>
                <Input
                  className={`bg-brand-2/10 border ${touched.email && errors.email ? "border-red-500" : "border-white/10"} rounded-2xl px-4 py-3 w-full`}
                  type="email"
                  placeholder="Work email"
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

              {/* business name */}
              <div>
                <label className="mb-[4px] block">Business name</label>
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
                <label className="mb-[4px] block">Business type</label>
                <Dropdown
                  value={businessTypeOpt}
                  options={businessTypeOptions}
                  onChange={(opt) => {
                    setBusinessTypeOpt(opt);
                    setFieldValue("businessType", opt?.value || "", true);
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

              {/* desired price (USD) */}
              <div>
                <label className="mb-[4px] block">Desired price (USD)</label>
                <Input
                  className={`bg-brand-2/10 border ${touched.desirePriceUsd && errors.desirePriceUsd ? "border-red-500" : "border-white/10"} rounded-2xl px-4 py-3 w-full`}
                  type="number"
                  placeholder="Desired price (USD)"
                  name="desirePriceUsd"
                  value={values.desirePriceUsd}
                  onChange={(e) => {
                    const v = e.target.value;
                    setFieldValue("desirePriceUsd", v === "" ? "" : Number(v), true);
                  }}
                  onBlur={handleBlur}
                  aria-invalid={!!(touched.desirePriceUsd && errors.desirePriceUsd)}
                />
                {touched.desirePriceUsd && errors.desirePriceUsd && (
                  <p className="text-red-400 text-sm mt-1">{errors.desirePriceUsd}</p>
                )}
              </div>

              {/* usage type */}
              <div className="col-span-2">
                <div className="mb-3">
                  <label className="mb-[4px] block">Usage type</label>
                  <Dropdown
                    value={usageOpt}
                    options={usageOptions}
                    onChange={(opt) => {
                      setUsageOpt(opt);
                      const usage = (opt?.value as FormValues["usage"]) || "daily";

                      setFieldValue("usage", usage, true);
                      validateField("usage");

                      if (usage === "daily") {
                        setFieldValue("useCase", "daily use", true);
                        setFieldTouched("useCase", false, false); // clear any old touched/error
                      } else if (usage === "special") {
                        setFieldValue("useCase", "", true);
                        setFieldTouched("useCase", false, false);
                      } else {
                        setFieldValue("useCase", "", true);
                        setFieldTouched("useCase", false, false);
                      }
                    }}
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
                  <div>
                    <input
                      className="enroll-input"
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

              {/* password */}
              <div>
                <label className="mb-[4px] block">Password</label>
                <Input
                  name="password"
                  type="password"
                  className={`bg-brand-2/10 border ${
                    touched.password && errors.password
                      ? "border-red-500"
                      : "border-white/10"
                  } rounded-2xl px-4 py-3 w-full`}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!(touched.password && errors.password)}
                  placeholder="Password"
                />
                {touched.password && errors.password && (
                  <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* confirm password */}
              <div>
                <label className="mb-[4px] block">Confirm password</label>
                <Input
                  name="confirmPassword"
                  type="password"
                  className={`bg-brand-2/10 border ${
                    touched.confirmPassword && errors.confirmPassword
                      ? "border-red-500"
                      : "border-white/10"
                  } rounded-2xl px-4 py-3 w-full`}
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!(touched.confirmPassword && errors.confirmPassword)}
                  placeholder="Confirm password"
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* terms and conditions */}
            <div>
              <p className="text-muted">
                By clicking &quot;Create Account&quot;, you agree to our{" "}
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

            {/* submit button */}
            <button type="submit" disabled={isLoading} className="btn-primary-light">
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </Form>
        )}
      </Formik>

      <div className="mt-[20px] text-right">
        <Link className="text-muted text-[16px] font-[500] underline" href="/login">
          Sign into an existing account
        </Link>
      </div>
    </>
  );
};

export default BusinessForm;
