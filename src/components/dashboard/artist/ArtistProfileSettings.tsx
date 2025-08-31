import Image from "next/image";

const ArtistProfileSettings = () => {
  return (
    <div>
      {/* profile photo */}
      <div className="border-b border-white/10 pb-4 mb-4">
        <h3 className="font-bricolage-grotesque">Profile Photo</h3>

        <div className="flex items-center justify-between gap-4 mt-4 flex-col sm:flex-row">
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
            <div className="flex items-center gap-4 justify-between">
              <input
                className="w-full bg-white/10 rounded-lg px-3 py-2"
                placeholder="Full name"
                readOnly
                value={"Aida Kirakosyan"}
              />
              <button className="btn btn-primary">Edit</button>
            </div>
          </div>
        </div>

        {/* company name */}
        <div className="flex justify-between items-start gap-10">
          <div className="flex flex-col gap-2 flex-1">
            <h3 className="font-bricolage-grotesque">Company Name</h3>
            <div className="flex items-center gap-4 justify-between w-full">
              <input
                className="w-full bg-white/10 rounded-lg px-3 py-2"
                placeholder="Company name"
                value={"Aida Kirakosyan Company"}
                readOnly
              />
              <button className="btn btn-primary">Edit</button>
            </div>
          </div>
        </div>

        {/* email */}
        <div className="flex justify-between items-start gap-10">
          <div className="flex flex-col gap-2 flex-1">
            <h3 className="font-bricolage-grotesque">Email</h3>
            <div className="flex items-center gap-4 justify-between w-full">
              <input
                className="w-full bg-white/10 rounded-lg px-3 py-2"
                placeholder="Email"
                value={"aida@gmail.com"}
                readOnly
              />
              <button className="btn btn-primary">Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfileSettings;
