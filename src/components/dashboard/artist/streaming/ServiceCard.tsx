"use client";

import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";

interface Props {
  name: string;
  desc: string;
  status: "connected" | "not";
  actionLabel: string;
  primary?: boolean;
  onAction: () => void;
}

const ServiceCard: React.FC<Props> = ({
  name,
  desc,
  status,
  actionLabel,
  primary,
  onAction,
}) => (
  <div className="rounded-2xl p-6 border border-white/10 bg-brand-2/10 space-y-2 backdrop-blur-2xl">
    <div className="flex items-center justify-between">
      <h3>{name}</h3>
      {status === "connected" ? (
        <span className="text-emerald-400 text-xs flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" /> Connected
        </span>
      ) : (
        <span className="text-muted text-xs flex items-center gap-1">
          <XCircle className="h-3 w-3" /> Not connected
        </span>
      )}
    </div>
    <div className="text-sm text-muted">{desc}</div>
    <button
      onClick={onAction}
      className={`mt-3 inline-block px-4 py-2 rounded-lg ${
        status === "connected" ? "btn-tertiary" : "btn-secondary"
      }`}
    >
      {actionLabel}
    </button>
    {primary && (
      <div className="text-xs text-muted mt-1">
        This is your default platform for new orders.
      </div>
    )}
  </div>
);

export default ServiceCard;
