const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



const text = "I love you";

const fontSize = 22;

const columnSpace = 140;

const rowSpace = 55;



let mode = "rain";

let showYu = false;

let words = [];

let heartPoints = [];

let angle = 0;



let centerX;
let centerY;



// Kalp noktaları

function createHeart(){

    heartPoints = [];

    centerX = canvas.width / 2;
    centerY = canvas.height / 2;


    for(let t=0; t<Math.PI*2; t+=0.12){


        let x =
        16 * Math.pow(Math.sin(t),3);


        let y =
        -(13*Math.cos(t)
        -5*Math.cos(2*t)
        -2*Math.cos(3*t)
        -Math.cos(4*t));



        heartPoints.push({

            x:centerX + x*15,

            y:centerY + y*15

        });


    }

}



// Yazı nesnesi

class Word{


    constructor(x,y){


        this.x=x;

        this.y=y;


        this.startX=x;

        this.startY=y;


        this.target=null;


        this.speed =
        3 + Math.random()*5;


    }




    update(){


        if(mode==="rain"){


            this.y += this.speed;


            if(this.y > canvas.height+40){

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




        else if(mode==="rotate"){


            let dx =
            this.target.x-centerX;


            let dy =
            this.target.y-centerY;



            let rx =
            dx*Math.cos(angle)
            -dy*Math.sin(angle);


            let ry =
            dx*Math.sin(angle)
            +dy*Math.cos(angle);



            this.x=centerX+rx;

            this.y=centerY+ry;


        }



    }




    draw(){


        ctx.font =
        `bold ${fontSize}px Arial`;


        ctx.fillStyle =
        "#ff69b4";



        ctx.fillText(
            text,
            this.x,
            this.y
        );


    }


}



// İlk Matrix düzeni

function createRain(){


    words=[];


    for(let x=0;x<canvas.width;x+=columnSpace){


        for(let y=-300;y<canvas.height;y+=rowSpace){


            words.push(
                new Word(x,y)
            );


        }


    }


}





createHeart();

createRain();




// Animasyon

function animate(){



    ctx.fillStyle="black";


    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );




    words.forEach((word,index)=>{


        if(mode==="forming" || mode==="rotate"){


            word.target =
            heartPoints[index % heartPoints.length];


        }


        word.update();

        word.draw();



    });




    if(mode==="rotate"){


        angle +=0.005;


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




// 7 saniye sonra kalp

setTimeout(()=>{


    mode="forming";


},7000);




// kalp tamamlanınca dönme

setTimeout(()=>{


    mode="rotate";


},13000);




// Yu yazısı

setTimeout(()=>{


    showYu=true;


},16000);





window.addEventListener("resize",()=>{


    canvas.width=window.innerWidth;

    canvas.height=window.innerHeight;


    createHeart();


});
