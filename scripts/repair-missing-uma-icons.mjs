import fs from "node:fs";
import path from "node:path";

const GAME_DATA_PATH = path.resolve(process.cwd(), "data/game-data.json");
const IMAGES_PATH = path.resolve(process.cwd(), "public/images/");

function repairMissingUmaIcons() {
	const gameDataFile = fs.readFileSync(GAME_DATA_PATH);
	const gameData = JSON.parse(gameDataFile);

	const umas = gameData.umas;

	for (const uma of umas) {
		const { card_id: cardId, costume } = uma;
		const imagePath = path.resolve(IMAGES_PATH, `uma-${cardId}.png`);
		if (!fs.existsSync(imagePath)) {
			const costumeImagePath = path.resolve(IMAGES_PATH, `uma-${costume}.png`);
			if (fs.existsSync(costumeImagePath)) {
				fs.renameSync(costumeImagePath, imagePath);
				console.log(`Replaced ${costumeImagePath} to ${imagePath}`);
			} else {
				console.log(`Missing image ${imagePath}`);
			}
		}
	}
}

repairMissingUmaIcons();
