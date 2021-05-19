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
            pokemon.type = details.type;
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
        let myModalLabel =  $('#myModalLabel');
        myModalLabel.empty().text(title);

        //pokemon type          
        for (var i=0; i < 3; i++){  
            if (pokemon.types[i] == undefined) break;
            let type = $('<span></span>').addClass('badge alert-light').text(pokemon.types[i].type.name);
            myModalLabel.append(type);
        }
        
        //pokemon image
        let pokeImg = $('.pokeImg');
        pokeImg.empty(); //clear all existing modal content   
        pokeImg.append($('<img>', {'src' : pokemon.imageURL}));
       
        //pokemon info     
        let infoL = $('#info .info-left');
        infoL.empty();     
        infoL.append( $('<p></p>', { 'text' : 'ID: ', 'class' : 'question'}).append( $('<span></span>', { 'text' : pokemon.id, 'class' : 'answer' }) ) );
        infoL.append( $('<p></p>', { 'text' : 'Height: ', 'class' : 'question'}).append( $('<span></span>', { 'text' : pokemon.height + 'M', 'class' : 'answer' }) ) );
        infoL.append( $('<p></p>', { 'text' : 'Weight: ', 'class' : 'question'}).append( $('<span></span>', { 'text' : pokemon.weight + 'LBS', 'class' : 'answer' }) ) );

        //pokemon abilities  
        let infoR = $('#info .info-right');
        infoR.empty();     
        let ul_abilities = $('<ul></ul>');      
        for (var i=0; i < 4; i++){
            if (pokemon.abilities[i] == undefined) break;
            let li = ($('<li></li>')).addClass('answer');
            li.text(pokemon.abilities[i].ability.name);
            ul_abilities.append(li);
        }
        infoR.append( $('<p></p>', { 'text' : 'Abilities: '}).append(ul_abilities) );  
        //infoR.append(ul_abilities);

        let stats = $('#stats tbody');
        stats.empty();     
        for (var i=0; i<pokemon.stats.length; i++){           
                let tr = ($('<tr></tr>')).addClass('answer');               
                tr.append($('<td></td>').text(pokemon.stats[i].stat.name));
                tr.append($('<td></td>').addClass('text-center').text(pokemon.stats[i].base_stat));
                tr.append($('<td></td>').addClass('text-center').text(pokemon.stats[i].effort));
                stats.append(tr);
        }        

        let moves = $('#moves');
        moves.empty();
        let ul_moves = $('<ul></ul>', {'class' : 'list-group list-group-flush'}); 
        for (var i=0; i< 4; i++){         
            if (pokemon.moves[i] == undefined) break;
                let li = ($('<li></li>').addClass('list-group-item list-group-item-danger answer'));
                li.text(pokemon.moves[i].move.name);
                ul_moves.append(li);
        }
        moves.append(ul_moves);

        
        //modalContent.append(contentL, contentR);
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
