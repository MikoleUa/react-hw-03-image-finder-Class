import { Component } from "react";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import s from "./ImageGallery.module.css";

export default class ImageGallery extends Component {
  constructor() {
    super();
    this.state = {
      activeModalImg: {
        largeImg: "",
        altImg: "",
      },
      showModal: false,
      error: null,
      page: 1,
      galaryItems: null,
      totalHits: null,
      status: "idle",
    };
  }

  static = {
    API_KEY: "33933659-7e72dabc750f764111807e746",
  };

  componentDidUpdate(prevProps, prewState) {
    if (this.props.searchWord !== prevProps.searchWord) {
      this.setState({ page: 1, galaryItems: null });
    }
    if (
      this.props.searchWord === prevProps.searchWord &&
      this.state.page === prewState.page
    ) {
      return;
    }
    this.setState({ status: "pending" });

    fetch(
      `https://pixabay.com/api/?key=${this.static.API_KEY}&q=${this.props.searchWord}&image_type=photo&orientation=horizontal&page=${this.state.page}&per_page=12`
    )
      .then((res) => res.json())
      .then((res) => {
        if (!this.state.galaryItems) {
          this.setState({
            galaryItems: [...res.hits],
            status: "resolved",
            totalHits: res.totalHits,
          });
          res.totalHits === 0
            ? toast.error("По вашому запиту нічого не знайдено", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              })
            : toast(`Ми знайшли ${res.totalHits} картинок по вашому запиту`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
        } else {
          this.setState((prevState) => ({
            galaryItems: [...prevState.galaryItems, ...res.hits],
            status: "resolved",
          }));
        }
      })
      .catch((rej) => this.setState({ error: rej }));
  }

  handleBtnIncrement = () => {
    this.setState((prevstate) => ({ page: prevstate.page + 1 }));
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  getModalImgAlt = (img, alt) => {
    this.setState({ activeModalImg: { largeImg: img, altImg: alt } });
  };

  render() {
    const { galaryItems, status, showModal, activeModalImg, totalHits } =
      this.state;

    if (status === "pending") {
      return galaryItems ? (
        <>
          <ul className={s.ImageGallery}>
            {galaryItems.map((item) => (
              <ImageGalleryItem key={item.id} data={item} />
            ))}
          </ul>
          <ThreeDots wrapperClass={s.loader} />
        </>
      ) : (
        <ThreeDots wrapperClass={s.loader} />
      );
    }
    if (status === "resolved") {
      return (
        <>
          <ul className={s.ImageGallery}>
            {galaryItems.map((item) => (
              <ImageGalleryItem
                key={item.id}
                data={item}
                onOpenModal={this.toggleModal}
                getModalInfo={this.getModalImgAlt}
              />
            ))}
          </ul>
          {totalHits - galaryItems.length > 1 && (
            <Button increment={this.handleBtnIncrement} />
          )}
          {showModal && (
            <Modal closeModal={this.toggleModal}>
              <img src={activeModalImg.largeImg} alt={activeModalImg.altImg} />
            </Modal>
          )}
        </>
      );
    }
  }
}
