import React from "react";
import AboutUs from "./pages/AboutUs";
import Layout from "@/components/Layout";

const Home: React.FC = () => {
  return (
    <Layout>
        <title>Conation</title>
        <meta name="description" content="Conation Official Website" />
        <AboutUs/>
        {/* <Dashboard searchParams={Promise.resolve({})} />  */}
    </Layout>
  );
};

export default Home;
