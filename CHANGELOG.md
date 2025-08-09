# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- GitHub Actions CI/CD pipeline
- Docker support with multi-stage builds
- Environment variables for security
- Comprehensive documentation
- Security audit in CI

### Changed
- Updated documentation with examples
- Improved error handling
- Enhanced Docker configuration

### Security
- Moved sensitive data to environment variables
- Added security audit pipeline
- Implemented proper secret management

## [1.0.0] - 2025-01-09

### Added
- Initial release of Easy Broker system
- Complete CRUD operations for:
  - Stock types (Tipos de Ações)
  - Brokers (Corretoras)
  - Stocks (Ações)
  - Transactions (Lançamentos)
- Advanced reporting system
- Search and filtering capabilities
- Health check endpoint
- Complete test suite with Jest
- TypeORM integration with MySQL
- Docker containerization
- API documentation

### Features
- **Stock Management**: Full CRUD for stocks with ticker validation
- **Broker Management**: Comprehensive broker information system
- **Transaction Tracking**: Buy/sell operations with detailed history
- **Reporting**: Position and movement reports with filters
- **Search**: Advanced search by ticker, name, or description
- **Statistics**: Aggregated data and analytics

### Technical
- **Backend**: Node.js + Express + TypeScript
- **Database**: MySQL 8.0 with TypeORM
- **Testing**: Jest + Supertest with full coverage
- **Architecture**: Clean Architecture with Services, DTOs, and Repositories
- **Documentation**: Complete API documentation
- **Containerization**: Docker + Docker Compose
