import { useContext } from "react";
import { PokemonContext } from "../context/PokemonContext";
import { PokemonCard } from "./PokemonCard";

export const PokemonList = () => {
    const { allPokemons } = useContext(PokemonContext);
    return (
        <>
            <div className="card-list-pokemon container">
                {allPokemons.map((pokemon) => (
                    <PokemonCard pokemon={pokemon} key={pokemon.id} />
                ))}
            </div>
        </>
    );
};
