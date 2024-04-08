const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


function CheckForPlayerContact(Arg_Object_1, Arg_Object_2, Precision) {
    
    //Check if 4 corners of object 1 are within bounds of the object 2
    Object_1 = Entities[Arg_Object_1];
    Object_2 = Entities[Arg_Object_2];

    function IsBoundBy(point_X, point_Y, Object){

        
         //Check if point X matches the Object X
        if(point_X >= Object.pos_x && point_X <= (Object.pos_x + Object.size_x)){
            
            //Check if point Y matches the Object Y   
            if(point_Y >= Object.pos_y && point_Y <= (Object.pos_y + Object.size_y)){                 
                return true; //if both X and Y are within the Object
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    }


    //Check if any corners are touching

    if(IsBoundBy(Object_1.pos_x,Object_1.pos_y, Object_2)){
        return true;
    }
    if(IsBoundBy(Object_1.pos_x,Object_1.pos_y+Object_1.size_y, Object_2)){
        return true;
    }
    if(IsBoundBy(Object_1.pos_x+Object_1.size_x,Object_1.pos_y, Object_2)){
        return true;
    }
    if(IsBoundBy(Object_1.pos_x+Object_1.size_x,Object_1.pos_y+Object_1.size_y, Object_2)){
        return true;
    }

    //Check if halfway points are touching (that's enough precision for me :'-) )

    half_x = Object_1.size_x/2

    if(IsBoundBy(Object_1.pos_x+half_x ,Object_1.pos_y+Object_1.size_y, Object_2)){
        return true;
    }
    if(IsBoundBy(Object_1.pos_x+half_x ,Object_1.pos_y, Object_2)){
        return true;
    }


    return false;

}



function SpawnEntities() {
    for (i = 0; i != Entities.length; i++) {
        switch (Entities[i].type) {

            case ("Object"):
                ctx.fillStyle = "rgb(0,0,0)";
                ctx.fillRect(Entities[i].pos_x, Entities[i].pos_y, Entities[i].size_x, Entities[i].size_y);
                break;

            case ("Scanner"):
                if(Gate.alarm){ //if alarm is ON

                    if (Entities[i].special == false) {
                        ctx.fillStyle = "rgba(252, 3, 94,0.2)";
                        ctx.fillRect(Entities[i].pos_x, Entities[i].pos_y, Entities[i].size_x, Entities[i].size_y);
                    } else {
                        ctx.fillStyle = "rgba(255, 176, 205,0.2)";
                        ctx.fillRect(Entities[i].pos_x, Entities[i].pos_y, Entities[i].size_x, Entities[i].size_y);
                    }

                }else{ //if alarm is OFF
                    
                    if (Entities[i].special == false) {
                        ctx.fillStyle = "rgba(0,255,0,0.2)";
                        ctx.fillRect(Entities[i].pos_x, Entities[i].pos_y, Entities[i].size_x, Entities[i].size_y);
                    } else {
                        ctx.fillStyle = "rgba(200,255,200,0.2)";
                        ctx.fillRect(Entities[i].pos_x, Entities[i].pos_y, Entities[i].size_x, Entities[i].size_y);
                    }

                }
                break;

            case ("KeycardScanner"):
                if (Entities[i].special == false) {
                    ctx.fillStyle = "rgba(0,170,170,0.2)";
                    ctx.fillRect(Entities[i].pos_x, Entities[i].pos_y, Entities[i].size_x, Entities[i].size_y);
                } else {
                    ctx.fillStyle = "rgba(0,255,255,0.2)";
                    ctx.fillRect(Entities[i].pos_x, Entities[i].pos_y, Entities[i].size_x, Entities[i].size_y);
                }
                break;

            case ("Gate"):
                if(Gate.state){
                    ctx.fillStyle = "rgba(0,0,0, 0.20)"
                }
                else{
                    ctx.fillStyle = "rgb(255, 239, 194)";
                }
                ctx.fillRect(Entities[i].pos_x, Entities[i].pos_y, Entities[i].size_x, Entities[i].size_y);
                break;
        }
    }
}

function LiterallyJustAlertOk() {
    alert('OK!')
}

function Gameclock() {

    timer++
    //console.log(timer)
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    ctx.fillStyle = "rgb(0, 0, 0)";
    a = ctx.fillRect(Entities[0].pos_x, Entities[0].pos_y, 50, 50);

    ctx.fillStyle = "rgb(255, 255, 255)";
    c = ctx.fillRect(Entities[0].pos_x + (20 - (Speedlimit / 2)), Entities[0].pos_y + (20 - (Speedlimit / 2)), 10 + Speedlimit, 10 + Speedlimit);

    ctx.fillStyle = "rgb(255, 0, 0)";
    b = ctx.fillRect((DirVector[2]) + 20, (DirVector[3]) + 20, 10, 10);

    SpawnEntities();

    CheckScanners();
}

function CheckScanners(){
    for(i=0;i!=ScannerList.length; i++){
        //alert(ScannerList.length)

        //console.log(i)

        if(CheckForPlayerContact(0,ScannerList[i],5)){
            Entities[ScannerList[i]].special=true;
        }
        else{
            Entities[ScannerList[i]].special=false
        }
    }
}

setInterval(Gameclock, 10)

/*
    for(i=1;i<=Precision-1;i++){ //Check if any cuts are touching
        Cut = Object_1.size_x/Precision

        //console.log("Checking "+Object_1.pos_x+(Cut*i))
        //alert((Object_1.pos_x+(Cut*i)))

        if((Object_1.pos_x+(Cut*i))>Object_1.pos_x+Object_1.size_x){
            alert((Object_1.pos_x+(Cut*i)))

        }

        if(IsBoundBy(Object_1.pos_x+(Cut*i),Object_1.pos_y, Object_2)){
            return true;
        }
        if(IsBoundBy(Object_1.pos_x+(Cut*i),Object_1.pos_y+Object_1.size_y, Object_2)){
            return true;
        }
        

    }*/