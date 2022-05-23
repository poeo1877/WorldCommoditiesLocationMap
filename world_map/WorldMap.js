//localstroage에서 사용자가 입력한 text를 통해 html Tag의 content 기입
// if(localStorage.getItem('inputValue')){
  const textvalue = localStorage.getItem('inputValue')
  let h1TagContent = document.getElementById("Header")    
  let CommodityName = document.getElementById("commodity_name");
  
  h1TagContent.textContent = textvalue
  CommodityName.textContent = textvalue.substring(0,(textvalue.indexOf(' ')));
  // }
  
let chartsheet = {
  type: 'line',
  options: {
    title: {
      display: true,
      text: CommodityName.textContent
    }
  }
}
let PriceChart = new Chart(document.getElementById("Price_LineChart"), chartsheet);

function addData( ChartYvalues, _label){
  //데이터셋 추가
  let newDataset = {
			label: _label,
			borderColor: getRandomColor(),
			data: ChartYvalues,
			fill: false
  }
  // chart에 newDataset 푸쉬
  PriceChart.data.datasets.push(newDataset);

  PriceChart.update();	//차트 업데이트
}

const API_KEY = 'NULL';
let series = "NULL";

  let API_Code = {
  CrudeOil : [`OPEC/ORB`,`EUREX/FCPEM2024.json`],
  NaturalGas : {url : `https://api.eia.gov/v2/natural-gas/pri/fut/data/?api_key=${API_KEY}&frequency=daily&start=2021-01-01&sort[0][column]=period&sort[0][direction]=asc&data[]=value&facets[series][]=${series}`,series : [`RNGWHHD`,"RNGC1","RNGC2", "RNGC3", "RNGC4"] },
  Coal : ["HKEX/03948.json", "HKEX/01898.json", "HKEX/00835.json", "BSE/BOM533278.json"],

  Aluminium : "SHFE/ALQ2022.json",
  Copper : ["HKEX/00358.json", "SHFE/CUQ2022.json"] ,
  Zinc : "SHFE/ZNQ2022.json",
  Nickel : "SHFE/NIN2022.json",
  Lead : "SHFE/PBQ2022.json",
  Tin : "",
  IronOre : "HKEX/01053.json",
  Gold :"SHFE/AUX2021" ,
  Silver : ["SHFE/AGQ2022",	"LBMA/SILVER"],
  Cobalt : "ODA/PCOBA_USD.json",
  Lithium : "",

  BaseMetals : "ODA/PMETA_INDEX.json",

  Corn : "",
  Wheat : "",
  Rice : "",
  Oats : "",
  SoybeanOil : "",
  Soybean : "",
  Sugar : "",
  Coffee : ""
}

function getToday(){
  let date = new Date();
  let year = date.getFullYear();
  let month = ("0" + (1 + date.getMonth())).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
}

function getStartdate(){
  let end = new Date()
  let start = new Date(end.setMonth(end.getMonth()-6));
  //end 가 실행된 날짜에서 6달 전. 그러면 차트에서 6달 만큼 data를 볼 수 있다.

  let year = start.getFullYear();
  let month = ("0"+(1+start.getMonth())).slice(-2);
  let day = ("0"+start.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
}


// let database_code = `OPEC/ORB`;

let end_date = getToday();
let start_date = getStartdate();

let ChartXvalues = [];
let ChartYvalues = [];
series = API_Code[CommodityName.textContent][`series`];
console.log(series);

let A=[];
let B=[];

// fetch(`https://data.nasdaq.com/api/v3/datasets/${database_code}?start_date=${start_date}&end_date=${end_date}&api_key=${API_KEY}`)

fetch(`https://api.eia.gov/v2/natural-gas/pri/fut/data/?api_key=${API_KEY}&frequency=daily&start=2021-01-01&sort[0][column]=period&sort[0][direction]=asc&data[]=value&facets[series][]=RNGC3`)
.then((response) => response.json())
.then(
    function(data){
        console.log(data);

     
        for (var key in (data.response)[`data`]){
          
            ChartXvalues.push((data.response.data)[key][`period`]);
            ChartYvalues.push((data.response.data)[key][`value`]);
            A.push(((data.response.data)[key][`period`]));
            B.push((data.response.data)[key][`value`]+1);
        }
        PriceChart.data.labels = ChartXvalues;
        PriceChart.update();
        addData(ChartYvalues,series);
        addData(B, "TEST");
      }
)
function getRandomColor() {
	return "#" + Math.floor(Math.random() * 16777215).toString(16);
}



// function makeChart(ChartXvalues, ChartYvalues, _label){
//   new Chart(document.getElementById("Price_LineChart"), {
//       type: 'line',
//       data: {
//         labels: ChartXvalues,
//         datasets: [{ 
//             data:  ChartYvalues,
//             label: _label,
//             borderColor: getRandomColor(),
//             fill: false
//           },
//         ]
//       },
//       options: {
//         title: {
//           display: true,
//           text: 'NaturalGas'
//         }
//       }
//     });
// }


