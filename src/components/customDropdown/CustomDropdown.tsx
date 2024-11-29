import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { Material } from "../../interfaces/Material";
import {
  DocumentData,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../api/firebase";

interface CustomDropdownProps {
  onSelect: (value: Material | null) => void;
  selectedMaterial: Material | null;
}

export default function CustomDropdown({
  onSelect,
  selectedMaterial,
}: CustomDropdownProps) {
  const [materials, setMaterials] = useState<Material[]>([]);

  // const materials: Material[] = useMemo(() => [
  //   {
  //     link: "https://www.nash-granit.com.ua/images/gabro.png",
  //     label: "Габро",
  //     price: 110000,
  //   },
  //   {
  //     link: "https://www.nash-granit.com.ua/images/leznik.jpeg",
  //     label: "Лезник",
  //     price: 120000,
  //   },
  //   {
  //     link: "https://www.nash-granit.com.ua/images/pokostivka.png",
  //     label: "Покостівка",
  //     price: 130000,
  //   },
  //   {
  //     link: "https://www.nash-granit.com.ua/images/zhadkivka.jpg",
  //     label: "Жадківка",
  //     price: 140000,
  //   },
  //   {
  //     link: "https://www.nash-granit.com.ua/images/labradorit.webp",
  //     label: "Лабрадорит",
  //     price: 150000,
  //   },
  //   {
  //     link: "https://www.nash-granit.com.ua/images/maslavka.jpg",
  //     label: "Маславка",
  //     price: 160000,
  //   },
  //   {
  //     link: "https://www.nash-granit.com.ua/images/mezherichka.jpg",
  //     label: "Межерічка",
  //     price: 170000,
  //   },
  // ], []);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const q = query(collection(db, "materials"), orderBy("label", "asc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          setMaterials(
            snapshot.docs.map((doc: DocumentData) => ({
              id: doc.id, // Добавляем id из Firebase
              link: doc.data().link || "", // Проверяем поля на существование
              label: doc.data().label || "Без названия",
              price: doc.data().price || 0,
            }))
          );
        });
        return () => unsubscribe();
      } catch (error) {
        console.error("Ошибка при загрузке материалов:", error);
      }
    };

    fetchMaterials();
  }, []);

  return (
    <Autocomplete
      id="materials-select"
      options={materials}
      getOptionLabel={(option) => option.label}
      value={selectedMaterial || null} 
      onChange={(_, value) => onSelect(value)}
      filterOptions={(options, { inputValue }) =>
        options.filter((option) =>
          option.label.toLowerCase().includes(inputValue.toLowerCase())
        )
      }
      renderOption={(props, option) => {
        const { key, ...restProps } = props;
        return (
          <Box component="li" key={key} {...restProps}>
            <img
              loading="lazy"
              style={{
                width: "150px",
                height: "150px",
                minHeight: "150px",
                objectFit: "cover",
                objectPosition: "center",
                borderRadius: "15px",
              }}
              src={option.link}
              alt={option.label}
            />
            <p style={{ fontSize: "2rem", marginLeft: "10px" }}>
              {option.label}
            </p>
            <p
              style={{
                fontSize: "1rem",
                marginLeft: "10px",
                color: "darkgray",
              }}
            >
              ({option.price.toLocaleString("ru-RU")} грн. за м³)
            </p>
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Виберіть матеріал"
          required
          inputProps={{
            ...params.inputProps,
            autoComplete: "off",
          }}
          sx={{
            "& .MuiInputBase-root": {
              backgroundColor: "white",
            },
          }}
        />
      )}
    />
  );
}
