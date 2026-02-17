# 💰 FinanceApp - Aplicativo de Gerenciamento Financeiro Pessoal

Aplicação desenvolvida como teste técnico para vaga de Programador, atendendo a todos os requisitos propostos e implementando funcionalidades adicionais para demonstrar domínio técnico e boas práticas de arquitetura.

---

# ✅ Requisitos do Teste

### ✔ Funcionalidades Obrigatórias

- Cadastro de receitas e despesas
- Edição de transações
- Exclusão de transações
- Relatórios por período
- Dashboard com gráficos mensais
- Backend em C#
- Banco de dados PostgreSQL
- Frontend livre (React + Next.js)
- Projeto versionado no Git
- Uso de OO e princípios SOLID

---

# 🚀 Funcionalidades Extras Implementadas

Além do solicitado, foram implementadas as seguintes melhorias:

### 🔐 Autenticação
- Cadastro de usuário
- Login com JWT
- Proteção de rotas com `[Authorize]`
- Filtro automático de dados por usuário

### 📊 Dashboard Avançado
- Resumo total de entradas
- Resumo total de saídas
- Cálculo automático de saldo
- Gráfico comparativo mensal
- Gráfico responsivo ocupando área máxima da tela

### 📄 Relatórios
- Filtro por período
- Tabela detalhada
- Exportação CSV
- Exportação PDF (gerado no backend)
- Cálculo automático de totais no relatório

### 🧾 Auditoria
- Registro de:
  - Email de quem criou a transação
  - Email de quem editou
  - Email de quem excluiu
- Soft Delete implementado

### 🧱 Arquitetura
- Clean Architecture
- Separação em camadas:
  - Domain
  - Application
  - Infrastructure
  - API
- Injeção de Dependência
- Tratamento global de exceções (Exception Middleware)

---

# 🛠 Tecnologias Utilizadas

## Backend
- .NET 8
- ASP.NET Core
- Entity Framework Core
- PostgreSQL
- JWT Authentication
- QuestPDF (geração de PDF)

## Frontend
- Next.js 14
- React
- Tailwind CSS
- Recharts

---

# 🧱 Estrutura do Projeto

finance-app-backend <br>
│ <br>
├── FinanceApp.Domain <br>
├── FinanceApp.Application <br>
├── FinanceApp.Infrastructure <br>
└── FinanceApp.Api <br>

finance-app-frontend<br>
│ <br>
└── Next.js + Tailwind <br>


---

# ▶ Como Rodar o Projeto (Visual Studio)

## 🔹 1️⃣ Backend

### Pré-requisitos:
- .NET 8 SDK
- PostgreSQL instalado
- Visual Studio 2022+

### Passos:

1. Abra o Visual Studio
2. Clique em "Open a project or solution"
3. Selecione o arquivo:


4. Configure a string de conexão no `appsettings.json`:

```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Port=5432;Database=FinanceApp;Username=postgres;Password=suasenha"
}
```

6. Execute as migrations:
  - No Package Manager Console:
  - Update-Database

    ou via CLI:

```src
dotnet ef database update
```

7. Pressione F5 para rodar.

A API abrirá em:

https://localhost:5037/swagger

🔹 2️⃣ Frontend
Pré-requisitos:

Node.js 18+

Passos:

Navegue até a pasta do frontend:

```src
cd finance-app-frontend
```

Instale dependências:

```src
npm install
```

Execute:

```src
npm run dev
```

Aplicação disponível em:

http://localhost:3000

🔐 Fluxo de Uso

Acesse /register

Crie uma conta

Faça login

Cadastre transações

Visualize dashboard

Gere relatórios

Exporte CSV ou PDF

🎯 Princípios Aplicados

SOLID

Separação de responsabilidades

Inversão de dependência

Clean Code

Organização modular

Tratamento centralizado de exceções

📌 Considerações Técnicas

Datas convertidas para UTC para compatibilidade com PostgreSQL

Middleware global de exceção para padronização de erros

Layout responsivo

Sidebar dinâmica

Proteção de rotas no frontend

👨‍💻 Desenvolvido por

Victor Gomes
Desenvolvedor Full Stack

