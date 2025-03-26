import React from 'react';
import { relatorio } from '../data/mockData';
import { CheckCircle, XCircle, Clock, BarChart } from 'lucide-react';

const Relatorio: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Relatório de Desempenho</h1>
        <p className="text-gray-600 mt-2">Acompanhe seu progresso no treinamento</p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
              <BarChart className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pontuação</p>
              <p className="text-2xl font-bold text-gray-800">{relatorio.pontuacao}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg text-green-600">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Respostas Corretas</p>
              <p className="text-2xl font-bold text-gray-800">
                {relatorio.respostasCorretas}/{relatorio.totalPerguntas}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-red-100 rounded-lg text-red-600">
              <XCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Respostas Incorretas</p>
              <p className="text-2xl font-bold text-gray-800">
                {relatorio.totalPerguntas - relatorio.respostasCorretas}/{relatorio.totalPerguntas}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Tempo Total</p>
              <p className="text-2xl font-bold text-gray-800">{relatorio.tempoTotal}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Detalhado */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Feedback Detalhado</h2>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-700">{relatorio.feedback}</p>
        </div>
      </div>

      {/* Gráfico de Progresso */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Progresso do Treinamento</h2>
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600"
            style={{ width: `${relatorio.pontuacao}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-sm text-gray-500">
          <span>0%</span>
          <span>{relatorio.pontuacao}% concluído</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};

export default Relatorio;