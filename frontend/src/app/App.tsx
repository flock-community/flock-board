import React from "react";
import "./App.css";
import { AppRouter } from "./AppRouter";
import { appInit } from "../util/app.init";

export function App() {
  appInit();
  return <AppRouter></AppRouter>;
}
