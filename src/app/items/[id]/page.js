'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function ItemDetail() {
  const [item, setItem] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => setItem(data));
  }, [id]);

  if (!item) return <div className="text-center text-lg">Loading...</div>;

  return (
    <div className="detail-container mx-auto mt-5 max-w-2xl p-6 bg-[#FFF1DB] rounded-lg shadow-lg">
      <div className="flex justify-center mb-4">
        <img 
          src={item.thumbnail} 
          alt={item.title} 
          className="w-72 h-72 object-cover rounded-lg"
        />
      </div>
      <h1 className="text-3xl text-[crimson] font-bold text-center mb-2">{item.title}</h1>
      <p className="text-gray-600 font-semibold mb-4">{item.description}</p>
      <div className="flex justify-between items-center mb-4">
        <p className="text-xl font-semibold text-green-600">Price: ${item.price}</p>
        <p className="text-yellow-500">Rating: {item.rating} ⭐</p>
      </div>
      <div className="text-center">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-mono hover:bg-blue-600 transition duration-300">Add to Cart</button>
      </div>
    </div>
  );
}
