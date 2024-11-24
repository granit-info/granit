import { useEffect, useState } from "react";
import css from "./calcStella.module.css";
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
import {
  PriseFioFormat,
  PrisePhotoglassFormat,
  PrisePhotokeramFormat,
} from "../../interfaces/Price";
import {
  BacksideSize,
  CutoutSize,
  FioIndSize,
  FormData,
  HiderSize,
  Kopir,
  PoemAddWord,
} from "../../interfaces/data";
import { usePriseContext } from "../../globalContext/usePriseContext";
import { Link } from "react-router-dom";

export default function CalcStella() {
  const {
    prisePoemAddWord,
    priseHackle,
    priseHider,
    priseFioFormat,
    priseCross,
    prisePhotoglassFormat,
    prisePhotokeramFormat,
    priseFioIndivid,
    priseFacet,
    prisePoem,
    priseBackside,
    priseKopir,
    priseCutout,
    priseArtwork,
    // isPriceLoaded
  } = usePriseContext();

  const [isValidForm, setIsValidForm] = useState<boolean>(false);

  // Начальное состояние формы
  const [formData, setFormData] = useState<FormData>({
    width: 0.6,
    height: 1.1,
    thickness: 0.06,
    // width: undefined,
    // height: undefined,
    // thickness: undefined,
    dropdown: null,
  });

  const [facetSize, setFacetSize] = useState<number>(0);
  const [facetLenght, setFacetLenght] = useState<number | undefined>(undefined);
  const [hackle, setHackle] = useState<number | undefined>(undefined);
  const [fioFormat, setFioFormat] = useState<number>(0);
  const [selectedFioFormat, setSelectedFioFormat] =
    useState<PriseFioFormat | null>(null);
  const [selectedPhotoglassFormat, setSelectedPhotoglassFormat] =
    useState<PriseFioFormat | null>(null);
  const [selectedPhotokeramFormat, setSelectedPhotokeramFormat] =
    useState<PriseFioFormat | null>(null);
  const [selectedCutout, setSelectedCutout] = useState<number | undefined>(
    undefined
  );
  const [selectedCross, setSelectedCross] = useState<string>("0");
  const [poemLenght, setPoemLenght] = useState<number | undefined>(undefined);
  const [poemSize, setPoemSize] = useState<number | undefined>(undefined);
  const [artCheckboxState, setArtCheckboxState] = useState({
    artwork: false,
    fioGold: false,
    poemGold: false,
  });
  const [hider, setHider] = useState<HiderSize>({
    width: undefined,
    height: undefined,
  });
  const [backsideSize, setBacksideSize] = useState<BacksideSize>({
    width: undefined,
    height: undefined,
    isPhoto: false,
  });
  const [kopir, setKopir] = useState<Kopir>({
    lenght: undefined,
    isPolished: false,
  });
  const [cutoutSize, setCutoutSize] = useState<CutoutSize>({
    width: undefined,
    height: undefined,
  });
  const [poemAddWord, setPoemAddWord] = useState<PoemAddWord>({
    quantity: undefined,
    size: undefined,
  });
  const [fioIndSize, setFioIndSize] = useState<FioIndSize>({
    width: undefined,
    height: undefined,
  });

  const [costMaterial, setCostMaterial] = useState<number>(0);
  const [costFacet, setCostFacet] = useState<number>(0);
  const [costPoem, setCostPoem] = useState<number>(0);
  const [costHackle, setCostHackle] = useState<number>(0);
  const [costHider, setCostHider] = useState<number>(0);
  const [costCutout, setCostCutoutSize] = useState<number>(0);
  const [costFio, setCostFio] = useState<number>(0);
  const [costPhotoglass, setCostPhotoglass] = useState<number>(0);
  const [costPhotokeram, setCostPhotokeram] = useState<number>(0);
  const [costPoemAddWord, setCostPoemAddWord] = useState<number>(0);
  const [costArtwork, setCostArtwork] = useState<number>(0);
  const [costBackside, setCostBackside] = useState<number>(0);
  const [costKopir, setCostKopir] = useState<number>(0);
  const [costCross, setCostCross] = useState<number>(0);

  // Устанавливаем начальные значения для прайса
  useEffect(() => {}, []);

  const [costTotal, setCostTotal] = useState<number>(0);

  // подсчет итоговой стоимости
  useEffect(() => {
    if (isValidForm) {
      const totalCost =
        (costMaterial || 0) +
        (costFacet || 0) +
        (costKopir || 0) +
        (costHackle || 0) +
        (costHider || 0) +
        (costFio || 0) +
        (costPoem || 0) +
        (costPoemAddWord || 0) +
        (costCutout || 0) +
        (costArtwork || 0) +
        (costBackside || 0) +
        (costPhotoglass || 0) +
        (costPhotokeram || 0) +
        (costCross || 0);

      setCostTotal(totalCost);
    } else {
      setCostTotal(0); // Сброс суммы, если форма недействительна
    }
  }, [
    isValidForm,
    costMaterial,
    costFacet,
    costHackle,
    costHider,
    costFio,
    costPoem,
    costPoemAddWord,
    costCutout,
    costArtwork,
    costBackside,
    costPhotoglass,
    costPhotokeram,
    costCross,
    costKopir,
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
      if (isValid && !facetLenght) {
        setFacetLenght(
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
      [field]: parseFloat(value), // Преобразуем значение в число
    });
  };

  // Обработчик изменения поля ввода фазка длина
  const handleChangeFacet = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const parsedValue = parseFloat(e.target.value);

    // Обновляем длину фазки
    setFacetLenght(parsedValue > 0 ? parsedValue : 0);

    // Если значение пустое или меньше либо равно 0, устанавливаем выбранный Radio в "фазка не потрібна"
    if (!parsedValue || parsedValue <= 0) {
      setFacetSize(0);
    }
  };

  // Обработчик изменения поля ввода фазка длина
  const handleChangePoem = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const parsedValue = parseFloat(e.target.value); // Преобразуем строку в число

    // Обновляем длину фазки
    setPoemLenght(parsedValue);
  };

  // Обработчик изменения поля ввода Hider
  const handleHiderChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof HiderSize
  ) => {
    const { value } = e.target as HTMLInputElement;
    setHider({
      ...hider,
      [field]: parseFloat(value), // Преобразуем значение в число
    });

    if (field == "height" && hider.width) {
      setCostHider(parseFloat(value) * hider.width * priseHider);
    }

    if (field == "width" && hider.height) {
      setCostHider(parseFloat(value) * hider.height * priseHider);
    }
  };

  // Обработчик изменения поля ввода размеров для  КОПІР
  const handleKopirChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Kopir
  ) => {
    const { value } = e.target as HTMLInputElement;
    setKopir({
      ...kopir,
      [field]: parseFloat(value), // Преобразуем значение в число
    });
  };

  // Обработчик изменения isPolished для  КОПІР
  const handleKopirIsPolishedChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const { checked } = event.target;
    setKopir((prevState) => ({
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
    setBacksideSize({
      ...backsideSize,
      [field]: parseFloat(value), // Преобразуем значение в число
    });
  };

  // Обработчик изменения isPhoto для  ЗВОРОТНЯ СТОРОНА
  const handleBacksideIsPhotoChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const { checked } = event.target;
    setBacksideSize((prevState) => ({
      ...prevState,
      [field]: checked,
    }));
  };

  // хук для отслеживаниия изменений в ЗВОРОТНЯ СТОРОНА
  useEffect(() => {
    let calculatedCost = 0;

    if (
      backsideSize.height &&
      backsideSize.width &&
      priseBackside.prise &&
      priseBackside.photoKoef
    ) {
      calculatedCost =
        backsideSize.height * backsideSize.width * priseBackside.prise;
      calculatedCost *= backsideSize.isPhoto ? priseBackside.photoKoef : 1;
    }

    setCostBackside(calculatedCost);
  }, [
    backsideSize.height,
    backsideSize.isPhoto,
    backsideSize.width,
    priseBackside.photoKoef,
    priseBackside.prise,
  ]);

  // хук для отслеживаниия изменений в КОПІР
  useEffect(() => {
    let calculatedCost = 0;

    if (kopir.lenght && priseKopir.prise && priseKopir.polishedKoef && formData.thickness) {
      calculatedCost = kopir.lenght * formData.thickness * priseKopir.prise;
      calculatedCost *= kopir.isPolished ? priseKopir.polishedKoef : 1;
    }

    setCostKopir(calculatedCost);
  }, [formData.thickness, kopir.isPolished, kopir.lenght, priseKopir.polishedKoef, priseKopir.prise]);

  // Обработчик изменения поля ввода ВИРІЗКА
  const handleCutoutChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof CutoutSize
  ) => {
    const { value } = e.target as HTMLInputElement;
    setCutoutSize({
      ...cutoutSize,
      [field]: parseFloat(value), // Преобразуем значение в число
    });
  };

  // Обработчик изменения поля ввода ВІРШ додаткові букви
  const handlePoemAddWordChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof PoemAddWord
  ) => {
    const { value } = e.target as HTMLInputElement;
    setPoemAddWord({
      ...poemAddWord,
      [field]: parseFloat(value), // Преобразуем значение в число
    });

    if (field == "quantity" && poemAddWord.size) {
      setCostPoemAddWord(
        parseFloat(value) * poemAddWord.size * prisePoemAddWord
      );
    }

    if (field == "size" && poemAddWord.quantity) {
      setCostPoemAddWord(
        parseFloat(value) * poemAddWord.quantity * prisePoemAddWord
      );
    }
  };

  // Обработчик изменения поля ввода пір'я
  const handleChangeHackle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    const parsedValue = parseFloat(value); // Преобразуем строку в число

    setHackle(parsedValue); // Обновляем состояние hackle

    if (parsedValue) {
      const calcCost = parsedValue * priseHackle; // Расчет стоимости
      setCostHackle(calcCost); // Обновляем стоимость
    } else {
      setCostHackle(0);
    }
  };

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

    switch (facetSize) {
      case 1:
        calculatedCostFacet = facetLenght! * priseFacet.first!;
        break;
      case 2:
        calculatedCostFacet = facetLenght! * priseFacet.second!;
        break;
      case 3:
        calculatedCostFacet =
          (formData.height! * 2 + formData.width!) * priseFacet.third!;
        break;
      default:
        calculatedCostFacet = 0;
    }

    setCostFacet(calculatedCostFacet);
  }, [formData, facetSize, priseFacet, facetLenght]);

  // Обработчик изменения радиокнопок ВИРІЗКА и размеров и задаем стоимость
  useEffect(() => {
    let calculatedCost = 0;

    if (
      selectedCutout &&
      cutoutSize.height &&
      cutoutSize.width &&
      priseCutout.flower &&
      priseCutout.other
    ) {
      switch (selectedCutout) {
        case 1:
          calculatedCost =
            cutoutSize.height * cutoutSize.width * priseCutout.flower;
          break;
        case 2:
          calculatedCost =
            cutoutSize.height * cutoutSize.width * priseCutout.other;
          break;
        default:
          calculatedCost = 0;
      }

      setCostCutoutSize(calculatedCost);
    } else {
      setCostCutoutSize(0);
    }
  }, [
    cutoutSize.height,
    cutoutSize.width,
    priseCutout.flower,
    priseCutout.other,
    selectedCutout,
  ]); // Пересчитываем при изменении

  // Обработчик изменения радиокнопок фазки
  const handleRadioFacetChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selected = parseInt(event.target.value);
    setFacetSize(selected);
  };

  // Обработчик изменения радиокнопок ВІРШ
  const handleRadioPoemChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selected = parseInt(event.target.value);
    setPoemSize(selected);
  };

  // Обработчик изменения радиокнопок ВИРІЗКА
  const handleRadioCutout = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = parseInt(event.target.value);
    setSelectedCutout(selected);
  };

  // Обработчик изменения радиокнопок ВІРШ и задаем стоимость
  useEffect(() => {
    let calculatedCost = 0;

    switch (poemSize) {
      case 1:
        calculatedCost = poemLenght! * prisePoem.first!;
        break;
      case 2:
        calculatedCost = poemLenght! * prisePoem.second!;
        break;

      default:
        calculatedCost = 0;
    }

    setCostPoem(calculatedCost);
  }, [poemLenght, poemSize, prisePoem.first, prisePoem.second]); // Пересчитываем при изменении

  // Обработчик выбора радиокнопки ФИО
  const handleRadioFioTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFioFormat(parseInt(event.target.value));
    setCostFio(0);

    if (parseInt(event.target.value) == 0 && selectedFioFormat?.prise) {
      setCostFio(selectedFioFormat?.prise);
    }

    if (parseInt(event.target.value) == 1) {
      if (fioIndSize.height && fioIndSize.width) {
        setCostFio(fioIndSize.height * fioIndSize.width * priseFioIndivid);
      } else {
        setCostFio(0);
      }

      setSelectedFioFormat(null);
    }
  };

  // Обработчик выбора из Autocomplete ФИО
  const handleAutocompleteFioFormatChange = (
    _: React.SyntheticEvent,
    newValue: PriseFioFormat | null
  ) => {
    setSelectedFioFormat(newValue);

    if (fioFormat == 0 && newValue?.prise) {
      setCostFio(newValue.prise);
    }

    if (newValue == null) {
      setCostFio(0);
    }
  };

  // Обработчик выбора из Autocomplete ФОТОСКЛО
  const handleAutocompletePhotoglassFormatChange = (
    _: React.SyntheticEvent,
    newValue: PrisePhotoglassFormat | null
  ) => {
    setSelectedPhotoglassFormat(newValue);

    if (newValue?.prise) {
      setCostPhotoglass(newValue.prise);
    } else {
      setCostPhotoglass(0);
    }
  };

  // Обработчик выбора из Autocomplete ФОТОКЕРАМІКА
  const handleAutocompletePhotokeramFormatChange = (
    _: React.SyntheticEvent,
    newValue: PrisePhotokeramFormat | null
  ) => {
    setSelectedPhotokeramFormat(newValue);

    if (newValue?.prise) {
      setCostPhotokeram(newValue.prise);
    } else {
      setCostPhotokeram(0);
    }
  };

  // Обработчик изменения поля ввода FIO IndSize
  const handleFioIndSizeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof FioIndSize
  ) => {
    const { value } = e.target as HTMLInputElement;
    setFioIndSize({
      ...fioIndSize,
      [field]: parseFloat(value), // Преобразуем значение в число
    });

    if (!fioIndSize.width || !fioIndSize.height) {
      setCostFio(0);
    }

    if (field == "height" && fioIndSize.width) {
      setCostFio(parseFloat(value) * fioIndSize.width * priseFioIndivid);
    }

    if (field == "width" && fioIndSize.height) {
      setCostFio(parseFloat(value) * fioIndSize.height * priseFioIndivid);
    }
  };

  // Обработчик изменения чекбоксов для ХУДОЖКА
  const handleArtCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, checked } = event.target;
    setArtCheckboxState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  // Хук для пересчета стоимости ХУДОЖКА
  useEffect(() => {
    let cost = priseArtwork.portrait! + priseArtwork.fio! + priseArtwork.poem!;

    if (artCheckboxState.artwork) {
      cost += artCheckboxState.fioGold ? priseArtwork.fioGold! : 0;
      cost += artCheckboxState.poemGold ? priseArtwork.poemGold! : 0;
      setCostArtwork(cost);
    } else {
      setCostArtwork(0);
    }
  }, [artCheckboxState, priseArtwork]);

  // Обработчик изменения выбора для ХРЕСТ ЛАТУННИЙ
  const handleCrossChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    setSelectedCross(selectedValue);

    if (selectedValue === "0") {
      setCostCross(0);
    } else {
      const selectedPrise =
        priseCross.find((item) => item.size === selectedValue)?.prise || 0;
      setCostCross(selectedPrise);
    }
  };

  return (
    <>
      <Link to="/prices">ADMIN</Link>
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
                value={formData.height ?? ""}
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
                value={formData.width ?? ""}
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
                value={formData.thickness ?? ""}
                onChange={(e) => handleChange(e, "thickness")}
                margin="normal"
                required
              />
            </div>

            <CustomDropdown onSelect={handleDropdownChange} />
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
                  facetLenght ??
                  (formData.height! * 2 + formData.width!).toFixed(3)
                }
                onChange={(e) => handleChangeFacet(e)}
                margin="dense"
                disabled={!isValidForm}
              />

              <RadioGroup
                aria-labelledby="radio-buttons-group-facet"
                value={facetSize}
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
                        !isValidForm || !facetLenght || facetLenght <= 0
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
                        !isValidForm || !facetLenght || facetLenght <= 0
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
                        !isValidForm || !facetLenght || facetLenght <= 0
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
            {facetSize > 0 && facetLenght && isValidForm ? (
              <div className={css.textResult}>
                <p>Врахована довжина фаски: {facetLenght.toFixed(2)} м.п.</p>
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
                  value={kopir.lenght}
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
                disabled={!isValidForm || !kopir.lenght}
                control={
                  <Checkbox
                    name="kopir-polished"
                    checked={kopir.isPolished}
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
            {kopir.lenght && formData.thickness && isValidForm ? (
              <div className={css.textResult}>
                <p>
                  Загальна площа малюнку: {kopir.lenght * formData.thickness} м²
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
                value={hackle}
                onChange={(e) => handleChangeHackle(e)}
                margin="dense"
                disabled={!isValidForm}
              />
              <p className={css.secondaryText}>
                Ціна: {priseHackle} грн. за м.п.
              </p>
            </div>
          </div>
          <div className={css.rightSide}>
            {hackle && hackle > 0 && isValidForm ? (
              <div className={css.textResult}>
                <p>Загальна довжина пір'я: {hackle} м.п.</p>
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

        {/*                                                            --------------------------   ПОТАЙ  */}
        <div className={css.sheet}>
          <div className={css.leftSide}>
            <div>
              <FormLabel id="hackle">Задайте розміри для потаю:</FormLabel>
              <br />
              <div className={css.sizesHider}>
                <TextField
                  id="hide-height"
                  label="Висота, м"
                  variant="standard"
                  type="number"
                  value={hider.height}
                  onChange={(e) => handleHiderChange(e, "height")}
                  margin="dense"
                  disabled={!isValidForm}
                  style={{ width: "100px" }}
                />
                <p style={{ marginLeft: "10px", marginRight: "10px" }}>x</p>
                <TextField
                  id="hide-width"
                  label="Ширина, м"
                  variant="standard"
                  type="number"
                  value={hider.width}
                  onChange={(e) => handleHiderChange(e, "width")}
                  margin="dense"
                  disabled={!isValidForm}
                  style={{ width: "100px" }}
                />
              </div>
              <p className={css.secondaryText}>Ціна: {priseHider} грн. за м²</p>
            </div>
          </div>
          <div className={css.rightSide}>
            {hider.height && hider.width && isValidForm ? (
              <div className={css.textResult}>
                <p>Загальна площа потаю: {hider.height * hider.width} м²</p>
                <p className={css.textCost}>
                  Вартість:{" "}
                  {Number(costHider.toFixed(2)).toLocaleString("ru-RU")} грн.
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
                  value={fioFormat}
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
                      value={selectedFioFormat}
                      onChange={handleAutocompleteFioFormatChange}
                      sx={{ width: 300 }}
                      disabled={!isValidForm || fioFormat == 1}
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
                        value={fioIndSize.height}
                        onChange={(e) => handleFioIndSizeChange(e, "height")}
                        margin="dense"
                        disabled={!isValidForm || fioFormat == 0}
                        style={{ width: "100px" }}
                      />
                      <p>x</p>
                      <TextField
                        id="fio-width"
                        label="Ширина, м"
                        variant="standard"
                        type="number"
                        value={fioIndSize.width}
                        onChange={(e) => handleFioIndSizeChange(e, "width")}
                        margin="dense"
                        disabled={!isValidForm || fioFormat == 0}
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
            {fioFormat == 0 && selectedFioFormat?.prise && isValidForm ? (
              <div className={css.textResult}>
                <p>Розмір надпису: {selectedFioFormat.size}</p>
                <p className={css.textCost}>
                  Вартість: {Number(costFio.toFixed(2)).toLocaleString("ru-RU")}{" "}
                  грн.
                </p>
              </div>
            ) : (
              <p> </p>
            )}
            {fioFormat == 1 &&
            fioIndSize.height &&
            fioIndSize.width &&
            isValidForm ? (
              <div className={css.textResult}>
                <p>
                  Загальна площа надпису: {fioIndSize.height * fioIndSize.width}{" "}
                  м²
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
                  value={poemLenght}
                  onChange={(e) => handleChangePoem(e)}
                  margin="dense"
                  disabled={!isValidForm}
                />

                <RadioGroup
                  aria-labelledby="radio-buttons-group-poem"
                  value={poemSize}
                  onChange={handleRadioPoemChange}
                  name="radio-buttons-group-poem"
                >
                  <FormControlLabel
                    value={1}
                    control={
                      <Radio
                        disabled={
                          !isValidForm || !poemLenght || poemLenght <= 0
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
                          !isValidForm || !poemLenght || poemLenght <= 0
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
              {poemSize && poemLenght && isValidForm ? (
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
                    value={poemAddWord.size}
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
                    value={poemAddWord.quantity}
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
              {poemAddWord.size && poemAddWord.quantity && isValidForm ? (
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
                  value={cutoutSize.height}
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
                  value={cutoutSize.width}
                  onChange={(e) => handleCutoutChange(e, "width")}
                  margin="dense"
                  disabled={!isValidForm}
                  style={{ width: "100px" }}
                />
              </div>
              <RadioGroup
                aria-labelledby="radio-buttons-group-cutout"
                value={poemSize}
                onChange={handleRadioCutout}
                name="radio-buttons-group-cutout"
              >
                <FormControlLabel
                  value={1}
                  control={
                    <Radio
                      disabled={
                        !isValidForm || !cutoutSize.height || !cutoutSize.width
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
                        !isValidForm || !cutoutSize.height || !cutoutSize.width
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
            {cutoutSize.height &&
            cutoutSize.width &&
            selectedCutout &&
            isValidForm ? (
              <div className={css.textResult}>
                <p>
                  Загальна площа вирізки: {cutoutSize.height * cutoutSize.width}{" "}
                  м²
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
                      checked={artCheckboxState.artwork}
                      onChange={handleArtCheckboxChange}
                    />
                  }
                  label="Художня робота:"
                />
                <div className={css.artwork}>
                  <p>➤ Портрет ({priseArtwork.portrait} грн.)</p>
                  <p>
                    ➤ Прізвище, ім'я та по-батькові ({priseArtwork.fio} грн.)
                  </p>
                  <FormControlLabel
                    style={{ marginLeft: "10px", marginTop: "-15px" }}
                    control={
                      <Checkbox
                        size="small"
                        name="fioGold"
                        checked={artCheckboxState.fioGold}
                        onChange={handleArtCheckboxChange}
                      />
                    }
                    label={`з позолотою  (додатково +${priseArtwork.fioGold} грн.)`}
                    disabled={!artCheckboxState.artwork}
                  />
                  <p>➤ Вірш ({priseArtwork.poem} грн.)</p>
                  <FormControlLabel
                    style={{ marginLeft: "10px", marginTop: "-15px" }}
                    control={
                      <Checkbox
                        size="small"
                        name="poemGold"
                        checked={artCheckboxState.poemGold}
                        onChange={handleArtCheckboxChange}
                      />
                    }
                    label={`з позолотою  (додатково +${priseArtwork.poemGold} грн.)`}
                    disabled={!artCheckboxState.artwork}
                  />
                </div>
              </FormGroup>
            </div>
          </div>
          <div className={css.rightSide}>
            {artCheckboxState.artwork && isValidForm ? (
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
                  value={backsideSize.height}
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
                  value={backsideSize.width}
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
                  !isValidForm || !backsideSize.height || !backsideSize.width
                }
                control={
                  <Checkbox
                    name="backside-photo"
                    checked={backsideSize.isPhoto}
                    onChange={(e) => handleBacksideIsPhotoChange(e, "isPhoto")}
                  />
                }
                label={`Фото  (ціна множиться на ${priseBackside.photoKoef})`}
              />
            </div>
          </div>
          <div className={css.rightSide}>
            {backsideSize.height && backsideSize.width && isValidForm ? (
              <div className={css.textResult}>
                <p>
                  Загальна площа малюнку:{" "}
                  {backsideSize.height * backsideSize.width} м²
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

        {/*                                                      --------------------------   ФОТОСКЛО */}
        <div className={css.sheet}>
          <div className={css.leftSide}>
            <div>
              <p>Фотоскло </p>
              <hr /> <br />
              <Autocomplete
                disablePortal
                options={prisePhotoglassFormat}
                getOptionLabel={(option) =>
                  option.size + " - " + option.prise + "грн." || ""
                }
                value={selectedPhotoglassFormat}
                onChange={handleAutocompletePhotoglassFormatChange}
                sx={{ width: 300 }}
                disabled={!isValidForm}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Оберіть потрібний формат"
                    variant="standard"
                  />
                )}
              />
            </div>
          </div>
          <div className={css.rightSide}>
            {selectedPhotoglassFormat && isValidForm ? (
              <div className={css.textResult}>
                <p className={css.textCost}>
                  Вартість:{" "}
                  {Number(costPhotoglass.toFixed(2)).toLocaleString("ru-RU")}{" "}
                  грн.
                </p>
              </div>
            ) : (
              <p> </p>
            )}
          </div>
        </div>

        {/*                                                      --------------------------   ФОТОКЕРАМІКА */}
        <div className={css.sheet}>
          <div className={css.leftSide}>
            <div>
              <p>Фотокераміка </p>
              <hr /> <br />
              <Autocomplete
                disablePortal
                options={prisePhotokeramFormat}
                getOptionLabel={(option) =>
                  option.size + " - " + option.prise + "грн." || ""
                }
                value={selectedPhotokeramFormat}
                onChange={handleAutocompletePhotokeramFormatChange}
                sx={{ width: 300 }}
                disabled={!isValidForm}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Оберіть потрібний формат"
                    variant="standard"
                  />
                )}
              />
            </div>
          </div>
          <div className={css.rightSide}>
            {selectedPhotokeramFormat && isValidForm ? (
              <div className={css.textResult}>
                <p className={css.textCost}>
                  Вартість:{" "}
                  {Number(costPhotokeram.toFixed(2)).toLocaleString("ru-RU")}{" "}
                  грн.
                </p>
              </div>
            ) : (
              <p> </p>
            )}
          </div>
        </div>

        {/*                                                      --------------------------   ХРЕСТИК ЛАТУННИЙ */}
        <div className={css.sheet}>
          <div className={css.leftSide}>
            <div>
              <p>Хрестик латунний </p>
              <hr /> <br />
              <FormControl>
                <FormLabel id="radio-buttons-group-cross">
                  Оберіть рорзмір:
                </FormLabel>
                <RadioGroup
                  aria-labelledby="radio-buttons-group-cross"
                  value={selectedCross}
                  name="radio-buttons-group"
                  onChange={handleCrossChange}
                >
                  <FormControlLabel
                    value="0"
                    control={<Radio disabled={!isValidForm} />}
                    label="Не потрібно"
                  />

                  {priseCross.map((item) => (
                    <FormControlLabel
                      key={item.size}
                      value={item.size!}
                      control={<Radio disabled={!isValidForm} />}
                      label={`${item.size} (${item.prise?.toLocaleString(
                        "ru-RU"
                      )} грн.)`}
                      sx={{ marginLeft: "20px" }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div className={css.rightSide}>
            {isValidForm && selectedCross != "0" ? (
              <div className={css.textResult}>
                <p className={css.textCost}>
                  Вартість:{" "}
                  {Number(costCross.toFixed(2)).toLocaleString("ru-RU")} грн.
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
              Підсумок замовлення:{" "}
              <b>{Number(costTotal.toFixed(2)).toLocaleString("ru-RU")} грн.</b>
            </AccordionSummary>
            <AccordionDetails>
              {costMaterial && isValidForm ? (
                <p className={css.textCost}>
                  Матеріал (Стела):{" "}
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

              {costKopir && isValidForm ? (
                <p className={css.textCost}>
                  Копір: {Number(costKopir.toFixed(2)).toLocaleString("ru-RU")}{" "}
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

              {costHider && isValidForm ? (
                <p className={css.textCost}>
                  Потай: {Number(costHider.toFixed(2)).toLocaleString("ru-RU")}{" "}
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

              {costPhotoglass && isValidForm ? (
                <p className={css.textCost}>
                  Фотоскло:{" "}
                  {Number(costPhotoglass.toFixed(2)).toLocaleString("ru-RU")}{" "}
                  грн.
                </p>
              ) : (
                <p> </p>
              )}

              {costPhotokeram && isValidForm ? (
                <p className={css.textCost}>
                  Фотокераміка:{" "}
                  {Number(costPhotokeram.toFixed(2)).toLocaleString("ru-RU")}{" "}
                  грн.
                </p>
              ) : (
                <p> </p>
              )}

              {costCross && isValidForm ? (
                <p className={css.textCost}>
                  Хрестик латунний:{" "}
                  {Number(costCross.toFixed(2)).toLocaleString("ru-RU")} грн.
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
