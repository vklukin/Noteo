import { Component } from "react";
import ArrowLeft from "./../assets/images/mainpage/icons/arrowLeft";

class HistoryBackButton extends Component {
  render() {
    return (
      <a href="/" className="historyBackButton">
        <ArrowLeft />
        Назад
      </a>
    );
  }
}

export default HistoryBackButton;
