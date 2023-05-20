"Use strict";
// Selecting section container from HTML
const sectionContainer = document.getElementById("section-container");

// Selecting loader

const loader = document.querySelector(".loader");

// Calling the function to get the Weather
getWeather();

// Function that gets weather
function getWeather() {
	// Method to get user's coords (latitude and longitude)
	navigator.geolocation.getCurrentPosition(
		function (position) {
			const lat = position.coords.latitude;
			const lon = position.coords.longitude;

			// Calling function to request weather data
			requestWeather();

			// Function to fetch weather data
			async function requestWeather() {
				const request = await fetch(
					`http://api.weatherapi.com/v1/current.json?key=6eebc70dd01a455db9301703231705&q=${lat},${lon}`
				);

				const response = await request.json();
				console.log(response);

				// html that will be inserted into section-container.
				const html = `
				<div class="container py-5 h-100">
				<div
					class="row d-flex justify-content-center align-items-center h-100 "
				>
					<div class="col-md-8 col-lg-6 col-xl-4 ">
						<div
							class="card shadow-lg
							"
							style="color: black; border-radius: 35px"
						>
							<div class="card-body p-4">
								<div class="d-flex flex-column text-center">
								
									<h4 class="flex-grow-1">
									${response.location.name},</h4>
									<h4>
									${response.location.country}</h4>
								</div>

								<div
									class="d-flex flex-column text-center mt-5 mb-4"
								>
									<h1
										class="display-4 mb-0 font-weight-bold"
										style="color: #1c2331; font-size: 80px"
									>
										<b>${response.current.temp_c}°c</b>
									</h1>
									<span class="small" style="color: black"
										>${response.current.condition.text}</span
									>
								</div>

								<div class="d-flex align-items-center">
									<div
										class="flex-grow-1"
										style="font-size: 1rem"
									>
										<div>
											<i
												class="fas fa-wind fa-fw"
												style="color: black"
											></i>
											<span class="ms-1"><b>Wind:</b> ${response.current.wind_kph} km/h </span>
										</div>
										<div>
											<span class="ms-1"><b>Humidity:</b> ${response.current.humidity}% </span>
										</div>
										<div>
											<i
												class="fas fa-sun fa-fw"
												style="color: black"
											></i>
											<span class="ms-1"><b>UV:</b> ${response.current.uv}</span>
										</div>
									</div>
									<div>
										<img
											src="https:${response.current.condition.icon}"
											width="100px"
										/>
									</div>

									
								</div><div><i>Developed by Alan Romero</i></div>
							</div> 
						</div>
					</div>
				</div>
			</div>
				`;

				//Removing loader
				loader.style.opacity = 0;
				// Inserting HTML into section-container
				sectionContainer.insertAdjacentHTML("beforeend", html);
			}
		},

		// Function to handle error getting
		function (error) {
			console.error("Error getting location:", error);
		}
	);
}
