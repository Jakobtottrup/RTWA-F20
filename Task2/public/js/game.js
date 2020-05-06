$.getJSON('/data', (res) => {
    //console.log(res);
    localStorage.setItem('current_user', JSON.stringify(res));
});

$(() => {

    let socket = io();
    let user_data = JSON.parse(localStorage.getItem('current_user'));
    //let stats = JSON.stringify(user_data.gamestate.stats);
    console.log('current user stats: ' + user_data.gamestate.stats.toString());
    //let stats = user_data.gamestate.stats;

    $("#chat_area").hide();
    $("#nav_area").addClass('col-12').removeClass('col-6 border border-dark');
    console.log('game script loaded');
    let rnd = Math.floor(Math.random() * 101);
    let settings = JSON.parse(localStorage.getItem('settings'));
    console.log('random value is ' + rnd);

    let current_user = settings.users.find(o => o.current === true);
    $("#user_hook").append(current_user.name);
    let user_score = current_user.score; //last user of settings object's score
    let rnd_text;
    if (rnd > user_score) {
        rnd_text = 'increased';
        settings.users.filter(obj => obj.name === current_user.name)[0].score = rnd;
        console.log(current_user.name + ': your score has ' + rnd_text);
    } else {
        rnd_text = 'not increased';
        console.log(current_user.name + ': your score has ' + rnd_text);

    }


    let event = "<h1 class='display-3'>Your score has " + rnd_text + "</h1>";

    $("#game_state").append(event);
    localStorage.setItem('settings', JSON.stringify(settings));



    //STAT buttons
    //increases stat by 1 point
    //decreases available_points by 1
    $("#inc_str").click((e) => {
        e.preventDefault();
        if (user_data.gamestate.stats.available_points > 0) {
            user_data.gamestate.stats.strength++;
            user_data.gamestate.stats.available_points--;
            localStorage.setItem('current_user', JSON.stringify(user_data));
            console.log('current str: ' + user_data.gamestate.stats.strength);
            console.log('points left: ' + user_data.gamestate.stats.available_points);
        } else {
            alert('Not enough remaining stats!');
        }
        socket.emit('update_stats',  user_data);
    });
    $("#inc_agi").click((e) => {
        e.preventDefault();
        if (user_data.gamestate.stats.available_points > 0) {
            user_data.gamestate.stats.agility++;
            user_data.gamestate.stats.available_points--;
            localStorage.setItem('current_user', JSON.stringify(user_data));
            console.log('current agi: ' + user_data.gamestate.stats.agility);
            console.log('points left: ' + user_data.gamestate.stats.available_points);
        } else {
            alert('Not enough remaining stats!');
        }
        socket.emit('update_stats',  user_data);
    });
    $("#inc_stam").click((e) => {
        e.preventDefault();
        if (user_data.gamestate.stats.available_points > 0) {
            user_data.gamestate.stats.stamina++;
            user_data.gamestate.stats.available_points--;
            localStorage.setItem('current_user', JSON.stringify(user_data));
            console.log('current stam: ' + user_data.gamestate.stats.stamina);
            console.log('points left: ' + user_data.gamestate.stats.available_points);
        } else {
            alert('Not enough remaining stats!');
        }
        socket.emit('update_stats',  user_data);
    });
    $("#inc_int").click((e) => {
        e.preventDefault();
        if (user_data.gamestate.stats.available_points > 0) {
            user_data.gamestate.stats.intellect++;
            user_data.gamestate.stats.available_points--;
            localStorage.setItem('current_user', JSON.stringify(user_data));
            console.log('current int: ' + user_data.gamestate.stats.intellect);
            console.log('points left: ' + user_data.gamestate.stats.available_points);
        } else {
            alert('Not enough remaining stats!');
        }
        socket.emit('update_stats',  user_data);
    });
});