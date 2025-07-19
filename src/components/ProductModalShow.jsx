import React, { useEffect } from "react";

export default function ProductModalShow({ category, products, onClose }) {


  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 backdrop-blur-md flex items-center justify-center px-4">
      <div className="bg-[#111] rounded max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 relative text-white">
        <div className="absolute rounded-full bg-white/10 top-4 right-4  px-2">
            <button
            onClick={onClose}
            className="realtive text-white hover:text-white text-2xl font-bold text-center cursor-pointer"
          >
            ×
          </button>
        </div>
        {products.map((product) => (
          <div key={product.id} className="mb-10">
            <h2 className="text-3xl font-bold mb-4 font-montserrat">{product.name}</h2>
            <div className="flex flex-wrap gap-2 mb-6">
                  <span
                    className="bg-white/10 border border-gray-500 text-white px-3 py-1 text-sm font-montserrat"
                  >
                    {product.category}
                  </span>
                  <span
                    className="bg-black/15 border border-gray-500 text-white px-3 py-1 text-sm font-montserrat"
                  >
                    {product.tags}
                  </span>
            </div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full object-contain bg-black rounded-md mb-6 max-h-[400px]"
            />
              <p className="text-gray-300 leading-relaxed font-montserrat">
                Every masterpiece has a story! Our handcrafted mementos for ELEV8 by The Architect’s Diary are designed with soul and skill. Catch the behind-the-scenes magic in our latest video!
              </p>
           
          </div>
        ))}
      </div>
    </div>
  );
}
