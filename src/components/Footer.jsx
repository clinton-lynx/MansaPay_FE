// import { Link } from "@nextui-org/link";
// import { Logo } from "./icons";

// export default function Footer() {
//   return (
//     <footer className="bg-white pt-10 pb-4">
//       <div className="flex flex-col md:flex-row justify-between max-w-[1300px] px-[4vw] m-auto items-start">
        
//         {/* Column 1: Company Branding and Description */}
//         <div className="w-full md:w-1/3 mb-6 md:mb-0 text-center md:text-left">
//           <Logo />
//           <p className="text-sm mt-2 text-default-700">
//             Empowering community-driven crowdfunding with transparency and AI-driven insights.
//           </p>
//         </div>

//         {/* Column 2: Navigation Links */}
//         <div className="w-full md:w-1/3 mb-6 md:mb-0 flex justify-between flex-col  md:flex-row items-center md:items-start mr-5">
//           <Link href="#features" className="text-sm text-default-900 mt-2 ml-4">
//             Features
//           </Link>
//           <Link href="#useCases" className="text-sm text-default-900 mt-2 ml-4">
//             Use Cases
//           </Link>
//           <Link href="#team" className="text-sm text-default-900 mt-2 ml-4">
//             Our Team
//           </Link>
//         </div>

//         {/* Column 3: Social Media Links */}
//         <div className="w-full md:w-1/3 flex justify-center md:justify-start items-center gap-6 ">
//           <Link isExternal href="https://twitter.com/MansaPay" className="text-default-900">
//             <img src="/twitter-icon.png" width={24} height={24} alt="Twitter" />
//           </Link>
//           <Link isExternal href="https://linkedin.com/company/MansaPay" className="text-default-900">
//             <img src="/linkedin-icon.png" width={24} height={24} alt="LinkedIn" />
//           </Link>
//           <Link isExternal href="mailto:contact@mansapay.com" className="text-default-900">
//             <img src="/email-icon.png" width={24} height={24} alt="Email" />
//           </Link>
//         </div>
//       </div>
//     </footer>
//   );
// }



import { FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";
import {  WhiteLogo } from "./icons";

export default function Footer() {
  return (
    <footer className="bg-[#0069ff] text-white py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Left Column: MansaPay Icon */}
        <div className="flex-shrink-0">
       <WhiteLogo/>
        </div>

        {/* Center Column: Navigation Links */}
        <div className="text-center">
          <ul className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-6">
            <li><a href="#features" className="hover:underline">Features</a></li>
            <li><a href="#teams" className="hover:underline">Our Team</a></li>
            <li><a href="#usecases" className="hover:underline">Use Cases</a></li>
          </ul>
        </div>

        {/* Right Column: Social Links */}
        <div className="flex space-x-4">
          <a href="https://github.com/MansaPay" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
            <FiGithub size={24} className="hover:text-blue-500" />
          </a>
          <a href="https://twitter.com/MansaPay" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
            <FiTwitter size={24} className="hover:text-blue-400" />
          </a>
          <a href="https://linkedin.com/company/MansaPay" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <FiLinkedin size={24} className="hover:text-blue-600" />
          </a>
        </div>
      </div>
    </footer>
  );
}
