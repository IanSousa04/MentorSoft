import { Treinador, Pergunta,  Relatorio } from '../types';

export const treinadores: Treinador[] = [
  {
    id: '1',
    nome: 'Treinador de Vendas',
    prompt: 'Especialista em técnicas de vendas e negociação',
    dataCriacao: '20250325',
  },
  {
    id: '2',
    nome: 'Treinador de Liderança',
    prompt: 'Focado em desenvolvimento de habilidades de liderança',
    dataCriacao: '20250325',
  },
  {
    id: '3',
    nome: 'Treinador de Analista de Suporte',
    prompt: 'Atue como um treinador especializado em Analista de Suporte Técnico à software ERP desenvolvido pela empresa Edil System. Faça perguntas uma de cada vez, forneça feedback detalhado sobre as respostas e ajude o analista a melhorar suas habilidades.',
    dataCriacao: '20250325',
  },
];

export const perguntas: Pergunta[] = [
  {
    id: '1',
    texto: 'Como você abordaria um cliente em potencial?',
    treinadorId: '1',
  },
  {
    id: '2',
    texto: 'Qual é a melhor forma de lidar com objeções?',
    treinadorId: '1',
  },
];


export const relatorio: Relatorio = {
  pontuacao: 85,
  totalPerguntas: 10,
  respostasCorretas: 8,
  tempoTotal: '00:45:30',
  feedback: 'Excelente domínio das técnicas de vendas. Precisa melhorar em negociação.',
};