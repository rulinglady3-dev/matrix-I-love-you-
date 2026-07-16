const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");



canvas.width = window.innerWidth;

canvas.height = window.innerHeight;



const text = "I love you";



const fontSize = 22;


// sütun aralığı

const columnSpace = 140;


// satır aralığı

const rowSpace = 45;



let streams = [];

let columns;



class LoveStream{


    constructor(x){


        this.x = x;


        // başlangıç konumu

        this.offset = Math.random() * -800;



        // hepsi hızlı ama farklı

        this.speed = 15 + Math.random()*15;



    }



    update(){


        this.offset += this.speed;



        if(this.offset > rowSpace){


            this.offset = 0;


        }


    }




    draw(){



        ctx.font = 
        `bold ${fontSize}px Arial`;



        ctx.fillStyle =
        "rgba(255,105,180,0.9)";



        // ekran boyunca satırlar

        for(let i=0;i<40;i++){


            let y = 
            this.offset + i * rowSpace;



            ctx.fillText(

                text,

                this.x,

                y

            );


        }


    }


}





function createRain(){


    streams = [];


    columns = Math.ceil(
        canvas.width / columnSpace
    );



    for(let i=0;i<columns;i++){


        streams.push(

            new LoveStream(
                i * columnSpace
            )

        );


    }


}



createRain();





function animate(){



    // iz bırakma

    ctx.fillStyle =
    "rgba(0,0,0,0.12)";


    ctx.fillRect(

        0,

        0,

        canvas.width,

        canvas.height

    );




    streams.forEach(stream=>{


        stream.update();

        stream.draw();


    });




    requestAnimationFrame(animate);



}





animate();






window.addEventListener("resize",()=>{


    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;


    createRain();


});
