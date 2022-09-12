import React from "react";
import Card from "../card/Card";
import MapUnwrapped from "../constructs/MapUnwrapped";
import GridContainer from "../container/GridContainer";
import Layout from "../layout/Layout";
import cards from "./cards.json";

export default function Start() {
  return (
    <Layout>
      <GridContainer>
        <MapUnwrapped
          data={cards}
          renderItem={(item, i) => (
            <Card
              key={i.toString()}
              title={item.title}
              description={item.description}
            />
          )}
        />
      </GridContainer>
    </Layout>
  );
}
