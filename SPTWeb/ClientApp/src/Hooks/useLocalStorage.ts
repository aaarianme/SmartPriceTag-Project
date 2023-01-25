import { useState } from "react";

export default function useLocalStorage() {
  function get<T>(key: string): T | null {
    var item = localStorage.getItem(key);
    if (item == null) {
      return null;
    }
    return JSON.parse(item) as T;
  }
  function remove(key: string) {
    localStorage.removeItem(key);
  }
  function set(key: string, val: any) {
    remove(key);
    localStorage.setItem(key, JSON.stringify(val));
  }
  return [get, set, remove] as const;
}
