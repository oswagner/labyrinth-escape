import { Chromosome, Direction } from "./chromosome";
import { throws } from "assert";

export class Population {

  private _mutationChance: number = 0.2;
  private _genesPerChromosome: number = 0;
  private _numberOfElitist?: number;
  private _population: Chromosome[];
  private _populationSize: number;

  /**
     * Construtor da classe PopulaÃ§Ã£o
     * @param populationSize 
     * @param mutationChance
     * @param genesPerChromosome
     * 
     */
  constructor(
    populationSize: number,
    mutationChance: number,
    genesPerChromosome: number,
    numberOfElitist: number = 1,
  ) {
    this._populationSize = populationSize;
    this._mutationChance = mutationChance;
    this._genesPerChromosome = genesPerChromosome
    this._numberOfElitist = numberOfElitist;

    this._population = [];
    this.initPopulation()
  }

  public get currentPopulation(): Chromosome[] {
    return this._population;
  }

  private initPopulation() {
    for (let i = 0; i < this._populationSize; i++) {
      this._population[i] = new Chromosome(this._genesPerChromosome);
      for (let j = 0; j < this._genesPerChromosome; j++) {
        this._population[i].setRandomGeneAt(j);
      }
    }
  }

  private getRandomIndex(population: { length: number; }) {
    return Math.floor(Math.random() * population.length);
  }


  /**
   * nextGeneration
   */
  public nextGeneration() {
    let nextGeneration: Chromosome[] = [];
    const eliteChromosomes = this.elitismSelection();

    nextGeneration = [...nextGeneration, ...eliteChromosomes]

    while (nextGeneration.length < this._population.length) {
      const father = this.tournamentSelection()
      const mother = this.tournamentSelection()
      const childrens = this.crossover(father, mother)

      if (this._mutationChance >= Number(Math.random().toPrecision(1))) {
        this.mutateChildren(childrens[this.getRandomIndex(childrens)])
      }
      nextGeneration = [...nextGeneration, ...childrens]
    }
    this._population = nextGeneration;
  }

  /**
   * Selecione 3 cromossomos de forma aleatória
   * e escolhe aquele que possuí o melhor score 
   * para ser levado para o cruzamento
   */
  private tournamentSelection(): Chromosome {
    let elegibleChromosome: Chromosome[] = []

    for (let index = 0; index < 3; index++) {
      elegibleChromosome.push(this._population[this.getRandomIndex(this._population)]);
    }

    return elegibleChromosome
      .sort((chromosomeA, chromosomeB) => (chromosomeB.score - chromosomeA.score))[0]
  }

  /**
   * Seleção por elitismo da geração atual
   * Por padrão selecionamos o cromossomos com melhor escore, 
   * porém podemos aumentar o número do cromossomos elitistas
   */
  private elitismSelection(): Chromosome[] {
    return this._population
      .sort((chromosomeA, chromosomeB) => (chromosomeB.score - chromosomeA.score))
      .slice(0, this._numberOfElitist)
  }

  /**
   * Processo de cruzamento genético utilizado para gerar a nova geração da população
   * O modelo escolhido foi o modelo uniponto
   * @param father 
   * @param mother 
   */
  private crossover(father: Chromosome, mother: Chromosome): Chromosome[] {

    const cutPoint = this.getRandomIndex(father.genes) // mother's and father's size are equal

    const sonFromMother = mother.genes.slice(0, cutPoint);
    const sonFromFather = father.genes.slice(cutPoint, father.genes.length)

    const sonDirections: Direction[] = [...sonFromMother, ...sonFromFather]
    const son = new Chromosome(sonDirections.length);
    son.genes = sonDirections

    const daughterFromFather = father.genes.slice(0, cutPoint)
    const daughterFromMother = mother.genes.slice(cutPoint, mother.genes.length);

    const daughterDirections: Direction[] = [...daughterFromFather, ...daughterFromMother]
    const daughter = new Chromosome(daughterDirections.length);
    daughter.genes = daughterDirections


    return [son, daughter]
  }

  private mutateChildren(chromosome: Chromosome): Chromosome {
    chromosome.setRandomGeneAt(this.getRandomIndex(chromosome.genes))
    return chromosome;
  }

}