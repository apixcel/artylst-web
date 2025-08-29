import React from "react";
import CustomerPage from "../customer/page";
import RewardsPage from "../rewards/page";
import Artylstpage from "../artylst/page";

const KnowledgeBase = () => {
  return (
    <section className="wrapper-inner">
      <CustomerPage />
      <Artylstpage />
      <RewardsPage />
    </section>
  );
};

export default KnowledgeBase;
