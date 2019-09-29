import { LabyrinthLoader } from "./labyrinth-loader";
import { EvolutionSimulator } from "./evolution-simulator";
import { Population } from "./population";

let lab = LabyrinthLoader.load("./data/labirinto2_10.txt");

const population = new Population(200, 0.3, lab.floorSpaces, 2)

let sim = new EvolutionSimulator(population, lab, 10);
sim.run();

