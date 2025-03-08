import React, { useState, useMemo } from 'react';
import { SearchBar } from './components/SearchBar';
import { SortDropdown } from './components/SortDropdown';
import { FilterSidebar } from './components/FilterSidebar';
import { RecipeCard } from './components/RecipeCard';
import { recipes } from './data/recipes';
import type { Recipe, SortOption, Filters } from './types';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [filters, setFilters] = useState<Filters>({
    attributes: [],
    mealTypes: [],
    dishTypes: [],
  });

  const filteredRecipes = useMemo(() => {
    return recipes
      .filter((recipe) => {
        // Search filter
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = searchTerm === '' || 
          recipe.name.toLowerCase().includes(searchLower) ||
          recipe.chef.toLowerCase().includes(searchLower) ||
          recipe.description.toLowerCase().includes(searchLower);

        // Attribute filters
        const matchesAttributes = filters.attributes.length === 0 || filters.attributes.every(attr => {
          switch (attr) {
            case 'Contest Winner': return recipe.contestWinner;
            case 'Featured': return recipe.featured;
            case 'Test Kitchen-Approved': return recipe.testKitchenApproved;
            default: return true;
          }
        });

        // Meal type filters
        const matchesMealType = filters.mealTypes.length === 0 || 
          filters.mealTypes.includes(recipe.mealType);

        // Dish type filters
        const matchesDishType = filters.dishTypes.length === 0 || 
          filters.dishTypes.includes(recipe.dishType);

        return matchesSearch && matchesAttributes && matchesMealType && matchesDishType;
      })
      .sort((a, b) => {
        switch (sortOption) {
          case 'newest':
            return new Date(b.uploadedOn).getTime() - new Date(a.uploadedOn).getTime();
          case 'oldest':
            return new Date(a.uploadedOn).getTime() - new Date(b.uploadedOn).getTime();
          case 'highest-rated':
            return b.avgRating - a.avgRating;
          case 'lowest-rated':
            return a.avgRating - b.avgRating;
          default:
            return 0;
        }
      });
  }, [recipes, searchTerm, sortOption, filters]);

  const clearFilters = () => {
    setFilters({
      attributes: [],
      mealTypes: [],
      dishTypes: [],
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="md:w-64 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              onClearFilters={clearFilters}
            />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
              <SortDropdown sortOption={sortOption} onSort={setSortOption} />
            </div>

            {filteredRecipes.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No recipes found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;