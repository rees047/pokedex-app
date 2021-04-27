//global variable pokemonList

/* let pokemonList = [
    {
        name : "Mew",
        height: 0.4,
        type: "Psychic",
        abilities: "Synchronize"
    },
   {
        name : "Butterfree",
        height: 1.1,
        type: ["Bug, Flying"],
        abilities: ["Compound Eyes", "Tinted Lens"]
    }, 
    {
        name : "Cyndaquil",
        height: 0.5,
        type: "Fire",
        abilities: ["Flash Fire", "Blaze"]
    }, 
    {
        name : "Phanpy",
        height: 0.5,
        type: "Ground",
        abilities: ["Sand Veil", "Pick Up"]
    }, 
    {
        name : "Totodile",
        height: 0.6,
        eggGroup: "Water",
        abilities: ["Torrent", "Sheer Force"]
    }, 

] */

// Immediately Invoke Function Expression (IIFE) to protect global variables
let pokemonRepository = (function () {
    
    let pokemonList = [
        {
            name : "Mew",
            height: 0.4,
            type: "Psychic",
            abilities: "Synchronize"
        },
       {
            name : "Butterfree",
            height: 1.1,
            type: ["Bug, Flying"],
            abilities: ["Compound Eyes", "Tinted Lens"]
        }, 
        {
            name : "Cyndaquil",
            height: 0.5,
            type: "Fire",
            abilities: ["Flash Fire", "Blaze"]
        }, 
        {
            name : "Phanpy",
            height: 0.5,
            type: "Ground",
            abilities: ["Sand Veil", "Pick Up"]
        }, 
        {
            name : "Totodile",
            height: 0.6,
            eggGroup: "Water",
            abilities: ["Torrent", "Sheer Force"]
        }, 
    
    ];

    function add(pokemon){
        pokemonList.push(pokemon);
    }

    function addListItem(pokeObj){
        let pokeUl = document.querySelector('.pokemon-list');
        let pokeLi = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokeObj.name;
        button.classList.add('button-class');
        /*button.addEventListener('click', function (event) {
            showDetails(pokeObj);
        });*/
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

    function showDetails(pokemon){
        console.log(pokemon.name);
    }
  
    return {
        add: add,   
        addListItem: addListItem,
        addEvents, addEvents,
        getAll: getAll,
        isValidPokemon: isValidPokemon
    };
})();


//isValidPokemon = checks if key-value pairs are present
let newPokemon = {name : 'Snom'};        
    //console.log(pokemonRepository.isValidPokemon(newPokemon));

    newPokemon = {
        name : "Snom",
        height: 0.3,
        type: ["Bug, Ice"],
        abilities: ["Shield Dust", "Ice Scales"]
    };

    if(pokemonRepository.isValidPokemon(newPokemon)) pokemonRepository.add(newPokemon);

//start of first method
/*let htmlStart = '<div class="main-container"><div class="center-container">';
let htmlEnd = '</div></div>';

let myTable = '<table class="table-container"><caption>Pokemon List</caption>'; //setting up table contents and reusing the same variable for the table
    myTable = myTable + '<tr><th>Name</th><th>Age</th></tr>';

let pokeHeight = '';*/ //when using first method, take this out

    //for loop
    /*for (var i = 0; i < pokemonList.length; i++){
        pokeHeight = (pokemonList[i].height >= 1) ? '<span class="huge"> - WOW! That\'s HUGE!</span>' : ''; 
        myTable = myTable + '<tr><td>' + pokemonList[i].name + '</td><td>' + pokemonList[i].height + pokeHeight + '</td></tr>';
    }*/

    //forEach loop
    /*pokemonRepository.getAll().forEach(function(pokeObj) {
        pokeHeight = (pokeObj.height >= 1) ? '<span class="huge"> - WOW! That\'s HUGE!</span>' : ''; 
        myTable = myTable + '<tr><td>' + pokeObj.name + '</td><td>' + pokeObj.height + pokeHeight + '</td></tr>';
    });

    myTable = myTable + '</table>';
    
let myHTML = htmlStart + myTable + htmlEnd; //concatenating the variables to form my final html

document.write(myHTML);*/ //when using first method, take this out
//end of first method

//start of second method
pokemonRepository.getAll().forEach(function(pokeObj) {
    pokemonRepository.addListItem(pokeObj);   
});

