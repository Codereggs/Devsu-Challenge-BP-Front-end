import { countPokemons, searchById, tableInfo } from "../mocks/mockFetch";
import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import App from "../components/organism/App";

it("renders without crashing", () => {
  render(<App />);
});

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

it("renders search bar", () => {
  render(<App />);
  const inputSearchBar = screen.getByLabelText("Listado de Pokemon");

  mockedAxios.get.mockResolvedValue({
    data: searchById,
  });

  fireEvent.change(inputSearchBar, { target: "1705" });

  expect(screen.getByRole("button", { name: "Nuevo" })).toBeEnabled();
  expect(inputSearchBar).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Buscar")).toBeInTheDocument();
});

it("renders pokemon table", () => {
  render(<App />);

  mockedAxios.get.mockResolvedValue({
    data: tableInfo,
  });
  mockedAxios.get.mockResolvedValue({ data: countPokemons });

  expect(screen.getByRole("table")).toBeInTheDocument();
  expect(screen.getByTestId("header-table-names")).toBeInTheDocument();
  expect(
    screen.getByRole("row", { name: "Nombre Imagen Ataque Defensa Acciones" })
  ).toBeInTheDocument();
  expect(screen.getByTestId("quantity")).toBeInTheDocument();
});

it("renders pokemon panel", () => {
  render(<App />);
  const createButton = screen.getByRole("button", { name: "Nuevo" });
  fireEvent.click(createButton);

  const nameInput = screen.getByPlaceholderText("Nombre");
  const imgInput = screen.getByPlaceholderText("Url");
  const attackLabel = screen.getByRole("slider", { name: "Ataque:" });
  const defenseLabel = screen.getByRole("slider", { name: "Defensa:" });
  const cancelButton = screen.getByRole("button", { name: "Cancelar" });
  const saveButton = screen.getByRole("button", { name: "Guardar" });

  expect(nameInput).toBeInTheDocument();
  expect(imgInput).toBeInTheDocument();
  expect(attackLabel).toBeInTheDocument();
  expect(defenseLabel).toBeInTheDocument();
  expect(cancelButton).toBeEnabled();
  expect(saveButton).toBeDisabled();
});
