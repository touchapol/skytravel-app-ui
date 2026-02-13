import React from 'react';
import { ArrowLeft, Filter, Clock, Plane } from 'lucide-react';
import { Flight } from '../types';

interface SearchResultScreenProps {
    onBack: () => void;
    onSelectFlight: (flight: Flight) => void;
}

const mockFlights: Flight[] = [
    {
        id: '1',
        airline: 'Thai Airways',
        airlineLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/Thai_Airways_Logo.svg/1200px-Thai_Airways_Logo.svg.png',
        flightNumber: 'TG 102',
        departureTime: '08:00',
        arrivalTime: '09:15',
        duration: '1h 15m',
        price: 2500,
        fromCode: 'BKK',
        toCode: 'CNX'
    },
    {
        id: '2',
        airline: 'Bangkok Airways',
        airlineLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fa/Bangkok_Airways_Logo.svg/1200px-Bangkok_Airways_Logo.svg.png',
        flightNumber: 'PG 215',
        departureTime: '10:30',
        arrivalTime: '11:45',
        duration: '1h 15m',
        price: 3200,
        fromCode: 'BKK',
        toCode: 'CNX'
    },
    {
        id: '3',
        airline: 'AirAsia',
        airlineLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/AirAsia_New_Logo.svg/1200px-AirAsia_New_Logo.svg.png',
        flightNumber: 'FD 3445',
        departureTime: '14:00',
        arrivalTime: '15:15',
        duration: '1h 15m',
        price: 1800,
        fromCode: 'DMK',
        toCode: 'CNX'
    },
    {
        id: '4',
        airline: 'Nok Air',
        airlineLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Nok_Air_logo.svg/1200px-Nok_Air_logo.svg.png',
        flightNumber: 'DD 8312',
        departureTime: '18:45',
        arrivalTime: '20:00',
        duration: '1h 15m',
        price: 1500,
        fromCode: 'DMK',
        toCode: 'CNX'
    }
];

export const SearchResultScreen: React.FC<SearchResultScreenProps> = ({ onBack, onSelectFlight }) => {
    return (
        <div className="flex flex-col h-full bg-surface relative">
            <div className="absolute top-0 left-0 w-full h-48 bg-primary/5 rounded-b-[3rem] -z-0"></div>

            {/* Header */}
            <header className="px-6 pt-12 pb-4 flex items-center justify-between z-10">
                <button
                    onClick={onBack}
                    className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-white/50 transition-colors"
                >
                    <ArrowLeft className="text-slate-800" size={24} />
                </button>
                <div className="text-center">
                    <h1 className="text-lg font-bold text-slate-900 tracking-tight">ผลการค้นหา</h1>
                    <p className="text-xs text-slate-500 font-medium">BKK - CNX • 12 พ.ย.</p>
                </div>
                <button className="w-10 h-10 -mr-2 rounded-full flex items-center justify-center hover:bg-white/50 transition-colors text-slate-800">
                    <Filter size={24} />
                </button>
            </header>

            {/* Flight List */}
            <main className="flex-1 overflow-y-auto no-scrollbar px-6 pb-32 z-10 pt-4">
                <div className="flex flex-col gap-4">
                    {mockFlights.map((flight) => (
                        <div
                            key={flight.id}
                            className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 relative overflow-hidden group hover:border-primary/30 transition-all active:scale-[0.98] cursor-pointer"
                            onClick={() => onSelectFlight(flight)}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-slate-50 p-2 flex items-center justify-center">
                                        <img src={flight.airlineLogo} alt={flight.airline} className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">{flight.airline}</h3>
                                        <p className="text-xs text-slate-400 font-medium">{flight.flightNumber}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-bold text-primary">฿{flight.price.toLocaleString()}</div>
                                    <div className="text-xs text-slate-400">ต่อคน</div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between relative">
                                <div className="text-center">
                                    <div className="text-lg font-bold text-slate-900">{flight.departureTime}</div>
                                    <div className="text-xs text-slate-400 font-medium">{flight.fromCode}</div>
                                </div>

                                <div className="flex-1 px-4 flex flex-col items-center">
                                    <div className="text-[10px] text-slate-400 font-medium mb-1 flex items-center gap-1">
                                        <Clock size={10} /> {flight.duration}
                                    </div>
                                    <div className="w-full h-[2px] bg-slate-100 relative">
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-1 rounded-full border border-slate-100 text-slate-300">
                                            <Plane size={12} className="rotate-90" />
                                        </div>
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                                    </div>
                                    <div className="text-[10px] text-slate-400 font-medium mt-1">บินตรง</div>
                                </div>

                                <div className="text-center">
                                    <div className="text-lg font-bold text-slate-900">{flight.arrivalTime}</div>
                                    <div className="text-xs text-slate-400 font-medium">{flight.toCode}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};
