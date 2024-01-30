import { AccountDetails } from "@/components/AccountDetails/AccountDetails";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";

export default function AccountDetailsPage() {
  return (
    <div className="wrapper">
      <Header />
      <AccountDetails />
      <Footer />
    </div>
  );
}
