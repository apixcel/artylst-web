"use client";

import { FormErrorMessage, Input } from "@/components";
import { useAppSelector } from "@/hooks";
import { IQueryMutationErrorResponse } from "@/interface";
import {
  useSendVerificationEmailMutation,
  useVerifyEmailMutation,
} from "@/redux/features/auth/auth.api";
import dateUtils from "@/utils/date";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const initialValues = {
  otp: "",
};

const validationSchema = Yup.object().shape({
  otp: Yup.string().required("OTP is required").min(6, "OTP must be 6 digits"),
});

const VerificationView = () => {
  const [sendVerificationEmail] = useSendVerificationEmailMutation();
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const user = useAppSelector((state) => state.user.user);
  console.log(user);

  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const router = useRouter();

  // send OTP on mount
  useEffect(() => {
    const sendOtp = async () => {
      const response = await sendVerificationEmail(user?.email || "");
      const serverCooldownEnd = response?.data?.data?.cooldownEnd;

      if (serverCooldownEnd) {
        const now = Date.now();
        const timeLeft = Math.floor((serverCooldownEnd - now) / 1000);
        setRemainingTime(timeLeft > 0 ? timeLeft : 0);
      }
    };
    sendOtp();
  }, [sendVerificationEmail, user?.email]);

  // countdown timer effect
  useEffect(() => {
    if (remainingTime <= 0) return;

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime]);

  // resend handler
  const handleResend = async () => {
    const response = await sendVerificationEmail(user?.email || "");
    const serverCooldownEnd = response?.data?.data?.cooldownEnd;

    if (serverCooldownEnd) {
      const now = Date.now();
      const timeLeft = Math.floor((serverCooldownEnd - now) / 1000);
      setRemainingTime(timeLeft > 0 ? timeLeft : 0);
    }
  };

  const handleVerify = async (values: { otp: string }) => {
    const { otp } = values;

    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }

    if (otp.length !== 6) {
      toast.error("Please enter a valid OTP");
      return;
    }

    const response = await verifyEmail({ otp: Number(otp), email: user?.email || "" });
    const error = response?.error as IQueryMutationErrorResponse;
    if (error) {
      if (error.data?.message) toast.error(error.data?.message || "Something went wrong");
      return;
    }

    toast.success("Email verified successfully!", {
      description: "Please login to continue.",
    });
    router.push("/login");
  };

  return (
    <>
      <h1 className="text-[32px] text-center sm:text-left sm:text-[44px] mb-[20px]">
        Verify your email
      </h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleVerify}
      >
        {({ errors, touched, handleChange, handleBlur, isSubmitting, values }) => {
          return (
            <Form className="flex flex-col gap-[10px]">
              <div className="flex flex-col">
                <Input
                  name="otp"
                  type="text"
                  maxLength={6}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Enter Your Verification Code"
                  onBlur={handleBlur}
                  value={values.otp}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    handleChange({
                      target: {
                        name: "otp",
                        value: val,
                      },
                    });
                  }}
                />
                {touched.otp && errors.otp && <FormErrorMessage message={errors.otp} />}
              </div>
              <button
                disabled={isLoading || !!(errors.otp && touched.otp)}
                type="submit"
                className="btn btn-primary"
              >
                {isLoading ? "Verifying..." : "Verify"}
              </button>
              <span className="text-[14px] text-strong">
                Didn&apos;t receive the code?{" "}
                {remainingTime > 0 ? (
                  `Resend in ${dateUtils.formatSecondsToMMSS(remainingTime)}`
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={
                      remainingTime > 0 || isLoading || !!(errors.otp && touched.otp)
                    }
                    className="cursor-pointer font-[700] text-brand-4"
                  >
                    Resend
                  </button>
                )}
              </span>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default VerificationView;
