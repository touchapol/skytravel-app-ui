import React, { useState, useEffect } from 'react';
import { ArrowLeft, Bell, Calendar, CheckCircle, Clock, Info, Tag, Ticket, AlertTriangle } from 'lucide-react';

interface NotificationsScreenProps {
    onBack: () => void;
}

interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    type: 'PROMO' | 'REMINDER' | 'SYSTEM' | 'ALERT';
    read: boolean;
}

const mockNotifications: Notification[] = [
    { id: '1', title: 'ส่วนลดพิเศษ! บินเหนือลด 20%', message: 'จองตั๋วเครื่องบินไปเชียงใหม่ เชียงราย วันนี้ ลดทันที 20% สำหรับสมาชิก', time: '2 นาทีที่แล้ว', type: 'PROMO', read: false },
    { id: '2', title: 'เตือนความจำ: เช็คอินเที่ยวบินพรุ่งนี้', message: 'เที่ยวบิน TG102 ของคุณพร้อมให้เช็คอินแล้ว กรุณาเช็คอินล่วงหน้า 24 ชม.', time: '1 ชั่วโมงที่แล้ว', type: 'REMINDER', read: false },
    { id: '3', title: 'ยินดีต้อนรับสมาชิกใหม่', message: 'ขอบคุณที่สมัครสมาชิก SkyTravel รับคะแนนสะสมฟรี 500 คะแนน', time: '1 วันที่แล้ว', type: 'SYSTEM', read: true },
    { id: '4', title: 'การเปลี่ยนแปลงเวลาเที่ยวบิน', message: 'เที่ยวบิน PG275 มีการเปลี่ยนแปลงเวลาออกเดินทางจาก 14:15 เป็น 14:30', time: '2 วันที่แล้ว', type: 'ALERT', read: true },
    { id: '5', title: 'โปรโมชั่น Flash Sale!', message: 'ตั๋วเครื่องบินราคาเริ่มต้น 990 บาท เฉพาะ 3 ชั่วโมงนี้เท่านั้น', time: '3 วันที่แล้ว', type: 'PROMO', read: true },
    { id: '6', title: 'ใบเสร็จรับเงินอิเล็กทรอนิกส์', message: 'ใบเสร็จรับเงินสำหรับการจอง #BK88992 ได้ถูกส่งไปยังอีเมลของคุณแล้ว', time: '4 วันที่แล้ว', type: 'SYSTEM', read: true },
    { id: '7', title: 'สะสมไมล์ครบกำหนด', message: 'คะแนนสะสม 1,000 คะแนนของคุณจะหมดอายุในวันที่ 31 ธ.ค. นี้', time: '5 วันที่แล้ว', type: 'REMINDER', read: true },
    { id: '8', title: 'อัพเดทนโยบายความเป็นส่วนตัว', message: 'เรามีการปรับปรุงนโยบายความเป็นส่วนตัวเพื่อให้ดียิ่งขึ้น', time: '1 สัปดาห์ที่แล้ว', type: 'SYSTEM', read: true },
    { id: '9', title: 'ดีลที่พักราคาพิเศษ', message: 'จองโรงแรมในเครือ SkyHotel รับส่วนลด 15% เมื่อจองผ่านแอป', time: '1 สัปดาห์ที่แล้ว', type: 'PROMO', read: true },
    { id: '10', title: 'ยืนยันการจองสำเร็จ', message: 'การจองเที่ยวบินไปภูเก็ตของคุณได้รับการยืนยันแล้ว', time: '2 สัปดาห์ที่แล้ว', type: 'SYSTEM', read: true },
];

const getIcon = (type: Notification['type']) => {
    switch (type) {
        case 'PROMO': return <Tag size={20} className="text-blue-600" />;
        case 'REMINDER': return <Clock size={20} className="text-orange-600" />;
        case 'SYSTEM': return <Info size={20} className="text-emerald-600" />;
        case 'ALERT': return <AlertTriangle size={20} className="text-red-600" />;
        default: return <Bell size={20} className="text-slate-600" />;
    }
};

const getBgColor = (type: Notification['type']) => {
    switch (type) {
        case 'PROMO': return 'bg-blue-100';
        case 'REMINDER': return 'bg-orange-100';
        case 'SYSTEM': return 'bg-emerald-100';
        case 'ALERT': return 'bg-red-100';
        default: return 'bg-slate-100';
    }
};

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ onBack }) => {
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
                <h1 className="text-xl font-bold text-slate-900">การแจ้งเตือนทั้งหมด</h1>
            </header>

            <main className="flex-1 overflow-y-auto no-scrollbar p-6">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-slate-400 text-sm font-medium">กำลังโหลดการแจ้งเตือน...</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {mockNotifications.map(notification => (
                            <div
                                key={notification.id}
                                className={`flex gap-4 p-4 rounded-2xl border transition-colors ${notification.read ? 'bg-white border-slate-100' : 'bg-blue-50/50 border-blue-100'}`}
                            >
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${getBgColor(notification.type)}`}>
                                    {getIcon(notification.type)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className={`font-bold text-sm leading-snug ${notification.read ? 'text-slate-800' : 'text-slate-900'}`}>{notification.title}</h3>
                                        {!notification.read && <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0 ml-2"></div>}
                                    </div>
                                    <p className="text-xs text-slate-500 mb-2 leading-relaxed">{notification.message}</p>
                                    <p className="text-[10px] font-medium text-slate-400">{notification.time}</p>
                                </div>
                            </div>
                        ))}

                        <div className="text-center py-6">
                            <p className="text-xs text-slate-400">ไม่มีการแจ้งเตือนเก่ากว่านี้</p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};
