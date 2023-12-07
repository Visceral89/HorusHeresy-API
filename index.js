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
];
