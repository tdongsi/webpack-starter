import '../styles/index.scss';

let o = {
    cardId: 123,
    getId: function(prefix) {
        return prefix + this.cardId.toString();
    }
};

let newObj = {cardId: 456};

// Changing context to change "this" and assign
let newFunc = o.getId.bind(newObj, ["ID: "]);
console.log(newFunc());
// Output: 456

let getId_1 = (prefix, suffix) => prefix + 123 + suffix;
let getId_2 = (prefix, suffix) => {
    return prefix + 123 + suffix;
};
console.log(getId_1('ID: ', '!'));

function Car(id) {
    this.id = id;
    this.getId = function() {
        return this.id;
    };
}

let car = new Car(123);
console.log(car.getId());
