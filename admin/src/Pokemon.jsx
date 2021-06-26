import React from 'react';
import { useGetPokemonByNameQuery } from './services/pokemon';

export default function Pokemon({ name }) {
    const { data, error, isLoading, isFetching } =
        useGetPokemonByNameQuery(name);

    return (
        <div className="App">
            {error ? (
                <>Oh no, there was an error</>
            ) : isLoading ? (
                <>Loading...</>
            ) : data ? (
                <>
                    <h3>
                        {data.species.name} {isFetching ? '...' : ''}
                    </h3>
                    <img
                        src={data.sprites.front_shiny}
                        alt={data.species.name}
                    />
                </>
            ) : null}
        </div>
    );
}
