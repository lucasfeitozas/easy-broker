# Contributing to Easy Broker

First off, thank you for considering contributing to Easy Broker! It's people like you that make Easy Broker such a great tool.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guides](#style-guides)
- [Community](#community)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

Examples of behavior that contributes to creating a positive environment include:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [Docker](https://www.docker.com/) and Docker Compose
- [Git](https://git-scm.com/)

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/easy-broker.git
   cd easy-broker
   ```

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps which reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed after following the steps**
- **Explain which behavior you expected to see instead and why**
- **Include screenshots or GIFs if possible**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and explain which behavior you expected to see instead**
- **Explain why this enhancement would be useful**

### Code Contributions

#### Types of Contributions

- **Bug fixes**: Fix existing bugs in the codebase
- **New features**: Add new functionality to the application
- **Documentation**: Improve or add documentation
- **Tests**: Add or improve test coverage
- **Performance**: Optimize existing code for better performance

## Development Setup

### 1. Environment Setup

1. Copy the environment variables file:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your local configuration

### 2. Using Setup Script

Run the automated setup script:

```bash
chmod +x setup.sh
./setup.sh
```

### 3. Manual Setup

If you prefer manual setup:

```bash
# Install dependencies
npm install

# Start the database
docker-compose up -d mysql

# Wait for database to be ready, then start the application
npm run dev
```

### 4. Verify Setup

- Application: http://localhost:3000
- Health Check: http://localhost:3000/health
- PHPMyAdmin: http://localhost:8080 (root/rootpassword)

## Pull Request Process

### Before Submitting

1. **Create a new branch** for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Write tests** for your changes
3. **Update documentation** if necessary
4. **Ensure all tests pass**:
   ```bash
   npm test
   ```

5. **Check code style**:
   ```bash
   npm run lint
   ```

### Submitting the Pull Request

1. **Push your branch** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request** on GitHub with:
   - Clear title and description
   - Reference to related issues
   - Screenshots (if applicable)
   - Test coverage information

3. **Fill out the Pull Request template** completely

### Pull Request Guidelines

- **Keep it focused**: One feature/fix per PR
- **Keep it small**: Smaller PRs are easier to review
- **Write good commit messages**: Use conventional commits format
- **Update tests**: Ensure your changes are covered by tests
- **Update documentation**: Keep docs in sync with code changes

### Commit Message Format

We use [Conventional Commits](https://conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Code style changes (formatting, semicolons, etc)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(api): add new endpoint for stock transactions
fix(database): resolve connection timeout issue
docs(readme): update installation instructions
```

## Style Guides

### TypeScript Style Guide

We use ESLint and Prettier for code formatting:

```bash
# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

### Code Style Rules

- Use TypeScript for all new code
- Follow the existing code structure and patterns
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Keep functions small and focused
- Use async/await instead of Promises where possible

### Database Style Guide

- Use descriptive table and column names
- Follow existing naming conventions
- Add appropriate indexes
- Include proper foreign key relationships
- Document schema changes in migrations

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Write unit tests for business logic
- Write integration tests for API endpoints
- Use descriptive test names
- Follow the AAA pattern (Arrange, Act, Assert)
- Mock external dependencies

## Community

### Getting Help

- **GitHub Discussions**: For general questions and discussions
- **GitHub Issues**: For bug reports and feature requests
- **Pull Requests**: For code contributions

### Communication Guidelines

- Be respectful and constructive
- Help others learn and grow
- Share knowledge and experiences
- Provide helpful feedback on contributions

## Recognition

Contributors will be recognized in our:

- README.md contributors section
- Release notes
- GitHub contributor graphs

Thank you for contributing to Easy Broker! 🚀

---

**Questions?** Feel free to open an issue or start a discussion. We're here to help!
