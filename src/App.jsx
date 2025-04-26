import { useState,useEffect} from 'react';
import './App.css';
function App(){

  const[city,setCity]=useState('');
  const[temp,setTemp]=useState(false);
  const[weather,setWeather]=useState([]);

  useEffect(()=>{
    const url=" http://api.weatherapi.com/v1/forecast.json";
    const key="238fb4e8ebf747cc99c172512252604"
    fetch(`${url}?key=${key}&q=Bidar`)
    .then(response=>response.json())
    .then(data=>{
      setWeather(data)
      setTemp(true)
      console.log(data);
    })
  },[])

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long' ,day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  }
  
  const searchWeather=()=>{
    const url=" http://api.weatherapi.com/v1/forecast.json";
    const key="238fb4e8ebf747cc99c172512252604"
    fetch(`${url}?key=${key}&q=${city}`)
    .then(response=>{
      if(!response.ok){
        alert("location not found")
      }else{
        response.json()
        .then(data=>setWeather(data))
        setCity('')
      }
    })
  }
  return(
    <>
    <div className="parent1">
      <div className="child1">
        <input
        id="inpt" 
        type="text"
        placeholder="Enter your city name" 
        value={city}
        onChange={(event)=>{
          setCity(event.target.value);
        }}
        />
        <button id="btn" onClick={searchWeather}>search</button>
      </div>
    </div>
   
   {temp && <>
   <div className='child2'>
    <h1>{formatDate(weather.forecast.forecastday[0].date)}</h1>
   <img src={weather.current.condition.icon}/>
      <h1 id="tempc">{weather.current.temp_c}°C</h1>
      <h1 id="place">{weather.location.name}</h1>
      <h1 id='region'>{weather.location.region}</h1>
      <h3 id='region'>{weather.location.country}</h3> 
   </div>
   <div className='child3'>
      <h1>Sunrise: {weather.forecast.forecastday[0].astro.sunrise}</h1>
      <h1>Sunset: {weather.forecast.forecastday[0].astro.sunset}</h1>
      <h1>max: {weather.forecast.forecastday[0].day.maxtemp_c}°C</h1>
      <h1>min: {weather.forecast.forecastday[0].day.mintemp_c}°C</h1>
    </div>
   </>}
    </>
  )
}

export default App