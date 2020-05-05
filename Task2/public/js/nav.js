$(function () {

    let nav_input = $("#nav_input");
    let nav_send_button = $("#nav_send_message");
    let nav_messages = $("#nav_messages");
    let validActions = ['a', 'b', 'c', 'main'];
    nav_send_button.click((e) => {
        e.preventDefault();

        // alert if no username is set.
        validActions.includes(nav_input.val().toLowerCase()) ? window.location.replace(nav_input.val().toLowerCase()) : console.log('Invalid Entry, please dont be an idiot');
        console.log('send button clicked');
    });


});