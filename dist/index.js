"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const labyrinth_loader_1 = require("./labyrinth-loader");
const evolution_simulator_1 = require("./evolution-simulator");
let lab = labyrinth_loader_1.LabyrinthLoader.load("./data/labirinto2_10.txt");
console.log(lab);
let sim = new evolution_simulator_1.EvolutionSimulator(2, 0.1, lab);
//# sourceMappingURL=index.js.map