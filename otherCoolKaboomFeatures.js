import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";

const k = kaboom({
  global: true,
  fullscreen: true,
  debug: true,
});


loadSprite("bg", "../assets/bg.webp");
loadSprite("block","../assets/brick.png");
loadSprite("mario","../assets/mario.png");
loadSprite("pipe", "../assets/pipe2.png");

  scene("intro",()=> {
    const bg = add([
        sprite("bg", { height: height(), width: width() })
    ])
  
    const levelMap = [
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                P      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "======================================",
    ]
     const levelMapMapping = {
         width:20,
         height:32,
         "=" : ()=> [sprite("block"), area(), solid()],
         "P" : () =>[sprite("pipe"), area(), solid()]
   }

     const player = add([
         sprite("mario"),
         pos(20,40),
         area(),
         body()
     ])

     onKeyDown("up", ()=> {
        //  player.pos.y -= 10;
        player.jump()
     })
      
     onKeyDown("right", ()=> {
        player.pos.x += 10;
    })
     
    onKeyDown("left", ()=> {
        player.pos.x -= 10;
    })
      
    onKeyDown("down", ()=> {
        player.pos.y += 10;
    })


     addLevel(levelMap, levelMapMapping)


  })


  go("intro")

