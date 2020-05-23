// let shape_svg = d3.select("shape").append("svg");
// // data
// const nodes = [{
//         dynasty: "西汉"
//     },
//     {
//         dynasty: "唐"
//     },
//     {
//         dynasty: "宋"
//     },
//     {
//         dynasty: "明"
//     },
//     {
//         dynasty: "清"
//     }
// ];

// const links = [{
//     source: "西汉",
//     target: "唐"
// }];

// // Initialize sankey generator
// // let sankey = d3.sankey().nodeWidth(10).nodePadding(15).size([300, 120]);

// // console.log(sankey);

const shape_map = {
  pili: "Thunderbolt style is also known as Phoenix style,Pili means a loud thunder.",
  jiaoye: " The head of Guqin has a petiole, and the bottom resembles the stem of a banana leaf. This kind of Guqin has exquisite and beautiful shape.Its sound is round and elegant.",
  lianzhu:
    'Bead style, connected in a string of beads. According to legend, the "Bead style" Guqin was made by a literati named Li Yi in the Sui Dynasty. This style of guqin has three consecutive half-moon curves on the neck and waist.',
  lingji: "Clever style is a new Guqin shape created by the sudden aura of ancient literati.",
  luoxia:
    "Sunset type, the ancient literati made the shape of the guqin with reference to the change of the sunset, and its prominent modeling feature is symmetrical wave curves on both sides of it.",
  shikuang:
    'Shi Kuang style is also called "moon form ".According to legend, it was made by the ancient musician Shi Kuang. The body is shaped like a full moon in the waist of the neck, with special shape and beautiful sound.',
  shennong: "It is said that the Shennong style was created by the Emperor Shennong.",
  xuanhe: 'The ruler Emperor Huizong of Song loved playing Guqin, and he once established the "Wanqin Hall". "Xuanhe style" is a new type of Guqin officially created at this stage.',
  zhongni: '"Zhongni style" is also known as "Master style". Confucius once learned Guqin from Shi Xiang, and later developed the new style and planning system by himself.',
};

$(".shape-img")
  .mouseleave(function (e) {
    $("#shape-intro").fadeOut(0);
  })
  .mousemove(function (e) {
    let bounding_client_rect = e.currentTarget.getBoundingClientRect();
    console.log(bounding_client_rect);
    $("#shape-intro")
      .fadeIn(0)
      .css({
        left: bounding_client_rect.left + bounding_client_rect.width * 1.1,
        top: bounding_client_rect.top + "px",
      });
    $("#shape-intro p").text(shape_map[e.currentTarget.getAttribute("name")]);
  });

window.onscroll = function () {
  $("#shape-intro").fadeOut(0);
};
