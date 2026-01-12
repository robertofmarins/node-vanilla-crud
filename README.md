# 🚀 CRUD Fullstack: Node.js "Puro" & TypeScript

Bem-vindo ao meu projeto de estudo Fullstack! 

O objetivo deste projeto não foi apenas criar um sistema de cadastro, mas sim entender como a internet funciona "debaixo do capô". Em vez de usar frameworks que fazem mágica (como Express ou NestJS), eu construí o servidor e a lógica de rotas manualmente usando apenas os módulos nativos do Node.js.

## 🎯 O que o projeto faz?
É um sistema de gerenciamento de tecnologias (CRUD) onde é possível:
- Criar uma nova tecnologia e definir seu nível de habilidade.
- Recuperar (Listar) todas as tecnologias salvas.
- Update (Atualizar) o nome ou nível de uma tecnologia existente.
- Delete (Remover) itens da lista.

Tudo isso salvando os dados permanentemente em um arquivo local (data.json), simulando um banco de dados, com uma interface organizada em cards.

## 🛠️ Tecnologias Utilizadas

### Backend
- Node.js (Native Modules): http, fs, path e url.
- TypeScript: Para garantir a tipagem e segurança do código.
- TSX: Para execução e watch do servidor em tempo real.

### Frontend
- HTML5 & CSS3: Layout moderno com Flexbox e sombras.
- TypeScript: Manipulação do DOM e consumo da API via fetch.

---

## 🧠 Desafios e Aprendizados Técnicos

Como não usei frameworks, implementei conceitos fundamentais da arquitetura web manualmente:

### 1. Configuração de CORS e Headers
Aprendi que o navegador bloqueia requisições entre portas diferentes por segurança. Configurei os headers para permitir a comunicação entre o Front (5500) e o Back (3000).

### 2. Tratamento de Preflight (OPTIONS)
Descobri que o navegador envia uma requisição OPTIONS antes de métodos como DELETE ou PUT. O servidor precisa responder um "OK" (status 204) para liberar a ação.

### 3. Manipulação de Rotas e IDs
Sem bibliotecas de rotas, utilizei lógica de tratamento de strings para identificar as rotas e extrair IDs diretamente da URL usando o método split.

---

## 📂 Estrutura do Projeto

/
├── /backend
│   ├── server.ts      # Servidor HTTP e lógica de rotas
│   ├── tsconfig.json  # Configuração do compilador TS
│   └── package.json
└── /frontend
│   ├── index.html     # Página principal
│   ├── style.css      # Estilização (Cards e Inputs)
│   ├── app.ts         # Lógica de integração e DOM
│   └── package.json
└── data.json      # "Banco de dados" em JSON

---

## ⚡ Como rodar o projeto localmente

### Passo 1: Backend
1. Entre na pasta backend.
2. Instale as dependências: npm install.
3. Inicie o servidor: npm run dev.

### Passo 2: Frontend
1. Entre na pasta frontend.
2. Instale as dependências: npm install.
3. Compile o TS em modo watch: npx tsc -w.
4. Abra o index.html com o Live Server.

---

Feito com dedicação para dominar os fundamentos do desenvolvimento Web.