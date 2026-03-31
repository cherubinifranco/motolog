import { Maintenance } from "@/types/Maintenance";
import { useEffect, useState } from "react";

const MOCK_MAINTENANCE = [
  {
    id: 1,
    bikeId: 1,
    serviceId: 1,
    mileage: 12000,
    date: "2026-01-10",
    cost: 30000,
    note: "First ONE!!!!!",
  },
  {
    id: 2,
    bikeId: 1,
    serviceId: 2,
    mileage: 14000,
    date: "2026-02-15",
    cost: 8000,
    note: "getting a hands on the bike",
  },
  {
    id: 3,
    bikeId: 1,
    serviceId: 3,
    mileage: 10000,
    date: "2025-12-01",
    cost: 25000,
    note: "Extreamly long note to see how will the UI break if someone desides to write the full harry potter saga in a note. So this shouldn't be visible until you can enter the maintenance and edit stuff",
  },

  {
    id: 4,
    bikeId: 2,
    serviceId: 1,
    mileage: 58000,
    date: "2026-02-01",
    cost: 15000,
  },
  {
    id: 5,
    bikeId: 2,
    serviceId: 2,
    mileage: 60000,
    date: "2026-03-01",
    cost: 5000,
  },
  {
    id: 6,
    bikeId: 2,
    serviceId: 4,
    mileage: 50000,
    date: "2025-10-10",
    cost: 4000,
  },

  {
    id: 7,
    bikeId: 3,
    serviceId: 1,
    mileage: 30000,
    date: "2026-01-20",
    cost: 12000,
  },
  {
    id: 8,
    bikeId: 3,
    serviceId: 2,
    mileage: 33000,
    date: "2026-03-10",
    cost: 4000,
  },

  {
    id: 9,
    bikeId: 4,
    serviceId: 1,
    mileage: 1000,
    date: "2025-12-15",
    cost: 20000,
  },
  {
    id: 10,
    bikeId: 4,
    serviceId: 1,
    mileage: 5000,
    date: "2026-02-20",
    cost: 20000,
  },
];

export const useMaintenance = () => {
  const [items, setItems] = useState<Maintenance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadItems = async () => {
      await new Promise((resolve) => setTimeout(resolve, 20000));

      try {
        const data = MOCK_MAINTENANCE;
        setItems(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  return { items, loading, error };
};
