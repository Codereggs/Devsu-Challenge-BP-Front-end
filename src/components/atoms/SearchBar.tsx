import { SearchBarProps } from "@src/features/interfaces/pokemons.interface";
import { AiOutlinePlus } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import CustomizedButton from "./CustomizedButton";
import debounce from "lodash/debounce";
import { getPokemons } from "../../features/request/service";

const SearchBar: React.FC<SearchBarProps> = ({
  showEdit,
  setPokemonList,
  setReload,
}) => {
  const requestPokemon = (id: string) => {
    if (/^[\d]{4}$/gi.test(id)) {
      getPokemons(id).then((response) => {
        if (!response) return setPokemonList([]);
        return setPokemonList([response]);
      });
    } else {
      getPokemons().then((response) => {
        const filteredPokemons = (id: string) => {
          const filter = response.filter((pokemon: any) => {
            const regex = RegExp(`^${id}*`);
            return regex.test(pokemon.name.toLowerCase());
          });
          return filter;
        };
        if (id.length < 3) return setPokemonList(response);
        if (id.length > 2) return setPokemonList(filteredPokemons(id));
      });
    }
  };

  return (
    <div className="search-bar">
      <label>Listado de Pokemon</label>
      <div className="searchInput">
        <div>
          <BiSearch />
          <input
            type="search"
            placeholder="Buscar"
            onChange={debounce(
              (event) => requestPokemon(event.target.value),
              500
            )}
            onKeyDown={(key) => {
              if (key.key === " ") return key.preventDefault();
              return key;
            }}
          ></input>
        </div>
        <CustomizedButton
          text="Nuevo"
          icon={<AiOutlinePlus />}
          returnFunction={() => showEdit({ show: true, data: undefined })}
        />
      </div>
    </div>
  );
};

export default SearchBar;
