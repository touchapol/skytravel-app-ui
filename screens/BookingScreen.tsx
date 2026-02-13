import React, { useState } from 'react';
import { ArrowLeft, User, Luggage, CreditCard, ShieldCheck } from 'lucide-react';
import { Flight } from '../types';

interface BookingScreenProps {
    onBack: () => void;
    onProceed: () => void;
    flight: Flight;
}

export const BookingScreen: React.FC<BookingScreenProps> = ({ onBack, onProceed, flight }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        passport: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex flex-col h-full bg-surface relative">
            <div className="absolute top-0 left-0 w-full h-64 bg-primary/5 rounded-b-[3rem] -z-0"></div>

            {/* Header */}
            <header className="px-6 pt-12 pb-4 flex items-center justify-between z-10">
                <button
                    onClick={onBack}
                    className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-white/50 transition-colors"
                >
                    <ArrowLeft className="text-slate-800" size={24} />
                </button>
                <h1 className="text-lg font-bold text-slate-900 tracking-tight">ข้อมูลผู้โดยสาร</h1>
                <div className="w-10"></div>
            </header>

            <main className="flex-1 overflow-y-auto no-scrollbar px-6 pb-32 z-10">
                {/* Flight Summary Card */}
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <img src={flight.airlineLogo} alt={flight.airline} className="w-10 h-10 object-contain" />
                        <div>
                            <div className="font-bold text-slate-900">{flight.airline}</div>
                            <div className="text-xs text-slate-500">{flight.flightNumber} • {flight.duration}</div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <div>
                            <div className="font-bold text-slate-900">{flight.departureTime}</div>
                            <div className="text-xs text-slate-400">{flight.fromCode}</div>
                        </div>
                        <div className="h-[1px] flex-1 bg-slate-200 mx-3 relative">
                            <div className="absolute right-0 -top-1 w-2 h-2 rounded-full bg-slate-200"></div>
                        </div>
                        <div className="text-right">
                            <div className="font-bold text-slate-900">{flight.arrivalTime}</div>
                            <div className="text-xs text-slate-400">{flight.toCode}</div>
                        </div>
                    </div>
                </div>

                {/* Passenger Form */}
                <h2 className="text-sm font-bold text-slate-900 mb-3 px-1">รายละเอียดผู้เดินทาง</h2>
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-6 space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <User size={16} />
                        </div>
                        <span className="font-bold text-slate-800">ผู้ใหญ่ 1</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-400 uppercase">ชื่อจริง</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                                placeholder="เช่น Somchai"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-400 uppercase">นามสกุล</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                                placeholder="เช่น Jai-dee"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase">เลขหนังสือเดินทาง / บัตรประชาชน</label>
                        <input
                            type="text"
                            name="passport"
                            value={formData.passport}
                            onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                            placeholder="Passport / ID Card Number"
                        />
                    </div>
                </div>

                {/* Contact Info */}
                <h2 className="text-sm font-bold text-slate-900 mb-3 px-1">ข้อมูลติดต่อ</h2>
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-6 space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase">อีเมล</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                            placeholder="email@example.com"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase">เบอร์โทรศัพท์</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                            placeholder="0812345678"
                        />
                    </div>
                </div>

                {/* Add-ons Mock */}
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                    <div className="bg-white min-w-[140px] p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center gap-2">
                        <Luggage className="text-slate-400" />
                        <span className="text-xs font-bold text-slate-600">น้ำหนักกระเป๋า</span>
                        <span className="text-xs text-primary font-bold">+฿500</span>
                    </div>
                    <div className="bg-white min-w-[140px] p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center gap-2">
                        <ShieldCheck className="text-slate-400" />
                        <span className="text-xs font-bold text-slate-600">ประกันภัย</span>
                        <span className="text-xs text-primary font-bold">+฿350</span>
                    </div>
                </div>
            </main>

            {/* Sticky Bottom Action */}
            <div className="absolute bottom-0 left-0 w-full bg-white border-t border-slate-100 p-6 z-20 rounded-t-[2rem] shadow-up">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <div className="text-xs text-slate-400 font-bold mb-0.5">ราคารวม</div>
                        <div className="text-2xl font-bold text-primary">฿{flight.price.toLocaleString()}</div>
                    </div>
                    <button
                        onClick={onProceed}
                        className="bg-primary hover:bg-blue-700 text-white font-bold text-lg px-8 py-3 rounded-xl shadow-glow transition-all active:scale-[0.98] flex items-center gap-2"
                    >
                        ชำระเงิน <CreditCard size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};
