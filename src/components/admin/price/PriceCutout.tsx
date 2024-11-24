import { useContext, useState, useEffect } from "react";
import PriseContext from "../../../globalContext/PriceContext";
import { Table, Button, Modal, Form, Spin, InputNumber } from "antd";
import { PriseCutout } from "../../../interfaces/Price";

const PriceCutout = () => {
  const context = useContext(PriseContext);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingData, setEditingData] = useState<PriseCutout | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (context && context.isPriceLoaded) {
      setEditingData(context.priseCutout); // Загружаем данные из контекста
    }
  }, [context]);

  if (!context || !context.isPriceLoaded || !editingData) {
    return (
      <Spin size="large" tip="Loading...">
        <div style={{ height: "100vh" }}></div>
      </Spin>
    );
  }

  const handleEdit = () => {
    form.setFieldsValue(editingData); // Устанавливаем текущие значения в форме
    setIsModalVisible(true);
  };

  const handleSave = (values: Partial<PriseCutout>) => {
    if (editingData) {
      // Создаем объект с обновленным значением
      const updatedData = { ...editingData, ...values };

      // Обновляем локальное состояние
      setEditingData(updatedData);

      // Закрываем модальное окно
      setIsModalVisible(false);

      // Вызываем метод updatePrice из контекста для обновления данных в контексте
      if (context?.updatePrice) {
        context.updatePrice("priseCutout", updatedData); // Обновляем контекст через общий метод
      } else {
        console.error("Метод отсутствует в контексте.");
      }
    }
  };

  const columns = [
    {
      title: "Вирізка (грн. за м²)",
      dataIndex: "label",
      key: "label",
      width: "60%", 
    },
    {
      title: "Ціна",
      dataIndex: "value",
      key: "value",
      render: (text: number | undefined) => (
        <span style={{ fontWeight: "bold", color: "#333" }}>
          {text !== undefined ? `${text.toLocaleString("ru-RU")}` : "—"}
        </span>
      ),
    },
  ];

  // Преобразуем объект PriseCutout в массив для таблицы
  const dataSource = [
    { 
      key: "flower", 
      label: "Квіти", 
      value: editingData.flower !== undefined 
        ? `${editingData.flower.toLocaleString("ru-RU")} грн.` 
        : "—" 
    },
    { 
      key: "other", 
      label: "Інше", 
      value: editingData.other !== undefined 
        ? `${editingData.other.toLocaleString("ru-RU")} грн.` 
        : "—" 
    },
  ];

  return (
    <div className="container">
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="key"
        pagination={false}
      />
      <Button
        type="primary"
        onClick={handleEdit}
        style={{ marginTop: "20px", display: "block", marginLeft: "auto" }}
      >
        Змінити ціни для вирізки
      </Button>
      <Modal
        title="Вирізка (грн. за м²)"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleSave}
          layout="vertical"
          initialValues={editingData}
        >
          <Form.Item
            label="Квіти"
            name="flower"
            rules={[{ required: true, message: "Вкажіть ціну" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Інше"
            name="other"
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

export default PriceCutout;
