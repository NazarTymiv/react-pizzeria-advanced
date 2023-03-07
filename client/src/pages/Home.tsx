import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import qs from "qs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/store";

// REDUX ACTIONS
import {
    setCategoryId,
    setSortId,
    setCurrentPage,
    setFilters,
    FilterSliceState,
} from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzaSlice";

// COMPONENTS
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/Skeleton";
import Pagination from "../components/Pagination";

const Home: React.FC = () => {
    // CONFIGURATION
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isSearch = useRef(false);

    // DATA
    const { categoryId, sortType, currentPage, searchValue } = useSelector(
        (state: { filter: any }) => state.filter
    );

    const { items, status, totalPages } = useSelector((state: { pizza: any }) => state.pizza);

    // STATES
    const [checkedCurrentPage, setCheckedCurrentPage] = useState<number>(1);

    // CUSTOM FUNCTIONS

    const checkCurrentPage = useCallback(() => {
        if (categoryId !== 0 || searchValue.length !== 0) {
            dispatch(setCurrentPage(1));
            return 1;
        }

        return currentPage;
    }, [dispatch, categoryId, searchValue, currentPage])

    useEffect(() => {
        setCheckedCurrentPage(checkCurrentPage());
    }, [checkCurrentPage]);

    const getPizzas = useCallback(() => {
        dispatch(
            // @ts-ignore
            fetchPizzas({
                checkedCurrentPage,
                categoryId,
                sortType,
                searchValue,
            })
        );

        window.scrollTo(0, 0);
    }, [dispatch, categoryId, sortType, searchValue, checkedCurrentPage]);

    // DISPATCHES

    const onClickCategory = useCallback((id: number) => {
        dispatch(setCategoryId(id));
    }, [dispatch]);

    const onClickSort = useCallback((value: any) => {
        dispatch(setSortId(value));
    }, [dispatch]);

    const onChangeCurrentPage = (number: number) => {
        dispatch(setCurrentPage(number));
    };

    const parsedFilters = useMemo(() => qs.parse(window.location.search.substring(1)), []);

    const setFiltersCallback = useCallback((filters: FilterSliceState) => {
        dispatch(setFilters(filters));
    }, [dispatch]);

    useEffect(() => {
        if (window.location.search && !isSearch.current) {
            setFiltersCallback(parsedFilters);
            isSearch.current = true;
        }

        return () => { };
    }, [setFiltersCallback, parsedFilters, isSearch]);

    // REQUEST

    useEffect(() => {
        if (!isSearch.current) {
            getPizzas();
        }

        isSearch.current = false;
    }, [getPizzas]);

    // NAVIGATE
    const navigateRedirect = useCallback(() => {
        if (
            categoryId === 0 &&
            currentPage === 1 &&
            sortType === "rating" &&
            !isSearch.current
        ) {
            navigate("");
        } else {
            const queryString = qs.stringify({
                sortType,
                categoryId,
                currentPage,
            });

            navigate(`?${queryString}`);
        }
    }, [categoryId, sortType, currentPage, navigate]);

    useEffect(() => {
        navigateRedirect()
    }, [navigateRedirect]);

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    activeIndex={categoryId}
                    setActiveIndex={onClickCategory}
                />
                <Sort
                    activeListItem={sortType}
                    setActiveListItem={onClickSort}
                />
            </div>
            <h2 className="content__title">All pizzas</h2>
            {status === "error" ? (
                <div className="content__error-info">
                    <h2>An error occurred 😕</h2>
                    <p>
                        Unfortunately, it was not possible to get pizzas. Please
                        try again later.
                    </p>
                </div>
            ) : (
                <div className="content__items">
                    {status === "loading"
                        ? [...new Array(4)].map((_, index) => (
                            <Skeleton key={index} />
                        ))
                        : items.map((item: any) => (
                            <PizzaBlock key={item.id} {...item} />
                        ))}
                </div>
            )}
            {totalPages <= 1 ? null : (
                <Pagination
                    currentPage={currentPage}
                    onChangePage={onChangeCurrentPage}
                    totalPages={totalPages}
                />
            )}
        </div>
    );
};

export default Home;
