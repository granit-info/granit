import { useEffect, useState } from "react";
import css from "./CalcCrossGlued.module.css";
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

export default function CalcCrossGlued() {

  const koefCrossGlued = 2.5;
  const koefCrossGluedBackSide = 1.2;

  const { priseFioIndivid, priseFacet, priseBackside, priseKopir } =
    usePriseContext();

  const [isValidForm, setIsValidForm] = useState<boolean>(false);

  // Начальное состояние формы 1
  const [formData1, setFormData1] = useSyncedState<FormData>(
    "formDataCrossGlued1",
    {
      width: undefined,
      height: undefined,
      thickness: undefined,
      dropdown: null,
    }
  );
  // Начальное состояние формы 2
  const [formData2, setFormData2] = useSyncedState<FormData>(
    "formDataCrossGlued2",
    {
      width: undefined,
      height: undefined,
      thickness: undefined,
      dropdown: null,
    }
  );
  // Начальное состояние формы 3
  const [formData3, setFormData3] = useSyncedState<FormData>(
    "formDataCrossGlued3",
    {
      width: undefined,
      height: undefined,
      thickness: undefined,
      dropdown: null,
    }
  );

  const [facetSizeCrossGlued, setFacetSizeCrossGlued] = useSyncedState<number>(
    "facetSizeCrossGlued",
    0
  );
  const [facetLenghtCrossGlued, setFacetLenghtCrossGlued] = useSyncedState<
    number | undefined
  >("facetLenghtCrossGlued", undefined);
  const [fioFormatCrossGlued, setFioFormatCrossGlued] = useSyncedState<number>(
    "fioFormatCrossGlued",
    0
  );

  const [backsideSizeCrossGlued, setBacksideSizeCrossGlued] =
    useSyncedState<BacksideSize>("backsideSizeCrossGlued", {
      width: undefined,
      height: undefined,
      isPhoto: false,
    });
  const [kopirCrossGlued, setKopirCrossGlued] = useSyncedState<Kopir>(
    "kopirCrossGlued",
    {
      lenght: undefined,
      isPolished: false,
    }
  );

  const [fioIndSizeCrossGlued, setFioIndSizeCrossGlued] =
    useSyncedState<FioIndSize>("fioIndSizeCrossGlued", {
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

  // Используем useEffect для автоматической проверки при изменении formData1
  useEffect(() => {
    const checkForm = () => {
      const isValid =
        formData1.width !== undefined &&
        formData1.height !== undefined &&
        formData1.thickness !== undefined &&
        formData1.dropdown !== null &&
        formData2.width !== undefined &&
        formData2.height !== undefined &&
        formData2.thickness !== undefined &&
        formData2.dropdown !== null &&
        formData3.width !== undefined &&
        formData3.height !== undefined &&
        formData3.thickness !== undefined &&
        formData3.dropdown !== null;
      setIsValidForm(isValid);
      if (
        formData1.width &&
        formData1.height &&
        formData1.thickness &&
        formData1.dropdown &&
        formData1.dropdown.price &&
        formData2.width &&
        formData2.height &&
        formData2.thickness &&
        formData2.dropdown &&
        formData2.dropdown.price &&
        formData3.width &&
        formData3.height &&
        formData3.thickness &&
        formData3.dropdown &&
        formData3.dropdown.price
      ) {
        const calcCostCrossMaterial =
          (formData1.width *
            formData1.height *
            formData1.thickness *
            formData1.dropdown.price +
            formData2.width *
              formData2.height *
              formData2.thickness *
              formData2.dropdown.price +
            formData3.width *
              formData3.height *
              formData3.thickness *
              formData3.dropdown.price) *
          koefCrossGlued;
        setCostMaterial(calcCostCrossMaterial);
      } else {
        setCostMaterial(0);
      }
    };
    checkForm(); // Проверка после каждого обновления данных формы
  }, [formData1, formData2, formData3]);

  // Обработчик изменения поля ввода FormData1
  const handleChangeForm1 = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof FormData
  ) => {
    const { value } = e.target as HTMLInputElement;
    setFormData1({
      ...formData1,
      [field]: parseFloat(value),
    });
  };

  // Обработчик изменения поля ввода FormData2
  const handleChangeForm2 = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof FormData
  ) => {
    const { value } = e.target as HTMLInputElement;
    setFormData2({
      ...formData2,
      [field]: parseFloat(value),
    });
  };

  // Обработчик изменения поля ввода FormData1
  const handleChangeForm3 = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof FormData
  ) => {
    const { value } = e.target as HTMLInputElement;
    setFormData3({
      ...formData3,
      [field]: parseFloat(value),
    });
  };

  // Обработчик выбора материала из выпадающего списка FormData1
  const handleDropdownChangeForm1 = (selectedMaterial: Material | null) => {
    setFormData1({
      ...formData1,
      dropdown: selectedMaterial,
    });
  };

  // Обработчик выбора материала из выпадающего списка FormData2
  const handleDropdownChangeForm2 = (selectedMaterial: Material | null) => {
    setFormData2({
      ...formData2,
      dropdown: selectedMaterial,
    });
  };

  // Обработчик выбора материала из выпадающего списка FormData3
  const handleDropdownChangeForm3 = (selectedMaterial: Material | null) => {
    setFormData3({
      ...formData3,
      dropdown: selectedMaterial,
    });
  };

  // Обработчик изменения поля ввода фазка длина
  const handleChangeFacet = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const parsedValue = parseFloat(e.target.value);

    // Обновляем длину фазки
    setFacetLenghtCrossGlued(parsedValue > 0 ? parsedValue : 0);

    // Если значение пустое или меньше либо равно 0, устанавливаем выбранный Radio в "фазка не потрібна"
    if (!parsedValue || parsedValue <= 0) {
      setFacetSizeCrossGlued(0);
    }
  };

  // Обработчик изменения поля ввода размеров для  КОПІР
  const handleKopirChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Kopir
  ) => {
    const { value } = e.target as HTMLInputElement;
    setKopirCrossGlued({
      ...kopirCrossGlued,
      [field]: parseFloat(value),
    });
  };

  // Обработчик изменения isPolished для  КОПІР
  const handleKopirIsPolishedChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const { checked } = event.target;
    setKopirCrossGlued((prevState) => ({
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
    setBacksideSizeCrossGlued({
      ...backsideSizeCrossGlued,
      [field]: parseFloat(value),
    });
  };

  // Обработчик изменения isPhoto для  ЗВОРОТНЯ СТОРОНА
  const handleBacksideIsPhotoChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const { checked } = event.target;
    setBacksideSizeCrossGlued((prevState) => ({
      ...prevState,
      [field]: checked,
    }));
  };

  // хук для отслеживаниия изменений в ЗВОРОТНЯ СТОРОНА
  useEffect(() => {
    let calculatedCost = 0;

    if (
      backsideSizeCrossGlued.height &&
      backsideSizeCrossGlued.width &&
      priseBackside.prise &&
      priseBackside.photoKoef
    ) {
      calculatedCost =
        backsideSizeCrossGlued.height *
        backsideSizeCrossGlued.width *
        priseBackside.prise;
      calculatedCost *= backsideSizeCrossGlued.isPhoto
        ? priseBackside.photoKoef
        : 1;
    }

    setCostBackside(calculatedCost * koefCrossGluedBackSide);
  }, [
    backsideSizeCrossGlued.height,
    backsideSizeCrossGlued.isPhoto,
    backsideSizeCrossGlued.width,
    priseBackside.photoKoef,
    priseBackside.prise,
  ]);

  // хук для отслеживаниия изменений в КОПІР
  useEffect(() => {
    let calculatedCost = 0;

    if (
      kopirCrossGlued.lenght &&
      priseKopir.prise &&
      priseKopir.polishedKoef &&
      formData1.thickness
    ) {
      calculatedCost =
        kopirCrossGlued.lenght * formData1.thickness * priseKopir.prise;
      calculatedCost *= kopirCrossGlued.isPolished
        ? priseKopir.polishedKoef
        : 1;
    }

    setCostKopir(calculatedCost);
  }, [
    formData1.thickness,
    kopirCrossGlued.isPolished,
    kopirCrossGlued.lenght,
    priseKopir.polishedKoef,
    priseKopir.prise,
  ]);

  // Обработчик изменения радиокнопок фазки и задаем стоимость
  useEffect(() => {
    let calculatedCostFacet = 0;

    switch (facetSizeCrossGlued) {
      case 1:
        calculatedCostFacet = facetLenghtCrossGlued! * priseFacet.first!;
        break;
      case 2:
        calculatedCostFacet = facetLenghtCrossGlued! * priseFacet.second!;
        break;
      case 3:
        calculatedCostFacet = facetLenghtCrossGlued! * priseFacet.third!;
        break;
      default:
        calculatedCostFacet = 0;
    }

    setCostFacet(calculatedCostFacet);
  }, [facetSizeCrossGlued, priseFacet, facetLenghtCrossGlued]);

  // Обработчик изменения радиокнопок фазки
  const handleRadioFacetChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selected = parseInt(event.target.value);
    setFacetSizeCrossGlued(selected);
  };

  // Обработчик выбора радиокнопки ФИО
  const handleRadioFioTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFioFormatCrossGlued(parseInt(event.target.value));
  };

  // Обработчик изменения поля ввода FIO IndSize
  const handleFioIndSizeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof FioIndSize
  ) => {
    const { value } = e.target as HTMLInputElement;
    setFioIndSizeCrossGlued({
      ...fioIndSizeCrossGlued,
      [field]: parseFloat(value),
    });
  };
  useEffect(() => {
    if (
      fioFormatCrossGlued == 1 &&
      fioIndSizeCrossGlued.height &&
      fioIndSizeCrossGlued.width &&
      priseFioIndivid
    ) {
      setCostFio(
        fioIndSizeCrossGlued.height *
          fioIndSizeCrossGlued.width *
          priseFioIndivid
      );
    }
    if (
      fioFormatCrossGlued == 1 &&
      (!fioIndSizeCrossGlued.height ||
        !fioIndSizeCrossGlued.width ||
        !priseFioIndivid)
    ) {
      setCostFio(0);
    }
  }, [
    fioFormatCrossGlued,
    fioIndSizeCrossGlued.height,
    fioIndSizeCrossGlued.width,
    priseFioIndivid,
  ]);

  return (
    <>
      <div className={css.container}>
        {/*                                                 --------------------------   РАЗМЕРЫ и материал 1 */}
        <div className={css.sheet}>
          <div className={css.leftSide}>
            <FormLabel id="form1">Ножка</FormLabel>
            <br />
            <div className={css.sizes}>
              <p>Задайте розмір: &nbsp;</p>
              <TextField
                id="field2"
                label="Висота, м"
                variant="standard"
                type="number"
                value={formData1.height || undefined}
                onChange={(e) => handleChangeForm1(e, "height")}
                margin="normal"
                required
              />
              x
              <TextField
                id="field1"
                label="Ширина, м"
                variant="standard"
                type="number"
                value={formData1.width || undefined}
                onChange={(e) => handleChangeForm1(e, "width")}
                margin="normal"
                required
              />
              x
              <TextField
                id="field3"
                label="Товщина, м"
                variant="standard"
                type="number"
                value={formData1.thickness || undefined}
                onChange={(e) => handleChangeForm1(e, "thickness")}
                margin="normal"
                required
              />
            </div>

            <CustomDropdown
              onSelect={handleDropdownChangeForm1}
              selectedMaterial={formData1.dropdown}
            />
          </div>

          <div className={css.rightSide}>
            {formData1.width &&
            formData1.height &&
            formData1.thickness &&
            formData1.dropdown ? (
              <div className={css.textResult}>
                <p>
                  Об'єм ножки:{" "}
                  {(
                    formData1.width *
                    formData1.height *
                    formData1.thickness
                  ).toFixed(4)}{" "}
                  м³
                </p>
                <p>
                  Площа однієї сторони:{" "}
                  {(formData1.width * formData1.height).toFixed(4)} м²
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
                 
              </p>
            )}
          </div>
        </div>

        {/*                                                 --------------------------   РАЗМЕРЫ и материал 2 */}
        <div className={css.sheet}>
          <div className={css.leftSide}>
            <FormLabel id="form2">Перемичка</FormLabel>
            <br />
            <div className={css.sizes}>
              <p>Задайте розмір: &nbsp;</p>
              <TextField
                id="field2"
                label="Висота, м"
                variant="standard"
                type="number"
                value={formData2.height || undefined}
                onChange={(e) => handleChangeForm2(e, "height")}
                margin="normal"
                required
              />
              x
              <TextField
                id="field1"
                label="Ширина, м"
                variant="standard"
                type="number"
                value={formData2.width || undefined}
                onChange={(e) => handleChangeForm2(e, "width")}
                margin="normal"
                required
              />
              x
              <TextField
                id="field3"
                label="Товщина, м"
                variant="standard"
                type="number"
                value={formData2.thickness || undefined}
                onChange={(e) => handleChangeForm2(e, "thickness")}
                margin="normal"
                required
              />
            </div>

            <CustomDropdown
              onSelect={handleDropdownChangeForm2}
              selectedMaterial={formData2.dropdown}
            />
          </div>

          <div className={css.rightSide}>
            {formData2.width &&
            formData2.height &&
            formData2.thickness &&
            formData2.dropdown ? (
              <div className={css.textResult}>
                <p>
                  Об'єм перемички:{" "}
                  {(
                    formData2.width *
                    formData2.height *
                    formData2.thickness
                  ).toFixed(4)}{" "}
                  м³
                </p>
                <p>
                  Площа однієї сторони:{" "}
                  {(formData2.width * formData2.height).toFixed(4)} м²
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
                
              </p>
            )}
          </div>
        </div>

        {/*                                                 --------------------------   РАЗМЕРЫ и материал 3 */}
        <div className={css.sheet}>
          <div className={css.leftSide}>
            <FormLabel id="form3">Шапка</FormLabel>
            <br />
            <div className={css.sizes}>
              <p>Задайте розмір: &nbsp;</p>
              <TextField
                id="field2"
                label="Висота, м"
                variant="standard"
                type="number"
                value={formData3.height || undefined}
                onChange={(e) => handleChangeForm3(e, "height")}
                margin="normal"
                required
              />
              x
              <TextField
                id="field1"
                label="Ширина, м"
                variant="standard"
                type="number"
                value={formData3.width || undefined}
                onChange={(e) => handleChangeForm3(e, "width")}
                margin="normal"
                required
              />
              x
              <TextField
                id="field3"
                label="Товщина, м"
                variant="standard"
                type="number"
                value={formData3.thickness || undefined}
                onChange={(e) => handleChangeForm3(e, "thickness")}
                margin="normal"
                required
              />
            </div>

            <CustomDropdown
              onSelect={handleDropdownChangeForm3}
              selectedMaterial={formData3.dropdown}
            />
          </div>

          <div className={css.rightSide}>
            {formData3.width &&
            formData3.height &&
            formData3.thickness &&
            formData3.dropdown &&
            isValidForm ? (
              <div className={css.textResult}>
                <p>
                  Об'єм шапки:{" "}
                  {(
                    formData3.width *
                    formData3.height *
                    formData3.thickness
                  ).toFixed(4)}{" "}
                  м³
                </p>
                <p>
                  Площа однієї сторони:{" "}
                  {(formData3.width * formData3.height).toFixed(4)} м²
                </p>
                <br/>
                <p>
                  Враховано коефіцієнт:{" "}
                  x{koefCrossGlued} 
                </p>
                <p className={css.textCost}>
                  Загальна вартість матеріалу:{" "}
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
                Виберіть матеріали та вкажіть ВСІ розміри!
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
                value={facetLenghtCrossGlued ?? 0}
                onChange={(e) => handleChangeFacet(e)}
                margin="dense"
                disabled={!isValidForm}
              />

              <RadioGroup
                aria-labelledby="radio-buttons-group-facet"
                value={facetSizeCrossGlued}
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
                        !facetLenghtCrossGlued ||
                        facetLenghtCrossGlued <= 0
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
                        !facetLenghtCrossGlued ||
                        facetLenghtCrossGlued <= 0
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
                        !facetLenghtCrossGlued ||
                        facetLenghtCrossGlued <= 0
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
            {facetSizeCrossGlued > 0 && facetLenghtCrossGlued && isValidForm ? (
              <div className={css.textResult}>
                <p>
                  Врахована довжина фаски: {facetLenghtCrossGlued.toFixed(2)}{" "}
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
                  value={backsideSizeCrossGlued.height || undefined}
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
                  value={backsideSizeCrossGlued.width || undefined}
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
                  !backsideSizeCrossGlued.height ||
                  !backsideSizeCrossGlued.width
                }
                control={
                  <Checkbox
                    name="backside-photo"
                    checked={backsideSizeCrossGlued.isPhoto}
                    onChange={(e) => handleBacksideIsPhotoChange(e, "isPhoto")}
                  />
                }
                label={`Позолота  (ціна множиться на ${priseBackside.photoKoef})`}
              />
            </div>
          </div>
          <div className={css.rightSide}>
            {backsideSizeCrossGlued.height &&
            backsideSizeCrossGlued.width &&
            isValidForm ? (
              <div className={css.textResult}>
                <p>
                  Загальна площа малюнку:{" "}
                  {backsideSizeCrossGlued.height * backsideSizeCrossGlued.width}{" "}
                  м²
                </p>
                <br />
                <p>Враховано коефіцієнт: x{koefCrossGluedBackSide}</p>
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
                  value={kopirCrossGlued.lenght || undefined}
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
                disabled={!isValidForm || !kopirCrossGlued.lenght}
                control={
                  <Checkbox
                    name="kopir-polished"
                    checked={kopirCrossGlued.isPolished}
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
            {kopirCrossGlued.lenght && formData1.thickness && isValidForm ? (
              <div className={css.textResult}>
                <p>
                  Загальна площа копіру:{" "}
                  {kopirCrossGlued.lenght * formData1.thickness} м²
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
                  value={fioFormatCrossGlued}
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
                        value={fioIndSizeCrossGlued.height || undefined}
                        onChange={(e) => handleFioIndSizeChange(e, "height")}
                        margin="dense"
                        disabled={!isValidForm || fioFormatCrossGlued == 0}
                        style={{ width: "100px" }}
                      />
                      <p>x</p>
                      <TextField
                        id="fio-width"
                        label="Ширина, м"
                        variant="standard"
                        type="number"
                        value={fioIndSizeCrossGlued.width || undefined}
                        onChange={(e) => handleFioIndSizeChange(e, "width")}
                        margin="dense"
                        disabled={!isValidForm || fioFormatCrossGlued == 0}
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
            {fioFormatCrossGlued == 1 &&
            fioIndSizeCrossGlued.height &&
            fioIndSizeCrossGlued.width &&
            isValidForm ? (
              <div className={css.textResult}>
                <p>
                  Загальна площа зображення:{" "}
                  {fioIndSizeCrossGlued.height * fioIndSizeCrossGlued.width} м²
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
              Загальна вартість (Хрест клеєний):{" "}
              <b>{Number(costTotal.toFixed(2)).toLocaleString("ru-RU")} грн.</b>
            </AccordionSummary>
            <AccordionDetails>
              {costMaterial && isValidForm ? (
                <p className={css.textCost}>
                  Матеріал (Хрест клеєний):{" "}
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
