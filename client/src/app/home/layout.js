
import AppState from "@/context/AppState";
import "../globals.css";


export default function RootLayout({ children,trends,options }) {
  return (
    <AppState>
    <html lang="en">
      <body>
        <div className="flex flex-row">
            <div className="w-[35%] h-screen">{options}</div>
            <div className="w-[80%] h-screen">{children}</div>
            <div className="w-[45%] h-screen">{trends}</div>
        </div>
      </body>
    </html>
    </AppState>
  );
}
