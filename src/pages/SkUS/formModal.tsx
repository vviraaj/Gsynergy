import { Input, Modal, Select } from "antd";
import React from "react";
import { SKU } from "../../types";

interface FormDataModalProps {
  formData: SKU;
  modalOpen: boolean;
  closeModal: () => void;
  handleSave: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (field: string, value: string) => void;
  stores: { id: string; name: string }[];
  classSkusUnique: string[];
  DepartmentSkus: string[];
}

const FormModal: React.FC<FormDataModalProps> = ({
  formData,
  modalOpen,
  closeModal,
  handleSave,
  handleChange,
  handleSelectChange,
  stores,
  classSkusUnique,
  DepartmentSkus,
}) => {
  return (
    <Modal
      title={formData?.id ? "Edit SKU" : "Add SKU"}
      open={modalOpen}
      onCancel={closeModal}
      onOk={handleSave}
      width={600}
    >
      <div className="flex justify-start items-center space-x-5">
        <div className="w-full">
          <label>
            SKU Name<span className="text-red-400">*</span>
          </label>
          <Input
            placeholder="Enter SKU Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            size="large"
          />
        </div>
        <div className="w-full">
          <label>
            Store<span className="text-red-400">*</span>
          </label>
          <Select
            placeholder="Select Store"
            value={formData.storeId}
            onChange={(value) => handleSelectChange("storeId", value)}
            className="w-full"
            size="large"
          >
            {stores.map((store) => (
              <Select.Option key={store.id} value={store.id}>
                {store.name}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>

      <div className="flex justify-start items-center space-x-5 mt-2">
        <div className="w-full">
          <label>
            Class<span className="text-red-400">*</span>
          </label>
          <Select
            placeholder="Select Class"
            value={formData.classType}
            onChange={(value) => handleSelectChange("classType", value)}
            className="w-full"
            size="large"
          >
            {classSkusUnique.map((cls) => (
              <Select.Option key={cls} value={cls}>
                {cls}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="w-full">
          <label>
            Department<span className="text-red-400">*</span>
          </label>
          <Select
            placeholder="Select Department"
            value={formData.department}
            onChange={(value) => handleSelectChange("department", value)}
            className="w-full"
            size="large"
          >
            {DepartmentSkus.map((dept) => (
              <Select.Option key={dept} value={dept}>
                {dept}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>

      <div className="flex justify-start items-center space-x-5 mt-2">
        <div className="w-full">
          <label>
            Price<span className="text-red-400">*</span>
          </label>
          <Input
            placeholder="Enter Price"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full"
            size="large"
            min={0}
          />
        </div>
        <div className="w-full">
          <label>
            Cost<span className="text-red-400">*</span>
          </label>
          <Input
            placeholder="Enter Cost"
            type="number"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            className="w-full"
            size="large"
            min={0}
          />
        </div>
      </div>

      <div className="flex justify-start items-center space-x-5 mt-2">
        <div className="w-full">
          <label>
            Sales Units<span className="text-red-400">*</span>
          </label>
          <Input
            placeholder="Enter Sales Units"
            type="number"
            name="salesUnits"
            value={formData.salesUnits}
            onChange={handleChange}
            className="w-full"
            size="large"
            min={0}
          />
        </div>
      </div>
    </Modal>
  );
};

export default FormModal;
