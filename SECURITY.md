# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are
currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

The Easy Broker team and community take security bugs seriously. We appreciate your efforts to responsibly disclose your findings, and will make every effort to acknowledge your contributions.

### How to Report a Security Vulnerability?

If you believe you have found a security vulnerability in Easy Broker, please report it to us through coordinated disclosure.

**Please do not report security vulnerabilities through public GitHub issues, discussions, or pull requests.**

Instead, please send an email to security@lucasfeitoza.dev with the following information:

- Type of issue (e.g. buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit the issue

This information will help us triage your report more quickly.

### What to Expect

After submitting a report, you can expect:

- **Acknowledgment**: We will acknowledge receipt of your report within 48 hours.
- **Initial Assessment**: We will provide an initial assessment of the report within 5 business days.
- **Regular Updates**: We will keep you informed of our progress toward resolving the issue.
- **Credit**: We will credit you in our security advisories (if desired).

### Safe Harbor

We support safe harbor for security researchers who:

- Make a good faith effort to avoid privacy violations, destruction of data, and interruption or degradation of our services
- Only interact with accounts you own or with explicit permission of the account holder
- Do not access a system beyond what is necessary to demonstrate a vulnerability
- Report vulnerabilities as soon as you discover them
- Do not modify or access data that does not belong to you
- Do not download or retain company data or user data
- Do not disclose issues to others without our express written consent

### Bug Bounty

Currently, we do not have a formal bug bounty program. However, we may provide recognition and thanks for valuable security reports.

## Security Measures

Easy Broker implements several security measures:

- **Input Validation**: All inputs are validated using DTOs and TypeScript types
- **SQL Injection Prevention**: Using TypeORM's query builder and parameterized queries
- **Environment Variables**: Sensitive configuration stored in environment variables
- **Error Handling**: Proper error handling that doesn't leak sensitive information
- **CORS**: Cross-Origin Resource Sharing properly configured
- **Dependencies**: Regular security audits of dependencies
- **Docker**: Containerized deployment with non-root user

## Dependencies

We regularly monitor our dependencies for security vulnerabilities using:

- `npm audit`
- GitHub Dependabot
- Snyk (in CI/CD pipeline)

## Contact

For any security-related questions or concerns, please contact:

- Email: security@lucasfeitoza.dev
- GitHub: [@lucasfeitozas](https://github.com/lucasfeitozas)

Thank you for helping to keep Easy Broker and our users safe!
