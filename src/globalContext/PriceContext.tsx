import React, { createContext, useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  PriseArtwork,
  PriseBackside,
  PriseKopir,
  PriseCross,
  PriseCutout,
  PriseFacet,
  PriseFioFormat,
  PrisePhotoglassFormat,
  PrisePhotokeramFormat,
  PrisePoem,
} from "../interfaces/Price";
import { db } from "../api/firebase";

interface PriseState {
  prisePoemAddWord: number;
  priseHackle: number;
  priseHider: number;
  priseFioFormat: PriseFioFormat[];
  priseFioIndivid: number;
  priseCross: PriseCross[];
  prisePhotoglassFormat: PrisePhotoglassFormat[];
  prisePhotokeramFormat: PrisePhotokeramFormat[];
  priseFacet: PriseFacet;
  prisePoem: PrisePoem;
  priseBackside: PriseBackside;
  priseKopir: PriseKopir;
  priseCutout: PriseCutout;
  priseArtwork: PriseArtwork;
  isPriceLoaded: boolean;
  savePriceData: () => Promise<void>;
  updatePrice: (key: string, value: unknown) => Promise<void>;
}

// Создаём контекст
const PriseContext = createContext<PriseState | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [prisePoemAddWord, setPrisePoemAddWord] = useState<number>(0);
  const [priseHackle, setPriseHackle] = useState<number>(0);
  const [priseHider, setPriseHider] = useState<number>(0);
  const [priseFioFormat, setPriseFioFormat] = useState<PriseFioFormat[]>([]);
  const [priseCross, setPriseCross] = useState<PriseCross[]>([]);
  const [prisePhotoglassFormat, setPrisePhotoglassFormat] = useState<
    PrisePhotoglassFormat[]
  >([]);
  const [prisePhotokeramFormat, setPrisePhotokeramFormat] = useState<
    PrisePhotokeramFormat[]
  >([]);
  const [priseFioIndivid, setPriseFioIndivid] = useState<number>(0);
  const [priseFacet, setPriseFacet] = useState<PriseFacet>({
    zero: undefined,
    first: undefined,
    second: undefined,
    third: undefined,
  });
  const [prisePoem, setPrisePoem] = useState<PrisePoem>({
    first: undefined,
    second: undefined,
  });
  const [priseBackside, setPriseBackside] = useState<PriseBackside>({
    prise: undefined,
    photoKoef: undefined,
  });
  const [priseKopir, setPriseKopir] = useState<PriseKopir>({
    prise: undefined,
    polishedKoef: undefined,
  });
  const [priseCutout, setPriseCutout] = useState<PriseCutout>({
    flower: undefined,
    other: undefined,
  });
  const [priseArtwork, setPriseArtwork] = useState<PriseArtwork>({
    portrait: undefined,
    fio: undefined,
    poem: undefined,
    fioGold: undefined,
    poemGold: undefined,
  });
  const [isPriceLoaded, setIsPriceLoaded] = useState<boolean>(false);
  const [isPriceUpdated, setIsPriceUpdated] = useState<boolean>(false);

  const savePriceData = async () => {
    const priceData = JSON.parse(
      JSON.stringify({
        prisePoemAddWord,
        priseHackle,
        priseHider,
        priseFioFormat,
        priseFioIndivid,
        priseCross,
        prisePhotoglassFormat,
        prisePhotokeramFormat,
        priseFacet,
        prisePoem,
        priseBackside,
        priseKopir,
        priseCutout,
        priseArtwork,
      })
    );

    try {
      const docRef = doc(db, "prices", "VsgLD4pwbIwyA7743e8V");
      await setDoc(docRef, priceData, { merge: true }); // Используем merge для обновления только изменённых данных
    } catch (error) {
      console.error("Ошибка при сохранении данных:", error);
    }
  };

  const loadDataFromDB = async () => {
    try {
      const docRef = doc(db, "prices", "VsgLD4pwbIwyA7743e8V");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setPrisePoemAddWord(data.prisePoemAddWord || 0);
        setPriseHackle(data.priseHackle || 0);
        setPriseHider(data.priseHider || 0);
        setPriseFioFormat(data.priseFioFormat || []);
        setPriseCross(data.priseCross || []);
        setPrisePhotoglassFormat(data.prisePhotoglassFormat || []);
        setPrisePhotokeramFormat(data.prisePhotokeramFormat || []);
        setPriseFioIndivid(data.priseFioIndivid || 0);
        setPriseFacet(data.priseFacet || {});
        setPrisePoem(data.prisePoem || {});
        setPriseBackside(data.priseBackside || {});
        setPriseKopir(data.priseKopir || {});
        setPriseCutout(data.priseCutout || {});
        setPriseArtwork(data.priseArtwork || {});
        setIsPriceLoaded(true);
      } else {
        console.warn("Документ не найден!");
      }
    } catch (error) {
      setIsPriceLoaded(false);
      console.error("Ошибка при загрузке данных из Firebase:", error);
    }

    // setPrisePoemAddWord(30);

    // setPriseHackle(1200);

    // setPriseHider(14000);

    // setPriseFioIndivid(45000);

    // setPriseFacet({
    //   zero: 0,
    //   first: 250,
    //   second: 300,
    //   third: 350,
    // });

    // setPrisePoem({
    //   first: 250,
    //   second: 300,
    // });

    // setPriseBackside({
    //   prise: 3000,
    //   photoKoef: 1.2,
    // });

    // setPriseKopir({
    //   prise: 12500,
    //   polishedKoef: 2,
    // });

    // setPriseCutout({
    //   flower: 2500,
    //   other: 3000,
    // });

    // setPriseFioFormat([
    //   { size: "25x35 см", prise: 4500 },
    //   { size: "30x40 см", prise: 6000 },
    //   { size: "35x45 см", prise: 7500 },
    //   { size: "45x90 см", prise: 9000 },
    // ]);

    // setPriseCross([
    //   { size: "до 20 см.", prise: 500 },
    //   { size: "21 - 30 см.", prise: 600 },
    //   { size: "31 - 40 см.", prise: 700 },
    //   { size: "41 - 60 см.", prise: 800 },
    // ]);

    // setPrisePhotoglassFormat([
    //   { size: "25x35 см", prise: 1000 },
    //   { size: "30x40 см", prise: 2000 },
    //   { size: "35x45 см", prise: 3000 },
    //   { size: "45x90 см", prise: 4000 },
    // ]);

    // setPrisePhotokeramFormat([
    //   { size: "25x35 см", prise: 1500 },
    //   { size: "30x40 см", prise: 2500 },
    //   { size: "35x45 см", prise: 3500 },
    //   { size: "45x90 см", prise: 4500 },
    // ]);

    // setPriseArtwork({
    //   portrait: 1300,
    //   fio: 400,
    //   poem: 300,
    //   fioGold: 100,
    //   poemGold: 100,
    // });
  };

  const updatePrice = async (key: string, value: unknown) => {
    switch (key) {
      case "prisePoemAddWord":
        setPrisePoemAddWord(value as number);
        break;
      case "priseHackle":
        setPriseHackle(value as number);
        break;
      case "priseHider":
        setPriseHider(value as number);
        break;
      case "priseFioFormat":
        setPriseFioFormat(value as PriseFioFormat[]);
        break; // Добавляем обработку массивов
      case "priseCross":
        setPriseCross(value as PriseCross[]);
        break; // Для других массивов аналогично
      case "prisePhotoglassFormat":
        setPrisePhotoglassFormat(value as PrisePhotoglassFormat[]);
        break;
      case "prisePhotokeramFormat":
        setPrisePhotokeramFormat(value as PrisePhotokeramFormat[]);
        break;
      case "priseFioIndivid":
        setPriseFioIndivid(value as number);
        break;
      case "priseFacet":
        setPriseFacet({ ...priseFacet, ...(value as Partial<PriseFacet>) });
        break;
      case "prisePoem":
        setPrisePoem({ ...prisePoem, ...(value as Partial<PrisePoem>) });
        break;
      case "priseBackside":
        setPriseBackside({
          ...priseBackside,
          ...(value as Partial<PriseBackside>),
        });
        break;
      case "priseKopir":
        setPriseKopir({
          ...priseKopir,
          ...(value as Partial<PriseKopir>),
        });
        break;
      case "priseCutout":
        setPriseCutout({ ...priseCutout, ...(value as Partial<PriseCutout>) });
        break;
      case "priseArtwork":
        setPriseArtwork({
          ...priseArtwork,
          ...(value as Partial<PriseArtwork>),
        });
        break;
      default:
        console.warn(`Неизвестный ключ: ${key}`);
        return;
    }

    setIsPriceUpdated(!isPriceUpdated); // Триггерим перезапись в БД
  };

  useEffect(() => {
    loadDataFromDB();
  }, []);

  useEffect(() => {
    if (isPriceLoaded) {
      savePriceData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPriceUpdated]);

  return (
    <PriseContext.Provider
      value={{
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
        isPriceLoaded,
        savePriceData,
        updatePrice,
      }}
    >
      {children}
    </PriseContext.Provider>
  );
};

export default PriseContext;
