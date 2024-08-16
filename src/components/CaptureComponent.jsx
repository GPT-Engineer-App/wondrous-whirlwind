import React, { useRef, useEffect, useState } from 'react';
import { toPng } from 'html-to-image';
import { Button } from "@/components/ui/button";

const CaptureComponent = () => {
  const ref = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);

  const captureImage = () => {
    if (ref.current) {
      toPng(ref.current)
        .then((dataUrl) => {
          setImageUrl(dataUrl);
        })
        .catch((error) => {
          console.error('Error capturing image:', error);
        });
    }
  };

  return (
    <div>
      <div ref={ref} className="p-4 bg-white rounded shadow">
        <h2 className="text-xl font-bold">Capture This Content</h2>
        <p>This is the content that will be captured as an image.</p>
      </div>
      <Button onClick={captureImage} className="mt-4">Capture Image</Button>
      {imageUrl && <img src={imageUrl} alt="Captured content" className="mt-4" />}
    </div>
  );
};

export default CaptureComponent;