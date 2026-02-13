import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, Clock } from 'lucide-react';

interface CheckInScreenProps {
    onBack: () => void;
}

interface Flight {
    id: string;
    from: string;
    fromCode: string;
    to: string;
    toCode: string;
    flight: string;
    date: string;
    time: string;
    status: 'OPEN' | 'CLOSED';
}

const mockCheckInFlights: Flight[] = [
    { id: '1', from: 'กรุงเทพฯ', fromCode: 'BKK', to: 'เชียงใหม่', toCode: 'CNX', flight: 'TG102', date: 'พรุ่งนี้', time: '10:30', status: 'OPEN' },
    { id: '2', from: 'กรุงเทพฯ', fromCode: 'BKK', to: 'ภูเก็ต', toCode: 'HKT', flight: 'PG275', date: 'พรุ่งนี้', time: '14:15', status: 'OPEN' },
    { id: '3', from: 'เชียงราย', fromCode: 'CEI', to: 'กรุงเทพฯ', toCode: 'BKK', flight: 'DD108', date: 'มะรืนนี้', time: '09:00', status: 'CLOSED' },
];

export const CheckInScreen: React.FC<CheckInScreenProps> = ({ onBack }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col h-full bg-surface relative">
            <header className="px-6 pt-12 pb-4 flex items-center gap-4 z-10 bg-white shadow-sm">
                <button
                    onClick={onBack}
                    className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors"
                >
                    <ArrowLeft className="text-slate-800" size={24} />
                </button>
                <h1 className="text-xl font-bold text-slate-900">เช็คอิน</h1>
            </header>

            <main className="flex-1 overflow-y-auto no-scrollbar p-6">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-slate-400 text-sm font-medium">กำลังโหลดเที่ยวบิน...</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-2">เที่ยวบินที่เปิดให้เช็คอิน</h2>
                        {mockCheckInFlights.map(flight => (
                            <div key={flight.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col gap-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="text-lg font-bold text-slate-900">{flight.flight}</div>
                                        <div className="text-sm text-slate-500">{flight.from} <span className="mx-1">✈</span> {flight.to}</div>
                                    </div>
                                    {flight.status === 'OPEN' ? (
                                        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                            <CheckCircle size={12} /> เปิด
                                        </span>
                                    ) : (
                                        <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                            <Clock size={12} /> รอเปิด
                                        </span>
                                    )}
                                </div>

                                <div className="flex justify-between items-center text-sm text-slate-600 bg-slate-50 p-3 rounded-xl">
                                    <span>{flight.date}</span>
                                    <span className="font-bold">{flight.time}</span>
                                </div>

                                <button
                                    disabled={flight.status !== 'OPEN'}
                                    className={`w-full py-3 rounded-xl font-bold text-white transition-all ${flight.status === 'OPEN' ? 'bg-primary shadow-glow active:scale-[0.98]' : 'bg-slate-300 cursor-not-allowed'}`}
                                >
                                    {flight.status === 'OPEN' ? 'เช็คอินตอนนี้' : 'ยังไม่เปิดให้เช็คอิน'}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};
