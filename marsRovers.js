var fs = require("fs");
const { exit } = require("process");

// Read to data from .txt file.
// Please add your input txt file with path to here.
fs.readFile("input.txt", "utf-8", (err, data) => {
    var arr = data.toString().split('\n'),
    infos=[];
    for (var i in arr) {
        var trimmed = arr[i].trim();
        if (trimmed .length !== 0) {
            infos.push(trimmed);
        }
    }

// The first line of the input always gives the x and y coordinate boundaries.
  limit_of_X_Y = infos[0].toString().split(' ');
 
//Two lines are used for information about each rover, and thus determining the number of vehicles.
  num_of_Rovers = (infos.length-1) / 2;
 
  var move_num = 1; 
  for(let i = 1 ; i<=num_of_Rovers ; i++){
    roverMustMove(infos[move_num], infos[move_num+1], limit_of_X_Y);
    move_num = move_num + 2;
  }

});


//General control of the rovers will be done with this function.
function roverMustMove(currentLocation, moveList, maxMove) {

//Max x coordinate and y coordinate limits are assigned to variables.
const max_x_axis = maxMove[0];
const max_y_axis = maxMove[1];

//Prepare string datas for using as array element.
currentLocation = splitInitial(currentLocation);
moveList = splitMoves(moveList);

/*
Movement patterns are defined according to directions.
North => Y axis + 1
South => Y axis - 1
East  => X axis + 1
West  => X axis - 1 
*/
Move_Points = [

    { x:  0, y:  1, direction: 'N' },
    { x:  0, y: -1, direction: 'S' },
    { x:  1, y:  0, direction: 'E' },
    { x: -1, y:  0, direction: 'W' }

]

var y = 0;
//A loop is created for all move steps.
while (moveList[y] !== undefined) {
    
    //The x and y values ​​for "M" have been changed according to the direction it is currently facing.
    if(moveList[y] === 'M'){

        for (var i = 0 ; i<4 ; i++){

            if(currentLocation[2] === Move_Points[i].direction){
                currentLocation[0] = Number(currentLocation[0]) + Move_Points[i].x;
                currentLocation[1] = Number(currentLocation[1]) + Move_Points[i].y;
                
                //The program fails when the X and Y limits are exceeded.
                if(currentLocation[0] > max_x_axis || currentLocation[0] < 0){
                    console.error(`The X-axis goes out of bounds.`);
                    exit();
                }else if(currentLocation[1] > max_y_axis || currentLocation[1] < 0){
                    console.error(`The Y-axis goes out of bounds.`);
                    exit();
                }
            }
        }
    } //It is defined which directions the rovers would face in 90 degree turns for "L" and "R".
    else if(moveList[y] === "L") {
            if(currentLocation[2] === "E"){
                currentLocation[2] = "N";
            }else if (currentLocation[2] === "N"){
                currentLocation[2] = "W"
            }else if (currentLocation[2] === "W"){
                currentLocation[2] = "S"
            }else{
                currentLocation[2] = "E"
            }
    }
    else if(moveList[y] === "R"){
            if(currentLocation[2] === "E"){
                currentLocation[2] = "S";
            }else if (currentLocation[2] === "S"){
                currentLocation[2] = "W"
            }else if (currentLocation[2] === "W"){
                currentLocation[2] = "N"
            }else{
                currentLocation[2] = "E"
            }
        }
        y++; 
    }
    //Output is provided as in the sample document.
    console.log(`${currentLocation[0]} ${currentLocation[1]} ${currentLocation[2]}`);
}

//this will using for split white spaces
function splitInitial(splitWord) {
splitWord = splitWord.toString().split(' ');
return splitWord;

}

//this will using for split moves
function splitMoves(moveWord){
moveWord = moveWord.toString().split('');
return moveWord;
}






