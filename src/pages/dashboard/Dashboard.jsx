import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const snapshot = await getDocs(collection(db, "projects"));
        const projectList = snapshot.docs.map((doc) => doc.data());

        // Group by category
        const categoryCount = {};
        for (const project of projectList) {
          const category = project.category || "Uncategorized";
          categoryCount[category] = (categoryCount[category] || 0) + 1;
        }

        // Build data array
        const result = Object.entries(categoryCount).map(([category, count]) => ({
          category,
          count,
        }));

        const total = result.reduce((sum, item) => sum + item.count, 0);
        setCategoryData([{ category: "All", count: total }, ...result]);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const totalProjects = categoryData.find(item => item.category === "All")?.count || 0;
  const selectedCount =
    selectedCategory === "All"
      ? totalProjects
      : categoryData.find((item) => item.category === selectedCategory)?.count || 0;

  const percentage = totalProjects > 0 ? Math.round((selectedCount / totalProjects) * 100) : 0;

  return (
    <div className="flex h-screen bg-[#1a1a1a] text-white overflow-hidden">
      <Sidebar />

      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold font-montserrat mb-6 ml-12">Dashboard</h1>

        {loading ? (
          <p className="text-gray-400 ml-12 text-center">Loading projects...</p>
        ) : (
          <div className="flex flex-col md:flex-row gap-6 ml-12">
            {/* Progress chart */}
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

              {/* Category buttons */}
              <div className="mt-4 flex flex-wrap gap-2">
                {categoryData.map((item) => (
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

            {/* Admin info */}
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
        )}
      </div>
    </div>
  );
}
