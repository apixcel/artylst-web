import { Plus, Trash2, Info } from "lucide-react";

const TierCard = ({
  title,
  songs,
  price,
}: {
  title: string;
  songs: string;
  price: string;
}) => (
  <div className="rounded-2xl p-6 border border-white/10 bg-white/5 space-y-3">
    <div className="font-heading flex items-center justify-between">{title}</div>
    <div>
      <label className="text-sm text-white/60">Songs</label>
      <input
        className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 mt-1"
        defaultValue={songs}
      />
    </div>
    <div>
      <label className="text-sm text-white/60">Price</label>
      <input
        className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 mt-1"
        defaultValue={price}
      />
    </div>
    <div>
      <label className="text-sm text-white/60">Delivery time</label>
      <input
        className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 mt-1"
        placeholder="e.g. 3-5 days"
      />
    </div>
    <div>
      <label className="text-sm text-white/60">Description</label>
      <textarea
        rows={2}
        className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 mt-1"
        placeholder="Perfect for a quick workout vibe..."
      />
    </div>
    <div>
      <label className="text-sm text-white/60">Revision policy</label>
      <input
        className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 mt-1"
        placeholder="1 revision included"
      />
    </div>
  </div>
);

const ArtistTiersPage = () => {
  return (
    <section className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bricolage-grotesque">Pricing Tiers</h1>
        <p className="text-muted text-sm mt-1">
          Fans choose between tiers when commissioning a playlist
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <TierCard title="Mini" songs="10 songs" price="$49" />
        <TierCard title="Standard" songs="20 songs" price="$89" />
        <TierCard title="Deep Dive" songs="40 songs" price="$159" />
      </div>

      {/* Preview & reminder */}
      <div className="rounded-2xl p-6 border border-white/10 bg-white/5">
        <div className="font-heading mb-3">Preview (public)</div>
        <div className="grid sm:grid-cols-3 gap-4 text-sm">
          <div className="p-4 rounded-xl border border-white/10 bg-white/5">
            <div className="font-medium">Mini</div>
            <p className="text-white/60">10 songs • $49</p>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-white/5">
            <div className="font-medium">Standard</div>
            <p className="text-white/60">20 songs • $89</p>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-white/5">
            <div className="font-medium">Deep Dive</div>
            <p className="text-white/60">40 songs • $159</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/60 mt-4">
          <Info className="h-3 w-3" /> Artylst takes a 20% service fee on each
          transaction.
        </div>
      </div>
    </section>
  );
};

export default ArtistTiersPage;
