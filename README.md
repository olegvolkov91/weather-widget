# Weather Widget

A simple weather widget built with Next.js, React, Jest and Material-UI.

## Video Example

Follow [this link](https://drive.google.com/file/d/14hYhC77nVQ39rn4UvkEVtjxuuqf1DjBy/view?usp=sharing) to watch video example

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [License](#license)

## Getting Started

Follow these instructions to set up the project on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (version 14 or higher)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)

after following installed, make sure you have [OpenWeatherMap](https://openweathermap.org/) account if not, then it should be created.

## Installation

1. **Open your terminal.**

2. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/weather-widget.git
   ```
3. **Navigate to the project directory:**
   ```bash
   cd weather-widget
   ```
4. **Install dependencies:**
   ```bash
   npm install
   ```
5. **Add the following environment variables to the .env.local file:**

- NEXT_PUBLIC_OPENWEATHERMAP_API_KEY=[your-api-key]
- NEXT_PUBLIC_WEATHER_BASE_URL=[weather-forecast]
- NEXT_PUBLIC_CITY_BASE_URL=[geo]
- NEXT_PUBLIC_WEATHER_ICON_URL=[image-url]

Replace the placeholders with the appropriate values:

[your-api-key]: Your unique API key obtained from OpenWeatherMap.
[weather-forecast]: The base URL for weather forecast API (e.g., https://api.openweathermap.org/data/2.5/forecast).
[geo]: The base URL for the geo API (e.g., http://api.openweathermap.org/geo/1.0/direct).
[image-url]: The URL for weather icons (e.g., https://openweathermap.org/img).

## Running the Project

To start the development server, ensure you are in weather-widget folder and run the following command:

```bash
npm run dev
```

Once the server is running, open your browser and navigate to:

http://localhost:3000

You should see the weather widget running!

## License

This project is licensed under the MIT License - see the LICENSE file for details.
