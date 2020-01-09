let shape_svg = d3.select("shape").append("svg");
// data
const nodes = [{
        dynasty: "西汉"
    },
    {
        dynasty: "唐"
    },
    {
        dynasty: "宋"
    },
    {
        dynasty: "明"
    },
    {
        dynasty: "清"
    }
];

const links = [{
    source: "西汉",
    target: "唐"
}];

// Initialize sankey generator
// let sankey = d3.sankey().nodeWidth(10).nodePadding(15).size([300, 120]);

// console.log(sankey);