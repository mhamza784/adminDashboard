import AlertNotification from "@/components/Alert";
import NewLogin from "@/components/Login/NewLogin";
import Head from "next/head";
import React from "react";

const login = () => {
  return (
    <>
      <Head>
        <title>Love Latin Woman</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favorite.png" />
      </Head>
      {/* <AlertNotification /> */}
      <NewLogin />
    </>
  );
};

export default login;