 const usDbArray =   document.getElementById("usdB").innerText.substr(63).split(" ");
 const dsDbArray =   document.getElementById("dsdB").innerText.substr(63).split(" ");
 const usBitsArray = document.getElementById("usBits").innerText.substr(65).split(" ");
 const dsBitsArray = document.getElementById("dsBits").innerText.substr(65).split(" ");

 //console.log("Start of dsl-graph.js")
 
 const usDbData = usDbArray.map(myDbFunction);
 const dsDbData = dsDbArray.map(myDbFunction);
 const usBitsData = usBitsArray.map(myBitsFunction);
 const dsBitsData = dsBitsArray.map(myBitsFunction); 


 function myBitsFunction(value, index, array) {
    var v = parseInt(value,16);
    return({x: index, y: v})
 } 

 function myDbFunction(value, index, array) {
    var v =parseInt(value,16);
    if (v == 255) {
       v = 0
    } else {
       v = v / 3
    };
    return({x: index * 8, y: v})
 }

  const dbData = {
    datasets: [{
         label: 'US data',
         backgroundColor: 'orchid',
         borderColor: 'rgb(25, 99, 132)',
         barThickness: 2,
         label: 'Upstream',
         data: usDbData
      },{
         label: 'DS data',
         backgroundColor: 'yellow',
         borderColor: 'rgb(25, 99, 132)',
         barThickness: 2,
         label: 'Downstream',
         data: dsDbData
      }
    ]
  };

  const bitsData = {
    datasets: [{
         label: 'US data',
         backgroundColor: 'lime',
         borderColor: 'rgb(25, 99, 132)',
         barThickness: 1,
         label: 'Upstream',
         data: usBitsData
      },{
         label: 'DS data',
         backgroundColor: 'royalblue',
         borderColor: 'rgb(25, 99, 132)',
         barThickness: 1,
         label: 'Downstream',
         data: dsBitsData
      }
    ]
  };

  const dbConfig = {
    type: 'bar',
    data: dbData,
    options: {
      maintainAspectRatio: false,
      scales: {
         y: {
           min: 0,
           max: 80,
           title: {
              text: "dB",
              display: true
           }
         },
         x: {
           type: 'linear',
           min: 0,
           max: 4096,
           ticks: {
              stepSize: 256,
              maxRotation: 45,
              minRotation: 45
           },
           title: {
              text: "Signal to noise ratio",
              display: true,
              position: 'bottom'
           }
         }
      },
      plugins: {
         legend: {
            display: true,
            position: "bottom"
         }
      }
    }
  };

  const bitsConfig = {
    type: 'bar',
    data: bitsData,
    options: {
      maintainAspectRatio: false,
      scales: {
         y: {
           min: 0,
           max: 20,
           title: {
              text: "Bits",
              display: true
           }
         },
         x: {
           type: 'linear',
           min: 0,
           max: 4096,
           ticks: {
              stepSize: 256,
              maxRotation: 45,
              minRotation: 45
           },
           title: {
              text: "Carriers/tone",
              display: true,
              position: 'bottom'
           }
         }
      },
      plugins: {
         legend: {
            display: true,
            position: "bottom"
         }
      }
    }
  };


const bitsChart = new Chart(
   document.getElementById('bitsChart'),
   bitsConfig
  );

const dbChart = new Chart(
   document.getElementById('dbChart'),
   dbConfig
 );
