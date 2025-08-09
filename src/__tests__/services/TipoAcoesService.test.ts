import TipoAcoesService from '../../services/TipoAcoesService';
import { testDataSource } from '../setup';
import TipoAcoes from '../../models/TipoAcoes';
import AppError from '../../errors/AppError';

describe('TipoAcoesService', () => {
  let tipoAcoesService: TipoAcoesService;

  beforeEach(async () => {
    tipoAcoesService = new TipoAcoesService(testDataSource);
    // Limpar dados de teste
    await testDataSource.synchronize(true); // Drop e recriar todas as tabelas
  });

  describe('create', () => {
    it('deve criar um novo tipo de ação', async () => {
      const tipoAcaoData = {
        nome: 'Ação Ordinária',
        descricao: 'Ações ordinárias com direito a voto',
      };

      const tipoAcao = await tipoAcoesService.create(tipoAcaoData);

      expect(tipoAcao).toHaveProperty('id');
      expect(tipoAcao.nome).toBe(tipoAcaoData.nome);
      expect(tipoAcao.descricao).toBe(tipoAcaoData.descricao);
      expect(tipoAcao).toHaveProperty('created_at');
      expect(tipoAcao).toHaveProperty('updated_at');
    });

    it('não deve criar tipo de ação com nome duplicado', async () => {
      const tipoAcaoData = {
        nome: 'Ação Ordinária',
        descricao: 'Primeira ação',
      };

      await tipoAcoesService.create(tipoAcaoData);

      await expect(
        tipoAcoesService.create({
          nome: 'Ação Ordinária',
          descricao: 'Segunda ação',
        }),
      ).rejects.toBeInstanceOf(AppError);
    });

    it('não deve criar tipo de ação sem nome', async () => {
      await expect(
        tipoAcoesService.create({
          nome: '',
          descricao: 'Descrição',
        }),
      ).rejects.toBeInstanceOf(AppError);
    });
  });

  describe('findAll', () => {
    it('deve retornar lista vazia quando não há tipos de ações', async () => {
      const tiposAcoes = await tipoAcoesService.findAll();
      expect(tiposAcoes).toEqual([]);
    });

    it('deve retornar todos os tipos de ações ordenados por nome', async () => {
      await tipoAcoesService.create({ nome: 'Ação Preferencial' });
      await tipoAcoesService.create({ nome: 'Ação Ordinária' });

      const tiposAcoes = await tipoAcoesService.findAll();

      expect(tiposAcoes).toHaveLength(2);
      expect(tiposAcoes[0].nome).toBe('Ação Ordinária');
      expect(tiposAcoes[1].nome).toBe('Ação Preferencial');
    });
  });

  describe('findById', () => {
    it('deve encontrar tipo de ação por ID', async () => {
      const tipoAcao = await tipoAcoesService.create({
        nome: 'Ação Ordinária',
        descricao: 'Teste',
      });

      const tipoEncontrado = await tipoAcoesService.findById(tipoAcao.id);

      expect(tipoEncontrado.id).toBe(tipoAcao.id);
      expect(tipoEncontrado.nome).toBe(tipoAcao.nome);
    });

    it('deve lançar erro quando tipo de ação não for encontrado', async () => {
      await expect(tipoAcoesService.findById(999)).rejects.toBeInstanceOf(
        AppError,
      );
    });
  });

  describe('update', () => {
    it('deve atualizar tipo de ação', async () => {
      const tipoAcao = await tipoAcoesService.create({
        nome: 'Ação Original',
        descricao: 'Descrição original',
      });

      const tipoAtualizado = await tipoAcoesService.update(tipoAcao.id, {
        nome: 'Ação Atualizada',
        descricao: 'Descrição atualizada',
      });

      expect(tipoAtualizado.nome).toBe('Ação Atualizada');
      expect(tipoAtualizado.descricao).toBe('Descrição atualizada');
    });

    it('não deve atualizar para nome duplicado', async () => {
      await tipoAcoesService.create({ nome: 'Tipo 1' });
      const tipo2 = await tipoAcoesService.create({ nome: 'Tipo 2' });

      await expect(
        tipoAcoesService.update(tipo2.id, { nome: 'Tipo 1' }),
      ).rejects.toBeInstanceOf(AppError);
    });
  });

  describe('delete', () => {
    it('deve excluir tipo de ação', async () => {
      const tipoAcao = await tipoAcoesService.create({
        nome: 'Tipo para excluir',
      });

      await tipoAcoesService.delete(tipoAcao.id);

      await expect(
        tipoAcoesService.findById(tipoAcao.id),
      ).rejects.toBeInstanceOf(AppError);
    });

    it('deve lançar erro ao tentar excluir tipo inexistente', async () => {
      await expect(tipoAcoesService.delete(999)).rejects.toBeInstanceOf(
        AppError,
      );
    });
  });

  describe('search', () => {
    beforeEach(async () => {
      await tipoAcoesService.create({
        nome: 'Ação Ordinária',
        descricao: 'Ação com direito a voto',
      });
      await tipoAcoesService.create({
        nome: 'Ação Preferencial',
        descricao: 'Ação sem direito a voto',
      });
    });

    it('deve buscar por nome', async () => {
      const resultado = await tipoAcoesService.search('Ação');
      expect(resultado).toHaveLength(2); // Deve encontrar ambas "Ação Ordinária" e "Ação Preferencial"
      expect(resultado.some(t => t.nome === 'Ação Ordinária')).toBe(true);
    });

    it('deve buscar por descrição', async () => {
      const resultado = await tipoAcoesService.search('voto');
      expect(resultado).toHaveLength(2);
    });

    it('deve retornar todos quando termo vazio', async () => {
      const resultado = await tipoAcoesService.search('');
      expect(resultado).toHaveLength(2);
    });
  });

  describe('getEstatisticas', () => {
    it('deve retornar estatísticas corretas', async () => {
      await tipoAcoesService.create({ nome: 'Tipo 1' });
      await tipoAcoesService.create({ nome: 'Tipo 2' });

      const estatisticas = await tipoAcoesService.getEstatisticas();

      expect(estatisticas.totalTipos).toBe(2);
      expect(estatisticas.tiposSemAcoes).toBe(2);
      expect(estatisticas.tiposComAcoes).toBe(0);
    });
  });
});
