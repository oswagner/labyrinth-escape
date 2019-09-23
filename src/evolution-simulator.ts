import { Labyrinth, LabyrinthLoader } from "./labyrinth-loader";

enum Direction {
    Up = "↑",
    Down = "↓",
    Left = "←",
    Right = "→",
    UpLeft = "↖",
    UpRight = "↗",
    DownLeft = "↙",
    DownRight = "↘"
}

export class EvolutionSimulator {

    // Parâmetros de entrada para a simulação
    private initialPopulation: number = 0;
    private mutationChance: number = 0.5;
    private labyrinth?: Labyrinth;

    private population: Direction[][] = [];
    private genesCount: number = 0;

    constructor(initialPopulation: number, mutationChance: number, labyrinth: Labyrinth) {
        this.initialPopulation = initialPopulation;
        this.mutationChance = mutationChance;
        this.genesCount = labyrinth.floorSpaces;        
        this.labyrinth = labyrinth;
    }

}