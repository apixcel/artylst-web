import Skeleton from "@/components/ui/Skeleton";

const BusinessProfileSettingsSkeleton = () => {
  return (
    <div>
      {/* profile photo */}
      <div className="border-b border-white/10 pb-4 mb-4">
        <h3 className="mb-4">Profile Photo</h3>

        <div className="flex items-center justify-between gap-4 flex-col sm:flex-row">
          {/* avatar */}
          <Skeleton className="w-20 h-20 rounded-full" />

          {/* remove and change photo */}
          <div className="flex gap-2 items-center mt-4 sm:mt-0">
            <Skeleton className="h-9 w-28 rounded-lg" />
            <Skeleton className="h-9 w-32 rounded-lg" />
          </div>
        </div>
      </div>

      {/* name and company name */}
      <div className="flex flex-col gap-4 border-b border-white/10 pb-4 mb-4">
        {["Name", "Company Name", "Email"].map((label, i) => (
          <div key={i} className="flex justify-between items-start gap-10">
            <div className="flex flex-col gap-2 flex-1 w-full">
              <h3>{label}</h3>
              <div className="flex items-center gap-4 justify-between w-full">
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-9 w-20 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessProfileSettingsSkeleton;
