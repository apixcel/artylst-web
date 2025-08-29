import { Artist } from "@/interface";
import { cn } from "@/utils";
import { Headphones, Play, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function Crown({ index }: { index: number }) {
  return (
    <div
      className={cn(
        "flex gap-1 backdrop-blur-sm bg-white/80 rounded-br-2xl rounded-tl-3xl items-center",
        index < 10 ? "py-1 px-3" : "py-2 px-6"
      )}
    >
      {/* left flourish */}
      {index < 10 && (
        <svg width="12" height="29" viewBox="0 0 12 29" fill="none">
          <g clipPath="url(#clip0_3407_52760)">
            <path
              d="M2.35039 6.37703C2.42694 7.69305 3.1498 8.334 3.98018 8.38008C4.01943 8.38251 4.06332 8.34984 4.09208 8.29767C4.70182 7.17791 5.16724 5.91503 5.29645 4.69555C5.42103 3.4868 5.11287 2.57426 4.2898 2.2856C4.25007 2.27195 4.1879 2.29755 4.13207 2.35143C2.97086 3.45267 2.26896 5.07222 2.35039 6.37678V6.37703Z"
              fill="#4D4953"
            ></path>
            <path
              d="M6.68601 5.71277C5.62403 6.08968 4.70539 7.20409 4.40918 8.42503C4.39504 8.48159 4.40601 8.53474 4.43649 8.55912C5.10084 9.08475 6.02069 9.03355 6.91957 8.57887C7.82406 8.11589 8.53986 7.37791 9.06914 6.50999C9.09474 6.46757 9.09669 6.41906 9.07353 6.3859C8.60836 5.71131 7.75312 5.32635 6.68601 5.71277Z"
              fill="#4D4953"
            ></path>
            <path
              d="M7.66623 1.74255C6.42188 2.75968 5.88894 4.12276 6.01449 5.1038C6.01985 5.14988 6.0535 5.1745 6.09885 5.16646C7.08257 4.9858 8.14261 4.41142 9.18192 3.56227C10.2134 2.70848 11.0699 1.725 11.5287 0.759072C11.5504 0.712263 11.5326 0.673499 11.4822 0.660577C10.4577 0.386548 8.90106 0.720552 7.66598 1.74255H7.66623Z"
              fill="#4D4953"
            ></path>
            <path
              d="M0.756129 12.3437C1.2937 13.5317 2.19186 13.8723 2.98493 13.6207C3.02248 13.6092 3.05222 13.5631 3.06076 13.5049C3.23824 12.2517 3.21825 10.9289 2.88668 9.77207C2.55439 8.6267 1.92344 7.90579 1.0599 7.92481C1.01821 7.92602 0.970916 7.9704 0.939709 8.03866C0.287793 9.4366 0.217822 11.1681 0.755885 12.3437H0.756129Z"
              fill="#4D4953"
            ></path>
            <path
              d="M4.54338 10.2199C3.70252 10.9303 3.2476 12.2744 3.39851 13.5109C3.40509 13.5682 3.4341 13.6136 3.47116 13.6255C4.27642 13.8781 5.11972 13.5039 5.79748 12.7678C6.47744 12.0223 6.87727 11.0954 7.0372 10.1253C7.04475 10.078 7.02842 10.0332 6.99453 10.0112C6.31214 9.55849 5.38571 9.49949 4.54314 10.2199H4.54338Z"
              fill="#4D4953"
            ></path>
            <path
              d="M1.3426 18.4711C2.26124 19.3971 3.22375 19.399 3.87664 18.878C3.90761 18.8536 3.91931 18.7998 3.90663 18.7417C3.63089 17.4964 3.15549 16.2638 2.44286 15.3034C1.7339 14.3541 0.890601 13.9101 0.0899666 14.2332C0.0514464 14.249 0.0226782 14.307 0.0173146 14.3814C-0.104828 15.9105 0.427871 17.5571 1.34285 18.4709L1.3426 18.4711Z"
              fill="#4D4953"
            ></path>
            <path
              d="M4.15098 15.1313C3.61097 16.0919 3.64949 17.5137 4.2268 18.6262C4.25313 18.6778 4.29629 18.7103 4.33529 18.7083C5.17811 18.6593 5.83392 18.0045 6.21084 17.07C6.58628 16.126 6.6409 15.1155 6.45195 14.1581C6.44269 14.1113 6.41124 14.0757 6.37223 14.0671C5.57525 13.8889 4.68905 14.1608 4.15098 15.1316V15.1313Z"
              fill="#4D4953"
            ></path>
            <path
              d="M4.11694 24.0622C5.33666 24.6171 6.25213 24.2777 6.66171 23.5487C6.68121 23.5146 6.67121 23.459 6.63635 23.4081C5.88643 22.3183 4.9851 21.316 3.97115 20.6612C2.96499 20.0154 2.021 19.8981 1.38591 20.4888C1.35543 20.5176 1.3491 20.5827 1.37055 20.6549C1.79915 22.143 2.90477 23.5173 4.11669 24.0622H4.11694Z"
              fill="#4D4953"
            ></path>
            <path
              d="M5.50769 19.8885C5.34873 20.9907 5.90995 22.3279 6.8927 23.1839C6.93781 23.2239 6.99144 23.2395 7.02728 23.2236C7.80475 22.8777 8.16168 22.0193 8.15802 20.9951C8.14924 19.9626 7.82889 18.9832 7.31179 18.146C7.28644 18.1053 7.24451 18.0827 7.20477 18.0888C6.39658 18.2053 5.66128 18.7775 5.50769 19.8885Z"
              fill="#4D4953"
            ></path>
            <path
              d="M9.07967 28.4212C10.5208 28.5219 11.278 27.8742 11.3411 27.0309C11.3446 26.9911 11.309 26.9416 11.2512 26.9051C10.0066 26.1251 8.70837 25.4844 7.47329 25.218C6.25015 24.9573 5.31616 25.1814 4.94949 25.9708C4.93218 26.0091 4.95217 26.0735 5.00166 26.1347C6.00147 27.4031 7.65053 28.3274 9.07992 28.4212H9.07967Z"
              fill="#4D4953"
            ></path>
            <path
              d="M8.6163 23.9344C8.91788 25.0442 10.0318 26.1257 11.399 26.5994C11.4622 26.6218 11.5221 26.6179 11.5502 26.5901C12.1592 25.9843 12.1063 25.0354 11.6416 24.0556C11.1686 23.0696 10.4441 22.2456 9.61953 21.63C9.57906 21.6 9.53055 21.5934 9.4952 21.6132C8.77867 22.0116 8.30546 22.8183 8.61606 23.9344H8.6163Z"
              fill="#4D4953"
            ></path>
          </g>
          <defs>
            <clipPath id="clip0_3407_52760">
              <rect
                width="12"
                height="27.863"
                fill="white"
                transform="translate(0 0.568481)"
              ></rect>
            </clipPath>
          </defs>
        </svg>
      )}

      <p className="text-black font-bold text-[20px] leading-none">{index + 1}</p>

      {/* right flourish (mirrored) */}
      {index < 10 && (
        <div className="-scale-x-100">
          <svg width="12" height="29" viewBox="0 0 12 29" fill="none">
            <g clipPath="url(#clip0_3407_52760)">
              <path
                d="M2.35039 6.37703C2.42694 7.69305 3.1498 8.334 3.98018 8.38008C4.01943 8.38251 4.06332 8.34984 4.09208 8.29767C4.70182 7.17791 5.16724 5.91503 5.29645 4.69555C5.42103 3.4868 5.11287 2.57426 4.2898 2.2856C4.25007 2.27195 4.1879 2.29755 4.13207 2.35143C2.97086 3.45267 2.26896 5.07222 2.35039 6.37678V6.37703Z"
                fill="#4D4953"
              ></path>
              <path
                d="M6.68601 5.71277C5.62403 6.08968 4.70539 7.20409 4.40918 8.42503C4.39504 8.48159 4.40601 8.53474 4.43649 8.55912C5.10084 9.08475 6.02069 9.03355 6.91957 8.57887C7.82406 8.11589 8.53986 7.37791 9.06914 6.50999C9.09474 6.46757 9.09669 6.41906 9.07353 6.3859C8.60836 5.71131 7.75312 5.32635 6.68601 5.71277Z"
                fill="#4D4953"
              ></path>
              <path
                d="M7.66623 1.74255C6.42188 2.75968 5.88894 4.12276 6.01449 5.1038C6.01985 5.14988 6.0535 5.1745 6.09885 5.16646C7.08257 4.9858 8.14261 4.41142 9.18192 3.56227C10.2134 2.70848 11.0699 1.725 11.5287 0.759072C11.5504 0.712263 11.5326 0.673499 11.4822 0.660577C10.4577 0.386548 8.90106 0.720552 7.66598 1.74255H7.66623Z"
                fill="#4D4953"
              ></path>
              <path
                d="M0.756129 12.3437C1.2937 13.5317 2.19186 13.8723 2.98493 13.6207C3.02248 13.6092 3.05222 13.5631 3.06076 13.5049C3.23824 12.2517 3.21825 10.9289 2.88668 9.77207C2.55439 8.6267 1.92344 7.90579 1.0599 7.92481C1.01821 7.92602 0.970916 7.9704 0.939709 8.03866C0.287793 9.4366 0.217822 11.1681 0.755885 12.3437H0.756129Z"
                fill="#4D4953"
              ></path>
              <path
                d="M4.54338 10.2199C3.70252 10.9303 3.2476 12.2744 3.39851 13.5109C3.40509 13.5682 3.4341 13.6136 3.47116 13.6255C4.27642 13.8781 5.11972 13.5039 5.79748 12.7678C6.47744 12.0223 6.87727 11.0954 7.0372 10.1253C7.04475 10.078 7.02842 10.0332 6.99453 10.0112C6.31214 9.55849 5.38571 9.49949 4.54314 10.2199H4.54338Z"
                fill="#4D4953"
              ></path>
              <path
                d="M1.3426 18.4711C2.26124 19.3971 3.22375 19.399 3.87664 18.878C3.90761 18.8536 3.91931 18.7998 3.90663 18.7417C3.63089 17.4964 3.15549 16.2638 2.44286 15.3034C1.7339 14.3541 0.890601 13.9101 0.0899666 14.2332C0.0514464 14.249 0.0226782 14.307 0.0173146 14.3814C-0.104828 15.9105 0.427871 17.5571 1.34285 18.4709L1.3426 18.4711Z"
                fill="#4D4953"
              ></path>
              <path
                d="M4.15098 15.1313C3.61097 16.0919 3.64949 17.5137 4.2268 18.6262C4.25313 18.6778 4.29629 18.7103 4.33529 18.7083C5.17811 18.6593 5.83392 18.0045 6.21084 17.07C6.58628 16.126 6.6409 15.1155 6.45195 14.1581C6.44269 14.1113 6.41124 14.0757 6.37223 14.0671C5.57525 13.8889 4.68905 14.1608 4.15098 15.1316V15.1313Z"
                fill="#4D4953"
              ></path>
              <path
                d="M4.11694 24.0622C5.33666 24.6171 6.25213 24.2777 6.66171 23.5487C6.68121 23.5146 6.67121 23.459 6.63635 23.4081C5.88643 22.3183 4.9851 21.316 3.97115 20.6612C2.96499 20.0154 2.021 19.8981 1.38591 20.4888C1.35543 20.5176 1.3491 20.5827 1.37055 20.6549C1.79915 22.143 2.90477 23.5173 4.11669 24.0622H4.11694Z"
                fill="#4D4953"
              ></path>
              <path
                d="M5.50769 19.8885C5.34873 20.9907 5.90995 22.3279 6.8927 23.1839C6.93781 23.2239 6.99144 23.2395 7.02728 23.2236C7.80475 22.8777 8.16168 22.0193 8.15802 20.9951C8.14924 19.9626 7.82889 18.9832 7.31179 18.146C7.28644 18.1053 7.24451 18.0827 7.20477 18.0888C6.39658 18.2053 5.66128 18.7775 5.50769 19.8885Z"
                fill="#4D4953"
              ></path>
              <path
                d="M9.07967 28.4212C10.5208 28.5219 11.278 27.8742 11.3411 27.0309C11.3446 26.9911 11.309 26.9416 11.2512 26.9051C10.0066 26.1251 8.70837 25.4844 7.47329 25.218C6.25015 24.9573 5.31616 25.1814 4.94949 25.9708C4.93218 26.0091 4.95217 26.0735 5.00166 26.1347C6.00147 27.4031 7.65053 28.3274 9.07992 28.4212H9.07967Z"
                fill="#4D4953"
              ></path>
              <path
                d="M8.6163 23.9344C8.91788 25.0442 10.0318 26.1257 11.399 26.5994C11.4622 26.6218 11.5221 26.6179 11.5502 26.5901C12.1592 25.9843 12.1063 25.0354 11.6416 24.0556C11.1686 23.0696 10.4441 22.2456 9.61953 21.63C9.57906 21.6 9.53055 21.5934 9.4952 21.6132C8.77867 22.0116 8.30546 22.8183 8.61606 23.9344H8.6163Z"
                fill="#4D4953"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_3407_52760">
                <rect
                  width="12"
                  height="27.863"
                  fill="white"
                  transform="translate(0 0.568481)"
                ></rect>
              </clipPath>
            </defs>
          </svg>
        </div>
      )}
    </div>
  );
}

const ArtistCard = ({
  item,
  index,
  variant = "default",
  view = "grid",
}: {
  item: Artist;
  index: number;
  variant?: "default" | "home";
  view?: "grid" | "list";
}) => {
  const isDefault = variant === "default";

  if (view === "list") {
    // horizontal / list layout
    return (
      <div className="w-full rounded-2xl bg-black/30 backdrop-blur-sm p-4 flex gap-4 items-stretch">
        {/* image */}
        <div className="relative shrink-0">
          <Image
            src={item.image}
            alt={item.name}
            width={120}
            height={120}
            className="size-[96px] sm:size-[120px] object-cover rounded-xl"
          />
          {!isDefault && (
            <div className="absolute -top-2 -left-2">
              <Crown index={index} />
            </div>
          )}
        </div>

        {/* middle content */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-[16px] font-bold leading-tight uppercase font-bricolage-grotesque truncate">
              {item.name}
            </p>
            <span className="text-sm text-muted">· {item.designation}</span>
          </div>

          <div className="mt-2 flex items-center gap-2 flex-wrap">
            {item.tags.map((tag, i) => (
              <span
                key={i}
                className="text-[12px] text-muted/80 bg-white/10 rounded-full px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1">
              <Star className="w-[14px] h-[14px]" />
              <p className="text-sm">{item.rating}</p>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm text-greeniest">{item.eta}h</span>
              <span className="text-sm text-muted/80">{item.slotsLeft} slots left</span>
            </div>
          </div>
        </div>

        {/* right actions */}
        <div className="shrink-0 w-full sm:w-60 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[4px] font-[500]">
              <p className={cn("text-light", item.oldPrice && "text-greeniest")}>
                ${item.price} {!item.oldPrice && "+"}
              </p>
              {item.oldPrice && (
                <p className="text-muted line-through">${item.oldPrice}+</p>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Headphones className="w-4 h-4" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M17.05 20.28c-.98.95-2.05.8-3.08.35c-1.09-.46-2.09-.48-3.24 0c-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8c1.18-.24 2.31-.93 3.57-.84c1.51.12 2.65.72 3.4 1.8c-3.12 1.87-2.38 5.98.48 7.13c-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25c.29 2.58-2.34 4.5-3.74 4.25"
                />
              </svg>
              <Play className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-3 flex flex-col gap-2">
            <Link href={`/artists/${item.id}`} className="btn btn-primary">
              Request playlist
            </Link>
            <Link href={`/artists/${item.id}`} className="btn btn-ghost">
              Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-transparent relative rounded-2xl flex flex-col justify-between h-full">
      {/* image */}
      <div className="relative">
        <Image
          src={item.image}
          alt={item.name}
          width={500}
          height={500}
          className="h-full w-full object-cover rounded-t-3xl"
        />

        {/* header */}
        <div className="absolute top-0 left-0 right-0 flex justify-between z-20">
          {/* crown */}
          {!isDefault && <Crown index={index} />}
        </div>
      </div>

      {/* text / footer */}
      <div className="relative">
        <div className="px-4 py-3 text-center space-y-1">
          <p className="text-[16px] font-bold leading-[0.85] uppercase font-bricolage-grotesque">
            {item.name}
          </p>
          <p className="text-sm text-muted">{item.designation}</p>
        </div>

        <div className="flex flex-col gap-3 mb-2 px-2">
          <div className="flex items-center gap-2 flex-wrap">
            {item.tags.map((tag, index) => (
              <span
                key={index}
                className="text-[12px] text-muted/80 bg-white/10 rounded-full px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center gap-1">
              <Star className="w-[14px] h-[14px]" />
              <p className="text-sm">{item.rating}</p>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-sm text-greeniest">{item.eta}h</span>
              <span className="text-sm text-muted/80">{item.slotsLeft} slots left</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between bg-black/40 backdrop-blur-sm">
          <div className="flex items-center justify-between w-full py-4 px-5">
            <div className="flex items-center gap-[4px] font-[500]">
              <p className={cn("text-light", item.oldPrice && "text-greeniest")}>
                ${item.price} {!item.oldPrice && "+"}
              </p>
              {item.oldPrice && (
                <p className="text-muted line-through">${item.oldPrice}+</p>
              )}
            </div>

            <div className="flex items-center gap-1">
              <div>
                <Headphones className="w-4 h-4" />
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M17.05 20.28c-.98.95-2.05.8-3.08.35c-1.09-.46-2.09-.48-3.24 0c-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8c1.18-.24 2.31-.93 3.57-.84c1.51.12 2.65.72 3.4 1.8c-3.12 1.87-2.38 5.98.48 7.13c-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25c.29 2.58-2.34 4.5-3.74 4.25"
                  ></path>
                </svg>
              </div>
              <div>
                <Play className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="mb-4 w-full sm:w-auto sm:justify-start justify-center flex sm:flex-row flex-col gap-2 sm:px-0 px-3">
            <Link
              href="/artists/122323"
              className="text-center sm:text-left px-2 py-1 rounded btn-primary"
            >
              Request playlist
            </Link>
            <Link
              href="/artists/122323"
              className="text-center sm:text-left px-2 py-1 rounded btn-ghost"
            >
              Profile
            </Link>
          </div>
        </div>
        {/* soft glows */}
        <div className="h-3/4 absolute bottom-0 left-0 right-0 -z-10">
          <div className="absolute top-2 bottom-0 -left-24 w-40 h-36 blur-2xl bg-neutral-400/40" />
          <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-full w-full h-full blur-2xl bg-neutral-400/40" />
          <div className="absolute top-2 bottom-0 -right-24 w-40 h-36 blur-2xl bg-neutral-400/40" />
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
