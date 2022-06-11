export interface Pokemons {
  id: number;
  name: string;
  image: string;
  type: string;
  hp: number;
  attack: number;
  defense: number;
  idAuthor: number;
  created_at: string;
  updated_at: string;
}

export interface SearchBarProps {
  showEdit: React.Dispatch<
    React.SetStateAction<{
      show: boolean;
      data: undefined | any;
    }>
  >;
  setPokemonList: React.Dispatch<React.SetStateAction<never[] | any[]>>;
}

export interface PokemonTableProps {
  data?: Pokemons[];
  showEdit: React.Dispatch<
    React.SetStateAction<{
      show: boolean;
      data: undefined | any;
    }>
  >;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface MainPanelProps {
  showEdit: React.Dispatch<
    React.SetStateAction<{
      show: boolean;
      data: undefined | any;
    }>
  >;
  editData: any;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}
