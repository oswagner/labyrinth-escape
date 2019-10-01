"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const labyrinth_loader_1 = require("./labyrinth-loader");
const evolution_simulator_1 = require("./evolution-simulator");
const population_1 = require("./population");
const user_interface_1 = require("./user-interface");
let lab = labyrinth_loader_1.LabyrinthLoader.load("./data/labirinto2_10.txt");
lab.printMap();
let input;
input = user_interface_1.UserInterface.askNumber("Qual o tamanho da população inicial?", true);
let initialPopulation = input == null ? 200 : input;
input = user_interface_1.UserInterface.askNumber("Qual a chance de mutação?", true, 0, 1);
let mutationChance = input == null ? 0.5 : input;
input = user_interface_1.UserInterface.askNumber("Quantos cromossomos devem ser elite?", true, 1);
let eliteCount = input == null ? 1 : input;
input = user_interface_1.UserInterface.askNumber("Qual o limite de gerações? (0 se não houver limite)", true, 0);
let generationsLimit = input == null || input == 0 ? undefined : input;
input = user_interface_1.UserInterface.askNumber("De quantas em quantas gerações deve-se mostrar o resultado?", true, 1);
let printInterval = input == null ? 10 : input;
const population = new population_1.Population(initialPopulation, mutationChance, lab.floorSpaces, eliteCount);
let sim = new evolution_simulator_1.EvolutionSimulator(population, lab, printInterval, generationsLimit);
sim.run();
//# sourceMappingURL=index.js.map