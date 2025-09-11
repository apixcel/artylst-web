import { ContactSalesForm } from "@/components";
import { Check, Headset, Shield, Users, Music, RefreshCw } from "lucide-react";

const ContactSalesView = () => {
  return (
    <section className="flex flex-col h-full">
      {/* wrapper */}
      <div className="max-w-[1280px] w-full px-4 md:px-8 mx-auto flex gap-10">
        {/* left side */}
        <div className="lg:flex hidden w-[40%] flex-col relative">
          <div className="flex-center h-[50%] xl:h-[80%]">
            <div className="xl:max-w-[500px] max-w-[470px]">
              <h1 className="text-[44px] leading-[50px] mb-[20px]">
                Looking for more features?
              </h1>
              <p className="text-muted text-[16px] mb-[20px]">
                We&apos;re here to help you get the most out of your playlist.
              </p>

              <ul className="text-[16px] space-y-2">
                <li className="flex gap-2">
                  <Music className="w-5 h-5 mt-[2px]" /> Curated for restaurants, cafés &
                  events
                </li>
                <li className="flex gap-2">
                  <Users className="w-5 h-5 mt-[2px]" /> Enhance your customer experience
                </li>
                <li className="flex gap-2">
                  <Shield className="w-5 h-5 mt-[2px]" /> Licensed & ready for commercial
                  use
                </li>
                <li className="flex gap-2">
                  <Check className="w-5 h-5 mt-[2px]" /> Flexible subscription plans
                  tailored to your needs
                </li>
                <li className="flex gap-2">
                  <Headset className="w-5 h-5 mt-[2px]" /> Dedicated support team for
                  quick assistance
                </li>
                <li className="flex gap-2">
                  <RefreshCw className="w-5 h-5 mt-[2px]" /> Regularly updated music to
                  keep playlists fresh
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="lg:w-[60%] w-full">
          <div className="text-center lg:hidden">
            <h2 className="text-[32px] leading-[40px] mb-[8px]">
              Looking for more features?
            </h2>
            <p className="text-muted text-[16px] mb-[20px]">
              We&apos;re here to help you get the most out of your playlist.
            </p>
          </div>
          <ContactSalesForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSalesView;
