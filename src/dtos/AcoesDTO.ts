export interface CreateAcaoDTO {
  nome: string;
  cnpj: string;
  descricao: string;
  ticker: string;
  tipoAcaoId: number;
}

export interface UpdateAcaoDTO {
  nome?: string;
  cnpj?: string;
  descricao?: string;
  ticker?: string;
  tipoAcaoId?: number;
}
