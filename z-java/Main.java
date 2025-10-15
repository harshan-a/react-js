// public class Main {
//   public static void main(String args[]) {
//     HelloWorld ob = new HelloWorld();
//     ob.add(1, 2);
//   }
// }

// class HelloWorld {

//   static String Gang = "hello";

//   static int num = 1;
//   public void add(int a, int b) {

//     long age = 11112_222L;
//     double f = 1 + age;
//     float div = 1.0f / 3;
//     boolean boo = 1 <= 1;
//     // long herAge = age;
//     // herAge = 12;
//     // System.out.println(a + b);
//     // System.out.println(age);
//     // System.out.println(herAge);

//     System.out.println(div);
//     System.out.println(f);
//     System.out.println(boo);
//     System.out.println(Gang);
//   }
// }

// class Main {
//   public static void main(String args[]) {
//     byte age = 30;
//     final int ROLL_NO = 044;
//     System.out.println(ROLL_NO);
//     float random = (float)Math.random();
//     boolean isTrue = true;
//     System.out.println(isTrue);

//     // int is = (int)isTrue;
//     // System.out.println(is);

//     char ch = 'a';
//     System.out.println(ch);

//     int ascii = (int)ch;
//     System.out.println(ascii);

//     System.out.println(random);
    
//     System.out.println(age);
//     // System.out.println("Hello, World!!!");
//   }
// }

import java.util.Scanner;
// import java.util.Arrays;
import java.text.NumberFormat;
// NumberFormat class is an  abstract class used for format the number as currency or percent using NumberFormat.getCurrencyInstance().format(-number-) and NumberFormat.getPercentInstance().format(-number-)

class MortgageCalculator {
  public static final byte MONTHS_OF_YEAR = 12;
  public static final byte PERCENT = 100;
  public static void main(String args[]) {
    Scanner sc = new Scanner(System.in);

    System.out.print("Principal: ");
    int principal = sc.nextInt();

    System.out.print("Annual Interst Rate: ");
    float annualInterstRate = sc.nextFloat();

    System.out.print("Period (Year): ");
    byte period = sc.nextByte();
    sc.close();

    double monthlyInterst = (annualInterstRate / PERCENT) / MONTHS_OF_YEAR;
    int numberOfPayments = period * MONTHS_OF_YEAR;

    double onePlusRPowN = Math.pow((1 + monthlyInterst), numberOfPayments);
    double montgage = principal * ((monthlyInterst * onePlusRPowN) / (onePlusRPowN - 1));

    // System.out.println("Principal is " + principal);
    // System.out.println("Annual Interst Rate is " + annualInterstRate);
    // System.out.println("Period (Year) is " + period);
    // System.out.println("monthlyInterst " + monthlyInterst);
    // System.out.println("numberOfPayments " + numberOfPayments);
    System.out.println("Montgage: " + NumberFormat.getCurrencyInstance().format(montgage));
    // float f = sc.nextFloat();
    // Utils utils = new Utils();
    // utils.formatMoney(f, 2);
  }
}

class Utils {
  public String formatMoney(double amount, int toFixed) {
    System.out.println(amount);
    String amtString = String.format("%." + toFixed + "f", amount);
    // String[] amtArray = amtString.split("\\.");
    // // if(amtArray.length > 2) return false;
    // if(amtArray[1].length() > toFixed) {
    //   char toFixedNum = amtArray[1].charAt(toFixed);
    //   System.out.println(toFixedNum);
    //   amtArray[1] = toFixedNum - '0' >= 5 
    //                   ? amtArray[1].substring(0, toFixed - 1) + (amtArray[1].charAt(toFixed - 1) - '0' + 1 + "")
    //                   : amtArray[1].substring(0, toFixed);
    // }



    
    System.out.println(amtString);
    System.out.println();

    return amtString;
  }
}