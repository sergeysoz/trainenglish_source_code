import React from "react";
import Container from "../container/Container";
import Footer from "../footer/Footer";
import Search from "../search/Search";

export default function Layout({ children }) {
  return (
    <div>
      <Search />
      <Container>{children}</Container>
      <Footer />
    </div>
  );
}
