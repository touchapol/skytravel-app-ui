import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface CalendarModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (date: string) => void;
    title: string;
    initialDate?: string;
}

const ThaiMonths = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
];

const ThaiWeekdays = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];

export const CalendarModal: React.FC<CalendarModalProps> = ({ isOpen, onClose, onSelect, title, initialDate }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    useEffect(() => {
        if (isOpen) {
            if (initialDate) {
                const date = new Date(initialDate);
                setCurrentDate(date);
                setSelectedDate(date);
            } else {
                setCurrentDate(new Date());
                setSelectedDate(null);
            }
        }
    }, [isOpen, initialDate]);

    if (!isOpen) return null;

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const handleDateClick = (day: number) => {
        const newDate = new Date(year, month, day);
        // Format as YYYY-MM-DD for consistency
        const formattedDate = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}-${String(newDate.getDate()).padStart(2, '0')}`;
        onSelect(formattedDate);
        onClose();
    };

    const renderDays = () => {
        const days = [];
        // Empty cells for days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
        }

        // Days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            const isSelected = selectedDate &&
                selectedDate.getDate() === i &&
                selectedDate.getMonth() === month &&
                selectedDate.getFullYear() === year;

            const isToday = new Date().getDate() === i &&
                new Date().getMonth() === month &&
                new Date().getFullYear() === year;

            days.push(
                <button
                    key={i}
                    onClick={() => handleDateClick(i)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all
            ${isSelected ? 'bg-primary text-white shadow-lg scale-110' : 'hover:bg-slate-100 text-slate-700'}
            ${isToday && !isSelected ? 'text-primary font-bold bg-primary/10' : ''}
          `}
                >
                    {i}
                </button>
            );
        }
        return days;
    };

    return (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end justify-center animate-in fade-in duration-200">
            <div className="bg-white w-full rounded-t-[2rem] p-6 animate-in slide-in-from-bottom duration-300 pb-10">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-slate-900">{title}</h2>
                    <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6 px-2">
                    <button onClick={handlePrevMonth} className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors">
                        <ChevronLeft size={24} />
                    </button>
                    <div className="text-lg font-bold text-slate-800">
                        {ThaiMonths[month]} {year + 543}
                    </div>
                    <button onClick={handleNextMonth} className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors">
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* Weekdays */}
                <div className="grid grid-cols-7 mb-2 text-center">
                    {ThaiWeekdays.map(day => (
                        <div key={day} className="text-xs font-bold text-slate-400 py-2">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-y-2 justify-items-center">
                    {renderDays()}
                </div>
            </div>
        </div>
    );
};
