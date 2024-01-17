import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { ImportantQuestions } from "@/components/ImportantQuestions/ImportantQuestions";

export default function Home() {
  return (
    <main className="wrapper">
      <Header />
      <ImportantQuestions />
      <Footer />
    </main>
  );
}
