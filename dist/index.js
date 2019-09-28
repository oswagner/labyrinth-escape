"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const labyrinth_loader_1 = require("./labyrinth-loader");
let lab = labyrinth_loader_1.LabyrinthLoader.load("./data/labirinto2_10.txt");
console.log(lab);
lab.printMap();
// let sim = new EvolutionSimulator(2, 0.1, lab, 4);
// sim.run();
//# sourceMappingURL=index.js.map