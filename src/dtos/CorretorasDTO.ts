export interface CreateCorretoraDTO {
  nome: string;
  cnpj?: string;
  codigo?: string;
  site?: string;
  telefone?: string;
  email?: string;
  observacoes?: string;
}

export interface UpdateCorretoraDTO {
  nome?: string;
  cnpj?: string;
  codigo?: string;
  site?: string;
  telefone?: string;
  email?: string;
  observacoes?: string;
}
