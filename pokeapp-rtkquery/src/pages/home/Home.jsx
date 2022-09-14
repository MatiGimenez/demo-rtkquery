import React from 'react'
import { useGetPokemonByNameQuery } from '../../store/slices/pokemonApi'

const Home = () => {
  const {data} = useGetPokemonByNameQuery('chikorita')

  return <div><h1 className='text-3xl font-bold underline'>Home</h1></div>
}

export default Home
