import { Labyrinth, Coordinate } from "./labyrinth";
import { Chromosome, Direction } from "./chromosome";
import { Population } from "./population";

export class EvolutionSimulator {

    // Parâmetros de entrada para a simulação
    private labyrinth?: Labyrinth;
    private generationsLimit?: number;
    private stopsWhenConverging: boolean = false;

    private currentGeneration: number = 0;
    private solution: Coordinate[] = [];


    private population: Population;



    constructor(
        population: Population,
        labyrinth: Labyrinth,
        generationsLimit?: number,
        stopsWhenConverging: boolean = true
    ) {
        this.generationsLimit = generationsLimit;
        this.stopsWhenConverging = stopsWhenConverging;
        this.labyrinth = labyrinth;
        this.population = population;
    }

    run() {
        while (!this.isDone()) {
            console.log(`População ${this.currentGeneration}`);
            this.applyFitnessFunction();
            this.population.nextGeneration()
            this.currentGeneration++;
        }

        console.log("Fim de Execução\n")

        if (this.solution.length > 0) {
            console.log("Solução encontrada!");
            this.labyrinth!.printMap(this.solution);
        } else {
            console.log("Nenhuma solução encontrada");
        }
    }

    private isDone(): boolean {
        let result: boolean = this.solution.length > 0;

        if (this.generationsLimit != null)
            result = this.currentGeneration > this.generationsLimit;

        // if (this.stopsWhenConverging)
        //     result = result

        return result;
    }

    private applyFitnessFunction() {

        this.population.currentPopulation.forEach(chromosome => {
            let score = 0;

            let hasHitWalls = false;
            let hasLeftMap = false;

            // Conjunto de espaços visitados
            let traveledSpaces = new Set<Coordinate>();

            // Array que representa um potencial caminho à saída
            let possibleSolution: Coordinate[] = [];

            // Representa a posição do cromosomo no mapa
            let pos = { x: this.labyrinth!.entry.x, y: this.labyrinth!.entry.y };

            traveledSpaces.add({ x: pos.x, y: pos.y });
            possibleSolution.push({ x: pos.x, y: pos.y })

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
                    score -= 1;

                // Caso esteja acessando uma posição fora do mapa
                if (pos.y < 0 || pos.y > this.labyrinth!.map.length - 1 || pos.x < 0 || pos.x > this.labyrinth!.map[0].length - 1) {
                    score -= 10;
                    hasLeftMap = true;

                // Caso esteja atravessando uma parede (1) é penalizado
                } else if (this.labyrinth!.map[pos.y][pos.x] == 1) {
                    score -= 3;
                    hasHitWalls = true;

                // Caso esteja passando por um chão
                } else if (this.labyrinth!.map[pos.y][pos.x] == 0) {
                    score += 2;
                    // Caso esse chão seja a saída
                    if (pos.x == this.labyrinth!.exit.x && pos.y == this.labyrinth!.exit.y) {
                        score += 10;
                        if (chromosome.possibleSolution == null) {
                            possibleSolution.push({x: pos.x, y: pos.y});
                            chromosome.possibleSolution = Array.from(possibleSolution);
                            if (!hasHitWalls && !hasLeftMap) {

                            }
                        }
                    }
                }

                // Adiciona a nova posição ao conjunto de visitados
                traveledSpaces.add({ x: pos.x, y: pos.y });
                possibleSolution.push({ x: pos.x, y: pos.y });
            }
            chromosome.score = score;
        });

        let best: Chromosome = this.population.currentPopulation.sort((a, b) => b.score - a.score)[0];
        let genesString = "";
        best.genes.forEach(d => genesString += d + " ");
        console.log("Melhor pontuação: " + best.score);
        console.log("Genes: " + genesString);
        if (best.possibleSolution != null) this.labyrinth!.printMap(best.possibleSolution);
        console.log();
    }
}