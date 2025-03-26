import React from "react";
import { Link } from "react-router-dom";
import { People, Chat, Settings, BarChart } from "@mui/icons-material";
import {
  Box,
  Card as MUICard,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";

const Card: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  disabled?: boolean; // Adicionando a propriedade disabled
}> = ({ title, description, icon, to, disabled }) => {
  return (
    <div>
      {!disabled ? (
        <Link to={to} style={{ textDecoration: 'none' }}>
          <MUICard
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: 3,
              borderRadius: 2,
              boxShadow: 1,
              transition: 'box-shadow 0.3s ease',
              '&:hover': {
                boxShadow: 3, // Aplica o hover quando não está desabilitado
              },
              backgroundColor: 'white',
              cursor: 'pointer',
            }}
          >
            <Box
              sx={{
                padding: 2,
                backgroundColor: '#E3F2FD',
                borderRadius: 2,
                marginRight: 2,
              }}
            >
              {icon}
            </Box>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {description}
              </Typography>
            </CardContent>
          </MUICard>
        </Link>
      ) : (
        <MUICard
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: 3,
            borderRadius: 2,
            boxShadow: 1,
            backgroundColor: '#f5f5f5', // Cor de fundo desabilitada
            cursor: 'not-allowed', // Cursor de não permitido
          }}
        >
          <Box
            sx={{
              padding: 2,
              backgroundColor: '#E3F2FD',
              borderRadius: 2,
              marginRight: 2,
            }}
          >
            {icon}
          </Box>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.disabled' }}>
              {title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.disabled' }}>
              {description}
            </Typography>
          </CardContent>
        </MUICard>
      )}
    </div>
  )}

const Home: React.FC = () => {
  return (
    <Box sx={{ space: 4 }}>
      <Box sx={{ marginBottom: 4 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "text.primary" }}
        >
          Bem-vindo ao MentorSoft!
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "text.secondary", marginTop: 1 }}
        >
          Plataforma de treinamento interativo com Inteligência Artificial.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card
            title="Gerenciar Treinadores"
            description="Crie e gerencie seus treinadores IA"
            icon={<People sx={{ fontSize: 30, color: "#1E88E5" }} />}
            to="/treinadores"
            disabled
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            title="Configurar Treinamento"
            description="Configure as perguntas e parâmetros"
            icon={<Settings sx={{ fontSize: 30, color: "#1E88E5" }} />}
            to="/configuracao"
            disabled
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            title="Iniciar Chat"
            description="Comece seu treinamento interativo"
            icon={<Chat sx={{ fontSize: 30, color: "#1E88E5" }} />}
            to="/chat"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            title="Ver Relatórios"
            description="Acompanhe seu desempenho"
            icon={<BarChart sx={{ fontSize: 30, color: "#1E88E5" }} />}
            to="/relatorio"
            disabled
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
