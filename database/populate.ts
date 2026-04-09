export const runPopulate = async (db: any) => {
  const BASE_SERVICES = [
    {
      changeEvery: 2500,
      title: "Cambio de aceite",
      icon: "color-fill-outline",
    },
    {
      changeEvery: 2000,
      title: "Cevisión Filtro de Aire",
      icon: "barcode-outline",
    },
    { changeEvery: 5000, title: "Revisión Frenos", icon: "disc-outline" },
    {
      changeEvery: 20000,
      title: "Revisión Estado Bujía",
      icon: "flash-outline",
    },
    {
      changeEvery: 20000,
      title: "Revisión de Batería",
      icon: "battery-dead-outline",
    },
    {
      changeEvery: 5000,
      title: "Revisión Tensión de Cadena",
      icon: "link-outline",
    },
  ];

  for (const service of BASE_SERVICES) {
    await db.runAsync(`DROP TABLE service_logs`);
    await db.runAsync(
      `INSERT INTO services (changeEvery, title, icon) VALUES (?, ?, ?)`,
      [service.changeEvery, service.title, service.icon],
    );
  }
};
