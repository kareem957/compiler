/* eslint-disable */
const rTabs = (str) => str.trim().replace(/^ {4}/gm, "");

const examples = {
    javascript: `
    // @monaco-editor/react is Monaco editor wrapper for painless integration with React
    // applications without need of webpack (or other module bundler)
    // configuration files.
    
    let sum = 0;
    const number = prompt('Enter a three-digit positive integer: ');

    let temp = number;
    while (temp > 0) {
        // finding the one's digit
        let remainder = temp % 10;
        sum += remainder * remainder * remainder;

        // removing last digit from the number
        temp = parseInt(temp / 10); // convert float into integer
    };
    // check the condition
    if (sum == number) console.log(number+"is an Armstrong number");
    else  console.log(number+" is not an Armstrong number.");
  `,
    python: rTabs(`
    # Python program to check if the number provided by the user is an Armstrong number or not
    # take input from the user
    num = int(input("Enter a number: "))
    # initialize sum
    sum = 0
    # find the sum of the cube of each digit
    temp = num
    while temp > 0:
       digit = temp % 10
       sum += digit ** 3
       temp //= 10
    # display the result
    if num == sum:
       print(num,"is an Armstrong number")
    else:
       print(num,"is not an Armstrong number")
  `),
};

export default examples;
