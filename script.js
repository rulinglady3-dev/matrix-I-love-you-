const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const text = "I love you";

const fontSize = 22;

let mode = "rain";


let words = [];

let heartPoints = [];



// kalp noktalarını oluştur
function createHeart(){

    heartPoints = [];

    for(let t = 0; t < Math.PI * 2; t += 0.15){

        let x = 16 * Math.sin(t)**3;

        let y = -(13 * Math.cos(t)
        -5 * Math.cos(2*t)
        -2 * Math.cos(3*t)
        -Math.cos(4*t));


        heartPoints.push({

            x: canvas.width/2 + x*20,

            y: canvas.height/2 + y*20

        });

    }

}




class Word{


    constructor(x,y){

        this.x=x;

        this.y=y;

        this.speed=5+Math.random()*5;


        this.target=null;

    }



    update(){


        if(mode==="rain"){


            this.y+=this.speed;


            if(this.y>canvas.height+30){

                this.y=-30;

            }


        }



        else{


            if(this.target){


                this.x += (this.target.x-this.x)*0.05;

                this.y += (this.target.y-this.y)*0.05;


            }

        }


    }




    draw(){


        ctx.font=`bold ${fontSize}px Arial`;

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


        for(let y=0;y<canvas.height;y+=60){


            words.push(
                new Word(x,y)
            );


        }


    }


}





createRain();

createHeart();





function animate(){


    ctx.fillStyle="black";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    words.forEach((word,index)=>{


        if(mode==="heart"){

            word.target =
            heartPoints[index % heartPoints.length];

        }


        word.update();

        word.draw();


    });



    requestAnimationFrame(animate);

}




animate();




// 5 saniye sonra kalbe dönüş

setTimeout(()=>{

    mode="heart";

},7000);




window.addEventListener("resize",()=>{

    canvas.width=window.innerWidth;

    canvas.height=window.innerHeight;

    createHeart();

});
