export class Card {
    constructor(
      public cardNumber: string,
      public cardHolder: string,
      public month: string,
      public year: string,
      public cvv: string,
      public amount: string
    ) { }
  }
  
  export const initialCard: Card = {
     cardNumber: '',
       cardHolder: '',
       month: '',
       year: '',
       cvv: '',
       amount: ''
  };
  