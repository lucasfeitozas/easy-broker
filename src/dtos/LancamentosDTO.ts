export interface CreateLancamentoDTO {
  quantidade: number;
  valor: number;
  dataLancamento: Date;
  operacao: 'compra' | 'venda';
  corretoraId: number;
  acoesId: number;
  observacoes?: string;
}

export interface UpdateLancamentoDTO {
  quantidade?: number;
  valor?: number;
  dataLancamento?: Date;
  operacao?: 'compra' | 'venda';
  corretoraId?: number;
  acoesId?: number;
  observacoes?: string;
}

export interface FiltroRelatorioDTO {
  corretoraId?: number;
  acoesId?: number;
  operacao?: 'compra' | 'venda';
  dataInicio?: string;
  dataFim?: string;
  periodo?: 'mensal' | 'anual' | 'especifico';
  ano?: number;
  mes?: number;
}
