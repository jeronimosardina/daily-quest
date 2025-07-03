import { toast } from "react-toastify";

export const notifyLevelUp = (level) =>
  toast(`🆙 Subiste al nivel ${level}!`, { type: "success" });
