"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import style from "../../../../styles/Admin.Form.module.css";
import styleBtn from "../../../../styles/table.module.css";
import imageCompression from "browser-image-compression";

const NewMenuForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [user, setUser] = useState(null);
  const [dishes, setDishes] = useState([{ name: "", description: "", price: "", image: "" }]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    dishes: [],
  });
  const [uploadingImage, setUploadingImage] = useState(false);

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
      }
    };

    fetchUserInfo();
  }, [router]);

  // Fetch menu data for edit mode
  useEffect(() => {
    if (id) {
      const fetchMenuData = async () => {
        try {
          const response = await fetch(
            `https://ic1ln5cze5.execute-api.us-east-1.amazonaws.com/MenuStage/getMenu`
          );
          if (response.ok) {
            const data = await response.json();
            const body = JSON.parse(data.body);
            const menu = body.data.find((menu) => menu.id === id);

            if (menu) {
              setFormData(menu);
              setDishes(menu.dishes || []);
              setIsEditMode(true);
            }
          } else {
            console.error("Failed to fetch menu data");
          }
        } catch (error) {
          console.error("Error fetching menu data:", error);
        }
      };

      fetchMenuData();
    }
  }, [id]);

  const handleImageUpload = async (index, event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setUploadingImage(true);

      // Compress the image
      const options = {
        maxSizeMB: 10,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);

      console.log("Original File Size:", file.size / 1024 / 1024, "MB");
      console.log("Compressed File Size:", compressedFile.size / 1024 / 1024, "MB");

      // Convert to Base64
      const base64String = await imageCompression.getDataUrlFromFile(compressedFile);
      const base64Data = base64String.split(",")[1];
      const fileName = `${Date.now()}-${file.name}`;

      // Upload to server
      const response = await fetch(
        "https://icnhlwi8ea.execute-api.us-east-1.amazonaws.com/dev",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            file: base64Data,
            fileName,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        const uploadedImageUrl = JSON.parse(result.body).url;

        // Update the dishes array with the uploaded image URL
        const updatedDishes = [...dishes];
        updatedDishes[index].image = uploadedImageUrl;
        setDishes(updatedDishes);

        console.log("Image uploaded successfully:", uploadedImageUrl);
      } else {
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDishInputChange = (index, event) => {
    const updatedDishes = [...dishes];
    updatedDishes[index][event.target.name] = event.target.value;
    setDishes(updatedDishes);
  };

  const handleAddDish = () => {
    setDishes([...dishes, { name: "", description: "", price: "", image: "" }]);
  };

  const handleDeleteDish = (index) => {
    const updatedDishes = [...dishes];
    updatedDishes.splice(index, 1);
    setDishes(updatedDishes);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      id: formData.id,
      title: formData.title,
      dishes,
    };

    try {
      const response = await fetch(
        "https://ic1ln5cze5.execute-api.us-east-1.amazonaws.com/MenuStage/createMenu",
        {
          method: isEditMode ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        router.push("/admin/manage-menu");
      } else {
        throw new Error("Failed to submit menu data");
      }
    } catch (error) {
      console.error("Error submitting menu data:", error);
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
            placeholder="Enter Menu ID"
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            disabled={isEditMode}
          />
        </div>
        <div className={style.inputGroup}>
          <label>Menu Title</label>
          <input
            required
            type="text"
            name="title"
            value={formData.title}
            placeholder="Enter Menu Title"
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
            <div className={style.inputGroup}>
              <label>Image</label>
              {dish.image ? (
                <img
                  src={dish.image}
                  alt="dish"
                  style={{ maxWidth: "100px", maxHeight: "100px", objectFit: "cover" }}
                />
              ) : (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(index, e)}
                  disabled={uploadingImage}
                />
              )}
            </div>
            <div className={`${style.inputGroup} ${style.centered}`}>
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
          <button className={`${styleBtn.btn}`} type="button" onClick={handleAddDish}>
            Add Dish
          </button>
          <button className={`${styleBtn.btn}`} type="submit">
            {isEditMode ? "Update Menu" : "Create Menu"}
          </button>
          <button
            className={`${styleBtn.btn}`}
            type="button"
            onClick={() => router.push("/admin/manage-menu")}
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
