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
            let li = $('<li></li>').addClass('list-group-item');
            let btn = $('<button></button').addClass('btn btn-light rounded-circle');
            let span = $('<span></span>').text(value.name);

            btn.attr({
                'data-bs-toggle':'modal',
                'data-bs-target':'#myModal'
            });
           
            addEvents(btn, value);
            btn.append(span);
            li.append(btn);

            if( (i % 5) == 0){  
                ul = $('<ul></ul>').addClass('pokemon-list list-group col-12 col-sm-6 col-md-4 col-lg-4 col-xl-2');
                ul.attr('id', i);   
            }    

            if( (i % 30) == 0){  
                div = $('<div></div>').addClass('row text-center justify-content-center');
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
            //console.log(details);
            pokemon.id = details.id;
            pokemon.imageURL = details.sprites.front_default;
            pokemon.height = details.height;
            pokemon.types =  details.types;
            pokemon.weight = details.weight;
            pokemon.abilities = details.abilities;            
            pokemon.moves = details.moves;
            pokemon.stats = details.stats;
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
        
        let row = $('<div></div>').addClass('row text-center');
        let col =($('<div>',{'class' : 'col' }));
        col.append($('<img>',{'src' : pokemon.imageURL, 'alt' : pokemon.name, 'class' : 'img-fluid'}));
        row.append(col);

        console.log(row);
       
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
        
        modalContent.append(contentL, contentR);
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
