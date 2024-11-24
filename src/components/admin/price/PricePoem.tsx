import { useContext, useState, useEffect } from "react";
import PriseContext from "../../../globalContext/PriceContext";
import { Table, Button, Modal, Form, Spin, InputNumber } from "antd";
import { PrisePoem } from "../../../interfaces/Price";

const PricePoem = () => {
  const context = useContext(PriseContext);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingData, setEditingData] = useState<PrisePoem | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (context && context.isPriceLoaded) {
      setEditingData(context.prisePoem); // Загружаем данные из контекста
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

  const handleSave = (values: Partial<PrisePoem>) => {
    if (editingData) {
      // Создаем объект с обновленным значением
      const updatedData = { ...editingData, ...values };

      // Обновляем локальное состояние
      setEditingData(updatedData);

      // Закрываем модальное окно
      setIsModalVisible(false);

      // Вызываем метод updatePrice из контекста для обновления данных в контексте
      if (context?.updatePrice) {
        context.updatePrice("prisePoem", updatedData); // Обновляем контекст через общий метод
      } else {
        console.error("Метод отсутствует в контексте.");
      }
    }
  };

  const columns = [
    {
      title: "Піскоструй: Вірш (грн. за букву)",
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
          {text !== undefined ? `${text.toLocaleString("ru-RU")} грн.` : "—"}
        </span>
      ),
    },
  ];

  // Преобразуем объект PrisePoem в массив для таблицы
  const dataSource = [
    { key: "first", label: "Висота букви до 2 см.", value: editingData.first },
    { key: "second", label: "Висота букви від 2 до 2,5 см.", value: editingData.second },
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
        Змінити ціни для букв
      </Button>
      <Modal
        title="Піскоструй: Вірш (грн. за букву)"
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
            label="Висота букви до 2 см."
            name="first"
            rules={[{ required: true, message: "Вкажіть ціну" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Висота букви від 2 до 2,5 см."
            name="second"
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

export default PricePoem;
