import { RiListSettingsLine } from "react-icons/ri";
import { FilterBar, PokemonList } from "../components";
import { useContext } from "react";
import { PokemonContext } from "../context/PokemonContext";
export const HomePage = () => {
    const { onClickLoadMore, active, setActive } = useContext(PokemonContext);
    return (
        <>
            <div className="container-filter container">
                <div className="icon-filter" onClick={() => setActive(!active)}>
                    <RiListSettingsLine />
                    <span>Filtrar</span>
                </div>
            </div>
            <PokemonList />
            <FilterBar />
            <div className="container-btn-load-more container">
                <button className="btn-load-more" onClick={onClickLoadMore}>
                    Cargar más
                </button>
            </div>
        </>
    );
};
