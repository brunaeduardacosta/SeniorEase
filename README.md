````markdown
# 🧓 SeniorEase
  Plataforma desenvolvida para auxiliar pessoas idosas na organização da rotina diária, promovendo autonomia, acessibilidade e inclusão digital.

---

## 📖 Sobre o projeto

O **SeniorEase** é uma plataforma desenvolvida com foco na acessibilidade digital para pessoas idosas.

Seu objetivo é oferecer uma experiência simples, intuitiva e confortável para auxiliar na organização das atividades do dia a dia, reunindo ferramentas como gerenciamento de tarefas, agenda de compromissos, controle de medicamentos e recursos de acessibilidade.

O projeto foi desenvolvido aplicando princípios de UX, UI e Design Centrado no Usuário (DCU), considerando recomendações voltadas à usabilidade para o público idoso.

---

## 🎯 Objetivos

- Facilitar a organização da rotina.
- Incentivar a autonomia do usuário.
- Melhorar a acessibilidade digital.
- Reduzir dificuldades de navegação.
- Promover inclusão digital.
- Aplicar boas práticas de UX para idosos.

---

# ✨ Funcionalidades

### 📋 Gerenciamento de tarefas

- Cadastro de tarefas
- Conclusão de tarefas
- Exclusão de tarefas
- Barra de progresso
- Estatísticas

---

### 📅 Agenda

- Cadastro de compromissos
- Calendário mensal
- Visualização dos eventos
- Próximos compromissos

---

### 💊 Medicamentos

- Cadastro de medicamentos
- Horários personalizados
- Frequência de uso
- Lembretes automáticos
- Histórico de medicamentos

---

### 📊 Dashboard

- Estatísticas das tarefas
- Barra de progresso
- Próximos compromissos
- Próximos medicamentos
- Relógio
- Dicas de saúde

---

### ♿ Recursos de acessibilidade

- Aumento do tamanho da fonte
- Alto contraste
- Cursor ampliado
- Espaçamento entre elementos
- Modo simplificado
- Confirmação antes de ações importantes

---

## 🖥️ Tecnologias utilizadas

- React
- TypeScript
- Vite
- React Router DOM
- Context API
- LocalStorage
- HTML5
- CSS3

---

## 📂 Estrutura do projeto

```text
src
│
├── application
├── domain
│   └── entities
├── infrastructure
├── presentation
│   ├── components
│   ├── contexts
│   ├── layouts
│   ├── pages
│   ├── routes
│   ├── store
│   └── styles
└── main.tsx
```

---

## 🚀 Como executar

Clone o repositório:

```bash
git clone https://github.com/brunaeduardacosta/SeniorEase.git
```

Entre na pasta:

```bash
cd SeniorEase
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

A aplicação ficará disponível em:

```
http://localhost:5173
```

---

## 📱 Melhorias futuras

- Aplicativo Mobile (React Native + Expo)
- Login e autenticação
- Sincronização em nuvem
- Notificações Push
- Lista de compras
- Bloco de notas
- Compartilhamento com familiares
- Comandos por voz
- Integração com Google Calendar
- Relatórios de saúde

---

## 👥 Público-alvo

- Pessoas idosas
- Pessoas com baixa visão
- Pessoas com dificuldades motoras
- Usuários com pouca experiência em tecnologia

---

## 📚 Fundamentação

O desenvolvimento foi baseado em estudos sobre acessibilidade digital para idosos, considerando recomendações como:

- Alto contraste entre texto e fundo
- Fontes maiores
- Ícones intuitivos
- Botões grandes
- Menor carga cognitiva
- Navegação simplificada
- Feedback visual
- Linguagem clara

---

## 📄 Desenvolvido
  Desenvolvido com ❤️ para promover acessibilidade, autonomia e inclusão digital.
por: Bruna Eduarda; Arthur Tenorio.
````

    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
