$(function () {

    let chat_input = $("#chat_input");
    let send_button = $("#send_message");
    let chat_messages = $("#chat_messages");
    let validActions = ['a', 'b', 'c', 'main'];

    send_button.click((e) => {
        e.preventDefault();
        // alert if no username is set.
        validActions.includes(chat_input.val().toLowerCase()) ? window.location.replace(chat_input.val().toLowerCase()) : console.log('Invalid Entry, please dont be an idiot');
        console.log('send button clicked');
    });


});