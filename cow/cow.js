var myCow;

function startGame() {
    myCow = new cow(60, 60, 50, 120);
    myField.start();
}

var myField = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 500;
        this.canvas.height = 300;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        updateGameArea();
        window.addEventListener('keydown', function (e){ 
             myField.keys = (myField.keys || []);
           myField.keys[e.keyCode] = (e.type == "keydown");
           })
        
        window.addEventListener('keyup', function (e){ 
             myField.keys[e.keyCode] = (e.type == "keydown");
        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function cow(width, height, x, y) {
    this.gamearea = myField;
    this.width = width;
    this.height = height;
    this.speedx = 0;
    this.speedy = 0;
    this.x = x;
    this.y = y;

    this.updatePosition = function(){
      // Update the location based on the changes of speed
      let newx = this.x + this.speedx;
      let newy = this.y + this.speedy;
      if (newx >= 0 && this.width + newx <= this.gamearea.canvas.width)
      {
          this.x = newx;
      }
      if (newy >= 0 && this.height + newy <= this.gamearea.canvas.height)
      {
          this.y = newy;
      }

      // Draw image
      // https://www.w3schools.com/tags/canvas_drawimage.asp
      ctx = myField.context;
      var img = document.getElementById("cow-body");
      ctx.drawImage(img, this.x, this.y, this.width, this.height);

      //This is where you stop movement
      this.speedx = 0; 
      this.speedy = 0;
    }

    this.moveup = function() {
      this.speedy = -MOVE_SPEED;
    }

    this.moveleft = function() {
      this.speedx = -MOVE_SPEED;
    }

    this.movedown = function() {
      this.speedy = MOVE_SPEED;
    }

    this.moveright = function() {
      this.speedx = MOVE_SPEED;
    }

    this.move = function(instructions) {
      for (var i = 0; i < userInstructions.length; i++) {
          switch (userInstructions[i]) {
            case 'up':
              this.moveup();
              break;
            case 'down':
              this.movedown();
              break;
            case 'left':
               this.moveleft();
              break;
            case 'right':
              this.moveright();
              break;
            default:
              break;
          }
          updateGameArea();
        }
        userInstructions = [];
        printDirection();

    }
}

let userInstructions = [];

function printDirection() {
  let print = document.getElementById("feedback");
  // https://www.w3schools.com/jsref/jsref_join.asp
  print.innerHTML = userInstructions.join(", ");
}



// Direction codes (Keyboard key codes for arrow keys):
const LEFT_DIR = 37;
const UP_DIR = 38;
const RIGHT_DIR = 39;
const DOWN_DIR = 40;
const MOVE_SPEED = 60;

function updateGameArea() {
  myField.clear();
  myCow.updatePosition();
  if (myField.keys && myField.keys  [LEFT_DIR]) {moveleft();}
  if (myField.keys && myField.keys  [UP_DIR]) {moveup();}
  if (myField.keys && myField.keys  [RIGHT_DIR]) {moveright();}
  if (myField.keys && myField.keys  [DOWN_DIR]) {movedown();}
}

let instructions = [];
function move() {
    myCow.move(instructions);
}
function moveup() {
    userInstructions.push("up");
    printDirection();
}

function movedown() {
    userInstructions.push("down");
    printDirection();
  }

function moveleft() {
    userInstructions.push("left");
    printDirection();
}

function moveright() {
    userInstructions.push("right"); 
    printDirection();
}

// How to Play Model
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}