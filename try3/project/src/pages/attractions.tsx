import React, { useState, useEffect } from 'react';
import { Attraction } from '../types';
import AttractionCard from '../components/Attractions/AttractionCard';
import { Search, Filter } from 'lucide-react';

const Attractions: React.FC = () => {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [filteredAttractions, setFilteredAttractions] = useState<Attraction[]>([]);

  useEffect(() => {
    // Fetch attractions data (replace with actual API call)
    fetch('/api/attractions')
      .then((res) => res.json())
      .then((data) => setAttractions(data));
  }, []);

  useEffect(() => {
    let results = attractions;

    if (searchQuery) {
      results = results.filter((attr) =>
        attr.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categoryFilter) {
      results = results.filter((attr) =>
        attr.category.includes(categoryFilter)
      );
    }

    setFilteredAttractions(results);
  }, [searchQuery, categoryFilter, attractions]);

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Explore Attractions</h2>

        {/* Search & Filter */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search attractions..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
          </div>

          <div>
            <select
              className="border py-2 px-4 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Nature">Nature</option>
              <option value="Cultural">Cultural</option>
              <option value="Adventure">Adventure</option>
              <option value="Historical">Historical</option>
            </select>
          </div>
        </div>

        {/* Grid of Attractions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAttractions.length > 0 ? (
            filteredAttractions.map((attraction) => (
              <AttractionCard key={attraction.id} attraction={attraction} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">No attractions found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Attractions;
