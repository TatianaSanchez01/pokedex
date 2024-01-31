import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const PokemonCard = ({ pokemon }) => {
    return (
        <Link to={`/pokemon/${pokemon.id}`} className="card-pokemon">
            <div className="card-img">
                <img
                    src={pokemon.sprites.other.home.front_shiny}
                    alt={`Pokemon ${pokemon.name}`}
                />
            </div>
            <div className="card-info">
                <span className="pokemon-id">N° {pokemon.id}</span>
                <h3>{pokemon.name}</h3>
                <span>Altura: {pokemon.height}</span>
                <span>Peso: {pokemon.weight}</span>
                <div className="card-types">
                    {pokemon.types.map((type) => (
                        <span key={type.type.name} className={type.type.name}>
                            {type.type.name}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
};

PokemonCard.propTypes = {
    pokemon: PropTypes.node.isRequired,
};
