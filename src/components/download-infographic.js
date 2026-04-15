import React, { createRef, useContext, useState } from "react"

import axios from "axios"
import { getSrc } from "gatsby-plugin-image"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import ReCAPTCHA from "react-google-recaptcha"

import { MessageContext } from "../contexts/message-context"

const DownloadInfographic = ({ preview, infographic }) => {
  const { setFlashMessage } = useContext(MessageContext)
  const [formRef] = useState(createRef())
  const [formState, setFormState] = useState({ step: 0 })
  const [formValidated, setFormValidated] = useState(false)

  const handleSubmit = event => {
    event.preventDefault()
    event.stopPropagation()

    const form = event.currentTarget
    setFlashMessage(null)

    if (form.checkValidity() === false) {
      setFormValidated(true)
      return
    }

    const recaptcha = Object.values(formRef.current).find(
      control => control.name === "g-recaptcha-response"
    )

    if (!recaptcha.value) {
      setFlashMessage({
        message:
          "Error verifying reCAPTCHA, please wait a few minutes and then try again?",
        type: "error",
        icon: "alert"
      })
      setFormValidated(true)
      return
    }

    const formData = {}
    Object.keys(formRef.current)
      .filter(key => formRef.current[key].value)
      .map(key => {
        const name = formRef.current[key].name
        return (formData[name] = formRef.current[key].value)
      })

    const axiosOptions = {
      url: "/",
      method: "post",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: new URLSearchParams(formData).toString()
    }

    axios(axiosOptions)
      .then(() => {
        setFormValidated(false)
        formRef.current.reset()
        setFormState({
          step: formState.step + 1
        })
      })
      .catch(() => {
        setFlashMessage({
          message:
            "Your submission could not be completed, please wait a few minutes and then try again?",
          type: "error",
          icon: "alert"
        })
        setFormValidated(false)
      })
  }

  const stepOne = () => {
    return (
      <Container className="infographic-wrapper my-4 my-md-7">
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card>
              <Row className="g-0">
                <Col md={9}>
                  <Card.Body>
                    <Card.Title>Download the Infographic</Card.Title>
                    <Card.Text as="div">
                      <p>
                        Fill out your information below to download our free
                        infographic for this article now.
                      </p>
                      <Form
                        ref={formRef}
                        name="infographic"
                        method="POST"
                        data-netlify-recaptcha="true"
                        data-netlify="true"
                        onSubmit={event => handleSubmit(event)}
                        noValidate
                        validated={formValidated}
                      >
                        <Form.Group className="mb-3">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter name"
                            maxLength="100"
                            name="name"
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            Please enter your name.
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Email Address</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter email"
                            maxLength="100"
                            name="email"
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            Please enter your email.
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="my-3">
                          <ReCAPTCHA
                            sitekey={process.env.GATSBY_RECAPTCHA_KEY}
                            name="g-recaptcha-response"
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            type="hidden"
                            name="form-name"
                            value="infographic"
                          />
                        </Form.Group>
                        <Button
                          type="submit"
                          className="btn btn-lg"
                          variant="outline-primary"
                        >
                          Submit
                        </Button>
                      </Form>
                    </Card.Text>
                  </Card.Body>
                </Col>
                <Col md={3}>
                  <Card.Img src={getSrc(preview)} alt={preview.name} />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }

  const stepTwo = () => {
    return (
      <Container className="infographic-wrapper my-8">
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card>
              <Row className="g-0">
                <Col md={9}>
                  <Card.Body>
                    <Card.Title></Card.Title>
                    <Card.Text as="div" className="text-center my-8">
                      <p>
                        Thank you for your interest in this infographic and
                        please use the link below to download a copy for your
                        personal use.
                      </p>
                      <p>
                        We'll never share your personal details or data with
                        anyone else.
                      </p>
                      <a
                        className="infographic-download-link"
                        href={infographic.publicURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={infographic.name}
                      >
                        Download Free Infographic
                      </a>
                    </Card.Text>
                  </Card.Body>
                </Col>
                <Col md={3}>
                  <Card.Img src={getSrc(preview)} alt={preview.name} />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }

  const displayFormStep = () => {
    switch (formState.step) {
      case 0:
        return infographic ? stepOne() : null
      case 1:
        return infographic ? stepTwo() : null
      default:
        return stepOne()
    }
  }

  return displayFormStep()
}

export default DownloadInfographic
