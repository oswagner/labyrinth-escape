import { Labyrinth, Coordinate } from "./labyrinth";
import * as fs from "fs";

export class LabyrinthLoader {

    static load(path: string): Labyrinth {

        let lines = fs.readFileSync(path, 'utf-8').toLowerCase().split('\n');

        let map: number[][] = [];
        let x = 0;
        let y = -1;
        let floorSpaces = 0;
        let entry: Coordinate = { x: 0, y: 0 };
        let exit: Coordinate = { x: 0, y: 0 };


        lines.forEach((line) => {
            if (y < 0) {
                // Inicializa a matriz do mapa
                for (let i = 0; i < +line; i++)
                    map.push([]);
            } else {
                let lineArray = line.split(" ");
                x = 0;
                lineArray.forEach(value => {

                    if (value == 'e') {
                        entry = { x, y };
                        value = '0';
                    }

                    if (value == 's') {
                        exit = { x, y };
                        value = '0';
                    }

                    if (value == '0')
                        floorSpaces++;

                    if (value == '0' || value == '1')
                        map[y][x] = +value;

                    x++;
                });
            }
            y++;
        });

        let lab = new Labyrinth(map, entry, exit, floorSpaces);
        return lab;
    }

}

