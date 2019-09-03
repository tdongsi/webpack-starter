import '../styles/index.scss';

let promise = new Promise(
    function(resolve, reject) {
        setTimeout(resolve, 100, 'someValue');
    }
);

console.log(promise);

// settling a promise
promise.then(
    value => console.log('Fulfilled: ' + value),
    error => console.log('Rejected: ' + error)
);
