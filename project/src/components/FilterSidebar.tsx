import React from 'react';
import { X } from 'lucide-react';
import type { Filters } from '../types';

type FilterSidebarProps = {
  filters: Filters;
  onFilterChange: (newFilters: Filters) => void;
  onClearFilters: () => void;
};

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  const handleAttributeChange = (attribute: string) => {
    const newAttributes = filters.attributes.includes(attribute)
      ? filters.attributes.filter(a => a !== attribute)
      : [...filters.attributes, attribute];
    onFilterChange({ ...filters, attributes: newAttributes });
  };

  const handleMealTypeChange = (mealType: string) => {
    const newMealTypes = filters.mealTypes.includes(mealType)
      ? filters.mealTypes.filter(t => t !== mealType)
      : [...filters.mealTypes, mealType];
    onFilterChange({ ...filters, mealTypes: newMealTypes });
  };

  const handleDishTypeChange = (dishType: string) => {
    const newDishTypes = filters.dishTypes.includes(dishType)
      ? filters.dishTypes.filter(t => t !== dishType)
      : [...filters.dishTypes, dishType];
    onFilterChange({ ...filters, dishTypes: newDishTypes });
  };

  return (
    <div className="w-64 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button
          onClick={onClearFilters}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-3">Attributes</h3>
          <div className="space-y-2">
            {['Contest Winner', 'Featured', 'Test Kitchen-Approved'].map((attribute) => (
              <label key={attribute} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.attributes.includes(attribute)}
                  onChange={() => handleAttributeChange(attribute)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm">{attribute}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-3">Meal Type</h3>
          <div className="space-y-2">
            {['Dinner', 'Lunch', 'Dessert', 'Breakfast'].map((mealType) => (
              <label key={mealType} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.mealTypes.includes(mealType)}
                  onChange={() => handleMealTypeChange(mealType)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm">{mealType}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-3">Dish Type</h3>
          <div className="space-y-2">
            {['Curry', 'Pizza', 'Seafood', 'Soup', 'Mexican', 'Smoothie'].map((dishType) => (
              <label key={dishType} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.dishTypes.includes(dishType)}
                  onChange={() => handleDishTypeChange(dishType)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm">{dishType}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {(filters.attributes.length > 0 || filters.mealTypes.length > 0 || filters.dishTypes.length > 0) && (
        <div className="mt-6 pt-6 border-t">
          <h3 className="font-medium mb-3">Active Filters</h3>
          <div className="flex flex-wrap gap-2">
            {[...filters.attributes, ...filters.mealTypes, ...filters.dishTypes].map((filter) => (
              <span
                key={filter}
                className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-blue-50 text-blue-700"
              >
                {filter}
                <button
                  onClick={() => {
                    if (filters.attributes.includes(filter)) handleAttributeChange(filter);
                    if (filters.mealTypes.includes(filter)) handleMealTypeChange(filter);
                    if (filters.dishTypes.includes(filter)) handleDishTypeChange(filter);
                  }}
                  className="ml-1 p-0.5 hover:bg-blue-100 rounded-full"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};