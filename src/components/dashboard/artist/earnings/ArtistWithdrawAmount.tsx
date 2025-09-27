"use client";

import DialogProvider from "@/components/ui/DialogProvider";
import Input from "@/components/ui/Input";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

const ArtistWithdrawAmount = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(true)} className="btn-secondary flex gap-1 py-3">
        <ArrowUpRight className="h-4 w-4" /> Withdraw
      </button>

      {isOpen && (
        <DialogProvider state={isOpen} setState={setIsOpen}>
          <div className="p-6 space-y-4 bg-white/10 backdrop-blur-2xl rounded-[8px] w-full">
            <h3 className="text-lg font-semibold">Withdraw Amount</h3>
            <p className="text-sm text-muted">
              Are you sure you want to withdraw this amount?
            </p>

            <Input name="amount" placeholder="Amount" type="number" />

            <div className="flex justify-end gap-2">
              <button onClick={() => setIsOpen(false)} className="btn cursor-pointer">
                Cancel
              </button>
              <button className="btn-secondary px-4 py-2 rounded-lg">Withdraw</button>
            </div>
          </div>
        </DialogProvider>
      )}
    </div>
  );
};

export default ArtistWithdrawAmount;
