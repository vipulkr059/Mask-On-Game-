const doors = document.querySelectorAll('.door');
const scoreBoard = document.querySelector('#tag')
const persons = document.querySelectorAll('.person')

let lastDoor ;
let fine = 0;
let lastperson ;
var photo;
var audio = document.getElementById('bg');
const volume = document.querySelector('#bg').volume;
document.querySelector('#bg').volume = 0.5;
var audio1 = document.getElementById('success')
var audio2 = document.getElementById('fail')
var audio3 = document.getElementById('gameover')

var p = ['p1m','p2m','p3m','p1um','p2um','p3um']
let lim ;

var modal = document.querySelector('.modal');
var modal2 = document.querySelector('#modal2');
var modal3 = document.querySelector('#modal3');
const x = document.querySelector('.close');
var go = document.querySelector('.str');
var playAgain = document.querySelector('.Play');
var playAgain2 = document.querySelector('.play');


x.addEventListener('click',shut);
go.addEventListener('click',startGame)
playAgain.addEventListener('click',startGame)
playAgain2.addEventListener('click',startGame)
function shut(params) {
 modal.style.display="none"; 
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
function randomTime(min,max) {
    return Math.round(Math.random()*(max-min)+min)
}

function randomDoor(doors) {
    const idx = Math.floor(Math.random() * doors.length);
    const door = doors[idx];
    if (door === lastDoor) {
      return randomDoor(doors);
    }
    lastDoor = door;
    return door;
  }

  function randomPerson(persons) {
    const idx = Math.floor(Math.random() * persons.length);
    const person = persons[idx];
    
    if (person === lastperson) {
        return randomPerson(persons)
    }
      lastperson = person;
        return person ;
  }

  function rImage(p) {
    const idx = Math.floor(Math.random() * p.length);
    photo = p[idx];
    
    if (photo === lim) {
        return randomPerson(p)
    }
      lim = photo;
        return photo;
  }

function peep() {
    const time = randomTime(500,3000)
    const person = randomPerson(persons)
    photo = rImage(p);
    person.setAttribute('id',`${photo}`)
    person.classList.add('show')
    setTimeout(() => {
        person.classList.remove('show')
        if(fine<10 && star>0) peep();
        if(fine==10){
          document.getElementById('modal3').style.display="block";
        }
        
    }, time);
}

function startGame() {
   
    modal.style.display='none'
    modal2.style.display='none'
    modal3.style.display="none"
    audio.play();
    fine=0;
    star = 3
    document.getElementById('status').style.height ='0%'
    document.getElementById('tag').style.bottom = `${(fine*10)-5}%`
    document.getElementById('star1').style.display = "block";
    document.getElementById('star2').style.display = "block";
    document.getElementById('star3').style.display = "block";
    scoreBoard.textContent=fine*2000;

    setTimeout(() => {
      peep();
    }, 3000);
  }
var star ;
function bonk(e) {
    if(!e.isTrusted) return;
    if(photo.length == 4){
      audio1.play();
      fine++;
    
    }else{
      audio2.currentTime = 1;
      audio2.play();
      document.getElementById(`${'star'+star}`).style.display = "none";
      star--;
      if(star==0){
        console.log("gameover");
        audio.pause()
        audio3.play()
        setTimeout(() => {
          document.getElementById('modal2').style.display="block"
        }, 1000);
      }
    }
    console.log(this)
    this.classList.remove('show');
    document.getElementById('status').style.height = `${fine*10}%`
    document.getElementById('tag').style.bottom = `${(fine*10)-5}%`
    scoreBoard.textContent=fine*2000;
    
}
persons.forEach(person => person.addEventListener('click',bonk));

const bgMusic = document.querySelector('#music')
bgMusic.addEventListener('click',Music)
function Music(params) {
    if(audio.paused){
        audio.play();
        audio.loop=true;
      } else {
        audio.pause();
      }
  }
