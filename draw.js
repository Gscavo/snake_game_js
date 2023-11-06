//Declarando Canvas:
var can = window.document.getElementById("canvas1");
var ctx = can.getContext("2d");


//Escala:
var grid = 20;

//Contador:
var count = 0;

/*Funções importantes*/
function randint(max, min) {
    return Math.floor(Math.random()* (max - min)) + min;
}


//Cobra:
var snake = {
    //Pos. da Cobra:
    x: 20,
    y: 20,
    //Velocidade:
    sx:grid,
    sy:0,
    //Corpo da bicha:
    cells: [],
    //Nº da cobra em si, "Cabeça":
    maxCells: 3
};

//Maçã:
var apple = {
    x: 100,
    y: 100
};
//Pontuação
var pont;
var rec = 0;
var tent = 0;
/*~~~~~~~ ! Game ! ~~~~~~~*/ 
function loop() {
    requestAnimationFrame(loop);
    /*Diminuir a velocidade do Jogo*/
    if (++count < 4) {
        return;
    };
    count = 0;
    ctx.clearRect(0, 0, can.width, can.height);
    //Fundo
    ctx.fillStyle = '#363636'
    ctx.fillRect(0, 0, can.width, can.height)
    //Movendo a Cobra:
    snake.x += snake.sx;
    snake.y += snake.sy;
    //Bordas Reset
    if (snake.x < 0) {
        snake.x = can.width - grid;
    }else if (snake.x >= can.width) {
        snake.x = 0;
    };
    if (snake.y < 0) {
        snake.y = can.height;
    }else if (snake.y >= can.height) {
        snake.y = 0;
    };
    //Manter o Rastro da Cobra, Onde vai ficar a cabeça:
    snake.cells.unshift({x: snake.x, y: snake.y});
    //Apagando rastro:
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }
    //Desenhando a maçã:
    ctx.fillStyle ="red"
    ctx.fillRect(apple.x, apple.y, grid-1, grid-1)
    //Desenhando a bendita:
    ctx.fillStyle = "green"
    snake.cells.forEach(function(cell, index){
        ctx.fillRect(cell.x, cell.y, grid-1, grid-1)
        //Comeu a maçã:
        if (cell.x === apple.x && cell.y === apple.y ){
            snake.maxCells++;
            //Nova coord. Maçã:
            apple.x = randint(30, 0)*grid;
            apple.y = randint(30, 0)*grid;
        }
        //Checagem de colisão:
        for (var i = index + 1; i < snake.cells.length; i++){
            if (cell.x == snake.cells[i].x && cell.y == snake.cells[i].y){
                snake.x = 20;
                snake.y = 20;
                snake.cells = [];
                snake.maxCells = 3;
                snake.sx = grid;
                snake.sy = 0;

                apple.x = randint(30, 0)*grid;
                apple.y = randint(30, 0)*grid;
                //Tentativa atual
                tent ++
                //Checagem Recorde
                if (tent >= 1){
                    if (rec < pont){
                        rec = pont
                    }   
                }
                
            }
        }
        //console.log(tent)
    });
    //SCOREBOARD:
    pont = (snake.maxCells-3)
    escrever(450, 580, "20px", "arial", "#008080", `Pontuação: ${pont}`)
    //Recorde
    if (tent > 0) {
        escrever(450, 540, "20px", "arial", "#F0E68C", `Recorde: ${rec}`);
    }
}
//funções:
function escrever(x, y, fontsize, font, cor, texto){
    ctx.fillStyle = cor;
    ctx.font = fontsize + ' ' + font;
    ctx.fillText(texto, x, y);
}
//Controle da python:
addEventListener("keydown", function(e) {
    if (e.which === 37 && snake.sx === 0){
        snake.sx = -grid;
        snake.sy = 0;
    }
    if (e.which === 38 && snake.sy === 0){
        snake.sx = 0;
        snake.sy = -grid;
    }
    if (e.which === 39 && snake.sx === 0){
        snake.sx = grid;
        snake.sy = 0;
    }
    if (e.which === 40 && snake.sy === 0){
        snake.sx = 0;
        snake.sy = grid;
    }
});
requestAnimationFrame(loop);