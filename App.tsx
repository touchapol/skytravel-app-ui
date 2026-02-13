import React, { useState } from 'react';
import { HomeScreen } from './screens/HomeScreen';
import { SearchScreen } from './screens/SearchScreen';
import { SearchResultScreen } from './screens/SearchResultScreen';
import { BookingScreen } from './screens/BookingScreen';
import { PaymentScreen } from './screens/PaymentScreen';
import { MyTripsScreen } from './screens/MyTripsScreen';
import { CheckInScreen } from './screens/CheckInScreen';
import { FlightStatusScreen } from './screens/FlightStatusScreen';
import { NotificationsScreen } from './screens/NotificationsScreen';
import { Screen, Flight } from './types';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('HOME');
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  const handleSelectFlight = (flight: Flight) => {
    setSelectedFlight(flight);
    setCurrentScreen('BOOKING');
  };

  const handleBookingSuccess = () => {
    setCurrentScreen('MY_TRIPS');
    setSelectedFlight(null);
  };

  return (
    <div className="md:min-h-screen w-full md:bg-surface md:flex md:items-center md:justify-center md:p-4 md:lg:p-8 h-full bg-surface">
      {/* iPhone 17 Pro Max Frame - Only visible on desktop (md+) */}
      {/* Titanium Natural Finish - Thinner Bezel */}
      <div className="relative w-full h-full md:w-auto md:h-[90vh] md:max-h-[960px] md:aspect-[440/956] md:bg-black md:rounded-[4rem] md:shadow-[0_0_0_2px_#4b4b4b,0_0_0_6px_#272729,0_30px_60px_-15px_rgba(0,0,0,0.6)] md:overflow-hidden md:border-[4px] md:border-[#363636]">

        {/* Dynamic Island Capsule - Hidden on mobile */}
        <div className="hidden md:flex absolute top-3 left-1/2 -translate-x-1/2 w-[100px] h-[30px] bg-black rounded-full z-50 justify-end items-center pr-2 shadow-sm pointer-events-none">
          {/* Camera/Sensor visualization */}
          <div className="w-2.5 h-2.5 rounded-full bg-[#1a1a1a]/80 backdrop-blur-sm"></div>
        </div>

        {/* Screen Content */}
        {/* On desktop, we scale the content to 92% to simulate higher DPI/smaller UI, and adjust width/height to compensate */}
        <div className="w-full h-full bg-surface relative overflow-hidden md:rounded-[3.5rem] md:origin-top-left md:scale-[0.92] md:w-[108.7%] md:h-[108.7%]">
          {currentScreen === 'HOME' && (
            <HomeScreen onNavigate={(screen) => setCurrentScreen(screen)} />
          )}
          {currentScreen === 'SEARCH' && (
            <SearchScreen
              onBack={() => setCurrentScreen('HOME')}
              onSearch={() => setCurrentScreen('SEARCH_RESULT')}
            />
          )}
          {currentScreen === 'SEARCH_RESULT' && (
            <SearchResultScreen
              onBack={() => setCurrentScreen('SEARCH')}
              onSelectFlight={handleSelectFlight}
            />
          )}
          {currentScreen === 'BOOKING' && selectedFlight && (
            <BookingScreen
              onBack={() => setCurrentScreen('SEARCH_RESULT')}
              onProceed={() => setCurrentScreen('PAYMENT')}
              flight={selectedFlight}
            />
          )}
          {currentScreen === 'PAYMENT' && selectedFlight && (
            <PaymentScreen
              onBack={() => setCurrentScreen('BOOKING')}
              onSuccess={handleBookingSuccess}
              flight={selectedFlight}
            />
          )}
          {currentScreen === 'MY_TRIPS' && (
            <MyTripsScreen onBack={() => setCurrentScreen('HOME')} />
          )}
          {currentScreen === 'CHECK_IN' && (
            <CheckInScreen onBack={() => setCurrentScreen('HOME')} />
          )}
          {currentScreen === 'FLIGHT_STATUS' && (
            <FlightStatusScreen onBack={() => setCurrentScreen('HOME')} />
          )}
          {currentScreen === 'NOTIFICATIONS' && (
            <NotificationsScreen onBack={() => setCurrentScreen('HOME')} />
          )}

          {/* Home Indicator - Hidden on mobile */}
          <div className="hidden md:block absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-900/20 rounded-full z-50"></div>
        </div>
      </div>
    </div>
  );
}