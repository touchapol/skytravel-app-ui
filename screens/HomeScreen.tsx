import React, { useState, useEffect } from 'react';
import { Bell, Plane, Ticket, QrCode, Clock, Search, ArrowRight } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { ServiceCard } from '../components/ServiceCard';
import { DealCard } from '../components/DealCard';
import { ServiceItem, DealItem, Screen } from '../types';

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

const services: ServiceItem[] = [
  { id: '1', title: 'จองตั๋ว', subtitle: 'ดีลสุดคุ้ม', icon: Plane, colorClass: 'text-blue-600', iconBgClass: 'bg-blue-100' },
  { id: '2', title: 'ทริปของฉัน', subtitle: 'เร็วๆ นี้: เชียงใหม่', icon: Ticket, colorClass: 'text-purple-600', iconBgClass: 'bg-purple-100' },
  { id: '3', title: 'เช็คอิน', subtitle: 'เที่ยวบิน TG102', icon: QrCode, colorClass: 'text-emerald-600', iconBgClass: 'bg-emerald-100' },
  { id: '4', title: 'สถานะเที่ยวบิน', subtitle: 'ติดตามเรียลไทม์', icon: Clock, colorClass: 'text-orange-600', iconBgClass: 'bg-orange-100' },
];

const deals: DealItem[] = [
  { id: '1', city: 'เชียงใหม่', country: 'ไป-กลับ • ชั้นประหยัด', price: '฿1,200', discount: '-20%', image: 'https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?q=80&w=600&auto=format&fit=crop' },
  { id: '2', city: 'ภูเก็ต', country: 'บินตรง • ธุรกิจ', price: '฿2,500', image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=600&auto=format&fit=crop' },
  { id: '3', city: 'เกาะสมุย', country: 'เที่ยวเดียว • เฟิร์สคลาส', price: '฿4,500', discount: '-15%', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop' },
  { id: '4', city: 'เพชรบูรณ์', country: 'ภูทับเบิก • ธรรมชาติ', price: '฿990', image: 'https://images.unsplash.com/photo-1598285586111-69736c2a4129?q=80&w=600&auto=format&fit=crop' },
  { id: '5', city: 'กระบี่', country: 'ทะเลแหวก • พักผ่อน', price: '฿1,800', discount: '-10%', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=600&auto=format&fit=crop' },
  { id: '6', city: 'พัทยา', country: 'ใกล้กรุง • สนุก', price: '฿800', image: 'https://images.unsplash.com/photo-1588647008169-2342c8d8b68b?q=80&w=600&auto=format&fit=crop' },
  { id: '7', city: 'หัวหิน', country: 'ชายหาด • ครอบครัว', price: '฿1,100', image: 'https://images.unsplash.com/photo-1505342200222-297746413207?q=80&w=600&auto=format&fit=crop' },
  { id: '8', city: 'อยุธยา', country: 'ประวัติศาสตร์ • วัด', price: '฿600', image: 'https://images.unsplash.com/photo-1559814467-3316e6328639?q=80&w=600&auto=format&fit=crop' },
  { id: '9', city: 'กาญจนบุรี', country: 'แพริมน้ำ • ธรรมชาติ', price: '฿1,300', discount: '-25%', image: 'https://images.unsplash.com/photo-1558963212-04fc6f582ba9?q=80&w=600&auto=format&fit=crop' },
  { id: '10', city: 'เขาใหญ่', country: 'อุทยาน • แคมป์ปิ้ง', price: '฿1,500', image: 'https://images.unsplash.com/photo-1588979355797-152e00ef7db4?q=80&w=600&auto=format&fit=crop' },
  { id: '11', city: 'สุโขทัย', country: 'มรดกโลก • สงบ', price: '฿1,200', image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=600&auto=format&fit=crop' },
  { id: '12', city: 'สุราษฎร์ธานี', country: 'เขื่อนเชี่ยวหลาน', price: '฿1,900', discount: '-5%', image: 'https://images.unsplash.com/photo-1586526135368-6c845b5c777a?q=80&w=600&auto=format&fit=crop' },
  { id: '13', city: 'ตรัง', country: 'หมูย่าง • ทะเล', price: '฿1,600', image: 'https://images.unsplash.com/photo-1579261074163-f2735d49646b?q=80&w=600&auto=format&fit=crop' },
  { id: '14', city: 'เลย', country: 'เชียงคาน • ภูเรือ', price: '฿1,400', image: 'https://images.unsplash.com/photo-1596706059624-9118c7c9c058?q=80&w=600&auto=format&fit=crop' },
  { id: '15', city: 'อุดรธานี', country: 'คำชะโนด • ทะเลบัวแดง', price: '฿1,100', image: 'https://images.unsplash.com/photo-1627993072230-1c3132bc3e68?q=80&w=600&auto=format&fit=crop' },
  { id: '16', city: 'ขอนแก่น', country: 'อีสาน • ไดโนเสาร์', price: '฿1,000', image: 'https://images.unsplash.com/photo-1626265738096-24e6c9a304e9?q=80&w=600&auto=format&fit=crop' },
  { id: '17', city: 'เชียงราย', country: 'วัดร่องขุ่น • ดอยตุง', price: '฿1,350', image: 'https://images.unsplash.com/photo-1550991959-192f4c40216b?q=80&w=600&auto=format&fit=crop' },
  { id: '18', city: 'น่าน', country: 'ปัว • บ่อเกลือ', price: '฿1,450', discount: '-12%', image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=600&auto=format&fit=crop' },
];

const heroDestinations = [
  { id: '1', title: 'สำรวจทะเลภูเก็ต', subtitle: 'ภูเก็ต, ไทย', tag: 'จุดหมายยอดฮิตประจำเดือน', image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=800&auto=format&fit=crop' },
  { id: '2', title: 'มหานครกรุงเทพฯ', subtitle: 'กรุงเทพฯ, ไทย', tag: 'เมืองที่ไม่เคยหลับ', image: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?q=80&w=800&auto=format&fit=crop' },
  { id: '3', title: 'มนต์เสน่ห์เชียงใหม่', subtitle: 'เชียงใหม่, ไทย', tag: 'วัฒนธรรมล้านนา', image: 'https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?q=80&w=800&auto=format&fit=crop' },
  { id: '4', title: 'เกาะสวรรค์สมุย', subtitle: 'สุราษฎร์ธานี, ไทย', tag: 'พักผ่อนสุดหรู', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop' },
];

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isLoadingBooking, setIsLoadingBooking] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroDestinations.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleBookFlight = () => {
    setIsLoadingBooking(true);
    setTimeout(() => {
      setIsLoadingBooking(false);
      onNavigate('SEARCH');
    }, 2000);
  };

  return (
    <div className="h-full bg-surface relative">
      {/* Loading Overlay */}
      {isLoadingBooking && (
        <div className="absolute inset-0 z-50 bg-white flex flex-col items-center justify-center animate-in fade-in duration-200">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 text-sm font-medium mt-4">กำลังเตรียมระบบจอง...</p>
        </div>
      )}

      {/* Main Scrollable Content */}
      <div className="h-full overflow-y-auto no-scrollbar pb-24">
        {/* Header */}
        <header className="pt-12 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-white shadow-sm overflow-hidden relative">
              <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <p className="text-slate-400 text-xs font-medium">สวัสดีครับ,</p>
              <h1 className="text-slate-900 font-bold text-lg">คุณนักเดินทาง</h1>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-600 hover:text-primary transition-colors relative"
            >
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-slate-900">การแจ้งเตือน</h3>
                  <span onClick={() => onNavigate('NOTIFICATIONS')} className="text-xs text-primary font-bold cursor-pointer hover:underline">อ่านทั้งหมด</span>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3 items-start p-2 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Ticket size={14} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800 leading-snug">ส่วนลดพิเศษ! บินเหนือลด 20%</p>
                      <p className="text-xs text-slate-400 mt-1">2 นาทีที่แล้ว</p>
                    </div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  </div>

                  <div className="flex gap-3 items-start p-2 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock size={14} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800 leading-snug">เตือนความจำ: เช็คอินเที่ยวบินพรุ่งนี้</p>
                      <p className="text-xs text-slate-400 mt-1">1 ชั่วโมงที่แล้ว</p>
                    </div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  </div>

                  <div className="flex gap-3 items-start p-2 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer opacity-70">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <QrCode size={14} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800 leading-snug">ยินดีต้อนรับสมาชิกใหม่</p>
                      <p className="text-xs text-slate-400 mt-1">1 วันที่แล้ว</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Hero Section Slider */}
        <div className="mt-8 px-6 relative">
          <div className="w-full h-64 rounded-[2rem] overflow-hidden relative shadow-lg group">
            {heroDestinations.map((dest, index) => (
              <div
                key={dest.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              >
                <img
                  src={dest.image}
                  alt={dest.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-20 left-6 text-white">
                  <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium border border-white/10">{dest.tag}</span>
                  <h2 className="text-3xl font-bold mt-2">{dest.title}</h2>
                  <div className="flex items-center gap-1 mt-1 opacity-90 text-sm">
                    <span className="w-1.5 h-1.5 bg-white rounded-full inline-block"></span>
                    {dest.subtitle}
                  </div>
                </div>
              </div>
            ))}

            {/* Dots Indicator */}
            <div className="absolute bottom-24 right-6 z-20 flex gap-1.5">
              {heroDestinations.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60'}`}
                />
              ))}
            </div>
          </div>

          {/* Floating Search Bar */}
          <div className="absolute -bottom-7 left-6 right-6 z-30">
            <button
              onClick={() => onNavigate('SEARCH')}
              className="w-full bg-white rounded-2xl p-2 shadow-soft flex items-center gap-4 pr-2 group transition-transform active:scale-[0.98]"
            >
              <div className="w-10 h-10 flex items-center justify-center text-slate-400">
                <Search size={20} />
              </div>
              <span className="flex-1 text-left text-slate-400 font-medium">จะไปเที่ยวไหนดี?</span>
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-glow group-hover:bg-blue-600 transition-colors">
                <ArrowRight size={20} />
              </div>
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mt-12 px-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900">บริการ</h2>
            <button className="text-primary text-sm font-bold">ดูทั้งหมด</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {services.map(service => (
              <ServiceCard
                key={service.id}
                item={service}
                onClick={() => {
                  if (service.id === '1') handleBookFlight();
                  if (service.id === '2') onNavigate('MY_TRIPS');
                  if (service.id === '3') onNavigate('CHECK_IN');
                  if (service.id === '4') onNavigate('FLIGHT_STATUS');
                }}
              />
            ))}
          </div>
        </div>

        {/* Deals Section */}
        <div className="mt-8 mb-4">
          <div className="px-6 mb-4">
            <h2 className="text-lg font-bold text-slate-900">ดีลยอดนิยม</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar px-6 pb-8">
            {deals.map(deal => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};