// Immediately Invoke Function Expression (IIFE) to protect global variables
let pokemonRepository = (function () {
    
    let pokemonList = [];
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('#modal-container');

    function add(pokemon){
        pokemonList.push(pokemon);
    }

    function addListItem(pokeObj){     //for jquery implementation  
        let mainContainer = $('#main-container');     
        let ul = '';
        let div = '';
      
        $(pokeObj).each(function(i,value){
            let li = $('<li></li>').addClass('list-group-item list-group-item-info');
            let btn = $('<button></button').text(value.name).addClass('btn btn-light w-100');

            btn.attr({
                'data-bs-toggle':'modal',
                'data-bs-target':'#myModal'
            });
           
            addEvents(btn, value);
            li.append(btn);

            if( (i % 10) == 0){  
                ul = $('<ul></ul>').addClass('pokemon-list list-group col-lg-3');
                ul.attr('id', i);   
            }    

            if( (i % 30) == 0){  
                div = $('<div></div>').addClass('pokemon-list row justify-content-center');
            }
                      
            ul.append(li);    
            div.append(ul);          
            mainContainer.append(div);
                      
           // ul.append(li);              
           // mainContainer.append(ul);

        });       
    }

    function addEvents(el, pokeObj){         
        el = (el instanceof jQuery) ? el[0] : el       
        el.addEventListener('click', function (event) {
            showDetails(pokeObj);
        });
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
        $('#myModalLabel').empty().text(title);

        let modalContent = $('#modalContent');
        modalContent.empty(); //clear all existing modal content             
       
        let contentL = $('<div class="col"></div>');
        contentL.append($('<p></p>', { 'text' : 'Height (m): ' + pokemon.height }));
        contentL.append($('<p></p>', { 'text' : 'Weight (lbs): ' + pokemon.weight }));
        contentL.append($('<p></p>', { 'text' : 'Abilities: '}));  

        let ul = $('<ul></ul>');      
        for (var i=0; i<pokemon.abilities.length; i++){
                let li = ($('<li></li>'))
                li.text(pokemon.abilities[i].ability.name);
                ul.append(li);
        }

        contentL.append(ul);

        let contentR = $('<div></div>', {'class' : 'col text-center'});
        contentR.append($('<img>',{'src' : pokemon.imageURL, 'alt' : pokemon.name, 'class' : 'img-fluid'}));
        
        modalContent.append(contentL,contentR);
    }

    return {
        add: add,   
        addListItem: addListItem,
        addEvents: addEvents,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails,
        showModal : showModal,
    };
})();


pokemonRepository.loadList().then(function(){
    pokemonRepository.addListItem(pokemonRepository.getAll()); //jquery implementation
});
