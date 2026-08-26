import { MidsemTracker } from "@/components/midsem/MidsemTracker";

export const metadata = {
  title: "GTU Midsem Marks & SPI/CPI Calculator | GTU All In One",
  description: "Calculate internal eligibility, required target scores in 70-mark external GTU theory exam, and predict your semester SPI with GTU conversion formula (SPI - 0.5) * 10.",
};

export default function MidsemPage() {
  return <MidsemTracker />;
}
