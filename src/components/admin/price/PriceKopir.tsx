import { useContext, useState, useEffect } from "react";
import PriceContext from "../../../globalContext/PriceContext";
import { Table, Button, Modal, Form, Spin, InputNumber } from "antd";
import { PriseKopir } from "../../../interfaces/Price";

const PriceKopir = () => {
  const context = useContext(PriceContext);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingData, setEditingData] = useState<PriseKopir | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (context && context.isPriceLoaded) {
      setEditingData(context.priseKopir); // Загружаем данные из контекста
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

  const handleSave = (values: Partial<PriseKopir>) => {
    if (editingData) {
      // Создаем объект с обновленным значением
      const updatedData = { ...editingData, ...values };

      // Обновляем локальное состояние
      setEditingData(updatedData);

      // Закрываем модальное окно
      setIsModalVisible(false);

      // Вызываем метод updatePrice из контекста для обновления данных в контексте
      if (context?.updatePrice) {
        context.updatePrice("priseKopir", updatedData); // Обновляем контекст через общий метод
      } else {
        console.error("Метод отсутствует в контексте.");
      }
    }
  };

  const columns = [
    {
      title: "Копір",
      dataIndex: "label",
      key: "label",
      width: "60%",
    },
    {
      title: "Ціна/коефіцієнт",
      dataIndex: "value",
      key: "value",
      render: (text: number | undefined) => (
        <span style={{ fontWeight: "bold", color: "#333" }}>
          {text !== undefined ? `${text.toLocaleString("ru-RU")}` : "—"}
        </span>
      ),
    },
  ];

  // Преобразуем объект PriseKopir в массив для таблицы
  const dataSource = [
    {
      key: "prise",
      label: "Ціна без полірування (грн. за м²)",
      value:
        editingData.prise !== undefined
          ? `${editingData.prise.toLocaleString("ru-RU")} грн.`
          : "—",
    },
    {
      key: "polishedKoef",
      label: "Коефіцієнт за полірування (множимо на нього ціну)",
      value:
        editingData.polishedKoef !== undefined
          ? `x ${editingData.polishedKoef.toLocaleString("ru-RU")}`
          : "—",
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
        Змінити ціни для копіру
      </Button>
      <Modal
        title="Копір"
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
            label="Ціна без полірування (грн. за м²)"
            name="prise"
            rules={[{ required: true, message: "Вкажіть ціну" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Коефіцієнт за полірування (множимо на нього ціну)"
            name="polishedKoef"
            rules={[{ required: true, message: "Вкажіть коефіцієнт" }]}
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

export default PriceKopir;
