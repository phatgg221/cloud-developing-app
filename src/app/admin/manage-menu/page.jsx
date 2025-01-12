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
} from "../../../components/ui/dialog";
import { useRouter } from "next/navigation";

const MenuTable = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Redirect non-admin users
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("/api/me");
        if (response.ok) {
          const userInfo = await response.json();
          setUser(userInfo.userInfo);

          if (!userInfo.userInfo?.isAdmin) {
            router.push("/");
          }
        } else {
          setUser(null);
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [router]);

  // Fetch menu data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://ic1ln5cze5.execute-api.us-east-1.amazonaws.com/MenuStage/getMenu"
        );

        if (response.ok) {
          const result = await response.json();
          const body = JSON.parse(result.body);
          setData(body.data);
        } else {
          console.error("Failed to fetch menu data");
        }
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (menu) => {
    try {
      const id= menu.id;
      const payload = {
        httpMethod: "DELETE", // Include httpMethod if required by the backend
        body: JSON.stringify({ id }) // Nest id in the body as a string
    };
      const response = await fetch(
        `https://ic1ln5cze5.execute-api.us-east-1.amazonaws.com/cafeappstage/deleteMenu`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        setData((prevData) => prevData.filter((item) => item.id !== menu.id));
        console.log("Menu deleted successfully");
      } else {
        console.error("Failed to delete menu");
      }
    } catch (error) {
      console.error("Error deleting menu:", error);
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

  if (loading) return <div>Loading...</div>;

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
            {data.map((menu) => (
              <tr key={menu.id} className={style.tableRow}>
                <td>{menu.title}</td>
                <td className={style.btnContainer}>
                  {menu.dishes &&
                    menu.dishes.map((dish, index) => (
                      <Dialog key={`${menu.id}-${index}`}>
                        <DialogTrigger asChild>
                          <button className={`${style.btn} ${style.btnTable}`}>
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
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={dish.image || "/images/default.jpg"}
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
