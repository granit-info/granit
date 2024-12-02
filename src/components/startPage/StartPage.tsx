import { useEffect, useState } from "react";
import { Spin, Button, Modal, Form, Input, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../api/firebase";
import MainPage from "../mainPage/mainPage";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

const StartPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [users, setUsers] = useState<{ username: string; password: string }[]>(
    []
  );
  const [form] = Form.useForm();
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null); // Для хранения токена ReCAPTCHA
  const customIcon = (
    <LoadingOutlined style={{ fontSize: 30, color: "white" }} spin />
  );

  // Проверка localStorage на сохраненный пароль
  useEffect(() => {
    const savedPassword = localStorage.getItem("savedPassword");
    const expiry = localStorage.getItem("passwordExpiry");

    if (
      savedPassword &&
      expiry &&
      new Date().getTime() < parseInt(expiry, 10)
    ) {
      setIsLoading(false);
    } else {
      const fetchUsers = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "users"));
          const fetchedUsers = querySnapshot.docs.map((doc) => doc.data()) as {
            username: string;
            password: string;
          }[];
          setUsers(fetchedUsers);
          if (fetchedUsers.length === 0) {
            message.warning("Не знайдено жодного користувача...");
          }
        } catch (error) {
          console.error("Ошибка загрузки пользователей:", error);
          message.error("Помилка при завантаженні користувачів...");
        } finally {
          setIsLoading(false);
        }
      };

      fetchUsers();
    }
  }, []);

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleLogin = (values: { password: string }) => {
    if (!recaptchaToken) {
      message.error("Підтвердьте, що Ви не робот!");
      return;
    }

    const validUser = users.find((user) => user.password === values.password);
    if (validUser) {
      const now = new Date();
      const expiry = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1
      ).getTime();
      localStorage.setItem("savedPassword", values.password);
      localStorage.setItem("passwordExpiry", expiry.toString());
      setIsModalVisible(false);
      message.success(`Гарного дня, ${validUser.username}!`);
    } else {
      message.error("Пароль не знайдено");
      setIsModalVisible(false);
    }
  };

  if (isLoading) {
    return (
      <Spin indicator={customIcon} size="large" tip="Завантаження данних..">
        <div style={{ height: "100vh" }}></div>
      </Spin>
    );
  }

  const savedPassword = localStorage.getItem("savedPassword");
  const expiry = localStorage.getItem("passwordExpiry");
  if (savedPassword && expiry && new Date().getTime() < parseInt(expiry, 10)) {
    return <MainPage />;
  }

  return (
    <>
      <Link to="/prices">ADMIN</Link>

      <div style={{ textAlign: "center", paddingTop: "20vh" }}>
        {users.length > 0 ? (
          <Button type="primary" onClick={() => setIsModalVisible(true)}>
            Ввести пароль
          </Button>
        ) : (
          <p>
            Не знайдено жодного користувача... Зверніться до адміністратора!
          </p>
        )}
        <Modal
          title="Введіть Ваш пароль"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleLogin}>
            <Form.Item
              label="Пароль"
              name="password"
              rules={[{ required: true, message: "Введіть пароль!" }]}
            >
              <Input.Password />
            </Form.Item>
            <div style={{ marginBottom: "16px" }}>
              <ReCAPTCHA
                sitekey="6LfUXCIpAAAAADr12OpfMFCprWfpuDhMlZfOPjmr" 
                onChange={handleRecaptchaChange}
                onExpired={() => setRecaptchaToken(null)} 
              />
            </div>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Увійти
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default StartPage;
