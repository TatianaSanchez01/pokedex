import { RiListSettingsLine } from "react-icons/ri";
import { FilterBar, PokemonList } from "../components";
export const HomePage = () => {
    return (
        <>
            <div className="container-filter container">
                <div className="icon-filter">
                    <RiListSettingsLine />
                    <span>Filtrar</span>
                </div>
            </div>
            <PokemonList />
            <FilterBar />
        </>
    );
};
