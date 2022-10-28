/* eslint-disable */
const rTabs = (str: any) => str.trim().replace(/^ {4}/gm, "");

const examples: { [key: string]: any } = {
    javascript: rTabs(`    
    let sum = 0;
    const num = 10;
    let temp = num;

    while(temp>0){
      sum += temp;
      temp -= 1
    }
    console.log("The sum of first "+num+" Natural numbers:- "+sum);
     
  `),
    python: rTabs(`
    # Sum of natural numbers up to num

    num = 10
    temp = num

    sum = 0
    # use while loop to iterate until zero
    while(temp > 0):
      sum += temp
      temp -= 1
    print("The sum of first",num,"Natural Numbers:- ",sum)`),
    java: `
   public class SumNatural {

    public static void main(String[] args) {

        int num = 10, sum = 0;

        for(int i = 1; i <= num; ++i)
        {
            // sum = sum + i;
            sum += i;
        }

        System.out.println("The sum of first"+num+"Natural Numbers:- " + sum);
    }
}
  `,
};

export default examples;
