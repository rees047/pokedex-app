//my own js file utilizing polyfill.js

// Immediately Invoke Function Expression (IIFE) to protect global variables
let pokemonRepository = (function () {
    
    let pokemonList = [];
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon){
        pokemonList.push(pokemon);
    }

    function addListItem(pokeObj){
        let pokeUl = document.querySelector('.pokemon-list');
        let pokeLi = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokeObj.name;
        button.classList.add('button-class');
        addEvents(button, pokeObj);
        pokeLi.appendChild(button);
        pokeUl.appendChild(pokeLi);
    }

    function addEvents(el, pokeObj){
        el.addEventListener('click', function (event) {
            showDetails(pokeObj);
        });
    }

    function isValidPokemon(pokemon){   
        let checker = false;
        let baseKeyArr = (pokemonList.length > 0 && pokemon !== null) ? Object.keys(pokemonList[0]) : [];
        let compareKeyArr = (typeof pokemon === 'object' && pokemon !== null) ? Object.keys(pokemon) : [];

        if( (baseKeyArr.length != 0) &&  (compareKeyArr .length != 0) ){
           
            for(var i = 0; i <= baseKeyArr.length; i++){                    
                if(baseKeyArr[i] != compareKeyArr[i])
                    return false;
                
                checker = true;           
            }
        }
        
        return checker;
    }

    function getAll(){
        return pokemonList;
    }

    function loadList(){
        return fetch(apiURL).then(function(response){
            return response.json();
        }).then(function(json){
            json.results.forEach(function(item){
                let pokemon = {
                    name: item.name,
                    detailsURL : item.url
                }
                add(pokemon);
            });
        }).catch(function(e){
            console.error(e);
        });
    }

    function loadDetails(pokemon){
        let url = pokemon.detailsURL;

        return fetch(url).then(function (response){
            return response.json();
        }).then(function (details){
            pokemon.imageURL = details.sprites.front_default;
            pokemon.height = details.height;
            pokemon.types =  details.types;
        }).catch (function (e) {
            console.error(e);
        });
    }

    function showDetails(pokemon){
        loadDetails(pokemon).then(function(){
            console.log(pokemon);
        });
    }
  
    return {
        add: add,   
        addListItem: addListItem,
        addEvents: addEvents,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails,
        isValidPokemon: isValidPokemon
    };
})();


pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function(pokeObj) {
        pokemonRepository.addListItem(pokeObj);   
    });
});

