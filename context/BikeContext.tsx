import { useBikes } from "@/hooks/useBikes";
import { Bike } from "@/types/Bike";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type BikeContextType = {
  bikes: Bike[];
  selectedBike: Bike | null;
  setSelectedBike: (bike: Bike) => void;
};

const BikeContext = createContext<BikeContextType | undefined>(undefined);

export const BikeProvider = ({ children }: { children: ReactNode }) => {
  const { bikes } = useBikes();
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);

  useEffect(() => {
    if (bikes.length > 0 && !selectedBike) {
      setSelectedBike(bikes[0]);
    }
  }, [bikes]);

  return (
    <BikeContext.Provider value={{ bikes, selectedBike, setSelectedBike }}>
      {children}
    </BikeContext.Provider>
  );
};

export const useBikeContext = () => {
  const context = useContext(BikeContext);
  if (!context)
    throw new Error("useBikeContext must be used inside BikeProvider");
  return context;
};
