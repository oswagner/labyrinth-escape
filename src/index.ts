import { LabyrinthLoader } from "./labyrinth-loader";
import { EvolutionSimulator } from "./evolution-simulator";

let lab = LabyrinthLoader.load("./data/labirinto2_10.txt");

console.log(lab);

let sim = new EvolutionSimulator(10, 0.1, lab, 2);
sim.run();

