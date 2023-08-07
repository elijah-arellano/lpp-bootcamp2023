import { ReplaySubject, Subject } from "rxjs";

// A replay subject can remember the past (n) results and emit them to the new subscribers
let subject = new ReplaySubject(5)
/* 
// subscribing to the subject
subject.subscribe(val => console.log(val))

subject.next(10)
subject.next(20)
subject.next(30)
subject.next(40)
subject.complete() 
*/

let count = 0;
setInterval(() => {
    subject.next(count)
    count++
}, 500);

// subscriber-1
subject.subscribe(val => console.log(`[subscriber - 1] - ${val}`))

// subscriber-2 (subscribes after 5 seconds)
setTimeout(() => {
    console.log('subscriber-2 subscribes')
    subject.subscribe(val => console.log(`[subscriber - 2] - ${val}`))
}, 5000);

// subscriber-3 (subscribes after 10 seconds)
setTimeout(() => {
    console.log('subscriber-3 subscribes')
    subject.subscribe(val => console.log(`[subscriber - 3] - ${val}`))
}, 10000);