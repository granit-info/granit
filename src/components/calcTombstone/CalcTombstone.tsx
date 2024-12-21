import { useEffect, useState } from "react";
import css from "./calcTombstone.module.css";
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

export default function CalcTombstone() {
  const {
    priseFioIndivid,
    priseFacet,
    priseBackside,
    priseHackle,
    priseKopir,
  } = usePriseContext();

  const [isValidForm, setIsValidForm] = useState<boolean>(false);

  // Начальное состояние формы
  const [formData, setFormData] = useSyncedState<FormData>(
    "formDataTombstone",
    {
      width: undefined,
      height: undefined,
      thickness: undefined,
      dropdown: null,
    }
  );

  const [hackleTombstone, setHackleTombstone] = useSyncedState<
    number | undefined
  >("hackleTombstone", undefined);

  const [facetSizeTombstone, setFacetSizeTombstone] = useSyncedState<number>(
    "facetSizeTombstone",
    0
  );
  const [facetLenghtTombstone, setFacetLenghtTombstone] = useSyncedState<
    number | undefined
  >("facetLenghtTombstone", undefined);
  const [fioFormatTombstone, setFioFormatTombstone] = useSyncedState<number>(
    "fioFormatTombstone",
    0
  );

  const [backsideSizeTombstone, setBacksideSizeTombstone] =
    useSyncedState<BacksideSize>("backsideSizeTombstone", {
      width: undefined,
      height: undefined,
      isPhoto: false,
    });
  const [kopirTombstone, setKopirTombstone] = useSyncedState<Kopir>(
    "kopirTombstone",
    {
      lenght: undefined,
      isPolished: false,
    }
  );

  const [fioIndSizeTombstone, setFioIndSizeTombstone] =
    useSyncedState<FioIndSize>("fioIndSizeTombstone", {
      width: undefined,
      height: undefined,
    });

  const [costMaterial, setCostMaterial] = useState<number>(0);
  const [costFacet, setCostFacet] = useState<number>(0);
  const [costFio, setCostFio] = useState<number>(0);
  const [costBackside, setCostBackside] = useState<number>(0);
  const [costKopir, setCostKopir] = useState<number>(0);
  const [costHackle, setCostHackle] = useState<number>(0);
  const [costTotal, setCostTotal] = useState<number>(0);

  // подсчет итоговой стоимости
  useEffect(() => {
    if (isValidForm) {
      const totalCost =
        (costMaterial || 0) +
        (costFacet || 0) +
        (costKopir || 0) +
        (costFio || 0) +
        (costHackle || 0) +
        (costBackside || 0);

      setCostTotal(totalCost);
    } else {
      setCostTotal(0); // Сброс суммы, если форма недействительна
    }
  }, [
    costBackside,
    costFacet,
    costFio,
    costKopir,
    costHackle,
    costMaterial,
    isValidForm,
  ]);

  // Используем useEffect для автоматической проверки при изменении formData
  useEffect(() => {
    const checkForm = () => {
      const isValid =
        formData.width !== undefined &&
        formData.height !== undefined &&
        formData.thickness !== undefined &&
        formData.dropdown !== null;
      setIsValidForm(isValid);
      if (isValid && !facetLenghtTombstone) {
        setFacetLenghtTombstone(
          parseFloat((formData.height! * 2 + formData.width!*2).toFixed(3))
        );
      }
      if (
        formData.width &&
        formData.height &&
        formData.thickness &&
        formData.dropdown &&
        formData.dropdown.price
      ) {
        const cost =
          formData.thickness < 0.04
            ? (formData.width *
                formData.height *
                formData.thickness *
                formData.dropdown.price) /
              1.2
            : formData.width *
              formData.height *
              formData.thickness *
              formData.dropdown.price;

        setCostMaterial(cost);
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
    setFacetLenghtTombstone(parsedValue > 0 ? parsedValue : 0);

    // Если значение пустое или меньше либо равно 0, устанавливаем выбранный Radio в "фазка не потрібна"
    if (!parsedValue || parsedValue <= 0) {
      setFacetSizeTombstone(0);
    }
  };

  // Обработчик изменения поля ввода размеров для  КОПІР
  const handleKopirChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Kopir
  ) => {
    const { value } = e.target as HTMLInputElement;
    setKopirTombstone({
      ...kopirTombstone,
      [field]: parseFloat(value),
    });
  };

  // Обработчик изменения isPolished для  КОПІР
  const handleKopirIsPolishedChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const { checked } = event.target;
    setKopirTombstone((prevState) => ({
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
    setBacksideSizeTombstone({
      ...backsideSizeTombstone,
      [field]: parseFloat(value),
    });
  };

  // Обработчик изменения isPhoto для  ЗВОРОТНЯ СТОРОНА
  const handleBacksideIsPhotoChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const { checked } = event.target;
    setBacksideSizeTombstone((prevState) => ({
      ...prevState,
      [field]: checked,
    }));
  };

  // хук для отслеживаниия изменений в ЗВОРОТНЯ СТОРОНА
  useEffect(() => {
    let calculatedCost = 0;

    if (
      backsideSizeTombstone.height &&
      backsideSizeTombstone.width &&
      priseBackside.prise &&
      priseBackside.photoKoef
    ) {
      calculatedCost =
        backsideSizeTombstone.height *
        backsideSizeTombstone.width *
        priseBackside.prise;
      calculatedCost *= backsideSizeTombstone.isPhoto
        ? priseBackside.photoKoef
        : 1;
    }

    setCostBackside(calculatedCost);
  }, [
    backsideSizeTombstone.height,
    backsideSizeTombstone.isPhoto,
    backsideSizeTombstone.width,
    priseBackside.photoKoef,
    priseBackside.prise,
  ]);

  // хук для отслеживаниия изменений в КОПІР
  useEffect(() => {
    let calculatedCost = 0;

    if (
      kopirTombstone.lenght &&
      priseKopir.prise &&
      priseKopir.polishedKoef &&
      formData.thickness
    ) {
      calculatedCost =
        kopirTombstone.lenght * formData.thickness * priseKopir.prise;
      calculatedCost *= kopirTombstone.isPolished ? priseKopir.polishedKoef : 1;
    }

    setCostKopir(calculatedCost);
  }, [
    formData.thickness,
    kopirTombstone.isPolished,
    kopirTombstone.lenght,
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

    switch (facetSizeTombstone) {
      case 1:
        calculatedCostFacet = facetLenghtTombstone! * priseFacet.first!;
        break;
      case 2:
        calculatedCostFacet = facetLenghtTombstone! * priseFacet.second!;
        break;
      case 3:
        calculatedCostFacet = facetLenghtTombstone! * priseFacet.third!;
        break;
      default:
        calculatedCostFacet = 0;
    }

    setCostFacet(calculatedCostFacet);
  }, [formData, facetSizeTombstone, priseFacet, facetLenghtTombstone]);

  // Обработчик изменения радиокнопок фазки
  const handleRadioFacetChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selected = parseInt(event.target.value);
    setFacetSizeTombstone(selected);
  };

  // Обработчик выбора радиокнопки ФИО
  const handleRadioFioTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFioFormatTombstone(parseInt(event.target.value));
  };

  // Обработчик изменения поля ввода FIO IndSize
  const handleFioIndSizeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof FioIndSize
  ) => {
    const { value } = e.target as HTMLInputElement;
    setFioIndSizeTombstone({
      ...fioIndSizeTombstone,
      [field]: parseFloat(value),
    });
  };
  useEffect(() => {
    if (
      fioFormatTombstone == 1 &&
      fioIndSizeTombstone.height &&
      fioIndSizeTombstone.width &&
      priseFioIndivid
    ) {
      setCostFio(
        fioIndSizeTombstone.height * fioIndSizeTombstone.width * priseFioIndivid
      );
    }
    if (
      fioFormatTombstone == 1 &&
      (!fioIndSizeTombstone.height ||
        !fioIndSizeTombstone.width ||
        !priseFioIndivid)
    ) {
      setCostFio(0);
    }
  }, [
    fioFormatTombstone,
    fioIndSizeTombstone.height,
    fioIndSizeTombstone.width,
    priseFioIndivid,
  ]);

  // Обработчик изменения поля ввода пір'я
  useEffect(() => {
    if (hackleTombstone) {
      const calcCost = hackleTombstone * priseHackle; // Расчет стоимости
      setCostHackle(calcCost); // Обновляем стоимость
    } else {
      setCostHackle(0);
    }
  }, [hackleTombstone, priseHackle]);

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
                label="Довжина, м"
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
                  Площа однієї сторони:{" "}
                  {(formData.width * formData.height).toFixed(2)} м²
                </p>
                <p>
                  Загальний периметр:{" "}
                  {((formData.width + formData.height) * 2).toFixed(2)} м.п.
                </p>
                <p>
                  Загальна довжина фаски:{" "}
                  {(formData.height! * 2 + formData.width!*2).toFixed(2)} м.п.
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
                  facetLenghtTombstone ??
                  (formData.height! * 2 + formData.width!*2).toFixed(3)
                }
                onChange={(e) => handleChangeFacet(e)}
                margin="dense"
                disabled={!isValidForm}
              />

              <RadioGroup
                aria-labelledby="radio-buttons-group-facet"
                value={facetSizeTombstone}
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
                        !facetLenghtTombstone ||
                        facetLenghtTombstone <= 0
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
                        !facetLenghtTombstone ||
                        facetLenghtTombstone <= 0
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
                        !facetLenghtTombstone ||
                        facetLenghtTombstone <= 0
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
            {facetSizeTombstone > 0 && facetLenghtTombstone && isValidForm ? (
              <div className={css.textResult}>
                <p>
                  Врахована довжина фаски: {facetLenghtTombstone.toFixed(2)}{" "}
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
                  value={kopirTombstone.lenght || undefined}
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
                disabled={!isValidForm || !kopirTombstone.lenght}
                control={
                  <Checkbox
                    name="kopir-polished"
                    checked={kopirTombstone.isPolished}
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
            {kopirTombstone.lenght && formData.thickness && isValidForm ? (
              <div className={css.textResult}>
                <p>
                  Загальна площа копіру:{" "}
                  {kopirTombstone.lenght * formData.thickness} м²
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

        {/*                                                            --------------------------  ПІР'Я  */}
        <div className={css.sheet}>
          <div className={css.leftSide}>
            <div className={css.hackle}>
              <FormLabel id="hackle">Задайте довжину пір'я:</FormLabel>
              <br />

              <TextField
                id="hackle"
                label="Довжина, м.п."
                variant="standard"
                type="number"
                value={hackleTombstone || undefined}
                onChange={(e) => setHackleTombstone(parseFloat(e.target.value))}
                margin="dense"
                disabled={!isValidForm}
              />
              <p className={css.secondaryText}>
                Ціна: {priseHackle} грн. за м.п.
              </p>
            </div>
          </div>
          <div className={css.rightSide}>
            {hackleTombstone && hackleTombstone > 0 && isValidForm ? (
              <div className={css.textResult}>
                <p>Загальна довжина пір'я: {hackleTombstone} м.п.</p>
                <p className={css.textCost}>
                  Вартість:{" "}
                  {Number(costHackle.toFixed(2)).toLocaleString("ru-RU")} грн.
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
                  value={backsideSizeTombstone.height || undefined}
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
                  value={backsideSizeTombstone.width || undefined}
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
                  !backsideSizeTombstone.height ||
                  !backsideSizeTombstone.width
                }
                control={
                  <Checkbox
                    name="backside-photo"
                    checked={backsideSizeTombstone.isPhoto}
                    onChange={(e) => handleBacksideIsPhotoChange(e, "isPhoto")}
                  />
                }
                label={`Позолота  (ціна множиться на ${priseBackside.photoKoef})`}
              />
            </div>
          </div>
          <div className={css.rightSide}>
            {backsideSizeTombstone.height &&
            backsideSizeTombstone.width &&
            isValidForm ? (
              <div className={css.textResult}>
                <p>
                  Загальна площа малюнку:{" "}
                  {backsideSizeTombstone.height * backsideSizeTombstone.width}{" "}
                  м²
                </p>
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
              <p>Піскоструй </p>
              <hr /> <br />
              <FormControl>
                <FormLabel id="radio-buttons-group-fio">
                  Задайте розміри для надпису:
                </FormLabel>
                <RadioGroup
                  aria-labelledby="radio-buttons-group-fio"
                  value={fioFormatTombstone}
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
                        value={fioIndSizeTombstone.height || undefined}
                        onChange={(e) => handleFioIndSizeChange(e, "height")}
                        margin="dense"
                        disabled={!isValidForm || fioFormatTombstone == 0}
                        style={{ width: "100px" }}
                      />
                      <p>x</p>
                      <TextField
                        id="fio-width"
                        label="Ширина, м"
                        variant="standard"
                        type="number"
                        value={fioIndSizeTombstone.width || undefined}
                        onChange={(e) => handleFioIndSizeChange(e, "width")}
                        margin="dense"
                        disabled={!isValidForm || fioFormatTombstone == 0}
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
            {fioFormatTombstone == 1 &&
            fioIndSizeTombstone.height &&
            fioIndSizeTombstone.width &&
            isValidForm ? (
              <div className={css.textResult}>
                <p>
                  Загальна площа зображення:{" "}
                  {fioIndSizeTombstone.height * fioIndSizeTombstone.width} м²
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
              Загальна вартість надгробної плити:{" "}
              <b>{Number(costTotal.toFixed(2)).toLocaleString("ru-RU")} грн.</b>
            </AccordionSummary>
            <AccordionDetails>
              {costMaterial && isValidForm ? (
                <p className={css.textCost}>
                  Матеріал (Плита надгробна):{" "}
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

              {costHackle && isValidForm ? (
                <p className={css.textCost}>
                  Пір'я: {Number(costHackle.toFixed(2)).toLocaleString("ru-RU")}{" "}
                  грн.
                </p>
              ) : (
                <p> </p>
              )}

              {costFio && isValidForm ? (
                <p className={css.textCost}>
                  Піскоструй:{" "}
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
