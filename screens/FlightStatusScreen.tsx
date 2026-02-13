import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plane, Search } from 'lucide-react';

interface FlightStatusScreenProps {
    onBack: () => void;
}

interface FlightStatus {
    id: string;
    flight: string;
    route: string;
    time: string;
    status: 'ON_TIME' | 'DELAYED' | 'BOARDING' | 'LANDED';
}

const mockStatuses: FlightStatus[] = [
    { id: '1', flight: 'TG102', route: 'BKK - CNX', time: '10:30', status: 'ON_TIME' },
    { id: '2', flight: 'PG275', route: 'BKK - HKT', time: '14:15', status: 'DELAYED' },
    { id: '3', flight: 'DD108', route: 'DMK - CEI', time: '09:00', status: 'LANDED' },
    { id: '4', flight: 'FD320', route: 'DMK - URT', time: '11:45', status: 'BOARDING' },
    { id: '5', flight: 'WE164', route: 'BKK - KBV', time: '13:20', status: 'ON_TIME' },
    { id: '6', flight: 'SL510', route: 'DMK - UBP', time: '15:00', status: 'ON_TIME' },
    { id: '7', flight: 'VZ120', route: 'BKK - CNX', time: '16:30', status: 'DELAYED' },
    { id: '8', flight: 'TG204', route: 'BKK - HKT', time: '17:45', status: 'ON_TIME' },
    { id: '9', flight: 'PG266', route: 'HKT - BKK', time: '18:10', status: 'ON_TIME' },
    { id: '10', flight: 'FD321', route: 'URT - DMK', time: '19:00', status: 'LANDED' },
];

const getStatusColor = (status: FlightStatus['status']) => {
    switch (status) {
        case 'ON_TIME': return 'bg-emerald-100 text-emerald-700';
        case 'DELAYED': return 'bg-red-100 text-red-700';
        case 'BOARDING': return 'bg-yellow-100 text-yellow-700';
        case 'LANDED': return 'bg-blue-100 text-blue-700';
        default: return 'bg-slate-100 text-slate-700';
    }
};

const getStatusText = (status: FlightStatus['status']) => {
    switch (status) {
        case 'ON_TIME': return 'ตรงเวลา';
        case 'DELAYED': return 'ล่าช้า';
        case 'BOARDING': return 'เรียกขึ้นเครื่อง';
        case 'LANDED': return 'ลงจอดแล้ว';
        default: return status;
    }
};

export const FlightStatusScreen: React.FC<FlightStatusScreenProps> = ({ onBack }) => {
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
                <h1 className="text-xl font-bold text-slate-900">สถานะเที่ยวบิน</h1>
            </header>

            <div className="px-6 py-4 bg-white z-10">
                <div className="bg-slate-100 rounded-xl flex items-center px-4 py-3 gap-3">
                    <Search size={20} className="text-slate-400" />
                    <input type="text" placeholder="ค้นหาเที่ยวบิน..." className="bg-transparent border-none outline-none text-slate-900 w-full placeholder:text-slate-400" />
                </div>
            </div>

            <main className="flex-1 overflow-y-auto no-scrollbar px-6 pb-6">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-slate-400 text-sm font-medium">กำลังค้นหาสถานะ...</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {mockStatuses.map(item => (
                            <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(item.status).replace('text-', 'bg-opacity-20 ')}`}>
                                        <Plane size={20} className={getStatusColor(item.status).split(' ')[1]} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900">{item.flight}</div>
                                        <div className="text-xs text-slate-500 font-medium">{item.route}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`text-xs font-bold px-2 py-1 rounded-lg mb-1 inline-block ${getStatusColor(item.status)}`}>
                                        {getStatusText(item.status)}
                                    </div>
                                    <div className="text-xs text-slate-400 font-mono">{item.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};
