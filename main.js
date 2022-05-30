import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";

const k = kaboom({
  global: true,
  fullscreen: true,
  debug: true,
  
});

// load resources
// loadSprite()
loadBean();

loadSprite("mario", "./assets/bird.png");
loadSprite("bg", "./assets/bg.webp");
loadSprite("pipe", "./assets/pipe2.png");



scene("game", () => {
  let score = 0;
  const bg = add([sprite("bg", { height: height(), width: width() })]);
  
  const scoreLabel= add([
     text(score) 
   ])
  const player = add([
    sprite("mario"),
    pos(500, 100),  
    scale(0.2),       
    area(),  
    body(),   
  ]);

  function producePipes() {
    const offset =rand(-200, 200);

    const pipe1 = add([
      sprite("pipe"),
      scale(0.4, 1),
      origin("topleft"),
      pos(width(), height() / 2 + 150+ offset),
      move(LEFT, 350),
      area(),
      "pipe",
      {
        yetToMeet: true
      }
      
    ]);
  
    const pipe2 = add([
      sprite("pipe", { flipY: true }),
      scale(0.4, 1),
      origin("botleft"),
      pos(width(), height() / 2 -100+ offset),
      move(LEFT, 350),
      area(),
      "pipe",
    ]);
  }

    loop(2,  producePipes)
   


  player.collides("pipe", (pipe) => {
    destroy(player);
    go("gameover",score)
  });
   
    player.action( ()=> {
      if(player.pos.y <0 || player.pos.y > height())
      {
        go("gameover",score)
      }
    })


   action("pipe", (pipe)=> {
     if(pipe.yetToMeet == true &&  pipe.pos.x < player.pos.x) {
       score++;
       pipe.yetToMeet = false;
     } 
     if(pipe.yetToMeet == false &&  pipe.pos.x > player.pos.x) {
      score--;
      pipe.yetToMeet = true;
    }
     scoreLabel.text = score;
   })
 
  //onKeyPress()
  onKeyPress("space", ()=> {
    // debug.log('space is trigered')
  player.jump(480);

   })

  // onKeyDown("down", () => {
  //   player.pos.y += 10;
  // });
  // onKeyDown("up", () => {
  //   player.pos.y -= 10;
  // });
  // onKeyDown("left", () => {
  //   player.pos.x -= 10;
  // });
  // onKeyDown("right", () => {
  //   player.pos.x += 10;
  // });

});

    scene("gameover", (score)=> {
      const bg = add([sprite("bg", { height: height(), width: width() })]);   
      add([
        text("Game Over\n Your Score:" + score),
        pos(width()/2-200, height()/2)
      ])
         onKeyPress("space", ()=> {
            go("game");
         })
    })  
      
  
        
  go("game") 
