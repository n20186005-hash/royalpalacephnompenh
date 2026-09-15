/**
 * Forecast data + visitor advice for the Royal Palace of Cambodia (Phnom Penh).
 *
 * The palace sits in a hot, humid city environment beside the confluence of the
 * Tonlé Sap and the Mekong, so the variables that actually matter to a visitor
 * are: heat and humidity, the UV load, short but intense afternoon rain,
 * thunderstorms, and strong wind along the riverfront.
 *
 * This module fetches the forecast on the server, caches it briefly, and turns
 * the raw numbers into short, actionable sentences. It never leaks provider
 * jargon into the UI: components receive i18n keys, not prose.
 */

import { poi } from '../data/poi';

const LATITUDE = poi.lat;
const LONGITUDE = poi.lng;
const TIMEZONE = 'Asia/Phnom_Penh';
const FORECAST_ENDPOINT = 'https://api.open-meteo.com/v1/forecast';

/** How long a fetched forecast is reused before asking for a new one. */
const CACHE_TTL_MS = 30 * 60 * 1000;

/** Opening windows of the palace, used for the visit-window breakdown. */
const WINDOWS = [
  { key: 'morning' as const, startHour: 8, endHour: 11 },
  { key: 'afternoon' as const, startHour: 14, endHour: 17 },
];

export type AdviceBucket = 'alerts' | 'outfit' | 'plan' | 'pack';

export interface CurrentConditions {
  temperature: number;
  apparent: number;
  humidity: number;
  windSpeed: number;
  windForce: number;
  precipitation: number;
  code: number;
  icon: string;
  isDay: boolean;
}

export interface DayForecast {
  date: string;
  weekday: number;
  code: number;
  icon: string;
  tMax: number;
  tMin: number;
  rainChance: number;
  rainSum: number;
  uvMax: number;
  windForce: number;
  sunrise: string;
  sunset: string;
  /** i18n key for the single most useful action for that day. */
  tip: string;
}

export interface VisitWindow {
  key: 'morning' | 'afternoon';
  temp: number;
  rainChance: number;
  windForce: number;
  uv: number;
}

export interface WeatherAdvice {
  alerts: string[];
  outfit: string[];
  plan: string[];
  pack: string[];
}

export interface WeatherData {
  now: CurrentConditions;
  days: DayForecast[];
  windows: VisitWindow[];
  advice: WeatherAdvice;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const clampInt = (value: unknown, fallback = 0): number => {
  const n = Math.round(Number(value));
  return Number.isFinite(n) ? n : fallback;
};

/** Beaufort force (0–12) from a wind speed in km/h. */
export function windForceFromKmh(kmh: number): number {
  const speed = Number(kmh) || 0;
  const scale: [number, number][] = [
    [1, 0], [5, 1], [11, 2], [19, 3], [28, 4], [38, 5],
    [49, 6], [61, 7], [74, 8], [88, 9], [102, 10], [117, 11],
  ];
  for (const [limit, force] of scale) {
    if (speed < limit) return force;
  }
  return 12;
}

/** WMO weather code → emoji. Kept language-neutral. */
export function weatherIcon(code: number): string {
  const c = clampInt(code, 3);
  if (c === 0 || c === 1) return '☀️';
  if (c === 2) return '⛅';
  if (c === 3) return '☁️';
  if (c === 45 || c === 48) return '🌫️';
  if (c >= 51 && c <= 57) return '🌦️';
  if (c >= 61 && c <= 67) return '🌧️';
  if ((c >= 80 && c <= 82) || (c >= 85 && c <= 86)) return '🌧️';
  if (c >= 95 && c <= 99) return '⛈️';
  return '🌤️';
}

/** UV index → i18n key under `weather.uvLevel`. */
export function uvLevelKey(uv: number): string {
  const v = Number(uv) || 0;
  if (v < 3) return 'weak';
  if (v < 6) return 'moderate';
  if (v < 8) return 'strong';
  if (v < 11) return 'veryStrong';
  return 'extreme';
}

/** Clock time from an ISO-ish local timestamp ("2026-09-15T18:12"). */
function clockTime(value: string): string {
  const part = String(value ?? '').split('T')[1] ?? '';
  return part.slice(0, 5);
}

function uniq(list: string[]): string[] {
  return list.filter((item, index) => item && list.indexOf(item) === index);
}

// ---------------------------------------------------------------------------
// Advice rules
// ---------------------------------------------------------------------------

const THUNDER_CODES = [95, 96, 99];
const HEAVY_RAIN_CODES = [63, 65, 66, 67, 81, 82];
const SHOWER_CODES = [51, 53, 55, 61, 80];
const FOG_CODES = [45, 48];

interface RuleInput {
  now: CurrentConditions;
  today: DayForecast;
  windows: VisitWindow[];
}

/**
 * Turns one day of forecast data into short, layered recommendations.
 * Items only appear when their trigger is actually met, so a dry, mild day
 * produces a couple of lines instead of a wall of weather-speak.
 */
function buildAdvice({ now, today, windows }: RuleInput): WeatherAdvice {
  const alerts: string[] = [];
  const outfit: string[] = [];
  const plan: string[] = [];
  const pack: string[] = [];

  const thunder = THUNDER_CODES.includes(today.code);
  const heavyRain = HEAVY_RAIN_CODES.includes(today.code);
  const showers = SHOWER_CODES.includes(today.code);
  const fog = FOG_CODES.includes(today.code);
  const likelyRain = today.rainChance >= 60;
  const wetDay = thunder || heavyRain || showers || likelyRain || today.rainSum >= 2;

  // --- Storm safety first: it outranks every comfort tip -------------------
  if (thunder) {
    alerts.push('alertThunder');
    plan.push('planThunder');
  }

  if (heavyRain) {
    alerts.push('alertRainHeavy');
    plan.push('planRainHeavy');
    pack.push('packRainHeavy');
  } else if (!thunder && likelyRain) {
    outfit.push('outfitRain6');
    plan.push('planRain6');
    pack.push('packRain6');
  } else if (!thunder && showers) {
    outfit.push('outfitRainLight');
    plan.push('planRainLight');
    pack.push('packRainLight');
  }

  if (today.windForce >= 7) {
    alerts.push('alertWind7');
    plan.push('planWind7');
  } else if (today.windForce >= 5) {
    outfit.push('outfitWind56');
    plan.push('planWind56');
    pack.push('packWind56');
  }

  if (fog) {
    alerts.push('alertFog');
    plan.push('planFog');
    pack.push('packFog');
  }

  // --- Heat, humidity and UV ----------------------------------------------
  if (today.tMax >= 32) {
    outfit.push('outfitHot');
    plan.push('planHot');
    pack.push('packHot');
  } else if (today.tMin >= 24) {
    outfit.push('outfitWarmNight');
  }

  if (today.uvMax >= 5) {
    outfit.push('outfitUv');
    pack.push('packUv');
  }

  if (now.humidity >= 80 && today.tMax >= 30) {
    outfit.push('outfitMuggy');
  }

  if (today.tMax - today.tMin > 8) {
    outfit.push('outfitDiurnal');
  }

  if (today.tMax <= 10) {
    outfit.push('outfitCold');
    pack.push('packCold');
  }

  // --- Timing: which opening window actually works today ------------------
  const morning = windows.find((w) => w.key === 'morning');
  const afternoon = windows.find((w) => w.key === 'afternoon');
  if (morning && afternoon) {
    const gap = afternoon.rainChance - morning.rainChance;
    if (gap >= 25 || (morning.rainChance < 40 && afternoon.rainChance >= 60)) {
      plan.unshift('planWindowMorning');
    } else if (gap <= -25) {
      plan.unshift('planWindowAfternoon');
    } else if (afternoon.uv - morning.uv >= 3) {
      plan.unshift('planWindowUv');
    }
  }

  // --- Sky condition, only when nothing more urgent is happening ----------
  if (!wetDay && !fog) {
    if (today.code === 0 || today.code === 1) {
      outfit.push('outfitClear');
      plan.push('planClear');
      pack.push('packClear');
    } else if (today.code === 2 || today.code === 3) {
      outfit.push('outfitCloudy');
      plan.push('planCloudy');
    }
  }

  // Standing note about the palace's own opening rhythm.
  plan.push('planHours');

  return {
    alerts: uniq(alerts).slice(0, 3),
    outfit: uniq(outfit).slice(0, 4),
    plan: uniq(plan).slice(0, 4),
    pack: uniq(pack).slice(0, 4),
  };
}

/** The one-line headline for a single day in the seven-day strip. */
function dayTip(day: Omit<DayForecast, 'tip'>): string {
  if (THUNDER_CODES.includes(day.code)) return 'tipThunder';
  if (day.windForce >= 7) return 'tipWind';
  if (HEAVY_RAIN_CODES.includes(day.code) || day.rainSum >= 10) return 'tipRainHeavy';
  if (day.rainChance >= 60) return 'tipRain';
  if (day.tMax >= 33 && day.uvMax >= 8) return 'tipHotUv';
  if (day.tMax >= 32) return 'tipHot';
  if (day.uvMax >= 6) return 'tipUv';
  if (day.code <= 1) return 'tipClear';
  if (day.code <= 3) return 'tipCloudy';
  return 'tipMild';
}

// ---------------------------------------------------------------------------
// Fetching + caching
// ---------------------------------------------------------------------------

const query = new URLSearchParams({
  latitude: String(LATITUDE),
  longitude: String(LONGITUDE),
  current: [
    'temperature_2m',
    'relative_humidity_2m',
    'apparent_temperature',
    'is_day',
    'precipitation',
    'weather_code',
    'wind_speed_10m',
  ].join(','),
  hourly: [
    'temperature_2m',
    'precipitation_probability',
    'uv_index',
    'wind_speed_10m',
    'weather_code',
  ].join(','),
  daily: [
    'weather_code',
    'temperature_2m_max',
    'temperature_2m_min',
    'sunrise',
    'sunset',
    'uv_index_max',
    'precipitation_sum',
    'precipitation_probability_max',
    'wind_speed_10m_max',
  ].join(','),
  timezone: TIMEZONE,
  forecast_days: '7',
});

const ENDPOINT = `${FORECAST_ENDPOINT}?${query.toString()}`;

let cache: { storedAt: number; data: WeatherData | null } | null = null;
let inFlight: Promise<WeatherData | null> | null = null;

function buildWindows(hourly: any, today: string): VisitWindow[] {
  const times: string[] = hourly?.time ?? [];
  const temps: number[] = hourly?.temperature_2m ?? [];
  const rainProbs: number[] = hourly?.precipitation_probability ?? [];
  const uvs: number[] = hourly?.uv_index ?? [];
  const winds: number[] = hourly?.wind_speed_10m ?? [];

  return WINDOWS.map(({ key, startHour, endHour }) => {
    const idx: number[] = [];
    times.forEach((t, i) => {
      if (!String(t).startsWith(today)) return;
      const hour = Number(String(t).slice(11, 13));
      if (hour >= startHour && hour < endHour) idx.push(i);
    });
    if (idx.length === 0) return null;

    const pick = (arr: number[], reduce: 'max' | 'mean') => {
      const values = idx.map((i) => Number(arr[i]) || 0);
      if (reduce === 'max') return Math.round(Math.max(...values));
      return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
    };

    return {
      key,
      temp: pick(temps, 'mean'),
      rainChance: pick(rainProbs, 'max'),
      windForce: windForceFromKmh(pick(winds, 'max')),
      uv: pick(uvs, 'max'),
    } satisfies VisitWindow;
  }).filter((w): w is VisitWindow => w !== null);
}

function normalise(raw: any): WeatherData {
  const current = raw?.current ?? {};
  const daily = raw?.daily ?? {};
  const dates: string[] = daily?.time ?? [];

  const codes: number[] = daily?.weather_code ?? [];
  const maxes: number[] = daily?.temperature_2m_max ?? [];
  const mins: number[] = daily?.temperature_2m_min ?? [];
  const uvMaxes: number[] = daily?.uv_index_max ?? [];
  const rainSums: number[] = daily?.precipitation_sum ?? [];
  const rainProbs: number[] = daily?.precipitation_probability_max ?? [];
  const windMaxes: number[] = daily?.wind_speed_10m_max ?? [];
  const sunrises: string[] = daily?.sunrise ?? [];
  const sunsets: string[] = daily?.sunset ?? [];

  const days: DayForecast[] = dates.slice(0, 7).map((date, i) => {
    const base: Omit<DayForecast, 'tip'> = {
      date,
      weekday: new Date(`${date}T00:00:00`).getDay(),
      code: clampInt(codes[i], 3),
      icon: weatherIcon(codes[i]),
      tMax: clampInt(maxes[i], 33),
      tMin: clampInt(mins[i], 25),
      rainChance: clampInt(rainProbs[i], 0),
      rainSum: Math.round((Number(rainSums[i]) || 0) * 10) / 10,
      uvMax: clampInt(uvMaxes[i], 0),
      windForce: windForceFromKmh(windMaxes[i] ?? 0),
      sunrise: clockTime(sunrises[i] ?? ''),
      sunset: clockTime(sunsets[i] ?? ''),
    };
    return { ...base, tip: dayTip(base) };
  });

  const today =
    days[0] ??
    ({
      date: new Date().toISOString().slice(0, 10),
      weekday: new Date().getDay(),
      code: 2,
      icon: weatherIcon(2),
      tMax: 33,
      tMin: 25,
      rainChance: 40,
      rainSum: 0,
      uvMax: 7,
      windForce: 3,
      sunrise: '05:50',
      sunset: '18:10',
      tip: 'tipMild',
    } as DayForecast);

  const windSpeed = clampInt(current?.wind_speed_10m, 0);
  const now: CurrentConditions = {
    temperature: clampInt(current?.temperature_2m, today.tMax),
    apparent: clampInt(current?.apparent_temperature, today.tMax),
    humidity: clampInt(current?.relative_humidity_2m, 70),
    windSpeed,
    windForce: windForceFromKmh(windSpeed),
    precipitation: Math.round((Number(current?.precipitation) || 0) * 10) / 10,
    code: clampInt(current?.weather_code, today.code),
    icon: weatherIcon(current?.weather_code ?? today.code),
    isDay: current?.is_day !== 0,
  };

  const windows = buildWindows(raw?.hourly, today.date);

  return {
    now,
    days,
    windows,
    advice: buildAdvice({ now, today, windows }),
    updatedAt: current?.time ?? new Date().toISOString(),
  };
}

/**
 * Returns the cached forecast, refreshing it when older than the TTL.
 * Any failure resolves to `null` so the page can render its own fallback
 * instead of breaking.
 */
export async function getWeather(): Promise<WeatherData | null> {
  const now = Date.now();
  if (cache && now - cache.storedAt < CACHE_TTL_MS) return cache.data;
  if (inFlight) return inFlight;

  inFlight = (async () => {
    try {
      const response = await fetch(ENDPOINT, {
        headers: { accept: 'application/json' },
        // Edge caches keep the upstream call down to one per half hour.
        cf: { cacheTtl: 1800, cacheEverything: true },
      } as unknown as RequestInit);

      if (!response.ok) throw new Error(`forecast request failed: ${response.status}`);

      const data = normalise(await response.json());
      cache = { storedAt: Date.now(), data };
      return data;
    } catch {
      // Keep the last good payload if we have one; otherwise report failure.
      cache = { storedAt: Date.now(), data: cache?.data ?? null };
      return cache.data;
    } finally {
      inFlight = null;
    }
  })();

  return inFlight;
}
