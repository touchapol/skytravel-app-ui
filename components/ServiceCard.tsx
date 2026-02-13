import React from 'react';
import { ServiceItem } from '../types';

interface ServiceCardProps {
  item: ServiceItem;
  onClick?: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ item, onClick }) => {
  const Icon = item.icon;
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-3xl p-4 shadow-sm flex flex-col justify-between h-36 relative overflow-hidden group cursor-pointer active:scale-95 transition-all"
    >
      <div className={`absolute -right-4 -top-4 w-20 h-20 rounded-full opacity-20 group-hover:scale-125 transition-transform duration-500 ${item.iconBgClass}`} />
      
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2 ${item.iconBgClass} ${item.colorClass}`}>
        <Icon size={24} strokeWidth={2.5} />
      </div>
      
      <div>
        <h3 className="text-slate-900 font-bold text-base leading-tight">{item.title}</h3>
        <p className="text-slate-400 text-xs mt-1 font-medium">{item.subtitle}</p>
      </div>
    </div>
  );
};