import { type } from "os";

const readline = require('readline-sync');

export class UserInterface {

    public static askTrueOrFalse(question: string): boolean {

        let input = "";
        input = readline.question(question + " (s/n)");

        while (input != "s" && input !="n")
            input = readline.question("Digite uma resposta válida\n");

        return input == "s";
    }

    public static askNumber(question: string, acceptsEmpty = false): number | null {
        let input = readline.question(question);

        while (true) {

            if (acceptsEmpty && input == "")
                return null;

            else if (input != "" && !isNaN(+input))
                return input;

            input = readline.question("Digite uma resposta válida\n");
        }
    }

}