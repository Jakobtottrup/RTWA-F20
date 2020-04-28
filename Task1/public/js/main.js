console.log('main script loaded');

/**
 * read default-settings.json
 *

 */

/**
 * on room change, score changes to random value between 1-100.
 * username prompt on load -> save to localstorage
 * if highscore json file exists -> insert into table
 */


/**
 * Change 'game room' to what room you are in
 * "you are in ${Room_ID} where would you like to go?
 * validate input to "a, b, c, main".
 */

$(function () {

    let chat_input = $("#chat_input");
    let send_button = $("#send_message");
    let chat_messages = $("#chat_messages");
    let validActions = ['a', 'b', 'c', 'main'];


    send_button.click((e) => {
        e.preventDefault();
        validActions.includes(chat_input.val().toLowerCase()) ? window.location.replace(chat_input.val().toLowerCase()) : console.log('Invalid Entry, please dont be an idiot');
        console.log('send button clicked');
        //window.location.replace("/");
    });

    //socket.emit('change_username', {username: currentUser});
    /*
    loginbtn.click(() => {
        socket.emit('login', {username: usr.val()}); //instead of testuser - get username
    });

    send_username.click(function () {
        console.log(username.val());
        socket.emit('change_username', {username: username.val()})
    });

    send_message.click(function () {
        socket.emit('new_message', {message: message.val()})
    });

    socket.on('new_message', (data) =>{
        console.log("chat message: " + data);
        chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>");
    });

    message.bind('keypress', () =>{
        socket.emit('typing');
    });

    socket.on('typing', (data) =>{
        feedback.html("<p><i>" + data.username +" is typing a message..."+"</i></p>")
    })*/
});
