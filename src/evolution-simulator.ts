import { Labyrinth, Coordinate } from "./labyrinth";
import { Chromosome, Direction } from "./chromosome";
import { Population } from "./population";

const fse = require('fs-extra');
const chalk = require('chalk');

let logString = '';

export class EvolutionSimulator {

    // Parâmetros de entrada para a simulação
    private labyrinth?: Labyrinth;
    private generationsLimit?: number;
    private stopsWhenConverging: boolean = false;
    // Intervalo de gerações para logar na tela as informações atuais
    private printInterval: number = 1;

    private currentGeneration: number = 0;
    private solution: Coordinate[] = [];

    private population: Population;

    constructor(
        population: Population,
        labyrinth: Labyrinth,
        printInterval: number = 1,
        generationsLimit?: number,
        stopsWhenConverging: boolean = true
    ) {
        this.generationsLimit = generationsLimit;
        this.stopsWhenConverging = stopsWhenConverging;
        this.labyrinth = labyrinth;
        this.population = population;
        this.printInterval = printInterval;
    }

    run() {
        while (!this.isDone()) {
            this.applyFitnessFunction();
            this.population.nextGeneration()
            logString += `======================================\n`
            this.currentGeneration++;
        }


        fse.outputFile('../log/log.txt', logString, function (err: Error) {
            if (err) {
                return console.error(err);
            }
            console.log("File created!");
        });

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

        if (this.generationsLimit != null && !result)
            result = this.currentGeneration > this.generationsLimit;

        return result;
    }

    private applyFitnessFunction() {

        this.population.currentPopulation.forEach(chromosome => {
            chromosome.path = "";
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
                    score -= 300;

                // Caso esteja acessando uma posição fora do mapa
                if (pos.y < 0 || pos.y > this.labyrinth!.map.length - 1 || pos.x < 0 || pos.x > this.labyrinth!.map[0].length - 1) {
                    score -= 1000;
                    hasLeftMap = true;
                    chromosome.path += chalk.gray(" (" + pos.x + ", " + pos.y + ")");

                    // Caso esteja atravessando uma parede (1) é penalizado
                } else if (this.labyrinth!.map[pos.y][pos.x] == 1) {
                    score -= 800;
                    hasHitWalls = true;
                    chromosome.path += chalk.yellow(" (" + pos.x + ", " + pos.y + ")");

                    // Caso esteja passando por um chão
                } else if (this.labyrinth!.map[pos.y][pos.x] == 0) {
                    score += 100;
                    // Caso esse chão seja a saída
                    if (pos.x == this.labyrinth!.exit.x && pos.y == this.labyrinth!.exit.y) {
                        chromosome.path += chalk.red(" (" + pos.x + ", " + pos.y + ")");
                        // Só pontua caso seja a primeira vez que está passando pela saída
                        if (chromosome.possibleSolution == null) {
                            score += 10000;
                            possibleSolution.push({ x: pos.x, y: pos.y });
                            chromosome.possibleSolution = Array.from(possibleSolution);
                            if (!hasHitWalls && !hasLeftMap) {
                                this.solution = Array.from(possibleSolution);
                            }
                        }
                    } else {
                        chromosome.path += chalk.blue(" (" + pos.x + ", " + pos.y + ")");
                    }
                }

                // Adiciona a nova posição ao conjunto de visitados
                traveledSpaces.add({ x: pos.x, y: pos.y });
                possibleSolution.push({ x: pos.x, y: pos.y });

            }
            chromosome.score = score;
        });

        if (this.currentGeneration % this.printInterval == 0) {

            let best: Chromosome = this.population.currentPopulation.sort((a, b) => b.score - a.score)[0];
            let genesString = "";
            best.genes.forEach(d => genesString += d + " ");
            logString += `Geração ${this.currentGeneration}\n`
            logString += `Melhor pontuação: ${best.score}\n`
            logString += `Genes: ${genesString}\n`
            logString += `Caminho realizado: ${best.path}\n`
            console.log(logString)
            // if (best.possibleSolution != null) this.labyrinth!.printMap(best.possibleSolution);
            console.log();
        }
    }

}