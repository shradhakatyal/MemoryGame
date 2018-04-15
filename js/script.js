var totalMoves = 0;
var numMatches = 0;
var isOpen = false;
var firstClick = true;
var temp = [];
var sec;
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
}];

copyArray = [].concat(colorArray);

// Assigning IDs to all the tiles

$('.tile').each(function (index) {
    $(this).attr('id', 'tile-' + index);
});

$('.inner-tile').each(function (index) {
    $(this).attr('id', 'inner-tile-' + index);
    $(this).css('display', 'none');
    randomColor();
});

//To reset game

$('#reset').on('click', function () {
    resetGame();
});

function resetGame() {
    clearInterval(timer);
    $('#timer').text('0');
    copyArray = [].concat(colorArray);
    totalMoves = 0;
    isOpen = false;
    temp = [];
    bgColors = [];
    updateMovesCounter();
    $('.inner-tile').each(function () {
        randomColor();
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
    $('.inner-tile').each(function (i) {
        $(this).css('backgroundColor', bgColors[i]);
    });
}

function randomColorGenerator() {
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


function cleanArray() {
    bgColors = bgColors.filter(function (val) {
        if (val) {
            return val;
        }
    });
}

function updateStarRating() {
    if (totalMoves > 6) {
        $('#star-3').fadeOut('slow');
    }
    if (totalMoves > 24) {
        $('#star-2').fadeOut('slow');
    }
    if (totalMoves > 36) {
        $('#star-1').fadeOut('slow');
    }
}

function startTimer() {
    sec = 0;
    timer = setInterval(function () {
        $('#timer').text(++sec);
    }, 1000);
}


function updateMovesCounter() {
    $('#counter').text(totalMoves);
}

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

$('.tile').on('click', function () {
    if (firstClick) {
        startTimer();
        firstClick = false;
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
                window.scrollTo(0, 0);
                $('#rating').addClass('fa', 'fa-star');
                $('#time').text(sec);
                $('.modal').css('display', 'block');
                $('body').css('overflow', 'hidden');
                clearInterval(timer);
            }
            else {
                $('#' + temp[1]).click(false);
                $('#' + temp[1]).click(false);
                temp = [];
            }
        }
        else {
            $('#' + temp[0]).children().fadeOut('slow');
            $('#' + temp[1]).children().fadeOut('slow');
        }
        temp = [];
        isOpen = false;
    }

    else {
        isOpen = true;
        $(this).children().fadeIn('fast');
    }

});

$('#close-modal').on('click', function () {
    $('.modal').css('display', 'none');
    $('body').css('overflow', 'auto');
    resetGame();
});