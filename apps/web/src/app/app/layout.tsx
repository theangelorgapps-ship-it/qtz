import { MobileAppNavigation } from "@/components/app-navigation";
import { SiteHeader } from "@/components/site-header";

export default function MarketplaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="appPage">
      <SiteHeader />
      <main className="appMain">{children}</main>
      <MobileAppNavigation />
    </div>
  );
}
