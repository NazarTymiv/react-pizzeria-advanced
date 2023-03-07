import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import "./scss/app.scss";

// COMPONENTS
import Header from "./components/Header";
import Home from "./pages/Home";

const Cart = lazy(() => import(/*webpackChunkName: "Cart"*/'./pages/Cart'))
const Page404 = lazy(() => import(/*webpackChunkName: "Page404"*/'./pages/Page404'))
const FullPizza = lazy(() => import(/*webpackChunkName: "FullPizza"*/'./pages/FullPizza'))

function App() {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Suspense fallback={<div>Loading...</div>}><Cart /></Suspense>} />
                    <Route path="/pizza/:id" element={<Suspense fallback={<div>Loading...</div>}><FullPizza /></Suspense>} />
                    <Route path="*" element={<Suspense fallback={<div>Loading...</div>}><Page404 /></Suspense>} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
