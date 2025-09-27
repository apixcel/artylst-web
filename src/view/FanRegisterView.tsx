"use client";
import { FormErrorMessage, Input } from "@/components";
import { useAppDispatch } from "@/hooks";
import { IQueryMutationErrorResponse } from "@/interface/queryMutationErrorResponse";
import { useRegisterFanMutation } from "@/redux/features/auth/auth.api";
import { setUser } from "@/redux/features/auth/user.slice";
import { Form, Formik, FormikHelpers } from "formik";
import { Check, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

interface FormValues {
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
}

const initialValues: FormValues = {
  email: "",
  fullName: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required!"),
  fullName: Yup.string().required("Name is required!"),
  password: Yup.string()
    .required("Password is required!")
    .min(8, "Min 8 characters")
    .matches(/[A-Z]/, "Add an uppercase")
    .matches(/[a-z]/, "Add a lowercase")
    .matches(/[0-9]/, "Add a number")
    .matches(/[@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/?]/, "Add a symbol"),
  confirmPassword: Yup.string()
    .required("Confirm the password!")
    .oneOf([Yup.ref("password")], "Passwords don't match"),
});

const passwordChecks = [
  { label: "Min 8 characters", check: (pw: string) => pw.length >= 8 },
  { label: "Uppercase (A–Z)", check: (pw: string) => /[A-Z]/.test(pw) },
  { label: "Lowercase (a–z)", check: (pw: string) => /[a-z]/.test(pw) },
  { label: "Number (0–9)", check: (pw: string) => /[0-9]/.test(pw) },
  {
    label: "Symbol (!@#$…)",
    check: (pw: string) => /[@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pw),
  },
];

const FanRegisterView = () => {
  const [pwd, setPwd] = useState("");
  const [isTypingPassword, setIsTypingPassword] = useState(false);
  const [isTypingConfirm, setIsTypingConfirm] = useState(false);
  const dispatch = useAppDispatch();

  const [registerFan, { isLoading }] = useRegisterFanMutation();
  const router = useRouter();

  const typingTimerRef = useRef<
    Record<keyof FormValues, ReturnType<typeof setTimeout> | null>
  >({
    email: null,
    password: null,
    confirmPassword: null,
    fullName: null,
  });

  const startTyping = (field: keyof FormValues) => {
    if (field === "password") setIsTypingPassword(true);
    if (field === "confirmPassword") setIsTypingConfirm(true);

    const t = typingTimerRef.current[field];
    if (t) clearTimeout(t);

    typingTimerRef.current[field] = setTimeout(() => {
      if (field === "password") setIsTypingPassword(false);
      if (field === "confirmPassword") setIsTypingConfirm(false);
      typingTimerRef.current[field] = null;
    }, 400);
  };

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    if (isLoading) return;

    const payload = {
      email: values.email,
      fullName: values.fullName,
      password: values.password,
      isEmailVerified: false,
    };

    const response = await registerFan(payload);
    const error = response.error as IQueryMutationErrorResponse;
    console.log(response.data);

    if (error) {
      if (error.data?.message) toast.error(error.data.message || "Something went wrong");
      return;
    }
    const email = response.data?.data.email;
    console.log(email);
    dispatch(setUser({ email }));
    router.push("/verification");
    toast.success("Account registered successfully!", {
      description: "Verify your email to continue.",
    });
    resetForm();
  };

  return (
    <div className="rounded-2xl bg-gradient-to-b from-brand-2/10 to-brand-1/10 border border-white/10 p-4 sm:p-6 min-w-md w-full">
      <h1 className="text-2xl text-center">Register as a fan</h1>
      <p className="text-sm text-muted text-center">
        Create your account providing details below
      </p>

      <Formik<FormValues>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          submitCount,
          setFieldValue,
          setFieldTouched,
        }) => {
          const showPasswordError =
            !!errors.password &&
            !isTypingPassword &&
            (touched.password || submitCount > 0);

          const showConfirmError =
            !!errors.confirmPassword &&
            !isTypingConfirm &&
            (touched.confirmPassword || submitCount > 0);

          const emphasizePwdRules =
            (touched.password || submitCount > 0) && !isTypingPassword;
          return (
            <Form className="mt-5 space-y-4">
              {/* Full Name */}
              <label className="block">
                <span className="text-sm text-muted">Full Name</span>
                <div className="relative mt-1">
                  <Input
                    value={values.fullName}
                    onChange={(e) => {
                      setFieldValue("fullName", e.target.value, true);
                      startTyping("fullName");
                    }}
                    onBlur={handleBlur}
                    name="fullName"
                    className="w-full bg-white/10 border border-white/10 focus:outline-none focus:ring-1 focus:ring-light rounded-xl pl-4 pr-4 py-2.5 placeholder-white/40"
                    type="text"
                    inputMode="email"
                    autoComplete="username"
                    placeholder="Enter your full name"
                  />
                </div>
                {touched.fullName && errors.fullName && (
                  <FormErrorMessage message={errors.fullName as string} />
                )}
              </label>

              {/* Email */}
              <label className="block">
                <span className="text-sm text-muted">Email</span>
                <div className="relative mt-1">
                  <Input
                    value={values.email}
                    onChange={(e) => {
                      setFieldValue("email", e.target.value, true);
                      startTyping("email");
                    }}
                    onBlur={handleBlur}
                    name="email"
                    className="w-full bg-white/10 border border-white/10 focus:outline-none focus:ring-1 focus:ring-light rounded-xl pl-4 pr-4 py-2.5 placeholder-white/40"
                    type="text"
                    inputMode="email"
                    autoComplete="username"
                    placeholder="Enter your email"
                  />
                </div>
                {touched.email && errors.email && (
                  <FormErrorMessage message={errors.email as string} />
                )}
              </label>

              {/* Password */}
              <label className="block">
                <span className="text-sm text-white/70">Password</span>
                <div className="relative mt-1">
                  <Input
                    value={values.password}
                    onChange={(e) => {
                      setPwd(e.target.value);
                      setFieldValue("password", e.target.value, true);
                      startTyping("password");
                    }}
                    onBlur={() => setFieldTouched("password", true, false)}
                    name="password"
                    type="password"
                    className="w-full bg-white/10 border border-white/10 focus:outline-none focus:ring-1 focus:ring-light rounded-xl pl-4 pr-12 py-2.5 placeholder-white/40"
                    autoComplete="current-password"
                    placeholder="••••••••"
                  />
                </div>
                {showPasswordError && errors.password === "Password is required!" && (
                  <FormErrorMessage message={errors.password as string} />
                )}

                {/* Password live checklist */}
                {pwd && (
                  <ul className="mt-2 ml-1 space-y-1">
                    {passwordChecks.map((rule, idx) => {
                      const passed = rule.check(pwd);
                      const color = passed
                        ? "text-green-400"
                        : emphasizePwdRules
                          ? "text-red-400"
                          : "text-red-400";
                      return (
                        <li key={idx} className="flex text-sm">
                          <span className={color}>
                            {passed ? (
                              <span>
                                <Check className="inline-block h-4 w-4 text-green-500" />
                              </span>
                            ) : (
                              <span>
                                <X className="inline-block h-4 w-4 text-red-400" />
                              </span>
                            )}
                          </span>
                          <span className={color}>
                            <span className="ml-2">{rule.label}</span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </label>

              {/* Confirm Password */}
              <label className="block">
                <span className="text-sm text-white/70">Confirm Password</span>
                <div className="relative mt-1">
                  <Input
                    value={values.confirmPassword}
                    onChange={(e) => {
                      setFieldValue("confirmPassword", e.target.value, true);
                      startTyping("confirmPassword");
                    }}
                    onBlur={() => setFieldTouched("confirmPassword", true, false)}
                    name="confirmPassword"
                    type="password"
                    className="w-full bg-white/10 border border-white/10 focus:outline-none focus:ring-1 focus:ring-light rounded-xl pl-4 pr-12 py-2.5 placeholder-white/40"
                    autoComplete="current-password"
                    placeholder="••••••••"
                  />
                </div>
                {showConfirmError && errors.confirmPassword && (
                  <FormErrorMessage message={errors.confirmPassword as string} />
                )}
              </label>

              {/* Submit button */}
              <button
                disabled={isLoading}
                type="submit"
                className="w-full px-4 py-2.5 rounded-xl bg-brand-4/80 hover:bg-brand-4/70 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
            </Form>
          );
        }}
      </Formik>

      <p className="text-sm text-muted text-center my-3">
        Already have an account?{" "}
        <Link href="/login" className="text-white">
          Login
        </Link>
      </p>

      {/* tiny policy line */}
      <p className="text-[12px] text-muted text-center">
        ARTYLST protects your privacy. We never share personal contact info.
      </p>
    </div>
  );
};

export default FanRegisterView;
