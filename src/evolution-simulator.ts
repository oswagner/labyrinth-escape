import { Labyrinth, Coordinate } from "./labyrinth-loader";
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
        const directions = [Direction.Up, Direction.Down, Direction.Left, Direction.Right,
        Direction.UpLeft, Direction.UpRight, Direction.DownLeft, Direction.DownRight];

        for (let i = 0; i < this.populationSize; i++) {
            this.population[i] = new Chromosome(this.genesCount);
            for (let j = 0; j < this.genesCount; j++) {
                this.population[i].genes[j] = directions[Math.floor(Math.random() * directions.length)];
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

        let orderedPopulation = new Array<Chromosome>(this.populationSize);

        this.population.forEach(chromosome => {
            let score = 0;

            // Conjunto de espaços visitados
            let traveledSpaces = new Set<Coordinate>();

            // Guarda a posição do indivíduo no mapa
            let pos = this.labyrinth!.entry;

            traveledSpaces.add(pos);

            for (let i = 0; i < chromosome.genes.length; i++) {
                const gene = chromosome.genes[i];
                
                switch (gene) {
                    case Direction.Up: 
                        pos.y += 1;
                    case Direction.Down:
                        pos.y -= 1;
                    case Direction.Left:
                        pos.x -= 1;
                    case Direction.Right:
                        pos.x += 1;
                    case Direction.UpLeft:
                        pos.y += 1;
                        pos.x -= 1;
                    case Direction.UpRight:
                        pos.y += 1;
                        pos.x += 1;
                    case Direction.DownLeft:
                        pos.y -= 1;
                        pos.x -= 1;
                    case Direction.DownRight:
                        pos.y -= 1;
                        pos.x += 1;
                }

                // Caso esteja passando pelo mesmo lugar de novo é penalizado
                if (traveledSpaces.has(pos)) score -= 6;

                // Caso esteja atravessando uma parede (1) é penalizado
                else if (this.labyrinth!.map[pos.y][pos.x] == 1) score -= 3;
                
                // Caso esteja acessando uma posição fora do mapa
                else if (pos.y < 0 || pos.y > this.labyrinth!.map.length || pos.x < 0 || pos.x > this.labyrinth!.map[0].length) score -= 6;

                // Caso esteja passando por um chão
                else if (this.labyrinth!.map[pos.y][pos.x] == 0) {
                    score += 10;
                    // Caso esse chão seja a saída
                    if (pos.x == this.labyrinth!.exit.x && pos.y == this.labyrinth!.exit.y) {
                        score += 20;
                    }
                }
                chromosome.score = score;
                orderedPopulation.push(chromosome);
            }

            // Ordena a população pelo score
            orderedPopulation = orderedPopulation.sort((a, b) => {
                return b.score - a.score;
            });

            console.log(orderedPopulation.map(chromosome => "Score: " + chromosome.score));

        });

    }
}