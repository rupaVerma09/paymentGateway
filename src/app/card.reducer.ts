import { Action } from '@ngrx/store';
import { Card, initialCard } from './card.model';
import { cardNumber, cardHolder, month, year, cvv, amount,RESET,COMPLETE } from './card.action';
export function cardReducer(state: Card = initialCard, action: Action) {
  switch (action.type) {
    case cardNumber:
      return Object.assign({}, state, {
        cardNumber: action['payload']
      });
    case cardHolder:
      return Object.assign({}, state, {
        cardHolder: action['payload']
      });
    case month:
      return Object.assign({}, state, {
        month: action['payload']
      });
    case year:
      return Object.assign({}, state, {
        year: action['payload']
      });
    case cvv:
      return Object.assign({}, state, {
        cvv: action['payload']
      });
    case amount:
      return Object.assign({}, state, {
        amount: action['payload']
      });
      case COMPLETE:
      return Object.assign({}, state, {
        complete: action['payload']
      });
    case RESET:
      return Object.assign({}, state, initialCard);
    default:
      return state;
  }
}
