// import Image from "next/image";

const whyMansaPay = [

    {
      name: "AI-Powered Assistance",
      description:
        "Leverage our AI assistant for instant answers to contributor inquiries and campaign performance updates. Provide transparency and support, building trust with your community.",
      img: "/aii.png",
    },
    {
      name: "Effortless Payment Links",
      description:
        "Create and share payment links with ease. MansaPay simplifies payment collection, letting you focus on making an impact while we handle the logistics.",
      img: "/pay.png",
    },

    {
      name: "Scalable for Any Campaign",
      description:
        "Whether for small projects or large initiatives, MansaPay adapts to your funding needs, providing flexibility for campaigns of any size.",
      img: "/crowdfunding.png",
    },
  ];
  
  export default function WhyMansaPay() {
    return (
      <div id="features" className="bg-white py-14 md:py-24 w-full">
        <div className="px-6 lg:px-8">
          <div className="mx-auto max-w-[1100px] text-center ml-auto mr-auto">
            <h2 className="text-center text-clamp2 font-bold text-black">
              Why Choose MansaPay?
            </h2>
            <p className="text-center mt-5 font-medium max-w-[35rem] ml-auto mr-auto">
              Discover what makes MansaPay the ultimate choice for crowdfunding with AI-driven insights, community empowerment, and flexibility to scale with your project’s needs.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid grid-cols-1 gap-y-16 lg:grid-cols-3 max-w-[1100px] ml-auto mr-auto">
              {whyMansaPay.map((feature) => (
                <div
                  key={feature.name}
                  className="flex flex-col items-center md:px-10"
                >
                  <dt className="text-base text-center font-semibold leading-7 text-gray-900">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg relative">
                      <img
                        src={feature.img}
                        alt={feature.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </dt>
                  <h3 className="text-[#000] text-center font-bold text-xl">
                    {feature.name}
                  </h3>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 text-center">
                    <p className="flex-auto text-base">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    );
  }
  