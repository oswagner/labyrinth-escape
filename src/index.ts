import { LabyrinthLoader } from "./labyrinth-loader";
import { EvolutionSimulator } from "./evolution-simulator";
import { Population } from "./population";
import { UserInterface } from "./user-interface";

let lab = LabyrinthLoader.load("./data/labirinto2_10.txt");

lab.printMap();

let input;

input = UserInterface.askNumber("Qual o tamanho da população inicial?", true);
let initialPopulation = input == null ? 200 : input; 

input = UserInterface.askNumber("Qual a chance de mutação?", true, 0, 1);
let mutationChance = input == null ? 0.5 : input;

input = UserInterface.askNumber("Quantos cromossomos devem ser elite?", true, 1);
let eliteCount = input == null ? 1 : input;

input = UserInterface.askNumber("Qual o limite de gerações? (0 se não houver limite)", true, 0);
let generationsLimit = input == null || input == 0 ? undefined : input;

const population = new Population(initialPopulation, mutationChance, lab.floorSpaces, eliteCount);

let sim = new EvolutionSimulator(population, lab, generationsLimit);
sim.run();

