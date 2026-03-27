import fs from "node:fs";
import path from "node:path";

const CHARACTER_CARDS_PATH = path.resolve(
	process.cwd(),
	"data/character-cards.json",
);
const FACTORS_PATH = path.resolve(process.cwd(), "data/factors.json");
const METADATA_PATH = path.resolve(process.cwd(), "data/metadata.json");
const SKILLS_PATH = path.resolve(process.cwd(), "data/skills.json");
const OUTPUT_PATH = path.resolve(process.cwd(), "data/game-data.json");

function extractPropertiesFromListOfObjects({
	array = [],
	properties = [],
	filters,
	injects,
	skipItemMissingProperty = false,
}) {
	const extracted = [];
	for (const item of array) {
		if (
			skipItemMissingProperty &&
			!properties.every((property) => Object.hasOwn(item, property))
		) {
			continue;
		}

		if (Array.isArray(filters)) {
			let shouldExclude = false;
			for (const filter of filters) {
				if (!filter.values.includes(item[filter.key])) {
					shouldExclude = true;
					break;
				}
			}
			if (shouldExclude) {
				continue;
			}
		}

		const extractedItem = {};
		for (const property of properties) {
			extractedItem[property] = item[property];
		}
		if (Array.isArray(injects)) {
			for (const inject of injects) {
				extractedItem[inject.key] = inject.value;
			}
		}
		extracted.push(extractedItem);
	}
	return extracted;
}

function generateUmaData() {
	const gameData = {};

	// Uma data
	const charaCardsFile = fs.readFileSync(CHARACTER_CARDS_PATH);
	const charaCards = JSON.parse(charaCardsFile);

	gameData.umas = extractPropertiesFromListOfObjects({
		array: charaCards,
		properties: ["card_id", "name_en", "title_en_gl", "version"],
	});

	// Skills data
	const skillsFile = fs.readFileSync(SKILLS_PATH);
	const skills = JSON.parse(skillsFile);

	gameData.skills = extractPropertiesFromListOfObjects({
		array: skills,
		properties: ["id", "name_en", "iconid", "rarity"],
		filters: [{ key: "rarity", values: [1, 2, 3, 4, 5] }],
		skipItemMissingProperty: true,
	});

	// Factors data
	const factorsFile = fs.readFileSync(FACTORS_PATH);
	const factors = JSON.parse(factorsFile);

	gameData.factors = [];
	gameData.factors.push(
		...extractPropertiesFromListOfObjects({
			array: factors.blue,
			properties: ["id", "type", "name_en"],
			injects: [{ key: "color", value: "blue" }],
			skipItemMissingProperty: true,
		}),
	);
	gameData.factors.push(
		...extractPropertiesFromListOfObjects({
			array: factors.pink,
			properties: ["id", "type", "name_en"],
			injects: [{ key: "color", value: "pink" }],
			skipItemMissingProperty: true,
		}),
	);
	gameData.factors.push(
		...extractPropertiesFromListOfObjects({
			array: factors.other,
			properties: ["id", "type", "name_en"],
			filters: [{ key: "type", values: [3] }],
			injects: [{ key: "color", value: "green" }],
			skipItemMissingProperty: true,
		}),
	);
	gameData.factors.push(
		...extractPropertiesFromListOfObjects({
			array: factors.skill,
			properties: ["id", "type", "name_en"],
			injects: [{ key: "color", value: "white" }],
			skipItemMissingProperty: true,
		}),
	);
	gameData.factors.push(
		...extractPropertiesFromListOfObjects({
			array: factors.race,
			properties: ["id", "type", "name_en"],
			injects: [{ key: "color", value: "white" }],
			skipItemMissingProperty: true,
		}),
	);
	gameData.factors.push(
		...extractPropertiesFromListOfObjects({
			array: factors.scenario,
			properties: ["id", "type", "name_en"],
			injects: [{ key: "color", value: "white" }],
			skipItemMissingProperty: true,
		}),
	);

	// Metadata
	const metadataFile = fs.readFileSync(METADATA_PATH);
	const metadata = JSON.parse(metadataFile);

	Object.assign(gameData, { ...metadata });

	fs.writeFileSync(OUTPUT_PATH, JSON.stringify(gameData, null, 2), "utf-8");
}

generateUmaData();
