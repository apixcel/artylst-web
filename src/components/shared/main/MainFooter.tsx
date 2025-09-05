import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { footerLinks } from "@/constants";
import { EmailIcon, FacebookIcon, InstagramIcon, TiktokIcon, TwitterIcon } from "@/icons";

const MainFooter = () => {
  return (
    <footer className="border-t border-gray-55">
      <div className="max-w-[1280px] mx-auto w-full desktop:px-0 px-[20px] py-[32px]">
        <div className="flex md:flex-row flex-col justify-between gap-[40px] md:gap-[20px] lg:gap-[80px] xl:gap-[40px]">
          {/* form */}
          <div className="md:max-w-[360px] lg:max-w-[420px] w-full">
            <Image
              src="/images/logo/logo-white.png"
              alt="logo"
              width={100}
              height={100}
              className="w-[70px] h-[75px] mb-[20px]"
            />

            <div className="mb-[20px]">
              <h2 className="mb-[8px]">Join our mailing list</h2>
              <p className="text-muted font-logam">
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
                {/* App Store */}
                <a
                  href="https://www.apple.com/app-store"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/images/footer/app-store.svg"
                    alt="apple"
                    width={150}
                    height={50}
                  />
                </a>

                {/* Google Play Store */}
                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/images/footer/play-store.svg"
                    alt="google"
                    width={150}
                    height={50}
                  />
                </a>
              </div>

              <div className="flex gap-[16px] xl:gap-[8px] items-center">
                {/* instagram */}
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                >
                  <InstagramIcon />
                </Link>

                {/* tiktok */}
                <Link
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                >
                  <TiktokIcon />
                </Link>

                {/* twitter */}
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                >
                  <TwitterIcon />
                </Link>

                {/* facebook */}
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                >
                  <FacebookIcon />
                </Link>

                {/* email */}
                <Link href="mailto:example@email.com" className="footer-social-link">
                  <EmailIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* bottom */}
      <div className="py-[40px] border-t border-gray-55">
        <div className="max-w-[1280px] mx-auto w-full desktop:px-0 px-[20px] flex lg:flex-row flex-col gap-6 lg:gap-[4px] justify-center items-center">
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
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
