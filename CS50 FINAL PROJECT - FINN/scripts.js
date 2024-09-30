let player;
let currentVideoId = ''; 

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: currentVideoId,
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    // Player ready
}

function playAudio(videoId) {
    if (currentVideoId) {
        player.stopVideo();
    }
    currentVideoId = videoId;
    player.loadVideoById(currentVideoId);
    player.playVideo();
    closeMusicPopup();
}

function stopAudio() {
    if (player) {
        player.stopVideo();
    }
    currentVideoId = '';
}

function openMusicPopup() {
    document.getElementById('musicPopup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function closeMusicPopup() {
    document.getElementById('musicPopup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function openPopup() {
    document.getElementById('popup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function changeBackground() {
    const bgImageUrl = document.getElementById('bgImageInput').value;
    document.body.style.backgroundImage = `url('${bgImageUrl}')`;
    closePopup();
}

function addCustomMusic() {
    const link = document.getElementById('youtubeLink').value;
    const videoId = extractVideoId(link);
    if (videoId) {
        playAudio(videoId);
        document.getElementById('youtubeLink').value = '';
    } else {
        alert('Invalid YouTube link');
    }
}

function extractVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// default background
document.body.style.backgroundImage = "url('https://64.media.tumblr.com/13d2c753eed929097cc13bbb1d3e482c/67441800327766fc-96/s1920x1080/fe67f6e7feaaf682aa84cd0280cbb4eed24e9dea.gif')";
document.body.style.backgroundSize = 'cover';
document.body.style.backgroundPosition = 'center';

function openTodoList() {
    document.getElementById('todoListBox').style.display = 'block';
    document.getElementById('todoOverlay').style.display = 'block';
}

function closeTodoList() {
    document.getElementById('todoListBox').style.display = 'none';
    document.getElementById('todoOverlay').style.display = 'none';
}

function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const task = todoInput.value.trim();
    if (task) {
        const li = document.createElement('li');
        li.textContent = task;
        li.onclick = function() {
            this.classList.toggle('completed'); // when tasks done
        };
        document.getElementById('todoList').appendChild(li);
        todoInput.value = '';
    } else {
        alert('Please enter a task!');
    }
}

document.getElementById('todoInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});


const pomodoroTime = document.querySelector('.pomodoro__time');
const pomodoroState = document.querySelector('.pomodoro__state');
const modes = document.querySelectorAll('.mode');
const getStartedMessage = document.querySelector('.get-started');
const sound = document.querySelector('audio');
let countdown;

modes.forEach(mode => mode.addEventListener('click', switchModes));

function switchModes(e) {
    const secondsForMode = parseInt(e.target.dataset.time, 10);
    modes.forEach(mode => mode.classList.remove('active'));
    e.target.classList.add('active');
    getStartedMessage.style.display = 'none';
    timer(secondsForMode);
}

function timer(seconds) {
    clearInterval(countdown);
    const start = Date.now();
    const finish = start + seconds * 1000;
    displayTimeLeft(seconds);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((finish - Date.now()) / 1000);
        if (secondsLeft <= 0) {
            clearInterval(countdown);
            document.title = 'Time Up!';
            playAudio('CoBMbSJ4YEE');
            
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;
    const displayTime = `${minutes}:${secondsRemaining < 10 ? '0' : ''}${secondsRemaining}`;
    document.title = displayTime;
    pomodoroTime.textContent = displayTime;
}


