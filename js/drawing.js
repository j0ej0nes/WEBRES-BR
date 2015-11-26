
var x;
var y;
var chosenBomb = "B";
//console.log(chosenBomb);
var workingRadius;

//console.log(document.getElementById("bombButton1"));
//document.getElementById("bombButton1").addEventListener('click', console.log("cliked 1"));
//document.getElementById("bombButton2").addEventListener('click', chooseBomb(2));
//document.getElementById("bombButton3").addEventListener('click', chooseBomb(3));


function chooseBomb(e){
  switch(e){
    case 1:
      chosenBomb = "A";
      break;
    case 1:
      chosenBomb = "A";
      break;
    case 1:
      chosenBomb = "A";
      break;
    default:
      break;
  }
  console.log("new bomb: " + chosenBomb);

}


//radiation = size of radiation - green
//death = airbust blast (5psi) - red
//injuries = thrermal burn radius - blue
var LittleBoy = {Injuries:1.9, Radiation:1.3, Death:1.2};
var Davy = {Injuries:0.09, Radiation:0.5, Death:0.4};
var Hellfire = {Injuries:0.015, Radiation:0, Death:0.020};
var IvyMike = {Injuries:16, Radiation:6, Death:3.2};


$("#bombCanvas").click(function(e){

  clear();

  x = e.pageX - this.offsetLeft;
  y = e.pageY - this.offsetTop;

  //CASES A = LITTLEBOY, B = DAVY, C = HELLFIRE
  switch(chosenBomb){
    case "A":
      drawCricle(x, y, LittleBoy.Injuries, "rgba(9, 156, 214, 0.5)");
      drawCricle(x, y, LittleBoy.Radiation, "rgba(101, 214, 9, 0.5)");
      drawCricle(x, y, LittleBoy.Death, "rgba(214, 9, 9, 0.5)");
      workingRadius = LittleBoy.Injuries;
      break;
    case "B":
      drawCricle(x, y, Davy.Injuries, "rgba(9, 156, 214, 0.5)");
      drawCricle(x, y, Davy.Radiation, "rgba(101, 214, 9, 0.5)");
      drawCricle(x, y, Davy.Death, "rgba(214, 9, 9, 0.5)");
      workingRadius = Davy.Injuries;
      break;
    case "C":
      drawCricle(x, y, IvyMike.Injuries, "rgba(9, 156, 214, 0.5)");
      drawCricle(x, y, IvyMike.Radiation, "rgba(101, 214, 9, 0.5)");
      drawCricle(x, y, IvyMike.Death, "rgba(214, 9, 9, 0.5)");
      workingRadius = IvyMike.Injuries;
      break;
    default:
      noBombSelected();
  }

  //windFromArray(chosenWind);
  getWeather();

});

function drawCricle(xcoord, ycoord, radius, colour){
  var context = document.getElementById('bombCanvas').getContext("2d");
  context.fillStyle = colour;
  context.beginPath();
  context.arc(xcoord, ycoord, radiusToPixels(radius),0, 2*Math.PI);
  context.stroke();
  context.fill();

     $('#coordsDisplay').html(xcoord +', '+ ycoord);
}

function noBombSelected(){
  console.log("no bomb selected");
}

function radiusToPixels(radius){
  var canvasPx = document.getElementById('bombCanvas').width;
  var pixels = canvasPx/100;
  var pxRadius = pixels * radius;

  return pxRadius;
}

function clear (){
    var s = document.getElementById ("bombCanvas");
    var w = s.width;
    s.width = 10;
    s.width = w;
}




//jQuery(document).ready(oldDraw());

function oldDraw(){
     $("#special").click(
       function(e){

        clear();
        x = e.pageX - this.offsetLeft;
        y = e.pageY - this.offsetTop;


        var ctx= this.getContext("2d");
        ctx.fillStyle = "rgba(255, 255, 0, .5)"
        ctx.beginPath();
        ctx.arc(x, y, 70,0, 2*Math.PI);
        ctx.stroke();
        ctx.fill();

        $('#status2').html(x +', '+ y);
   });

}
