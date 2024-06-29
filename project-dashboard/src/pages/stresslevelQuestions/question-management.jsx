import React, { useEffect, useState } from "react";
import axios from "axios";
import "./questionForm.css";
import { toast } from "react-hot-toast";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import {storage} from "../../config/firebase";
import {ref, uploadBytes, listAll, getDownloadURL} from "firebase/storage";
import {v4} from "uuid";

import uploadImg from "../../assets/images/dragAndDrop/uploadImg.png";
import Dash_btn1 from "../../components/ui/dash_btn/dash_btn1";



function CreateQuestionForm({onPageChange}) {

    const [isCancel, setIsCancel] = useState(false);

  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/")
  const [imageUrl, setImageUrl] = useState(''); 

  const [fileName, setFilename] = useState('');
  const [ImgUrl,setImageSrc] = useState(uploadImg);
  const [imgurl, srtImgurl] = useState('');

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  
  const [OptionText, setOptionText] = useState("");
  const [OptionMark, setOptionMark] = useState("");
  
  const addOptionToTheList = () => {
    if (OptionText === "" || OptionMark === "" ) {
      return toast.error("All fields must be filled!");
    }

    if (isNaN(Number(OptionMark) )) {
      return toast.error("Mark must be a number!");
    }

    const itemObject = {
      OptionText,
      OptionMark: Number(OptionMark),

    };

    setOptions([...options, itemObject]);
    setOptionText("");
    setOptionMark("");
  };
  const resetQuestionForm = () => {
    setQuestion("");
    setOptions([]);
    setImageSrc('');
    setFilename("");
    setImageUpload('');
    
  };

  // handle the question form
  const QuestionFormHandler = async () => {

    console.log('pressed')
    console.log(question);
    console.log(imgurl)
    console.log(options)
    if (options.length < 2) {
      return toast.error("Your Question must have at least 3 options!");
    }
  
    try {
      const questionResponse = await axios.post('http://localhost:3000/question/create-question', {
        question,
        imgurl,
        options
      });
  
      if (questionResponse.data) {
        toast.success("Your question has been created successfully!");
        resetQuestionForm();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  
    console.log({
      question,
      imgurl,
      options,
    });
  };
  

  const removeFromList = (name) => {
    const filteredItemList = options.filter((Option) => {
      return Option.OptionText !== name;
    });

    setOptions(filteredItemList);
  };



// firebase image upload
  const uploadImage = () => {
    if (imageUpload == null) return;
    
    const imageRef = ref(storage,`images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      // alert("Image upload");
      toast.success("Image is set");

      getDownloadURL(imageRef).then(url => {

        //getting the download url for the uploaded image
        console.log("Download URL:", url);
        
        //set download url for usestate for displayinf in frontend
        setImageUrl(url);
        srtImgurl(url);

      }).catch(error => {
        console.error("Error uploading image:", error);
      });

    });
  };

  //to display choosed imaage
  const onChangeFile = (e) => {
    const file = e.target.files[0];
    setFilename(file);
    console.log(fileName)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageSrc(reader.result);
    };

    //for firebase
    setImageUpload(file);
    
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFilename(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      setImageUpload(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    console.log(fileName);

  }, [fileName]);

  const handleList = () => {
    console.log('pressed')
    onPageChange("stress-level-questions-list");
  }

  return (
        <div className="create-Question-request-container">
            <div style={{
                width:"99%",
          display: "flex",
          justifyContent: "end",
        }}><Dash_btn1 btn_text="VIEW QUESTIONS" 
        callFunction={handleList} /></div>
          <div className="create-Question-first-row">
            <div classname ="first-column">
              <div className = "first-row">
                <form className="Create-Question-form-area">
                  <div className="Question-set">
                    <div className="label-box">
                      <label className="Question-label">
                        Enter Your Question
                      </label>
                    </div>
                    <textarea className="postContent" rows={4} cols={35} 
                      placeholder="Enter Question"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                    />
                    <br/><br/>
                  </div>
                </form>
              </div>
              <div className="second-row"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{
                  border: "2px dashed #cccccc",
                  borderRadius: "5px",
                  padding: "10px",
                  paddingBottom: "20px",                 
                  textAlign: "center",
                  width: "310px",
                  height: "200px",
                }}>
                <input 
                  type="file" 
                  onChange={onChangeFile}
                  style={{ display: "none" }}
                  id="fileInput"
                  accept="image/*"
                />
                <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
                  <div>
                    Drag and drop an image here
                  </div>
                </label>
                <div className="img-back">
                {ImgUrl && (
                  
                    <div>
                    <img src={ImgUrl} width={200} height={150} alt="Preview" /></div>
                  
                )}
                
                <div><button className="img-btn" onClick={uploadImage}>
                  Set image
                </button></div>
                </div>
              </div>
            </div>
            <div className="Option-input-container">
              <div className="Question-set">
                <div className="label-box">
                  <label className="Question-label">Option</label>
                </div>
                <input
                  type="text"
                  className="Question-input"
                  placeholder="Enter Option"
                  value={OptionText}
                  onChange={(e) => setOptionText(e.target.value)}
                />
              </div>
              <div className="Question-set">
                <div className="label-box">
                  <label className="Question-label">
                    Option mark
                  </label>
                </div>
                <input
                  type="text"
                  className="Question-input"
                  placeholder="Enter Option Mark"
                  value={OptionMark}
                  onChange={(e) => setOptionMark(e.target.value)}
                />
              </div>
              <button
                className="add-option-btn"
                onClick={() => addOptionToTheList()}
              >
                Add Option
              </button>
            </div>
            <div className="entered-Option-list-displayer">
              {options.length >= 1 ? (
                options.map((Option, index) => {
                  const { OptionText, OptionMark } = Option;
                  return (
                    <div className="material-container" key={index}>
                      <div className="material-cont-details">
                        <span>Option: {OptionText}</span>
                        <span>Mark: {OptionMark}</span>
                      </div>
                      <div className="material-cont-buttons">
                        <button
                          className="bidding-option-modify-btn"
                          onClick={() => removeFromList(OptionText)}
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          className="bidding-option-modify-btn"
                          onClick={() => removeFromList(OptionText)}
                        >
                          <RiDeleteBinLine />
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="empty-array-placeholder">
                  No Options in the list
                </div>
              )}
            </div>
          </div>
          <div className="sub-btn-div">
            <button
              className="submit-Question-btn"
              onClick={() => QuestionFormHandler()}
            >
              Submit Question
            </button>
          </div>
        </div>
  );
}

export default CreateQuestionForm;
