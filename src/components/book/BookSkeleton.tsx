export default function BookSkeleton() {
  return (
    <div>
      <div className="flex items-center justify-center space-x-10 mb-6">
        <div className="flex items-center space-x-2 font-bold">
          <span className="w-6 h-6 flex items-center justify-center rounded-full border border-white/30">
            1
          </span>
          <span>Brief</span>
        </div>

        <div className="flex items-center space-x-2 opacity-50">
          <span className="w-6 h-6 flex items-center justify-center rounded-full border border-white/30">
            2
          </span>
          <span>Add-ons</span>
        </div>

        <div className="flex items-center space-x-2 opacity-50">
          <span className="w-6 h-6 flex items-center justify-center rounded-full border border-white/30">
            3
          </span>
          <span>Pay</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-white/20"></div>
              <div>
                <h2 className="font-semibold">Artist Name</h2>
                <p className="text-xs text-gray-400">⭐ 4.9 (12k)</p>
              </div>
            </div>
            <a href="#" className="text-sm text-green-400 hover:underline">
              View profile
            </a>
          </div>

          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <h3 className="font-semibold mb-4">Your Brief</h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400">Preferred platform</label>
                <select className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2">
                  <option>Spotify</option>
                  <option>Apple Music</option>
                  <option>YouTube Music</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-400">Delivery window</label>
                <select className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2">
                  <option>24h</option>
                  <option>48h</option>
                  <option>72h</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm text-gray-400">Personal note to artist</label>
              <textarea
                className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2 h-28"
                placeholder="Tell the artist about your vibe..."
              ></textarea>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <button className="px-4 py-2 rounded-lg bg-white/10">Back</button>
            <button className="px-6 py-2 rounded-lg bg-green-500 text-black font-semibold">
              Next
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <h3 className="w-">Order Summary</h3>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>Service tier</span>
                <span>$25</span>
              </div>
              <div className="flex justify-between">
                <span>Add-ons</span>
                <span>$0</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Subtotal</span>
                <span>$2500</span>
              </div>
              <div className="flex justify-between">
                <span>Service fee (20%)</span>
                <span>$500</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-2">
                <span>Total</span>
                <span>$3000</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Payment is held in escrow and released on delivery.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-sm">
            <h3 className="font-semibold mb-3">What you’ll receive</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>Private playlist link (Spotify/Apple/YTM)</li>
              <li>30s authentication video</li>
              <li>Privacy-first delivery via platform</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
