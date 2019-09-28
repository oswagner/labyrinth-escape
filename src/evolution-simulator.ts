import { Labyrinth, Coordinate } from "./labyrinth";
import { Chromosome, Direction } from "./chromosome";

export class EvolutionSimulator {

    // Parâmetros de entrada para a simulação
    private populationSize: number = 0;
    private mutationChance: number = 0.5;
    private labyrinth?: Labyrinth;
    private generationsLimit?: number;
    private stopsWhenConverging: boolean = false;

    private population: Chromosome[] = [];
    private genesCount: number = 0;
    private currentGeneration: number = 0;
    private foundSolution = false;

    constructor(initialPopulation: number, mutationChance: number, labyrinth: Labyrinth, generationsLimit?: number, stopsWhenConverging: boolean = true) {
        this.populationSize = initialPopulation;
        this.mutationChance = mutationChance;
        this.generationsLimit = generationsLimit;
        this.stopsWhenConverging = stopsWhenConverging;

        this.genesCount = labyrinth.floorSpaces;
        this.labyrinth = labyrinth;

        this.initPopulation();
    }

    private initPopulation() {

        for (let i = 0; i < this.populationSize; i++) {
            this.population[i] = new Chromosome(this.genesCount);
            for (let j = 0; j < this.genesCount; j++) {
                this.population[i].setRandomGeneAt(j);
            }
        }
    }

    run() {
        while (!this.isDone()) {
            this.step();
            this.currentGeneration++;
        }
    }

    step() {
        this.applyFitnessFunction();
    }

    private isDone(): boolean {
        let result: boolean = this.foundSolution;

        if (this.generationsLimit != null)
            result = this.currentGeneration == this.generationsLimit;

        // if (this.stopsWhenConverging)
        //     result = result

        return result;
    }

    private applyFitnessFunction() {

        this.population.forEach(chromosome => {
            let score = 0;

            // Conjunto de espaços visitados
            let traveledSpaces = new Set<Coordinate>();

            // Representa a posição do cromosomo no mapa
            let pos = {x: this.labyrinth!.entry.x, y: this.labyrinth!.entry.y};

            traveledSpaces.add({ x: pos.x, y: pos.y });

            for (let i = 0; i < chromosome.genes.length; i++) {
                const gene = chromosome.genes[i];
                switch (gene) {
                    case Direction.Up:
                        pos.y -= 1;
                        break;
                    case Direction.Down:
                        pos.y += 1;
                        break;
                    case Direction.Left:
                        pos.x -= 1;
                        break;
                    case Direction.Right:
                        pos.x += 1;
                        break;
                    case Direction.UpLeft:
                        pos.y -= 1;
                        pos.x -= 1;
                        break;
                    case Direction.UpRight:
                        pos.y -= 1;
                        pos.x += 1;
                        break;
                    case Direction.DownLeft:
                        pos.y += 1;
                        pos.x -= 1;
                        break;
                    case Direction.DownRight:
                        pos.y += 1;
                        pos.x += 1;
                        break;
                }

                // Caso esteja passando pelo mesmo lugar de novo é penalizado
                if (traveledSpaces.has(pos))
                    score -= 6;

                // Caso esteja acessando uma posição fora do mapa
                else if (pos.y < 0 || pos.y > this.labyrinth!.map.length-1 || pos.x < 0 || pos.x > this.labyrinth!.map[0].length-1)
                    score -= 6;

                // Caso esteja atravessando uma parede (1) é penalizado
                else if (this.labyrinth!.map[pos.y][pos.x] == 1)
                    score -= 3;

                // Caso esteja passando por um chão
                else if (this.labyrinth!.map[pos.y][pos.x] == 0) {
                    score += 10;
                    // Caso esse chão seja a saída
                    if (pos.x == this.labyrinth!.exit.x && pos.y == this.labyrinth!.exit.y) {
                        score += 20;
                    }
                }

                // Adiciona a nova posição ao conjunto de visitados
                traveledSpaces.add({ x: pos.x, y: pos.y });
            }
            chromosome.score = score;
        });

        // Ordena a população pelo score
        this.population = this.population.sort((a, b) => {
            return b.score - a.score;
        });

        console.log(this.population.map(chromosome => "Score: " + chromosome.score));

    }
}