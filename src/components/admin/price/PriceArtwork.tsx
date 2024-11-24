import { useContext, useState, useEffect } from "react";
import PriseContext from "../../../globalContext/PriceContext";
import { Table, Button, Modal, Form, Spin, InputNumber } from "antd";
import { PriseArtwork } from "../../../interfaces/Price";

const PriceArtwork = () => {
  const context = useContext(PriseContext);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingData, setEditingData] = useState<PriseArtwork | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (context && context.isPriceLoaded) {
      setEditingData(context.priseArtwork); // Загружаем данные из контекста
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

  const handleSave = (values: Partial<PriseArtwork>) => {
    if (editingData) {
      // Создаем объект с обновленным значением
      const updatedData = { ...editingData, ...values };

      // Обновляем локальное состояние
      setEditingData(updatedData);

      // Закрываем модальное окно
      setIsModalVisible(false);

      // Вызываем метод updatePrice из контекста для обновления данных в контексте
      if (context?.updatePrice) {
        context.updatePrice("priseArtwork", updatedData); // Обновляем контекст через общий метод
      } else {
        console.error("Метод отсутствует в контексте.");
      }
    }
  };

  const columns = [
    {
      title: "Художня робота",
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

  // Преобразуем объект PriseArtwork в массив для таблицы
  const dataSource = [
    {
      key: "portrait",
      label: "Портрет",
      value:
        editingData.portrait !== undefined
          ? `${editingData.portrait.toLocaleString("ru-RU")} грн.`
          : "—",
    },
    {
      key: "fio",
      label: "Прізвище, ім'я та по-батькові",
      value:
        editingData.fio !== undefined
          ? `${editingData.fio.toLocaleString("ru-RU")} грн.`
          : "—",
    },
    {
      key: "fioGold",
      label: "ПІБ з позолотою (додатково +грн. до ціни)",
      value:
        editingData.fioGold !== undefined
          ? `+ ${editingData.fioGold.toLocaleString("ru-RU")} грн.`
          : "—",
    },
    {
      key: "poem",
      label: "Вірш",
      value:
        editingData.poem !== undefined
          ? `${editingData.poem.toLocaleString("ru-RU")} грн.`
          : "—",
    },

    {
      key: "poemGold",
      label: "Вірш з позолотою (додатково +грн. до ціни)",
      value:
        editingData.poemGold !== undefined
          ? `+ ${editingData.poemGold.toLocaleString("ru-RU")} грн.`
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
        Змінити ціни для малюнків
      </Button>
      <Modal
        title="Художня робота"
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
            label="Портрет"
            name="portrait"
            rules={[{ required: true, message: "Вкажіть ціну" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Прізвище, ім'я та по-батькові"
            name="fio"
            rules={[{ required: true, message: "Вкажіть ціну" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="ПІБ з позолотою (додатково +грн. до ціни)"
            name="fioGold"
            rules={[{ required: true, message: "Вкажіть ціну" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Вірш"
            name="poem"
            rules={[{ required: true, message: "Вкажіть ціну" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Вірш з позолотою (додатково +грн. до ціни)"
            name="poemGold"
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

export default PriceArtwork;
