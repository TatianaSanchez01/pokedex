import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { PokemonContext } from "../context/PokemonContext";
export const Navigation = () => {
    const valueSearch = "";

    const onSearchSubmit = () => {};

    const onInputChange = () => {};

    const {number} = useContext(PokemonContext);
    return (
        <>
            <header className="container">
                <Link to="/" className="logo">
                    <img
                        src="https://archives.bulbagarden.net/media/upload/4/4b/Pok%C3%A9dex_logo.png"
                        alt="Logo Pokedex"
                    />
                </Link>

                <form onSubmit={onSearchSubmit}>
                    <div className="form-group">
                        <IoSearchOutline />
                        <input
                            type="search"
                            name="valueSearch"
                            id=""
                            value={valueSearch}
                            onChange={onInputChange}
                            placeholder="Buscar nombre de pokemon"
                        />
                    </div>

                    <button className="btn-search">Buscar</button>
                </form>
            </header>
            <Outlet />
        </>
    );
};
