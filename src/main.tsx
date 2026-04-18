import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import sakuraBranchUrl from "@/assets/sakura-branch.png";

// Inject sakura branch as a CSS variable for floral card backgrounds
document.documentElement.style.setProperty("--sakura-branch-url", `url(${sakuraBranchUrl})`);

createRoot(document.getElementById("root")!).render(<App />);
