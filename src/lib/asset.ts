// src/lib/asset.ts
// GitHub Pages でもローカルでも壊れないパスを作るためのヘルパー
export const withBase = (p: string) => `${import.meta.env.BASE_URL}${p}`;
