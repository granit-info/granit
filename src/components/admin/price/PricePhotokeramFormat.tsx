import { useContext, useState, useEffect } from "react";
import PriseContext from "../../../globalContext/PriceContext";
import {
  Table,
  Button,
  Modal,
  Form,
  InputNumber,
  Input,
  Space,
  Spin,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { PrisePhotokeramFormat } from "../../../interfaces/Price";

const PricePhotokeramFormat = () => {
  const context = useContext(PriseContext);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingData, setEditingData] = useState<PrisePhotokeramFormat[] | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (context && context.isPriceLoaded) {
      setEditingData(context.prisePhotokeramFormat || []); // Загружаем данные из контекста
    }
  }, [context]);

  if (!context || !context.isPriceLoaded || !editingData) {
    return (
      <Spin size="large" tip="Loading...">
        <div style={{ height: "100vh" }}></div>
      </Spin>
    );
  }

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      setEditingData(values.items);
      setIsModalVisible(false);

      if (context?.updatePrice) {
        context.updatePrice("prisePhotokeramFormat", values.items); // Передаём массив
      }
    });
  };

  const handleAdd = () => {
    const updatedData = [
      ...(editingData || []),
      { size: undefined, prise: undefined },
    ];
    setEditingData(updatedData);
    form.setFieldsValue({ items: updatedData });
  };

  const handleDelete = (index: number) => {
    if (editingData && editingData.length > 1) {
      const updatedData = editingData.filter((_, i) => i !== index);
      setEditingData(updatedData);
      form.setFieldsValue({ items: updatedData });
    }
  };

  return (
    <div className="container">
      <Table
        dataSource={editingData.map((item, index) => ({
          ...item,
          key: index,
        }))}
        columns={[
          {
            title: "Формати фотокераміки | Розміри",
            dataIndex: "size",
            key: "size",
            width: "60%",
            render: (text: string | undefined) => text || "—",
          },
          {
            title: "Ціна",
            dataIndex: "prise",
            key: "prise",
            render: (text: number | undefined) => (
              <span style={{ fontWeight: "bold", color: "#333" }}>
                {text !== undefined ? `${text.toLocaleString("ru-RU")} грн.` : "—"}
              </span>
            ),
          },
        ]}
        pagination={false}
        rowKey="key"
      />
      <Button
        type="primary"
        onClick={handleOpenModal}
        style={{ marginTop: "20px", display: "block", marginLeft: "auto" }}
      >
        Редагувати формати
      </Button>
      <Modal
        title="Редагування форматів фотокераміки"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={
          <Button type="primary" onClick={handleSave} block>
            Зберегти зміни
          </Button>
        }
      >
        <Form
          form={form}
          initialValues={{ items: editingData }}
          layout="vertical"
        >
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <div>
                {fields.map(({ key, name }) => (
                  <Space
                    key={key}
                    align="baseline"
                    style={{ display: "flex", marginBottom: "8px" }}
                  >
                    <Form.Item
                      name={[name, "size"]}
                      rules={[{ required: true, message: "Вкажіть розмір" }]}
                    >
                      <Input placeholder="Розмір" />
                    </Form.Item>
                    <Form.Item
                      name={[name, "prise"]}
                      rules={[{ required: true, message: "Вкажіть ціну" }]}
                    >
                      <InputNumber
                        placeholder="Ціна (грн.)"
                        style={{ width: "150px" }}
                      />
                    </Form.Item>
                    {fields.length > 1 && (
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => {
                          handleDelete(name);
                          remove(name);
                        }}
                      />
                    )}
                  </Space>
                ))}
                <Button
                  type="dashed"
                  onClick={() => {
                    add({ size: undefined, prise: undefined });
                    handleAdd();
                  }}
                  block
                  icon={<PlusOutlined />}
                >
                  Додати новий формат
                </Button>
              </div>
            )}
          </Form.List>
        </Form>
      </Modal>
    </div>
  );
};

export default PricePhotokeramFormat;
