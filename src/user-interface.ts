import { type } from "os";

const readline = require('readline-sync');

export class UserInterface {

    public static askTrueOrFalse(question: string): boolean {

        let input = "";
        input = readline.question(question + " (s/n) ");

        while (input != "s" && input !="n")
            input = readline.question("Digite uma resposta válida\n");

        return input == "s";
    }

    public static askNumber(question: string, acceptsEmpty = false, minLimit?: number, maxLimit?: number): number | null {

        let limit = "";

        if (maxLimit != null && minLimit != null)
            limit = "(min: " + minLimit + ", max: " + maxLimit + ") ";
        else if (maxLimit != null)
            limit = "(max: " + maxLimit + ") ";
        else if (minLimit)
            limit = "(min: " + minLimit + ") ";

        if (maxLimit == null) maxLimit = Infinity;
        if (minLimit == null) minLimit = -Infinity;


        let input = readline.question(question + " " + limit);

        while (true) {

            if (acceptsEmpty && input == "")
                return null;

            else if (input != "" && !isNaN(+input))
                if (minLimit <= +input && +input <= maxLimit)
                    return input;

            input = readline.question("Digite uma resposta válida\n");
        }
    }

}