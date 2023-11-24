import React, { useState, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import html2canvas from 'html2canvas';
import {img} from '../assets/index'
function DisplayImage() {
  const [textInputs, setTextInputs] = useState(Array(10).fill(""));
  const [generatedImages, setGeneratedImages] = useState(Array(10).fill(null));
  const [loading, setLoading] = useState(false);
  const [downloading,setDownloading]= useState(false);
  const [sharing, setSharing] = useState(false);
  const cardRef = useRef(null);
  const handleGenerateImages = async () => {
    try {
      setLoading(true);

      const generatedImagesPromises = textInputs.map(async (textInput, index) => {
        const response = await fetch(
          "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
          {
            headers: {
              Accept: "image/png",
              Authorization:
                "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ inputs: textInput }),
          }
        );
        if (!response.ok) {
          // Handle non-OK responses, e.g., log an error or throw an exception
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        // const imageUrl = response.url;
        console.log(response);

        return imageUrl;
      });

      const generatedImagesArray = await Promise.all(generatedImagesPromises);
      console.log("Generated Images:", generatedImagesArray);
      setGeneratedImages(generatedImagesArray);
    } catch (error) {
      console.error("Error generating images:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleDownloadImages= async () => {
    try {
      setDownloading(true);
      const canvas = await html2canvas(cardRef.current);
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'canvas_image.png';
      a.click();
    } catch (error) {
      console.error('Error generating and downloading image:', error);
    }finally{
      setDownloading(false);
    }
  }

  const handleShareImages = async() =>{
    try{
      setSharing(true);
      const canvas = await html2canvas(cardRef.current);
      const dataUrl = canvas.toDataURL('image/png');
      const blobData = await (await fetch(dataUrl)).blob();
      const formData = new FormData();
      formData.append('file', blobData);
      formData.append('upload_preset', 'comic_image');

      const response = await fetch(`https://api.cloudinary.com/v1_1/dawmwmseg/image/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        const cloudinaryUrl = result.secure_url;
        console.log('Cloudinary URL:', cloudinaryUrl);
        await navigator.clipboard.writeText(cloudinaryUrl);
        console.log('URL copied to clipboard');
        alert('URL copied to clipboard!');
      } else {
        console.error('Cloudinary failed to upload image:', response.statusText);
      }
    }catch(error){
      console.error("Error while sharing!",error);
    }finally{
      setSharing(false);
    }
  }


  return (
    
    <section className="mt-5 max-w-7xl mx-auto">
      
      <div className="mb-5">
        <h1 className='font-extrabold text-[#222328] text-[32px]'>Create Your Comic! </h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px] ">Welcome to Comic Strip Generator. Create your own visually stunning comic book design using Generative AI. Enter your prompts below. </p>
      </div>
      <div style={{ borderRadius: '10px', marginTop: '30px', marginBottom: '40px' }}>
      <img src={img} style={{ borderRadius: '10px', width: '100%', height: 'auto' }}></img>
    </div>
    <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
      <div className="space-y-3">
        {textInputs.map((textInput, index) => (
          <div key={index} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <label htmlFor={`textInput${index}`}>{`Enter Prompt ${index + 1} :  `}</label>
            <input
              type="text"
              id={`textInput${index}`}
              value={textInput}
              required
              onChange={(e) => {
                const newInputs = [...textInputs];
                newInputs[index] = e.target.value;
                setTextInputs(newInputs);
              }
            }
            />
          </div>
        ))}
      </div>
      
      <div className="mt-5 flex gap-5">
        <button className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center" onClick={handleGenerateImages} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Images'}
        </button>
      </div>
      {loading ? (
  <Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner>
) : null}
      {generatedImages.some((image) => image !== null) && (
        <div className="mt-5 text-[#666e75] text-[14px] max-w-[500px]">
          <h2>Generated Images:</h2>
          <div className="image-row" ref={cardRef}>
            {generatedImages.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image} alt={`Generated ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    
    <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]"> Once you have created the comic strip you want, you can share it with others in the community. Click the button below to download and share your comic panel. </p>
          
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            onClick={handleDownloadImages} disabled={downloading}
          >
            {downloading? 'Downloading': 'Download'}
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            onClick={handleShareImages} disabled={sharing}
          >
            {sharing? 'Sharing': 'Share with the community!'}
          </button>
          
        </div>
    </section>
    
    
    
  );
}

export default DisplayImage;
