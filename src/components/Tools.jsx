import { motion } from "framer-motion";

const techStack = [
  {
    category: "Frontend",
    tools: [
      { name: "React", description: "Builds interactive UIs with powerful components.", img: "/react.png" },
      { name: "Figma", description: "Designs sleek and user-friendly interfaces.", img: "/figm.png" },
      { name: "NextUI", description: "Provides ready-to-use, customizable UI components.", img: "/ui.png" },
      { name: "Tailwind CSS", description: "Enables rapid styling with a utility-first approach.", img: "/tailwind.png" },
    ],
  },
  {
    category: "Backend",
    tools: [
      { name: "Laravel", description: "Robust backend framework for scalable applications.", img: "/laravel.png" },
      { name: "PHP", description: "Server-side scripting language powering the backend.", img: "/php.png" },
    ],
  },
  {
    category: "Integrations",
    tools: [
      { name: "Payaza API", description: "Manages secure payments and transactions.", img: "/payaza.svg" },
      { name: "Gemini AI", description: "Powers AI-driven insights and customer support.", img: "/gemini.png" },
    ],
  },
];

export default function ToolsAPIs() {
  return (
    <div id="tools" className="bg-white py-16 px-6 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Tools and APIs Used</h2>
        <p className="text-lg text-gray-600 mb-12">
          Explore the technology stack that makes MansaPay secure, scalable, and innovative.
        </p>
      </div>

      <div className="space-y-16">
        {techStack.map((section, index) => (
          <div key={index} className="text-center">
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">{section.category}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {section.tools.map((tool, toolIndex) => (
                <motion.div
                  key={toolIndex}
                  className="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 flex flex-col items-center text-center"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: toolIndex * 0.1 }}
                >
                  <img src={tool.img} alt={tool.name} className="w-16 h-16 object-cover mb-4" />
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">{tool.name}</h4>
                  <p className="text-gray-600 text-sm">{tool.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
