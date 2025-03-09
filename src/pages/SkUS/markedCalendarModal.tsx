import { Modal, Select, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { updateWeekSales } from "../../redux/weekSalesSlice";
import { updateSKU } from "../../redux/skuSlice";
import { RootState } from "../../redux/store";
import { toast } from "react-toastify";
import { SKU } from "../../types";

interface WeekSale {
  id: string;
  skuId: string;
  week: number;
  salesUnits: number;
  cost: number;
  price: number;
  storeId?: string;
}

interface CalendarMarkedModalProps {
  markedModalOpen: boolean;
  closeModal: () => void;
  formData: SKU;
  setFormData: React.Dispatch<React.SetStateAction<SKU>>;
  markedModalId: string;
  weekSales: WeekSale[];
}

const CalendarMarkedModal: React.FC<CalendarMarkedModalProps> = ({
  markedModalOpen,
  closeModal,
  formData,
  setFormData,
  markedModalId,
  weekSales,
}) => {
  const dispatch = useDispatch();
  const [localWeekSales, setLocalWeekSales] = useState<
    Record<number, WeekSale>
  >({});
  const skus = useSelector((state: RootState) => state.skus.skus);

  useEffect(() => {
    if (!markedModalId || !weekSales || !markedModalOpen) return;

    const newSalesData: Record<number, WeekSale> = formData.week.reduce(
      (acc, week: any) => {
        const existingWeekData = weekSales.find(
          (item) => item.skuId === markedModalId && item.week === week
        );

        acc[week] = existingWeekData
          ? { ...existingWeekData }
          : {
              id: Date.now().toString(),
              skuId: markedModalId,
              week,
              salesUnits: 0,
              cost: 0,
              price: 0,
              storeId: formData?.storeId,
            };

        return acc;
      },
      {} as Record<number, WeekSale>
    );

    setLocalWeekSales(newSalesData);
  }, [formData.week, weekSales, markedModalId, markedModalOpen]);

  const handleInputChange = (
    week: number,
    field: keyof WeekSale,
    value: number
  ) => {
    if (value < 0) {
      toast.error("Value cannot be less than 0");
      return;
    }

    setLocalWeekSales((prev) => ({
      ...prev,
      [week]: { ...prev[week], [field]: value },
    }));
  };

  const handleSave = () => {
    const findDta: SKU | undefined = skus.find(
      (item) => item.id === markedModalId
    );
    if (!findDta) return;

    const newDdata: SKU = {
      ...findDta,
      week: formData.week,
    };

    dispatch(updateSKU(newDdata));

    Object.values(localWeekSales).forEach((weekData: any) => {
      dispatch(updateWeekSales(weekData));
    });

    closeModal();
  };

  return (
    <Modal
      title="Calendar Marked"
      open={markedModalOpen}
      onCancel={closeModal}
      onOk={handleSave}
      width={600}
    >
      <div className="w-full">
        <label>
          Week<span className="text-red-400">*</span>
        </label>
        <Select
          mode="multiple"
          placeholder="Select Weeks (1-52)"
          value={formData.week}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, week: value }))
          }
          className="w-full"
          size="large"
          dropdownMatchSelectWidth={false}
          getPopupContainer={(triggerNode) => triggerNode.parentNode}
          placement="topLeft"
        >
          {Array.from({ length: 52 }, (_, i) => (
            <Select.Option key={i + 1} value={i + 1}>
              {i + 1}
            </Select.Option>
          ))}
        </Select>
      </div>

      {formData.week.length > 0 && (
        <div className="max-h-[50vh] overflow-y-auto p-2 mt-5 border rounded">
          {formData.week.map((week: any) => (
            <div key={week} className="mt-4 p-4 border rounded">
              <h3 className="text-lg font-semibold">Week {week}</h3>
              <div className="flex justify-start items-center space-x-2">
                <div>
                  <label>
                    Sales Unit<span className="text-red-400">*</span>
                  </label>
                  <Input
                    placeholder="Sales Units"
                    type="number"
                    value={localWeekSales[week]?.salesUnits || ""}
                    onChange={(e) =>
                      handleInputChange(
                        week,
                        "salesUnits",
                        Number(e.target.value)
                      )
                    }
                  />
                </div>

                {/* Cost Input */}
                <div>
                  <label>
                    Cost<span className="text-red-400">*</span>
                  </label>
                  <Input
                    placeholder="Cost"
                    type="number"
                    value={localWeekSales[week]?.cost || ""}
                    onChange={(e) =>
                      handleInputChange(week, "cost", Number(e.target.value))
                    }
                  />
                </div>

                {/* Price Input */}
                <div>
                  <label>
                    Price<span className="text-red-400">*</span>
                  </label>
                  <Input
                    placeholder="Price"
                    type="number"
                    value={localWeekSales[week]?.price || ""}
                    onChange={(e) =>
                      handleInputChange(week, "price", Number(e.target.value))
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
};

export default CalendarMarkedModal;
