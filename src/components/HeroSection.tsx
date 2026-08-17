"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronLeft, ChevronRight, MapPin, Calendar, CloudSun, Droplets, Wind, Eye, Thermometer, ArrowLeftRight, RefreshCw, Leaf, AlertTriangle, TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroSlides, searchCategories } from "@/lib/vth-data";

const SLIDE_INTERVAL = 6000;

const quickFilters = [
  { label: "Destinations", icon: MapPin },
  { label: "Things To Do", icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg> },
  { label: "Events", icon: Calendar },
  { label: "Stay", icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg> },
  { label: "Eat", icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg> },
];

interface WeatherData {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  icon: string;
  visibility: number;
}

const weatherCodeMap: Record<number, { condition: string; icon: string }> = {
  0: { condition: "Clear Sky", icon: "\u2600\uFE0F" },
  1: { condition: "Mainly Clear", icon: "\uD83C\uDF24\uFE0F" },
  2: { condition: "Partly Cloudy", icon: "\u26C5" },
  3: { condition: "Overcast", icon: "\u2601\uFE0F" },
  45: { condition: "Foggy", icon: "\uD83C\uDF2B\uFE0F" },
  48: { condition: "Rime Fog", icon: "\uD83C\uDF2B\uFE0F" },
  51: { condition: "Light Drizzle", icon: "\uD83C\uDF26\uFE0F" },
  53: { condition: "Drizzle", icon: "\uD83C\uDF27\uFE0F" },
  55: { condition: "Dense Drizzle", icon: "\uD83C\uDF27\uFE0F" },
  61: { condition: "Slight Rain", icon: "\uD83C\uDF27\uFE0F" },
  63: { condition: "Moderate Rain", icon: "\uD83C\uDF27\uFE0F" },
  65: { condition: "Heavy Rain", icon: "\uD83C\uDF27\uFE0F" },
  71: { condition: "Slight Snow", icon: "\uD83C\uDF28\uFE0F" },
  73: { condition: "Moderate Snow", icon: "\u2744\uFE0F" },
  75: { condition: "Heavy Snow", icon: "\u2744\uFE0F" },
  80: { condition: "Rain Showers", icon: "\uD83C\uDF26\uFE0F" },
  81: { condition: "Moderate Showers", icon: "\uD83C\uDF27\uFE0F" },
  82: { condition: "Violent Showers", icon: "\uD83C\uDF27\uFE0F" },
  95: { condition: "Thunderstorm", icon: "\u26C8\uFE0F" },
};

function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=6.61&longitude=0.47&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,visibility&timezone=Africa/Accra"
        );
        const data = await res.json();
        const code = data.current?.weather_code ?? 0;
        const mapped = weatherCodeMap[code] || { condition: "Fair", icon: "\u2600\uFE0F" };
        setWeather({
          temp: Math.round(data.current?.temperature_2m ?? 0),
          feelsLike: Math.round(data.current?.apparent_temperature ?? 0),
          humidity: data.current?.relative_humidity_2m ?? 0,
          windSpeed: Math.round(data.current?.wind_speed_10m ?? 0),
          condition: mapped.condition,
          icon: mapped.icon,
          visibility: Math.round((data.current?.visibility ?? 10000) / 1000),
        });
      } catch {
        setWeather({
          temp: 28, feelsLike: 30, humidity: 75, windSpeed: 12,
          condition: "Partly Cloudy", icon: "\u26C5", visibility: 10,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
    const interval = setInterval(fetchWeather, 600000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 min-w-[200px] animate-pulse">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-white/10" />
          <div className="h-3 w-24 bg-white/10 rounded" />
        </div>
        <div className="h-8 w-16 bg-white/10 rounded mb-2" />
        <div className="h-2 w-32 bg-white/10 rounded" />
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 min-w-[200px]">
      <div className="flex items-center gap-2 mb-3">
        <CloudSun className="w-4 h-4 text-[#F59E0B]" />
        <p className="text-white/80 text-xs font-semibold uppercase tracking-wider">Ho, Volta Region</p>
      </div>
      <div className="flex items-start gap-3">
        <span className="text-4xl leading-none">{weather.icon}</span>
        <div>
          <p className="text-3xl font-bold text-white leading-none">{weather.temp}<span className="text-lg font-normal text-white/60">°C</span></p>
          <p className="text-white/60 text-xs mt-1">{weather.condition}</p>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-2 gap-x-4 gap-y-1.5">
        <div className="flex items-center gap-1.5 text-white/60 text-[11px]">
          <Thermometer className="w-3 h-3" />
          <span>Feels {weather.feelsLike}°C</span>
        </div>
        <div className="flex items-center gap-1.5 text-white/60 text-[11px]">
          <Droplets className="w-3 h-3" />
          <span>{weather.humidity}%</span>
        </div>
        <div className="flex items-center gap-1.5 text-white/60 text-[11px]">
          <Wind className="w-3 h-3" />
          <span>{weather.windSpeed} km/h</span>
        </div>
        <div className="flex items-center gap-1.5 text-white/60 text-[11px]">
          <Eye className="w-3 h-3" />
          <span>{weather.visibility} km</span>
        </div>
      </div>
    </div>
  );
}

const CURRENCY_FLAGS: Record<string, string> = { GHS: "\uD83C\uDDEC\uD83C\uDDDD", USD: "\uD83C\uDDFA\uD83C\uDDF8", EUR: "\uD83C\uDEA7\uD83C\uDDFA", GBP: "\uD83C\uDCEC\uD83C\uDDE7", NGN: "\uD83C\uDDF3\uD83C\uDDEC", CNY: "\uD83C\uDDE8\uD83C\uDDF3" };
const CURRENCY_NAMES: Record<string, string> = { GHS: "Cedi", USD: "US Dollar", EUR: "Euro", GBP: "Pound", NGN: "Naira", CNY: "Yuan" };
const CURRENCIES = ["GHS", "USD", "EUR", "GBP", "NGN", "CNY"];

function ForexWidget() {
  const [ratesMap, setRatesMap] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"rates" | "convert">("rates");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("GHS");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState<string | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch(
          "https://api.frankfurter.app/latest?from=GHS&to=USD,EUR,GBP,NGN,CNY"
        );
        const data = await res.json();
        // Store GHS->X rates, then invert so we have 1 X = ? GHS
        const ghstoOther: Record<string, number> = {};
        for (const [cur, rate] of Object.entries(data.rates)) {
          ghstoOther[cur] = rate as number;
        }
        // 1 GHS = 1/USD_rate USD, etc.
        const map: Record<string, number> = { GHS: 1 };
        for (const cur of CURRENCIES) {
          if (cur !== "GHS" && ghstoOther[cur]) {
            map[cur] = 1 / ghstoOther[cur]; // how much of this currency per 1 GHS
          }
        }
        setRatesMap(map);
      } catch {
        setRatesMap({ GHS: 1, USD: 0.0647, EUR: 0.0595, GBP: 0.0510, NGN: 103.5, CNY: 0.466 });
      } finally {
        setLoading(false);
      }
    };
    fetchRates();
    const interval = setInterval(fetchRates, 600000);
    return () => clearInterval(interval);
  }, []);

  const convertCurrency = (from: string, to: string, value: number): number => {
    if (!ratesMap[from] || !ratesMap[to]) return 0;
    // Convert value in 'from' to GHS first, then to 'to'
    const inGHS = value / ratesMap[from];
    return inGHS * ratesMap[to];
  };

  useEffect(() => {
    if (mode === "convert" && amount && !isNaN(Number(amount))) {
      const result = convertCurrency(fromCurrency, toCurrency, Number(amount));
      setConvertedAmount(result.toFixed(2));
    } else {
      setConvertedAmount(null);
    }
  }, [amount, fromCurrency, toCurrency, mode, ratesMap]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setAmount(convertedAmount || "");
  };

  const ratesList = CURRENCIES.filter((c) => c !== "GHS").map((currency) => {
    const rate = ratesMap[currency] ? 1 / ratesMap[currency] : 0;
    return { currency, rate, flag: CURRENCY_FLAGS[currency] || "\uD83C\uDFDB\uFE0F" };
  });

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 min-w-[240px] animate-pulse">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-5 h-5 rounded bg-white/10" />
          <div className="h-3 w-28 bg-white/10 rounded" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-full bg-white/10 rounded" />
          <div className="h-3 w-full bg-white/10 rounded" />
          <div className="h-3 w-3/4 bg-white/10 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 min-w-[240px]">
      {/* Header with tab toggle */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm">{CURRENCY_FLAGS.GHS}</span>
          <p className="text-white/80 text-xs font-semibold uppercase tracking-wider">Forex</p>
        </div>
        <button
          onClick={() => setMode(mode === "rates" ? "convert" : "rates")}
          className="text-[10px] font-semibold text-[#F59E0B] hover:text-[#FBBF24] transition-colors uppercase tracking-wider flex items-center gap-1"
        >
          {mode === "rates" ? (<>Convert <ArrowLeftRight className="w-3 h-3" /></>) : (<>Rates <RefreshCw className="w-3 h-3" /></>)}
        </button>
      </div>

      {mode === "rates" ? (
        <>
          <p className="text-white/50 text-[10px] mb-2.5">1 GHS equals</p>
          <div className="space-y-1.5">
            {ratesList.map(({ currency, rate, flag }) => (
              <div key={currency} className="flex items-center justify-between text-white/80 text-xs">
                <span className="flex items-center gap-1.5">
                  <span>{flag}</span>
                  <span className="font-medium">{currency}</span>
                </span>
                <span className="font-mono tabular-nums">{rate.toFixed(4)}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-2.5">
          {/* From */}
          <div>
            <label className="text-white/50 text-[10px] uppercase tracking-wider mb-1 block">From</label>
            <div className="flex gap-1.5">
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="h-9 w-[90px] appearance-none rounded-lg bg-white/10 border border-white/15 text-white text-xs pl-2 pr-1 focus:outline-none focus:border-[#F59E0B]/60 cursor-pointer"
              >
                {CURRENCIES.map((c) => (
                  <option key={c} value={c} className="bg-gray-900 text-white">
                    {CURRENCY_FLAGS[c]} {c}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="h-9 flex-1 rounded-lg bg-white/10 border border-white/15 text-white text-xs pl-2.5 pr-2 placeholder:text-white/30 focus:outline-none focus:border-[#F59E0B]/60 min-w-0"
              />
            </div>
          </div>

          {/* Swap button */}
          <div className="flex justify-center">
            <button
              onClick={swapCurrencies}
              className="h-7 w-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/70 hover:text-[#F59E0B] hover:border-[#F59E0B]/40 transition-colors"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* To */}
          <div>
            <label className="text-white/50 text-[10px] uppercase tracking-wider mb-1 block">To</label>
            <div className="flex gap-1.5">
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="h-9 w-[90px] appearance-none rounded-lg bg-white/10 border border-white/15 text-white text-xs pl-2 pr-1 focus:outline-none focus:border-[#F59E0B]/60 cursor-pointer"
              >
                {CURRENCIES.map((c) => (
                  <option key={c} value={c} className="bg-gray-900 text-white">
                    {CURRENCY_FLAGS[c]} {c}
                  </option>
                ))}
              </select>
              <div className="h-9 flex-1 rounded-lg bg-white/5 border border-white/10 text-white text-xs pl-2.5 pr-2 flex items-center min-w-0">
                <span className={convertedAmount ? "text-white font-semibold" : "text-white/30"}>
                  {convertedAmount || "0.00"}
                </span>
              </div>
            </div>
          </div>

          {/* Rate hint */}
          {ratesMap[fromCurrency] && ratesMap[toCurrency] && amount && !isNaN(Number(amount)) && (
            <p className="text-white/40 text-[10px] text-center pt-1">
              1 {fromCurrency} = {convertCurrency(fromCurrency, toCurrency, 1).toFixed(4)} {toCurrency}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function EnvironmentWidget() {
  const [activeFact, setActiveFact] = useState(0);

  const facts = [
    {
      icon: <AlertTriangle className="w-3.5 h-3.5 text-[#EF4444]" />,
      label: "Temp Rise",
      value: "+1.1°C",
      detail: "Global avg. since pre-industrial era",
    },
    {
      icon: <TreePine className="w-3.5 h-3.5 text-[#F59E0B]" />,
      label: "Land Degraded",
      value: "40%",
      detail: "Of Volta Region's land affected",
    },
    {
      icon: <Droplets className="w-3.5 h-3.5 text-blue-400" />,
      label: "Rainfall Shift",
      value: "-15%",
      detail: "Decline in seasonal rainfall pattern",
    },
    {
      icon: <Leaf className="w-3.5 h-3.5 text-green-400" />,
      label: "Forest Cover",
      value: "~20%",
      detail: "Remaining original forest cover",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFact((prev) => (prev + 1) % facts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [facts.length]);

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 min-w-[180px]">
      <div className="flex items-center gap-2 mb-3">
        <Leaf className="w-4 h-4 text-green-400" />
        <p className="text-white/80 text-xs font-semibold uppercase tracking-wider">Environment</p>
      </div>
      <p className="text-white/50 text-[10px] mb-2.5">Climate & Land Awareness</p>

      {/* Animated fact card */}
      <div className="relative min-h-[72px]">
        {facts.map((fact, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-all duration-500 ${
              idx === activeFact
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2 pointer-events-none"
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5">
              {fact.icon}
              <span className="text-white/60 text-[10px] uppercase tracking-wider font-medium">{fact.label}</span>
            </div>
            <p className="text-2xl font-bold text-white leading-none">{fact.value}</p>
            <p className="text-white/50 text-[10px] mt-1.5 leading-snug">{fact.detail}</p>
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex gap-1.5 mt-3 pt-3 border-t border-white/10">
        {facts.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveFact(idx)}
            className={`block h-1.5 rounded-full transition-all duration-300 ${
              idx === activeFact
                ? "w-4 bg-green-400"
                : "w-1.5 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const totalSlides = heroSlides.length;

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentSlide((index + totalSlides) % totalSlides);
      setProgress(0);
    },
    [totalSlides]
  );

  const advanceSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  const retreatSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(advanceSlide, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [advanceSlide]);

  // Progress bar animation
  useEffect(() => {
    const startTime = Date.now();
    const frame = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / SLIDE_INTERVAL) * 100, 100);
      setProgress(pct);
      if (pct < 100) requestAnimationFrame(frame);
    };
    const id = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(id);
  }, [currentSlide]);

  return (
    <section id="home" className="relative h-screen min-h-[700px] w-full">
      {/* ---- Background slides with crossfade ---- */}
      <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={heroSlides[currentSlide].image}
            alt={heroSlides[currentSlide].alt}
            className="h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
      </div>

      {/* ---- Dark gradient overlay (darker on LEFT) ---- */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />

      {/* ---- Progress bar ---- */}
      <motion.div
        className="absolute top-0 left-0 h-[3px] z-50"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #F59E0B, #FBBF24)",
        }}
        transition={{ duration: 0.1, ease: "linear" }}
      />

      {/* ---- Left-aligned main content ---- */}
      <div className="relative z-10 flex h-full flex-col justify-center pt-28 sm:pt-32 lg:pt-44 pb-40 pl-32 sm:pl-40 md:pl-48 lg:pl-56 pr-6 sm:pr-10 md:pr-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col items-start text-left max-w-2xl"
        >
          {/* Welcome text */}
          <span className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/70">
            WELCOME TO THE VOLTA REGION
          </span>

          {/* Main heading */}
          <h1
            className="font-heading leading-none"
            style={{ textShadow: "0 4px 30px rgba(0,0,0,0.4)" }}
          >
            <span className="block text-5xl md:text-7xl font-bold text-white">
              DISCOVER
            </span>
            <span className="block text-6xl md:text-8xl font-extrabold text-[#F59E0B] mt-1 md:mt-2">
              VOLTA
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 max-w-lg text-lg text-white/80">
            Culture. Nature. Adventure. One extraordinary region.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button className="bg-[#F59E0B] text-white hover:bg-[#FBBF24] rounded-full px-8 py-3.5 font-semibold transition-colors duration-200 text-sm sm:text-base">
              EXPLORE DESTINATIONS
            </button>
            <button className="bg-white text-[#054906] hover:bg-gray-100 rounded-full px-8 py-3.5 font-semibold transition-colors duration-200 text-sm sm:text-base">
              PLAN YOUR JOURNEY
            </button>
          </div>
        </motion.div>
      </div>

      {/* ---- Right side: Environment + Weather + Forex ---- */}
      <div className="absolute top-1/2 -translate-y-1/2 right-6 sm:right-10 md:right-16 z-20 hidden md:flex items-end gap-4">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <EnvironmentWidget />
        </motion.div>
        <div className="flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            <WeatherWidget />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          >
            <ForexWidget />
          </motion.div>
        </div>
      </div>

      {/* ---- Carousel arrows ---- */}
      <button
        onClick={retreatSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-colors duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={advanceSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-colors duration-200"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* ---- Slide indicators (dots) ---- */}
      <div className="absolute bottom-36 left-6 sm:left-10 md:left-16 z-20 flex gap-2">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`block h-2 rounded-full transition-all duration-500 ${
              idx === currentSlide
                ? "w-6 bg-[#F59E0B]"
                : "w-2 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* ---- Floating Search Bar ---- */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        className="absolute bottom-[-30px] left-1/2 z-30 w-full max-w-5xl -translate-x-1/2 px-4"
      >
        <div className="rounded-xl bg-white shadow-xl">
          {/* Main search row */}
          <div className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center">
            {/* Search input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What are you looking for?"
                className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-800 placeholder:text-gray-400 focus:border-[#054906] focus:outline-none focus:ring-2 focus:ring-[#054906]/20"
              />
            </div>

            {/* Location dropdown */}
            <div className="relative sm:w-44">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-700 focus:border-[#054906] focus:outline-none focus:ring-2 focus:ring-[#054906]/20"
              >
                <option value="">Where in Volta?</option>
                {searchCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Date picker */}
            <div className="relative sm:w-44">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                placeholder="Any Date"
                className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-700 focus:border-[#054906] focus:outline-none focus:ring-2 focus:ring-[#054906]/20"
              />
            </div>

            {/* Search button */}
            <Button className="h-11 shrink-0 rounded-lg bg-[#054906] px-6 font-semibold text-white hover:bg-[#054906]/90 sm:w-auto">
              <Search className="mr-2 h-4 w-4" />
              SEARCH
            </Button>
          </div>

          {/* Quick filter row */}
          <div className="border-t border-gray-100 px-3 py-2.5 flex flex-wrap gap-1">
            {quickFilters.map((filter) => {
              const IconComponent = filter.icon;
              return (
                <button
                  key={filter.label}
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors duration-150"
                >
                  <IconComponent />
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}