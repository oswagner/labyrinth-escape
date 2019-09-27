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

    constructor(genesCount: number) {
        this.genes = new Array(genesCount);
    }

}