import "./App.css";
import { useState, useEffect } from "react";

function AllCharacters() {
  let [allCharacters, setAllCharacters] = useState([]);
  async function fetchAllCharacters() {
    let response = await fetch("http://localhost:3000/api/characters");
    console.log(response);
    let data = await response.json();
    setAllCharacters(data);
  }

  useEffect(() => {
    fetchAllCharacters();
  }, []);
  console.log(allCharacters);
  return (
    <section id="charactersList">
      {allCharacters.map((character, index) => (
        <li key={index}>{character.name}</li>
      ))}
    </section>
  );
}

export default AllCharacters;
