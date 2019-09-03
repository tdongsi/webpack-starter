import '../styles/index.scss';

import $ from 'jquery';

let promise = $.get("https://www.google.com");

promise.then(
    data => console.log('Success: ', data),
    error => console.log('Error: ', error)
);
