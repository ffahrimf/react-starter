import { useEffect, useState } from "react";
import { ThemeToggleButton } from "../common/ThemeToggleButton";
import api from "../hooks/useApi";

interface ItemsIF {
  idMeal: number;
  strMeal: string;
}

export default function Items() {
  const [items, setItems] = useState<ItemsIF[]>([]);

  async function getFood() {
    try {
      const res = await api({ method: "GET" });
      setItems(res.data.meals);
    } catch (e) {
      console.error(e);
      setItems([]);
    }
  }

  useEffect(() => {
    getFood();
  }, []);

  return (
    <div className="dark:bg-dark-900 relative flex min-h-screen bg-white">
      <title>Items</title>
      <meta name="description" content="Halaman item adalah halaman contoh" />
      <div className="fixed top-5 left-5">
        <ThemeToggleButton />
      </div>

      <div className="grid w-full grid-cols-4 gap-5 p-10">
        {items.map((item) => (
          <div key={item.idMeal} className="flex flex-col border p-4">
            <p>id : {item.idMeal}</p>
            <p>name: {item.strMeal}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
