const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const text = "I love you";

const fontSize = 24;

const columnGap = 160;
const rowGap = 55;


let columns = [];
let columnCount;



class Column {


    constructor(x){

        this.x = x;

        this.offset = Math.random() * rowGap;

        // hız farkı belirgin
        this.speed = 3 + Math.random() * 6;

    }


    update(){

        this.offset += this.speed;


        if(this.offset >= rowGap){

            this.offset = 0;

        }

    }


    draw(){


        ctx.font = `bold ${fontSize}px Arial`;

        ctx.fillStyle = "#ff69b4";


        for(let row = -1; row < Math.ceil(canvas.height / rowGap)+2; row++){


            let y = row * rowGap + this.offset;


            ctx.fillText(
                text,
                this.x,
                y
            );


        }


    }

}





function createColumns(){


    columns = [];

    columnCount = Math.ceil(canvas.width / columnGap);


    for(let i=0;i<columnCount;i++){

        columns.push(
            new Column(i * columnGap)
        );

    }


}



createColumns();




function animate(){


    ctx.fillStyle = "black";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    columns.forEach(column=>{

        column.update();

        column.draw();

    });


    requestAnimationFrame(animate);

}


animate();




window.addEventListener("resize",()=>{

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    createColumns();

});
