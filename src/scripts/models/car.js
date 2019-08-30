
export class Car {
    constructor(id) { 
        this.id = id;
    }

    identify() {
        return `Car ID: ${this.id}`;
    }
}

export class Sedan extends Car {
    constructor(id, doors) {
        super(id);
        this.doors = doors;
    }

    identify() {
        return `${this.doors}-door sedan: ${this.id}`;
    }
}
