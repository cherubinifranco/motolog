import { Ionicons } from "@expo/vector-icons";

export type Service = {
  id: number;
  changeEvery: number;
  title: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
};

export type NewService = Omit<Service, "id">;

export type UpdateService = Partial<Omit<Service, "id">> & {
  id: number;
};

export type ServiceWithStatus = Service & {
  kmRemaining: number;
  changeAt: number;
};
