"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import style from "../../../styles/Admin.Form.module.css";
import styleBtn from "../../../styles/table.module.css";


const NewMenuForm = () => {
  const router = useRouter();
  const [dishCount, setDishCount] = useState(1);
  const [dishes, setDishes] = useState([{ name: "", description: "", price: "", image: "" }]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    dishes: [],
  });

  const [errorSubmit, setErrorSubmit] = useState("");

  useEffect(() => {
    setFormData((prevState) => ({ ...prevState, dishes: dishes }));
  }, [dishes]);

  useEffect(() => {
    const fetchData = async () => {

        try {
          setIsEditMode(true);
          const response = await fetch(`https://ic1ln5cze5.execute-api.us-east-1.amazonaws.com/MenuStage/getMenu`);
          const data = await response.json();
          if (data && data.error === false && data.statusCode === 200 && data.data) {
            setFormData(data.data);
            setDishCount(data.data.dishes.length);
            setDishes(data.data.dishes);
          } else {
            console.error("Data structure is not as expected: ", data);
          }
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      
    };
    fetchData();
  }, []);

  const handleDishInputChange = (index, event) => {
    const newDishes = [...dishes];
    newDishes[index][event.target.name] = event.target.value;
    setDishes(newDishes);
  };

  const handleAddDish = () => {
    setDishCount(dishCount + 1);
    setDishes([...dishes, { name: "", description: "", price: "", image: "" }]);
  };

  const handleDeleteDish = (index) => {
    const newDishes = [...dishes];
    newDishes.splice(index, 1);
    setDishes(newDishes);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (errorSubmit) {
      alert("Invalid form. Cannot submit.");
      return;
    }
    try {
      const response = isEditMode
        ? await fetch(`/api/menu_api?id=${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          })
        : await fetch("/api/menu_api", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

      if (!response.ok) {
        throw new Error("Failed to submit form data.");
      }

      window.location.href = "/admin/menus";
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <div className={`${style.formContainer}`}>
      <form className={`${style.form}`} onSubmit={handleSubmit}>
        <div className={style.inputGroup}>
          <label>Menu ID</label>
          <input
            required
            type="text"
            name="id"
            value={formData.id}
            placeholder={isEditMode ? formData.id : ""}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
          />
        </div>
        <div className={style.inputGroup}>
          <label>Menu Title</label>
          <input
            required
            type="text"
            name="title"
            value={formData.title}
            placeholder={isEditMode ? formData.title : ""}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        {dishes.map((dish, index) => (
          <div key={index} className={style.Row}>
            <div className={`${style.inputGroup} ${style.organizerInput}`}>
              <label>Dish Name</label>
              <input
                type="text"
                name="name"
                value={dish.name}
                onChange={(e) => handleDishInputChange(index, e)}
              />
            </div>
            <div className={`${style.inputGroup} ${style.organizerInput}`}>
              <label>Description</label>
              <input
                type="text"
                name="description"
                value={dish.description}
                onChange={(e) => handleDishInputChange(index, e)}
              />
            </div>
            <div className={`${style.inputGroup}`}>
              <label>Price</label>
              <input
                type="text"
                name="price"
                value={dish.price}
                onChange={(e) => handleDishInputChange(index, e)}
              />
            </div>
            <div className={`${style.inputGroup}`}>
              <label>Image URL</label>
              <input
                type="text"
                name="image"
                value={dish.image}
                onChange={(e) => handleDishInputChange(index, e)}
              />
            </div>
            <div className={`${style.inputGroup} ${style.centered}`}>
              <label className={style.hideLable}> a</label>
              <button
                className={`${styleBtn.btn}`}
                type="button"
                onClick={() => handleDeleteDish(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        <div className={styleBtn.btnBottomDiv}>
          <button
            className={`${styleBtn.btn}`}
            type="button"
            onClick={handleAddDish}
          >
            Add Dish
          </button>

          <button
            className={`${styleBtn.btn}`}
            type="submit"
          >
            {isEditMode ? "Update Menu" : "Create Menu"}
          </button>
          <button
            className={`${styleBtn.btn}`}
            type="button"
            onClick={() => window.location.href = "/admin"}
          >
            Return
          </button>
        </div>
      </form>
    </div>
  );
};

NewMenuForm.hideLayout = true;
export default NewMenuForm;
