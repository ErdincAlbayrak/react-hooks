// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'

function PokemonInfo({pokemonName}) {
  // 🐨 Have state for the pokemon (null)
  //const [pokemon, setPokemon] = React.useState(null)
  //const [error, setError] = React.useState(false)
  //const [status, setStatus] = React.useState('idle')
  const [statusObj, setStatusObj] = React.useState({state:'idle', pokemon: null})
  function pokemonRequest(pokemonName) {
    //setPokemon(null)
    //setStatus('pending')
    setStatusObj({state:'pending', pokemon: null})
    //fetchPokemon(pokemonName).then(pokemon => {setPokemon(pokemon); setStatus('resolved')}, error => {setError(error); setStatus('rejected')})
    fetchPokemon(pokemonName).then(pokemon => {setStatusObj({state:'resolved', pokemon: pokemon})}, 
                                    error => {setStatusObj({state:'rejected', error: error})})
  }
  React.useEffect(() => pokemonRequest(pokemonName),[pokemonName])


  /*if (error)
  {
    console.log(error)
    return <div role="alert">
    There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    </div>
  }
  else if (pokemonName === '') {
    return 'Submit a pokemon'
  }
  else if (pokemon === null) {
    return <PokemonInfoFallback name={pokemonName}/>
  }
  else {
    return <PokemonDataView pokemon={pokemon}/>
  }*/

  if (statusObj.state === 'rejected')
  {
    return <div role="alert">
    There was an error: <pre style={{whiteSpace: 'normal'}}>{statusObj.error.message}</pre>
    </div>
  }
  else if (statusObj.state ==='idle') {
    return 'Submit a pokemon'
  }
  else if (statusObj.state ==='pending') {
    return <PokemonInfoFallback name={pokemonName}/>
  }
  else {
    return <PokemonDataView pokemon={statusObj.pokemon}/>
  }

  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null.
  // (This is to enable the loading state when switching between different pokemon.)
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => {/* update all the state here */},
  //   )
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />

  // 💣 remove this
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName}/>
      </div>

    </div>
  )
}

export default App
