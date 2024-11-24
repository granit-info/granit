import { useContext, useState, useEffect } from "react";
import PriseContext from "../../../globalContext/PriceContext";
import { Table, Button, Modal, Form, Space, Spin, InputNumber } from "antd";

interface Item {
  key: string;
  value: number;
  label: string;
}

const PriceSmall = () => {
  const context = useContext(PriseContext);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [data, setData] = useState<Item[]>([]);
  const [form] = Form.useForm(); // Создаем экземпляр формы

  useEffect(() => {
    if (context && context.isPriceLoaded) {
      setData([
        {
          key: "prisePoemAddWord",
          value: context.prisePoemAddWord,
          label: "Додаткові букви для віршу (грн. за см)",
        },
        {
          key: "priseHackle",
          value: context.priseHackle,
          label: "Пір'я (грн. за м.п.)",
        },
        {
          key: "priseHider",
          value: context.priseHider,
          label: "Потай (грн. за м²)",
        },
        {
          key: "priseFioIndivid",
          value: context.priseFioIndivid,
          label: "Піскоструй: Прізвище, ім'я, по батькові | Індивідуальний розмір (грн. за м²)",
        },
      ]);
    }
  }, [context]);

  if (!context || !context.isPriceLoaded) {
    return (
      <Spin size="large" tip="Loading...">
        <div style={{ height: "100vh" }}></div>
      </Spin>
    );
  }

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    form.setFieldsValue({ value: item.value }); // Устанавливаем значение в форме
    setIsModalVisible(true);
  };

  const handleSave = (values: { value: number }) => {
    if (editingItem) {
      // Обновляем значение в состоянии
      const updatedData = data.map((item) =>
        item.key === editingItem.key ? { ...item, value: values.value } : item
      );
      setData(updatedData);

      // Закрываем модальное окно
      setIsModalVisible(false);
      setEditingItem(null);

      // Обновляем данные в контексте (если нужно)
      if (context.updatePrice) {
        context.updatePrice(editingItem.key, values.value);
      }
    }
  };

  const columns = [
    {
      title: "Назва ",
      dataIndex: "label",
      key: "label",
      width: "60%", 
    },
    {
      title: "Ціна",
      dataIndex: "value",
      key: "value",
      render: (text: string) => (
        <span style={{ fontWeight: "bold", color: "#333" }}>
          {Number(text).toLocaleString("ru-RU")} грн.
        </span>
      ),
    },
    {
      title: " ",
      key: "actions",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, record: Item) => (
        <Space>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Змінити ціну
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="container">
      <Table
        dataSource={data}
        columns={columns}
        rowKey="key"
        pagination={false}
      />
      <Modal
        title={editingItem?.label}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form} // Привязываем форму
          onFinish={handleSave}
          layout="vertical"
        >
          <Form.Item
            label="Ціна:"
            name="value"
            rules={[{ required: true, message: "Вкажіть ціну" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Зберегти
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PriceSmall;
