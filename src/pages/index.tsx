import { Component } from "react";
import Router from "next/router";
import { DocumentContext } from 'next/document'

const redirectTo = "/users";

export default class RootPage extends Component {
  static async getInitialProps(ctx: DocumentContext) {
    if (ctx && ctx.req) {
      ctx.res.writeHead(302, { Location: redirectTo })
      ctx.res.end()
    } else {
      return Router.push(redirectTo)
    }
  }
}