# TDE 03: Requisições HTTP com JavaScript

## Objetivo
O objetivo deste trabalho é demonstrar a capacidade de consumir APIs externas utilizando JavaScript, focando na implementação de requisições HTTP com os métodos **GET** e **POST**, utilizando a sintaxe moderna de `fetch` com `async/await` e incluindo o tratamento de erros.

## API Pública Utilizada
Para a realização deste trabalho, foi selecionada a API pública **JSONPlaceholder** (`https://jsonplaceholder.typicode.com/`).

> **JSONPlaceholder** é um serviço online gratuito que fornece dados falsos (mock data) para testes e prototipagem. É ideal para simular um backend completo sem a necessidade de configurar um servidor real.

O endpoint principal utilizado foi: `https://jsonplaceholder.typicode.com/posts`

## Métodos HTTP Implementados

A aplicação implementa duas funções principais, cada uma demonstrando um método HTTP diferente:

### 1. Requisição GET (Busca de Dados)

| Detalhe | Descrição |
| :--- | :--- |
| **Método** | `GET` |
| **Função** | `getPosts()` no `script.js` |
| **Ação** | Busca uma lista de recursos (posts) no servidor. |
| **Exibição** | Os dados são exibidos em uma tabela organizada na seção de saída da página HTML. |

**Implementação e Tratamento de Erros:**
A função `getPosts` utiliza `async/await` para buscar os dados. O tratamento de erros é feito em duas etapas:
1.  **Verificação do Status de Resposta:** `if (!response.ok)` verifica se o status HTTP está na faixa de sucesso (200-299). Se não estiver, um erro é lançado com o status.
2.  **Tratamento de Falhas de Rede:** Um bloco `try...catch` envolve toda a operação para capturar erros de rede ou outros erros de execução, exibindo uma mensagem de erro amigável ao usuário.

### 2. Requisição POST (Criação de Novo Recurso)

| Detalhe | Descrição |
| :--- | :--- |
| **Método** | `POST` |
| **Função** | `createPost()` no `script.js` |
| **Ação** | Envia um novo objeto (simulando a criação de um novo post) para o servidor. |
| **Exibição** | O objeto retornado pelo servidor (que inclui um novo `id` simulado) é exibido em uma lista na página HTML, confirmando que a requisição foi bem-sucedida. |

**Implementação e Tratamento de Erros:**
A função `createPost` também utiliza `async/await`. O corpo da requisição é enviado como JSON (`JSON.stringify(newPost)`) e o cabeçalho `Content-Type: application/json` é definido para informar ao servidor o formato dos dados. O tratamento de erros segue a mesma lógica da requisição `GET` (verificação de `response.ok` e `try...catch`).

## Estrutura do Projeto

O projeto está organizado na pasta `TDE 03` com a seguinte estrutura:

```
TDE 03/
├── index.html    # Estrutura da página e interface do usuário.
├── script.js     # Lógica JavaScript (requisições fetch, async/await e manipulação do DOM).
├── style.css     # Estilização da página.
└── README.md     # Documentação do trabalho (este arquivo).
```

Para executar, basta abrir o arquivo `index.html` em qualquer navegador moderno.
