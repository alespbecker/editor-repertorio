
# Editor de Texto com Modo Escuro

Um editor de texto simples e elegante com suporte a modo escuro/claro e salvamento automático de rascunhos.

## Funcionalidades

- ✍️ Editor de texto com múltiplos parágrafos
- 🌓 Modo escuro/claro
- 💾 Salvamento de rascunhos
- 📱 Interface responsiva
- 👀 Visualização em tempo real

## Pré-requisitos para rodar o projeto

Antes de começar, você precisará ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) (normalmente vem com o Node.js)

## Instalação

Siga estes passos para instalar e rodar o projeto localmente:

1. Clone o repositório
```bash
git clone https://github.com/alessandrobecker/repertorio-enem-editor.git
```

2. Entre no diretório do projeto
```bash
cd repertorio-enem-editor
```

3. Instale as dependências
```bash
npm install
```

4. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

5. Abra o navegador e acesse
```
http://localhost:8080
```

## Tecnologias Utilizadas

- React
- TypeScript
- Tailwind CSS
- Vite
- Lucide Icons

## Estrutura do Projeto

```
src/
  ├── components/        # Componentes React
  │   ├── DraftEditor.tsx   # Componente principal do editor
  │   └── Paragraph.tsx     # Componente de parágrafo editável
  ├── hooks/            # Hooks personalizados
  ├── styles/           # Arquivos de estilo
  └── main.tsx         # Ponto de entrada da aplicação
```
