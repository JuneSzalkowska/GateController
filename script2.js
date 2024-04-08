var MposX = 0
var MposY = 0
var Speedlimit = 7;
var SpawnedEntities = 0;
var DirVector = [0, 0, 0, 0];

var timer=0;

function updateMousePos(){     

    //this does nothing

    //other than making the console stop whining
}

var Entities = [ // all objects in the simulation
    new Entity("Player", "Player", 60, 100, 50, 50, 1),
    new Entity("Obramowanie", "Object", 100, 20, 360, 40, "Yeah"),
    new Entity("Karta_1", "KeycardScanner", 120, 60, 40, 140, false),
    new Entity("Czujnik_1", "Scanner", 160, 60, 40, 140, false),
    new Entity("Czujnik_2", "Scanner", 260, 60, 40, 140, false),
    new Entity("Czujnik_3", "Scanner", 360, 60, 40, 140, false),
    new Entity("Karta_2", "KeycardScanner", 400, 60, 40, 140, false), 
    new Entity("Bramka", "Gate", 270, 60, 20, 140, "Its just a gate controller"),
]; 

//singular entity class
function Entity(name, type, pos_x, pos_y, size_x, size_y, special) {
    this.name = name;
    this.type = type;
    this.pos_x = pos_x;
    this.pos_y = pos_y;
    this.size_x = size_x;
    this.size_y = size_y;
    this.special = special; //meta data
}


var EntityLimit = 25;

function Move(X, Y) {


    Entities[0].pos_x += X;
    Entities[0].pos_y += Y;

    if (!(Entities[0].pos_x >= 0)) {
        Entities[0].pos_x = 0;
    }
    if (!(Entities[0].pos_y >= 0)) {
        Entities[0].pos_y = 0;
    }

}
function setMyKeyDownListener() {
    window.addEventListener(
        "keydown",
        function (event) {
            KeyProcess(event.key)
        }
    )
}


function KeyProcess(the_Key) { //Processing keyboard inputs
    switch (the_Key) {
        case "w":
            if (DirVector[1] != -Speedlimit) {
                DirVector[1] -= 1;
            }
            break;
        case "s":
            if (DirVector[1] != Speedlimit) {
                DirVector[1] += 1;
            }
            break;
        case "d":
            if (DirVector[0] != Speedlimit) {
                DirVector[0] += 1;
            }
            break;
        case "a":
            if (DirVector[0] != -Speedlimit) {
                DirVector[0] -= 1;
            }
            break;
    }
}

function Gametick() { 


    DirVector[2] = Entities[0].pos_x + DirVector[0]
    DirVector[3] = Entities[0].pos_y + DirVector[1]

    Entities[0].pos_x = (Entities[0].pos_x + DirVector[2]) / 2
    Entities[0].pos_y = (Entities[0].pos_y + DirVector[3]) / 2

}

var ScannerArray = []
var ScannerList = [];

function Initialise() {

    function GetAssoc(){ //Push ScannerList values to asssoc array
        for(i=0;i!=ScannerList.length; i++){
            ScannerArray[Entities[ScannerList[i]].name]=ScannerList[i]
        }
    }
    function GetAllScanners(){ //Create a list of Scanner entities
        for(i=0;i!=Entities.length;i++){
            if(Entities[i].type=="Scanner"||Entities[i].type=="KeycardScanner"){
                console.log(Entities[i].name+" is a scanner")
                ScannerList[ScannerList.length]=i;
            }
            else{
                console.log(Entities[i].name+" is not a scanner")
            }
        }
    }

    GetAllScanners();
    GetAssoc();

    //alert(ScannerList.length)
    setInterval(Gametick, 10)
}

Initialise()

