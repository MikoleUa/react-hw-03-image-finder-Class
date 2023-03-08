import s from "./ImageGalleryItem.module.css";
export default function ImageGalleryItem({ data, onOpenModal, getModalInfo }) {
  return (
    <>
      <li className={s.ImageGalleryItem}>
        <img
          onClick={() => {
            getModalInfo(data.largeImageURL, data.tags);
            onOpenModal();
          }}
          className={s.ImageGalleryItemImage}
          src={data.webformatURL}
          alt={data.tags}
        />
      </li>
    </>
  );
}
