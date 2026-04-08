import { createServiceLogsRepository } from "@/database/repositories/serviceLogs.repository.ts";
import { createserviceLogService } from "@/database/services/serviceLogs.service";
import { useSQLiteContext } from "expo-sqlite";

export function useServiceLogService() {
  const db = useSQLiteContext();

  const repository = createServiceLogsRepository(db);
  return createserviceLogService(repository);
}
