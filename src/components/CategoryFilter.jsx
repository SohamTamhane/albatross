import React, {useState } from "react";
import ProdutCategory from "./ProductsCategory";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import ProductModalShow from "./ProductModalShow";


const productData = [
  { id: 1, name: "Kadam Realty", image: image1, category:"Branding", tags:"Real Estate"},
  { id: 2, name: "AAKAR Alumini DYP", image: image2, category:"Branding", tags:"Community" },
  { id: 3, name: "Kadam Realty", image: image3, category:"Social Media", tags:"Real Estate"},
  { id: 4, name: "Kadam Realty", image: image1, category:"Social Media", tags:"Real Estate"},
  { id: 5, name: "AAKAR Alumini DYP", image: image2, category:"Social Media", tags:"Community" },
  { id: 6, name: "Kadam Realty", image: image4, category:"Media Production", tags:"Real Estate"},
  { id: 7, name: "Kadam Realty", image: image4, category:"Media Production", tags:"Real Estate"},
  { id: 8, name: "AAKAR Alumini DYP", image: image4, category:"Website", tags:"Community" },
  { id: 9, name: "Kadam Realty", image: image1, category:"Website", tags:"Real Estate"},
  { id: 10, name: "Kadam Realty", image: image2,category:"Branding", tags:"Real Estate"},
];


const categories = ["All", "Branding", "Social Media", "Media Production", "Website"];

export default function CategoryFilter(){

    const [active, setActive] = useState("All");

    return(
        <div className="text-white px-4 py-6">
            <div className="sticky top-0 z-40 bg-[#131313] bg-opacity-80 backdrop-blur-sm py-4 px-4 w-full">
                <ul className="flex flex-row justify-center gap-4 text-lg md:text-2xl sm:text-xl font-montserrat text-gray-400 ">
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
            
            <ProdutCategory activeCategory={active} products={productData} />
{/* 
            {active !== "All" && filteredProducts.length > 0 && (
            <ProductModalShow
            category={active}
            products={filteredProducts}
            onClose={() => handleCategoryClick("All")}
            />
      )} */}
        </div>
    )
}