import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const data = [
  {category: "All", count: 100},
  { category: "Branding", count: 10 },
  { category: "Social Media", count: 5 },
  { category: "Ads", count: 15 },
];

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const totalProjects = data.reduce((acc, item) => acc + item.count, 0);
  const selectedCount = data.find(
    (item) => item.category === selectedCategory
  )?.count;

  const percentage = Math.round((selectedCount / totalProjects) * 100);

  return (
    <div className="flex h-screen bg-[#1a1a1a] text-white overflow-hidden">
      <Sidebar />

      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold font-montserrat mb-6 ml-12">Dashboard</h1>

        <div className="flex flex-col md:flex-row gap-6 ml-12">
          <div className="bg-[#2a2a2a] p-6 rounded-xl shadow-md w-full md:w-1/3">
            <h2 className="text-lg font-semibold mb-4">Project's</h2>
            <CircularProgressbar
              value={percentage}
              text={`${percentage}%`}
              styles={buildStyles({
                textColor: "#fff",
                pathColor: "#3b82f6",
                trailColor: "#555",
              })}
            />
            <p className="mt-4 text-sm text-gray-300">
              {selectedCount} out of {totalProjects} projects in{" "}
              <span className="text-blue-400">{selectedCategory}</span>
            </p>

            <div className="mt-4 space-x-2">
              {data.map((item) => (
                <button
                  key={item.category}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedCategory === item.category
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-300"
                  }`}
                  onClick={() => setSelectedCategory(item.category)}
                >
                  {item.category}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#2a2a2a] p-6 rounded-xl shadow-md w-full md:w-2/3">
            <h2 className="text-lg font-semibold mb-4">Admin Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Name:</span> Admin Name
              </div>
              <div>
                <span className="text-gray-400">Email:</span> admin@example.com
              </div>
              <div>
                <span className="text-gray-400">Username:</span> admin123
              </div>
              <div>
                <span className="text-gray-400">Role:</span> Super Admin
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
