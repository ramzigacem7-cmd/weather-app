// ====
// OpenWeatherMap API key
const apikey = "35ccb508aa6539666b01038943f4ef34";

// Selecting HTML elements
const mysearch = document.querySelector(".button1");          // Search button
const myinput = document.querySelector(".input1");            // Input field for city name
const myform = document.querySelector(".search-city");        // Form element
const myleading = document.querySelector(".loading");         // Loading indicator
const myweather =  document.querySelector(".weather-screen"); // Weather display area
const mycomment = document.querySelector(".comment");         // Error message text
const mycommentbutton =  document.querySelector(".comment-button"); // Button to close error popup
const mycommentcloud =   document.querySelector(".comment-cloud");   // Error popup container

// Function to fetch and display city weather
async function getcity(city){
    // Show loading spinner and hide weather results
    myleading.classList.add("on");
    myweather.style.visibility = "hidden";

    // API URL with city, API key, and metric units
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

    try {
        // Fetch data from API
        const response = await fetch(url);

        // Throw error if response is not OK
        if(!response.ok){
            throw new Error("Error fetching data");
        }

        // Parse response into JSON
        const data = await response.json();
        console.log(data); // Debugging: log data in console

        // Add delay (1 second) to show loading effect
        setTimeout(() => {
            // Change background based on weather condition
            switch (data.weather[0].main){
                case "Clear":
                    document.body.style.backgroundImage = "url('images/clear.jpg')";
                    break;
                case "Clouds":
                    document.body.style.backgroundImage ="url('images/clouds.jpg')";
                    break;
                case "Rain":
                    document.body.style.backgroundImage ="url('images/rain.jpg')";
                    break;
                case "Snow":
                    document.body.style.backgroundImage ="url('images/snow.jpg')";
                    break;
                default:
                    document.body.style.backgroundImage = "url('images/sky-1363333250XvV.jpg')";
            }

            // Display weather information on the page
            myweather.innerHTML =
            `<div class="name">
                <h1>${data.name} </h1>
                <h2>${data.sys.country}</h2>
            </div>
            <div class="temp">
                <h1> ${(data.main.temp).toFixed(0)} °</h1>
                <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon">
            </div>
            <div class="min-max">
                <h3> temp-max: ${(data.main.temp_max).toFixed(0)} °</h3>
                <h3>temp-min: ${(data.main.temp_min).toFixed(0)} °</h3>
            </div>
            <div class="others">
                <h2>Wind: ${(data.wind.speed * 3.6).toFixed(0)} Km/h</h2>
                <h3>humidity: ${data.main.humidity}%</h3>
                <h3>pressure: ${data.main.pressure}hPa</h3>
                <h3>Description: ${data.weather[0].description}</h3>
            </div>`;

            // Hide loader and show results
            myleading.classList.remove("on");
            myweather.style.visibility = "visible";

        }, 1000)

    } catch (error) {
        // If error: hide loader, hide weather, show error popup
        myleading.classList.remove("on");
        myweather.style.visibility = "hidden";
        mycommentcloud.style.display ="flex";
        mycomment.textContent ="We didn’t find this city";
        document.body.style.backgroundImage = "url('images/sky-1363333250XvV.jpg')";
    }
}

// When user clicks the search button
mysearch.addEventListener("click", (e)=>{
    e.preventDefault(); // Prevent form reload
    let city = myinput.value; // Get input value
    if(city){
        myinput.value =""; // Clear input field
        getcity(city);     // Call weather function
    }
})

// When user clicks the close button on the error popup
mycommentbutton.addEventListener("click", ()=>{
   mycommentcloud.style.display ="none"
});
