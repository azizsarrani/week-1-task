//main class then instances of each tool when called upon.

const readline = require("readline");
const rl = readline.createInterface({input: process.stdin, output: process.stdout});
const fs = require("fs");

class CTF
{
    prompt()
    {
        rl.question("C: Celsius To Fahrenheit, F: Fahrenheit To Celsius, Q: Quit, F: Switch function. ", (answer) =>
            {
                if(answer === "C" || answer === "c")
                {
                    this.celToFahr();
                }else if(answer === "F" || answer === "f")
                {
                    this.fahrToCel();
                }else if(answer === "Q" || answer === "q")
                {
                    console.log("Thank you for using my program. Bye!");
                    process.exit();
                }else if(answer === "F" || answer === "f")
                {
                    main();
                }else
                {
                    console.log("Please enter a valid key. ");
                    this.prompt();
                }
            })   
    }

    celToFahr()
    {
        rl.question("Please enter a Celsius temperature. ", (answer) => 
            {
                console.log("\n" + answer + " degrees celsius is " + (answer*(9/5) + 32) + " degrees fahrenheit")
                this.prompt();
            })
    }

    fahrToCel()
    {
        rl.question("Please enter a fahrenheit temperature. ", (answer) => 
            {
                console.log("\n" + answer + " degrees fahrenheit is " + ((5/9)*(answer - 32)) + " degrees celsius")
                this.prompt();
            })
    }
}

class Calc
{
    constructor()
    {
        this.currentNum;
    }

    prompt()
    {
        rl.question("Enter equation: calculate, N: New Calculation, Q: Quit program, F: Switch function. ", (answer) => 
            {
                if(answer === "N" || answer === "n")
                {
                    this.prompt();
                }else if(answer === "Q" || answer === "q")
                {
                    console.log("Thank you for using my program. Bye!");
                    process.exit();
                }else if(answer === "F" || answer === "f")
                {
                    main();
                }else
                {
                    this.firstEq(answer);
                }
                console.log("The answer of " + answer + " is " + eval(answer));
                this.consecPrompt();
            })
    }

    firstEq(equation)
    {
        try
        {
            this.currentNum = eval(equation);
            console.log("The answer of " + equation + " is " + eval(equation));
            this.consecPrompt();
        }catch(err)
        {
            console.log("Please enter a valid equation. ")
            this.prompt();
        }
        
    }
    consecPrompt()
    {
        rl.question("Next operation: ", (answer) => 
        {
            answer = answer.replace(/\s/g,'');
            if(["+", "-", "*", "/", "^"].includes(answer.charAt(0)))
            {
                let secndEq = this.currentNum.toString() +answer;
                let secndAns = eval(secndEq);
                console.log("The answer of " + secndEq + " is " + secndAns);
                this.currentNum = secndAns;
                this.consecPrompt();
            }else
            {
                if(answer === "N" || answer === "n")
                {
                    this.prompt();
                }else if(answer === "Q" || answer === "q")
                {
                    console.log("Thank you for using my program. Bye!");
                    process.exit();
                }else if(answer === "F" || answer === "f")
                {
                    main();
                }else
                {
                    console.log("Please enter valid input. ");
                    this.consecPrompt();
                }
            }
        })
    }
}

class Pal
{
    prompt()
    {
        rl.question("Enter string: Reverse by letter, Q: Quit program, F: Switch function. ", (answer) => 
            {
                if(answer === "Q" || answer === "q")
                {
                    console.log("Thank you for using my program. Bye!");
                    process.exit();
                }else if(answer === "F" || answer === "f")
                {
                    main();
                }else
                {
                    this.reverse(answer);
                }
            });
    }

    reverse(inString)
    {
        let finalForm = inString.trim();
        finalForm = finalForm.split("").reverse("").join("");

        if(inString.trim() === finalForm)
        {
            console.log("WOW! This is a palindrome!");
        }
        console.log(inString + " reversed is " + finalForm)
        this.prompt();
    }
}

class Num
{
    constructor()
    {
        this.file;
    }

    prompt()
    {
        let rf;
        rl.question("Text file: read, F: Switch function, Q: Quit program. ", (answer) => 
            {
                if(answer === "F" || answer === "f")
                {
                    main();
                }else if(answer === "Q" || answer === "q")
                {
                    console.log("Thank you for using my program. Bye!");
                    process.exit();
                }else
                {
                    fs.readFile(answer, "utf-8", (err, data) => 
                    {
                        this.file = answer;
                        if(err)
                        {
                            console.log("Please enter a valid file name. ")
                            this.prompt();
                        }
                        this.countInstances(data);
                    })
                }
            })
    }

    countInstances(input)
    {
        rl.question("A: All number instances, Number: Instance of input number, F: Switch function, N: New file, Q: Quit program. ", (answer)=>
            {
                if(answer === "A" || answer === "a")
                {
                    this.countAll(input);
                }else if(answer === "F" || answer === "f")
                {
                    main();
                }else if(answer === "N" || answer === "n")
                {
                    this.prompt();
                }else if(answer === "Q" || answer === "q")
                {
                    console.log("Thank you for using my program. Bye!");
                    process.exit();
                } else
                {
                    try
                    {
                        answer =  answer.trim();
                        console.log(answer)
                        answer = parseInt(answer);
                        console.log(answer)
                        this.countSpecific(input, answer);
                    }catch
                    {
                        console.log("Please enter valid input. ");
                        this.countInstances(input);
                    }
                }
            })
    }

    countAll(input)
    {
        input = input.split("\n");
        let result = input.reduce( (acc, curr) => 
            {
                if(acc[curr] !== " ")
                {
                    if(typeof(acc[curr]) === "undefined")
                    {
                        acc[curr] = 1;
                    }else
                    {
                        acc[curr] += 1;
                    }
                }
                return acc;
            }, {})
        console.log(result);
        this.countInstances(input.join("\n"));
    }

    countSpecific(input, number)
    {
        let count = 0;
        input = input.split("\n");

        for(let i = 0; i < input.length; i++)
        {
            if(input[i] === number.toString())
            {
                count++;
            }
        }
        if(count === 0)
        {
            console.log("This number is not in the file.")
            this.countInstances(input);
        }
        console.log(number + " appeared " + count + " time(s) in the file " + this.file);
        this.countInstances(input.join("\n"));
    }
}


function main()
{
    rl.question("1: Celsius and Fahrenheit, 2: Calculator, 3: Palindrome, 4: Number Of Instances. ", (answer) => 
        {
            if(answer === "1")
            {
                const ctf = new CTF();
                ctf.prompt();
            }else if(answer === "2")
            {
                const calc = new Calc();
                calc.prompt();
            }else if(answer == "3")
            {
                const pal = new Pal();
                pal.prompt();
            }else if(answer == "4")
            {
                const num = new Num();
                num.prompt();                        
            }else
            {
                console.log("Error, please enter a valid number between 1-4.");
                main();
            };
        })
}

main();
