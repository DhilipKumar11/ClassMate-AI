import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { NetworkBanner } from "../common/NetworkBanner";
import { useNetworkStatus } from "../../hooks/useNetworkStatus";

export function AppShell() {
  const { isOnline } = useNetworkStatus();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="hero-orb left-[6%] top-24 h-60 w-60 bg-[var(--accent)]" />
      <div className="hero-orb right-[8%] top-40 h-80 w-80 bg-[var(--accent-soft)]" />
      <NetworkBanner isOnline={isOnline} />
      <Navbar />
      <main className="pb-20 pt-10">
        <Outlet />
      </main>
    </div>
  );
}

