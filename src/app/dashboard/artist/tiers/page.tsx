import { TiersPricingForm } from "@/components";
import { Info } from "lucide-react";

const ArtistTiersPage = () => {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bricolage-grotesque">Pricing Tiers</h1>
        <p className="text-muted text-sm mt-1">
          Fans choose between tiers when commissioning a playlist
        </p>
      </div>

      <TiersPricingForm />

      {/* Preview & reminder */}
      <div className="rounded-2xl p-6 border border-white/10 bg-gradient-to-b from-brand-4/8 to-brand-1/10 backdrop-blur-2xl">
        <h3 className="font-bricolage-grotesque mb-3">Preview (public)</h3>
        <div className="grid sm:grid-cols-3 gap-4 text-sm">
          <div className="p-4 rounded-xl border border-white/10 bg-white/5">
            <h4 className="font-medium text-base mb-1">Mini</h4>
            <p className="text-muted">10 songs • $49</p>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-white/5">
            <h4 className="font-medium text-base mb-1">Standard</h4>
            <p className="text-muted">20 songs • $89</p>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-white/5">
            <h4 className="font-medium text-base mb-1">Deep Dive</h4>
            <p className="text-muted">40 songs • $159</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted mt-4">
          <Info className="h-3 w-3" /> Artylst takes a 20% service fee on each
          transaction.
        </div>
      </div>
    </section>
  );
};

export default ArtistTiersPage;
