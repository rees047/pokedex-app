//my own js file utilizing polyfill.js

// Immediately Invoke Function Expression (IIFE) to protect global variables
let pokemonRepository = (function () {
    
    let pokemonList = [];
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('#modal-container');

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
            pokemon.weight = details.weight;
            pokemon.abilities = details.abilities;            
        }).catch (function (e) {
            console.error(e);
        });
    }

    function showDetails(pokemon){
        loadDetails(pokemon).then(function(){
            showModal(pokemon.name, pokemon);
        });
    }

    function showModal(title, pokemon){
        //console.log(pokemon);
        modalContainer.innerHTML = '' //clear all existing modal content

        let modal = document.createElement('div');
        modal.classList.add('modal');

        //add the new modal content
        let closeButtonEl = document.createElement('button');
        closeButtonEl.classList.add('modal-close');
        closeButtonEl.innerText = 'Close';
        closeButtonEl.addEventListener('click', hideModal)

        let leftDiv = document.createElement('div');
        leftDiv.classList.add('common-box');
        leftDiv.classList.add('left');
        
        let titleElement = document.createElement('h1');
        titleElement.innerText = title;

        let heightElement = document.createElement('p');
        heightElement.innerText = "Height(m): " + pokemon.height;

        let weightElement = document.createElement('p');
        weightElement.innerText = "Weight(lbs): " + pokemon.weight;
       
        let abilitiesElement = document.createElement('p');
        abilitiesElement.innerText = 'Abilities:';

        let ul = document.createElement('ul');

        for (var i=0; i<pokemon.abilities.length; i++){
                let li = document.createElement('li');
                li.innerHTML = pokemon.abilities[i].ability.name;
                ul.appendChild(li);
        }

        let rightDiv = document.createElement('div');
        rightDiv.classList.add('common-box');
        rightDiv.classList.add('rightDiv');

        let imgElement = document.createElement('img');
        imgElement.src = pokemon.imageURL;
        imgElement.alt = pokemon.name;

        let clearDiv = document.createElement('div');
        clearDiv.classList.add('clear-float');

        //let contentEl = document.createElement('p');
        //contentEl.innerText = text;

        leftDiv.appendChild(heightElement);
        leftDiv.appendChild(weightElement);
        leftDiv.appendChild(abilitiesElement);
        leftDiv.appendChild(ul);

        rightDiv.appendChild(imgElement);

        modal.appendChild(closeButtonEl);
        modal.appendChild(titleElement);
        modal.appendChild(leftDiv);
        modal.appendChild(rightDiv);
        modal.appendChild(clearDiv);
       
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');       
    }

    function hideModal(){
        modalContainer.classList.remove('is-visible');
    }

    /*document.querySelector('#show-modal').addEventListener('click', () => {
        pokemonRepository.showModal('Modal title', 'This is the modal content!');
    });*/

    window.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
            hideModal();
        }
    });
  
    modalContainer.addEventListener('click', (e) =>{
        // Since this is also triggered when clicking INSIDE the modal container,
        // We only want to close if the user clicks directly on the overlay       
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });  
      
    return {
        add: add,   
        addListItem: addListItem,
        addEvents: addEvents,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails,
        showModal : showModal,
        isValidPokemon: isValidPokemon
    };
})();


pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function(pokeObj) {
        pokemonRepository.addListItem(pokeObj);   
    });
});

