const express = require("express");
const app = express();
const port = 1337;
import pool from "./database.js";

/* OLD ARRAY THAT I DONT USE
const legions = [
	{
		id: 1,
		name: "Dark Angels",
		description: "...",
		primarch: "Lion el Johnsson",
		traitor: false,
		homeworld: "Caliban",
		colors: {
			primary: "#004225",
			secondary: "#FFFFFF",
			accent: "#000000",
		},
	},
	{
		id: 2,
		name: "[REDACTED]",
		description: "[...REDACTED...]",
		primarch: "N/A",
		traitor: true,
		homeworld: "N/A",
	},
	{
		id: 3,
		name: "Emperor's Children",
		description: "...",
		primarch: "Fulgrim",
		traitor: true,
		homeworld: "Chemos",
	},
	{
		id: 4,
		name: "Iron Warriors",
		description: "...",
		primarch: "Perturabo",
		traitor: true,
		homeworld: "Olympia",
	},
	{
		id: 5,
		name: "White Scars",
		description: "...",
		primarch: "Jaghatai Khan",
		traitor: false,
		homeworld: "Mundus Planus",
	},
	{
		id: 6,
		name: "Space Wolves",
		description: "...",
		primarch: "Leman Russ",
		traitor: false,
		homeworld: "Fenris",
	},
	{
		id: 7,
		name: "Imperial Fists",
		description: "...",
		primarch: "Rogal Dorn",
		traitor: false,
	},
	{
		id: 8,
		name: "Night Lords",
		description: "...",
		primarch: "Konrad Curze",
		traitor: true,
	},
	{
		id: 9,
		name: "Blood Angels",
		description: "...",
		primarch: "Sanguinius",
		traitor: false,
	},
	{
		id: 10,
		name: "Iron Hands",
		description: "...",
		primarch: "Ferrus Manus",
		traitor: false,
	},
	{
		id: 11,
		name: "[ACESS DENIED]",
		description: "...",
		primarch: "[...REDACTED...]",
		traitor: true,
	},
];
*/

// Route to all legions.
app.get("/legions", async (req, res) => {
	try {
		const { rows: legions } = await pool.query("SELECT * FROM legions");
		res.json(legions);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

// Route to specific legion
app.get("/legion/:id", async (req, res) => {
	try {
		const legionId = parseInt(req.params.id);
		const query = "SELECT * FROM legions WHERE id = $1";
		const { rows: legion } = await pool.query(query, [legionId]);

		if (legion.length) {
			res.json(legion[0]);
		} else {
			res.status(404).send("Legion not found, try 1-20");
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Error to the sooorvooor");
	}
});

//Query route to Traitor Legions
app.get("/legions/loyalty:", async (req, res) => {
	try {
		const { traitor } = req.query;
		let query;

		if (traitor !== undefined) {
			const isTraitor = traitor === "true";
			query = "SELECT * FROM legions WHERE traitor = $1";
			const { rows: filteredLegions } = await pool.query(query, [isTraitor]);
			res.json(filteredLegions);
		} else {
			query = "SELECT * FROM legions";
			const { rows: allLegions } = await pool.query(query);
			res.json(allLegions);
		}

		const filteredLegions = legions.filter(
			(legion) => legion.traitor === isTraitor
		);
		res.json(filteredLegions);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Error to the sooorvooor");
	}
});

app.listen(port, () => {
	console.log(`Server running on port: ${port}`);
});
