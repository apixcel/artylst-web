import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { footerLinks } from "@/constants";
import { TiktokIcon, TwitterIcon } from "@/icons";

const MainFooter = () => {
  return (
    <footer className="border-t border-gray-55">
      <div className="max-w-[1280px] mx-auto w-full desktop:px-0 px-[20px] py-[32px]">
        <div className="flex md:flex-row flex-col justify-between gap-[40px] lg:gap-[80px] xl:gap-[40px]">
          {/* form */}
          <div className="lg:max-w-[420px] w-full">
            <Image
              src="/images/logo/logo-white.png"
              alt="logo"
              width={100}
              height={100}
              className="w-[80px] h-[80px] mb-[20px]"
            />

            <div className="mb-[20px]">
              <h2 className="mb-[8px]">Join our mailing list</h2>
              <p className="text-muted">
                Be the first to know about the newest artists and best deals on Artylist
              </p>
            </div>

            <form>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full h-[52px] rounded-[16px] border border-fog-transparent-24 p-[16px] text-regular-400"
                />
                <button
                  type="submit"
                  className="absolute right-[10px] top-1/2 -translate-y-1/2 rounded-full bg-brand-4/80 flex-center w-[36px] h-[36px]"
                >
                  <ArrowRightIcon className="w-5  h-5 text-white" />
                </button>
              </div>
              <p className="text-muted mt-2">
                Emails subject to{" "}
                <Link href="/privacy-policy" className="text-light">
                  privacy policy
                </Link>
              </p>
            </form>
          </div>

          {/* navigation */}
          <div className="lg:w-auto md:w-1/2 w-full ml-auto flex flex-col gap-[36px]">
            <div className="flex gap-[40px] lg:gap-[96px]">
              {footerLinks.map((link) => (
                <div key={link.title} className="flex flex-col gap-[16px]">
                  <h3 className="text-regular-500">{link.title}</h3>
                  <ul className="flex flex-col gap-[16px]">
                    {link.links.map((item) => (
                      <li key={item.title}>
                        <Link
                          className="text-muted hover:text-light text-[16px]"
                          href={item.route}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* store and social links */}
            <div className="flex xl:flex-row flex-col gap-[16px] xl:items-center">
              <div className="flex gap-[16px] items-center">
                <Link href="#">
                  <Image
                    src="/images/footer/app-store.svg"
                    alt="apple"
                    width={150}
                    height={50}
                  />
                </Link>
                <Link href="#">
                  <Image
                    src="/images/footer/play-store.svg"
                    alt="google"
                    width={150}
                    height={50}
                  />
                </Link>
              </div>

              <div className="flex gap-[16px] xl:gap-[8px] items-center">
                {/* instagram */}
                <Link href="#" className="footer-social-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                  >
                    <g fill="none">
                      <rect
                        width={17}
                        height={17}
                        x={3.5}
                        y={3.5}
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        rx={5.5}
                      ></rect>
                      <circle
                        cx={12}
                        cy={12}
                        r={3.606}
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                      ></circle>
                      <circle
                        cx={16.894}
                        cy={7.106}
                        r={1.03}
                        fill="currentColor"
                      ></circle>
                    </g>
                  </svg>
                </Link>
                {/* tiktok */}
                <Link href="#" className="footer-social-link">
                  <TiktokIcon />
                </Link>

                {/* twitter */}
                <Link href="#" className="footer-social-link">
                  <TwitterIcon />
                </Link>
                {/* facebook */}
                <Link href="#" className="footer-social-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" fillRule="evenodd">
                      <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                      <path
                        fill="currentColor"
                        d="M4 12a8 8 0 1 1 9 7.938V14h2a1 1 0 1 0 0-2h-2v-2a1 1 0 0 1 1-1h.5a1 1 0 1 0 0-2H14a3 3 0 0 0-3 3v2H9a1 1 0 1 0 0 2h2v5.938A8 8 0 0 1 4 12m8 10c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10"
                      ></path>
                    </g>
                  </svg>
                </Link>
                {/* email */}
                <Link href="#" className="footer-social-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 36 36"
                  >
                    <path
                      fill="currentColor"
                      d="M32 6H4a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2m-1.54 22H5.66l7-7.24l-1.44-1.39L4 26.84V9.52l12.43 12.37a2 2 0 0 0 2.82 0L32 9.21v17.5l-7.36-7.36l-1.41 1.41ZM5.31 8h25.07L17.84 20.47Z"
                      className="clr-i-outline clr-i-outline-path-1"
                    ></path>
                    <path fill="none" d="M0 0h36v36H0z"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* bottom */}
      <div className="py-[40px] border-t border-gray-55">
        <div className="max-w-[1280px] mx-auto w-full desktop:px-0 px-[20px] flex lg:flex-row flex-col gap-6 lg:gap-[4px] justify-between items-center">
          <div className="flex lg:flex-row flex-col gap-[4px] items-center">
            <p>© {new Date().getFullYear()}, Artylist</p>
            <span className="lg:block hidden">•</span>
            <div className="flex items-center gap-[4px]">
              <p>Your Privacy Choices</p>
              <Image
                src="/images/footer/privacyoptions-icon.png"
                alt="privacy"
                width={32}
                height={20}
              />
              <span className="mx-[4px]">•</span>
              <Link href="/terms-of-service">Terms</Link>
              <span className="">•</span>
              <Link href="/privacy-policy">Privacy</Link>
            </div>
          </div>
          <button className="sm:w-auto w-full rounded-[100px] border border-fog-transparent-24 sm:justify-start justify-center flex gap-[4px] items-center py-[8px] px-[16px]">
            EN<span>|</span>Bangladesh<span>|</span>Tk BDT
          </button>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
