import React from 'react';
import { DealItem } from '../types';

interface DealCardProps {
  deal: DealItem;
}

export const DealCard: React.FC<DealCardProps> = ({ deal }) => {
  return (
    <div className="relative flex-none w-64 h-48 rounded-3xl overflow-hidden group cursor-pointer shadow-md">
      <img 
        src={deal.image} 
        alt={deal.city} 
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
      
      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-slate-800 shadow-sm">
        {deal.price}
      </div>

      {deal.discount && (
        <div className="absolute top-3 left-3 bg-emerald-400 text-emerald-950 px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm">
          {deal.discount}
        </div>
      )}

      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="text-xl font-bold leading-tight">{deal.city}</h3>
        <p className="text-sm font-medium opacity-80 mt-0.5">{deal.country}</p>
      </div>
    </div>
  );
};