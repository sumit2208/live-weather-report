const apiurl = 'https://api.weatherapi.com/v1/forecast.json?key=2b90dcbc772e49f9a1051120232008&days=3&aqi=no&alerts=no&q=';
// fetching the url to get the api values
fetch('https://api.weatherapi.com/v1/forecast.json?key=2b90dcbc772e49f9a1051120232008&days=3&aqi=no&alerts=no&q=mumbai')
    .then(res => {
        return res.json();
    })

    .then(data => {
        console.log(data);
    })


const searchbtn = document.querySelector('.search');
const searchbar = document.querySelector('.city');

let range_1 = document.getElementById('range_1') ;
let range_2 = document.getElementById('range_2') ;
let range_3 = document.getElementById('range_3') ;
const range_format = document.getElementsByClassName('range');
const chartCanvas = document.getElementById('myChart'); 
let myChart;

 
// fetch json  && apply the value

async function checkweather(city) {
    const response = await fetch(apiurl + city);
    let data = await response.json();

  const loc =  document.querySelector('.citys').innerHTML = data.location.name;
    document.querySelector('.asia').innerHTML = data.location.tz_id;
    document.querySelector('#WindSpeed').innerHTML = data.current.wind_kph + "kph";
    document.querySelector('#humidity').innerHTML = data.current.humidity + "%";
    document.querySelector('#pressure').innerHTML = data.current.pressure_mb + "mb";
    document.querySelector('.temp').innerHTML = data.current.temp_c + "°C";
    document.querySelector('.con').innerHTML = data.current.condition.text;
    document.querySelector('#Main_temp').setAttribute('src', 'https:' + data.current.condition.icon);
    document.querySelector('.date').innerHTML = data.location.localtime;


// foracast section

    let days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

    let forecast_day_1 = new Date(data.forecast.forecastday[0].date);
    document.getElementById('forecast_Day_Show_1') .innerHTML = days[forecast_day_1.getDay()];
    document.getElementById ('img_1' ) .setAttribute('src','https:'+data.forecast.forecastday[0].day.condition.icon);
  const for_first =  document.getElementById('forecast_temp_1').innerHTML=data.forecast.forecastday[0].day.avgtemp_c+'°C';


    let forecast_day_2 = new Date(data.forecast.forecastday[1].date);
    document.getElementById('forecast_Day_Show_2') .innerHTML = days[forecast_day_2.getDay()];
    document.getElementById ('img_2' ) .setAttribute('src','https:'+data.forecast.forecastday[1].day.condition.icon);
    const for_second =  document.getElementById('forecast_temp_2').innerHTML=data.forecast.forecastday[1].day.avgtemp_c+'°C';

    let forecast_day_3 = new Date(data.forecast.forecastday[2].date);
    document.getElementById('forecast_Day_Show_3') .innerHTML = days[forecast_day_3.getDay()];
    document.getElementById ('img_3' ) .setAttribute('src','https:'+data.forecast.forecastday[2].day.condition.icon);
    const for_third =   document.getElementById('forecast_temp_3').innerHTML=data.forecast.forecastday[2].day.avgtemp_c+'°C';

      
    // automatically upadte range bar according to report &&   no user input

    function range_applicate(){
        const final = parseInt( for_first);
        range_1.value = final
        console.log(range_1.value);

        const final_2 = parseInt( for_second);
        range_2.value = final_2
        console.log(range_2.value);

        const final_3 = parseInt( for_third);
        range_3.value = final_3
        console.log(range_3.value);
    }
    range_applicate();
   
   
    
    // chart and updating the chart according with citys
    const hourlyTemps = data.forecast.forecastday[0].hour.map((hour) => hour.temp_c);
    const cityname = loc.toUpperCase();
    console.log(cityname);
    console.log(hourlyTemps);
    function updateGraph() {

      if (myChart) {
          myChart.destroy();
      }

      myChart = new Chart(chartCanvas, {
          type: 'line',
          data: {
              labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
              datasets: [{
                  label: `TODAY HOURLY REPORTS of ${cityname} `,
                  data: hourlyTemps,
                  borderWidth: 1,
                  
              }],
          },
          options: {
            responsive:true,
            maintainAspectRatio:false,
          
              scales: {
                  y: {
                      beginAtZero: true,
                    },
              },
          },
      });
  }
  updateGraph();

  window.addEventListener('resize',()=>{
    myChart.resive();
  })

  // getting search value
  searchbtn.addEventListener('click', () => {
   checkweather(searchbar.value);
   
  });
};

// on enter key == search
searchbar.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        checkweather(searchbar.value);
    }
  }) 


 

  
 
 
const allskeleton = document.querySelectorAll('.skeleton');
const skeleton2 = document.querySelectorAll('.skeleton2');

window.addEventListener('load', () => {
    setTimeout(() => {
        allskeleton.forEach(item => {
            item.classList.remove('skeleton');
        })
    }, 750);
})

window.addEventListener('load', () => {
    setTimeout(() => {
        skeleton2.forEach(item => {
            item.classList.remove('skeleton2')
        })
    }, 750);
});
 
 





    

 
