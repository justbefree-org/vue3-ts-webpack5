import { logInfo } from "@/config";
logInfo();
import { default as Platform } from "@/core/Platform";
import App from "./App.vue";
import "./registerServiceWorker";
import { overwriteApps } from "@/overwrite";
const p = new Platform({ id: "#app", App });
p.install("test");
p.install(overwriteApps);
p.startUp((app) => {
  console.log(app);
});
