import { Bike } from "@/types/Bike";
import { useEffect, useState } from "react";

const MOCK_BIKES2: Bike[] = [];

const MOCK_BIKES: Bike[] = [
  {
    id: 1,
    brand: "Honda",
    model: "CBR 600 RR",
    year: "2023",
    currentKm: 15234,
  },
  { id: 2, brand: "Honda", model: "Storm 125", year: "2009", currentKm: 60245 },
  { id: 3, brand: "Yamaha", model: "YBR 125", year: "2011", currentKm: 34110 },
  { id: 4, brand: "CF", model: "450 R", year: "2024", currentKm: 7200 },
];

export const useBikes = () => {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadItems = async () => {
      try {
        await new Promise((res) => setTimeout(res, 500));
        setBikes(MOCK_BIKES2);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  return { bikes, loading, error };
};
