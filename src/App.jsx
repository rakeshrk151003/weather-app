import { useState,useEffect } from 'react';
import './App.css';
import search1 from './assets/search.png';
import drizzle from './assets/drizzle.png';
import humidity1 from './assets/humidity.png';
import rainy from './assets/rainy.png';
import cloud from './assets/cloud.jpg';
import sunny from './assets/sunny.png';
import windy from './assets/windy.png';
import snow from './assets/snow.png';
const WeatherDetails =({icon,temp,city,country,lat,log,humidity,wind}) => {
  return(
  <>
    <div className='image'>
       <img src={icon} alt='image'/>
    </div>
    <div className='temp'>{temp}℃</div>
    <div className='location'>{city}</div>
    <div className='country'>{country}</div>
    <div className="cord">
      <div>
        <span className='lat'>latitude</span>
        <span>{lat}</span>
      </div>
      <div>
        <span className='log'>longitude</span>
        <span>{log}</span>
      </div>
    </div>
    <div className='data-container'>
      <div className='element'>
        <img src={humidity1} className='icon'/>
        <div className='data'>
          <div className='humidity-percent'>{humidity}%</div>
          <div className='text'>Humidity</div> 
        </div>
      </div>
      <div className='element'>
        <img src={windy} className='icon'/>
        <div className='data'>
          <div className='wind-percent'>{wind}km/hr</div>
          <div className='text'>Wind Speed</div> 
        </div>
      </div>
    </div>
  </>);
};

function App() {
  const [text,setText]=useState("Chennai");
  const [icon,setIcon]=useState(snow);
  const [temp,setTemp]=useState(0);
  const [city,setCity]=useState("Chennai");
  const [country,setCountry]=useState('IN');
  const [lat,setLat]=useState(0);
  const [log,setLog]=useState(0);
  const [humidity,setHumidity]=useState(0);
  const [wind,setWind]=useState(0);
  const [cityNotFound,setCityNotFound]=useState(false);
  const [loading,setLoading]=useState(false);
  const weatherIconMap={
    "01d": sunny,
    "01n": sunny,
    "02d":cloud,
    "02n":cloud,
    "03d":drizzle,
    "03n":drizzle,
    "04d":drizzle,
    "04n":drizzle,
    "09d":rainy,
    "09n":rainy,
    "10d":rainy,
    "10n":rainy,
    "13d":snow,
    "13n":snow,
  };
  const search=async ()=>{
    setLoading(true);
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=942ca2b65b42875d50247f7b6f44055a&units=Metric`
   try{
      let res=await fetch(url);
      let data=await res.json();
      if(data.cod ==='404'){
        console.error("City not found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      const weatherIcon=data.weather[0].icon;
      setIcon(weatherIconMap[weatherIcon]|| sunny);
      setCityNotFound(false);
   }catch(error){
    console.log("An error occured:",error.message);
   }
   finally{
    setLoading(false);
   }
    };
  const handleCity=(e)=>{
    setText(e.target.value);
  };
  const handleKeyDown=(e)=>{
      if(e.key=='Enter')
        {
          search();
        }
  };
  useEffect(function(){
    search();
  },[]);
  return (
    <>
      <div className="container">
         <div className="input-container">
           <input type="text" className='cityInput' onChange={handleCity} value={text} onKeyDown={ handleKeyDown} placeholder='Search City'/>
           <div className='search-icon' onClick={()=>search()}>
             <img src={search1} alt='search'/>
           </div>
         </div>
         <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind}/>
         {loading && <div className='loading-message'>Loading.....</div>}
         {cityNotFound && <div className='city-not-found'>City Not found</div>}
         <p className='copyright'>
            Designed By <span>Rakesh Kanagaraj</span>
         </p>
      </div>
    </>
  )
}

export default App
