const API_URL = 'https://jsonplaceholder.typicode.com/posts';
const outputDiv = document.getElementById('output');

/**
 * Função auxiliar para exibir mensagens de status ou erro.
 * @param {string} message - A mensagem a ser exibida.
 * @param {boolean} isError - Se a mensagem é um erro.
 */
function displayMessage(message, isError = false) {
    outputDiv.innerHTML = `<p class="${isError ? 'error' : 'success'}">${message}</p>`;
}

/**
 * Função para realizar uma requisição GET e exibir os dados.
 */
async function getPosts() {
    displayMessage('Buscando posts...');
    try {
        const response = await fetch(API_URL);

        // 4. Tratar erros de requisição (status de resposta)
        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const posts = await response.json();

        // 3. Exibir os dados obtidos de forma organizada
        let html = '<h2>Posts Recebidos (GET)</h2>';
        html += '<table><thead><tr><th>ID</th><th>Título</th><th>Corpo</th></tr></thead><tbody>';

        // Exibir apenas os 5 primeiros para não sobrecarregar a página
        posts.slice(0, 5).forEach(post => {
            html += `<tr><td>${post.id}</td><td>${post.title}</td><td>${post.body.substring(0, 50)}...</td></tr>`;
        });

        html += '</tbody></table>';
        outputDiv.innerHTML = html;

    } catch (error) {
        // 4. Tratar erros de requisição (try/catch)
        displayMessage(`Falha na requisição GET: ${error.message}`, true);
    }
}

/**
 * Função para realizar uma requisição POST (criação de um novo post).
 */
async function createPost() {
    displayMessage('Tentando criar um novo post (POST)...');

    const newPost = {
        title: 'Novo Post TDE 03',
        body: 'Este é o corpo do novo post criado para o trabalho escolar.',
        userId: 1,
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPost),
        });

        // 4. Tratar erros de requisição (status de resposta)
        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const createdPost = await response.json();

        // 3. Exibir os dados obtidos de forma organizada
        let html = '<h2>Post Criado (POST)</h2>';
        html += '<p>O servidor retornou o seguinte objeto, confirmando a criação (simulada):</p>';
        html += '<ul>';
        html += `<li><strong>ID Retornado:</strong> ${createdPost.id}</li>`;
        html += `<li><strong>Título:</strong> ${createdPost.title}</li>`;
        html += `<li><strong>Corpo:</strong> ${createdPost.body}</li>`;
        html += `<li><strong>UserID:</strong> ${createdPost.userId}</li>`;
        html += '</ul>';
        outputDiv.innerHTML = html;

    } catch (error) {
        // 4. Tratar erros de requisição (try/catch)
        displayMessage(`Falha na requisição POST: ${error.message}`, true);
    }
}

// Adicionar listeners aos botões
document.getElementById('get-button').addEventListener('click', getPosts);
document.getElementById('post-button').addEventListener('click', createPost);

// Executar o GET ao carregar a página para mostrar dados iniciais
window.onload = getPosts;
