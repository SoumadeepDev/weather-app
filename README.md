# Weather Application - Task By Propacity

## Overview

This project is a Weather Application built using `React.js`. The application allows users to search for the current weather of any city. The weather data is fetched from the `OpenWeatherMap API`. The application features dynamic icons and background changes based on the current weather condition. The selected city is stored in the local storage so that the user's choice is persisted across sessions.

## Technologies Used

- **React.js**: A JavaScript library for building user interfaces, used for handling the application's UI.
- **React Hooks**: `useState` and `useEffect` are used for managing state and side effects.
- **React Toastify**: For displaying error messages in a user-friendly manner.
- **CSS3**: For styling the application and handling responsive design.
- **OpenWeatherMap API**: A third-party service used to fetch real-time weather data.
- **LocalStorage**: To persist the last searched city across browser sessions.

## Approach

1. **Weather Data Fetching**:

   - The application fetches the weather data from the OpenWeatherMap API based on the city name entered by the user.
   - The API response is processed to display relevant weather information such as temperature, humidity, and wind speed.

2. **Dynamic Weather Icons and Backgrounds**:

   - The application dynamically changes the weather icon and background color based on the current weather condition.
   - Different weather states like "clear", "cloudy", "rainy", etc., have their specific icons and backgrounds to enhance user experience.

3. **Temperature Conversion**:

   - Users can toggle between Celsius and Fahrenheit units for temperature display. The temperature conversion logic is handled by the `convertTemperature` function.

4. **City Persistence**:

   - The last searched city is saved in local storage so that when the user revisits the application, the weather data for that city is automatically displayed.

5. **Error Handling**:

   - The application gracefully handles errors, such as when a city is not found, by displaying an appropriate message using React Toastify.

6. **Responsive Design**:
   - The application is designed to be fully responsive, ensuring a seamless experience across different devices and screen sizes.

## Developer Details

- **Name**: Soumadeep Chatterjee
- **Email**: chat.soumadeep@gmail.com
- **GitHub**: https://github.com/SoumadeepDev
