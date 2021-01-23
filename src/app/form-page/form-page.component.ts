import { Component, OnInit ,OnDestroy, ɵConsole} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



 import { Observable } from 'rxjs';
 import { Subscription } from 'rxjs';
 import { Store } from '@ngrx/store';
 import { cardNumber, cardHolder, month, year, cvv, amount,RESET ,COMPLETE} from '../card.action';
 import { Card } from '../card.model';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
 
@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css']
})
export class FormPageComponent implements OnInit, OnDestroy {
  submitted: boolean = false;
  paymentForm: FormGroup;
  cardHolder: string = "";


  tagState$: Observable<Card>;
  private tagStateSubscription: Subscription;
  card: Card;
  done = false;

  constructor(private store: Store<Card>,
    private formBuilder: FormBuilder,
    private http: HttpClient) {
    // this.tagState$ = store.select(card);
  }

  ngOnInit() {

    this.paymentForm = this.formBuilder.group({
      cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16),
      Validators.pattern('[0-9]*')]],
      cardHolder: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3),
      Validators.pattern('[0-9]*')]],
      amount: ['', [Validators.required, Validators.pattern('[0-9]*')]]
    });

    // this.tagStateSubscription = this.tagState$.subscribe((state) => {
    //   this.card = state;
    //   this.done = !!(this.card.amount && this.card.amount);
    // });
  }

  get f() { return this.paymentForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.paymentForm.invalid) {
        return;
    }
    else{
      let cardnum = String(this.paymentForm.controls['cardNumber'].value);
      this.selectNumberHandler(cardnum);

      
      let cardName = String(this.paymentForm.controls['cardHolder'].value);
      this.selectNameHandler(cardName);

      let amt = String(this.paymentForm.controls['amount'].value);
      this.addAmountHandler(amt);
      
      let year = String(this.paymentForm.controls['year'].value);
      this.addYearHandler(year);

      let month = String(this.paymentForm.controls['month'].value);
      this.addMonthHandler(month);
      
      let cvv = String(this.paymentForm.controls['cvv'].value);
      this.addCVVHandler(cvv);



      this.postCardInfo(this.store.source['value'].card)
    }
  }


   postCardInfo(card){
   this.http.post<any>('https://test.mybackend.com/postcardinfo', { cardinfo:card})
   .pipe(
    catchError(this.handleError),
    tap(resData => {
      alert(resData.msg);
    })
  );
 
 }

 private handleError(errorRes: HttpErrorResponse) {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return throwError(errorMessage);
  }
  switch (errorRes.error.error.message) {
    case 'CARD_EXISTS':
      errorMessage = 'This card exists already';
      break;
    case 'CARD_INVALID':
      errorMessage = 'This card info is invalid.';
      break;
    default :
      errorMessage = 'Please Try Again..';
      break;
  }
  alert(errorMessage);
  return throwError(errorMessage);
}

  onReset() {
    // this.submitted = false;
    // this.paymentForm.reset();
  }
  

  ngOnDestroy() {
    this.tagStateSubscription.unsubscribe();
  }

  selectNumberHandler(number: string) {
    this.store.dispatch({
      type: cardNumber,
      payload: number
    });
  }

  selectNameHandler(name: string) {
    this.store.dispatch({
      type: cardHolder,
      payload: name
    });
  }

  addAmountHandler(amt: string) {
    this.store.dispatch({
      type: amount,
      payload: amt
    });
  }

  addYearHandler(xx) {
    this.store.dispatch({
      type: year,
      payload: xx

    });
  }

  addMonthHandler(xx) {
    this.store.dispatch({
      type: month,
      payload: xx

    });
  }
  addCVVHandler(cv) {
    this.store.dispatch({
      type: cvv,
      payload: cv

    });
  }


  submit() {
    this.store.dispatch({
      type: COMPLETE,
      payload: true
    });
  }


}
