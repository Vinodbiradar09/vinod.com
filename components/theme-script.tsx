import { THEME_STORAGE_KEY } from "@/lib/theme";

const themeScript = `(function(){var d=matchMedia('(prefers-color-scheme: dark)').matches;try{var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(t)d=t==='dark'}catch(e){}var r=document.documentElement;r.classList.toggle('dark',d);r.style.colorScheme=d?'dark':'light'})()`;

export function ThemeScript() {
  return (
    <script id="theme-preference" suppressHydrationWarning>
      {themeScript}
    </script>
  );
}
