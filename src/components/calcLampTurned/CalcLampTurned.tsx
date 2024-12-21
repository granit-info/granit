import { useEffect, useState } from "react";
import css from "./CalcLampTurned.module.css";
import CustomDropdown from "../customDropdown/CustomDropdown";
import { Material } from "../../interfaces/Material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
} from "@mui/material";
import { FormData } from "../../interfaces/data";
import { useSyncedState } from "../../tools/useSyncedState";

export default function CalcLampTurned() {
  const koefLampTurned = 1.2;

  const [isValidForm, setIsValidForm] = useState<boolean>(false);

  // Начальное состояние формы
  const [formData, setFormData] = useSyncedState<FormData>(
    "formDataLampTurned",
    {
      width: undefined,
      height: undefined,
      thickness: undefined,
      dropdown: null,
    }
  );

  const [quantity, setQuantity] = useSyncedState<number>("LampTurnedQuantity", 1);
  const [costMaterial, setCostMaterial] = useState<number>(0);
  const [costTotal, setCostTotal] = useState<number>(0);

  // Подсчет итоговой стоимости
  useEffect(() => {
    if (isValidForm) {
      const totalCost = (costMaterial || 0) * quantity;
      setCostTotal(totalCost);
    } else {
      setCostTotal(0); // Сброс суммы, если форма недействительна
    }
  }, [isValidForm, costMaterial, quantity]);

  // Используем useEffect для автоматической проверки при изменении formData
  useEffect(() => {
    const checkForm = () => {
      const isValid =
        formData.width !== undefined &&
        formData.height !== undefined &&
        formData.thickness !== undefined &&
        formData.dropdown !== null;
      setIsValidForm(isValid);

      if (
        formData.width &&
        formData.height &&
        formData.thickness &&
        formData.dropdown &&
        formData.dropdown.price
      ) {
        setCostMaterial(
          formData.width *
            formData.height *
            formData.thickness *
            formData.dropdown.price *
            koefLampTurned
        );
      } else {
        setCostMaterial(0);
      }
    };
    checkForm();
  }, [formData]);

  // Обработчик изменения поля ввода FormData
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof FormData
  ) => {
    const { value } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [field]: parseFloat(value),
    });
  };

  // Обработчик изменения количества 
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(value > 0 ? value : 1); // Количество не может быть меньше 1
  };

  // Обработчик выбора материала из выпадающего списка
  const handleDropdownChange = (selectedMaterial: Material | null) => {
    setFormData({
      ...formData,
      dropdown: selectedMaterial,
    });
  };

  return (
    <>
      <div className={css.container}>
        {/*                                                 --------------------------   РАЗМЕРЫ и материал  */}
        <div className={css.sheet}>
          <div className={css.leftSide}>
            <div className={css.sizes}>
              <p>Задайте розмір: &nbsp;</p>
              <TextField
                id="field2"
                label="Висота, м"
                variant="standard"
                type="number"
                value={formData.height || undefined}
                onChange={(e) => handleChange(e, "height")}
                margin="normal"
                required
              />
              x
              <TextField
                id="field1"
                label="Ширина, м"
                variant="standard"
                type="number"
                value={formData.width || undefined}
                onChange={(e) => handleChange(e, "width")}
                margin="normal"
                required
              />
              x
              <TextField
                id="field3"
                label="Товщина, м"
                variant="standard"
                type="number"
                value={formData.thickness || undefined}
                onChange={(e) => handleChange(e, "thickness")}
                margin="normal"
                required
              />
            </div>

            <CustomDropdown
              onSelect={handleDropdownChange}
              selectedMaterial={formData.dropdown}
            />
          </div>

          <div className={css.rightSide}>
            {formData.width &&
            formData.height &&
            formData.thickness &&
            formData.dropdown &&
            isValidForm ? (
              <div className={css.textResult}>
                <p>
                  Загальний об'єм:{" "}
                  {(
                    formData.width *
                    formData.height *
                    formData.thickness
                  ).toFixed(4)}{" "}
                  м³
                </p>
                <br />
                <p>Враховано коефіцієнт: x{koefLampTurned}</p>
                <p className={css.textCost}>
                  Вартість матеріалу:{" "}
                  {Number(costMaterial.toFixed(2)).toLocaleString("ru-RU")} грн.
                </p>
              </div>
            ) : (
              <p
                style={{
                  color: "red",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Виберіть матеріал та вкажіть розміри!
              </p>
            )}
          </div>
        </div>

        {/*                                   --------------------------   Блок для ввода количества */}
        <div className={css.sheet}>
          <div className={css.leftSide}>
            <p>Вкажіть кількість точених лампадок:</p>
            <TextField
              id="quantity"
              label="Кількість"
              variant="standard"
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              margin="normal"
              required
            />
          </div>
        </div>

        <div>
          <Accordion style={{ marginBottom: "10px" }}>
            <AccordionSummary
              expandIcon={<span>▼</span>}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Загальна вартість точених лампадок:{" "}
              <b>{Number(costTotal.toFixed(2)).toLocaleString("ru-RU")} грн.</b>
            </AccordionSummary>
            <AccordionDetails>
              {costMaterial && isValidForm ? (
                <div>
                  <p className={css.textCost}>
                    Матеріал для однієї точеної лампадки: {" "}
                    {Number(costMaterial.toFixed(2)).toLocaleString("ru-RU")}{" "}
                    грн.
                  </p>
                  <p>Кількість точених лампадок: {quantity} шт.</p>
                </div>
              ) : (
                <p> </p>
              )}
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </>
  );
}
