"use client";

import { SyntheticEvent, useState } from "react";
import type { Brand } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddProduct = ({ brands }: { brands: Brand[] }) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [brand, setBrand] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isMutating, setIsMutating] = useState(false);

    const router = useRouter();

    const handleModel = () => {
        setIsOpen(!isOpen);
    };


    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        setIsMutating(true);
        await axios.post('/api/product', {
            title: title,
            price: Number(price),
            brandId: Number(brand)
        })
        setIsMutating(false);
        setTitle("");
        setPrice("");
        setBrand("");
        router.refresh();
        setIsOpen(false);
    };

    return (
        <div>
            <button className="btn" onClick={handleModel}>Add New</button>
            <div className={isOpen ? "modal modal-open" : "modal"}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add New product</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full">
                            <label className="label font-bold">Product Name</label>
                            <input type="text" className="input input-bordered" placeholder="Product Name" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Product Price</label>
                            <input type="text" className="input input-bordered" placeholder="Product Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Brand</label>
                            <select className="select select-bordered" value={brand} onChange={(e) => setBrand(e.target.value)}>
                                <option value="" disabled>Select a Brand</option>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleModel}>Close</button>
                            {!isMutating ? (
                                <button type="submit" className="btn btn-primary">Save</button>

                            ) : (
                                <button type="button" className="btn loading">Saving ...</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddProduct
