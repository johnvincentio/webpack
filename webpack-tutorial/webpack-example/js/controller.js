import $ from 'jquery';
import view from './view'
import model from './model'

const controller = {};
controller.init = () => {

    let timePassed = 0;

    model.retrieveUsers().done((users) => {

        view.renderUsers(users);

    }).fail((error) => {
        console.log(error);
    });

}

controller.init();