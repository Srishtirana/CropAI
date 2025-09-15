import * as React from 'react';
import { 
  Loader2, 
  Eye, 
  EyeOff, 
  ChevronDown, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  X, 
  Plus, 
  Minus, 
  Search, 
  SlidersHorizontal, 
  Filter, 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  Clock, 
  Crop, 
  Droplet, 
  Sun, 
  Moon,
  Cloud, 
  Thermometer, 
  Wind, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  CloudDrizzle, 
  CloudFog, 
  CloudHail, 
  CloudSun, 
  CloudMoon, 
  BarChart2, 
  Bell, 
  History as HistoryIcon, 
  LayoutDashboard, 
  ScanSearch, 
  Settings, 
  User, 
  LogOut, 
  Home, 
  HelpCircle, 
  PlusCircle, 
  ClipboardList, 
  AlertCircle, 
  Wheat, 
  BarChart,
  type LucideIcon
} from 'lucide-react';

// Create a type for our custom icons
type IconType = LucideIcon | React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;

// Re-export all icons for easier imports
export const Icons: Record<string, IconType> = {
  spinner: Loader2,
  eye: Eye,
  eyeOff: EyeOff,
  chevronDown: ChevronDown,
  chevronRight: ChevronRight,
  chevronLeft: ChevronLeft,
  check: Check,
  x: X,
  plus: Plus,
  minus: Minus,
  search: Search,
  sliders: SlidersHorizontal,
  filter: Filter,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  calendar: Calendar,
  clock: Clock,
  crop: Crop,
  droplet: Droplet,
  sun: Sun,
  moon: Moon,
  cloud: Cloud,
  thermometer: Thermometer,
  wind: Wind,
  cloudRain: CloudRain,
  cloudSnow: CloudSnow,
  cloudLightning: CloudLightning,
  cloudDrizzle: CloudDrizzle,
  cloudFog: CloudFog,
  cloudHail: CloudHail,
  cloudSun: CloudSun,
  cloudMoon: CloudMoon,
  
  // Additional icons used in the app
  dashboard: LayoutDashboard, // Using Lucide's LayoutDashboard
  scanSearch: ScanSearch,
  history: HistoryIcon,
  bell: Bell,
  wheat: Wheat,
  barChart: BarChart,
  barChart2: BarChart2,
  settings: Settings,
  user: User, // Using Lucide's User component
  logout: LogOut,
  home: Home,
  help: HelpCircle,
  plusCircle: PlusCircle,
  clipboardList: ClipboardList,
  alertCircle: AlertCircle,
  
  // Aliases for consistency
  layoutDashboard: LayoutDashboard,
  scan: ScanSearch,
  
  // Custom logo
  logo: React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  )),
  
  // Google icon
  google: React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M22.675 0h-21.35c-0.732 0-1.325 0.593-1.325 1.325v21.351c0 0.731 0.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463 0.099 2.795 0.143v3.24l-1.918 0.001c-1.504 0-1.795 0.715-1.795 1.763v2.313h3.587l-0.467 3.622h-3.12v9.293h6.116c0.73 0 1.323-0.593 1.323-1.325v-21.351c0-0.732-0.593-1.325-1.325-1.325z" />
    </svg>
  )),
  
  // Facebook icon
  facebook: React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M22.675 0h-21.35c-0.732 0-1.325 0.593-1.325 1.325v21.351c0 0.731 0.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463 0.099 2.795 0.143v3.24l-1.918 0.001c-1.504 0-1.795 0.715-1.795 1.763v2.313h3.587l-0.467 3.622h-3.12v9.293h6.116c0.73 0 1.323-0.593 1.323-1.325v-21.351c0-0.732-0.593-1.325-1.325-1.325z" />
    </svg>
  )),
  
  // Apple icon
  apple: React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M18.71 19.5c-.83 1.24-1.85 1.62-3.29 1.62-1.48 0-2.34-.59-3.42-.59-1.12 0-2.14.6-3.42.6-1.36 0-2.5-1.32-3.33-2.55-1.24-1.82-1.64-4.02-1.68-4.14-.14-.7.17-1.38.7-1.72.5-.31 1.14-.23 1.62.19.32.29.72.76 1.21.76.41 0 .82-.24 1.31-.5.9-.48 1.83-1.21 2.26-2.33.1-.24.31-.42.57-.42.07 0 .14.01.2.04.6.2 1.18.15 1.63-.09.5-.27.91-.42 1.44-.42.44 0 .9.12 1.3.39.41.27.76.7 1.15 1.25-.9.52-1.36 1.28-1.36 2.31 0 1.01.54 1.73 1.3 2.27.26.18.56.33.87.46-.1.31-.21.62-.35.92zm-4.47-16.5c.08-.04.16-.05.24-.05.25 0 .49.1.67.28.19.19.29.44.29.7 0 .07-.01.14-.02.21-.03.11-.08.21-.14.31-.06.1-.14.19-.23.27-.17.15-.38.25-.61.28-.02 0-.04.01-.07.01-.23 0-.46-.09-.64-.27s-.28-.42-.29-.67c0-.05.01-.11.02-.16.02-.11.06-.22.11-.32.05-.1.12-.19.2-.27.19-.18.42-.28.67-.28.02 0 .05 0 .07.01z" />
    </svg>
  )),
  
  // Phone icon
  phone: React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )),
  
  // Mail icon
  mail: React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )),
  
  
  // Lock icon
  lock: React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )),
  
};
