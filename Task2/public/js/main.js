console.log('main script loaded');

$.getJSON('/data', (res) => {
    $("#game_state_json").append(JSON.stringify(res, undefined, 2));
});
$(function () {
    //Variables
    let rnd = Math.floor(Math.random() * 101);
    let settings = {'users': []};
    let sorted_by_score;
    let users = [];

    //If settings doesn't exists in localstorage
    if (localStorage.getItem('settings') == null) {
        localStorage.setItem('settings', JSON.stringify(settings));
    } else {
        settings = JSON.parse(localStorage.getItem('settings'));
        settings.users.forEach(el => users.push({'name': el.name, 'score': el.score}));
        console.log('users array: ' + JSON.stringify(users));
        sorted_by_score = users.sort((a, b) => (a.score < b.score) ? 1 : -1);

    }
    if (users.length > 1) for (let i = 0; i < users.length; i++) {
        //console.log(sorted_by_score[i].score);
        if (i > 2) {
            break;
        }
        $("#highscore_table").append(`<tr>
                <th scope="row">${i + 1}</th>
                <td>${sorted_by_score[i].name}</td>
                <td>${sorted_by_score[i].score}</td>
            </tr>`);
    }

    $("#username_btn").click((e) => {
        e.preventDefault();
        let usr = $("#username_input").val();

        //Prevent duplicate usernames.
        if (!users.includes(usr)) {
            settings.users.push({'name': usr, 'score': 0});
            $("#game_area").empty();
            $("#game_area").append('<br><p class="float-left">Current user: ' + usr + '</p>');
        } else {
            alert('Username already exists!');
        }
        localStorage.setItem('settings', JSON.stringify(settings));
        console.log(settings);
    });
    console.log('rnd value is: ' + rnd);
    localStorage.setItem('settings', JSON.stringify(settings));

    $("#clear_btn").click((e) => {
        e.preventDefault();
        let settings = {'users': []};
        localStorage.setItem('settings', JSON.stringify(settings));
        location.reload();
    });
});


