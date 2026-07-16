const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const text = "I love you";

const fontSize = 22;

let mode = "rain";

let showYu = false;

let words = [];

let heartPoints = [];

let flow = 0;


let centerX;
let centerY;



function createHeart(){

    heartPoints=[];

    centerX = canvas.width/2;
    centerY = canvas.height/2;


    for(let t=0;t<Math.PI*2;t+=0.10){

        let x = 16*Math.pow(Math.sin(t),3);

        let y =
        -(13*Math.cos(t)
        -5*Math.cos(2*t)
        -2*Math.cos(3*t)
        -Math.cos(4*t));


        heartPoints.push({

            x:centerX+x*15,

            y:centerY+y*15

        });

    }

}



class Word{


    constructor(x,y){

        this.x=x;

        this.y=y;

        this.speed=3+Math.random()*4;


        this.target=null;

        this.index=0;

    }




    update(){


        if(mode==="rain"){


            this.y+=this.speed;


            if(this.y>canvas.height+40){

                this.y=-40;

            }


        }



        else if(mode==="forming"){


            if(this.target){


                this.x += 
                (this.target.x-this.x)*0.04;


                this.y +=
                (this.target.y-this.y)*0.04;


            }


        }



        else if(mode==="flow"){


            let point =
            heartPoints[
                (this.index + Math.floor(flow))
                %
                heartPoints.length
            ];



            this.x +=
            (point.x-this.x)*0.08;


            this.y +=
            (point.y-this.y)*0.08;



        }


    }




    draw(){

        ctx.font =
        `bold ${fontSize}px Arial`;

        ctx.fillStyle="#ff69b4";


        ctx.fillText(
            text,
            this.x,
            this.y
        );

    }


}





function createRain(){

    words=[];


    for(let x=0;x<canvas.width;x+=140){


        for(let y=-300;y<canvas.height;y+=55){


            let word =
            new Word(x,y);


            words.push(word);


        }


    }


}





createHeart();

createRain();





function animate(){


    ctx.fillStyle="black";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );



    words.forEach((word,index)=>{


        word.index=index;


        if(mode==="forming"){


            word.target =
            heartPoints[
                index % heartPoints.length
            ];


        }



        word.update();

        word.draw();


    });



    if(mode==="flow"){


        flow+=0.4;


    }




    if(showYu){


        ctx.fillStyle="white";

        ctx.font="bold 70px Arial";

        ctx.textAlign="center";


        ctx.fillText(
            "Yu",
            centerX,
            centerY+25
        );


        ctx.textAlign="left";

    }



    requestAnimationFrame(animate);


}



animate();




// 7 saniye yağmur

setTimeout(()=>{

    mode="forming";

},7000);



// kalp oluşumu sonrası akış

setTimeout(()=>{

    mode="flow";

},13000);



// Yu

setTimeout(()=>{

    showYu=true;

},16000);





window.addEventListener("resize",()=>{

    canvas.width=window.innerWidth;

    canvas.height=window.innerHeight;

    createHeart();

});
