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
    }, [offset]);

    useEffect(() => {
        getGlobalPokemons();
    }, []);

    const onClickLoadMore = () => {
        setOffset(offset + 10);
    };
    const [typeSelected, setTypeSelected] = useState({
        grass: false,
        normal: false,
        fighting: false,
        flying: false,
        poison: false,
        ground: false,
        rock: false,
        bug: false,
        ghost: false,
        steel: false,
        fire: false,
        water: false,
        electric: false,
        psychic: false,
        ice: false,
        dragon: false,
        dark: false,
        fairy: false,
        unknow: false,
        shadow: false,
    });
    const [filteredPokemons, setFilteredPokemons] = useState([]);

    const handleCheckbox = (event) => {
        setTypeSelected({
            ...typeSelected,
            [event.target.name]: event.target.checked,
        });

        if (event.target.checked) {
            const filteredResults = globalPokemons.filter((pokemon) =>
                pokemon.types
                    .map((type) => type.type.name)
                    .includes(event.target.name)
            );
            setFilteredPokemons([...filteredPokemons, ...filteredResults]);
        } else {
            const filteredResults = filteredPokemons.filter(
                (pokemon) =>
                    !pokemon.types
                        .map((type) => type.type.name)
                        .includes(event.target.name)
            );
            setFilteredPokemons([...filteredResults]);
        }
    };

    return (
        <PokemonContext.Provider
            value={{
                valueSearch,
                onInputChange,
                onResetForm,
                allPokemons,
                globalPokemons,
                getPokemonById,
                onClickLoadMore,
                //Loader
                loading,
                setLoading,
                //btn Filter
                active,
                setActive,
                //Filter
                handleCheckbox,
                filteredPokemons,
            }}
        >
            {children}
        </PokemonContext.Provider>
    );
};

PokemonProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
