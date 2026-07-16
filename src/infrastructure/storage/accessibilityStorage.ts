// src/infrastructure/storage/accessibilityStorage.ts

export type AccessibilitySettings = {
  fontSize: number;
  highContrast: boolean;
  simplifiedMode: boolean;
};

const KEY = "seniorEase:accessibility";

export function loadAccessibility(): AccessibilitySettings {
  const data = localStorage.getItem(KEY);

  if (!data) {
    return {
      fontSize: 16,
      highContrast: false,
      simplifiedMode: false,
    };
  }

  return JSON.parse(data);
}

export function saveAccessibility(data: AccessibilitySettings) {
  localStorage.setItem(KEY, JSON.stringify(data));
}