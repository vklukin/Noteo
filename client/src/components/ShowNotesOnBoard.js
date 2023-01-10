import React, {Component} from "react";
import ThreeDots from "../assets/images/mainpage/icons/threeDots";

class ShowNotesOnBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
        this.myRef = React.createRef();
    }

    listener = (e) => {
        if (e.target !== this.myRef.current) {
            this.myRef.current.disabled = false;
            this.myRef.current.value = null;
            return this.setState({show: false})
        }
    }

    handleContextMenu = () => {
        this.myRef.current.disabled = true
        this.setState({show: true})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.state.show) {
            document?.removeEventListener('click', this.listener)
        }
    }

    render() {
        if (this.myRef.current !== null) {
            document.addEventListener('click', this.listener)
        }

        return (
            <div className="card" data-id={this.props.id}>
                <h3>{this.props.title}</h3>
                <p>{this.props.text}</p>

                <div className="manual-items">
                    <button className="card-button" onClick={this.handleContextMenu} ref={this.myRef}>
                        <ThreeDots/>
                    </button>
                </div>
                {this.state.show && <div className="context-div">Menu</div>}
            </div>
        );
    }
}

export default ShowNotesOnBoard