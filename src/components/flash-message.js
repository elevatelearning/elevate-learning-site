import React, { useContext, useEffect } from "react"

import { AlertCircle, Bell } from "react-feather"

import { MessageContext } from "../contexts/message-context"

const FlashMessage = () => {
  const { flashMessage, setFlashMessage } = useContext(MessageContext)

  useEffect(() => {
    const handleKeyPress = event => {
      if (event.keyCode === 27) {
        setFlashMessage(null)
      }
    }
    window.addEventListener("keydown", handleKeyPress)

    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [setFlashMessage])

  const setIcon = () => {
    const iconSize = 18

    switch (flashMessage.icon) {
      case "alert":
        return <AlertCircle size={iconSize} />
      case "notification":
        return <Bell size={iconSize} />
      default:
        return ""
    }
  }

  const handleClick = () => {
    setFlashMessage(null)
  }

  const message = () => {
    return (
      <div
        className={`flash-message-wrapper ${flashMessage.type}`}
        onClick={() => handleClick()}
        onKeyDown={() => handleClick()}
        role="button"
        tabIndex="0"
      >
        <div className="flash-message-container">
          <i>{setIcon()}</i>
          <div className="flash-message">{flashMessage.message}</div>
        </div>
      </div>
    )
  }

  return flashMessage ? message() : null
}

export default FlashMessage
