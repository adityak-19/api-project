'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CiSearch } from "react-icons/ci";


export default function ItemList() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const shortDescription = (description, maxWords) => {
    const words = description.split(' ');
    return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '...' : description;
  };

  useEffect(() => {
    fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(data => setItems(data.products));
  }, []);

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container w-full h-screen">
      <h1 className="title text-5xl text-center mb-4 font-semibold text-[#C4E1F6] ">Item List</h1>
      <div className='search-container'>
      <input
        type="text"
        placeholder="Search"
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      </div>


<div className="item">
  {filteredItems.map((item) => (
    <Link key={item.id} href={`/items/${item.id}`} className="card hover:shadow-lg transition duration-300">
      <img src={item.thumbnail} alt={item.title} className="rounded-lg mb-2" />
      <h2 className='text-lg text-[crimson] font-semibold items-center w-[80%]'>{item.title}</h2>
      <p className="text-gray-600">{shortDescription(item.description, 7)}</p>
      <h2 className='bg-blue-300 rounded-lg px-2 py-1 mt-2 font-mono'>View Details</h2>
      </Link>
  ))}
</div>

    </div>
  );
}
