"use client";

import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Product = {
    id: number;
    title: string;
    price: number;
    brandId: number;
}

const DeleteProduct = ({ product }: { product: Product }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMutating, setIsMutating] = useState(false);

    const router = useRouter();

    const handleModel = () => {
        setIsOpen(!isOpen);
    };


    const handleDelete = async (productId: number) => {
        setIsMutating(true);
        await axios.delete(`/api/product/${productId}`);
        setIsMutating(false);
        router.refresh();
        setIsOpen(false);
    };

    return (
        <div>
            <button className="btn btn-error btn-sm" onClick={handleModel}>Delete</button>
            <div className={isOpen ? "modal modal-open" : "modal"}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are sure to delete {product.title}?</h3>
                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleModel}>No</button>
                        {!isMutating ? (
                            <button type="button" onClick={() => handleDelete(product.id)} className="btn btn-primary">Yes</button>
                        ) : (
                            <button type="button" className="btn loading">Deleting ...</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteProduct
