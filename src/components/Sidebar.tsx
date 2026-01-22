'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MenuItem {
  label: string;
  href: string;
  icon: string;
}

const menuItems: MenuItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: '📊' },
  { label: 'Products', href: '/dashboard/products', icon: '📦' },
  { label: 'Categories', href: '/dashboard/categories', icon: '📁' },
  { label: 'Orders', href: '/dashboard/orders', icon: '🛒' },
  { label: 'Customers', href: '/dashboard/customers', icon: '👥' },
  { label: 'Analytics', href: '/dashboard/analytics', icon: '📈' },
  { label: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          w-64 bg-bg-card border-r border-border-light min-h-screen fixed left-0 top-0 z-30 flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-6 border-b border-border-light flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">SmartEcom</h1>
            <p className="text-sm text-text-secondary mt-1">Admin Dashboard</p>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onClose()}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200
                  ${
                    active
                      ? 'bg-bg-selected text-primary shadow-sm'
                      : 'text-text-primary hover:bg-bg-hover hover:text-text-primary hover:shadow-sm'
                  }
                `}
              >
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border-light">
          <div className="px-4 py-3 bg-bg-alt rounded-lg">
            <p className="text-xs text-text-muted">Version 1.0.0</p>
            <p className="text-xs text-text-muted mt-1">© 2026 SmartEcom</p>
          </div>
        </div>
      </aside>
    </>
  );
}
