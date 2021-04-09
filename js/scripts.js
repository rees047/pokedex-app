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

]

let htmlStart = '<div class="main-container"><div class="center-container">';
let htmlEnd = '</div></div>';

let myTable = '<table class="table-container"><caption>Pokemon List</caption>'; //setting up table contents and reusing the same variable for the table
    myTable = myTable + '<tr><th>Name</th><th>Age</th></tr>';

let pokeHeight = '';

    for (var i = 0; i < pokemonList.length; i++){
        pokeHeight = (pokemonList[i].height >= 1) ? '<span class="huge"> - WOW! That\'s HUGE!</span>' : ''; 
        myTable = myTable + '<tr><td>' + pokemonList[i].name + '</td><td>' + pokemonList[i].height + pokeHeight + '</td></tr>';
    }

    myTable = myTable + '</table>';
    
let myHTML = htmlStart + myTable + htmlEnd; //concatenating the variables to form my final html

document.write(myHTML);

