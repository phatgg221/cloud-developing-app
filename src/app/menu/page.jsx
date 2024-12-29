"use client"
import React,{useState, useEffect} from "react";
import Image from "next/image";
import StarterSection from "./mainComponent";


const NightServe = () => {
    const [data, setData]= useState([]);
    const [loading, setLoading]= useState(true);
    const [error, setError]= useState(null);

    useEffect(() =>{
        const fetchData= async () =>{
            try{
                const response= await fetch("https://ic1ln5cze5.execute-api.us-east-1.amazonaws.com/MenuStage/getMenu",);

                if(!response.ok){
                    throw new Error("Failed to fetch data");
                }
                const data= await response.json();
                const body= JSON.parse(data.body);
                setData(body.data);
            }catch(err){
                setError(err.message);
            }finally{
                setLoading(false);
            }
        }
        fetchData();
    },[]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if(error){
        return <p>Error: {error}</p>;
    }
    return (
        <div>
            <div className="pt-[100px] text-center pb-[50px]">
                <Image
                    src={"/menulabel.png"}
                    alt="label"
                    width={162}
                    height={22}
                    className="mx-auto"
                />
                <p className="text-4xl pt-[30px] font-bold">
                    Why not have a drink with us?
                </p>
                <p className="mx-auto max-w-lg pt-[20px]">
                    Here is our dedication to serve you the best drinks in town.
                </p>
            </div>
            {data?.map((item) => (
                <StarterSection key={item.id} title={item.title} dishes={item.dishes} />
            ))}
        </div>
    );
}

export default NightServe;