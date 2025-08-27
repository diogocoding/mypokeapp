// Pegando os elementos do HTML que vamos usar
const searchButton = document.getElementById('searchButton');
const pokemonNameInput = document.getElementById('pokemonName');
const resultDiv = document.getElementById('result');

// Adiciona um "ouvinte de evento" no botão. Quando o botão for clicado, a função será executada.
searchButton.addEventListener('click', () => {
    // Pega o nome do pokémon digitado, converte para minúsculas e remove espaços
    const pokemonName = pokemonNameInput.value.toLowerCase().trim();

    if (pokemonName === '') {
        alert('Por favor, digite o nome de um Pokémon.');
        return;
    }

    // A função fetch é quem faz a "mágica" de chamar a API
    // É como fazer o pedido ao garçom
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => {
            // Se o garçom disser que não encontrou o prato (erro 404), nós avisamos o usuário
            if (!response.ok) {
                throw new Error('Pokémon não encontrado!');
            }
            // Se deu tudo certo, pedimos para o garçom "traduzir" o prato para nós (formato JSON)
            return response.json();
        })
        .then(data => {
            // Com os dados em mãos, vamos mostrar na tela
            displayPokemon(data);
        })
        .catch(error => {
            // Se deu algum erro no meio do caminho, mostramos no console e na tela
            console.error('Erro:', error);
            resultDiv.innerHTML = `<p>${error.message}</p>`;
            resultDiv.classList.add('visible');
        });
});

// Função para mostrar os dados do Pokémon na tela
function displayPokemon(data) {
    // Extraindo os dados que queremos do objeto 'data'
    const name = data.name;
    const id = data.id;
    const imageUrl = data.sprites.front_default; // A imagem do Pokémon
    const type = data.types[0].type.name; // O tipo principal do Pokémon

    // Criando o HTML que será inserido na nossa página
    const pokemonHtml = `
        <img src="${imageUrl}" alt="Imagem do ${name}">
        <h2>${name} (#${id})</h2>
        <p>Tipo: ${type}</p>
    `;

    // Colocando o HTML dentro da div 'result'
    resultDiv.innerHTML = pokemonHtml;
    // Adiciona a classe 'visible' para fazer a animação de aparecer
    resultDiv.classList.add('visible');
}