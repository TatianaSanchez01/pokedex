import { useEffect, useState } from "react";
import { PokemonContext } from "./PokemonContext";
import PropTypes from "prop-types";
import { useForm } from "../hook/useForm";

export const PokemonProvider = ({ children }) => {
    const [offset, setOffset] = useState(0);
    const [allPokemons, setAllPokemons] = useState([]);
    const [globalPokemons, setGlobalPokemons] = useState([]);

    // Utilizar customHook = useForm
    const { valueSearch, onInputChange, onResetForm } = useForm({
        valueSearch: "",
    });

    // Estados simples
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState(false);

    // Llamada a los 10 primeros pokemones
    const getAllPokemons = async (limit = 10) => {
        const baseUrl = "https://pokeapi.co/api/v2/";
        const res = await fetch(
            `${baseUrl}pokemon?limit=${limit}&offset=${offset}`
        );
        const data = await res.json();
        const promises = data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const data = await res.json();
            return data;
        });

        const results = await Promise.all(promises);

        setAllPokemons([...allPokemons, ...results]);
        setLoading(false);
    };

    // Llamada a todos los pokemones de la API
    const getGlobalPokemons = async () => {
        const baseURL = "https://pokeapi.co/api/v2/";

        const res = await fetch(`${baseURL}pokemon?limit=100000&offset=0`);
        const data = await res.json();

        const promises = data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const data = await res.json();
            return data;
        });
        const results = await Promise.all(promises);

        setGlobalPokemons(results);
        setLoading(false);
    };

    //Llamar pokemon por id
    const getPokemonById = async (id) => {
        const baseUrl = "https://pokeapi.co/api/v2/";
        const res = await fetch(`${baseUrl}pokemon/${id}`);

        const data = await res.json();

        return data;
    };

    useEffect(() => {
        getAllPokemons();
    }, []);

    useEffect(() => {
        getGlobalPokemons();
    }, []);

    return (
        <PokemonContext.Provider
            value={{
                valueSearch,
                onInputChange,
                onResetForm,
                allPokemons,
                globalPokemons,
                getPokemonById,
            }}
        >
            {children}
        </PokemonContext.Provider>
    );
};

PokemonProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
