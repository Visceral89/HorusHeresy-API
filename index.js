const express = require("express");
const app = express();
const port = 1337;
const NodeCache = require("node-cache");
import pool from "./database.js";

const cache = new NodeCache({ stdTTL: 3600, checkperiod: 600 });

// Route to all legions.
app.get("/legions", async (req, res) => {
	const cacheKey = "allLegions";
	const cachedAllLegions = cache.get(cacheKey);

	if (cachedAllLegions) {
		return res.json(cachedAllLegions);
	} else {
		try {
			const { rows: legions } = await pool.query("SELECT * FROM legions");
			cache.set(cacheKey, legions);
			res.json(legions);
		} catch (err) {
			res.status(500).send(err.message);
		}
	}
});

// Route to specific legion
app.get("/legion/:id", async (req, res) => {
	const legionId = parseInt(req.params.id);
	const legionKey = `legion-${legionId}`;
	const cachedLegion = cache.get(legionKey);

	if (cachedLegion) {
		return res.json(cachedLegion);
	} else {
		try {
			const query = "SELECT * FROM legions WHERE id=$1";
			const { rows: legion } = await pool.query(query, [legionId]);

			if (legion.length) {
				cache.set(legionKey, legion[0]);
			} else {
				res.status(404).send("Legion not found, try 1-20");
			}
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Error to the sooorvooor");
		}
	}
});

//Query route to Traitor Legions (old, remove after testing)
/*
app.get("/legions/traitors", async (req, res) => {
	try {
		const query = "SELECT * FROM legions WHERE traitor = true";
		const { rows: traitorLegions } = await pool.query(query);
		res.json(traitorLegions);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Erroor to tha soorvoor");
	}
});
*/
app.get("/legions/traitors", async (req, res) => {
	const traitorKey = "traitorLegions";
	const cachedTraitors = cache.get(traitorKey);

	if (cachedTraitors) {
		return res.json(cachedTraitors);
	} else {
		try {
			const query = "SELECT * FROM legions WHERE traitor = true";
			const { rows: traitorLegions } = await pool.query(query);
			cache.set(traitorKey, traitorLegions);
			res.json(traitorLegions);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("We need moore detitated wam to da sooorvor");
		}
	}
});
/*
app.get("/legions/loyalist", async (req, res) => {
	try {
		const query = "SELECT * FROM legions WHERE traitor = false";
		const { rows: loyalistLegions } = await pool.query(query);
		res.json(loyalistLegions);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Erroor to tha soorvoor");
	}
});
*/
app.get("/legions/loyalist", async (req, res) => {
	const loyalistKey = "loyalistLegions";
	const cachedLoyalists = cache.get(loyalistKey);

	if (cachedLoyalists) {
		return res.json(cachedLoyalists);
	} else {
		try {
			const query = "SELECT * FROM legions WHERE traitor = false";
			const { rows: loyalistLegions } = await pool.query(query);
			cache.set(loyalistKey, loyalistLegions);
			res.json(loyalistLegions);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("We need moore detitated wam to da sooorvor");
		}
	}
});

app.listen(port, () => {
	console.log(`Server running on port: ${port}`);
});
