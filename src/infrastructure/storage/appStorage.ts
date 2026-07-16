// src/infrastructure/storage/appStorage.ts

const KEY = "seniorEase:app";

export type AppSettings = {
  firstAccess: boolean;
};

export function loadAppSettings(): AppSettings {
  const data = localStorage.getItem(KEY);

  if (!data) {
    return { firstAccess: true };
  }

  return JSON.parse(data);
}

export function saveAppSettings(data: AppSettings) {
  localStorage.setItem(KEY, JSON.stringify(data));
}