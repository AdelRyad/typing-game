const lvls = {
  "easy": 10,
  "medium": 7,
  "hard": 5
};

let time = 5;
// set time in html

let lvlTime = document.querySelectorAll( ".levels p span" );

lvlTime.forEach( element =>
{
  element.innerHTML = lvls[ element.parentElement.dataset.lvl ];
} );
// set counter
let lvlT = document.getElementById( "time" );
let counter;
let score = document.getElementById( "score" );


// set active level
let allLvls = document.querySelectorAll( ".levels p" );
let currentLvl;
if ( currentLvl === undefined )
{
  if ( localStorage.getItem( 'lvl' ) == undefined )
  {
    setActive( allLvls[ 0 ].dataset.lvl );

  }
  else
  {
    setActive( localStorage.lvl );
  }
}

allLvls.forEach( element =>
{
  element.addEventListener( "click", () =>
  {
    setActive( element.dataset.lvl );
    removeActive( allLvls );
    element.classList.add( "active" );
  } );
} );
function setActive ( level )
{
  // setting level
  currentLvl = level;
  time = lvls[ level ];
  lvlT.innerHTML = time;
  for ( let i = 0; i < allLvls.length; i++ )
  {
    if ( allLvls[ i ].dataset.lvl == level )
    {
      allLvls[ i ].classList.add( 'active' );
    }
  }
  localStorage.setItem( 'lvl', level );
}

// remove active class from all ele
function removeActive ( e )
{
  e.forEach( element =>
  {
    element.classList.remove( "active" );
  } );
};



let allWords = [
  "Elephant", "Sunshine", "Bicycle", "Rainbow", "Symphony",
  "Adventure", "Galaxy", "Chocolate", "Serendipity", "Butterfly",
  "Harmony", "Enchantment", "Velocity", "Whisper", "Radiance",
  "Carousel", "Zephyr", "Lighthouse", "Miraculous", "Quasar"
];
let words = allWords.flat( 0 );
// the random word
let word = document.querySelector( ".word p" );
let userIn = document.getElementById( "input" );
function randomWord ()
{
  let theWord = words[ Math.floor( Math.random() * words.length ) ];
  let indexOfWord = words.indexOf( theWord );
  if ( words.length == 1 )
  {
    theWord = words[ 0 ];
  }
  word.innerHTML = theWord;
  // remove the written word
  if ( word.innerHTML === theWord && words.length > 0 )
  {
    words.splice( indexOfWord, 1 );
  }

};


// start the game

let btn = document.querySelector( ".start" );
btn.onclick = () =>
{
  window.scroll( {
    behavior: "smooth",
    top: 0,
  } );
  userIn.value = '';
  userIn.focus();
  btn.style.display = 'none';
  randomWord();
  timeCounter();
  allLvls.forEach( e =>
  {
    e.style.display = 'none';
  } );

};



function timeCounter ()
{
  lvlT.innerHTML = time;
  let interval = setInterval( () =>
  {
    lvlT.innerHTML--;
    if ( lvlT.innerHTML == 0 )
    {
      console.log( 'as' );
      clearInterval( interval );
      gameOver();
    }
    else 
    {
      if ( userIn.value.trim().toLowerCase() === word.innerHTML.toLowerCase().trim() )
      {
        clearInterval( interval );
        if ( words.length > 0 )
        {
          randomWord();
          userIn.value = '';
          // create score counter
          score.innerHTML++;
          timeCounter();
        }
      }
    }
  }, 1000 );
};


let BestScore;
function showData ()
{
  if ( localStorage.score )
  {
    BestScore = JSON.parse( localStorage.score );
    let table = [];
    let arr = [];
    let finalBest = [];
    // Best score
    for ( let i = 0; i < BestScore.length; i++ )
    {
      arr.push( BestScore[ i ][ "score" ] );
    }
    arr.sort().reverse();
    for ( let i = 0; i < arr.length; i++ )
    {
      for ( let j = 0; j < BestScore.length; j++ )
      {
        if ( arr[ i ] === BestScore[ j ][ "score" ] )
        {
          finalBest.push( BestScore[ j ] );
        }
      }
    }
    // show data
    for ( let i = 0; i < arr.length; i++ )
    {
      table += `<li> <span>${ finalBest[ i ][ "name" ] }</span>
      <span>${ finalBest[ i ][ "score" ] }</span>
      <span>${ i + 1 }</span>
      </li>
      `;
    }
    document.querySelector( ".list" ).innerHTML = table;
  }
  else
  {
    BestScore = [];
    localStorage.setItem( "score", [] );
  }
}
showData();

// pop up

let popup = document.querySelector( ".pop-up" );
let layout = document.querySelector( ".layout" );
let pscore = document.querySelector( ".player-score" );
let playerName = document.getElementById( "player-name" );
let sub = document.querySelector( ".sub" );
let playerScore = {
  "name": playerName.value,
  "score": pscore.innerHTML,
};

function gameOver ()
{
  layout.style.display = 'block';
  popup.style.display = 'flex';
  pscore.innerHTML = score.innerHTML;
  playerName.innerHTML = '';
  playerName.focus();
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
  // store the score in local storage
  sub.onclick = () =>
  {
    if ( playerName.value != '' )
    {
      playerScore[ "name" ] = playerName.value;
      playerScore[ "score" ] = score.innerHTML;
      BestScore.push( playerScore );
      localStorage.score = JSON.stringify( BestScore );
      showData();
      layout.style.display = 'none';
      popup.style.display = 'none';
      score.innerHTML = 0;
      document.body.style.position = 'initial';
      reset();
      window.location.reload();
    }


  };
}


function reset ()
{
  word.innerHTML = 'The Word';
  score.innerHTML = 0;
  words = allWords.flat( 0 );
  btn.style.display = 'inline-block';
  allLvls.forEach( e =>
  {
    e.style.display = 'block';
  } );
  userIn.value = '';
  lvlT.innerHTML = time;
  playerName.value = '';
}

