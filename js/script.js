var totalMoves = 0;
var numMatches = 0;
var isOpen = false;
var firstClick = true;
var temp = [];
var sec;
var i;
var bgColors = [];
var copyArray = [];
var timer;
var colorArray = [{
        color: '#0099cc',
        'count': 2
    },
    {
        'color': '#66ff66',
        'count': 2
    },
    {
        'color': '#cc33ff',
        'count': 2
    },
    {
        'color': '#333300',
        'count': 2
    },
    {
        'color': '#990000',
        'count': 2
    },
    {
        'color': '#ccff66',
        'count': 2
    },
    {
        'color': '#663300',
        'count': 2
    },
    {
        'color': '#6666ff',
        'count': 2
    }
];

// To create a deep copy of colorArray.

copyArray = JSON.parse(JSON.stringify(colorArray));

// Assigning IDs to all the tiles

$('.tile').each(function(index) {
    $(this).attr('id', 'tile-' + index);
});

$('.inner-tile').each(function(index) {
    $(this).attr('id', 'inner-tile-' + index);
    $(this).css('display', 'none');
    $(this).prop('matched', false);
    randomColor()
});

//Clicking the reset button calls a method that resets the game

$('#reset').on('click', function() {
    resetGame();
});

// Method to reset the game.

function resetGame() {
    clearInterval(timer);
    $('#timer').text('0');
    copyArray = JSON.parse(JSON.stringify(colorArray));
    console.log(copyArray);
    totalMoves = 0;
    numMatches = 0;
    isOpen = false;
    firstClick = true;
    temp = [];
    bgColors = [];
    updateMovesCounter();
    $('.inner-tile').each(function() {
        randomColor();
    });
    $('.tile').each(function() {
        $(this).prop('matched', false);
    });
    $('#star-3').css('display', 'inline');
    $('#star-2').css('display', 'inline');
    $('#star-1').css('display', 'inline');
    $('.inner-tile').css('display', 'none');
}

// Functions to randomly assign a color to each tiles

function randomColor() {
    randomColorGenerator();
    cleanArray();
    i = 0;
    $('.inner-tile').each(function() {
        $(this).css('backgroundColor', bgColors[i]);
        i++;
    });
}

// Function that generates an array of random colors.

function randomColorGenerator() {
    console.log(copyArray);
    var index = Math.floor(Math.random() * copyArray.length);
    var lastIndex = copyArray.length - 1;
    if (copyArray[index].count > 0) {
        copyArray[index].count--;
        var random = copyArray[index].color;
        bgColors.push(random);
        if (copyArray[index].count == 0) {
            var t = copyArray[index];
            copyArray[index] = copyArray[lastIndex];
            copyArray[lastIndex] = t;
            copyArray.pop();
        }
    }
}

// Function to clean the array of random colors, filters out falsy values.

function cleanArray() {
    bgColors = bgColors.filter(function(val) {
        if (val) {
            return val;
        }
    });
}

// Function to update the star rating as per number of moves

function updateStarRating() {
    if (totalMoves > 16) {
        $('#star-3').fadeOut('slow');
    }
    if (totalMoves > 24) {
        $('#star-2').fadeOut('slow');
    }
    if (totalMoves > 36) {
        $('#star-1').fadeOut('slow');
    }
}
// Function to start timer at the start of each game.

function startTimer() {
    sec = 0;
    timer = setInterval(function() {
        $('#timer').text(++sec);
    }, 1000);
}

// Function to update the display of moves counter.

function updateMovesCounter() {
    $('#counter').text(totalMoves);
}

// Functions for further action depending on whether the user clicks yes or no.

$('#no').on('click', function() {
    $('.modal').css('display', 'none');
    $('body').css('overflow', 'auto');
    alert('Sorry to see you go..')
});


$('#yes').on('click', function() {
    $('.modal').css('display', 'none');
    $('body').css('overflow', 'auto');
    resetGame();
})

// on click function for the tiles

$('.tile').on('click', function() {
    if (firstClick) {
        startTimer();
        firstClick = false;
    }
    if ($(this).prop('matched') === true) {
        return;
    }
    updateStarRating();
    totalMoves++;
    updateMovesCounter();
    var id = $(this).attr('id');
    temp.push(id);
    if (isOpen) {
        $(this).children().fadeIn('fast');
        if ($('#' + temp[0]).children().css('backgroundColor') === $('#' + temp[1]).children().css('backgroundColor')) {
            numMatches++;
            if (numMatches === 8) {
                gameWon();
            } else {
                $('#' + temp[0]).prop('matched', true);
                $('#' + temp[1]).prop('matched', true);
                temp = [];
            }
        } else {
            $('#' + temp[0]).children().fadeOut('slow');
            $('#' + temp[1]).children().fadeOut('slow');
        }
        temp = [];
        isOpen = false;
    } else {
        isOpen = true;
        $(this).children().fadeIn('fast');
    }

});

$('#close-modal').on('click', function() {
    $('.modal').css('display', 'none');
    $('body').css('overflow', 'auto');
    resetGame();
});

// Gets called when the user wins the game
// Displays the game won modal

function gameWon() {
    window.scrollTo(0, 0);
    if (totalMoves <= 16) {
        $('#rating1').addClass('fa-star fa');
        $('#rating2').addClass('fa-star fa');
        $('#rating3').addClass('fa-star fa');
    } else if (totalMoves > 16 && totalMoves <= 24) {
        $('#rating1').addClass('fa-star fa');
        $('#rating2').addClass('fa-star fa');
    } else if (totalMoves > 24) {
        $('#rating1').addClass('fa-star fa');
    }
    $('#time').text(sec);
    $('.modal').css('display', 'block');
    $('body').css('overflow', 'hidden');
    clearInterval(timer);
}