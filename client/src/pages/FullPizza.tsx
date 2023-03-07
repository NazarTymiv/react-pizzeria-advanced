import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchCurrentPizza } from "../redux/slices/pizzaSlice";
import Page404 from "./Page404";

const FullPizza: React.FC = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const {
        currentItem: { title, price, imageUrl },
        status,
    } = useSelector((state: { pizza: any }) => state.pizza);

    const fetchCurrentPizzaDis = useCallback(() => {
        dispatch(
            // @ts-ignore
            fetchCurrentPizza(id)
        );
    }, [dispatch, id])

    useEffect(() => {
        fetchCurrentPizzaDis()
    }, [fetchCurrentPizzaDis]);

    return (
        <>
            {status === "error" ? (
                <Page404 />
            ) : status === "loading" ? (
                <p>Loading...</p>
            ) : (
                <div className="container">
                    <img src={imageUrl} alt="Pizza" />
                    <h2>{title}</h2>
                    <h4>{price} £</h4>
                    <Link
                        to="/"
                        className="button button--outline button--add go-back-btn"
                    >
                        <svg
                            width="8"
                            height="14"
                            viewBox="0 0 8 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7 13L1 6.93015L6.86175 1"
                                stroke="#D3D3D3"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </svg>

                        <span>Come back</span>
                    </Link>
                </div>
            )}
        </>
    );
};

export default FullPizza;
