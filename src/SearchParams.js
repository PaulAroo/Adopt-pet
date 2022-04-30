import { useEffect, useState } from "react";
import { useContext } from "react";
import Results from "./Results";
import ThemeContext from "./ThemeContext";
import useBreedList from "./useBreedList";

const ANIMALS = ["birds", "cat", "dog", "rabbit", "reptile"];

const localCache = {};

const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal);
  const [pageNumber, setPageNumber] = useState(0);
  const [theme, setTheme] = useContext(ThemeContext);

  useEffect(() => {
    if (localCache[pageNumber]) {
      console.log(localCache[pageNumber]);
      setPets(localCache[pageNumber]);
    } else requestPets();
  }, [pageNumber]); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestPets() {
    const res = await fetch(
      `https://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}&page=${pageNumber}`
    );
    const json = await res.json();
    localCache[pageNumber] = json.pets;
    setPets(localCache[pageNumber]);
  }

  const paginate = (e) => {
    setPageNumber(e.target.innerText - 1);
  };

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            value={animal}
            id="animal"
            onChange={(e) => setAnimal(e.target.value)}
            onBlur={(e) => setAnimal(e.target.value)}
          >
            <option></option>
            {ANIMALS.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            value={breed}
            id="breed"
            onChange={(e) => setBreed(e.target.value)}
            onBlur={(e) => setBreed(e.target.value)}
          >
            <option />
            {breeds.map((breed) => (
              <option value={breed} key={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option value=""></option>
            <option value="peru">Peru</option>
            <option value="aliceblue">Aliceblue</option>
            <option value="purple">Purple</option>
            <option value="bisque">Bisque</option>
            <option value="plum">Plum</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <div className="pagination">
        <button onClick={(e) => paginate(e)}>1</button>
        <button onClick={(e) => paginate(e)}>2</button>
        <button onClick={(e) => paginate(e)}>3</button>
        <button onClick={(e) => paginate(e)}>4</button>
        <button onClick={(e) => paginate(e)}>5</button>
        <button onClick={(e) => paginate(e)}>6</button>
        <button onClick={(e) => paginate(e)}>7</button>
      </div>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
