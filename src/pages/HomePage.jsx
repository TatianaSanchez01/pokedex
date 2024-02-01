import { RiListSettingsLine } from "react-icons/ri";
import { FilterBar, PokemonList } from "../components";
import { useContext } from "react";
import { PokemonContext } from "../context/PokemonContext";
export const HomePage = () => {
    const { active, setActive} =
        useContext(PokemonContext);
    return (
        <>
            <div className="container-filter container">
                <div className="icon-filter" onClick={() => setActive(!active)}>
                    <RiListSettingsLine />
                    <span className="">Filtrar</span>
                </div>
                
            </div>

            <PokemonList />
            <FilterBar />
        </>
    );
};
