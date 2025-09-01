import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../src/firebase";
import DynamicProjectModal from "./DynamicProjectModal";

export default function ProdutCategory({ activeCategory }) {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch all projects on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const snapshot = await getDocs(collection(db, "projects"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter by category
  const filteredProducts =
    activeCategory === "All"
      ? projects
      : projects.filter((product) => product.category === activeCategory);

  return (
    <div className="px-4 sm:px-2 md:px-10 lg:px-20 py-10">
      {loading ? (
        <p className="text-white text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-white">
          {filteredProducts.map((product) => {
            const displayImage =
              (product.imageUrls?.length > 0 && product.imageUrls[0]) ||
              product.imageUrl ||
              "https://via.placeholder.com/300";

            return (
              <div
                key={product.id}
                className="relative group overflow-hidden shadow-md cursor-pointer 
                           h-64 sm:h-auto"
                onClick={() => setSelectedProject(product)}
              >
                {/* Image */}
                <img
                  src={displayImage}
                  alt={product.title}
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                />

                {/* Black gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

                {/* Content */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <h2 className="text-2xl font-montserrat">{product.title}</h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {/* Left chip */}
                    <span className="bg-white/15 border border-gray-500 text-white px-3 py-1 text-sm font-montserrat">
                      {product.category}
                    </span>
                    {/* Right chip */}
                    <span className="px-3 py-1 text-sm font-montserrat border border-gray-300 text-gray-200">
                      {product.tags}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedProject && (
        <DynamicProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
