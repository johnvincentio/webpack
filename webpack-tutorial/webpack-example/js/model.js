import $ from 'jquery';

let model = {};

model.retrieveUsers = () => {
    return $.ajax('https://jsonplaceholder.typicode.com/users');
}

export default model;