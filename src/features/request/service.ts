import { axiosDelete, axiosGet, axiosPost, axiosPut } from "./axiosCRUD";

export const getPokemons = (id?: number | string) => {
  if (!id || id === "") {
    let allPokemons = axiosGet(
      "https://pokemon-pichincha.herokuapp.com/pokemons/?idAuthor=1"
    );
    return allPokemons;
  } else {
    let pokemon = axiosGet(
      "https://pokemon-pichincha.herokuapp.com/pokemons",
      id
    );
    return pokemon;
  }
};

export const savePokemon = (options: any) => {
  axiosPost(
    "https://pokemon-pichincha.herokuapp.com/pokemons/?idAuthor=1",
    options
  );
};

export const deletePokemon = (id: number) => {
  axiosDelete("https://pokemon-pichincha.herokuapp.com/pokemons", id);
};

export const updatePokemon = (options: any, id: number) => {
  axiosPut("https://pokemon-pichincha.herokuapp.com/pokemons", id, options);
};

export const getQuantity = () => {
  let quantity = axiosGet(
    "https://pokemon-pichincha.herokuapp.com/pokemons/count?idAuthor=1"
  );
  return quantity;
};
