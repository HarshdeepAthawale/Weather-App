# 🌤️ Weather App

A modern, responsive weather application built with Next.js, TypeScript, and TailwindCSS. Get current weather conditions and 5-day forecasts for any city worldwide.

## ✨ Features

- **Current Weather**: Real-time weather data including temperature, humidity, wind speed, and conditions
- **5-Day Forecast**: Extended weather forecast with daily highs and lows
- **Temperature Units**: Toggle between Celsius and Fahrenheit
- **Responsive Design**: Beautiful UI that works on desktop and mobile devices
- **Error Handling**: User-friendly error messages for invalid cities or API issues
- **Loading States**: Smooth loading indicators during data fetching

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Icons**: Heroicons
- **API**: WeatherAPI.com
- **Deployment**: Ready for Vercel/Netlify

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd weather-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env.local` file in the root directory
   - Get a free API key from [WeatherAPI.com](https://www.weatherapi.com/)
   - Add your API key to the `.env.local` file:
     ```
     NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
     ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Getting a Weather API Key

1. Visit [WeatherAPI.com](https://www.weatherapi.com/)
2. Sign up for a free account
3. Navigate to your dashboard
4. Copy your API key
5. Add it to your `.env.local` file as shown above

### Environment Variables

| Variable | Description | Required |
|----------|-------------|---------|
| `NEXT_PUBLIC_WEATHER_API_KEY` | Your WeatherAPI.com API key | Yes |

## 📁 Project Structure

```
weather-app/
├── public/                 # Static assets
├── src/
│   ├── app/               # Next.js app directory
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Home page
│   │   └── globals.css    # Global styles
│   ├── components/        # React components
│   │   ├── SearchBar.tsx  # City search component
│   │   ├── WeatherCard.tsx # Current weather display
│   │   └── ForecastList.tsx # 5-day forecast
│   ├── hooks/             # Custom React hooks
│   │   └── useWeather.ts  # Weather data management
│   ├── services/          # API services
│   │   └── weatherAPI.ts  # Weather API integration
│   └── utils/             # Utility functions
│       └── formatDate.ts  # Date/temperature formatting
├── .env.local             # Environment variables (create this)
├── tailwind.config.js     # TailwindCSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## 🎯 Usage

1. **Search for a city**: Enter any city name in the search bar
2. **View current weather**: See temperature, conditions, humidity, and wind speed
3. **Check the forecast**: View the 5-day weather forecast
4. **Toggle units**: Switch between Celsius and Fahrenheit
5. **Handle errors**: Invalid city names will show helpful error messages

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your `NEXT_PUBLIC_WEATHER_API_KEY` environment variable in Vercel dashboard
4. Deploy!

### Netlify

1. Build the project: `npm run build`
2. Deploy the `out` folder to Netlify
3. Add environment variables in Netlify dashboard

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

1. **New Components**: Add to `src/components/`
2. **API Integration**: Extend `src/services/weatherAPI.ts`
3. **Utilities**: Add helper functions to `src/utils/`
4. **Styling**: Use TailwindCSS classes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Weather data provided by [WeatherAPI.com](https://www.weatherapi.com/)
- Icons by [Heroicons](https://heroicons.com/)
- Built with [Next.js](https://nextjs.org/) and [TailwindCSS](https://tailwindcss.com/)
