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
    <div className="w-full h-full relative bg-surface text-slate-800 font-sans">
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
    </div>
  );
}