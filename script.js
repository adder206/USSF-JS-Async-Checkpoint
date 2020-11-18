let fs = require('fs');
let fetch = require('node-fetch');

class PokeInfo
{
    constructor(newInputFile = './input.txt')
    {
        this.inputFile = newInputFile;
    }

    getInfo()
    {
        //fs.open(this.inputFile, 'w', (err) =>
        //{
        //    if (err) throw err;
        //});

        fs.readFile(this.inputFile, (err, data) =>
        {
            if (err)
            {
                throw err;
            }

            this.fetchData(data.toString());
        })
    }

    fetchData(inData)
    {
        //console.log(data);
        const pokemonArray = inData.split('\n');
        pokemonArray.forEach((element) => 
        {
            const pokemonName = element.toLowerCase();
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
                .then(response => response.json())
                .then(data => 
            {
                this.displayPokemonInfo(data);
            })
            .catch(() => 
            {
                console.log("Error");
            });
        });
    }

    displayPokemonInfo(pokemonObject)
    {
        //console.log(pokemonObject);
        let displayString = `${pokemonObject.name}: `
        //console.log(pokemonObject.types.type.name.join(','));
        for (let i = 0; i < pokemonObject.types.length; ++i)
        {
             displayString += pokemonObject.types[i].type.name + ", ";
            // displayString += pokemonObject.types[i].type.name;
        }

        displayString = displayString.substring(0, displayString.length - 2);
        console.log(displayString);
    }
}

let pokeInfo = new PokeInfo();
pokeInfo.getInfo();

// -----

//let pokemon = fetch('https://pokeapi.co/api/v2/pokemon/charmander')
//    .then(response => response.json())
//    .then(data => {
//        console.log("Name: " + data.name);
//        console.log("Type: " + data[0].type.name);
//    });