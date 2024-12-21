import { useEffect, useState } from "react";
import css from "./calcCrossSolid.module.css";
import CustomDropdown from "../customDropdown/CustomDropdown";
import { Material } from "../../interfaces/Material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import {
  BacksideSize,
  FioIndSize,
  FormData,
  Kopir,
} from "../../interfaces/data";
import { usePriseContext } from "../../globalContext/usePriseContext";
import { useSyncedState } from "../../tools/useSyncedState";

export default function CalcCrossSolid() {

  const koefCrossSolid = 1.2;

  const { priseFioIndivid, priseFacet, priseBackside, priseKopir } =
    usePriseContext();

  const [isValidForm, setIsValidForm] = useState<boolean>(false);

  // Начальное состояние формы
  const [formData, setFormData] = useSyncedState<FormData>(
    "formDataCrossSolid",
    {
      width: undefined,
      height: undefined,
      thickness: undefined,
      dropdown: null,
    }
  );

  const [facetSizeCrossSolid, setFacetSizeCrossSolid] = useSyncedState<number>(
    "facetSizeCrossSolid",
    0
  );
  const [facetLenghtCrossSolid, setFacetLenghtCrossSolid] = useSyncedState<
    number | undefined
  >("facetLenghtCrossSolid", undefined);
  const [fioFormatCrossSolid, setFioFormatCrossSolid] = useSyncedState<number>(
    "fioFormatCrossSolid",
    0
  );

  const [backsideSizeCrossSolid, setBacksideSizeCrossSolid] =
    useSyncedState<BacksideSize>("backsideSizeCrossSolid", {
      width: undefined,
      height: undefined,
      isPhoto: false,
    });
  const [kopirCrossSolid, setKopirCrossSolid] = useSyncedState<Kopir>(
    "kopirCrossSolid",
    {
      lenght: undefined,
      isPolished: false,
    }
  );

  const [fioIndSizeCrossSolid, setFioIndSizeCrossSolid] =
    useSyncedState<FioIndSize>("fioIndSizeCrossSolid", {
      width: undefined,
      height: undefined,
    });

  const [costMaterial, setCostMaterial] = useState<number>(0);
  const [costFacet, setCostFacet] = useState<number>(0);
  const [costFio, setCostFio] = useState<number>(0);
  const [costBackside, setCostBackside] = useState<number>(0);
  const [costKopir, setCostKopir] = useState<number>(0);
  const [costTotal, setCostTotal] = useState<number>(0);

  // подсчет итоговой стоимости
  useEffect(() => {
    if (isValidForm) {
      const totalCost =
        (costMaterial || 0) +
        (costFacet || 0) +
        (costKopir || 0) +
        (costFio || 0) +
        (costBackside || 0);

      setCostTotal(totalCost);
    } else {
      setCostTotal(0); // Сброс суммы, если форма недействительна
    }
  }, [costBackside, costFacet, costFio, costKopir, costMaterial, isValidForm]);

  // Используем useEffect для автоматической проверки при изменении formData
  useEffect(() => {
    const checkForm = () => {
      const isValid =
        formData.width !== undefined &&
        formData.height !== undefined &&
        formData.thickness !== undefined &&
        formData.dropdown !== null;
      setIsValidForm(isValid);
      if (isValid && !facetLenghtCrossSolid) {
        setFacetLenghtCrossSolid(
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
            formData.dropdown.price
        );
      } else {
        setCostMaterial(0);
      }
    };
    checkForm(); // Проверка после каждого обновления данных формы

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

  // Обработчик изменения поля ввода фазка длина
  const handleChangeFacet = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const parsedValue = parseFloat(e.target.value);

    // Обновляем длину фазки
    setFacetLenghtCrossSolid(parsedValue > 0 ? parsedValue : 0);

    // Если значение пустое или меньше либо равно 0, устанавливаем выбранный Radio в "фазка не потрібна"
    if (!parsedValue || parsedValue <= 0) {
      setFacetSizeCrossSolid(0);
    }
  };

  // Обработчик изменения поля ввода размеров для  КОПІР
  const handleKopirChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Kopir
  ) => {
    const { value } = e.target as HTMLInputElement;
    setKopirCrossSolid({
      ...kopirCrossSolid,
      [field]: parseFloat(value),
    });
  };

  // Обработчик изменения isPolished для  КОПІР
  const handleKopirIsPolishedChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const { checked } = event.target;
    setKopirCrossSolid((prevState) => ({
      ...prevState,
      [field]: checked,
    }));
  };

  // Обработчик изменения поля ввода размеров для  ЗВОРОТНЯ СТОРОНА
  const handleBacksideChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof BacksideSize
  ) => {
    const { value } = e.target as HTMLInputElement;
    setBacksideSizeCrossSolid({
      ...backsideSizeCrossSolid,
      [field]: parseFloat(value),
    });
  };

  // Обработчик изменения isPhoto для  ЗВОРОТНЯ СТОРОНА
  const handleBacksideIsPhotoChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const { checked } = event.target;
    setBacksideSizeCrossSolid((prevState) => ({
      ...prevState,
      [field]: checked,
    }));
  };

  // хук для отслеживаниия изменений в ЗВОРОТНЯ СТОРОНА
  useEffect(() => {
    let calculatedCost = 0;

    if (
      backsideSizeCrossSolid.height &&
      backsideSizeCrossSolid.width &&
      priseBackside.prise &&
      priseBackside.photoKoef
    ) {
      calculatedCost =
        backsideSizeCrossSolid.height *
        backsideSizeCrossSolid.width *
        priseBackside.prise;
      calculatedCost *= backsideSizeCrossSolid.isPhoto
        ? priseBackside.photoKoef
        : 1;
    }

    setCostBackside(calculatedCost * koefCrossSolid);
  }, [
    backsideSizeCrossSolid.height,
    backsideSizeCrossSolid.isPhoto,
    backsideSizeCrossSolid.width,
    priseBackside.photoKoef,
    priseBackside.prise,
  ]);

  // хук для отслеживаниия изменений в КОПІР
  useEffect(() => {
    let calculatedCost = 0;

    if (
      kopirCrossSolid.lenght &&
      priseKopir.prise &&
      priseKopir.polishedKoef &&
      formData.thickness
    ) {
      calculatedCost =
        kopirCrossSolid.lenght * formData.thickness * priseKopir.prise;
      calculatedCost *= kopirCrossSolid.isPolished
        ? priseKopir.polishedKoef
        : 1;
    }

    setCostKopir(calculatedCost);
  }, [
    formData.thickness,
    kopirCrossSolid.isPolished,
    kopirCrossSolid.lenght,
    priseKopir.polishedKoef,
    priseKopir.prise,
  ]);

  // Обработчик выбора материала из выпадающего списка
  const handleDropdownChange = (selectedMaterial: Material | null) => {
    setFormData({
      ...formData,
      dropdown: selectedMaterial,
    });
  };

  // Обработчик изменения радиокнопок фазки и задаем стоимость
  useEffect(() => {
    let calculatedCostFacet = 0;

    switch (facetSizeCrossSolid) {
      case 1:
        calculatedCostFacet = facetLenghtCrossSolid! * priseFacet.first!;
        break;
      case 2:
        calculatedCostFacet = facetLenghtCrossSolid! * priseFacet.second!;
        break;
      case 3:
        calculatedCostFacet = facetLenghtCrossSolid! * priseFacet.third!;
        break;
      default:
        calculatedCostFacet = 0;
    }

    setCostFacet(calculatedCostFacet);
  }, [formData, facetSizeCrossSolid, priseFacet, facetLenghtCrossSolid]);

  // Обработчик изменения радиокнопок фазки
  const handleRadioFacetChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selected = parseInt(event.target.value);
    setFacetSizeCrossSolid(selected);
  };

  // Обработчик выбора радиокнопки ФИО
  const handleRadioFioTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFioFormatCrossSolid(parseInt(event.target.value));
  };

  // Обработчик изменения поля ввода FIO IndSize
  const handleFioIndSizeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof FioIndSize
  ) => {
    const { value } = e.target as HTMLInputElement;
    setFioIndSizeCrossSolid({
      ...fioIndSizeCrossSolid,
      [field]: parseFloat(value),
    });
  };
  useEffect(() => {
    if (
      fioFormatCrossSolid == 1 &&
      fioIndSizeCrossSolid.height &&
      fioIndSizeCrossSolid.width &&
      priseFioIndivid
    ) {
      setCostFio(
        fioIndSizeCrossSolid.height *
          fioIndSizeCrossSolid.width *
          priseFioIndivid
      );
    }
    if (
      fioFormatCrossSolid == 1 &&
      (!fioIndSizeCrossSolid.height ||
        !fioIndSizeCrossSolid.width ||
        !priseFioIndivid)
    ) {
      setCostFio(0);
    }
  }, [
    fioFormatCrossSolid,
    fioIndSizeCrossSolid.height,
    fioIndSizeCrossSolid.width,
    priseFioIndivid,
  ]);

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
                  ).toFixed(2)}{" "}
                  м³
                </p>

                <p>
                  Загальна довжина фаски:{" "}
                  {(formData.height! * 2 + formData.width!).toFixed(2)} м.п.
                </p>
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

        {/*                                                      --------------------------   КОПІР */}
        <div className={css.sheet}>
          <div className={css.leftSide}>
            <div>
              <FormLabel id="kopir">Задайте розмір для копіру:</FormLabel>
              <br />
              <div className={css.sizesHider}>
                <TextField
                  id="kopir-lenght"
                  label="Довжина, м"
                  variant="standard"
                  type="number"
                  value={kopirCrossSolid.lenght || undefined}
                  onChange={(e) => handleKopirChange(e, "lenght")}
                  margin="dense"
                  disabled={!isValidForm}
                  style={{ width: "200px" }}
                />
              </div>
              <p className={css.secondaryText}>
                Ціна: {priseKopir.prise} грн. за м²
              </p>
              <FormControlLabel
                disabled={!isValidForm || !kopirCrossSolid.lenght}
                control={
                  <Checkbox
                    name="kopir-polished"
                    checked={kopirCrossSolid.isPolished}
                    onChange={(e) =>
                      handleKopirIsPolishedChange(e, "isPolished")
                    }
                  />
                }
                label={`Полірування (ціна множиться на ${priseKopir.polishedKoef})`}
              />
            </div>
          </div>
          <div className={css.rightSide}>
            {kopirCrossSolid.lenght && formData.thickness && isValidForm ? (
              <div className={css.textResult}>
                <p>
                  Загальна площа копіру:{" "}
                  {Number(kopirCrossSolid.lenght * formData.thickness).toLocaleString("ru-RU")} м²
                </p>
                <p className={css.textCost}>
                  Вартість:{" "}
                  {Number(costKopir.toFixed(2)).toLocaleString("ru-RU")} грн.
                </p>
              </div>
            ) : (
              <p> </p>
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
                  facetLenghtCrossSolid ??
                  (formData.height! * 2 + formData.width!).toFixed(3)
                }
                onChange={(e) => handleChangeFacet(e)}
                margin="dense"
                disabled={!isValidForm}
              />

              <RadioGroup
                aria-labelledby="radio-buttons-group-facet"
                value={facetSizeCrossSolid}
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
                        !facetLenghtCrossSolid ||
                        facetLenghtCrossSolid <= 0
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
                        !facetLenghtCrossSolid ||
                        facetLenghtCrossSolid <= 0
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
                        !facetLenghtCrossSolid ||
                        facetLenghtCrossSolid <= 0
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
            {facetSizeCrossSolid > 0 && facetLenghtCrossSolid && isValidForm ? (
              <div className={css.textResult}>
                <p>
                  Врахована довжина фаски: {facetLenghtCrossSolid.toFixed(2)}{" "}
                  м.п.
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

        {/*                                                      --------------------------   ЗВОРОТНЯ СТОРОНА */}
        <div className={css.sheet}>
          <div className={css.leftSide}>
            <p>Художня робота </p>
            <hr /> <br />
            <div>
              <FormLabel id="backside">Задайте розміри для малюнку:</FormLabel>
              <br />
              <div className={css.sizesHider}>
                <TextField
                  id="backside-height"
                  label="Висота, м"
                  variant="standard"
                  type="number"
                  value={backsideSizeCrossSolid.height || undefined}
                  onChange={(e) => handleBacksideChange(e, "height")}
                  margin="dense"
                  disabled={!isValidForm}
                  style={{ width: "100px" }}
                />
                <p style={{ marginLeft: "10px", marginRight: "10px" }}>x</p>
                <TextField
                  id="backside-width"
                  label="Ширина, м"
                  variant="standard"
                  type="number"
                  value={backsideSizeCrossSolid.width || undefined}
                  onChange={(e) => handleBacksideChange(e, "width")}
                  margin="dense"
                  disabled={!isValidForm}
                  style={{ width: "100px" }}
                />
              </div>
              <p className={css.secondaryText}>
                Ціна: {priseBackside.prise} грн. за м²
              </p>
              <FormControlLabel
                disabled={
                  !isValidForm ||
                  !backsideSizeCrossSolid.height ||
                  !backsideSizeCrossSolid.width
                }
                control={
                  <Checkbox
                    name="backside-photo"
                    checked={backsideSizeCrossSolid.isPhoto}
                    onChange={(e) => handleBacksideIsPhotoChange(e, "isPhoto")}
                  />
                }
                label={`Позолота  (ціна множиться на ${priseBackside.photoKoef})`}
              />
            </div>
          </div>
          <div className={css.rightSide}>
            {backsideSizeCrossSolid.height &&
            backsideSizeCrossSolid.width &&
            isValidForm ? (
              <div className={css.textResult}>
                <p>
                  Загальна площа малюнку:{" "}
                  {backsideSizeCrossSolid.height * backsideSizeCrossSolid.width}{" "}
                  м²
                </p>
                <br />
                <p>Враховано коефіцієнт: x{koefCrossSolid}</p>
                <p className={css.textCost}>
                  Вартість:{" "}
                  {Number(costBackside.toFixed(2)).toLocaleString("ru-RU")} грн.
                </p>
              </div>
            ) : (
              <p> </p>
            )}
          </div>
        </div>

        {/*                                                          --------------------------  ФИО  */}
        <div className={css.sheet} style={{ zIndex: 2, position: "relative" }}>
          <div className={css.leftSide}>
            <div>
              <p>Піскоструй: Розп'яття та інше </p>
              <hr /> <br />
              <FormControl>
                <FormLabel id="radio-buttons-group-fio">
                  Задайте розміри для надпису:
                </FormLabel>
                <RadioGroup
                  aria-labelledby="radio-buttons-group-fio"
                  value={fioFormatCrossSolid}
                  onChange={handleRadioFioTypeChange}
                  name="radio-buttons-group-fio"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "end",
                    }}
                  >
                    <FormControlLabel
                      value={1}
                      control={<Radio disabled={!isValidForm} />}
                      label="Індивідуальний розмір"
                    />
                    <div
                      className={css.sizesHider}
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "10px",
                      }}
                    >
                      <TextField
                        id="fio-height"
                        label="Висота, м"
                        variant="standard"
                        type="number"
                        value={fioIndSizeCrossSolid.height || undefined}
                        onChange={(e) => handleFioIndSizeChange(e, "height")}
                        margin="dense"
                        disabled={!isValidForm || fioFormatCrossSolid == 0}
                        style={{ width: "100px" }}
                      />
                      <p>x</p>
                      <TextField
                        id="fio-width"
                        label="Ширина, м"
                        variant="standard"
                        type="number"
                        value={fioIndSizeCrossSolid.width || undefined}
                        onChange={(e) => handleFioIndSizeChange(e, "width")}
                        margin="dense"
                        disabled={!isValidForm || fioFormatCrossSolid == 0}
                        style={{ width: "100px" }}
                      />
                    </div>
                  </div>
                </RadioGroup>
              </FormControl>
              <p className={css.secondaryText}>
                Ціна: {priseFioIndivid} грн. за м²
              </p>
            </div>
          </div>
          <div className={css.rightSide}>
            {fioFormatCrossSolid == 1 &&
            fioIndSizeCrossSolid.height &&
            fioIndSizeCrossSolid.width &&
            isValidForm ? (
              <div className={css.textResult}>
                <p>
                  Загальна площа зображення:{" "}
                  {fioIndSizeCrossSolid.height * fioIndSizeCrossSolid.width} м²
                </p>
                <p className={css.textCost}>
                  Вартість: {Number(costFio.toFixed(2)).toLocaleString("ru-RU")}{" "}
                  грн.
                </p>
              </div>
            ) : (
              <p> </p>
            )}
          </div>
        </div>

        <div>
          <Accordion style={{ marginBottom: "10px" }}>
            <AccordionSummary
              expandIcon={<span>▼</span>}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Загальна вартість (Хрест суцільний):{" "}
              <b>{Number(costTotal.toFixed(2)).toLocaleString("ru-RU")} грн.</b>
            </AccordionSummary>
            <AccordionDetails>
              {costMaterial && isValidForm ? (
                <p className={css.textCost}>
                  Матеріал (Хрест суцільний):{" "}
                  {Number(costMaterial.toFixed(2)).toLocaleString("ru-RU")} грн.
                </p>
              ) : (
                <p> </p>
              )}

              {costBackside && isValidForm ? (
                <p className={css.textCost}>
                  Художня робота:{" "}
                  {Number(costBackside.toFixed(2)).toLocaleString("ru-RU")} грн.
                </p>
              ) : (
                <p> </p>
              )}

              {costKopir && isValidForm ? (
                <p className={css.textCost}>
                  Копір: {Number(costKopir.toFixed(2)).toLocaleString("ru-RU")}{" "}
                  грн.
                </p>
              ) : (
                <p> </p>
              )}

              {costFacet && isValidForm ? (
                <p className={css.textCost}>
                  Фазка: {Number(costFacet.toFixed(2)).toLocaleString("ru-RU")}{" "}
                  грн.
                </p>
              ) : (
                <p> </p>
              )}

              {costFio && isValidForm ? (
                <p className={css.textCost}>
                  Піскоструй: Розп'яття та інше:{" "}
                  {Number(costFio.toFixed(2)).toLocaleString("ru-RU")} грн.
                </p>
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
