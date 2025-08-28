"use client";

import { useState } from "react";
import Image from "next/image";
import { GoogleIcon } from "@/icons";

const ProfileSettings = () => {
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [isCompanyNameEditing, setIsCompanyNameEditing] = useState(false);
  const [isEmailEditing, setIsEmailEditing] = useState(false);
  return (
    <div>
      {/* profile photo */}
      <div className="border-b border-white/10 pb-4 mb-4">
        <h3 className="font-bricolage-grotesque">Profile Photo</h3>

        <div className="flex items-center justify-between gap-4 mt-4">
          {/* avatar */}
          <div className="w-20 h-20 rounded-full bg-white/10 border border-white/10 overflow-hidden">
            <Image
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="avatar"
              width={80}
              height={80}
            />
          </div>

          {/* remove and change photo */}
          <div className="flex gap-2 items-center">
            <button className="btn hover:text-muted">Remove Photo</button>
            <button className="btn btn-sm btn-primary">Change Photo</button>
          </div>
        </div>
      </div>

      {/* name and company name */}
      <div className="flex flex-col gap-4 border-b border-white/10 pb-4 mb-4">
        {/* name */}
        <div className="flex justify-between items-start gap-10">
          <div className="flex flex-col gap-2 flex-1">
            <h3 className="font-bricolage-grotesque">Name</h3>
            {isNameEditing ? (
              <input
                className="w-full bg-white/10 rounded-lg px-3 py-2"
                placeholder="Full name"
              />
            ) : (
              <p className="text-sm text-muted">Aida Kirakosyan</p>
            )}
          </div>

          <button
            className="btn btn-primary"
            onClick={() => setIsNameEditing(!isNameEditing)}
          >
            {isNameEditing ? "Save" : "Edit"}
          </button>
        </div>

        {/* company name */}
        <div className="flex justify-between items-start gap-10">
          <div className="flex flex-col gap-2 flex-1">
            <h3 className="font-bricolage-grotesque">Company Name</h3>
            {isCompanyNameEditing ? (
              <input
                className="w-full bg-white/10 rounded-lg px-3 py-2"
                placeholder="Company name"
              />
            ) : (
              <p className="text-sm text-muted">Aida Kirakosyan Company</p>
            )}
          </div>

          <button
            className="btn btn-primary"
            onClick={() => setIsCompanyNameEditing(!isCompanyNameEditing)}
          >
            {isCompanyNameEditing ? "Save" : "Edit"}
          </button>
        </div>
      </div>

      {/* email and integrated platforms */}
      <div className="flex flex-col gap-6">
        {/* email */}
        <div className="flex justify-between items-start gap-10">
          <div className="flex flex-col gap-2 flex-1">
            <h3 className="font-bricolage-grotesque">Email</h3>
            {isEmailEditing ? (
              <input
                className="w-full bg-white/10 rounded-lg px-3 py-2"
                placeholder="Email"
              />
            ) : (
              <p className="text-sm text-muted">aida@gmail.com</p>
            )}
          </div>

          <button
            className="btn btn-primary"
            onClick={() => setIsEmailEditing(!isEmailEditing)}
          >
            {isEmailEditing ? "Save" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
