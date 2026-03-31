import { Ionicons } from "@expo/vector-icons";

export type Service = {
  id: number;
  changeEvery: number;
  title: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
};
