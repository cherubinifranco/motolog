import { createServiceRepository } from "@/database/repositories/service.repository";
import { createServiceService } from "@/database/services/service.service";
import { useSQLiteContext } from "expo-sqlite";

export function useServiceService() {
  const db = useSQLiteContext();

  const repository = createServiceRepository(db);
  return createServiceService(repository);
}
