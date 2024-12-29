import React from "react";
import Image from "next/image";
import style from "../../src/styles/content.module.css";

const Content = ({ close, content }) => {
  return (
    <div className={style.modal}>
      <p className={style.close} onClick={close}>
        ×
      </p>
      <div className={style.header}>{content.name}</div>
      <div className={style.content}>
        <p>{content.description}</p>
        <p className={style.price}>Price: {content.price}</p>
        <Image
          className={style.contentImage}
          src={content.image}
          alt={content.name}
          width={500}
          height={300}
        />
      </div>
    </div>
  );
};

export default Content;
