import { useEffect, useState } from "react";
import css from "./CalcAngleTurned.module.css";
import CustomDropdown from "../customDropdown/CustomDropdown";
import { Material } from "../../interfaces/Material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { FormData } from "../../interfaces/data";
import { useSyncedState } from "../../tools/useSyncedState";
import { usePriseContext } from "../../globalContext/usePriseContext";

export default function CalcAngleTurned() {
  const koefAngleTurned = 2;

  const { priseFacet } = usePriseContext();

  const [isValidForm, setIsValidForm] = useState<boolean>(false);

  // Начальное состояние формы
  const [formData, setFormData] = useSyncedState<FormData>(
    "formDataAngleTurned",
    {
      width: undefined,
      height: undefined,
      thickness: undefined,
      dropdown: null,
    }
  );

  const [facetSizeAngleTurned, setFacetSizeAngleTurned] = useSyncedState<number>(
    "facetSizeAngleTurned",
    0
  );
  const [facetLenghtAngleTurned, setFacetLenghtAngleTurned] = useSyncedState<
    number | undefined
  >("facetLenghtAngleTurned", undefined);

  const [quantity, setQuantity] = useSyncedState<number>(
    "AngleTurnedQuantity",
    1
  );
  const [costMaterial, setCostMaterial] = useState<number>(0);
  const [costFacet, setCostFacet] = useState<number>(0);
  const [costTotal, setCostTotal] = useState<number>(0);

  // Подсчет итоговой стоимости
  useEffect(() => {
    if (isValidForm) {
      const totalCost = ((costMaterial || 0) + (costFacet || 0)) * quantity;
      setCostTotal(totalCost);
    } else {
      setCostTotal(0); // Сброс суммы, если форма недействительна
    }
  }, [isValidForm, costMaterial, quantity, costFacet]);

  // Используем useEffect для автоматической проверки при изменении formData
  useEffect(() => {
    const checkForm = () => {
      const isValid =
        formData.width !== undefined &&
        formData.height !== undefined &&
        formData.thickness !== undefined &&
        formData.dropdown !== null;
      setIsValidForm(isValid);
      if (isValid && !facetLenghtAngleTurned) {
        setFacetLenghtAngleTurned(
          parseFloat((formData.height! * 2 + formData.width!).toFixed(3))
        );
      }
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
            koefAngleTurned
        );
      } else {
        setCostMaterial(0);
      }
    };
    checkForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // Обработчик изменения количества ваз
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

  // Обработчик изменения поля ввода фазка длина
  const handleChangeFacet = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const parsedValue = parseFloat(e.target.value);

    // Обновляем длину фазки
    setFacetLenghtAngleTurned(parsedValue > 0 ? parsedValue : 0);

    // Если значение пустое или меньше либо равно 0, устанавливаем выбранный Radio в "фазка не потрібна"
    if (!parsedValue || parsedValue <= 0) {
      setFacetSizeAngleTurned(0);
    }
  };

  // Обработчик изменения радиокнопок фазки и задаем стоимость
  useEffect(() => {
    let calculatedCostFacet = 0;

    switch (facetSizeAngleTurned) {
      case 1:
        calculatedCostFacet = facetLenghtAngleTurned! * priseFacet.first!;
        break;
      case 2:
        calculatedCostFacet = facetLenghtAngleTurned! * priseFacet.second!;
        break;
      case 3:
        calculatedCostFacet = facetLenghtAngleTurned! * priseFacet.third!;
        break;
      default:
        calculatedCostFacet = 0;
    }

    setCostFacet(calculatedCostFacet);
  }, [formData, facetSizeAngleTurned, priseFacet, facetLenghtAngleTurned]);

  // Обработчик изменения радиокнопок фазки
  const handleRadioFacetChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selected = parseInt(event.target.value);
    setFacetSizeAngleTurned(selected);
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
                <p>Враховано коефіцієнт: x{koefAngleTurned}</p>
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

        {/*                                                      --------------------------   ФАСКА  */}
        <div className={css.sheet}>
          <div className={css.leftSide}>
            <FormControl>
              <FormLabel id="radio-buttons-group-facet">
                Задайте розмір фазки:
              </FormLabel>

              <TextField
                id="facetLenght"
                label="Довжина, м.п."
                variant="standard"
                type="number"
                value={
                  facetLenghtAngleTurned ??
                  (formData.height! * 2 + formData.width!).toFixed(3)
                }
                onChange={(e) => handleChangeFacet(e)}
                margin="dense"
                disabled={!isValidForm}
              />

              <RadioGroup
                aria-labelledby="radio-buttons-group-facet"
                value={facetSizeAngleTurned}
                onChange={handleRadioFacetChange}
                name="radio-buttons-group-facet"
              >
                <FormControlLabel
                  value={0}
                  control={<Radio disabled={!isValidForm} />}
                  label="фазка не потрібна"
                />
                <FormControlLabel
                  value={1}
                  control={
                    <Radio
                      disabled={
                        !isValidForm ||
                        !facetLenghtAngleTurned ||
                        facetLenghtAngleTurned <= 0
                      }
                    />
                  }
                  label={`до 1см. (${priseFacet.first} грн. за м.п.)`}
                  sx={{ marginLeft: "20px" }}
                />
                <FormControlLabel
                  value={2}
                  control={
                    <Radio
                      disabled={
                        !isValidForm ||
                        !facetLenghtAngleTurned ||
                        facetLenghtAngleTurned <= 0
                      }
                    />
                  }
                  label={`від 1 до 2см (${priseFacet.second} грн. за м.п.)`}
                  sx={{ marginLeft: "20px" }}
                />
                <FormControlLabel
                  value={3}
                  control={
                    <Radio
                      disabled={
                        !isValidForm ||
                        !facetLenghtAngleTurned ||
                        facetLenghtAngleTurned <= 0
                      }
                    />
                  }
                  label={`від 2.1 до 3см (${priseFacet.third} грн. за м.п.)`}
                  sx={{ marginLeft: "20px" }}
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className={css.rightSide}>
            {facetSizeAngleTurned > 0 && facetLenghtAngleTurned && isValidForm ? (
              <div className={css.textResult}>
                <p>
                  Врахована довжина фаски: {facetLenghtAngleTurned.toFixed(2)} м.п.
                </p>
                <p className={css.textCost}>
                  Вартість:{" "}
                  {Number(costFacet.toFixed(2)).toLocaleString("ru-RU")} грн.
                </p>
              </div>
            ) : (
              <p> </p>
            )}
          </div>
        </div>

        {/*                                   --------------------------   Блок для ввода количества */}
        <div className={css.sheet}>
          <div className={css.leftSide}>
            <p>Вкажіть кількість вуглів:</p>
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
              Загальна вартість точених вуглів:{" "}
              <b>{Number(costTotal.toFixed(2)).toLocaleString("ru-RU")} грн.</b>
            </AccordionSummary>
            <AccordionDetails>
              {costMaterial && isValidForm ? (
                <div>
                  <p className={css.textCost}>
                    Матеріал для одного точеного вугла:{" "}
                    {Number(costMaterial.toFixed(2)).toLocaleString("ru-RU")}{" "}
                    грн.
                  </p>

                  {costFacet && isValidForm ? (
                    <p className={css.textCost}>
                      Фазка:{" "}
                      {Number(costFacet.toFixed(2)).toLocaleString("ru-RU")}{" "}
                      грн.
                    </p>
                  ) : (
                    <p> </p>
                  )}

                  <p>Кількість вуглів: {quantity} шт.</p>
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
