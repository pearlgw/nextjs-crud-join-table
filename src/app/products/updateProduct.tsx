"use client";

import { SyntheticEvent, useState } from "react";
import type { Brand } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

type Product = {
    id: number;
    title: string;
    price: number;
    brandId: number;
}

const UpdateProduct = ({ brands, product }: { brands: Brand[]; product: Product; }) => {
    const [title, setTitle] = useState(product.title);
    const [price, setPrice] = useState(product.price);
    const [brand, setBrand] = useState(product.brandId);
    const [isOpen, setIsOpen] = useState(false);
    const [isMutating, setIsMutating] = useState(false);

    const router = useRouter();

    const handleModel = () => {
        setIsOpen(!isOpen);
    };


    const handleUpdate = async (e: SyntheticEvent) => {
        e.preventDefault();
        setIsMutating(true);
        await axios.patch(`/api/product/${product.id}`, {
            title: title,
            price: Number(price),
            brandId: Number(brand)
        })
        setIsMutating(false);

        router.refresh();
        setIsOpen(false);
    };

    return (
        <div>
            <button className="btn btn-info btn-sm" onClick={handleModel}>Edit</button>
            <div className={isOpen ? "modal modal-open" : "modal"}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Update product {product.title}</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="form-control w-full">
                            <label className="label font-bold">Product Name</label>
                            <input type="text" className="input input-bordered" placeholder="Product Name" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Product Price</label>
                            <input type="text" className="input input-bordered" placeholder="Product Price" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Brand</label>
                            <select className="select select-bordered" value={brand} onChange={(e) => setBrand(Number(e.target.value))}>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleModel}>Close</button>
                            {!isMutating ? (
                                <button type="submit" className="btn btn-primary">Update</button>
                            ) : (
                                <button type="button" className="btn loading">Updating ...</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct
