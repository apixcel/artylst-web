"use client";

import { Input } from "@/components";
import {
  useSendVerificationEmailMutation,
  useVerifyEmailMutation,
} from "@/redux/features/user/user.api";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { IQueryMutationErrorResponse } from "@/interface";
import dateUtils from "@/utils/date";
import { useAppSelector } from "@/hooks";

const ArtistVerificationPage = () => {
  const [sendVerificationEmail] = useSendVerificationEmailMutation();
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const user = useAppSelector((state) => state.user.user);
  console.log("user from verification page", user);

  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const [errorMessage, setErrorMessage] = useState<string>("");
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

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const otp = form.otp?.value || "";

    if (!otp) {
      setErrorMessage("Please enter OTP");
      return;
    }

    if (otp.length !== 6) {
      setErrorMessage("Please enter a valid OTP");
      return;
    }

    const response = await verifyEmail({ otp: Number(otp), email: user?.email || "" });
    const error = response?.error as IQueryMutationErrorResponse;
    if (error) {
      if (error?.data?.message) {
        setErrorMessage(error.data?.message);
      } else {
        setErrorMessage("Something went wrong");
      }

      return;
    }

    toast.success("Email verified successfully! Please login to continue");
    router.push("/login");

    setErrorMessage("");
  };

  return (
    <>
      <h1 className="text-[32px] text-center sm:text-left sm:text-[44px] mb-[20px]">
        Verify your email
      </h1>
      <form onSubmit={handleVerify} className="flex flex-col gap-[10px]">
        <div className="flex items-center justify-start gap-0">
          <Input
            required
            name="otp"
            type="number"
            maxLength={6}
            placeholder="Enter Your Verification Code"
          />
        </div>
        {errorMessage ? (
          <span className="text-[14px] text-error">{errorMessage}</span>
        ) : (
          ""
        )}
        <button disabled={isLoading} type="submit" className="btn btn-primary">
          {isLoading ? "Verifying..." : "Verify"}
        </button>
        <span className="text-[14px] text-strong">
          Didn&apos;t receive the code?{" "}
          {remainingTime > 0 ? (
            `Resend in ${dateUtils.formatSecondsToMMSS(remainingTime)}`
          ) : (
            <button
              onClick={handleResend}
              disabled={remainingTime > 0}
              className="cursor-pointer font-[700] text-brand-4"
            >
              Resend
            </button>
          )}
        </span>
      </form>
    </>
  );
};

export default ArtistVerificationPage;
