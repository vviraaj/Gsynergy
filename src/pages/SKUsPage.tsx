import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Modal, Input, Button, Select } from "antd";
import { Calendar, Pencil, Plus, Trash2 } from "lucide-react";
import { addSKU, updateSKU, removeSKU } from "../redux/skuSlice";
import { RootState } from "../redux/store";
import { classSkusUnique, defaultSkus, DepartmentSkus, SKU } from "../types";
import { toast, ToastContainer } from "react-toastify";
import FormModal from "../components/formModal";
import { addWeekSales, updateWeekSales } from "../redux/weekSalesSlice";
import CalendarMarkedModal from "../components/markedCalendarModal";

export default function SKUsPage() {
  const dispatch = useDispatch();
  const skus = useSelector((state: RootState) => state.skus.skus);
  const stores = useSelector((state: RootState) => state.stores.stores);
  const weekSales = useSelector(
    (state: RootState) => state.weekSales.weekSales
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [markedModalOpen, setMarkedModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>(defaultSkus);
  const [markedModalId, SetMarkedModalId] = useState<string>("");

  const openModal = (sku: SKU | null = null) => {
    setFormData(sku ? sku : defaultSkus);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData(defaultSkus);
    setMarkedModalOpen(false);
    SetMarkedModalId("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    let numericValue = Number(value);

    if (name === "week") {
      if (numericValue < 1 || numericValue > 52) {
        toast.error("week should be from 1 to 52 ");
        return;
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    const {
      name,
      price,
      cost,
      storeId,
      classType,
      department,
      salesUnits,
      week,
      id,
    } = formData;

    if (
      !name.trim() ||
      isNaN(price) ||
      isNaN(cost) ||
      !storeId ||
      !classType ||
      !department ||
      isNaN(salesUnits)
    ) {
      toast.error("All fields are mandatory");
      return;
    }

    const newSKU: SKU = {
      id: id ? id : Date.now().toString(),
      name,
      price,
      cost,
      storeId,
      classType,
      department,
      salesUnits,
      week,
    };

    if (id) {
      dispatch(updateSKU(newSKU));
    } else {
      dispatch(addSKU(newSKU));
    }

    closeModal();
  };

  const handleMarkedOpenCalendar = (id: string) => {
    const findDta: any = skus?.find((item) => item?.id === id);
    setFormData(findDta);
    setMarkedModalOpen(true);
    SetMarkedModalId(id);
  };

  const handleDelete = (id: string) => {
    dispatch(removeSKU(id));
  };

  const columns = [
    {
      title: "",
      key: "delete",
      render: (_: any, record: SKU) => (
        <Button type="text" danger onClick={() => handleDelete(record.id)}>
          <Trash2 size={18} />
        </Button>
      ),
      width: 60,
    },
    {
      title: "S. No",
      key: "serial",
      render: (_: any, __: SKU, index: number) => index + 1,
      width: 80,
    },
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price}`,
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
      render: (cost: number) => `$${cost}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: SKU) => (
        <div className=" flex justify-start items-center space-x-4">
          <Button type="link" onClick={() => openModal(record)}>
            <Pencil size={18} /> Edit
          </Button>
          <Button
            type="link"
            onClick={() => handleMarkedOpenCalendar(record?.id)}
          >
            <Calendar size={18} /> Mark Calendar
          </Button>
        </div>
      ),
    },
  ];

 

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">SKUs</h1>
        <Button
          type="primary"
          icon={<Plus />}
          onClick={() => openModal()}
          size="large"
        >
          Add SKU
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={skus}
        rowKey="id"
        pagination={false}
      />
      <FormModal
        formData={formData}
        modalOpen={modalOpen}
        closeModal={closeModal}
        handleSave={handleSave}
        handleChange={handleChange}
        handleSelectChange={handleSelectChange}
        stores={stores}
        classSkusUnique={classSkusUnique}
        DepartmentSkus={DepartmentSkus}
      />

      <CalendarMarkedModal
        markedModalOpen={markedModalOpen}
        closeModal={closeModal}
        formData={formData}
        setFormData={setFormData}
        markedModalId={markedModalId}
        weekSales={weekSales}
      />

      <ToastContainer />
    </div>
  );
}
