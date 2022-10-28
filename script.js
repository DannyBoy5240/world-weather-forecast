let api = "bc41ceec266dfe86f748257816dbce71";

const getWeatherForecase = async () => {
    let city = document.querySelector(".search-bar").value; //input from user.
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      let lat = data.coord.lat;
      let lon = data.coord.lon;
      getDatafor7days(lat, lon);
    } catch (error) {
      console.log(error);
    }
};

const getDatafor7days = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api}`;
    try {
      let res = await fetch(url);
      let data = await res.json();

      const tot_div = document.getElementById("forecast");
      tot_div.innerHTML = "";          

      for (let i = 0; i < 8; i ++) {
            var tmp = data.daily[i];

            const name = document.querySelector(".search-bar").value;
            const { icon,description } = tmp.weather[0];
            const temp = tmp.temp;
            const humidity = tmp.humidity;
            const speed = tmp.wind_speed;
            console.log(name,icon,description,temp,humidity,speed);

            document.querySelector(".city").innerText = "Weather in " + name;

            const temp_div = document.createElement("div");
            temp_div.setAttribute("class", "temp");
            temp_div.innerText = "Temperature: " + (Math.floor(temp.day)-273) + "°C";

            const newDiv = document.createElement("div");
            newDiv.setAttribute("class", "flex");
            
            const newImg = document.createElement("img");
            newImg.setAttribute("src", "https://openweathermap.org/img/wn/"+icon+".png");
            newImg.setAttribute("alt", "");
            newImg.setAttribute("class", "icon");

            const desc_div = document.createElement("div");
            desc_div.setAttribute("class", "description");
            desc_div.innerText = description;

            newDiv.appendChild(newImg);
            newDiv.appendChild(desc_div);

            const humadity_div = document.createElement("div");
            humadity_div.setAttribute("class", "humadity");
            humadity_div.innerText = "Humadity: "+ humidity +"%";

            const wind_div = document.createElement("div");
            wind_div.setAttribute("class", "wind");
            wind_div.innerText = "Wind speed: "+ speed + "km/h";

            const br_space = document.createElement("br");

            const tmp_div = document.createElement("div");
            tmp_div.appendChild(newDiv);
            tmp_div.appendChild(temp_div);
            tmp_div.appendChild(humadity_div);
            tmp_div.appendChild(wind_div);
            tmp_div.appendChild(br_space);
            tmp_div.setAttribute("style", "display: inline-block; width: 50%");

            tot_div.appendChild(tmp_div);

            document.querySelector(".weather").classList.remove("loading");
            document.body.style.backgroundImage = "url('https://source.unsplash.com/random/1600×900/?"+name+"')";
      }
    } catch (error) {
      console.log(error);
    }
};

document.querySelector(".search button")
.addEventListener("click",function(){
    getWeatherForecase();
});
document.querySelector(".search-bar").addEventListener("keyup",function(event){
    if(event.key == "Enter"){
        getWeatherForecase();
    }
})