import React from "react";
import { parseISO, formatRelative } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import ShortenerService from "../../services/shortenerService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Container } from "react-bootstrap";
import Header from "../../components/Header";
import Adsense from "../../components/Adsense";
import { StatsBox, StatsBoxTitle, StatsRow, StatsContainer } from "./styles";

class StatsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      shortenedURL: {},
      errorMessage: "",
    };
  }

  async componentDidMount() {
    const { code } = this.props.match.params;
    console.log(code);

    try {
      const service = new ShortenerService();
      const shortenedURL = await service.getStats(code);

      const parseDate = parseISO(shortenedURL.updatedAt);
      const currentDate = new Date();

      const relativeDate = formatRelative(parseDate, currentDate, {
        locale: ptBR,
      });

      shortenedURL.relativeDate = relativeDate;

      this.setState({ isLoading: false, shortenedURL });
    } catch (error) {
      this.setState({
        isLoading: false,
        errorMessage: "Ops, a url solicitada não existe",
      });
    }
  }

  render() {
    const { errorMessage, shortenedURL } = this.state;
    return (
      <Container>
        <Header>Estatísticas</Header>
        {errorMessage ? (
          <StatsContainer className="text-center">
            <FontAwesomeIcon
              size="3x"
              color="#f8d7da"
              icon="exclamation-triangle"
            />
            <p className="m-3">{errorMessage}</p>
            <a className="btn btn-primary" href="/">
              Encurtar nova Url
            </a>
          </StatsContainer>
        ) : (
          <StatsContainer className="text-center">
            <p>
              <b>http:localhost:3000/{shortenedURL.code}</b>
            </p>
            <p>
              Redireciona para:
              <br />
            </p>
            {shortenedURL.url}
            <StatsRow>
              <StatsBox>
                <b>{shortenedURL.hits}</b>
                <StatsBoxTitle>Visitas</StatsBoxTitle>
              </StatsBox>
              <StatsBox>
                <b>{shortenedURL.relativeDate}</b>
                <StatsBoxTitle>Última visitas</StatsBoxTitle>
              </StatsBox>
            </StatsRow>
            <a className="btn btn-primary" href="/">
              Encurtar URL
            </a>
          </StatsContainer>
        )}
        <Adsense />
      </Container>
    );
  }
}

export default StatsPage;
