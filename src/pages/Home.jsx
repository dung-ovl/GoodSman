import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Helmet from "../components/Helmet/Helmet";
import ProductListHScroll from "../components/UI/ProductListHScroll";
import "../styles/home.css";
import productData from "../assets/data/product";
import Clock from "../components/UI/Clock";
import Services from "../services/Services";
import serviceData from "../assets/data/servicesData";
import rateData from "../assets/data/rate";
import Testimonial from "../components/UI/Testimonial";
import newsImg from "../assets/images/new-01.png";
import CategoryCard from "../components/UI/CategoryCard";
import categoryData from "../assets/data/category";
import { Upload } from "../database/testConnection.js";
import { collection, getDocs } from "firebase/firestore/lite";
import { firebaseFirestore } from "../database/InstanceFiresbase";
import { ProductModel } from "../database/Models/ProductModel.ts";

async function getProducts() {
  const mCollection = collection(firebaseFirestore, "/products").withConverter(
    ProductModel.productConvert
  );
  const mSnapshot = await getDocs(mCollection);
  const mDocs = mSnapshot.docs.map((doc) => doc.data());
  return mDocs;
}

function Home() {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const services = serviceData;
  const rates = rateData;
  const categories = categoryData;
  const bestSellProduct =
    productData[Math.floor(Math.random() * productData.length)];

  useEffect(() => {
    const trendingProduct = productData.filter(
      (item) => item.isTrending === true
    );

    setTrendingProducts(trendingProduct);
  }, []);

  return (
    <Helmet title={"Home"}>
      <section className="hero-section position-relative">
        <Container>
          <div className="hero-section__bg"></div>
        </Container>
        <Container>
          <Row>
            <Col xl="5" md="8">
              <div className="hero-section__content shadow-lg rounded">
                <h1 className="fw-bold display-6">
                  HI???N TH???C H??A ?????C M?? C??NG NGH???
                </h1>
                <p className="my-5">?????i m???i s??ng t???o, truy c???u s??? ho??n h???o</p>
                <Link to="/shop">
                  <motion.button
                    whileTap={{ scale: 1.2 }}
                    className="btn btn-primary btn-lg"
                  >
                    Mua h??ng
                  </motion.button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="category">
        <Container>
          <Row className="text-center py-5">
            <h1 className="fw-bold display-6">Danh m???c s???n ph???m</h1>
          </Row>
          <Row className="">
            <Col>
              <Row className="g-3">
                {categories.map((item, index) => (
                  <Col lg="6" key={index}>
                    <Link>
                      <CategoryCard item={item} />
                    </Link>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
          <Row>
            <Col className="text-center mt-5">
              <Link to="/shop">
                <motion.button
                  whileTap={{ scale: 1.2 }}
                  className="btn btn-primary btn-lg opacity-100"
                >
                  Xem th??m...
                </motion.button>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="product-special-discount">
        <Container>
          <Row className="text-center py-5">
            <h1 className="fw-bold display-6">Khuy???n m??i ?????c bi???t</h1>
          </Row>
        </Container>
      </section>
      <section className="product-best-sell">
        <Container>
          <Row className="align-items-center py-5">
            <Col lg="6">
              <div className="product-best-sell__content">
                <div className="product-best-sell__content--title">
                  <h3 className="fs-3 mb-3">S???n ph???m c???c Hot</h3>
                </div>
                <div className="product-best-sell__content--clock my-4">
                  <Clock />
                </div>
                <Link to="/shop">
                  <motion.button
                    whileTap={{ scale: 1.2 }}
                    className="btn btn-primary btn-lg opacity-100 fw-bold"
                  >
                    Gh?? shop ngay!
                  </motion.button>
                </Link>
              </div>
            </Col>
            <Col lg="6">
              <div className="text-end product-best-sell__img">
                <img
                  src={bestSellProduct.imgThumb}
                  className="img-fluid  "
                  alt=""
                ></img>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="product-trending">
        <Container>
          <Row className="text-center py-5">
            <h1 className="fw-bold display-6">S???n ph???m ???????c ??u chu???ng</h1>
          </Row>
          <Row className="">
            <ProductListHScroll data={trendingProducts} />
          </Row>
        </Container>
      </section>

      <section className="product-services my-5 py-3">
        <Container>
          <Row className="text-center py-5">
            <h1 className="fw-bold display-6">
              L???i ??ch khi mua h??ng t???i Wibu Store
            </h1>
          </Row>
          <Row className="text-center">
            {services.map((item, index) => (
              <Col sx="12" lg="3" md="6" key={index} className="p-4">
                <Services item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <section className="product-testimonial my-5 py-3">
        <Container>
          <Row className="text-center py-5">
            <h1 className="product-testimonial__title fw-bold display-6">
              Ch??ng t??i t??? h??o
            </h1>
            <h4 className="product-testimonial__subtitle my-3 fw-light">
              C?? h??n 6969 kh??ch h??ng th??n thi???t
            </h4>
          </Row>

          <Row className="">
            <Testimonial data={rates} />
          </Row>
        </Container>
      </section>
      <section className="product-news my-5 py-3">
        <Container>
          <Row className="py-5">
            <Col className="p-0" lg="6" sx="12">
              <div className="product-news__img">
                <img src={newsImg} className="img-fluid" alt=""></img>
              </div>
            </Col>
            <Col className="p-0" lg="6" sx="12">
              <div className="product-news__content p-4 p-md-5 h-100">
                <h1 className="display-6 fw-light mb-3">????ng k??</h1>
                <h1 className="display-5 fw-bold">Nh???n tin khuy???n m??i</h1>
                <p className="product-news__content--subtitle my-3 fs-5">
                  Nh???ng l???n gi???m gi?? s???c ??ang ch??? c??c b???n
                </p>
                <input
                  type="email"
                  className="form-control product-news__content--input border-0 my-4"
                  placeholder="Nh???p e-mail t???i ????y"
                ></input>
                <motion.button
                  whileTap={{ scale: 1.2 }}
                  className="btn btn-primary btn-lg"
                >
                  ????ng k??
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}

export default Home;
