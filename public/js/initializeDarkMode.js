import setDarkMode from "./darkmode.js";

export default function initializeDarkMode(){
  const theme = localStorage.getItem("theme");
    if(theme === "dark") {
      setDarkMode();
    }
}