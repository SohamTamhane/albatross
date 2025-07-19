import { useState } from "react";
import ProductModalShow from "./ProductModalShow";

export default function ProdutCategory({ activeCategory, products }) {

    
  const [showPopup, setShowPopup] = useState(false);

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category.includes(activeCategory));

//  const [filteredProduct, setFilteredProduct] = useState([]);

//     const handleCategoryClick = (category) => {
//         setActive(category);
//         if (category === "All") {
//             setFilteredProduct([]);
//         } else {
//             const filtered = productData.filter((product) =>
//                 product.category.includes(category)
//             );
//             setFilteredProduct(filtered);
//             // console.log(filtered);
//         }
//     };
    
  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-20 py-10 grid grid-rows-auto" onClick={() => setShowPopup(true)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-white">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="relative group overflow-hidden shadow-md cursor-pointer"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-lg font-montserrat font-medium truncate">
                {product.name}
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
        ))}
      </div>

      {/* <div className="grid md:grid-cols-3 text-white">
                    <div className="relative group overflow-hidden cursor-pointer">
                        <img src={image3} alt="image1" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute bottom-4 left-4">
                            <h2 className="text-lg font-montserrat font-medium">Kadam Realty</h2>
                            <div className="flex gap-2 mt-2">
                                <span className="bg-white/10 px-3 py-1 text-xs font-montserrat">Social Media</span>
                                <span className="bg-black/15 px-3 py-1 text-xs font-montserrat border-1 border-white">Real Estate</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative group overflow-hidden cursor-pointer">
                        <img src={image1} alt="image2" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute bottom-4 left-4">
                            <h2 className="text-lg font-montserrat font-medium">Kadam Realty</h2>
                            <div className="flex gap-2 mt-2">
                                <span className="bg-white/10 px-3 py-1 text-xs font-montserrat">Social Media</span>
                                <span className="bg-black/15 px-3 py-1 text-xs font-montserrat border-1 border-white">Real Estate</span>
                            </div>
                        </div>
                    </div>

                     <div className="relative group overflow-hidden cursor-pointer">
                        <img src={image2} alt="image2" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute bottom-4 left-4">
                            <h2 className="text-lg font-montserrat font-medium">AAKAR Alumini DYP</h2>
                            <div className="flex gap-2 mt-2">
                                <span className="bg-white/10 px-3 py-1 text-xs font-montserrat">Social Media</span>
                                <span className="bg-black/15 px-3 py-1 text-xs font-montserrat border-1 border-white">Community</span>
                            </div>
                        </div>
                    </div>
            </div>
            
            <div className="grid md:grid-cols-3 text-white">
                    <div className="relative group overflow-hidden cursor-pointer">
                        <img src={image4} alt="image1" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute bottom-4 left-4">
                            <h2 className="text-lg font-montserrat font-medium">Kadam Realty</h2>
                            <div className="flex gap-2 mt-2">
                                <span className="bg-white/10 px-3 py-1 text-xs font-montserrat">Social Media</span>
                                <span className="bg-black/15 px-3 py-1 text-xs font-montserrat border-1 border-white">Real Estate</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative group overflow-hidden cursor-pointer">
                        <img src={image4} alt="image2" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute bottom-4 left-4">
                            <h2 className="text-lg font-montserrat font-medium">Kadam Realty</h2>
                            <div className="flex gap-2 mt-2">
                                <span className="bg-white/10 px-3 py-1 text-xs font-montserrat">Social Media</span>
                                <span className="bg-black/15 px-3 py-1 text-xs font-montserrat border-1 border-white">Real Estate</span>
                            </div>
                        </div>
                    </div>

                     <div className="relative group overflow-hidden cursor-pointer">
                        <img src={image4} alt="image2" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute bottom-4 left-4">
                            <h2 className="text-lg font-montserrat font-medium">AAKAR Alumini DYP</h2>
                            <div className="flex gap-2 mt-2">
                                <span className="bg-white/10 px-3 py-1 text-xs font-montserrat">Social Media</span>
                                <span className="bg-black/15 px-3 py-1 text-xs font-montserrat border-1 border-white">Community</span>
                            </div>
                        </div>
                    </div>
            </div>

            <div className="grid md:grid-cols-2 text-white">
                    <div className="relative group overflow-hidden cursor-pointer">
                        <img src={image1} alt="image1" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute bottom-4 left-4">
                            <h2 className="text-lg font-montserrat font-medium">Kadam Realty</h2>
                            <div className="flex gap-2 mt-2">
                                <span className="bg-white/10 px-3 py-1 text-xs font-montserrat">Website</span>
                                <span className="bg-black/15 px-3 py-1 text-xs font-montserrat border-1 border-white">Real Estate</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative group overflow-hidden cursor-pointer">
                        <img src={image2} alt="image2" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute bottom-4 left-4">
                            <h2 className="text-lg font-montserrat font-medium">Kadam Realty</h2>
                            <div className="flex gap-2 mt-2">
                                <span className="bg-white/10 px-3 py-1 text-xs font-montserrat">Website</span>
                                <span className="bg-black/15 px-3 py-1 text-xs font-montserrat border-1 border-white">Real Estate</span>
                            </div>
                        </div>
                    </div>
            </div> */}

             {showPopup && <ProductModalShow category={activeCategory} products={filteredProducts} onClose={() => setShowPopup(false)} />}
    </div>
  );
}
