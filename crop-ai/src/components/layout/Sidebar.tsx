import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { Icons } from '../ui/icons';

const navItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Icons.layoutDashboard,
  },
  {
    title: 'Diagnose',
    href: '/diagnose',
    icon: Icons.scanSearch,
  },
  {
    title: 'History',
    href: '/history',
    icon: Icons.history,
  },
  {
    title: 'Alerts',
    href: '/alerts',
    icon: Icons.bell,
    badge: '3',
  },
  {
    title: 'Crops',
    href: '/crops',
    icon: Icons.wheat,
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: Icons.barChart,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Icons.settings,
  },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="hidden border-r bg-muted/40 md:block w-64">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <Icons.logo className="h-6 w-6 text-green-600" />
            <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              CropAI
            </span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 transition-all',
                    isActive
                      ? 'bg-muted text-foreground'
                      : 'text-muted-foreground hover:text-foreground',
                    'group relative'
                  )}
                >
                  <Icon className={cn(
                    'h-5 w-5',
                    isActive ? 'text-green-600' : 'group-hover:text-green-600'
                  )} />
                  {item.title}
                  {item.badge && (
                    <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <div className="rounded-lg bg-muted p-4">
            <h3 className="font-medium text-sm mb-2">Need help?</h3>
            <p className="text-xs text-muted-foreground mb-3">
              Our support team is here to help you with any questions.
            </p>
            <button className="w-full text-xs text-green-600 hover:underline">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
