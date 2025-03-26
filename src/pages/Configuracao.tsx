import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { treinadores, perguntas as perguntasData } from '../data/mockData';
import { Pergunta } from '../types';

const Configuracao: React.FC = () => {
  const [treinadorSelecionado, setTreinadorSelecionado] = useState('');
  const [perguntas, setPerguntas] = useState<Pergunta[]>(perguntasData);
  const [novaPergunta, setNovaPergunta] = useState('');

  const handleAdicionarPergunta = () => {
    if (novaPergunta && treinadorSelecionado) {
      const novaPerguntaObj: Pergunta = {
        id: (perguntas.length + 1).toString(),
        texto: novaPergunta,
        treinadorId: treinadorSelecionado,
      };
      setPerguntas([...perguntas, novaPerguntaObj]);
      setNovaPergunta('');
    }
  };

  const handleExcluirPergunta = (id: string) => {
    setPerguntas(perguntas.filter(p => p.id !== id));
  };

  const perguntasFiltradas = perguntas.filter(
    p => p.treinadorId === treinadorSelecionado
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Configuração do Treinamento</h1>
        <p className="text-gray-600 mt-2">Configure as perguntas para cada treinador</p>
      </div>

      {/* Seleção de Treinador */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Selecionar Treinador</h2>
        <select
          value={treinadorSelecionado}
          onChange={(e) => setTreinadorSelecionado(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Selecione um treinador...</option>
          {treinadores.map((treinador) => (
            <option key={treinador.id} value={treinador.id}>
              {treinador.nome}
            </option>
          ))}
        </select>
      </div>

      {/* Adicionar Pergunta */}
      {treinadorSelecionado && (
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Adicionar Pergunta</h2>
          <div className="flex space-x-3">
            <input
              type="text"
              value={novaPergunta}
              onChange={(e) => setNovaPergunta(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Digite a pergunta..."
            />
            <button
              onClick={handleAdicionarPergunta}
              disabled={!novaPergunta}
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar</span>
            </button>
          </div>
        </div>
      )}

      {/* Lista de Perguntas */}
      {treinadorSelecionado && (
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Perguntas Cadastradas</h2>
          {perguntasFiltradas.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              Nenhuma pergunta cadastrada para este treinador.
            </p>
          ) : (
            <ul className="space-y-3">
              {perguntasFiltradas.map((pergunta) => (
                <li
                  key={pergunta.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-gray-800">{pergunta.texto}</span>
                  <button
                    onClick={() => handleExcluirPergunta(pergunta.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Configuracao;