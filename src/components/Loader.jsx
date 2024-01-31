import { spiral } from "ldrs";

export const Loader = () => {
    spiral.register();
    return (
        <div className="container-loader">
            <l-spiral size="40" speed="0.9" color="black"></l-spiral>
        </div>
    );
};
