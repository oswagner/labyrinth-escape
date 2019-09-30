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

    public printMap(path?: Coordinate[]) {

        for (let y = 0; y < this.map.length; y++) {
            let line = "";
            for (let x = 0; x < this.map[0].length; x++) {
                if (this.entry.x == x && this.entry.y == y)
                    line += chalk.green("██");
                else if (this.exit.x == x && this.exit.y == y)
                    line += chalk.red("██");
                else if (path != null && this.containsCoordinate(path, x, y))
                    line += this.map[y][x] == 0 ? chalk.blue("██") : chalk.yellow("██");
                else
                    line += this.map[y][x] == 0 ? "  " : "██";
            }
            console.log(line);
        }
    }

    private containsCoordinate(array: Coordinate[], x: number, y: number): boolean {
        for (let i = 0; i < array.length; i++)
            if (array[i].x == x && array[i].y == y)
                return true

        return false
    }

    public findShortestPath(): Set<Coordinate> {    

        interface Node {
            h: number;
            g: number;
            pos: Coordinate;
            parent?: Node;
        }

        let nodes: Node[] = [];
        let currentNode: Node;
        let open = new Set<Coordinate>();
        let closed = new Set<Coordinate>();
        open.add({x: this.entry.x, y: this.entry.y});

        // while (true) {
        //     let currentNode: Node = null;

        //     for (let i = 0; i < 3; i++) {
        //         for (let j = 0; j < 3; j++) {
        //             let auxPos = {x: currentNode.pos.x + j, y: currentNode.pos.y + i};
        //             if (auxPos.x >= 0 && auxPos.x < this.map[0].length && auxPos.y >= 0 && auxPos.y < this.map.length) {
        //                 if (this.map[auxPos.y][auxPos.x] == 0 && !closed.has(auxPos)) {
        //                     if ()
        //                 }
        //             }
        //         }
        //     }

        // }


        return new Set();
    }

    private manhattanDistance(p1: Coordinate, p2:Coordinate): number {
        return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
    }

}