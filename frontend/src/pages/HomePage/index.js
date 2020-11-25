import React from "react";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";

import Header from "../../components/Header";
import Adsense from "../../components/Adsense";

import { ContentContainer, Form } from "./styles";

import ShrotenerService from "../../services/shortenerService";

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      url: "",
      code: "",
      errorMessage: "",
    };
  }

  handlerSubmit = async (event) => {
    event.preventDefault();
    const { url } = this.state;

    this.setState({ isLoading: true, errorMessage: "" });

    if (!url) {
      this.setState({ isLoading: false, errorMessage: "Informe uma URL" });
    } else {
      try {
        const service = new ShrotenerService();
        const result = await service.generate({ url });

        this.setState({ isLoading: false, code: result.code });
      } catch (error) {
        this.setState({
          isLoading: false,
          errorMessage: "Ops, ocorreu um erro ao tentar encurtar a url",
        });
      }
    }
  };

  copyToClipboard = () => {
    const element = this.inputURL;
    element.select();
    document.execCommand("copy");
  };

  render() {
    const { isLoading, errorMessage, code } = this.state;
    return (
      <Container>
        <Header>Encurtador de URL</Header>
        <ContentContainer>
          <Form onSubmit={this.handlerSubmit}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Digite a url para encurtar"
                defaultValue=""
                onChange={(e) => this.setState({ url: e.target.value })}
              />
              <InputGroup.Append>
                <Button variant="primary" type="submit">
                  Encurtar
                </Button>
              </InputGroup.Append>
            </InputGroup>
            {isLoading ? (
              <Spinner animation="border" />
            ) : (
              code && (
                <>
                  <InputGroup className="mb-3">
                    <FormControl
                      autoFocus={true}
                      defaultValue={`http://localhost:3000/${code}`}
                      onChange={(e) => this.setState({ url: e.target.value })}
                      ref={(input) => (this.inputURL = input)}
                    />
                    <InputGroup.Append>
                      <Button
                        variant="outline-secondary"
                        onClick={() => this.copyToClipboard()}
                      >
                        Copiar
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                  <p>
                    Para acompahar as estatisticas, acesse
                    http://localhost:3000/{code}
                  </p>
                </>
              )
            )}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          </Form>
        </ContentContainer>

        <Adsense />
      </Container>
    );
  }
}

export default HomePage;
