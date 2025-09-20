"use client";

import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { DateObject } from "react-multi-date-picker";
import { toast } from "sonner";
import * as Yup from "yup";

import { DateSelector, Dropdown, Input, MultiDropdown } from "@/components";
import { useAppDispatch, useDebounce } from "@/hooks";
import { DropdownOption, IQueryMutationErrorResponse } from "@/interface";
import { TGender } from "@/interface/user.interface";
import {
  useCheckArtistUserNameMutation,
  useRegisterArtistMutation,
} from "@/redux/features/auth/auth.api";
import { setUser } from "@/redux/features/auth/user.slice";
import { useGetGenresQuery } from "@/redux/features/meta/meta.api";

const genderOptions: DropdownOption<TGender>[] = [
  { label: "He/him", value: "male" },
  { label: "She/her", value: "female" },
];

interface FormValues {
  fullName: string;
  gender: DropdownOption<TGender> | null;
  displayName: string;
  userName: string;
  dob: string | null;
  email: string;
  password: string;
  confirmPassword: string;
  genre: DropdownOption<string>[];
}

const usernameRegex = /^[a-zA-Z0-9._-]+$/;

const initialValues: FormValues = {
  fullName: "",
  gender: null,
  displayName: "",
  userName: "",
  dob: null,
  email: "",
  password: "",
  confirmPassword: "",
  genre: [],
};

const validationSchema = Yup.object({
  fullName: Yup.string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .required("Full name is required"),
  gender: Yup.object({
    label: Yup.string().required(),
    value: Yup.mixed<TGender>().oneOf(["male", "female"]).required(),
  })
    .nullable()
    .required("Please choose a gender"),
  displayName: Yup.string()
    .trim()
    .min(2, "Display name must be at least 2 characters")
    .required("Display name is required"),
  userName: Yup.string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters")
    .matches(
      usernameRegex,
      "Only letters, numbers, underscores, hyphens, and periods are allowed"
    )
    .required("Username is required"),
  dob: Yup.string()
    .nullable()
    .required("Date of birth is required")
    .test("valid-date", "Invalid date", (v) => {
      if (!v) return false;
      const d = new Date(v);
      return !isNaN(d.getTime());
    })
    .test("age-min", "You must be at least 13 years old", (v) => {
      if (!v) return false;
      const dobDate = new Date(v);
      const today = new Date();
      const thirteenAgo = new Date(
        today.getFullYear() - 13,
        today.getMonth(),
        today.getDate()
      );
      return dobDate <= thirteenAgo;
    }),
  email: Yup.string().email("Enter a valid email").required("Email is required"),
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
  genre: Yup.array()
    .of(
      Yup.object({
        label: Yup.string().required(),
        value: Yup.string().required(),
      })
    )
    .min(1, "Please choose at least one genre")
    .required("Please choose at least one genre"),
});

const EnrollForm = () => {
  const [registerArtist, { isLoading }] = useRegisterArtistMutation();
  const [checkUsernameTrigger, { isLoading: isUsernameChecking }] =
    useCheckArtistUserNameMutation();

  const { data: genresData } = useGetGenresQuery({});
  const genreOptions: DropdownOption<string>[] = (genresData?.data || []).map((g) => ({
    label: g.label,
    value: g._id,
  }));

  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isUsernameTaken, setIsUsernameTaken] = useState<boolean | null>(null);
  const lastRequestedUsernameRef = useRef<string>("");

  const [debouncedUsername, setDebouncedUsername] = useDebounce("");
  const usernameOk = (u: string) => /^[a-z0-9._-]{3,30}$/.test(u);

  useEffect(() => {
    const run = async () => {
      const userName = debouncedUsername.trim().toLowerCase();

      // reset state when empty or invalid
      if (!userName || !usernameOk(userName)) {
        setIsUsernameTaken(null);
        return;
      }

      // avoid duplicate calls for the same value
      if (lastRequestedUsernameRef.current === userName) return;
      lastRequestedUsernameRef.current = userName;

      const res = await checkUsernameTrigger(userName);
      const error = res.error as IQueryMutationErrorResponse;
      if (error) {
        setIsUsernameTaken(null);
        toast.error(error.data.message || "Something went wrong");
        return;
      }
      setIsUsernameTaken(res?.data?.data?.isExist === true);
    };

    run();
  }, [debouncedUsername, checkUsernameTrigger]);

  const handleSubmit = async (values: FormValues) => {
    if (isLoading) return;

    if (isUsernameTaken === true) {
      toast.error("Please choose a different username.");
      return;
    }
    if (isUsernameChecking) {
      toast.message("Hold on — checking username…");
      return;
    }

    const payload = {
      fullName: values.fullName.trim(),
      gender: values.gender!.value,
      displayName: values.displayName.trim(),
      userName: values.userName.trim().toLowerCase(),
      dob: values.dob ? new DateObject(values.dob).format("YYYY-MM-DD") : "",
      email: values.email.trim().toLowerCase(),
      password: values.password,
      isEmailVerified: false,
      genre: values.genre.map((g) => g.value),
    };

    const res = await registerArtist(payload);
    const error = res.error as IQueryMutationErrorResponse;

    if (error) {
      if (error.data?.message) toast.error(error.data.message);
      else toast.error("Something went wrong");
      return;
    }
    const email = res.data?.data.email;
    dispatch(setUser({ email }));

    router.push("/join-as-artist/verification");
    toast.success("Account created successfully!", {
      description: "Verify your email to continue.",
    });
  };

  return (
    <>
      <Formik<FormValues>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnMount
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
          setFieldTouched,
          submitCount,
        }) => (
          <Form className="flex flex-col gap-4">
            <div className="sm:grid-cols-2 grid gap-4">
              {/* full name */}
              <div className="w-full">
                <label className="text-[16px] font-[500] block mb-[8px]">Full name</label>
                <input
                  name="fullName"
                  className={`enroll-input ${touched.fullName && errors.fullName ? "border-red-500" : ""}`}
                  type="text"
                  value={values.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!(touched.fullName && errors.fullName)}
                />
                {touched.fullName && errors.fullName && (
                  <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* gender */}
              <div className="w-full">
                <label className="text-[16px] font-[500] block mb-[8px]">Gender</label>
                <Dropdown
                  value={values.gender}
                  options={genderOptions}
                  onChange={(opt) => setFieldValue("gender", opt)}
                  placeholder="Choose gender"
                  className="w-full"
                  buttonClassName="w-full bg-brand-2/10 py-4 rounded-2xl px-4 py-3"
                  panelClassName="w-full"
                  optionClassName="w-full"
                  matchButtonWidth={false}
                />
                {touched.gender && errors.gender && (
                  <p className="text-red-400 text-sm mt-1">
                    {typeof errors.gender === "string"
                      ? errors.gender
                      : "Please choose a gender"}
                  </p>
                )}
              </div>

              {/* display name */}
              <div>
                <div className="mb-[8px]">
                  <label className="text-[16px] font-[500] block mb-[2px]">
                    Display name
                  </label>
                  <p className="text-muted">This appears on your profile</p>
                </div>
                <input
                  name="displayName"
                  className={`enroll-input ${touched.displayName && errors.displayName ? "border-red-500" : ""}`}
                  type="text"
                  value={values.displayName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!(touched.displayName && errors.displayName)}
                />
                {touched.displayName && errors.displayName && (
                  <p className="text-red-400 text-sm mt-1">{errors.displayName}</p>
                )}
              </div>

              {/* username */}
              <div>
                <div className="mb-[8px]">
                  <label className="text-[16px] font-[500] block mb-[2px]">
                    User Name
                  </label>
                  <p className="text-muted">
                    Only letters, numbers, underscores, hyphens, and periods
                  </p>
                </div>
                <input
                  name="userName"
                  className={`enroll-input ${touched.userName && errors.userName ? "border-red-500" : ""}`}
                  type="text"
                  value={values.userName}
                  onChange={(e) => {
                    handleChange(e);
                    const next = e.target.value.trim().toLowerCase();
                    setDebouncedUsername(next);
                  }}
                  onBlur={handleBlur}
                  aria-invalid={!!(touched.userName && errors.userName)}
                  aria-describedby="username-help"
                  aria-live="polite"
                />
                {touched.userName && errors.userName && (
                  <p className="text-red-400 text-sm mt-1">{errors.userName}</p>
                )}
                {values.userName && !errors.userName && (
                  <p id="username-help" className="text-sm mt-1">
                    {isUsernameChecking && "Checking availability…"}
                    {!isUsernameChecking &&
                      isUsernameTaken === false &&
                      "✅ Username is available"}
                    {!isUsernameChecking &&
                      isUsernameTaken === true &&
                      "❌ Username is taken"}
                  </p>
                )}
              </div>

              {/* date of birth */}
              <div className="w-full">
                <div>
                  <label className="text-[16px] font-[500] block mb-[8px]">
                    Date of birth
                  </label>
                  <DateSelector
                    value={values.dob ? new DateObject(values.dob) : undefined}
                    onChange={(value) => {
                      const iso = value ? value.toDate().toISOString() : null;
                      setFieldValue("dob", iso);
                    }}
                  />
                </div>
                {touched.dob && errors.dob && (
                  <p className="text-red-400 text-sm mt-1">
                    {typeof errors.dob === "string"
                      ? errors.dob
                      : "Please enter a valid date"}
                  </p>
                )}
              </div>

              {/* email */}
              <div className="w-full">
                <div className="mb-[8px]">
                  <label className="text-[16px] font-[500] block mb-[2px]">Email</label>
                </div>
                <input
                  name="email"
                  className={`enroll-input ${touched.email && errors.email ? "border-red-500" : ""}`}
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!(touched.email && errors.email)}
                />
                {touched.email && errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* genres */}
              <div className="col-span-2">
                <label className="text-[16px] font-[500] block mb-[8px]">Genres</label>
                <MultiDropdown
                  options={genreOptions}
                  values={values.genre}
                  onChange={(e) => {
                    setFieldValue("genre", e);
                    setFieldTouched("genre", true, false);
                  }}
                  className="w-full"
                  buttonClassName="!bg-brand-2/10 !py-3 !rounded-2xl"
                />
                {errors.genre && (touched.genre || submitCount > 0) && (
                  <p className="text-red-400 text-sm mt-1">{errors.genre as string}</p>
                )}
              </div>

              {/* password */}
              <div>
                <div className="mb-[8px]">
                  <label className="text-[16px] font-[500] block mb-[2px]">
                    Password
                  </label>
                </div>
                <Input
                  name="password"
                  type="password"
                  className={`bg-brand-2/10 border ${
                    touched.password && errors.password
                      ? "border-red-500"
                      : "border-white/10"
                  } rounded-2xl px-4 py-3 w-full`}
                  value={values.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                  onBlur={handleBlur}
                  aria-invalid={!!(touched.password && errors.password)}
                />
                {touched.password && errors.password && (
                  <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* confirm password */}
              <div>
                <div className="mb-[8px]">
                  <label className="text-[16px] font-[500] block mb-[2px]">
                    Confirm password
                  </label>
                </div>
                <Input
                  name="confirmPassword"
                  type="password"
                  className={`bg-brand-2/10 border ${
                    touched.confirmPassword && errors.confirmPassword
                      ? "border-red-500"
                      : "border-white/10"
                  } rounded-2xl px-4 py-3 w-full`}
                  value={values.confirmPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                  onBlur={handleBlur}
                  aria-invalid={!!(touched.confirmPassword && errors.confirmPassword)}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>
            {/* terms */}
            <div>
              <p className="text-muted">
                By clicking &quot;Create account&quot;, you agree to our{" "}
                <Link href="/terms-and-conditions" className="text-white">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" className="text-white">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            {/* submit */}
            <button type="submit" className="btn-primary-light" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create account"}
            </button>
          </Form>
        )}
      </Formik>

      <div className="mt-[20px] text-center lg:text-right">
        <Link className="text-muted text-[16px] font-[500] underline" href="/login">
          Sign into an existing account
        </Link>
      </div>
    </>
  );
};

export default EnrollForm;
