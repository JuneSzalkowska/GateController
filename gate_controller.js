class GateController {

    constructor(){
        this.state = false; // open/close
        this.alarm = false;
        this.data;
    }

    open() {
        this.state = true;
    }

    close() {
        this.state = false;
    }

    alert() {
        this.alarm = true;
        Progress = 6;
    }

    alarm_off() {
        this.alarm = false;
    }

}

var Progress=0;

function GateLogic(){ //funkcja wykonująca się cyklicznie



    function logStates(){
        function simpleConversion(bool){
            if(bool){
                return "1";
            }
            else{return "0";}
        }

        final = Progress.toString()+"#";
        
        final = final+ simpleConversion(getSensor("Czujnik_1"));
        final = final+ ScannerArray["Czujnik_1"];

        final = final+ simpleConversion(getSensor("Czujnik_2"));
        final = final+ScannerArray["Czujnik_2"];
        
        final = final+ simpleConversion(getSensor("Czujnik_3"));
        final = final+ ScannerArray["Czujnik_3"];

        console.log(final)
    }

    
    function getSensor(name){ //support function for readability sake
        id = ScannerArray[name]
        return Entities[id].special;
    }

    //PONIŻEJ JEST WYTŁUMACZENIE ALGORYTMU




    //Początek algorytmu - Karta włożona

    if(getSensor("Karta_1")&&Progress==0){
        Progress=1;
        timer=0;
    }

    /*Ze względu na problemy z programem do testowania użyłem statementów if(),
    jest możliwe użycie pętli while*/

    if(Progress==1){ 
        if(timer=100){ //Karta była przyłożona a uczeń nie przekroczył sensora 1 przez 10s
            Gate.close()
            Progress=0;
        }

        if(getSensor("Czujnik_1")){ //Uczeń przeszedł przez sensor 1
            Gate.open()
            timer=0;
            Progress=2;
        }

        if(getSensor("Czujnik_3")){ //ktoś próbuje wejść z drugiej strony
            Gate.alert();
        }
    }

    if(Progress==2){
        //uczeń przechodzi przez bramke i nie jest łapany przez czujnik 1
        if(getSensor("Czujnik_2")&&(!getSensor("Czujnik_1"))){  
            Progress=3;
        }

        if(getSensor("Czujnik_3")){ //ktoś próbuje wejść z drugiej strony
            Progress=0;
            Gate.alert();
        }
    }

    if(Progress==3){

        if(getSensor("Czujnik_3")){ //uczeń jest łapany przez czujnik 3 
            Progress=4;
        }
        if(getSensor("Czujnik_1")){ //uczeń próbuje wejść zaraz po tym uczniu
            Gate.alert();        
        }

    }

    if(Progress==4){
        
        //uczeń nie jest łapany przez czujnik 2 / przybramkowy
        if((getSensor("Czujnik_3"))&&(!getSensor("Czujnik_2"))){
            Progress=5;
            Gate.close()
        }
        if(getSensor("Czujnik_1")){ //inny uczeń próbuje wejść zaraz po tym uczniu
            Gate.alert();        
        }
    }   

    if(Progress==5){
        if(!getSensor("Czujnik_3")){ //uczeń przeszedł / nie jest wykrywany przez wskaźnik 3
            Progress=0;
        }

        if(getSensor("Czujnik_1")){ //uczeń próbuje wejść zaraz po tym uczniu
            Gate.alert();        
        }
    }

    //Zmienna Progress przyjmuje wartość -6 tylko gdy był uruchomiony alarm
    if(Progress==6){ //Wyłączenie alarmu w przypadku gdy żaden czujnik niczego nie wykrywa
        if(!getSensor("Czujnik_1")&&!getSensor("Czujnik_2")&&!getSensor("Czujnik_3")){
            Gate.close()
            Gate.alarm_off()
            Progress=0;
        }
    }
    
    //logStates()

    //GateLogic();
}


var Gate = new GateController;

setInterval(GateLogic);