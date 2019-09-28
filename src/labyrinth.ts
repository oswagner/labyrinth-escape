const chalk = require('chalk');

export interface Coordinate {
    x: number;
    y: number;
}

export class Labyrinth {

    map: number[][];
    entry: Coordinate;
    exit: Coordinate;
    floorSpaces: number;

    constructor(map: number[][], entry: Coordinate, exit: Coordinate, floorSpaces: number) {
        this.map = map;
        this.entry = entry;
        this.exit = exit;
        this.floorSpaces = floorSpaces;
    }

    public printMap(path?: Set<Coordinate>) {

        for (let y = 0; y < this.map.length; y++) {
            let line = "";
            for (let x = 0; x < this.map[0].length; x++) {
                if (this.entry.x == x && this.entry.y == y)
                    line += chalk.green("██");
                else if (this.exit.x == x && this.exit.y == y)
                    line += chalk.red("██");
                else if (path != null && path!.has({x: x, y: y}))
                    line += chalk.blue("██");
                else
                    line += this.map[y][x] == 0 ? "  " : "██";
            }
            console.log(line);
        }
    }

    public findShortestPath(): Set<Coordinate> {
        let pos = { x: this.entry.x, y: this.entry.y };
        return new Set();
    }

}