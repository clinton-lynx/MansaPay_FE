import { Link } from "@nextui-org/link";
import { Logo } from "./icons";

export default function Footer() {
  return (
    <footer className="bg-white pt-10 pb-4">
      <div className="flex flex-col md:flex-row justify-between max-w-[1300px] px-[4vw] m-auto items-start">
        
        {/* Column 1: Company Branding and Description */}
        <div className="w-full md:w-1/3 mb-6 md:mb-0 text-center md:text-left">
          <Logo />
          <p className="text-sm mt-2 text-default-700">
            Empowering community-driven crowdfunding with transparency and AI-driven insights.
          </p>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="w-full md:w-1/3 mb-6 md:mb-0 flex justify-between flex-col  md:flex-row items-center md:items-start mr-5">
          <Link href="#features" className="text-sm text-default-900 mt-2 ml-4">
            Features
          </Link>
          <Link href="#useCases" className="text-sm text-default-900 mt-2 ml-4">
            Use Cases
          </Link>
          <Link href="#team" className="text-sm text-default-900 mt-2 ml-4">
            Our Team
          </Link>
        </div>

        {/* Column 3: Social Media Links */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-start items-center gap-6 ">
          <Link isExternal href="https://twitter.com/MansaPay" className="text-default-900">
            <img src="/twitter-icon.png" width={24} height={24} alt="Twitter" />
          </Link>
          <Link isExternal href="https://linkedin.com/company/MansaPay" className="text-default-900">
            <img src="/linkedin-icon.png" width={24} height={24} alt="LinkedIn" />
          </Link>
          <Link isExternal href="mailto:contact@mansapay.com" className="text-default-900">
            <img src="/email-icon.png" width={24} height={24} alt="Email" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
