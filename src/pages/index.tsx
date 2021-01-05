import { Component } from "react";
import Router from "next/router";

const redirectTo = "/users";

export default class RootPage extends Component {
  static async getInitialProps(ctx: any) {
    if (ctx && ctx.req) {
      ctx.res.writeHead(302, { Location: redirectTo })
      ctx.res.end()
    } else {
      return Router.push(redirectTo)
    }
  }
}