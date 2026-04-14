import React from "react"

import Footer from "./footer"
import FlashMessage from "./flash-message"
import Header from "./header"
import { MessageContextProvider } from "../contexts/message-context"

const Layout = ({ children }) => {
  return (
    <MessageContextProvider>
      <FlashMessage />
      <Header />
      <main>{children}</main>
      <Footer />
    </MessageContextProvider>
  )
}

export default Layout
