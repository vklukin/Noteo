import React, { Component } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { DeleteNoteQuery } from "../core/api/DeleteNoteQuery";

import ThreeDots from "../assets/images/mainpage/icons/threeDots";

class ShowNotesOnBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showContext: false,
            modal: false
        };
        this.contextButtonRef = React.createRef();
        this.contextMenuRef = React.createRef();
        this.cardRef = React.createRef();
    }

    //context menu
    listener = (e) => {
        if (e.target !== this.contextButtonRef.current) {
            if (e.target !== this.contextMenuRef.current) {
                return this.setState({ showContext: false });
            }
        }
    };

    handleContextMenu = () => {
        this.setState({ showContext: true });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.state.showContext) {
            document?.removeEventListener("click", this.listener);
        }
    }

    //modal menu for remove note
    handleContextMenuButtonClick = (click) => {
        switch (click) {
            case "remove":
                this.setState({ modal: true });
                break;
            default:
                return toast.info(
                    "При выполнении действия, произошла неизвестная ошибка!"
                );
        }
    };

    //post query for remove note
    RemoveNote = () => {
        DeleteNoteQuery(this.props.id, this.cardRef.current).finally(() =>
            this.setState({ modal: false })
        );
    };

    render() {
        if (this.state.showContext === true) {
            document.addEventListener("click", this.listener);
        }

        return (
            <>
                <div
                    className="card"
                    data-id={this.props.id}
                    ref={this.cardRef}
                >
                    <Link
                        to={`/edit/${this.props.id}`}
                        className="editButton"
                    />
                    <h3>{this.props.title}</h3>
                    <p>{this.props.text}</p>

                    <div className="manual-items">
                        <button
                            className="card-button"
                            onClick={this.handleContextMenu}
                            ref={this.contextButtonRef}
                        >
                            <ThreeDots />
                        </button>
                    </div>
                    {this.state.showContext && (
                        <div className="context-div" ref={this.contextMenuRef}>
                            <button
                                className="context-button context-button-remove"
                                onClick={() =>
                                    this.handleContextMenuButtonClick("remove")
                                }
                            >
                                Удалить заметку
                            </button>
                        </div>
                    )}
                </div>
                {this.state.modal && (
                    <div className="remove-note-modal">
                        <div className="note-modal-wrapper">
                            <p>
                                Это действие является необратимым. Хотите ли вы
                                продолжить?
                            </p>
                            <div className="note-modal-wrapper-controllers">
                                <button
                                    className="btn-answer cancel"
                                    onClick={() => {
                                        this.setState({ modal: false });
                                    }}
                                >
                                    Отменить
                                </button>
                                <button
                                    className="btn-answer accept"
                                    onClick={() => this.RemoveNote()}
                                >
                                    Подтвердить
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }
}

export default ShowNotesOnBoard;
