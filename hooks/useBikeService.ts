import { createBikeRepository } from "@/database/repositories/bike.repository";
import { createBikeService } from "@/database/services/bike.service";
import { useSQLiteContext } from "expo-sqlite";

export function useBikeService() {
  const db = useSQLiteContext();

  const repository = createBikeRepository(db);
  return createBikeService(repository);
}
