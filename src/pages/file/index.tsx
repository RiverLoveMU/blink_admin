import * as React from "react";
import "./index.less";

const TestPage = () => {
  const [images, setImages] = React.useState<string[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    const reader = new FileReader();
    const blobUrls = Array.prototype.map.call(e.target.files, (file: File) => {
      reader.readAsDataURL(file);

      return window.URL.createObjectURL(file.slice(0, file.size / 2));
    }) as string[];

    reader.onload = function (evt) {
      console.log(evt?.target?.result);
    };
    console.log(blobUrls);

    setImages(blobUrls);
  };

  return (
    <div>
      <input type="file" multiple onChange={onChange} accept="image/*" />
      {images.map((i) => {
        return (
          <img
            src={i}
            key={i}
            style={{ display: "block", marginBottom: 6, width: "33.3%" }}
          />
        );
      })}
    </div>
  );
};

export default TestPage;
