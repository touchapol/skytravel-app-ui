import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, Plane } from 'lucide-react';

interface MyTripsScreenProps {
    onBack: () => void;
}

interface Trip {
    id: string;
    from: string;
    fromCode: string;
    to: string;
    toCode: string;
    date: string;
    time: string;
    flight: string;
    gate: string;
    seat: string;
    status: 'UPCOMING' | 'COMPLETED';
}

const mockTrips: Trip[] = [
    { id: '1', from: 'กรุงเทพฯ', fromCode: 'BKK', to: 'เชียงใหม่', toCode: 'CNX', date: '12 พ.ย. 2024', time: '10:30', flight: 'TG102', gate: 'A3', seat: '12A', status: 'UPCOMING' },
    { id: '2', from: 'กรุงเทพฯ', fromCode: 'BKK', to: 'ภูเก็ต', toCode: 'HKT', date: '25 ธ.ค. 2024', time: '14:15', flight: 'PG275', gate: 'B2', seat: '5F', status: 'UPCOMING' },
    { id: '3', from: 'เชียงใหม่', fromCode: 'CNX', to: 'กรุงเทพฯ', toCode: 'BKK', date: '5 ต.ค. 2024', time: '09:00', flight: 'TG103', gate: 'C1', seat: '14C', status: 'COMPLETED' },
    { id: '4', from: 'ภูเก็ต', fromCode: 'HKT', to: 'สมุย', toCode: 'USM', date: '12 ก.ย. 2024', time: '11:45', flight: 'PG255', gate: 'D4', seat: '2A', status: 'COMPLETED' },
    { id: '5', from: 'กรุงเทพฯ', fromCode: 'DMK', to: 'เชียงราย', toCode: 'CEI', date: '1 ส.ค. 2024', time: '07:20', flight: 'FD320', gate: 'E2', seat: '18D', status: 'COMPLETED' },
];

export const MyTripsScreen: React.FC<MyTripsScreenProps> = ({ onBack }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col h-full bg-surface relative">
            {/* Header */}
            <header className="px-6 pt-12 pb-4 flex items-center gap-4 z-10 bg-white shadow-sm">
                <button
                    onClick={onBack}
                    className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors"
                >
                    <ArrowLeft className="text-slate-800" size={24} />
                </button>
                <h1 className="text-xl font-bold text-slate-900">ทริปของฉัน</h1>
            </header>

            {/* Content */}
            <main className="flex-1 overflow-y-auto no-scrollbar p-6">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-slate-400 text-sm font-medium">กำลังโหลดข้อมูล...</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-2">เร็วๆ นี้</h2>
                        {mockTrips.filter(t => t.status === 'UPCOMING').map(trip => (
                            <TripCard key={trip.id} trip={trip} />
                        ))}

                        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide mt-6 mb-2">ที่ผ่านมา</h2>
                        {mockTrips.filter(t => t.status === 'COMPLETED').map(trip => (
                            <TripCard key={trip.id} trip={trip} isCompleted />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

const TripCard: React.FC<{ trip: Trip; isCompleted?: boolean }> = ({ trip, isCompleted }) => (
    <div className={`bg-white rounded-2xl p-5 shadow-sm border border-slate-100 relative overflow-hidden ${isCompleted ? 'opacity-70 grayscale-[0.5]' : ''}`}>
        {!isCompleted && <div className="absolute top-0 right-0 bg-emerald-100 text-emerald-600 px-3 py-1 rounded-bl-xl text-xs font-bold">Confirmed</div>}

        <div className="flex justify-between items-center mb-6">
            <div className="text-center w-16">
                <div className="text-2xl font-black text-slate-900">{trip.fromCode}</div>
                <div className="text-xs text-slate-500">{trip.from}</div>
            </div>

            <div className="flex-1 flex flex-col items-center px-4">
                <div className="flex items-center gap-2 text-slate-300 w-full justify-center">
                    <div className="h-[1px] bg-slate-200 flex-1"></div>
                    <Plane size={16} className={`${isCompleted ? 'text-slate-300' : 'text-primary'} rotate-90`} />
                    <div className="h-[1px] bg-slate-200 flex-1"></div>
                </div>
                <div className="text-xs text-slate-400 font-medium mt-1">{trip.flight}</div>
            </div>

            <div className="text-center w-16">
                <div className="text-2xl font-black text-slate-900">{trip.toCode}</div>
                <div className="text-xs text-slate-500">{trip.to}</div>
            </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <Calendar size={16} className="text-slate-400" />
                <span className="text-sm font-bold text-slate-700">{trip.date}</span>
            </div>
            <div className="flex items-center gap-2">
                <Clock size={16} className="text-slate-400" />
                <span className="text-sm font-bold text-slate-700">{trip.time}</span>
            </div>
        </div>

        <div className="mt-4 flex justify-between text-xs text-slate-500">
            <div>GATE: <span className="font-bold text-slate-900 text-sm">{trip.gate}</span></div>
            <div>SEAT: <span className="font-bold text-slate-900 text-sm">{trip.seat}</span></div>
        </div>
    </div>
);
