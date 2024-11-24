import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Space,
  Spin,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../../api/firebase";
import css from "./MaterialManagement.module.css";

interface Material {
  id?: string;
  link: string;
  label: string;
  price: number;
}

const MaterialManagement = () => {
  const [materials, setMaterials] = useState<Material[] | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const materialsRef = collection(db, "materials");

  // Загрузка данных из Firebase
  useEffect(() => {
    const fetchMaterials = async () => {
      const q = query(materialsRef, orderBy("label", "asc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setMaterials(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            link: doc.data().link || "",
            label: doc.data().label || "Без назви",
            price: doc.data().price || 0,
          }))
        );
      });

      return () => unsubscribe();
    };

    fetchMaterials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Сохранение изменений в Firebase
  const saveToFirebase = async (updatedMaterials: Material[]) => {
    try {
      const operations = updatedMaterials.map((material) => {
        if (material.id) {
          // Обновление существующего материала
          return updateDoc(doc(materialsRef, material.id), {
            link: material.link,
            label: material.label,
            price: material.price,
          });
        } else {
          // Создание нового материала
          return addDoc(materialsRef, {
            link: material.link,
            label: material.label,
            price: material.price,
          });
        }
      });

      await Promise.all(operations);
      console.log("Изменения успешно сохранены!");
    } catch (error) {
      console.error("Ошибка при сохранении изменений:", error);
    }
  };

  // Удаление материала
  const handleDelete = async (id?: string) => {
    if (id) {
      try {
        await deleteDoc(doc(materialsRef, id));
        console.log("Материал успешно удалён!");
      } catch (error) {
        console.error("Ошибка при удалении материала:", error);
      }
    }
  };

  // Открытие модального окна
  const handleOpenModal = () => {
    if (materials) {
      form.setFieldsValue({
        items: materials.map((material) => ({
          label: material.label,
          link: material.link,
          price: material.price,
        })),
      });
    }
    setIsModalVisible(true);
  };

  // Сохранение изменений
  const handleSave = () => {
    form.validateFields().then((values) => {
      const updatedMaterials = values.items.map(
        (item: Material, index: number) => ({
          ...item,
          id: materials![index]?.id, // Сохраняем связь с id для существующих материалов
        })
      );

      saveToFirebase(updatedMaterials);
      setIsModalVisible(false);
    });
  };

  if (!materials) {
    return (
      <Spin size="large" tip="Loading...">
        <div style={{ height: "100vh" }}></div>
      </Spin>
    );
  }

  return (
    <div className="container">
      <Table
        dataSource={materials.map((item, index) => ({
          ...item,
          key: index,
        }))}
        columns={[
          {
            title: "Назва",
            dataIndex: "label",
            key: "label",
            render: (text: string) => text || "—",
          },
          {
            title: "Зображення",
            dataIndex: "link",
            key: "link",
            render: (text: string) => (
              <img
                loading="lazy"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  objectPosition: "center",
                  borderRadius: "15px",
                }}
                src={text}
                alt={text}
              />
            ),
          },
          {
            title: "Ціна",
            dataIndex: "price",
            key: "price",
            render: (text: number) => `${text.toLocaleString("ru-RU")} грн.`,
          },
          {
            title: " ",
            key: "actions",
            render: (_, record) => (
              <Button
                type="default"
                danger
                onClick={() => handleDelete(record.id)}
              >
                Видалити
              </Button>
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
        Редагувати матеріали
      </Button>
      <Modal
        title="Редагування матеріалів"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={
          <Button type="primary" onClick={handleSave} block>
            Зберегти зміни
          </Button>
        }
        width={670} 
      >
        <Form
          form={form}
          initialValues={{ items: [] }}
          layout="vertical"
        >
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <div>
                {fields.map(({ key, name }) => (
                  <Space
                    key={key}
                    align="baseline"
                    style={{ display: "flex", alignItems:"center" ,marginBottom: "5px" }}
                  >
                    <Form.Item
                      name={[name, "label"]}
                      label={<span className={css.hint}>Назва матеріалу</span>}
                      rules={[{ required: true, message: "Введіть назву" }]}
                    >
                      <Input placeholder="Назва"
                        style={{ width: "200px" }}
                        />
                    </Form.Item>
                    <Form.Item
                      name={[name, "link"]}
                      label={<span className={css.hint}>Посилання на зображення</span>}
                      rules={[{ required: true, message: "Введіть посилання" }]}
                    >
                      <Input placeholder="Посилання" 
                        style={{ width: "250px" }}
                        />
                    </Form.Item>
                    <Form.Item
                      name={[name, "price"]}
                      label={<span className={css.hint}>Ціна (грн. за м²)</span>}
                      rules={[{ required: true, message: "Введіть ціну" }]}
                    >
                      <InputNumber
                        placeholder="Ціна (грн.)"
                        style={{ width: "120px" }}
                      />
                    </Form.Item>
                    {fields.length > 1 && (
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => remove(name)}
                      />
                    )}
                  </Space>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add({ link: "", label: "", price: 0 })}
                  block
                  icon={<PlusOutlined />}
                >
                  Додати матеріал
                </Button>
              </div>
            )}
          </Form.List>
        </Form>
      </Modal>
    </div>
  );
};

export default MaterialManagement;
