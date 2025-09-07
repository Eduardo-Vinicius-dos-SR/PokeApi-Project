import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import { useContext, useEffect } from "react";
import { ThemeContext } from "./services/context/ThemeContext";

import { Navbar } from "./components/Navbar/Navbar";

import { Container } from "./components/Container/Container";
import { Home } from "./components/Home/Home";
import { Types } from "./components/PokeTypes/Types";
import { Berrys } from "./components/Berrys/Berrys";
import { Pokedex } from "./components/Pokedex/Pokedex";
import { PokemonCard } from "./components/Card/PokemonCard";

import { Footer } from "./components/Footer/Footer";

function App() {
	const { theme } = useContext(ThemeContext);

	useEffect(() => {
		document.body.className = `${theme}_theme`;
	}, [theme]);

	return (
		<Router>
			<Navbar />

			<Container>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/types" element={<Types />} />
					<Route path="/berrys" element={<Berrys />} />
					<Route path="/pokedex" element={<Pokedex />} />
					<Route path="/pokedex/:id" element={<PokemonCard />} />
				</Routes>
			</Container>

			<Footer />
		</Router>
	);
}

export default App;
