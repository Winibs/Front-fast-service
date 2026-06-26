import { Signal, Wifi, BatteryFull } from "lucide-react";

export default function StatusBar() {
  return (
    <div className="statusbar">
      <span>9:41</span>
      <div className="sb-icons">
        <Signal size={15} />
        <Wifi size={15} />
        <BatteryFull size={17} />
      </div>
    </div>
  );
}
