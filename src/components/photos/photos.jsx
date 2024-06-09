import React, { useEffect, useState } from "react";
import axios from "axios";
import Rolling from "@img/rolling.svg";
import prev from "@img/prev.svg";
import next from "@img/next.svg";
import "./photos.css";

const Photos = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(8);

    useEffect(() => {
        setLoading(true);
        axios
            .get(
                `https://fakestoreapi.com/products?limit=${limit}&page=${currentPage}`
            )
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, [currentPage, limit]);

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => prev + 1);
    };

    if (loading) {
        return (
            <h3 style={{ textAlign: "center", marginTop: "20px" }}>
                <img src={Rolling} alt="Loading..." />
            </h3>
        );
    }

    let cards = data?.map((item) => (
        <div key={item.id} className="col-sm-12 col-md-6 col-lg-3 mb-4">
            <div className="foto card h-100">
                <img
                    src={item.image}
                    className="card-img-top h-50"
                    alt={item.title}
                />
                <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.price}</p>
                </div>
            </div>
        </div>
    ));

    return (
        <div className="container">
            <div className="row mt-2">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h1 className="text-center">Products</h1>
                        </div>
                        <div className="card-body">
                            <div className="row">{cards}</div>
                        </div>
                        <div className="card-footer d-flex justify-content-center pt-2">
                            <button
                                onClick={handlePreviousPage}
                                className="btn btn-primary"
                                disabled={currentPage === 1}>
                                <img src={prev} alt="prev icon" />
                            </button>
                            <span className="btn btn-info mx-2">
                                Page {currentPage}
                            </span>
                            <button
                                onClick={handleNextPage}
                                className="btn btn-primary">
                                <img src={next} alt="next icon" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Photos;
