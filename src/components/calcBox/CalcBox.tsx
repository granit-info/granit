import { useEffect, useState } from "react";
import css from "./CalcBox.module.css";
import CustomDropdown from "../customDropdown/CustomDropdown";
import { Material } from "../../interfaces/Material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { PriseFioFormat } from "../../interfaces/Price";
import {
  BacksideSize,
  CutoutSize,
  FioIndSize,
  FormData,
  PoemAddWord,
} from "../../interfaces/data";
import { usePriseContext } from "../../globalContext/usePriseContext";
import { useSyncedState } from "../../tools/useSyncedState";

export default function CalcBox() {
  const {
    prisePoemAddWord,
    priseFioFormat,
    priseFioIndivid,
    priseFacet,
    prisePoem,
    priseBackside,
    priseCutout,
    priseArtwork,
  } = usePriseContext();

  const [isValidForm, setIsValidForm] = useState<boolean>(false);

  // Начальное состояние формы
  const [formData, setFormData] = useSyncedState<FormData>("formDataBox", {
    width: undefined,
    height: undefined,
    thickness: undefined,
    dropdown: null,
  });

  const [facetSizeBox, setFacetSizeBox] = useSyncedState<number>(
    "facetSizeBox",
    0
  );

  const [facetLenghtBox, setFacetLenghtBox] = useSyncedState<
    number | undefined
  >("facetLenghtBox", undefined);

  const [fioFormatBox, setFioFormatBox] = useSyncedState<number>(
    "fioFormatBox",
    0
  );

  const [selectedFioFormatBox, setSelectedFioFormatBox] =
    useSyncedState<PriseFioFormat | null>("selectedFioFormatBox", null);

  const [selectedCutoutBox, setSelectedCutoutBox] = useSyncedState<
    number | undefined
  >("selectedCutoutBox", undefined);

  const [poemLenghtBox, setPoemLenghtBox] = useSyncedState<number | undefined>(
    "poemLenghtBox",
    undefined
  );

  const [poemSizeBox, setPoemSizeBox] = useSyncedState<number | undefined>(
    "poemSizeBox",
    undefined
  );

  const [artCheckboxStateBox, setArtCheckboxStateBox] = useSyncedState<{
    artwork: boolean;
    fioGold: boolean;
    poemGold: boolean;
  }>("artCheckboxStateBox", {
    artwork: false,
    fioGold: false,
    poemGold: false,
  });

  const [backsideSizeBox, setBacksideSizeBox] = useSyncedState<BacksideSize>(
    "backsideSizeBox",
    {
      width: undefined,
      height: undefined,
      isPhoto: false,
    }
  );

  const [cutoutSizeBox, setCutoutSizeBox] = useSyncedState<CutoutSize>(
    "cutoutSizeBox",
    {
      width: undefined,
      height: undefined,
    }
  );

  const [poemAddWordBox, setPoemAddWordBox] = useSyncedState<PoemAddWord>(
    "poemAddWordBox",
    {
      quantity: undefined,
      size: undefined,
    }
  );
  const [fioIndSizeBox, setFioIndSizeBox] = useSyncedState<FioIndSize>(
    "fioIndSizeBox",
    {
      width: undefined,
      height: undefined,
    }
  );

  const [costMaterial, setCostMaterial] = useState<number>(0);
  const [costFacet, setCostFacet] = useState<number>(0);
  const [costPoem, setCostPoem] = useState<number>(0);
  const [costCutout, setCostCutoutSize] = useState<number>(0);
  const [costFio, setCostFio] = useState<number>(0);
  const [costPoemAddWord, setCostPoemAddWord] = useState<number>(0);
  const [costArtwork, setCostArtwork] = useState<number>(0);
  const [costBackside, setCostBackside] = useState<number>(0);
  const [costTotal, setCostTotal] = useState<number>(0);

  // подсчет итоговой стоимости
  useEffect(() => {
    if (isValidForm) {
      const totalCost =
        (costMaterial || 0) +
        (costFacet || 0) +
        (costFio || 0) +
        (costPoem || 0) +
        (costPoemAddWord || 0) +
        (costCutout || 0) +
        (costArtwork || 0) +
        (costBackside || 0);

      setCostTotal(totalCost);
    } else {
      setCostTotal(0);
    }
  }, [
    isValidForm,
    costMaterial,
    costFacet,
    costFio,
    costPoem,
    costPoemAddWord,
    costCutout,
    costArtwork,
    costBackside,
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
      if (isValid && !facetLenghtBox) {
        setFacetLenghtBox(
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
    setFacetLenghtBox(parsedValue > 0 ? parsedValue : 0);

    // Если значение пустое или меньше либо равно 0, устанавливаем выбранный Radio в "фазка не потрібна"
    if (!parsedValue || parsedValue <= 0) {
      setFacetSizeBox(0);
    }
  };

  // Обработчик изменения поля ввода фазка длина
  const handleChangePoem = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const parsedValue = parseFloat(e.target.value);

    // Обновляем длину фазки
    setPoemLenghtBox(parsedValue);
  };

  // Обработчик изменения поля ввода размеров для  ЗВОРОТНЯ СТОРОНА
  const handleBacksideChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof BacksideSize
  ) => {
    const { value } = e.target as HTMLInputElement;
    setBacksideSizeBox({
      ...backsideSizeBox,
      [field]: parseFloat(value),
    });
  };

  // хук для отслеживаниия изменений в ЗВОРОТНЯ СТОРОНА
  useEffect(() => {
    let calculatedCost = 0;

    if (
      backsideSizeBox.height &&
      backsideSizeBox.width &&
      priseBackside.prise &&
      priseBackside.photoKoef
    ) {
      calculatedCost =
        backsideSizeBox.height * backsideSizeBox.width * priseBackside.prise;
      calculatedCost *= backsideSizeBox.isPhoto ? priseBackside.photoKoef : 1;
    }

    setCostBackside(calculatedCost);
  }, [
    backsideSizeBox.height,
    backsideSizeBox.isPhoto,
    backsideSizeBox.width,
    priseBackside.photoKoef,
    priseBackside.prise,
  ]);

  // Обработчик изменения поля ввода ВИРІЗКА
  const handleCutoutChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof CutoutSize
  ) => {
    const { value } = e.target as HTMLInputElement;
    setCutoutSizeBox({
      ...cutoutSizeBox,
      [field]: parseFloat(value),
    });
  };

  // Обработчик изменения поля ввода ВІРШ додаткові букви
  const handlePoemAddWordChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof PoemAddWord
  ) => {
    const { value } = e.target as HTMLInputElement;
    setPoemAddWordBox({
      ...poemAddWordBox,
      [field]: parseFloat(value),
    });
  };
  useEffect(() => {
    if (poemAddWordBox.quantity && poemAddWordBox.size) {
      setCostPoemAddWord(
        poemAddWordBox.quantity * poemAddWordBox.size * prisePoemAddWord
      );
    } else {
      setCostPoemAddWord(0);
    }
  }, [poemAddWordBox.quantity, poemAddWordBox.size, prisePoemAddWord]);

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

    switch (facetSizeBox) {
      case 1:
        calculatedCostFacet = facetLenghtBox! * priseFacet.first!;
        break;
      case 2:
        calculatedCostFacet = facetLenghtBox! * priseFacet.second!;
        break;
      case 3:
        calculatedCostFacet =
          (formData.height! * 2 + formData.width!) * priseFacet.third!;
        break;
      default:
        calculatedCostFacet = 0;
    }

    setCostFacet(calculatedCostFacet);
  }, [formData, facetSizeBox, priseFacet, facetLenghtBox]);

  // Обработчик изменения радиокнопок ВИРІЗКА и размеров и задаем стоимость
  useEffect(() => {
    let calculatedCost = 0;

    if (
      selectedCutoutBox &&
      cutoutSizeBox.height &&
      cutoutSizeBox.width &&
      priseCutout.flower &&
      priseCutout.other
    ) {
      switch (selectedCutoutBox) {
        case 1:
          calculatedCost =
            cutoutSizeBox.height * cutoutSizeBox.width * priseCutout.flower;
          break;
        case 2:
          calculatedCost =
            cutoutSizeBox.height * cutoutSizeBox.width * priseCutout.other;
          break;
        default:
          calculatedCost = 0;
      }

      setCostCutoutSize(calculatedCost);
    } else {
      setCostCutoutSize(0);
    }
  }, [
    cutoutSizeBox.height,
    cutoutSizeBox.width,
    priseCutout.flower,
    priseCutout.other,
    selectedCutoutBox,
  ]);

  // Обработчик изменения радиокнопок фазки
  const handleRadioFacetChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selected = parseInt(event.target.value);
    setFacetSizeBox(selected);
  };

  // Обработчик изменения радиокнопок ВІРШ
  const handleRadioPoemChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selected = parseInt(event.target.value);
    setPoemSizeBox(selected);
  };

  // Обработчик изменения радиокнопок ВИРІЗКА
  const handleRadioCutout = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = parseInt(event.target.value);
    setSelectedCutoutBox(selected);
  };

  // Обработчик изменения радиокнопок ВІРШ и задаем стоимость
  useEffect(() => {
    let calculatedCost = 0;

    switch (poemSizeBox) {
      case 1:
        calculatedCost = poemLenghtBox! * prisePoem.first!;
        break;
      case 2:
        calculatedCost = poemLenghtBox! * prisePoem.second!;
        break;

      default:
        calculatedCost = 0;
    }

    setCostPoem(calculatedCost);
  }, [poemLenghtBox, poemSizeBox, prisePoem.first, prisePoem.second]);

  // Обработчик выбора радиокнопки ФИО
  const handleRadioFioTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFioFormatBox(parseInt(event.target.value));
  };

  // Обработчик выбора из Autocomplete ФИО
  const handleAutocompleteFioFormatChange = (
    _: React.SyntheticEvent,
    newValue: PriseFioFormat | null
  ) => {
    setSelectedFioFormatBox(newValue);
  };
  useEffect(() => {
    if (
      fioFormatBox == 0 &&
      selectedFioFormatBox &&
      selectedFioFormatBox.prise
    ) {
      setCostFio(selectedFioFormatBox.prise);
    }
    if (
      fioFormatBox == 0 &&
      (!selectedFioFormatBox || !selectedFioFormatBox.prise)
    ) {
      setCostFio(0);
    }
  }, [fioFormatBox, selectedFioFormatBox]);

  // Обработчик изменения поля ввода FIO IndSize
  const handleFioIndSizeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof FioIndSize
  ) => {
    const { value } = e.target as HTMLInputElement;
    setFioIndSizeBox({
      ...fioIndSizeBox,
      [field]: parseFloat(value),
    });
  };
  useEffect(() => {
    if (
      fioFormatBox == 1 &&
      fioIndSizeBox.height &&
      fioIndSizeBox.width &&
      priseFioIndivid
    ) {
      setCostFio(fioIndSizeBox.height * fioIndSizeBox.width * priseFioIndivid);
    }
    if (
      fioFormatBox == 1 &&
      (!fioIndSizeBox.height || !fioIndSizeBox.width || !priseFioIndivid)
    ) {
      setCostFio(0);
    }
  }, [
    fioFormatBox,
    fioIndSizeBox.height,
    fioIndSizeBox.width,
    priseFioIndivid,
  ]);

  // Обработчик изменения чекбоксов для ХУДОЖКА
  const handleArtCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, checked } = event.target;
    setArtCheckboxStateBox((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  // Хук для пересчета стоимости ХУДОЖКА
  useEffect(() => {
    let cost = priseArtwork.fio! + priseArtwork.poem!;

    if (artCheckboxStateBox.artwork) {
      cost += artCheckboxStateBox.fioGold ? priseArtwork.fioGold! : 0;
      cost += artCheckboxStateBox.poemGold ? priseArtwork.poemGold! : 0;
      setCostArtwork(cost);
    } else {
      setCostArtwork(0);
    }
  }, [artCheckboxStateBox, priseArtwork]);

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
                  Площа однієї сторони:{" "}
                  {(formData.width * formData.height).toFixed(2)} м²
                </p>
                <p>
                  Загальний периметр:{" "}
                  {((formData.width + formData.height) * 2).toFixed(2)} м.п.
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

        {/*                                                      --------------------------   ХУДОЖКА */}
        <div className={css.sheet}>
          <div className={css.leftSide}>
            <div>
              <FormGroup>
                <FormControlLabel
                  disabled={!isValidForm}
                  control={
                    <Checkbox
                      name="artwork"
                      checked={artCheckboxStateBox.artwork}
                      onChange={handleArtCheckboxChange}
                    />
                  }
                  label="Художня робота:"
                />
                <div className={css.artwork}>
                  <p>
                    ➤ Прізвище, ім'я та по-батькові ({priseArtwork.fio} грн.)
                  </p>
                  <FormControlLabel
                    style={{ marginLeft: "10px", marginTop: "-15px" }}
                    control={
                      <Checkbox
                        size="small"
                        name="fioGold"
                        checked={artCheckboxStateBox.fioGold}
                        onChange={handleArtCheckboxChange}
                      />
                    }
                    label={`з позолотою  (додатково +${priseArtwork.fioGold} грн.)`}
                    disabled={!artCheckboxStateBox.artwork}
                  />
                  <p>➤ Вірш ({priseArtwork.poem} грн.)</p>
                  <FormControlLabel
                    style={{ marginLeft: "10px", marginTop: "-15px" }}
                    control={
                      <Checkbox
                        size="small"
                        name="poemGold"
                        checked={artCheckboxStateBox.poemGold}
                        onChange={handleArtCheckboxChange}
                      />
                    }
                    label={`з позолотою  (додатково +${priseArtwork.poemGold} грн.)`}
                    disabled={!artCheckboxStateBox.artwork}
                  />
                </div>
              </FormGroup>
            </div>
          </div>
          <div className={css.rightSide}>
            {artCheckboxStateBox.artwork && isValidForm ? (
              <div className={css.textResult}>
                <p className={css.textCost}>
                  Загальна вартість:{" "}
                  {Number(costArtwork.toFixed(2)).toLocaleString("ru-RU")} грн.
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
            <p>Зворотня сторона </p>
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
                  value={backsideSizeBox.height || undefined}
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
                  value={backsideSizeBox.width || undefined}
                  onChange={(e) => handleBacksideChange(e, "width")}
                  margin="dense"
                  disabled={!isValidForm}
                  style={{ width: "100px" }}
                />
              </div>
              <p className={css.secondaryText}>
                Ціна: {priseBackside.prise} грн. за м²
              </p>
            </div>
          </div>
          <div className={css.rightSide}>
            {backsideSizeBox.height && backsideSizeBox.width && isValidForm ? (
              <div className={css.textResult}>
                <p>
                  Загальна площа малюнку:{" "}
                  {backsideSizeBox.height * backsideSizeBox.width} м²
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

        {/*                                                      --------------------------   ВИРІЗКА */}
        <div className={css.sheet}>
          <div className={css.leftSide}>
            <div>
              <FormLabel id="cutout">Задайте розміри для вирізки:</FormLabel>
              <br />
              <div className={css.sizesHider}>
                <TextField
                  id="cutout-height"
                  label="Висота, м"
                  variant="standard"
                  type="number"
                  value={cutoutSizeBox.height || ""}
                  onChange={(e) => handleCutoutChange(e, "height")}
                  margin="dense"
                  disabled={!isValidForm}
                  style={{ width: "100px" }}
                />
                <p style={{ marginLeft: "10px", marginRight: "10px" }}>x</p>
                <TextField
                  id="cutout-width"
                  label="Ширина, м"
                  variant="standard"
                  type="number"
                  value={cutoutSizeBox.width || ""}
                  onChange={(e) => handleCutoutChange(e, "width")}
                  margin="dense"
                  disabled={!isValidForm}
                  style={{ width: "100px" }}
                />
              </div>
              <RadioGroup
                aria-labelledby="radio-buttons-group-cutout"
                value={selectedCutoutBox}
                onChange={handleRadioCutout}
                name="radio-buttons-group-cutout"
              >
                <FormControlLabel
                  value={1}
                  control={
                    <Radio
                      disabled={
                        !isValidForm ||
                        !cutoutSizeBox.height ||
                        !cutoutSizeBox.width
                      }
                    />
                  }
                  label={`Квіти (${priseCutout.flower} грн. за м²)`}
                  sx={{ marginLeft: "20px" }}
                />
                <FormControlLabel
                  value={2}
                  control={
                    <Radio
                      disabled={
                        !isValidForm ||
                        !cutoutSizeBox.height ||
                        !cutoutSizeBox.width
                      }
                    />
                  }
                  label={`Інше (${priseCutout.other} грн. за м²)`}
                  sx={{ marginLeft: "20px" }}
                />
              </RadioGroup>
            </div>
          </div>
          <div className={css.rightSide}>
            {cutoutSizeBox.height &&
            cutoutSizeBox.width &&
            selectedCutoutBox &&
            isValidForm ? (
              <div className={css.textResult}>
                <p>
                  Загальна площа вирізки:{" "}
                  {cutoutSizeBox.height * cutoutSizeBox.width} м²
                </p>
                <p className={css.textCost}>
                  Вартість:{" "}
                  {Number(costCutout.toFixed(2)).toLocaleString("ru-RU")} грн.
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
                  facetLenghtBox ??
                  (formData.height! * 2 + formData.width!).toFixed(3)
                }
                onChange={(e) => handleChangeFacet(e)}
                margin="dense"
                disabled={!isValidForm}
              />

              <RadioGroup
                aria-labelledby="radio-buttons-group-facet"
                value={facetSizeBox}
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
                        !isValidForm || !facetLenghtBox || facetLenghtBox <= 0
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
                        !isValidForm || !facetLenghtBox || facetLenghtBox <= 0
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
                        !isValidForm || !facetLenghtBox || facetLenghtBox <= 0
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
            {facetSizeBox > 0 && facetLenghtBox && isValidForm ? (
              <div className={css.textResult}>
                <p>Врахована довжина фаски: {facetLenghtBox.toFixed(2)} м.п.</p>
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

        {/*                                                          --------------------------  ФИО  */}
        <div className={css.sheet}>
          <div className={css.leftSide}>
            <div>
              <p>Піскоструй: Прізвище, ім'я, по батькові </p>
              <hr /> <br />
              <FormControl>
                <FormLabel id="radio-buttons-group-fio">
                  Задайте розміри для надпису:
                </FormLabel>
                <RadioGroup
                  aria-labelledby="radio-buttons-group-fio"
                  value={fioFormatBox}
                  onChange={handleRadioFioTypeChange}
                  name="radio-buttons-group-fio"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "end",
                      marginBottom: "10px",
                    }}
                  >
                    <FormControlLabel
                      value={0}
                      control={<Radio disabled={!isValidForm} />}
                      label="Стандартний формат"
                    />
                    <Autocomplete
                      disablePortal
                      options={priseFioFormat}
                      getOptionLabel={(option) =>
                        option.size + " - " + option.prise + "грн." || ""
                      }
                      value={selectedFioFormatBox}
                      onChange={handleAutocompleteFioFormatChange}
                      sx={{ width: 300 }}
                      disabled={!isValidForm || fioFormatBox == 1}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Оберіть розмір"
                          variant="standard"
                        />
                      )}
                    />
                  </div>

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
                        value={fioIndSizeBox.height || undefined}
                        onChange={(e) => handleFioIndSizeChange(e, "height")}
                        margin="dense"
                        disabled={!isValidForm || fioFormatBox == 0}
                        style={{ width: "100px" }}
                      />
                      <p>x</p>
                      <TextField
                        id="fio-width"
                        label="Ширина, м"
                        variant="standard"
                        type="number"
                        value={fioIndSizeBox.width || undefined}
                        onChange={(e) => handleFioIndSizeChange(e, "width")}
                        margin="dense"
                        disabled={!isValidForm || fioFormatBox == 0}
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
            {fioFormatBox == 0 && selectedFioFormatBox?.prise && isValidForm ? (
              <div className={css.textResult}>
                <p>Розмір надпису: {selectedFioFormatBox.size}</p>
                <p className={css.textCost}>
                  Вартість: {Number(costFio.toFixed(2)).toLocaleString("ru-RU")}{" "}
                  грн.
                </p>
              </div>
            ) : (
              <p> </p>
            )}
            {fioFormatBox == 1 &&
            fioIndSizeBox.height &&
            fioIndSizeBox.width &&
            isValidForm ? (
              <div className={css.textResult}>
                <p>
                  Загальна площа надпису:{" "}
                  {fioIndSizeBox.height * fioIndSizeBox.width} м²
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

        {/*                                                      --------------------------   ВІРШ  */}
        <div className={css.sheetPoem}>
          <div className={css.sheetPoemPart}>
            <div className={css.leftSide}>
              <p>Піскоструй: Вірш </p>
              <hr /> <br />
              <FormControl>
                <FormLabel id="radio-buttons-group-poem">
                  Задайте кількість слів та розмір букв:
                </FormLabel>

                <TextField
                  id="poemLenght"
                  label="кількість слів"
                  variant="standard"
                  type="number"
                  value={poemLenghtBox || undefined}
                  onChange={(e) => handleChangePoem(e)}
                  margin="dense"
                  disabled={!isValidForm}
                />

                <RadioGroup
                  aria-labelledby="radio-buttons-group-poem"
                  value={poemSizeBox}
                  onChange={handleRadioPoemChange}
                  name="radio-buttons-group-poem"
                >
                  <FormControlLabel
                    value={1}
                    control={
                      <Radio
                        disabled={
                          !isValidForm || !poemLenghtBox || poemLenghtBox <= 0
                        }
                      />
                    }
                    label={`Висота букви до 2см. (${prisePoem.first} грн. за букву)`}
                    sx={{ marginLeft: "20px" }}
                  />
                  <FormControlLabel
                    value={2}
                    control={
                      <Radio
                        disabled={
                          !isValidForm || !poemLenghtBox || poemLenghtBox <= 0
                        }
                      />
                    }
                    label={`Висота букви від 2 до 2,5см (${prisePoem.second} грн. за букву)`}
                    sx={{ marginLeft: "20px" }}
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div className={css.rightSide}>
              {poemSizeBox && poemLenghtBox && isValidForm ? (
                <div className={css.textResult}>
                  <p className={css.textCost}>
                    Вартість віршу:{" "}
                    {Number(costPoem.toFixed(2)).toLocaleString("ru-RU")} грн.
                  </p>
                </div>
              ) : (
                <p> </p>
              )}
            </div>
          </div>

          {/*                                                      --------------------------   ВІРШ додатково */}
          <div className={css.sheetPoemPart}>
            <div className={css.leftSide}>
              <div>
                <br />
                <FormLabel id="poemAddWord">
                  Задайте висоту та кількість додаткових букв:
                </FormLabel>
                <br />
                <div className={css.sizesHider}>
                  <TextField
                    id="poem-add-word-size"
                    label="Висота букв, см"
                    variant="standard"
                    type="number"
                    value={poemAddWordBox.size || undefined}
                    onChange={(e) => handlePoemAddWordChange(e, "size")}
                    margin="dense"
                    disabled={!isValidForm}
                  />
                  <p style={{ marginLeft: "10px", marginRight: "10px" }}> </p>
                  <TextField
                    id="poem-add-word-quantity"
                    label="Кількість букв"
                    variant="standard"
                    type="number"
                    value={poemAddWordBox.quantity || undefined}
                    onChange={(e) => handlePoemAddWordChange(e, "quantity")}
                    margin="dense"
                    disabled={!isValidForm}
                  />
                </div>
                <p className={css.secondaryText}>
                  Ціна: {prisePoemAddWord} грн. за см
                </p>
              </div>
            </div>
            <div className={css.rightSide}>
              {poemAddWordBox.size && poemAddWordBox.quantity && isValidForm ? (
                <div className={css.textResult}>
                  <p className={css.textCost}>
                    Вартість додаткових букв:{" "}
                    {Number(costPoemAddWord.toFixed(2)).toLocaleString("ru-RU")}{" "}
                    грн.
                  </p>
                </div>
              ) : (
                <p> </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <Accordion style={{ marginBottom: "10px" }}>
            <AccordionSummary
              expandIcon={<span>▼</span>}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Загальна вартість тумбочки:{" "}
              <b>{Number(costTotal.toFixed(2)).toLocaleString("ru-RU")} грн.</b>
            </AccordionSummary>
            <AccordionDetails>
              {costMaterial && isValidForm ? (
                <p className={css.textCost}>
                  Матеріал (Тумбочка):{" "}
                  {Number(costMaterial.toFixed(2)).toLocaleString("ru-RU")} грн.
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
                  Піскоструй: Прізвище, ім'я, по батькові:{" "}
                  {Number(costFio.toFixed(2)).toLocaleString("ru-RU")} грн.
                </p>
              ) : (
                <p> </p>
              )}

              {costPoem && isValidForm ? (
                <p className={css.textCost}>
                  Піскоструй: Вірш:{" "}
                  {Number(costPoem.toFixed(2)).toLocaleString("ru-RU")} грн.
                </p>
              ) : (
                <p> </p>
              )}

              {costPoemAddWord && isValidForm ? (
                <p className={css.textCost}>
                  Піскоструй: Додаткові букви:{" "}
                  {Number(costPoemAddWord.toFixed(2)).toLocaleString("ru-RU")}{" "}
                  грн.
                </p>
              ) : (
                <p> </p>
              )}

              {costCutout && isValidForm ? (
                <p className={css.textCost}>
                  Вирізка:{" "}
                  {Number(costCutout.toFixed(2)).toLocaleString("ru-RU")} грн.
                </p>
              ) : (
                <p> </p>
              )}

              {costArtwork && isValidForm ? (
                <p className={css.textCost}>
                  Художня робота:{" "}
                  {Number(costArtwork.toFixed(2)).toLocaleString("ru-RU")} грн.
                </p>
              ) : (
                <p> </p>
              )}

              {costBackside && isValidForm ? (
                <p className={css.textCost}>
                  Зворотня сторона:{" "}
                  {Number(costBackside.toFixed(2)).toLocaleString("ru-RU")} грн.
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
