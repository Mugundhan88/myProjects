import React from 'react';
import { ChevronDown } from 'lucide-react';
import type { SortOption } from '../types';

type SortDropdownProps = {
  sortOption: SortOption;
  onSort: (option: SortOption) => void;
};

export const SortDropdown: React.FC<SortDropdownProps> = ({ sortOption, onSort }) => {
  return (
    <div className="relative">
      <select
        value={sortOption}
        onChange={(e) => onSort(e.target.value as SortOption)}
        className="appearance-none w-48 px-4 py-2.5 rounded-lg border border-gray-200 bg-white cursor-pointer pr-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="highest-rated">Highest Rated</option>
        <option value="lowest-rated">Lowest Rated</option>
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
    </div>
  );
};