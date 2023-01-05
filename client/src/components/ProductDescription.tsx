import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { STATUS, getProducts } from "../store/product";
import Product from "./Product";
import Loading from "./Loading";

function ProductDescription() {
  const { id } = useParams();
  const { data, status } = useSelector<any, any>(state => state.products);
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});

  useEffect(() => {
    if (status === STATUS.LOADING) return;
    if (status === STATUS.ERROR) return;
    let product = data.find((element: any) => element.id == id);
    setProduct(product);
  }, [status]);

  useEffect(() => {
    if (data.length > 0) return;
    dispatch<any>(getProducts());
  }, []);

  if (status === STATUS.LOADING) return <Loading />;

  if (status === STATUS.ERROR) {
    return <div>something went wrong</div>;
  }

  return <Product {...product} />;
}

export default ProductDescription;
