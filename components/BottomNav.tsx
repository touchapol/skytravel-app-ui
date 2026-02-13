import React from 'react';
import { Home, Compass, Wallet, User, QrCode } from 'lucide-react';

export const BottomNav: React.FC = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full bg-white border-t border-slate-100 h-24 px-0 flex items-center justify-center rounded-t-[2rem] shadow-up z-30 pb-4">
      <div className="w-full grid grid-cols-5 items-end h-full pb-2">
        {/* Home */}
        <button className="flex flex-col items-center gap-1 text-primary justify-end pb-1">
          <Home size={24} strokeWidth={2.5} />
          <span className="text-[10px] font-bold">หน้าหลัก</span>
        </button>

        {/* Explore */}
        <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors justify-end pb-1">
          <Compass size={24} strokeWidth={2} />
          <span className="text-[10px] font-medium">สำรวจ</span>
        </button>

        {/* Spacer for QR */}
        <div></div>

        {/* Wallet */}
        <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors justify-end pb-1">
          <Wallet size={24} strokeWidth={2} />
          <span className="text-[10px] font-medium">กระเป๋าตังค์</span>
        </button>

        {/* Profile */}
        <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors justify-end pb-1">
          <User size={24} strokeWidth={2} />
          <span className="text-[10px] font-medium">โปรไฟล์</span>
        </button>
      </div>

      {/* Center Floating Button */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-10">
        <button className="w-24 h-24 bg-primary rounded-full shadow-glow flex items-center justify-center text-white hover:scale-105 transition-transform active:scale-95 border-[6px] border-surface">
          <QrCode size={40} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};