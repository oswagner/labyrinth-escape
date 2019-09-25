import { LabyrinthLoader } from "./labyrinth-loader";
import { EvolutionSimulator } from "./evolution-simulator";

let lab = LabyrinthLoader.load("./data/labirinto2_10.txt");

console.log(lab);

let sim = new EvolutionSimulator(2, 0.1, lab);

