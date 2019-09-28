import { Chromosome, Direction } from "./chromosome";

export class Population {

  private _generationsLimit?: number;
  private _mutationChance: number = 0.5;
  private _currentGeneration: number = 0;
  private _genesPerChromosome: number = 0;
  private _numberOfElitist?: number;
  private _population: Chromosome[];
  private _populationSize: number;
  private _populationHistory: Population[] = [];

  /**
     * Construtor da classe PopulaÃ§Ã£o
     * @param populationSize 
     * @param generationsLimit 
     * @param mutationChance
     * @param genesPerChromosome
     * 
     */
  constructor(
    populationSize: number,
    generationsLimit: number,
    mutationChance: number,
    genesPerChromosome: number,
    numberOfElitist: number = 1,
  ) {
    this._populationSize = populationSize;
    this._generationsLimit = generationsLimit;
    this._mutationChance = mutationChance;
    this._genesPerChromosome = genesPerChromosome
    this._numberOfElitist = numberOfElitist;

    this._population = [];
    this.initPopulation()
    this._populationHistory.push(this)
  }

  public get populationHistory(): Population[] {
    return this._populationHistory;
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
    // TODO: Não faz sentido intermediaria, vamos jogar pra next
    let intermediaryGeneration: Chromosome[] = [];
    let nextGeneration: Chromosome[] = [];
    const eliteChromosomes = this.elitismSelection();

    nextGeneration.concat(eliteChromosomes);

    while (intermediaryGeneration.length < this._population.length) {
      // TODO: chamar tournamentSelection 2x para pegar mãe e pai
      // TODO: Fazer crossover após vitoria no torneio
      // TODO: joga os filhos pra próxima geração
      intermediaryGeneration.push(this.tournamentSelection())
    }


    // TODO: mutation

  }

  /**
   * Selecione 3 cromossomos de forma aleatória
   * e escolhe aquele que possuí o melhor score 
   * para ser adiciona na população intermediária
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


  private crossover(intermediaryGeneration: Chromosome[]): Chromosome[] {
    const father = intermediaryGeneration[this.getRandomIndex(intermediaryGeneration)]
    const mother = intermediaryGeneration[this.getRandomIndex(intermediaryGeneration)]

    const midFather = father.genes.length / 2;
    const midMother = mother.genes.length / 2;

    const firstSonFather = father.genes.slice(0, midFather)
    const firstSonMother = mother.genes.slice(midMother, mother.genes.length);

    const son: Direction[] = [...firstSonFather, ...firstSonMother]



    return []
  }

}