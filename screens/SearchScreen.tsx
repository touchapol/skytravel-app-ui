import React, { useState } from 'react';
import { ArrowLeft, MoreHorizontal, ArrowRightLeft, Calendar, User, Search, Check, X, MapPin } from 'lucide-react';
import { SearchHistoryItem } from '../types';
import { CalendarModal } from '../components/CalendarModal';

interface SearchScreenProps {
  onBack: () => void;
  onSearch: () => void;
}


const recentSearches: SearchHistoryItem[] = [
  { id: '1', fromCode: 'BKK', toCode: 'CNX', image: 'https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?q=80&w=300&auto=format&fit=crop' },
  { id: '2', fromCode: 'BKK', toCode: 'HKT', image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=300&auto=format&fit=crop' },
  { id: '3', fromCode: 'BKK', toCode: 'KBV', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=300&auto=format&fit=crop' },
];

interface Airport {
  code: string;
  name: string;
  city: string;
}

const airports: Airport[] = [
  { code: 'BKK', name: 'Suvarnabhumi Intl', city: 'กรุงเทพฯ (สุวรรณภูมิ)' },
  { code: 'DMK', name: 'Don Mueang Intl', city: 'กรุงเทพฯ (ดอนเมือง)' },
  { code: 'CNX', name: 'Chiang Mai Intl', city: 'เชียงใหม่' },
  { code: 'HKT', name: 'Phuket Intl', city: 'ภูเก็ต' },
  { code: 'KBV', name: 'Krabi Intl', city: 'กระบี่' },
  { code: 'USM', name: 'Samui Intl', city: 'สมุย' },
  { code: 'URT', name: 'Surat Thani Intl', city: 'สุราษฎร์ธานี' },
  { code: 'UTH', name: 'Udon Thani Intl', city: 'อุดรธานี' },
  { code: 'HDY', name: 'Hat Yai Intl', city: 'หาดใหญ่' },
  { code: 'CEI', name: 'Chiang Rai Intl', city: 'เชียงราย' },
  { code: 'PHY', name: 'Phetchabun Airport', city: 'เพชรบูรณ์' },
];

export const SearchScreen: React.FC<SearchScreenProps> = ({ onBack, onSearch }) => {
  const [tripType, setTripType] = useState<'round' | 'one'>('round');
  const [fromAirport, setFromAirport] = useState<Airport>(airports[0]);
  const [toAirport, setToAirport] = useState<Airport>(airports[2]);
  const [departureDate, setDepartureDate] = useState('2024-11-12');
  const [returnDate, setReturnDate] = useState('2024-11-15');

  // Advanced Passenger & Class State
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [cabinClass, setCabinClass] = useState<'Economy' | 'Business' | 'First'>('Economy');
  const [showPassengerModal, setShowPassengerModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState<'departure' | 'return' | null>(null);

  const handleDateSelect = (date: string) => {
    if (showCalendarModal === 'departure') {
      setDepartureDate(date);
    } else {
      setReturnDate(date);
    }
  };

  const [showAirportModal, setShowAirportModal] = useState<'from' | 'to' | null>(null);

  const handleSwap = () => {
    const temp = fromAirport;
    setFromAirport(toAirport);
    setToAirport(temp);
  };

  const handleSelectAirport = (airport: Airport) => {
    if (showAirportModal === 'from') {
      setFromAirport(airport);
    } else {
      setToAirport(airport);
    }
    setShowAirportModal(null);
  };

  const getCabinClassLabel = (cls: string) => {
    switch (cls) {
      case 'Economy': return 'ชั้นประหยัด';
      case 'Business': return 'ชั้นธุรกิจ';
      case 'First': return 'ชั้นหนึ่ง';
      default: return cls;
    }
  };

  return (
    <div className="flex flex-col h-full bg-surface relative">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-64 bg-primary/5 rounded-b-[3rem] -z-0"></div>
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>

      {/* Header */}
      <header className="px-6 pt-12 pb-4 flex items-center justify-between z-10">
        <button
          onClick={onBack}
          className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-white/50 transition-colors"
        >
          <ArrowLeft className="text-slate-800" size={24} />
        </button>
        <h1 className="text-lg font-bold text-slate-900 tracking-tight">จองเที่ยวบิน</h1>
        <button className="w-10 h-10 -mr-2 rounded-full flex items-center justify-center hover:bg-white/50 transition-colors">
          <MoreHorizontal className="text-slate-800" size={24} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar px-6 pb-32 z-10">

        {/* Trip Type Toggle */}
        <div className="bg-white p-1.5 rounded-full flex items-center justify-between shadow-sm mb-8 border border-slate-100 max-w-sm mx-auto">
          <button
            onClick={() => setTripType('round')}
            className={`flex-1 py-2.5 px-4 rounded-full text-sm font-semibold transition-all ${tripType === 'round' ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:text-primary'}`}
          >
            ไป-กลับ
          </button>
          <button
            onClick={() => setTripType('one')}
            className={`flex-1 py-2.5 px-4 rounded-full text-sm font-semibold transition-all ${tripType === 'one' ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:text-primary'}`}
          >
            เที่ยวเดียว
          </button>
        </div>

        {/* Route Card */}
        <div className="bg-white rounded-3xl p-6 shadow-soft mb-6 relative border border-slate-100">
          {/* From */}
          <div className="relative z-10 group cursor-pointer" onClick={() => setShowAirportModal('from')}>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">จาก</label>
            <div className="flex justify-between items-end">
              <div>
                <div className="text-3xl font-extrabold text-slate-900 leading-tight tracking-tight">{fromAirport.code}</div>
                <div className="text-sm text-slate-500 font-medium truncate w-32">{fromAirport.name}</div>
              </div>
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold mb-1">
                {fromAirport.city}
              </div>
            </div>
          </div>

          {/* Swap Divider */}
          <div className="relative h-12 flex items-center justify-center my-2">
            <div className="absolute w-full h-[1px] border-t-2 border-dashed border-slate-200"></div>
            <button
              onClick={(e) => { e.stopPropagation(); handleSwap(); }}
              className="relative z-20 w-10 h-10 bg-white rounded-full shadow-md border border-slate-100 flex items-center justify-center text-primary hover:scale-110 hover:rotate-180 transition-all duration-300 cursor-pointer"
            >
              <ArrowRightLeft size={18} className="rotate-90" />
            </button>
          </div>

          {/* To */}
          <div className="relative z-10 group cursor-pointer" onClick={() => setShowAirportModal('to')}>
            <label className="text-xs font-bold text-primary uppercase tracking-wider mb-1 block">ถึง</label>
            <div className="flex justify-between items-end">
              <div>
                <div className="text-3xl font-extrabold text-primary leading-tight tracking-tight">{toAirport.code}</div>
                <div className="text-sm text-slate-500 font-medium truncate w-32">{toAirport.name}</div>
              </div>
              <div className="bg-primary text-white px-3 py-1 rounded-full text-xs font-bold mb-1 shadow-glow">
                {toAirport.city}
              </div>
            </div>
          </div>
        </div>

        {/* Dates Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            type="button"
            onClick={() => setShowCalendarModal('departure')}
            className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:border-primary/30 transition-colors text-left relative"
          >
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={18} className="text-slate-400" />
              <span className="text-xs font-bold text-slate-400 uppercase">วันเดินทางไป</span>
            </div>
            <div className="text-lg font-bold text-slate-900">{new Date(departureDate).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })}</div>
            <div className="text-xs text-slate-500 font-medium">{new Date(departureDate).toLocaleDateString('th-TH', { weekday: 'long' })}</div>
          </button>

          {tripType === 'round' ? (
            <button
              type="button"
              onClick={() => setShowCalendarModal('return')}
              className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:border-primary/30 transition-colors text-left relative"
            >
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={18} className="text-slate-400" />
                <span className="text-xs font-bold text-slate-400 uppercase">วันเดินทางกลับ</span>
              </div>
              <div className="text-lg font-bold text-slate-900">{new Date(returnDate).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })}</div>
              <div className="text-xs text-slate-500 font-medium">{new Date(returnDate).toLocaleDateString('th-TH', { weekday: 'long' })}</div>
            </button>
          ) : (
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center justify-center text-slate-400 text-sm font-medium" onClick={() => setTripType('round')}>
              + เพิ่มขากลับ
            </div>
          )}
        </div>

        {/* Passengers & Class (New Implementation) */}
        <div
          onClick={() => setShowPassengerModal(true)}
          className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-6 flex items-center justify-between cursor-pointer hover:border-primary/30 transition-colors group"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <User size={20} />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase mb-0.5">ผู้โดยสาร & ชั้นที่นั่ง</div>
              <div className="text-base font-bold text-slate-900">
                {adults} ผู้ใหญ่, {children > 0 ? `${children} เด็ก, ` : ''}{getCabinClassLabel(cabinClass)}
              </div>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">
            <span className="text-slate-300">▼</span>
          </div>
        </div>

        {/* Recent Searches */}
        <div className="mt-8">
          <h3 className="text-sm font-bold text-slate-900 mb-4 px-1">ค้นหาล่าสุด</h3>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
            {recentSearches.map(item => (
              <div key={item.id} className="flex-none w-32 h-40 rounded-2xl relative overflow-hidden group cursor-pointer shadow-sm">
                <img src={item.image} alt="dest" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>
                <div className="absolute bottom-3 left-3 text-white">
                  <div className="text-[10px] font-medium opacity-80 uppercase tracking-wide">จาก {item.fromCode}</div>
                  <div className="text-lg font-bold leading-none">{item.toCode}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Sticky Bottom Action */}
      <div className="absolute bottom-0 left-0 w-full bg-white border-t border-slate-100 p-6 z-20 rounded-t-[2rem] shadow-up">
        <button
          onClick={onSearch}
          className="w-full bg-primary hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-xl shadow-glow transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
        >
          <Search size={22} className="group-hover:animate-bounce" />
          ค้นหาเที่ยวบิน
        </button>
      </div>

      {/* Airport Selection Modal */}
      {showAirportModal && (
        <div className="absolute inset-0 z-50 bg-white flex flex-col animate-in slide-in-from-bottom duration-300">
          <div className="px-6 pt-12 pb-4 flex items-center gap-4 border-b border-slate-100">
            <button
              onClick={() => setShowAirportModal(null)}
              className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors"
            >
              <X className="text-slate-800" size={24} />
            </button>
            <h1 className="text-lg font-bold text-slate-900">
              {showAirportModal === 'from' ? 'เลือกจุดเริ่มต้น' : 'เลือกจุดหมายปลายทาง'}
            </h1>
          </div>

          <div className="p-6">
            <div className="bg-slate-100 rounded-xl flex items-center px-4 py-3 gap-3 mb-6">
              <Search size={20} className="text-slate-400" />
              <input type="text" placeholder="ค้นหาสนามบิน, เมือง..." className="bg-transparent border-none outline-none text-slate-900 w-full placeholder:text-slate-400" />
            </div>

            <div className="flex flex-col gap-2 overflow-y-auto no-scrollbar h-[calc(100vh-200px)]">
              {airports.map(airport => (
                <button
                  key={airport.code}
                  onClick={() => handleSelectAirport(airport)}
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{airport.city}</span>
                        <span className="text-xs font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">{airport.code}</span>
                      </div>
                      <div className="text-xs text-slate-400">{airport.name}</div>
                    </div>
                  </div>
                  {(showAirportModal === 'from' ? fromAirport.code === airport.code : toAirport.code === airport.code) && (
                    <Check size={20} className="text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Passenger & Class Selection Modal */}
      {showPassengerModal && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end justify-center animate-in fade-in duration-200">
          <div className="bg-white w-full rounded-t-[2rem] p-6 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900">ผู้โดยสาร & ชั้นที่นั่ง</h2>
              <button onClick={() => setShowPassengerModal(false)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                <X size={20} />
              </button>
            </div>

            {/* Passengers */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100">
                <div>
                  <div className="font-bold text-slate-900">ผู้ใหญ่</div>
                  <div className="text-xs text-slate-400">อายุ 12 ปีขึ้นไป</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${adults <= 1 ? 'bg-slate-100 text-slate-300' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    disabled={adults <= 1}
                  >-</button>
                  <span className="font-bold text-slate-900 w-4 text-center">{adults}</span>
                  <button
                    onClick={() => setAdults(Math.min(9, adults + 1))}
                    className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20"
                  >+</button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100">
                <div>
                  <div className="font-bold text-slate-900">เด็ก</div>
                  <div className="text-xs text-slate-400">อายุ 2-11 ปี</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${children <= 0 ? 'bg-slate-100 text-slate-300' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    disabled={children <= 0}
                  >-</button>
                  <span className="font-bold text-slate-900 w-4 text-center">{children}</span>
                  <button
                    onClick={() => setChildren(Math.min(9, children + 1))}
                    className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20"
                  >+</button>
                </div>
              </div>
            </div>

            {/* Cabin Class */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-slate-900 mb-3">ชั้นที่นั่ง</h3>
              <div className="flex gap-2">
                {['Economy', 'Business', 'First'].map((cls) => (
                  <button
                    key={cls}
                    onClick={() => setCabinClass(cls as any)}
                    className={`flex-1 py-3 px-2 rounded-xl text-sm font-bold transition-all border ${cabinClass === cls
                      ? 'bg-primary text-white border-primary shadow-glow'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                      }`}
                  >
                    {getCabinClassLabel(cls)}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowPassengerModal(false)}
              className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-glow active:scale-[0.98] transition-transform"
            >
              ยืนยัน
            </button>
          </div>
        </div>
      )}
      {/* Calendar Modal */}
      <CalendarModal
        isOpen={showCalendarModal !== null}
        onClose={() => setShowCalendarModal(null)}
        onSelect={handleDateSelect}
        title={showCalendarModal === 'departure' ? 'เลือกวันเดินทางไป' : 'เลือกวันเดินทางกลับ'}
        initialDate={showCalendarModal === 'departure' ? departureDate : returnDate}
      />
    </div>
  );
};