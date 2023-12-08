import pg from "pg";
const express = require("express");
const app = express();
const port = 1337;

const { Pool } = pg;

const pool = new Pool({
	connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

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

// Route to all legions.
app.get("/legions", (req, res) => {
	res.json(legions);
});

// Route to specific legion
app.get("/legion/:id", (req, res) => {
	const legion = legions.find((f) => f.id === parseInt(req.params.id));

	if (legion) {
		res.json(legion);
	} else {
		res.status(404).send("Legion not found");
	}
});

//Query route to Traitor Legions
app.get("/legions/loyalty:", (req, res) => {
	const { traitor } = req.query;

	const isTraitor = traitor === "true";

	const filteredLegions = legions.filter(
		(legion) => legion.traitor === isTraitor
	);
	res.json(filteredLegions);
});

app.listen(port, () => {
	console.log(`Server running on port: ${port}`);
});
