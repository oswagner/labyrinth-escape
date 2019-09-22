import * as fs from "fs";
import * as readline from 'readline';

interface Coordinate {
    x: number;
    y: number;
}

interface Labyrinth {
    map: number[][];
    entry: Coordinate;
    exit: Coordinate;
    floorSpaces: number;
}

export class LabyrinthLoader {

    static load (path:string) {

        let reader = readline.createInterface({
            input: fs.createReadStream(path),
            output: process.stdout
        });

        let map: number[][] = [];
        let x = 0;
        let y = 0;
        let floorSpaces = 0;
        let entry: Coordinate = {x:0, y:0};
        let exit: Coordinate = {x:0, y:0}; 

        reader.on("line", (line) => {
            if (y == 0) {
                // Inicializa a matriz do mapa
               for (let i = 0; i < +line; i++) 
                    map[i] = [];
            } else {
                let lineArray = line.split(" ");
                lineArray.forEach(value => {
                    if (value == 'E') {
                        entry = {x, y};
                        value = '0';
                    }
                    if (value == 'S') {
                        exit = {x, y};
                        value = '0';
                    }
                    if (value == '0') floorSpaces++;
                    map[x][y] = +value;
                    x++;
                });
            }
        });

        let lab:Labyrinth = {map, entry, exit, floorSpaces};

        return lab;

    }

}

