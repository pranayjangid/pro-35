var balloon, background;
var position, database;

function preload() {
  backgroundImage = loadImage("1.png");  
  balloonImage = loadAnimation("2.png","3.png","4.png");
}

function setup(){
   database = firebase.database();
   console.log(database);
   createCanvas(500,500);

   balloon = createSprite (100,400, 20, 20)
   balloon.addAnimation("balloon", balloonImage);
   balloon.scale = 0.4;

   balloonRef = database.ref("balloon/position");
   balloonRef.on("value",function(data){
    position = data.val();
    console.log(position.x);
    balloon.x = position.x;
    balloon.y = position.y;
   });
}

function draw(){

    background(backgroundImage);
  
        if(keyDown(LEFT_ARROW)){
            updateBalloonPosition(-10,0);            
        }
        else if(keyDown(RIGHT_ARROW)){
            updateBalloonPosition(10,0);  
        }
        else if(keyDown(UP_ARROW)){
            updateBalloonPosition(0,-10);  
        }
        else if(keyDown(DOWN_ARROW)){
            updateBalloonPosition(0,10);  
        }
        drawSprites();
}

function updateBalloonPosition(x,y){
    database.ref("balloon/position").update({
        x:position.x+x,
        y:position.y+y,
    })
}


    


