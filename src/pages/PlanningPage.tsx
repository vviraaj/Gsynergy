import React, { useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { updateWeekSales } from "../redux/weekSalesSlice";
import { updateSKU } from "../redux/skuSlice";
import { SKU } from "../types";

export default function PlanningPage() {
  const dispatch = useDispatch();
  const weekSales = useSelector(
    (state: RootState) => state.weekSales.weekSales
  );
  const skus = useSelector((state: RootState) => state.skus.skus);

  // Group data for AG Grid
  const rowData = useMemo(() => {
    const groupedData: Record<string, any> = {};

    weekSales.forEach((sale) => {
      const key = `${sale.storeId}-${sale.skuId}`;

      if (!groupedData[key]) {
        groupedData[key] = {
          store: sale.storeId,
          sku: sale.skuId,
          cost: sale.cost,
          price: sale.price,
          id: sale.id,
        };

        for (let i = 1; i <= 52; i++) {
          groupedData[key][`salesUnits${i}`] = 0;
          groupedData[key][`salesDollars${i}`] = 0;
          groupedData[key][`gmDollars${i}`] = 0;
          groupedData[key][`gmPercent${i}`] = 0;
        }
      }

      groupedData[key][`salesUnits${sale.week}`] = sale.salesUnits || 0;
      groupedData[key][`salesDollars${sale.week}`] =
        sale.salesUnits * sale.price || 0;
      groupedData[key][`gmDollars${sale.week}`] =
        sale.salesUnits * sale.price - sale.salesUnits * sale.cost || 0;

      const salesDollars = groupedData[key][`salesDollars${sale.week}`];
      const gmDollars = groupedData[key][`gmDollars${sale.week}`];
      groupedData[key][`gmPercent${sale.week}`] =
        salesDollars !== 0 ? (gmDollars / salesDollars) * 100 : 0;
    });

    return Object.values(groupedData);
  }, [weekSales]);

  // Handle cell value change for salesUnits
  const onCellValueChanged = useCallback(
    (params: any) => {
      const {
        column: { colId },
        newValue,
        data,
      } = params;

      if (colId.startsWith("salesUnits")) {
        const week = parseInt(colId.replace("salesUnits", ""), 10);
        const salesUnits = parseInt(newValue) || 0;

        const findDta: SKU | undefined = skus.find(
          (item) => item.id === data?.sku
        );
        if (!findDta) return;

        const updatedWeeks: any = Array.isArray(findDta.week)
          ? [...new Set([...findDta.week, week])]
          : [week];

        const newDdata: SKU = {
          ...findDta,
          week: updatedWeeks,
        };

        dispatch(updateSKU(newDdata));

        const cost = findDta.cost || 0;
        const price = findDta.price || 0;

        dispatch(
          updateWeekSales({
            id: data.id,
            skuId: data.sku,
            storeId: data.store,
            week,
            salesUnits,
            cost,
            price,
          })
        );
      }
    },
    [dispatch, skus]
  );

  // Generate columns dynamically for all 52 weeks
  const columnDefs = useMemo(() => {
    let columns = [
      { headerName: "Store", field: "store", pinned: "left", width: 150 },
      { headerName: "SKU", field: "sku", pinned: "left", width: 150 },
    ];

    for (let i = 1; i <= 52; i++) {
      columns.push({
        headerName: `Week ${i}`,
        children: [
          {
            headerName: "Sales Units",
            field: `salesUnits${i}`,
            editable: true,
            valueParser: (params: any) => parseInt(params.newValue) || 0,
            width: 120,
          },
          {
            headerName: "Sales Dollars",
            field: `salesDollars${i}`,
            valueFormatter: (params: any) => `$${params.value?.toFixed(2)}`,
            width: 120,
          },
          {
            headerName: "GM Dollars",
            field: `gmDollars${i}`,
            valueFormatter: (params: any) => `$${params.value?.toFixed(2)}`,
            width: 120,
          },
          {
            headerName: "GM %",
            field: `gmPercent${i}`,
            valueFormatter: (params: any) => `${params.value?.toFixed(2)}%`,
            width: 100,
            cellStyle: (params: any) => {
              const value = params.value;
              if (value >= 40) {
                return { backgroundColor: "green", color: "white" };
              } else if (value >= 10 && value < 40) {
                return { backgroundColor: "yellow", color: "black" };
              } else if (value >= 5 && value < 10) {
                return { backgroundColor: "orange", color: "black" };
              } else {
                return { backgroundColor: "red", color: "white" };
              }
            },
          },
        ],
      });
    }
    return columns;
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Planning</h1>
      </div>

      <div className="ag-theme-alpine h-[calc(100vh-12rem)] w-full overflow-auto">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          onCellValueChanged={onCellValueChanged}
          defaultColDef={{ resizable: true, sortable: true }}
          domLayout="autoHeight"
        />
      </div>
    </div>
  );
}
