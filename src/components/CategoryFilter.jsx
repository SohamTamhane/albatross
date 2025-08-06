import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../src/firebase";
import ProdutCategory from "./ProductsCategory";

// Add "Advertisement" to categories if needed
const categories = ["All", "Branding", "Social Media",  "Advertisement", "Website"];

export default function CategoryFilter() {
  const [active, setActive] = useState("All");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const snapshot = await getDocs(collection(db, "projects"));
        const data = snapshot.docs.map((doc) => {
          const raw = doc.data();
          const imageList = Array.isArray(raw.imageUrls) ? raw.imageUrls : [];

          return {
            id: doc.id,
            title: raw.title,
            category: raw.category,
            tags: raw.tags,
            description: raw.description,
            imageUrl: imageList[0] || null, // 🟢 First thumbnail image
            videoUrl: raw.videoUrl || null,
            fullData: raw, // if needed for modals
          };
        });

        setProducts(data);
        setFilteredProducts(data.slice(0, 8)); // First 8 initially
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (active === "All") {
      setFilteredProducts(products.slice(0, 8));
    } else {
      const filtered = products.filter((item) => item.category === active);
      setFilteredProducts(filtered);
    }
  }, [active, products]);

  return (
    <div className="text-white px-4 py-6">
      <div className="sticky top-0 z-40 bg-[#131313] bg-opacity-80 backdrop-blur-sm py-4 px-4 w-full">
        <ul className="flex flex-row justify-center gap-4 text-lg md:text-2xl sm:text-xl font-montserrat text-gray-400">
          {categories.map((category) => (
            <li
              key={category}
              onClick={() => setActive(category)}
              className={`cursor-pointer transition-all duration-200 ${
                active === category ? "text-white font-bold" : ""
              }`}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      {loading ? (
        <p className="text-center py-8 text-gray-400">Loading projects...</p>
      ) : (
        <ProdutCategory activeCategory={active} products={filteredProducts} />
      )}
    </div>
  );
}
