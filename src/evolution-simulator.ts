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
    private populationSize: number = 0;
    private mutationChance: number = 0.5;
    private labyrinth?: Labyrinth;
    private generationsLimit?: number;
    private stopsWhenConverging: boolean = false;

    private population: Direction[][] = [];
    private genesCount: number = 0;
    private currentGeneration: number = 0;

    constructor(initialPopulation: number, mutationChance: number, labyrinth: Labyrinth, generationsLimit?: number, stopsWhenConverging: boolean = true) {
        this.populationSize = initialPopulation;
        this.mutationChance = mutationChance;
        this.generationsLimit = generationsLimit;
        this.stopsWhenConverging = stopsWhenConverging;

        this.genesCount = labyrinth.floorSpaces;
        this.labyrinth = labyrinth;

        this.initPopulation();

        console.log(this.population);
    }

    private initPopulation() {
        const directions = [Direction.Up, Direction.Down, Direction.Left, Direction.Right, 
                            Direction.UpLeft, Direction.UpRight, Direction.DownLeft, Direction.DownRight];

        for (let i = 0; i < this.populationSize; i++) {
            this.population[i] = [];
            for (let j = 0; j < this.genesCount; j++) {
                this.population[i][j] = directions[Math.floor(Math.random() * directions.length)];
            }
        }
    }

    run() {

    }

    step() {

    }
}