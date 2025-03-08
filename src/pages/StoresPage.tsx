import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Modal, Input, Button, Table, Select } from "antd";
import { Plus, GripVertical, Trash2, Pencil } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { cities, states, Store } from "../types";
import {
  addStore,
  updateStore,
  deleteStore,
  reorderStores,
} from "../redux/storeSlice";
import { toast, ToastContainer } from "react-toastify";

export default function StoresPage() {
  const dispatch = useDispatch();
  const stores = useSelector((state: RootState) => state.stores.stores);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingStore, setEditingStore] = useState<Store | null>(null);
  const [storeName, setStoreName] = useState<string>("");
  const [storeCity, setStoreCity] = useState<string>("");
  const [storeState, setStoreState] = useState<string>("");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = stores.findIndex((item) => item.id === active.id);
    const newIndex = stores.findIndex((item) => item.id === over.id);
    dispatch(reorderStores(arrayMove(stores, oldIndex, newIndex)));
  };

  const openModal = (store: Store | null = null) => {
    setEditingStore(store);
    setStoreName(store?.name || "");
    setStoreCity(store?.city || "");
    setStoreState(store?.state || "");
    setModalOpen(true);
  };

  const handleSaveStore = () => {
    if (!storeName.trim() || !storeCity.trim() || !storeState.trim()) {
      toast.error("All fields are mandatory!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (editingStore) {
      dispatch(
        updateStore({
          id: editingStore.id,
          name: storeName,
          city: storeCity,
          state: storeState,
          order: 0,
        })
      );
    } else {
      dispatch(
        addStore({
          id: Date.now().toString(),
          name: storeName,
          city: storeCity,
          state: storeState,
          order: 0,
        })
      );
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteStore(id));
  };

  const DraggableRow = ({ children, ...props }: any) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({
        id: props["data-row-key"],
      });

    const style = {
      ...props.style,
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <tr ref={setNodeRef} style={style} {...attributes}>
        {children}
      </tr>
    );
  };

  const DraggableIcon = ({ id }: { id: string }) => {
    const { attributes, listeners, setNodeRef } = useSortable({ id });

    return (
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className="cursor-grab active:cursor-grabbing"
      >
        <GripVertical size={20} />
      </div>
    );
  };

  const columns = [
    {
      title: "",
      key: "delete",
      render: (_: any, record: Store) => (
        <Button type="text" danger onClick={() => handleDelete(record.id)}>
          <Trash2 size={18} />
        </Button>
      ),
      width: 80,
    },
    {
      title: "",
      key: "drag",
      render: (_: any, record: Store) => <DraggableIcon id={record.id} />,
      width: 50,
    },
    {
      title: "S. No",
      key: "serial",
      render: (_: any, __: Store, index: number) => index + 1,
      width: 100,
    },
    { title: "Store Name", dataIndex: "name", key: "name" },
    { title: "City", dataIndex: "city", key: "city" },
    { title: "State", dataIndex: "state", key: "state" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Store) => (
        <Button type="link" onClick={() => openModal(record)}>
          <Pencil size={18} /> Edit
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Stores</h1>
        <Button
          type="primary"
          icon={<Plus />}
          onClick={() => openModal(null)}
          size="large"
        >
          Add Store
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={stores.map((store) => store.id)}
          strategy={verticalListSortingStrategy}
        >
          <Table
            components={{ body: { row: DraggableRow } }}
            rowKey="id"
            columns={columns}
            dataSource={stores}
            pagination={false}
          />
        </SortableContext>
      </DndContext>
      <Modal
        title={editingStore ? "Edit Store" : "Add Store"}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={handleSaveStore}
      >
        <div className=" mb-3">
          <label>
            Store Name<span className="text-red-400">*</span>
          </label>
          <Input
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            size="large"
          />
        </div>
        <div className=" mb-3">
          <label>
            City<span className="text-red-400">*</span>
          </label>
          <Select
            value={storeCity}
            onChange={setStoreCity}
            style={{ width: "100%" }}
            size="large"

            placeholder="Select City"
          >
            {cities.map((city) => (
              <Select.Option key={city} value={city}>
                {city}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className=" mb-3">
          <label>
            State<span className="text-red-400">*</span>
          </label>
          <Select
            value={storeState}
            onChange={setStoreState}
            style={{ width: "100%" }}
            placeholder="Select State"
            size="large"

          >
            {states.map((state) => (
              <Select.Option key={state} value={state}>
                {state}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Modal>

      <ToastContainer />
    </div>
  );
}
