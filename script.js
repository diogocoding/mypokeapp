
const searchButton = document.getElementById('searchButton');
const pokemonNameInput = document.getElementById('pokemonName');
const resultDiv = document.getElementById('result');


searchButton.addEventListener('click', () => {
   
    const pokemonName = pokemonNameInput.value.toLowerCase().trim();

    if (pokemonName === '') {
        alert('Por favor, digite o nome de um Pokémon.');
        return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => {
          
            if (!response.ok) {
                throw new Error('Pokémon não encontrado!');
            }
            
            return response.json();
        })
        .then(data => {
          
            displayPokemon(data);
        })
        .catch(error => {
            
            console.error('Erro:', error);
            resultDiv.innerHTML = `<p>${error.message}</p>`;
            resultDiv.classList.add('visible');
        });
});


function displayPokemon(data) {
   
    const name = data.name;
    const id = data.id;
    const imageUrl = data.sprites.front_default; 
    const type = data.types[0].type.name; 

    
    const pokemonHtml = `
        <img src="${imageUrl}" alt="Imagem do ${name}">
        <h2>${name} (#${id})</h2>
        <p>Tipo: ${type}</p>
    `;

   
    resultDiv.innerHTML = pokemonHtml;
   
    resultDiv.classList.add('visible');
}
