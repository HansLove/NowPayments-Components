# GitHub Copilot Instructions

For this NOWPayments Components project, please consult the project documentation before generating code or suggestions:

## Reference Documentation

- **Technical Documentation**: [CLAUDE.md](../CLAUDE.md) - Contains code standards, architecture, development patterns, build configuration and implementation details
- **High-Level Documentation**: [README.md](../README.md) - Contains business context, architecture philosophy, usage examples and installation guides

## Project Context

This is a React component library for cryptocurrency payments with NOWPayments API integration that follows a **frontend display + backend processing** pattern.

## Key Standards

- **Naming**: BEM methodology for CSS (`nowpayments-` prefix), PascalCase for components
- **Architecture**: Frontend-only for UI, backend handles payments/webhooks
- **Patterns**: Functional paradigm, immutability, guard clauses over nesting
- **Theming**: CSS custom properties with fallbacks
- **TypeScript**: Strict mode, fixed form schemas for frontend→backend

## Important Scripts

```bash
npm run storybook  # Component development
npm run build      # Build for distribution
npm run lint && npm run type-check  # Quality assurance
```

Always check the technical documentation in [CLAUDE.md](../CLAUDE.md) for specific implementations and the business documentation in [README.md](../README.md) for general context.