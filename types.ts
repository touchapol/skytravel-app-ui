import { LucideIcon } from "lucide-react";

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  colorClass: string;
  iconBgClass: string;
}

export interface DealItem {
  id: string;
  city: string;
  country: string; // or trip type
  price: string;
  discount?: string;
  image: string;
}

export interface SearchHistoryItem {
  id: string;
  fromCode: string;
  toCode: string;
  image: string;
}

export type Screen = 'HOME' | 'SEARCH' | 'MY_TRIPS' | 'CHECK_IN' | 'FLIGHT_STATUS' | 'NOTIFICATIONS' | 'SEARCH_RESULT' | 'BOOKING' | 'PAYMENT';

export interface Flight {
  id: string;
  airline: string;
  airlineLogo: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  fromCode: string;
  toCode: string;
}