import React from "react";
import App, { Container } from "next/app";
import Router from "next/router";
import { initGA, logPageView } from "../modules/analytics";

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidMount() {
    initGA();
    logPageView();
    Router.router.events.on("routeChangeComplete", logPageView);
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <div style={{ maxWidth: "30em" }}>
          <Component {...pageProps} />
        </div>
      </Container>
    );
  }
}