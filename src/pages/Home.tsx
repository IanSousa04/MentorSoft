import React from 'react';
import { Link } from 'react-router-dom';
import { Users, MessageSquare, Settings, BarChart3 } from 'lucide-react';

const Card: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
}> = ({ title, description, icon, to }) => (
  <Link
    to={to}
    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex items-center space-x-4">
      <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  </Link>
);

const Home: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Bem-vindo ao MentorSoft</h1>
        <p className="text-gray-600 mt-2">
          Plataforma de treinamento interativo com Inteligência Artificial.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          title="Gerenciar Treinadores"
          description="Crie e gerencie seus treinadores IA"
          icon={<Users className="w-6 h-6" />}
          to="/treinadores"
        />
        <Card
          title="Configurar Treinamento"
          description="Configure as perguntas e parâmetros"
          icon={<Settings className="w-6 h-6" />}
          to="/configuracao"
        />
        <Card
          title="Iniciar Chat"
          description="Comece seu treinamento interativo"
          icon={<MessageSquare className="w-6 h-6" />}
          to="/chat"
        />
        <Card
          title="Ver Relatórios"
          description="Acompanhe seu desempenho"
          icon={<BarChart3 className="w-6 h-6" />}
          to="/relatorio"
        />
      </div>
    </div>
  );
};

export default Home;