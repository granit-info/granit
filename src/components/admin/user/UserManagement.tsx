import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Spin, message } from "antd";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  doc,
} from "firebase/firestore";
import { db } from "../../../api/firebase";
import { Margin } from "@mui/icons-material";

interface User {
  id: string;
  username: string;
  password: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const fetchedUsers = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as User[];
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        message.error("Failed to load users.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = () => {
    form.resetFields();
    setEditingUser(null);
    setIsModalVisible(true);
  };

  const handleEditUser = (user: User) => {
    form.setFieldsValue(user);
    setEditingUser(user);
    setIsModalVisible(true);
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteDoc(doc(db, "users", id));
      setUsers(users.filter((user) => user.id !== id));
      message.success("Данні менеджера успішно видалені!");
    } catch (error) {
      console.error("Помилка при видаленні:", error);
      message.error("Виникла помилка...");
    }
  };

  const handleSaveUser = async (values: Omit<User, "id">) => {
    if (editingUser) {
      // Редактирование пользователя
      try {
        await updateDoc(doc(db, "users", editingUser.id), values);
        setUsers(
          users.map((user) =>
            user.id === editingUser.id ? { ...user, ...values } : user
          )
        );
        message.success("Данні менеджера успішно оновлено");
      } catch (error) {
        console.error("Помилка при оновленні:", error);
        message.error("Виникла помилка...");
      }
    } else {
      // Добавление нового пользователя
      try {
        const docRef = await addDoc(collection(db, "users"), values);
        setUsers([...users, { id: docRef.id, ...values }]);
        message.success("Новий менеджер доданий до бази даних ");
      } catch (error) {
        console.error("Error adding user:", error);
        message.error("Виникла помилка...");
      }
    }
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Менеджер",
      dataIndex: "username",
      key: "username",
      width: "45%",
    },
    {
      title: "Пароль",
      dataIndex: "password",
      key: "password",
      width: "25%",
    },
    {
      title: "",
      key: "actions",
      render: (_: unknown, record: User) => (
        <>
          <Button type="default" onClick={() => handleEditUser(record)} style={{ marginRight: "20px" }}>
            Редагувати
          </Button>
          <Button type="link" danger onClick={() => handleDeleteUser(record.id)}>
            Видалити
          </Button>
        </>
      ),
    },
  ];

  if (isLoading) {
    return (
      <Spin size="large" tip="Loading...">
        <div style={{ height: "100vh" }}></div>
      </Spin>
    );
  }

  return (
    <div className="container">
      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        pagination={false}
        style={{ marginBottom: "20px" }}
      />
      <Button type="primary" onClick={handleAddUser}>
        Додати нового менеджера
      </Button>
      <Modal
        title={editingUser ? "Редагувати данні менеджера" : "Додати нового менеджера"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleSaveUser}
          layout="vertical"
          initialValues={editingUser || { username: "", password: "" }}
        >
          <Form.Item
            label="Ім'я"
            name="username"
            rules={[{ required: true, message: "Введіть ім'я!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: "Введіть пароль!" }]}
          >
            <Input.Password />
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

export default UserManagement;
