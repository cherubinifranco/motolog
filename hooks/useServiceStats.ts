import { ServiceLog } from "@/types/ServiceLog";

export const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

type MonthlyStats = {
  month: number;
  totalSpent: number;
  totalServices: number;
};

type BikeStats = {
  totalSpent: number;
  totalServices: number;
  averageCost: number;
};

export function useServiceStats(logs: ServiceLog[]) {
  const monthly: MonthlyStats[] = Array.from({ length: 12 }, (_, i) => ({
    month: i,
    totalSpent: 0,
    totalServices: 0,
  }));

  const byBike: Record<number, BikeStats> = {};

  let totalSpent = 0;
  let totalServices = logs.length;

  logs.forEach((log) => {
    const date = new Date(log.serviceDate);
    const month = date.getMonth();

    const bikeId = log.bikeId;

    monthly[month].totalSpent += log.cost || 0;
    monthly[month].totalServices += 1;

    totalSpent += log.cost || 0;

    if (!byBike[bikeId]) {
      byBike[bikeId] = {
        totalSpent: 0,
        totalServices: 0,
        averageCost: 0,
      };
    }

    byBike[bikeId].totalSpent += log.cost || 0;
    byBike[bikeId].totalServices += 1;
  });

  Object.keys(byBike).forEach((id) => {
    const bike = byBike[Number(id)];
    bike.averageCost =
      bike.totalServices > 0 ? bike.totalSpent / bike.totalServices : 0;
  });

  const averageCost = totalServices > 0 ? totalSpent / totalServices : 0;

  const mostExpensiveMonth = monthly.reduce((max, curr) =>
    curr.totalSpent > max.totalSpent ? curr : max,
  );

  const mostActiveMonth = monthly.reduce((max, curr) =>
    curr.totalServices > max.totalServices ? curr : max,
  );

  return {
    monthly,
    totalSpent,
    totalServices,
    averageCost,
    mostExpensiveMonth,
    mostActiveMonth,
    byBike,
  };
}
