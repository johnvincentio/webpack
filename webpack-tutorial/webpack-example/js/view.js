import $ from 'jquery';

let view = {};

view.renderUsers = (users) => {
    console.log(users);
    for (let user of users) {
        $('ul').append(`<li>${user.name}</li>`);
    }

}

export default view;