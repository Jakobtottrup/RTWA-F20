$(() => {
    $("#chat_area").hide();
    $("#nav_area").addClass('col-12').removeClass('col-6 border border-dark');
    console.log('game script loaded');
    let rnd = Math.floor(Math.random() * 101);
    let settings = JSON.parse(localStorage.getItem('settings'));
    console.log('random value is ' + rnd);

    let current_user = settings.users.slice(-1)[0]; //last user of settings object
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


let event = "<h1 class='display-3'>Your score has "+ rnd_text +"</h1>";
   // console.log(current_user.name);
    $("#game_area").append('<br><p class="float-left">Current user: ' + current_user.name + '</p>');

$("#game_state").append(event);
    localStorage.setItem('settings', JSON.stringify(settings));
//set user score to random value if it is higher than current score.
});