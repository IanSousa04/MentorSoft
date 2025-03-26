import React from 'react';
import { Home, Chat, Settings, BarChart, People } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  active: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, text, active }) => (
  <Link
    to={to}
    style={{
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      padding: '12px 16px',
      borderRadius: '8px',
      backgroundColor: active ? '#E3F2FD' : 'transparent',
      color: active ? '#1E88E5' : '#616161',
      transition: 'background-color 0.3s ease',
    }}
  >
    {icon}
    <Typography sx={{ marginLeft: 2 }}>{text}</Typography>
  </Link>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            borderRight: 0,
            backgroundColor: 'white',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ padding: 3, borderBottom: '1px solid #E0E0E0' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Home sx={{ color: '#1E88E5', fontSize: 30 }} />
            <Typography variant="h6" sx={{ marginLeft: 2, fontWeight: 'bold' }}>
              MentorSoft
            </Typography>
          </Box>
        </Box>
        <List>
          <NavItem
            to="/"
            icon={<Home />}
            text="Início"
            active={location.pathname === '/'}
          />
          {/* <NavItem
            to="/treinadores"
            icon={<People />}
            text="Treinadores"
            active={location.pathname === '/treinadores'}
          /> */}
          <NavItem
            to="/chat"
            icon={<Chat />}
            text="Chat"
            active={location.pathname === '/chat'}
          />
          {/* <NavItem
            to="/relatorio"
            icon={<BarChart />}
            text="Relatório"
            active={location.pathname === '/relatorio'}
          /> */}
        </List>
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, padding: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
