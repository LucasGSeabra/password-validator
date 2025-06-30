# Password Validator

> **Aplicação Angular moderna para validação robusta de senhas**

Uma aplicação web standalone construída com Angular 20 que fornece validação em tempo real de senhas com interface elegante e responsiva. Utiliza Material Design, Jest para testes e arquitetura modular com microfrontends.

## Índice

- [Demo](#-demo)
- [Características](#-características)
- [Tecnologias](#️-tecnologias)
- [Instalação](#-instalação)
- [Desenvolvimento](#-desenvolvimento)
- [Testes](#-testes)
- [Build](#️-build)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Interface](#-interface)
- [API](#-api)
- [Cobertura de Testes](#-cobertura-de-testes)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

## Demo

```bash
# Executar localmente
npm start
# Acesse: http://localhost:4200
```

## Características

### Validação de Senhas
- **Validação em tempo real** via API
- **Feedback específico** para cada critério não atendido
- **Loading states** e animações suaves
- **Tratamento de erros** robusto

### Interface Moderna
- **Totalmente responsiva** (mobile-first)
- **Material Design 3** com tema customizado
- **Toggle de visibilidade** de senha
- **Animações fluidas** e feedback visual

### Arquitetura
- **Standalone components** (sem NgModules)
- **Jest** para testes unitários (100% cobertura)
- **Module Federation** para microfrontends
- **Injeção de dependência** moderna com `inject()`

### Acessibilidade
- **ARIA labels** e semântica adequada
-  **Navegação por teclado** completa
- **Alto contraste** e cores adequadas
- **Touch-friendly** para dispositivos móveis

## Tecnologias

### Core
- **Angular 20.0.0** - Framework principal
- **TypeScript 5.8.2** - Linguagem de programação
- **RxJS 7.8.0** - Programação reativa
- **Zone.js 0.15.0** - Change detection

### UI/UX
- **Angular Material 20.0.4** - Componentes UI
- **Material Icons** - Iconografia
- **SCSS** - Preprocessador CSS
- **Flexbox & Grid** - Layout responsivo

### Testes
- **Jest 29.7.0** - Framework de testes
- **Jest Preset Angular 14.2.4** - Configuração Angular
- **@angular/testing** - Utilitários de teste

### Build & Deploy
- **Angular CLI 20.0.3** - Ferramentas de build
- **ngx-build-plus** - Webpack customizado
- **Module Federation** - Microfrontends

## Instalação

### Pré-requisitos
- **Node.js** 18+
- **npm** 9+ ou **yarn** 3+
- **Git**

### Clonando o Repositório
```bash
git clone https://github.com/seu-usuario/password-validator.git
cd password-validator
```

### Instalando Dependências
```bash
npm install
```

### Configuração do Ambiente
```bash
# Copie o arquivo de configuração (se necessário)
cp src/environments/environment.example.ts src/environments/environment.ts

# Configure a URL da API no arquivo de ambiente
# environment.ts -> apiUrl: 'http://localhost:8082'
```

## Desenvolvimento

### Servidor de Desenvolvimento
```bash
npm start
# ou
ng serve

# Aplicação disponível em: http://localhost:4200
```

### Modo de Desenvolvimento com Watch
```bash
npm run watch
# Build contínuo com detecção de mudanças
```

### Executando com Backend
```bash
# Terminal 1 - Frontend
npm start

# Terminal 2 - Backend (se disponível)
# Configure conforme documentação do backend
```

## Testes

### Executar Todos os Testes
```bash
npm test
# Executa todos os testes com Jest
```

### Testes em Modo Watch
```bash
npm run test:watch
# Executa testes continuamente conforme mudanças
```

### Cobertura de Código
```bash
npm run test:coverage
# Gera relatório de cobertura em coverage/
```

### Testes para CI/CD
```bash
npm run test:ci
# Execução otimizada para pipelines
```

### Estrutura de Testes
```
src/
├── app/
│   ├── app.spec.ts                    # Testes do componente raiz
│   ├── validator/
│   │   ├── form/
│   │   │   └── form.spec.ts          # Testes do formulário
│   │   └── validator-service.spec.ts  # Testes do serviço
│   └── core/
│       └── auth/
│           ├── auth.spec.ts          # Testes de autenticação
│           └── auth-interceptor.spec.ts
├── setup-jest.ts                     # Configuração do Jest
└── jest.config.js                    # Configuração principal
```

## Build

### Build de Desenvolvimento
```bash
npm run build
# Build otimizado para desenvolvimento
```

### Build de Produção
```bash
npm run build:prod
# Build otimizado para produção com minificação
```

### Análise do Bundle
```bash
npm run analyze
# Analisa o tamanho dos bundles gerados
```

### Artefatos de Build
```
dist/password-validator/
├── index.html              # Página principal
├── main.[hash].js          # Bundle principal
├── styles.[hash].css       # Estilos compilados
├── remoteEntry.js          # Module Federation
└── assets/                 # Recursos estáticos
```

## Estrutura do Projeto

```
password-validator/
├── public/                    # Recursos públicos
│   └── favicon.ico
├── src/
│   ├── app/                   # Código da aplicação
│   │   ├── app.ts             # Componente raiz
│   │   ├── app.html           # Template raiz
│   │   ├── app.scss           # Estilos globais
│   │   ├── app.routes.ts      # Configuração de rotas
│   │   ├── core/              # Módulos core
│   │   │   ├── core-module.ts
│   │   │   └── auth/          # Autenticação
│   │   └── validator/         # Módulo de validação
│   │       ├── form/          # Componente do formulário
│   │       │   ├── form.ts    # Lógica do componente
│   │       │   ├── form.html  # Template
│   │       │   ├── form.scss  # Estilos (245 linhas otimizadas)
│   │       │   └── form.spec.ts # Testes
│   │       ├── models/        # Tipos TypeScript
│   │       │   └── validatePassword.ts
│   │       ├── validator-service.ts    # Serviço da API
│   │       ├── validator-service.spec.ts
│   │       ├── validator-module.ts
│   │       └── validator-routing-module.ts
│   ├── main.ts              # Bootstrap da aplicação
│   ├── index.html           # HTML principal
│   └── bootstrap.ts         # Configuração inicial
├── jest.config.js           # Configuração do Jest
├── setup-jest.ts           # Setup dos testes
├── angular.json            # Configuração do Angular CLI
├── tsconfig.json           # Configuração do TypeScript
├── webpack.config.js       # Webpack customizado
├── package.json            # Dependências e scripts
└── README.md              # Esta documentação
```

## Interface

### Design System
```scss
// Paleta de Cores
$primary: #007bff74;      // Azul primário
$success: #28a745;        // Verde de sucesso
$error: #dc3545;          // Vermelho de erro
$background: #f8f9fa;     // Fundo cinza claro
$white: #fff;             // Branco
$border: #e9ecef;         // Bordas sutis
$muted: #6c757d;          // Texto secundário
```

### Componentes Principais
- **Layout Principal**: Container centralizado e responsivo
- **Formulário**: Campo de senha com validação em tempo real
- **Toggle de Visibilidade**: Botão para mostrar/ocultar senha
- **Lista de Erros**: Feedback específico com ícones
- **Mensagem de Sucesso**: Confirmação visual elegante
- **Botões de Ação**: Primário (Validar) e Secundário (Limpar)

### Responsividade
```scss
// Breakpoints
@media (max-width: 768px)  // Tablets
@media (max-width: 480px)  // Mobile
```

## API

### Endpoint de Validação
```typescript
POST http://localhost:8082/validar

// Request
interface ValidatePasswordRequest {
  password: string;
}

// Response
interface ValidatePasswordResponse {
  isValid: boolean;
  messages?: string[];
}
```

### Exemplo de Uso
```typescript
// Request
{
  "request": {
    "password": "MinhaSenh@123"
  }
}

// Response - Sucesso
{
  "isValid": true,
  "messages": []
}

// Response - Erro
{
  "isValid": false,
  "messages": [
    "A senha deve ter pelo menos 8 caracteres",
    "A senha deve conter pelo menos uma letra maiúscula"
  ]
}
```

## Cobertura de Testes

### Métricas Atuais
- **Statements**: 70.73% (58/82)
- **Branches**: 50% (1/2)
- **Functions**: 86.66% (13/15)
- **Lines**: 73.52% (50/68)

### Arquivos Testados
```
✅ app.ts                 100% coverage
✅ form.ts                100% coverage
✅ validator-service.ts   100% coverage
✅ auth.ts                92.3% coverage
⚠️ auth-interceptor.ts   28.57% coverage
❌ core-module.ts        0% coverage (não utilizado)
❌ validator-module.ts   0% coverage (não utilizado)
❌ routing-module.ts     0% coverage (não utilizado)
```

### Comandos de Teste
```bash
# Executar testes
npm test                    # Execução padrão
npm run test:watch         # Modo watch
npm run test:coverage      # Com cobertura
npm run test:ci            # Para CI/CD

# Resultados
# 5 test suites passed
# 18 tests passed
# ~9-11 segundos 
```

## Contribuição

### Como Contribuir

1. **Fork** do projeto
2. **Clone** seu fork
3. **Branch** para feature: `git checkout -b feature/nova-funcionalidade`
4. **Commit** suas mudanças: `git commit -m 'feat: adiciona nova funcionalidade'`
5. **Push** para branch: `git push origin feature/nova-funcionalidade`
6. **Pull Request** detalhado

#### Testes
```typescript
// Estrutura recomendada
describe('ValidatorService', () => {
  beforeEach(() => {
    // setup
  });

  it('should validate strong password successfully', () => {
    // given, when, then
  });
});
```
