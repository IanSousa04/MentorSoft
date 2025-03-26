import React from 'react';
import { Menu, Home, Users, Settings, MessageSquare, BarChart3 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  active: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, text, active }) => (
  <Link
    to={to}
    className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
      active
        ? 'bg-blue-100 text-blue-700'
        : 'hover:bg-gray-100 text-gray-700'
    }`}
  >
    {icon}
    <span>{text}</span>
  </Link>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 flex" >
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <Menu className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-800">MentorSoft</h1>
          </div>
        </div>
        <nav className="p-4 space-y-2">
          <NavItem
            to="/"
            icon={<Home className="w-5 h-5" />}
            text="Início"
            active={location.pathname === '/'}
          />
          <NavItem
            to="/treinadores"
            icon={<Users className="w-5 h-5" />}
            text="Treinadores"
            active={location.pathname === '/treinadores'}
          />
          <NavItem
            to="/configuracao"
            icon={<Settings className="w-5 h-5" />}
            text="Configuração"
            active={location.pathname === '/configuracao'}
          />
          <NavItem
            to="/chat"
            icon={<MessageSquare className="w-5 h-5" />}
            text="Chat"
            active={location.pathname === '/chat'}
          />
          <NavItem
            to="/relatorio"
            icon={<BarChart3 className="w-5 h-5" />}
            text="Relatório"
            active={location.pathname === '/relatorio'}
          />
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
};

export default Layout