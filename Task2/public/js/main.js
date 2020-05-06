console.log('main script loaded');
//Old function to retreive gamestate.
/*$.getJSON('/data', (res) => {
    $("#game_state_json").append(JSON.stringify(res, undefined, 2));
});*/

$(function () {
    //Variables
    let socket = io();
    let chat_output = $("#output");
    let chat_input = $("#chat_input");
    let chat_send = $("#send_message");
    let settings = {'users': []};
    let sorted_by_score;
    let users = [];
    let duplicate = false;

    //If settings doesn't exists in localstorage
    if (localStorage.getItem('settings') == null) {
        localStorage.setItem('settings', JSON.stringify(settings));
    } else {
        settings = JSON.parse(localStorage.getItem('settings'));
        settings.users.forEach(el => {
            el.current = false;
            users.push({'name': el.name, 'score': el.score, current: false})
        });
        sorted_by_score = users.sort((a, b) => (a.score < b.score) ? 1 : -1);

    }

    //Set highscore values
    if (users.length > 1) for (let i = 0; i < users.length; i++) {
        if (i > 2) {
            break;
        }
        $("#highscore_table").append(`<tr>
                <th scope="row">${i + 1}</th>
                <td>${sorted_by_score[i].name}</td>
                <td>${sorted_by_score[i].score}</td>
            </tr>`);
    }
    let usr = {name: $("#user_hook")[0].textContent.slice(14), score: "0", current: true}

    //Prevent duplicate usernames.
    settings.users.forEach(el => {
        if (el.name === usr.name) {
            duplicate = true;
            // returning user - setting current flag to true.
            el.current = true;
        }
    });
    if (!duplicate) {
        settings.users.push(usr);
    }
    localStorage.setItem('settings', JSON.stringify(settings));
    localStorage.setItem('settings', JSON.stringify(settings));

    //Clear localstorage
    $("#clear_btn").click((e) => {
        e.preventDefault();
        let settings = {'users': []};
        localStorage.setItem('settings', JSON.stringify(settings));
        location.reload();
    });

    //Socket.io handling
    chat_send.click((e) => {
        e.preventDefault();
        socket.emit('chat', {message: chat_input.val(), sender: $("#username_input").val()});
    });

    socket.on('chat', (data) => {
        chat_output.append(`<p><strong>${data.sender}: </strong> ${data.message}</p>`);
    });

});


