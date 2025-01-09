"use client";
import React, { useEffect, useState,Suspense  } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import style from "../../../../styles/Admin.Form.module.css";
import styleBtn from "../../../../styles/table.module.css";

const NewMenuForm = () => {
  const router = useRouter();
  ; // Read the `id` from the query parameter
  const [id,setId]=useState('');
  const [accessToken, setAccessToken]= useState();
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
}, []);
  function Search() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id")
    setId(id);
    return <div></div>;
  }
  const [user, setUser]= useState(null);
  if(user && !user?.isAdmin){
    router.push('/');
  }
    useEffect(() => {
       const fetchUserInfo = async () => {
         try {
           const response = await fetch("/api/me");
           if (response.ok) {
             const userInfo = await response.json();
             setUser(userInfo.userInfo);
   
             const token = document.cookie
               .split("; ")
               .find((row) => row.startsWith("accessToken="))
               ?.split("=")[1];
             setAccessToken(token);
           } else {
            setUser(null);
           }
         } catch (error) {
           console.error("Error fetching user info:", error);
         }
       };
   
       fetchUserInfo();
     }, []);

  const [dishes, setDishes] = useState([{ name: "", description: "", price: "", image: "" }]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    dishes: [],
  });

  useEffect(() => {
    if (id) {
      // Fetch menu data if `id` is present (update mode)
      const fetchMenuData = async () => {
        try {
          const response = await fetch(`https://ic1ln5cze5.execute-api.us-east-1.amazonaws.com/MenuStage/getMenu`);
          if (response.ok) {
            const data = await response.json();
            const body = JSON.parse(data.body);
            const menu = body.data.find((menu) => menu.id === id); 

            if (menu) {
              setFormData(menu);
              setDishes(menu.dishes);
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

  const handleDishInputChange = (index, event) => {
    const newDishes = [...dishes];
    newDishes[index][event.target.name] = event.target.value;
    setDishes(newDishes);
  };

  const handleAddDish = () => {
    setDishes([...dishes, { name: "", description: "", price: "", image: "" }]);
  };

  const handleDeleteDish = (index) => {
    const newDishes = [...dishes];
    newDishes.splice(index, 1);
    setDishes(newDishes);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestBody = {
      httpMethod: isEditMode ? "PUT" : "POST",
      body: JSON.stringify({
        id: formData.id,
        title: formData.title,
        dishes: dishes,
      }),
    };
    console.log(requestBody,'requested');
    try {
      const response = await fetch("https://ic1ln5cze5.execute-api.us-east-1.amazonaws.com/MenuStage/createMenu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form data.");
      }

      router.push("/admin/manage-menu");
    } catch (error) {
      console.error("Error submitting menu:", error);
    }
  };

  return (
    
    <div className={`${style.formContainer}`}>
      <Suspense fallback={<div>Loading...</div>}>
      <Search />
    </Suspense>
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
            <div className={`${style.inputGroup}`}>
              <label>Image</label>
              {/* <label>Image URL</label> */}
              { dish.image ?(
                <div>
                    <img src={dish.image} alt="dish" style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }}></img>

                </div>
              ):(
                <div>
                   <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(index, e)}
                />
                </div>
              )

              }
              <input
                type="text"
                name="image"
                value={dish.image}
                onChange={(e) => handleDishInputChange(index, e)}
              />
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
