import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { RootState } from "../redux/store";

export default function ChartsPage() {
  const [selectedStore, setSelectedStore] = useState("");

  const weekSales = useSelector(
    (state: RootState) => state.weekSales.weekSales
  );

  const stores = useSelector((state: RootState) => state.stores.stores);

  const chartData = useMemo(() => {
    if (!selectedStore) return [];

    const groupedData: Record<string, any> = {};

    weekSales.forEach((sale) => {
      if (sale.storeId !== selectedStore) return;
      const weekKey = `week${sale.week}`;

      if (!groupedData[weekKey]) {
        groupedData[weekKey] = {
          week: weekKey,
          weekNumber: sale.week,
          gmDollars: 0,
          gmPercentage: 0,
          totalSalesDollars: 0,
        };
      }

      groupedData[weekKey].gmDollars +=
        sale.salesUnits * (sale.price - sale.cost);
      groupedData[weekKey].totalSalesDollars += sale.salesUnits * sale.price;

      groupedData[weekKey].gmPercentage =
        groupedData[weekKey].totalSalesDollars !== 0
          ? (
              (groupedData[weekKey].gmDollars /
                groupedData[weekKey].totalSalesDollars) *
              100
            ).toFixed(2)
          : 0;
    });

    return Object.values(groupedData).sort(
      (a, b) => a.weekNumber - b.weekNumber
    );
  }, [selectedStore, weekSales]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Charts</h1>
        <select
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm"
          value={selectedStore}
          onChange={(e) => setSelectedStore(e.target.value)}
        >
          <option value="">Select a store...</option>
          {stores.map((store) => (
            <option key={store.id} value={store.id}>
              {store.name}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-lg border bg-white p-6">
        {chartData.length > 0 ? (
          <BarChart width={1000} height={500} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis
              yAxisId="left"
              label={{ value: "GM $", angle: -90, position: "insideLeft" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{ value: "GM %", angle: -90, position: "insideRight" }}
            />
            <Tooltip />
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="gmDollars"
              fill="#4F46E5"
              name="GM $"
            />
            <Bar
              yAxisId="right"
              dataKey="gmPercentage"
              fill="#10B981"
              name="GM %"
            />
          </BarChart>
        ) : (
          <p className="text-gray-500">
            Please select a store to view the chart.
          </p>
        )}
      </div>
    </div>
  );
}
