

function initializateSnakeAndFood(){
    comida_position = [];
    direcao = 39;//direita

    food = document.createElement("food");
    food.className = "food";
    document.body.appendChild(food);

    cobrinha       = document.createElement('cobra');
    cobrinha.className = "cobrinha";
    cobrinha.corpo     = [[6, 1], [5, 1], [4, 1], [3, 1], [2, 1], [1, 1]];

    drawSnake(cobrinha.corpo);  
    drawFood();

}


  

  initializateSnakeAndFood();
  


  addEventListener("keydown",  
    function (event){
      event.preventDefault;
      moveSnake(event.keyCode);
    });


  setInterval(function(){
    moveSnake(direcao);
    },90);
    



  function moveSnake(tecla){

      switch(tecla) {

          case (39)://left
            if (direcao != 37){
              direcao = 39;
              deslocaUltimoMembroAFrente(1, 0);

            }              
              break;

          case (37)://rigth
            if (direcao != 39){
              direcao = 37;
              deslocaUltimoMembroAFrente(-1, 0);
            } 
              break;

            case (38)://up
              if (direcao != 40){
                direcao = 38;
                deslocaUltimoMembroAFrente(0, -1);
            }     
              break;

          case (40)://down
            if (direcao != 38){
                direcao = 40;
                deslocaUltimoMembroAFrente(0, 1);
            }
              break;                   
      }

            checkSnakeWallCollide();
            checkSnakeSelfCollide();
            checkSnakeComeuECresce();
            drawSnake();
  }




  function deslocaUltimoMembroAFrente(desX, desY){
    var size = cobrinha.corpo.length; 
    
    cobrinha.corpo[size - 1][0]  = cobrinha.corpo[0][0] + desX;
    cobrinha.corpo[size - 1][1]  = cobrinha.corpo[0][1] + desY; 
        cobrinha.corpo.unshift(cobrinha.corpo.pop());
  }


    function checkSnakeWallCollide(){
        var left = cobrinha.corpo[0][0];
        var top  = cobrinha.corpo[0][1];

        if (left < 0 || top < 0 || left > 49 || top > 49){
            deathMessageAndRestart(); 
        }     
    }


    function checkSnakeSelfCollide(){
       var i, j,
       count = 0;

        for (i = 0, j = cobrinha.corpo.length; i < j; i++) {
            (cobrinha.corpo[i][0] == cobrinha.corpo[0][0] && cobrinha.corpo[i][1] == cobrinha.corpo[0][1]) && count++;                    
        }

        if (count == 2){
            deathMessageAndRestart();                
        }
    }
    


    function deathMessageAndRestart(){
        alert("You died. Press OK to restart");
        window.location.reload();

    }



  function checkSnakeComeuECresce(){

    var size = cobrinha.corpo.length; 
    var lastMembro = cobrinha.corpo[size - 1].slice();
      
    if (cobrinha.corpo[0][0]  == comida_position[0] && cobrinha.corpo[0][1] == comida_position[1]){
      cobrinha.corpo.push(lastMembro);
      drawFood();
    }
  }

  

    function drawSnake(){
        var elements = document.getElementsByTagName('membro')
       
        while (elements[0]) elements[0].parentNode.removeChild(elements[0]) 

        for (var i = 0; i < cobrinha.corpo.length; i ++){
            var membro = document.createElement("membro");
            membro.className = "membro";
            membro.style.left = (cobrinha.corpo[i][0]*10 ) + "px";  
            membro.style.top  = (cobrinha.corpo[i][1]*10 ) + "px";
            document.body.appendChild(membro);
        }
    }


  function drawFood(){
    
    do{
      comida_position[0] = Math.floor((Math.random()*50));
      comida_position[1] = Math.floor((Math.random()*50));
      food.style.left = (comida_position[0]*10 ) + "px";  
      food.style.top  = (comida_position[1]*10 ) + "px";
    }
    while(isPosicaoOcupadaPorSnake());
  }

    function isPosicaoOcupadaPorSnake(){
      var i, j, current;

      for(i = 0; i < cobrinha.corpo.length; ++i){
        if(comida_position.length === cobrinha.corpo[i].length){
          current = cobrinha.corpo[i];
          for(j = 0; j < comida_position.length && comida_position[j] === current[j]; ++j);
          if(j === comida_position.length)
            return true;
        }
      }
      return false;
    }