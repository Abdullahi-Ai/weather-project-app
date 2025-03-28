//write your code here
document.addEventListener('DOMContentLoaded', () => {
    const apikey = "9024e77d047101a19d87a09bc5b1aa85";
    const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&";

    const searchbox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather-icon");

    async function checkWeather(city) {
        const url = `${apiurl}q=${city}&appid=${apikey}`;
        const response = await fetch(url);
        // 404 its a status code which cannot find a valid city in its database like searching and invalid city 

        if (response.status === 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            return;
        }

        const data = await response.json();

        document.querySelector(".city").innerText = data.name;
        document.querySelector(".temp").innerText = `${Math.round(data.main.temp)}°C`;
        document.querySelector(".humidity").innerText = `${data.main.humidity}%`;
        document.querySelector(".wind").innerText = `${data.wind.speed} km/h`;

        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "cloud.png";
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "rain.jpeg";
        } else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "clear.png";
        } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "drizzle.png";
        } else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "mist.png";
        }

        // weather alerting message of the weather update at different time
        if (data.weather[0].main === "Thunderstorm") {
            alert("Storm Warning! Stay indoors and stay safe.");
        } else if (data.weather[0].main === "Extreme") {
            alert("Extreme weather conditions detected! Take precautions.");
        }

        // Smart suggestions weather
        let advice = "";
        if (data.weather[0].main === "Rain" || data.weather[0].main === "Drizzle") {
            advice = "It's rainy! Carry an umbrella.";
        } else if (data.main.temp < 15) {
            advice = "It's cold! Wear a jacket.";
        } else if (data.weather[0].main === "Clear") {
            advice = "It's sunny! Don't forget your sunglasses.";
        } else if (data.weather[0].main === "Snow") {
            advice = "It's snowing! Stay warm and drive safely.";
        } else if (data.weather[0].main === "Mist" || data.weather[0].main === "Fog") {
            advice = "Low visibility due to mist and fog. Drive carefully.";
        }
        
        if (advice) {
            alert(advice);
        }
        
        // Alert message conditions 
        if (data.weather[0].main === "Rain" && data.main.humidity > 90) {
            alert("Flood Alert! Heavy rain detected. Stay in safe areas.");
        }
        
        

