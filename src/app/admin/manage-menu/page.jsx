"use client";
import { useEffect, useState } from "react";
import React from "react";
import style from "../../../styles/table.module.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const MenuTable = () => {
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://ic1ln5cze5.execute-api.us-east-1.amazonaws.com/MenuStage/getMenu"
        );
        if (response.ok) {
          const data = await response.json();
          const body = JSON.parse(data.body);
          console.log(body.data);
          setData(body.data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (menu) => {
    const requestBody = {
        httpMethod: "DELETE",
        body: JSON.stringify({
          id: menu.id,
        }),
      };
    try {
      const response = await fetch(`https://ic1ln5cze5.execute-api.us-east-1.amazonaws.com/MenuStage/deleteMenu`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        console.log("Menu deleted successfully");
        setData((prevData) => prevData.filter((item) => item.id !== menu.id));
      } else {
        console.error("Failed to delete menu");
      }
    } catch (error) {
      console.error("Error deleting menu", error);
    }
  };

  const handleReturn = () => {
    router.push("/admin");
  };

  const createButton = () => {
    router.push("/admin/manage-menu/form");
  };


    const handleUpdate = (menu) => {
        router.push(`/admin/manage-menu/form?id=${menu.id}`);
      };
      


  return (
    <>
      <div className={style.divTable}>
        <table className={style.mainTable}>
          <thead className={style.tableHeading}>
            <tr>
              <th>Menu Title</th>
              <th>Dishes</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((menu) => (
                <tr key={menu.id} className={style.tableRow}>
                  <td>{menu.title}</td>
                  <td className={style.btnContainer}>
                    {menu.dishes &&
                      menu.dishes.map((dish, index) => (
                        <Dialog key={`${menu.id}-${index}`}>
                          <DialogTrigger asChild>
                            <button
                              className={`${style.btn} ${style.btnTable}`}
                            >
                              {dish.name}
                            </button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>{dish.name}</DialogTitle>
                              <DialogDescription>
                                {dish.description}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="mt-4">
                              <img
                                src={dish.image}
                                alt={dish.name}
                                className="w-full h-auto rounded-md mb-4"
                              />
                              <p className="text-gray-700">
                                Price:{" "}
                                <span className="text-yellow-500">
                                  {dish.price}
                                </span>
                              </p>
                            </div>
                          </DialogContent>
                        </Dialog>
                      ))}
                  </td>
                  <td className={style.btnContainer}>
                    <div className={style.btnTableDiv}>
                      <button
                        className={`${style.btn} ${style.btnTable}`}
                        onClick={() => handleUpdate(menu)}
                      >
                        Update
                      </button>
                      <button
                        className={`${style.btn} ${style.btnTable}`}
                        onClick={() => handleDelete(menu)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className={style.btnBottomDiv}>
        <button
          className={`${style.btn} ${style.btnBottom}`}
          onClick={createButton}
        >
          Create
        </button>
        <button
          className={`${style.btn} ${style.btnBottom}`}
          onClick={handleReturn}
        >
          Return
        </button>
      </div>
    </>
  );
};

MenuTable.hideLayout = true;

export default MenuTable;
