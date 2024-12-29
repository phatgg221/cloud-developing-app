"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import style from "../../../../styles/Admin.Form.module.css";
import styleBtn from "../../../../styles/table.module.css";

const NewTableForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Read the `id` from the query parameter

  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    number: "",
    status: "Available",
    size: "",
  });

  useEffect(() => {
    if (id) {
      // Fetch table data if `id` is present (update mode)
      const fetchTableData = async () => {
        try {
          const response = await fetch(
            `https://ic1ln5cze5.execute-api.us-east-1.amazonaws.com/TableStage/getTables`
          );
          if (response.ok) {
            const data = await response.json();
            const body = JSON.parse(data.body);
            const table = body.data.find((table) => table.id === id);

            if (table) {
              setFormData(table);
              setIsEditMode(true);
            }
          } else {
            console.error("Failed to fetch table data");
          }
        } catch (error) {
          console.error("Error fetching table data:", error);
        }
      };

      fetchTableData();
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestBody = {
      httpMethod: isEditMode ? "PUT" : "POST",
      body: JSON.stringify({
        id: formData.id,
        number: formData.number,
        status: formData.status,
        size: formData.size,
      }),
    };

    try {
      const response = await fetch(
        `https://ic1ln5cze5.execute-api.us-east-1.amazonaws.com/TableStage/createTable`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form data.");
      }

      router.push("/admin/manage-tables");
    } catch (error) {
      console.error("Error submitting table data:", error);
    }
  };

  return (
    <div className={`${style.formContainer}`}>
      <form className={`${style.form}`} onSubmit={handleSubmit}>
        <div className={style.inputGroup}>
          <label>Table ID</label>
          <input
            required
            type="text"
            name="id"
            value={formData.id}
            placeholder="Enter Table ID"
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            disabled={isEditMode} // Disable editing ID in update mode
          />
        </div>
        <div className={style.inputGroup}>
          <label>Table Number</label>
          <input
            required
            type="text"
            name="number"
            value={formData.number}
            placeholder="Enter Table Number"
            onChange={(e) =>
              setFormData({ ...formData, number: e.target.value })
            }
          />
        </div>
        <div className={style.inputGroup}>
          <label>Table Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
          >
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
          </select>
        </div>
        <div className={style.inputGroup}>
          <label>Table Size</label>
          <input
            required
            type="text"
            name="size"
            value={formData.size}
            placeholder="Enter Table Size"
            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
          />
        </div>

        <div className={styleBtn.btnBottomDiv}>
          <button className={`${styleBtn.btn}`} type="submit">
            {isEditMode ? "Update Table" : "Create Table"}
          </button>
          <button
            className={`${styleBtn.btn}`}
            type="button"
            onClick={() => router.push("/admin/manage-tables")}
          >
            Return
          </button>
        </div>
      </form>
    </div>
  );
};

NewTableForm.hideLayout = true;
export default NewTableForm;
