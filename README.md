# 📈 Easy Broker - Sistema de Controle de Ações por Corretora

[![CI/CD Pipeline](https://github.com/lucasfeitozas/easy-broker/workflows/CI/CD%20Pipeline/badge.svg)](https://github.com/lucasfeitozas/easy-broker/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)](https://www.docker.com/)

Sistema desenvolvido em Node.js com TypeScript para controlar ações compradas por corretora, permitindo gerar relatórios gerais ou por corretora e intervalos de data (mensal, anual ou período específico).

## 🚀 Funcionalidades

- **Gestão de Corretoras**: CRUD completo de corretoras
- **Gestão de Tipos de Ações**: Classificação das ações (Ordinárias, Preferenciais, etc.)
- **Gestão de Ações**: Cadastro e controle das ações por ticker
- **Lançamentos**: Registro de compras e vendas de ações
- **Relatórios Avançados**:
  - Relatório de posição atual por corretora
  - Relatório de movimentação por período
  - Filtros por corretora, ação, data e tipo de operação
  - Períodos: mensal, anual ou específico
- **API REST**: Endpoints completos com validações
- **Health Check**: Monitoramento da aplicação
- **Testes**: Cobertura completa com Jest

## 🛠️ Tecnologias

- **Backend**: Node.js + Express + TypeScript
- **Banco de Dados**: MySQL 8.0 com TypeORM
- **Testes**: Jest + Supertest
- **Containerização**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Validação**: DTOs customizados
- **Arquitetura**: Clean Architecture com Services, DTOs e Repositories

## 📦 Estrutura do Projeto

```
src/
├── database/
│   ├── migrations/          # Migrações do banco
│   └── index.ts            # Configuração TypeORM
├── dtos/                   # Data Transfer Objects
├── errors/                 # Classes de erro customizadas
├── models/                 # Entidades TypeORM
├── routes/                 # Rotas da API
├── services/               # Lógica de negócio
├── __tests__/              # Testes unitários
└── server.ts              # Servidor Express
```

## 🏃‍♂️ Início Rápido

### Pré-requisitos

- [Node.js 18+](https://nodejs.org/)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

### 🐳 Instalação com Docker (Recomendado)

1. **Clone o repositório**
```bash
git clone https://github.com/lucasfeitozas/easy-broker.git
cd easy-broker
```

2. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

3. **Inicie os containers**
```bash
docker-compose up -d
```

4. **Acesse a aplicação**
- API: http://localhost:3333
- Health Check: http://localhost:3333/health
- PHPMyAdmin: http://localhost:8080

### 💻 Instalação Local

1. **Clone o repositório**
```bash
git clone https://github.com/lucasfeitozas/easy-broker.git
cd easy-broker
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. **Configure o banco de dados MySQL**
```bash
# Certifique-se de que o MySQL está rodando
# Crie o banco de dados 'easybroker'
mysql -u root -p -e "CREATE DATABASE easybroker;"
```

5. **Execute as migrações**
```bash
npm run migration:run
```

6. **Inicie a aplicação**
```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm start
```

## 🔌 API Endpoints

### Health Check
```http
GET /health
```

### Tipos de Ações
```http
GET    /tipo-acoes          # Listar todos
POST   /tipo-acoes          # Criar novo
GET    /tipo-acoes/:id      # Buscar por ID
PUT    /tipo-acoes/:id      # Atualizar
DELETE /tipo-acoes/:id      # Deletar
```

### Corretoras
```http
GET    /corretoras          # Listar todas
POST   /corretoras          # Criar nova
GET    /corretoras/:id      # Buscar por ID
PUT    /corretoras/:id      # Atualizar
DELETE /corretoras/:id      # Deletar
```

### Ações
```http
GET    /acoes               # Listar todas
POST   /acoes               # Criar nova
GET    /acoes/:id           # Buscar por ID
PUT    /acoes/:id           # Atualizar
DELETE /acoes/:id           # Deletar
GET    /acoes/ticker/:ticker # Buscar por ticker
GET    /acoes/search?termo= # Buscar por termo
GET    /acoes/estatisticas  # Estatísticas gerais
GET    /acoes/tipo/:tipoId  # Ações por tipo
```

### Lançamentos
```http
GET    /lancamentos         # Listar todos
POST   /lancamentos         # Criar novo
GET    /lancamentos/:id     # Buscar por ID
PUT    /lancamentos/:id     # Atualizar
DELETE /lancamentos/:id     # Deletar
GET    /lancamentos/relatorio/posicao     # Relatório de posição
GET    /lancamentos/relatorio/movimentacao # Relatório de movimentação
```

## 📝 Exemplos de Uso

### Criar um Tipo de Ação
```bash
curl -X POST http://localhost:3333/tipo-acoes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Ação Ordinária",
    "descricao": "Ação que confere direito a voto"
  }'
```

### Criar uma Corretora
```bash
curl -X POST http://localhost:3333/corretoras \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Rico Investimentos",
    "codigo": "RICO",
    "site": "https://rico.com.vc",
    "telefone": "(11) 3003-3000",
    "email": "contato@rico.com.vc"
  }'
```

### Criar uma Ação
```bash
curl -X POST http://localhost:3333/acoes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Petrobras",
    "cnpj": "33.000.167/0001-01",
    "descricao": "Petróleo Brasileiro S.A.",
    "ticker": "PETR4",
    "tipoAcaoId": 1
  }'
```

### Registrar um Lançamento
```bash
curl -X POST http://localhost:3333/lancamentos \
  -H "Content-Type: application/json" \
  -d '{
    "quantidade": 100,
    "valor": 28.50,
    "dataLancamento": "2024-01-15",
    "operacao": "compra",
    "observacoes": "Primeira compra de PETR4",
    "corretoraId": 1,
    "acoesId": 1
  }'
```

## 🧪 Testes

### Executar todos os testes
```bash
npm test
```

### Executar testes com coverage
```bash
npm run test:coverage
```

### Executar testes em modo watch
```bash
npm run test:watch
```

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Inicia em modo desenvolvimento
npm run build        # Compila TypeScript para JavaScript
npm start            # Inicia aplicação em produção
npm test             # Executa testes
npm run test:coverage # Executa testes com coverage
npm run lint         # Executa ESLint
npm run lint:fix     # Executa ESLint e corrige automaticamente
```

## 🌍 Variáveis de Ambiente

| Variável | Descrição | Padrão | Obrigatória |
|----------|-----------|---------|-------------|
| `NODE_ENV` | Ambiente da aplicação | `development` | Não |
| `PORT` | Porta do servidor | `3333` | Não |
| `DB_HOST` | Host do banco de dados | `localhost` | Sim |
| `DB_PORT` | Porta do banco de dados | `3306` | Não |
| `DB_USERNAME` | Usuário do banco | `root` | Sim |
| `DB_PASSWORD` | Senha do banco | | Sim |
| `DB_DATABASE` | Nome do banco | `easybroker` | Sim |

## 🔒 Segurança

- ✅ Validação de entrada com DTOs
- ✅ Sanitização de dados
- ✅ Tratamento de erros centralizado
- ✅ Headers de segurança com CORS
- ✅ Variáveis de ambiente para dados sensíveis
- ✅ Audit de dependências automatizado

## 🚀 Deploy

### Docker Hub

A aplicação está disponível no Docker Hub:

```bash
docker pull lucasfeitozas/easy-broker:latest
docker run -p 3333:3333 lucasfeitozas/easy-broker:latest
```

### Deploy Manual

1. **Build da aplicação**
```bash
npm run build
```

2. **Configurar variáveis de ambiente**
```bash
export NODE_ENV=production
export DB_HOST=your_db_host
export DB_PASSWORD=your_secure_password
```

3. **Iniciar aplicação**
```bash
npm start
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Commit

```
feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação
refactor: refatoração
test: testes
chore: manutenção
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Lucas Feitoza**
- GitHub: [@lucasfeitozas](https://github.com/lucasfeitozas)
- LinkedIn: [Lucas Feitoza](https://linkedin.com/in/lucasfeitozas)

## 🙏 Agradecimentos

- [TypeORM](https://typeorm.io/) pela excelente ORM para TypeScript
- [Express.js](https://expressjs.com/) pelo framework web
- [Jest](https://jestjs.io/) pelo framework de testes
- [Docker](https://www.docker.com/) pela containerização

## 📊 Status do Projeto

✅ **Funcional**: Todas as funcionalidades principais implementadas  
✅ **Testado**: Cobertura de testes completa  
✅ **Documentado**: API e código totalmente documentados  
✅ **Deploy Ready**: Pronto para produção com Docker  

---

⭐ **Se este projeto foi útil para você, considere dar uma estrela!**

# Configure as variáveis:
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=sua_senha
DB_DATABASE=easybroker
```

### 🐳 Executando com Docker

**Desenvolvimento:**
```bash
# Inicia todos os serviços
docker-compose -f docker-compose.dev.yml up -d

# Visualizar logs
docker-compose -f docker-compose.dev.yml logs -f app
```

**Produção:**
```bash
# Build e execução
docker-compose up -d

# Parar os serviços
docker-compose down
```

**Executar Testes:**
```bash
# Testes unitários
docker-compose -f docker-compose.dev.yml run --rm test

# Ou localmente
npm test
npm run test:coverage
```

### 💻 Desenvolvimento Local

```bash
# Executar em modo desenvolvimento
npm run dev:server

# Executar migrações
npm run migration:run

# Reverter migração
npm run migration:revert

# Build do projeto
npm run build

# Testes
npm test
npm run test:watch
npm run test:coverage
```

## 📊 API Endpoints

### Corretoras
```
GET    /corretoras                    # Listar todas
GET    /corretoras/:id                # Buscar por ID
GET    /corretoras/:id/resumo         # Resumo de lançamentos
GET    /corretoras/search?termo=X     # Buscar por termo
GET    /corretoras/estatisticas       # Estatísticas
POST   /corretoras                    # Criar nova
PUT    /corretoras/:id                # Atualizar
DELETE /corretoras/:id                # Excluir
```

### Tipos de Ações
```
GET    /tipo-acoes                    # Listar todos
GET    /tipo-acoes/:id                # Buscar por ID
GET    /tipo-acoes/search?termo=X     # Buscar por termo
GET    /tipo-acoes/estatisticas       # Estatísticas
POST   /tipo-acoes                    # Criar novo
PUT    /tipo-acoes/:id                # Atualizar
DELETE /tipo-acoes/:id                # Excluir
```

### Ações
```
GET    /acoes                         # Listar todas
GET    /acoes/:id                     # Buscar por ID
GET    /acoes/ticker/:ticker          # Buscar por ticker
GET    /acoes/tipo/:tipoId            # Buscar por tipo
GET    /acoes/search?termo=X          # Buscar por termo
GET    /acoes/estatisticas            # Estatísticas
POST   /acoes                         # Criar nova
PUT    /acoes/:id                     # Atualizar
DELETE /acoes/:id                     # Excluir
```

### Lançamentos
```
GET    /lancamentos                   # Listar com filtros
GET    /lancamentos/:id               # Buscar por ID
POST   /lancamentos                   # Criar novo
PUT    /lancamentos/:id               # Atualizar
DELETE /lancamentos/:id               # Excluir

# Relatórios
GET    /lancamentos/relatorios/posicao     # Relatório de posição
GET    /lancamentos/relatorios/movimentacao # Relatório de movimentação
```

### Filtros para Relatórios
```
# Parâmetros de query disponíveis:
?corretoraId=1              # Filtrar por corretora
?acoesId=1                  # Filtrar por ação
?operacao=compra            # Filtrar por operação (compra/venda)
?dataInicio=2023-01-01      # Data inicial
?dataFim=2023-12-31         # Data final
?periodo=mensal             # Período (mensal/anual/especifico)
?ano=2023                   # Ano específico
?mes=12                     # Mês específico (1-12)
```

## 📝 Exemplos de Uso

### Criar uma Corretora
```json
POST /corretoras
{
  "nome": "XP Investimentos",
  "cnpj": "02.332.886/0001-04",
  "codigo": "XP",
  "site": "https://xpi.com.br",
  "telefone": "(11) 3027-3000",
  "email": "contato@xpi.com.br"
}
```

### Criar um Tipo de Ação
```json
POST /tipo-acoes
{
  "nome": "Ação Ordinária",
  "descricao": "Ações ordinárias com direito a voto"
}
```

### Criar uma Ação
```json
POST /acoes
{
  "ticker": "PETR4",
  "nome": "Petróleo Brasileiro S.A.",
  "cnpj": "33.000.167/0001-01",
  "tipoAcaoId": 1
}
```

### Registrar um Lançamento
```json
POST /lancamentos
{
  "quantidade": 100,
  "valor": 25.50,
  "dataLancamento": "2023-12-01",
  "operacao": "compra",
  "corretoraId": 1,
  "acoesId": 1,
  "observacoes": "Compra inicial"
}
```

### Gerar Relatório de Posição
```
GET /lancamentos/relatorios/posicao?corretoraId=1&periodo=anual&ano=2023
```

Resposta:
```json
{
  "posicaoAtual": [
    {
      "ticker": "PETR4",
      "nomeAcao": "Petróleo Brasileiro S.A.",
      "corretora": "XP Investimentos",
      "quantidadeTotal": 100,
      "valorMedio": 25.50,
      "valorTotalInvestido": 2550.00,
      "operacoes": 1
    }
  ],
  "totalInvestido": 2550.00,
  "totalAcoes": 100
}
```

## 🧪 Testes

O projeto inclui testes unitários completos:

```bash
# Executar todos os testes
npm test

# Executar com watch mode
npm run test:watch

# Gerar relatório de cobertura
npm run test:coverage
```

### Cobertura de Testes

- ✅ Services (Lógica de negócio)
- ✅ Models (Entidades)
- ✅ DTOs (Validações)
- ✅ Routes (Endpoints)
- ✅ Error Handling

## 🗄️ Banco de Dados

### Migrações

As migrações criam as seguintes tabelas com dados iniciais:

1. **tb_tipo_acoes**: Tipos de ações (ON, PN, etc.)
2. **tb_corretora**: Corretoras cadastradas
3. **tb_acoes**: Ações disponíveis
4. **tb_lancamentos**: Operações de compra/venda

```bash
# Executar migrações
npm run migration:run

# Reverter última migração
npm run migration:revert
```

### Relacionamentos

```
TipoAcoes (1:N) Acoes (1:N) Lancamentos (N:1) Corretoras
```

## 🚀 Deploy

### Docker Production

```bash
# Build da imagem
docker build -t easy-broker .

# Executar com docker-compose
docker-compose up -d

# Verificar logs
docker-compose logs -f
```

### Health Check

O container inclui health check automático:
```
GET /health
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📜 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🆘 Suporte

Para dúvidas ou suporte, abra uma issue no repositório ou entre em contato através do email do projeto.

---

**Desenvolvido com ❤️ para controle eficiente de investimentos em ações**
