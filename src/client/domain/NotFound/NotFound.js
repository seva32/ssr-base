import React from "react";
import { Helmet } from "react-helmet-async";
import { Status } from "../../components";
import imgPath from "../../assets/img/notfound.png";
import * as Styles from "./NotFound.style";
import { Layout } from "../Layout";

const NotFound = () => (
  <Layout>
    <Helmet>
      <title>Todos</title>
    </Helmet>
    <Status status={404}>
      <Styles.StyledContainer img={imgPath} />
    </Status>
  </Layout>
);

export default NotFound;
