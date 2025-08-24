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

  useEffect(()=>{
    console.log(selectedProject);
  }, [selectedProject])
  return (
    <div className={`px-4 sm:px-8 md:px-12 lg:px-20 py-10`}>
      {loading ? (
        <p className="text-white text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-white">
          {filteredProducts.map((product) => {
            const displayImage =
              (product.imageUrls?.length > 0 && product.imageUrls[0]) ||
              product.imageUrl ||
              "https://via.placeholder.com/300";

            return (
              <div
                key={product.id}
                className="relative group overflow-hidden shadow-md cursor-pointer"
                onClick={() => setSelectedProject(product)}
              >
                <img
                  src={displayImage}
                  alt={product.title}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-lg font-montserrat font-medium truncate">
                    {product.title}
                  </h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="bg-white/10 px-3 py-1 text-xs font-montserrat">
                      {product.category}
                    </span>
                    <span className="bg-black/15 px-3 py-1 text-xs font-montserrat border border-white">
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
