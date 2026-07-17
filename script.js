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


        let scale = Math.min(
    canvas.width,
    canvas.height
) / 38;


heartPoints.push({

    x:centerX+x*scale,

    y:centerY+y*scale

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
                (this.target.x-this.x)*0.035;


                this.y +=
                (this.target.y-this.y)*0.035;


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


        flow+=0.15;


    }




    if(showYu){


       // Yu romantik yazı efekti

let gradient = ctx.createLinearGradient(
    centerX-80,
    centerY-50,
    centerX+80,
    centerY+50
);


gradient.addColorStop(0,"#ff69b4");
gradient.addColorStop(0.5,"#ff1493");
gradient.addColorStop(1,"#ffb6c1");


ctx.fillStyle = gradient;


ctx.shadowColor = "#ff69b4";
ctx.shadowBlur = 25;


ctx.font = "bold 90px Georgia";


ctx.textAlign="center";


ctx.fillText(
    "Yu",
    centerX,
    centerY+30
);


// gölgeyi sıfırla

ctx.shadowBlur = 0;

ctx.textAlign="left";

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

const questions=[


{
text:"Did I make you smile today? 😊",
gif:"images/smile.gif",
yesGif:"images/smile_yes.gif",
message:"I hope I made you smile 💗",
noType:"jump"

},


{
text:"Do you want to hug me? 🤍",
gif:"images/hug.gif",
yesGif:"images/hug_yes.gif",
message:"A warm hug would be nice ✨",
noType:"run"

},


{
text:"Will you kiss me? 💗",
gif:"images/kiss.gif",
yesGif:"images/kiss_yes.gif",
message:"That made me happy ❤️",
noType:"teleport"

},


{
text:"Do you want to spend more time with me? ✨",
gif:"images/time.gif",
yesGif:"images/time_yes.gif",
message:"Then click the next site I sent you 💌",
noType:"crazy"

}


];



let questionIndex=0;



const gameScreen=
document.getElementById("gameScreen");


const nextScreen=
document.getElementById("nextScreen");


const questionText=
document.getElementById("questionText");


const gameGif=
document.getElementById("gameGif");


const gifMessage=
document.getElementById("gifMessage");


const yesBtn=
document.getElementById("yesBtn");


const noBtn=
document.getElementById("noBtn");





function startGame(){


gameScreen.style.display="flex";


showQuestion();


}




function showQuestion(){


let q=questions[questionIndex];


questionText.textContent=q.text;


gameGif.src=q.gif;


gifMessage.textContent="";


noBtn.style.left="auto";

noBtn.style.top="auto";


}



yesBtn.onclick=function(){


let q=questions[questionIndex];


gameGif.src=q.yesGif;


gifMessage.textContent=q.message;



setTimeout(()=>{


questionIndex++;


if(questionIndex < questions.length){


showQuestion();


}

else{


gameScreen.style.display="none";


nextScreen.style.display="flex";


}



},2500);



};





noBtn.onmouseenter=function(){


let q=questions[questionIndex];


if(q.noType==="jump"){


noBtn.style.top=
Math.random()*200+"px";


}


if(q.noType==="run"){


noBtn.style.left=
Math.random()*80+"%";


noBtn.style.top=
Math.random()*80+"%";


}


if(q.noType==="teleport"){


noBtn.style.left=
Math.random()*window.innerWidth+"px";


noBtn.style.top=
Math.random()*window.innerHeight+"px";


}


if(q.noType==="crazy"){


noBtn.style.transform=
"rotate("+
Math.random()*360+
"deg)";


noBtn.style.left=
Math.random()*90+"%";


noBtn.style.top=
Math.random()*90+"%";


}


};
