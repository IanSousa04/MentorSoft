import React, { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { treinadores as treinadoresData } from '../data/mockData';
import { Treinador } from '../types';

const Treinadores: React.FC = () => {
  const [treinadores, setTreinadores] = useState<Treinador[]>(treinadoresData);
  const [editando, setEditando] = useState<Treinador | null>(null);
  const [novoTreinador, setNovoTreinador] = useState({
    nome: '',
    prompt: '',
  });

  const handleSalvar = () => {
    if (editando) {
      setTreinadores(treinadores.map(t => 
        t.id === editando.id ? editando : t
      ));
      setEditando(null);
    } else if (novoTreinador.nome && novoTreinador.prompt) {
      const novoId = (treinadores.length + 1).toString();
      setTreinadores([...treinadores, {
        id: novoId,
        nome: novoTreinador.nome,
        prompt: novoTreinador.prompt,
        dataCriacao: new Date().toISOString().split('T')[0],
      }]);
      setNovoTreinador({ nome: '', prompt: '' });
    }
  };

  const handleExcluir = (id: string) => {
    setTreinadores(treinadores.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Gerenciar Treinadores</h1>
        <p className="text-gray-600 mt-2">Crie e gerencie seus treinadores IA</p>
      </div>

      {/* Formulário de criação/edição */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">
          {editando ? 'Editar Treinador' : 'Novo Treinador'}
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Treinador
            </label>
            <input
              type="text"
              value={editando ? editando.nome : novoTreinador.nome}
              onChange={(e) => editando 
                ? setEditando({ ...editando, nome: e.target.value })
                : setNovoTreinador({ ...novoTreinador, nome: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ex: Treinador de Vendas"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prompt do Treinador
            </label>
            <textarea
              value={editando ? editando.prompt : novoTreinador.prompt}
              onChange={(e) => editando
                ? setEditando({ ...editando, prompt: e.target.value })
                : setNovoTreinador({ ...novoTreinador, prompt: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              placeholder="Descreva o comportamento e especialidade do treinador..."
            />
          </div>
          <div className="flex justify-end space-x-3">
            {editando && (
              <button
                onClick={() => setEditando(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancelar
              </button>
            )}
            <button
              onClick={handleSalvar}
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Salvar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lista de Treinadores */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prompt
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data de Criação
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {treinadores.map((treinador) => (
              <tr key={treinador.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {treinador.nome}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500 line-clamp-2">
                    {treinador.prompt}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {treinador.dataCriacao}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setEditando(treinador)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleExcluir(treinador.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Treinadores;