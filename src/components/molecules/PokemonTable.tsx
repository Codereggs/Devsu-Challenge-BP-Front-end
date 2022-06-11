import { PokemonTableProps } from "../../features/interfaces/pokemons.interface";
import { deletePokemon } from "../../features/request/service";

import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";

const PokemonTable: React.FC<PokemonTableProps> = ({
  data,
  showEdit,
  setReload,
}) => {
  const onClickEdit = (pokemon: any) => {
    showEdit({ show: true, data: pokemon });
  };
  const onClickDelete = (pokeId: number) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("¿Estás seguro de eliminar el pokemon?")) {
      deletePokemon(pokeId);
      setReload(true);
    } else {
      return false;
    }
  };

  const pokemonItem = (pokemonItem: any) => (
    <tr key={pokemonItem?.id}>
      <td>{pokemonItem?.name}</td>
      <td className="table-data-img">
        <img
          src={pokemonItem?.image}
          alt={pokemonItem.name}
          className="table-img"
          loading="lazy"
        />
      </td>
      <td>{pokemonItem?.attack}</td>
      <td>{pokemonItem?.defense}</td>
      <td className="table-data-icons">
        <AiOutlineEdit onClick={() => onClickEdit(pokemonItem)} />
        <MdDeleteForever onClick={() => onClickDelete(pokemonItem?.id)} />
      </td>
    </tr>
  );

  const notFoundRender = () => {
    return (
      <tr>
        <td colSpan={5}>
          <p className="not-found">Pokemon Not Found</p>
        </td>
      </tr>
    );
  };

  return (
    <table>
      <thead>
        <tr data-testid="header-table-names">
          <th>Nombre</th>
          <th>Imagen</th>
          <th>Ataque</th>
          <th>Defensa</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data && data.map((pokemon: any) => pokemonItem(pokemon))}
        {data?.length === 0 && notFoundRender()}
      </tbody>
    </table>
  );
};

export default PokemonTable;
