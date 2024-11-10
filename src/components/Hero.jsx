import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
// import Image from "next/image";

export default function Hero() {
 return (
  <>
   <div className="pt-40 bg-[#fff]">
    <div className="flex flex-col justify-center items-center hero:grid hero:grid-cols-2 max-w-[1300px] px-[4vw] gap-9 m4:gap-[3rem] m-auto">
     <div className="max-w-[500px] m4:max-w-[unset]">
      <div className="flex flex-col justify-center m4:text-center">
       <h1 className="text-clamp5 leading-[1.05] font-bold text-default-900">
       Harness the Power of smart Crowdfunding with
        <span className="capitalize text-[#29d4ff]">MansaPay</span>.
       </h1>
       <p className="mt-10 sm:text-lg text-base text-default-900 max-w-[400px] m4:max-w-[unset]">
       MansaPay simplifies crowdfunding with an innovative approach that combines payment automation and AI-driven insights, delivering greater transparency, efficiency, and community impact.
       </p>
       <div className="mt-8 flex m4:justify-center">
        <Button
         as={Link}
         className="rounded-md bg-[#0069ff] text-white text-sm font-semibold m4:w-[100%]"
         size="lg"
         href={"/sign-up"}
        >
         Get Started for free
        </Button>
       </div>
      </div>
     </div>
     <div className="max-w-[600px] m4:max-w-[unset] m4:w-full animate-[bounceUp_2.3s_ease-in-out_infinite_alternate]">
      <img
       src="/cf.jpg"
       alt="hero img"
       width={500}
       height={100}
       className="w-full object-cover"
       //    style={{ position: "relative" }}
      />
     </div>
    </div>
   </div>
  </>
 );
}
