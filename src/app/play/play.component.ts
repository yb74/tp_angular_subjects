import { Component } from '@angular/core';
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent {
  //################## default values ###########
  exposeValue = 0
  intSubject = 0
  intBSubject = 0
  intRSubject = 0
  intASubject = 0

  //################## instanciation of subjects ###########
  sub$ = new Subject<number>() // catches all the values starting when subscribing
  beh$ = new BehaviorSubject<number>(0) // catches the latest value when subscribing
  rep$ = new ReplaySubject<number>() // catches all the previous values (like an history of values)
  // rep$ = new ReplaySubject<number>(4) // here replay catches the 4 last values
  asy$ = new AsyncSubject<number>() // track the values and catch the last when calling complete() function

  //################## variables that contains subscription of subjects ###########
  subSub = new Subscription()
  subBeh = new Subscription()
  subRep = new Subscription()
  subAsy = new Subscription()

  /*
    function that increment value and get next one
  */
  nextOne() {
    this.exposeValue++
    
    this.sub$.next(this.exposeValue)
    this.beh$.next(this.exposeValue)
    this.rep$.next(this.exposeValue)
    this.asy$.next(this.exposeValue)
  }

  /*
    function that reset the value to 0
  */
  reset() {
    this.exposeValue = 0
  }

  //################## functions to subscribe and unsubscribe subjects ###########
  subject() {
    this.subSub = this.sub$.subscribe((v) => {
      this.intSubject = v
      console.log(`subject ${v}`)
    })
  }

  subjectStop() {
    this.subSub.unsubscribe()
  }

  behaviour() {
    this.subBeh = this.beh$.subscribe((v) => {
      this.intBSubject = v
      console.log(`behaviour ${v}`)
    })
  }

  behaviourStop() {
    this.subBeh.unsubscribe()
  }

  replay() {
    this.subRep = this.rep$.subscribe((v) => {
      this.intRSubject = v
      console.log(`replay ${v}`)
    })
  }

  replayStop() {
    this.subRep.unsubscribe()
  }

  asyncSub() {
    this.subAsy = this.asy$.subscribe((v) => {
      this.intASubject = v
      console.log(`async ${v}`)
    })
  }

  asyncSubStop() {
    this.subAsy.unsubscribe()
  }

  /*
    function that complete the async subscription
    when complete, it catches the last value
  */
  asyncComplete() {
    this.asy$.complete()
  }
}
