var colors = ["green","red","yellow","blue"];
var sounds = [
    "./sounds/green.mp3",
    "./sounds/red.mp3",
    "./sounds/yellow.mp3",
    "./sounds/blue.mp3"
];
var num;
var temp;
var personalBest = 0;
var score;
var tempArray;


$("h1").click("event", function(event) {
    $("h1").off(event);
    $("h1").text("Level 1 round 1");
    startGame()
});



function startGame() {
    var level = 1;
    var round = 1;
    var pattern = [];
    var userpattern = [];

    setTimeout(() => {
        animateRandom(pattern);
    }, 1000);

    $(".card").click("event",function() {
        box = $(this).attr("id");
        animate(box,userpattern,pattern);

        //deside gaameover or continue
        if ((patternsMatch(pattern,userpattern))&&(pattern.length==userpattern.length)) {
            console.log("correct!");
            round++;
            if (round==6) {
                level++;
                round = 1;
            }
            score = ((level-1)*5)+round-1;
            $("h1").text("Level "+level+" round "+round);
            userpattern = [];
            setTimeout(() => {
                animateRandom(pattern);
            }, 500);
        } else if (patternsMatch(pattern,userpattern)==false) {
            console.log("GameOver!");
            gameOver(level,round,score);
        }
    })

}

//animate random
function animateRandom(pattern) {
    num = Math.floor(Math.random()*4);
    box = colors[num];
    var sound = new Audio(sounds[num]);

    $("#"+box).css("background-color","purple")
    .css("box-shadow","0px 0px 5px 5px white")
    .css("opacity","0.5");
    sound.play();
    setTimeout(() => {
        $("#"+box).css("background-color",box)
        .css("box-shadow","none")
        .css("opacity","1");
    }, 100);

    pattern.push(box);
}

function animate(box,userpattern) {
    var sound = new Audio("./sounds/"+box+".mp3"); 
    $("#"+box).css("background-color","purple")
    .css("box-shadow","0px 0px 5px 5px white")
    .css("opacity","0.5");
    sound.play();
    setTimeout(() => {
        $("#"+box).css("background-color",box)
        .css("box-shadow","none")
        .css("opacity","1");
    }, 100);
   
    userpattern.push(box);
}

//gameOver
function gameOver(level,round,score) {
    $("h1").text("Game Over. Click here to try again");
    var death = new Audio("./sounds/wrong.mp3");
    death.play();
    $("body").css("background-color","red");
    setTimeout(() => {
        $("body").css("background-color","#011f3f");
    }, 100);

    $("h1").click("event", function(event) {
        $("h1").off(event);
        $("h1").text("Level 1 1");
        startGame()
    });

    if (score>personalBest) {
        personalBest = score;
        $("p").html("<em>Personal best: Level </em>"+level+" round "+round);
    }

    $(".card").off()
}

function patternsMatch(pattern,userpattern) {
    tempArray = pattern.slice(0,userpattern.length);
    console.log("pattern: "+pattern);
    console.log("userpattern: "+userpattern);
    console.log("tempArray: "+tempArray);
    
    if ((JSON.stringify(tempArray)===JSON.stringify(userpattern))) {
        console.log("trueV")
        return true;
    } else {
        console.log("falseM")
        return false;
    }
    
}
