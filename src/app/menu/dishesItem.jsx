import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const DishItem = ({ name, description, price, image }) => (
  <div className="flex flex-col md:flex-row justify-between items-start mb-4 border-b border-gray-300 pb-2 max-w-md mx-auto relative group">
    <div>
      <h2 className="font-bold text-xl md:text-2xl">{name}</h2>
      <p className="pt-2 text-sm md:text-base">{description}</p>
    </div>
    <div className="text-yellow-500 pt-2 text-lg md:text-xl">{price}</div>
    <Dialog>
      <DialogTrigger asChild>
        {/* Order Button */}
        <button className="absolute top-0 right-0 bg-yellow-500 text-white py-1 px-4 rounded-md opacity-0 group-hover:opacity-100 transform group-hover:translate-y-2 transition duration-300 ease-in-out">
          Order
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <img src={image} alt={name} className="w-full h-auto rounded-md mb-4" />
          <p className="text-gray-700">
            Price: <span className="text-yellow-500">{price}</span>
          </p>
        </div>
        <div className="flex justify-end mt-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded-md mr-2">
            Confirm Order
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded-md">
            Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  </div>
);

export default DishItem;
