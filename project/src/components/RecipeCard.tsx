import React from 'react';
import { Star, Award, CheckCircle } from 'lucide-react';
import type { Recipe } from '../types';

type RecipeCardProps = {
  recipe: Recipe;
};

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48">
        <img
          src={recipe.imgUrl}
          alt={recipe.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          {recipe.contestWinner && (
            <div className="bg-yellow-500 text-white p-2 rounded-full" title="Contest Winner">
              <Award className="h-4 w-4" />
            </div>
          )}
          {recipe.featured && (
            <div className="bg-purple-500 text-white p-2 rounded-full" title="Featured Recipe">
              <Star className="h-4 w-4" />
            </div>
          )}
          {recipe.testKitchenApproved && (
            <div className="bg-green-500 text-white p-2 rounded-full" title="Test Kitchen Approved">
              <CheckCircle className="h-4 w-4" />
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold line-clamp-1">{recipe.name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-medium">{recipe.avgRating}</span>
            <span className="ml-1 text-xs text-gray-500">({recipe.totalRatings})</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{recipe.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">By {recipe.chef}</span>
          <span className="text-xs text-gray-400">
            {new Date(recipe.uploadedOn).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </span>
        </div>
      </div>
    </div>
  );
};