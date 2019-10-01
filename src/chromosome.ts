import { Coordinate } from "./labyrinth";

export enum Direction {
    Up = "↑",
    Down = "↓",
    Left = "←",
    Right = "→",
    UpLeft = "↖",
    UpRight = "↗",
    DownLeft = "↙",
    DownRight = "↘"
}

export class Chromosome {

    public genes: Direction[];
    public score: number = 0;
    public possibleSolution?: Coordinate[];
    public path: string = "";
    private static directions = [Direction.Up, Direction.Down, Direction.Left, Direction.Right,
        Direction.UpLeft, Direction.UpRight, Direction.DownLeft, Direction.DownRight];

    constructor(genesCount: number) {
        this.genes = new Array(genesCount);
    }

    // Função para mutar um gene específico
    public setRandomGeneAt(index: number) {
        if (index >= 0 && index < this.genes.length)
            this.genes[index] = Chromosome.directions[Math.floor(Math.random() * Chromosome.directions.length)];
    }

    public toString(): string {

        let result = "Aptidão: " + this.score + "/nGenes:";
        this.genes.forEach(g => result += " " + g);
        result += "Caminho encontrado:";

        if (this.possibleSolution != null)
            this.possibleSolution!.forEach(coord => " (" + coord.x + ", " + coord.y + ")");
        else
            result += " Nenhum";
        
        return result;
    }

}