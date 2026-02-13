import React, { useState } from 'react';
import { ArrowLeft, CreditCard, CheckCircle, Loader2, QrCode } from 'lucide-react';
import { Flight } from '../types';

interface PaymentScreenProps {
    onBack: () => void;
    onSuccess: () => void;
    flight: Flight;
}

export const PaymentScreen: React.FC<PaymentScreenProps> = ({ onBack, onSuccess, flight }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [method, setMethod] = useState<'card' | 'qr'>('card');

    const handlePay = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => {
                onSuccess();
            }, 2000);
        }, 2000);
    };

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center h-full bg-white px-6 animate-in fade-in duration-500">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-6 animate-bounce">
                    <CheckCircle size={48} />
                </div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">ชำระเงินสำเร็จ!</h1>
                <p className="text-slate-500 text-center">ขอบคุณที่ใช้บริการ Skytravel<br />ตั๋วเครื่องบินของคุณถูกส่งไปยังอีเมลแล้ว</p>
            </div>
        );
    }

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
                <h1 className="text-lg font-bold text-slate-900 tracking-tight">ชำระเงิน</h1>
                <div className="w-10"></div>
            </header>

            <main className="flex-1 overflow-y-auto no-scrollbar px-6 pb-32 z-10">
                {/* Amount Card */}
                <div className="bg-gradient-to-br from-primary to-blue-600 rounded-3xl p-6 shadow-glow mb-6 text-white text-center">
                    <div className="text-sm font-medium opacity-80 mb-1">ยอดชำระทั้งหมด</div>
                    <div className="text-4xl font-bold">฿{flight.price.toLocaleString()}</div>
                </div>

                {/* Payment Methods */}
                <h2 className="text-sm font-bold text-slate-900 mb-3 px-1">เลือกช่องทางชำระเงิน</h2>
                <div className="space-y-3 mb-6">
                    <button
                        onClick={() => setMethod('card')}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${method === 'card' ? 'bg-white border-primary shadow-md' : 'bg-white border-slate-100 opacity-70 hover:opacity-100'
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <CreditCard size={24} />
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-slate-900">บัตรเครดิต / เดบิต</div>
                                <div className="text-xs text-slate-400">Visa, Mastercard, JCB</div>
                            </div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === 'card' ? 'border-primary' : 'border-slate-300'}`}>
                            {method === 'card' && <div className="w-3 h-3 rounded-full bg-primary"></div>}
                        </div>
                    </button>

                    <button
                        onClick={() => setMethod('qr')}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${method === 'qr' ? 'bg-white border-primary shadow-md' : 'bg-white border-slate-100 opacity-70 hover:opacity-100'
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <QrCode size={24} />
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-slate-900">Thai QR Payment</div>
                                <div className="text-xs text-slate-400">สแกนจ่ายได้ทุกธนาคาร</div>
                            </div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === 'qr' ? 'border-primary' : 'border-slate-300'}`}>
                            {method === 'qr' && <div className="w-3 h-3 rounded-full bg-primary"></div>}
                        </div>
                    </button>
                </div>
            </main>

            {/* Sticky Bottom Action */}
            <div className="absolute bottom-0 left-0 w-full bg-white border-t border-slate-100 p-6 z-20 rounded-t-[2rem] shadow-up">
                <button
                    onClick={handlePay}
                    disabled={loading}
                    className="w-full bg-primary hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-xl shadow-glow transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? <Loader2 size={24} className="animate-spin" /> : 'ยืนยันการชำระเงิน'}
                </button>
            </div>
        </div>
    );
};
