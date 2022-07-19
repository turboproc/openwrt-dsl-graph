
// const usDbArray =   document.getElementById("usdB").innerText.substr(63).split(" ");
// const dsDbArray =   document.getElementById("dsdB").innerText.substr(63).split(" ");
// const usBitsArray = document.getElementById("usBits").innerText.substr(65).split(" ");
// const dsBitsArray = document.getElementById("dsBits").innerText.substr(65).split(" ");

// console.log("Start of dsl-graph.js")

 const usDbData = document.getElementById("usdB").innerText.substr(63).split(" ").map(myDbFunction);
 const dsDbData = document.getElementById("dsdB").innerText.substr(63).split(" ").map(myDbFunction);
 const usBitsData = document.getElementById("usBits").innerText.substr(65).split(" ").map(myBitsFunction);
 const dsBitsData = document.getElementById("dsBits").innerText.substr(65).split(" ").map(myBitsFunction);

 function myBitsFunction(value, index, array) {
    let v = parseInt(value,16);
    return({x: index, y: v});
 } 

 function myDbFunction(value, index, array) {
    let v =parseInt(value,16);
    if (v == 255) {
       v = 0
    } else {
       v = v / 2 - 32
    };
    return({x: index * 8, y: v});
 }

const marginX = 50;
const marginY = 80;

bitsChart = {
   "config": {
       "canvas": document.getElementById("bitsChart"),
       "ctx" : document.getElementById("bitsChart").getContext("2d"),
       "minX" : 0,
       "maxX" : 4096,
       "stepX": 256,
       "graphWidth" : document.getElementById("bitsChart").width - 2 * marginX,
       "lineWidth" : 1,
       "titleX" : "Bits/tone",
       "minY" : 0,
       "maxY" : 16,
       "stepY": 2,
       "graphHeight" : document.getElementById("bitsChart").height - 2 * marginY,
       "titleY" : "bits",
   },
   "dataSet" : [
      {
         "data" :usBitsData,
         "color":"lime",
         "title": "Upstream"
      },
      {
         "data" : dsBitsData,
         "color": "royalblue",
         "title": "Downstream"
      }
   ] 
};

dBChart = {
   "config": {
       "canvas": document.getElementById("dbChart"),
       "ctx" : document.getElementById("dbChart").getContext("2d"),
       "minX" : 0,
       "maxX" : 4096,
       "stepX": 256,
       "graphWidth" : document.getElementById("dbChart").width - 2 * marginX,
       "lineWidth": 4,
       "titleX" : "Signal to Noise ratio",
       "minY" : 0,
       "maxY" : 70,
       "stepY": 10,
       "graphHeight" : document.getElementById("bitsChart").height - 2 * marginY,
       "titleY" : "dB"
   },
   "dataSet" : [
      {
         "data" :usDbData,
         "color":"orchid",
         "title": "Upstream"
      },
      {
         "data" : dsDbData,
         "color": "yellow",
         "title" : "Downstream"
      }
   ]

};

drawChart(bitsChart);
drawChart(dBChart);


function drawChart (info) {
   drawAxisX(info.config, info.config.minX, info.config.maxX, info.config.stepX, info.config.titleX);
   drawAxisY(info.config, info.config.minY, info.config.maxY, info.config.stepY, info.config.titleY);

   drawLegend(info.config, info.dataSet);

   drawDataPoints(info.config, info.dataSet[0].data, info.dataSet[0].color);
   drawDataPoints(info.config, info.dataSet[1].data, info.dataSet[1].color);
}


function drawDataPoints(config, dataPoints, color) {
   dataPoints.forEach(drawLine, {config, color});
}

function drawLegend(config, dataSet){
   let ctx = config.ctx;

   let graphWidth = config.canvas.width - 2 * marginX;
   let graphHeight = config.canvas.height - 2 * marginY;

   ctx.font = "12px Arial";
   ctx.fillStyle = dataSet[0].color;
   ctx.fillRect(                  0.5 * graphWidth + marginX - ctx.measureText(dataSet[0].title).width - 50, config.canvas.height - marginY*1/4 - 8, 30, 10);
   ctx.strokeStyle = "#C0C0C0";
   ctx.strokeRect(                  0.5 * graphWidth + marginX - ctx.measureText(dataSet[0].title).width - 50, config.canvas.height - marginY*1/4 - 8, 30, 10);
   ctx.fillStyle = "black";
   ctx.textAlign = "right"
   ctx.fillText(dataSet[0].title, 0.5 * graphWidth + marginX - 10, config.canvas.height - marginY*1/4);

   ctx.fillStyle = dataSet[1].color;
   ctx.fillRect(      0.5 * graphWidth + marginX,                  config.canvas.height - marginY*1/4 - 8, 30, 10);
   ctx.strokeStyle = "#C0C0C0";
   ctx.strokeRect(      0.5 * graphWidth + marginX,                  config.canvas.height - marginY*1/4 - 8, 30, 10);
   ctx.fillStyle = "black";
   ctx.textAlign = "left"
   ctx.fillText(dataSet[1].title, 0.5 * graphWidth + marginX + 40, config.canvas.height - marginY*1/4);


}

function drawAxisX(config, minValue, maxValue, step, title) {
   let ctx = config.ctx;
   ctx.strokeStyle = "#E0E0E0";
   ctx.font = "12px Arial";
   ctx.textAlign = "center";

   let graphWidth = config.canvas.width - 2 * marginX;
   let graphHeight = config.canvas.height - 2 * marginY;

   for (let x = minValue ; x <= maxValue ; x=x+step) {
      let relX = (x - config.minX) / (config.maxX - config.minX);
      ctx.fillText(x , relX * graphWidth + marginX,  config.canvas.height - marginY*3/4);

      ctx.beginPath();
      ctx.moveTo(relX * graphWidth + marginX, marginY);
      ctx.lineTo(relX * graphWidth + marginX, config.canvas.height - marginY);
      ctx.stroke();

   }
   ctx.font = "12px Arial";
   ctx.textAlign = "center";
   ctx.fillText(title, config.canvas.width/2, config.canvas.height - marginY*2/4);
}

function drawAxisY(config, minValue, maxValue, step, title) {
   let ctx = config.ctx
   ctx.strokeStyle = "#E0E0E0";
   ctx.font = "12px Arial";
   ctx.textAlign = "center";

   let graphWidth = config.canvas.width - 2 * marginX;
   let graphHeight = config.canvas.height - 2 * marginY;

   for (let y = minValue ; y <= maxValue ; y=y+step) {
      let relY = (y - config.minY) / (config.maxY - config.minY);
      ctx.fillText(y , marginX *2 / 3,  marginY + graphHeight - relY * graphHeight + 4);

      ctx.beginPath();
      ctx.moveTo(marginX, marginY + graphHeight - relY * graphHeight );
      ctx.lineTo(config.canvas.width - marginX, marginY + graphHeight - relY * graphHeight);
      ctx.stroke();

   };

   ctx.font = "12px Arial";
   ctx.textAlign = "center";
   ctx.translate(marginX/3, marginY + graphHeight / 2);
   ctx.rotate(-3.14 /2);
   ctx.fillText(title, 0, 0);
   ctx.rotate(3.14 /2)
   ctx.translate(-marginX/3,-(marginY + graphHeight / 2));
}

function drawLine(value, index, array) {
   let ctx = this.config.ctx;
   ctx.fillStyle = this.color;

   if (value.y != -1) {
      let relX = (value.x - this.config.minX) / (this.config.maxX - this.config.minX)
      let relY = (value.y - this.config.minY) / (this.config.maxY - this.config.minY)
      ctx.fillRect(relX * this.config.graphWidth + marginX , marginY + this.config.graphHeight - relY * this.config.graphHeight, this.config.lineWidth, relY * this.config.graphHeight);
      ctx.fillStyle = "#808080";
      ctx.fillRect(relX * this.config.graphWidth + marginX , marginY + this.config.graphHeight - relY * this.config.graphHeight, this.config.lineWidth, 1);
   };
}
