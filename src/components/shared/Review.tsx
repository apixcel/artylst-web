import { IReview } from "@/interface";
import Image from "next/image";

const Review = ({ review }: { review: IReview }) => {
  return (
    <div className="card p-4">
      <div className="flex items-center gap-3">
        {
          <>
            {review.image ? (
              <Image
                src={review.image}
                alt={review.name}
                width={50}
                height={50}
                className="rounded-full object-cover w-[40px] h-[40px]"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-white/10 border border-white/10 grid place-items-center text-xs">
                IMG
              </div>
            )}
          </>
        }
        <div>
          <div className="text-sm">
            {review.name}{" "}
            <span className="px-[4px] inline-block border-greeniest text-[10px] ml-1 text-greeniest border rounded-3xl">
              Verified
            </span>
          </div>
          <div className="text-xs text-white/60">★ ★ ★ ★ ★</div>
        </div>
      </div>
      <p className="text-muted font-heading mt-3 line-clamp-4">{review.review}</p>
    </div>
  );
};

export default Review;
