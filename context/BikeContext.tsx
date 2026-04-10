import { Bike, NewBike, UpdateBike } from "@/types/Bike";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { useBikeService } from "@/hooks/useBikeService";

type BikeContextType = {
  bikes: Bike[];
  selectedBike: Bike | null;
  setSelectedBike: (bike: Bike) => void;

  loading: boolean;
  error: Error | null;
  getBikeById: (id: number) => Promise<Bike>;
  loadBikes: () => Promise<void>;
  createBike: (bike: NewBike) => Promise<number>;
  updateBike: (bike: UpdateBike) => Promise<void>;
  deleteBike: (id: number) => Promise<void>;
};

const BikeContext = createContext<BikeContextType | undefined>(undefined);

export const BikeProvider = ({ children }: { children: ReactNode }) => {
  const {
    getBikes,
    getBikeById: getBikeByIdService,
    createBike: createBikeService,
    updateBike: updateBikeService,
    deleteBike: deleteBikeService,
  } = useBikeService();

  const [bikes, setBikes] = useState<Bike[]>([]);
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadBikes = async () => {
    try {
      setLoading(true);
      const data = await getBikes();
      setBikes(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const getBikeById = async (id: number) => {
    try {
      const bike = await getBikeByIdService(id);
      return bike;
    } catch (err) {
      setError(err as Error);
    }
  };

  const createBike = async (bike: NewBike) => {
    try {
      const newBike = await createBikeService(bike);

      setBikes((prev) => [...prev, newBike]);
      setSelectedBike(newBike);
      return newBike.id;
    } catch (err) {
      setError(err as Error);
    }
  };

  const updateBike = async (bike: UpdateBike) => {
    try {
      await updateBikeService(bike);

      setBikes((prev) =>
        prev.map((b) => (b.id === bike.id ? { ...b, ...bike } : b)),
      );
      setSelectedBike((prev) =>
        prev && prev.id === bike.id ? { ...prev, ...bike } : prev,
      );
    } catch (err) {
      setError(err as Error);
    }
  };

  const deleteBike = async (id: number) => {
    try {
      await deleteBikeService(id);

      setBikes((prev) => prev.filter((b) => b.id !== id));

      setSelectedBike((prev) => {
        if (!prev) return null;
        if (prev.id !== id) return prev;

        return bikes.length > 1 ? bikes.find((b) => b.id !== id) || null : null;
      });
    } catch (err) {
      setError(err as Error);
    }
  };

  useEffect(() => {
    loadBikes();
  }, []);

  useEffect(() => {
    if (bikes.length > 0 && !selectedBike) {
      setSelectedBike(bikes[0]);
    }
  }, [bikes]);

  return (
    <BikeContext.Provider
      value={{
        bikes,
        getBikeById,
        selectedBike,
        setSelectedBike,
        loading,
        error,
        loadBikes,
        createBike,
        updateBike,
        deleteBike,
      }}
    >
      {children}
    </BikeContext.Provider>
  );
};

export const useBikeContext = () => {
  const context = useContext(BikeContext);
  if (!context) {
    throw new Error("useBikeContext must be used inside BikeProvider");
  }
  return context;
};
