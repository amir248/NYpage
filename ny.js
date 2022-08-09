window.addEventListener('load',init);
function init(){
  let cont=$('.wrapper');
  let moon=$('<div>').appendTo(cont);
  moon.addClass("moon");
  moon.addClass("clock");
  // strelki and delenie
  for(let i=0;i<3;i++){
    $('<span>').appendTo(moon);
  }
  let style=$("<style>").appendTo($(document.head));
  for(let i=0;i<12;i++){
    $("<li>").text("|").appendTo(moon);
    style.append(".clock li:nth-of-type("+i+"){transform:rotate("+(30*i)+"deg)}");
  }//for
  // run clock
  setInterval(moveArrow,500);
  moveArrow();
  function moveArrow(){
    // second
    let date = new Date();
    let arrow=$(".clock span").last();
    let angle=date.getSeconds()*6;

    arrow.css({
      transform:"rotate("+angle+"deg)"
    });
    // minute
    arrow=$(".clock span").eq(1);
    angle=date.getMinutes()*6;
    arrow.css({
      transform:"rotate("+angle+"deg)"
    });
    //hourse
    arrow=$(".clock span").first();
    angle=date.getHours()*30+date.getMinutes()/2;
    arrow.css({
      transform:"rotate("+angle+"deg)"
    });

  }//moveArrow

  //snowfall
  let snowCount=100;
  for(let i=0;i<snowCount;i++){
    let snow=$('<span>').appendTo(cont);
    snow.addClass('snow');
    snow.x=Math.random()*cont.width();
    snow.y=Math.random()*cont.height();
    snow.vx=Math.random()*0.8-0.4;
    snow.vy=Math.random()*1.5+0.5;
    snow.css({
      left:snow.x,
      top:snow.y,
      opacity:Math.random()*0.8+0.2,
      transform:"scale("+(Math.random()*1.8+0.2)+")"
    });
    // setTimeout(fallSnow,50,snow);
  }//for
  function fallSnow(sn){
    console.log("SnoW");
    sn.x+=sn.vx;
    sn.y+=sn.vy;
    sn.css({
      left:sn.x,
      top:sn.y
    });
    if(sn.y>cont.height()+10){
      sn.y=-20;
      sn.x=Math.random()*cont.width();

    }//if
    setTimeout(fallSnow,50,sn);
  }

  // dragging the moon
  moon.draggable({
    containment:cont,
    scroll:false,
    stop:moonDragStop
  });
  // block priem

  let box=$("<div>").appendTo(cont);
  box.addClass("box");

  box.droppable({
    accept:".clock",
    classes:{
      "ui-droppable-active" : "box-active",
      "ui-droppable-hover" : "box-hover"
    },
    over:moonOverBox,
    out:moonOutBox
  });

function moonOverBox(e,u){
  u.draggable.data("inBox","yes");
  console.log(e,u);
}

function moonOutBox(e,u){
  u.draggable.data("inBox","no");
  console.log(e,u);
}

// function moonDragStop(){
//   if(moon.data("inBox")=="no"){
//     console.log("yes");
//   }
// }

  //drop time in lantern "throw the clock at the lantern"
function moonDragStop(){
  if(moon.data("inBox")=="yes"){
    $("span,li",moon).appendTo(box);
    box.addClass("clock");
    moon.removeClass('.clock');
    moon.animate({
      top:20,
      left:cont.width() - 150 - 20
    },1000);
    box.addClass("box-ok");
    moon.draggble("disable");
  }
}

}//init
