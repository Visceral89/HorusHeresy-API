const express = require("express");
const app = express();
const port = 1337;

const legions = [
	{
		id: 1,
		name: "Dark Angels",
		description: "...",
		primarch: "Lion el Johnsson",
		traitor: false,
	},
	{
		id: 2,
		name: "[REDACTED]",
		description: "[...REDACTED...]",
		primarch: "N/A",
		traitor: true,
	},
	{
		id: 3,
		name: "Emperor's Children",
		description: "...",
		primarch: "Fulgrim",
		traitor: true,
	},
	{
		id: 4,
		name: "Iron Warriors",
		description: "...",
		primarch: "Perturabo",
		traitor: true,
	},
	{
		id: 5,
		name: "White Scars",
		description: "...",
		primarch: "Jaghatai Khan",
		traitor: false,
	},
	{
		id: 6,
		name: "Space Wolves",
		description: "...",
		primarch: "Leman Russ",
		traitor: false,
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
app.get("/factions/:id", (req, res) => {
	const legion = legions.find((f) => f.id === parseInt(req.params.id));

	if (legion) {
		res.json(legion);
	} else {
		res.status(404).send("Legion not found");
	}
});

app.listen(port, () => {
	console.log(`Server running on port: ${port}`);
});
