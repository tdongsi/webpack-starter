import '../styles/index.scss';
import { Car, Sedan } from './models/car';

let obj = {
    id: 123,
    printId: function (prefix) {
        console.log( prefix + this.id.toString() );
    }
};

let newObj = { id: 456};

obj.printId.apply(newObj, ["ID: "]);

let car = new Car(123);
console.log(car.identify());

let sedan = new Sedan(456, 4);
console.log( sedan.identify() );
