"use client";

import { ArtistCheckoutProgress } from "@/components";
import { useState } from "react";

const stepsLabels = ["1. Choose tier", "2. Brief", "3. Add-ons", "4. Pay"] as const;

const ArtistBookPage = () => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  return (
    <div>
      {/* Progress */}
      <section className="py-8">
        <ArtistCheckoutProgress
          current={step}
          steps={[...stepsLabels]}
          className="mx-auto"
        />
      </section>
    </div>
  );
};

export default ArtistBookPage;
