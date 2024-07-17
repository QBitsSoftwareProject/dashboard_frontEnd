import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import { storage } from "../../config/firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useParams } from "react-router-dom";

import uploadImg from "../../assets/images/dragAndDrop/uploadImg.png";
import Dash_btn1 from "../../components/ui/dash_btn/dash_btn1";

function UpdateQuestionForm() {
  const { id } = useParams();

  const [dataArray, setDataArray] = useState([]);
  const [data, setData] = useState([]);
  console.log(id);

  useEffect(() => {
    const fetchdatafromquestion = async () => {
      try {
        const questiondata = await axios.get(
          `http://localhost:3000/question/get-question-by-id/${id}`
        );
        console.log(questiondata.data);
        setDataArray(questiondata.data);

        const { question, options, imgurl } = questiondata.data.question;
        setQuestion(question);
        setOptions(options);
        setImageUrl(imgurl);
        setImageSrc(imgurl);
        srtImgurl(imgurl);
      } catch (err) {
        console.log(err);
      }
    };
    if (id) {
      fetchdatafromquestion();
    }

    console.log("this is data array", dataArray);
  }, [id]);

  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/");
  const [imageUrl, setImageUrl] = useState("");

  const [fileName, setFilename] = useState("");
  const [ImgUrl, setImageSrc] = useState("");
  const [imgurl, srtImgurl] = useState("");

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);

  const [OptionText, setOptionText] = useState("");
  const [OptionMark, setOptionMark] = useState("");

  const addOptionToTheList = () => {
    if (OptionText === "" || OptionMark === "") {
      return toast.error("All fields must be filled!");
    }

    if (isNaN(Number(OptionMark))) {
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
    setImageSrc("");
    setFilename("");
    setImageUpload("");
  };

  // handle the question form
  const QuestionFormHandler = async () => {
    if (options.length < 2) {
      return toast.error("Your Question must have at least 3 options!");
    }

    try {
      const questionResponse = await axios.post(
        `http://localhost:3000/question/update-question-by-id/${id}`,
        {
          question,
          imgurl: imgurl,
          options,
        }
      );

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

    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      // alert("Image upload");
      toast.success("Image is set");

      getDownloadURL(imageRef)
        .then((url) => {
          //getting the download url for the uploaded image
          console.log("Download URL:", url);
          //set download url for usestate for displayinf in frontend
          setImageUrl(url);
          srtImgurl(url);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    });
  };

  //to display choosed imaage
  const onChangeFile = (e) => {
    const file = e.target.files[0];
    setFilename(file);
    console.log(fileName);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageSrc(reader.result);
    };

    //for firebase
    setImageUpload(file);
  };

  useEffect(() => {
    console.log(fileName);
  }, [fileName]);

  const [optionindex, setOptionIndex] = useState("");
  const handleOptuionEditbtn = (oindex, otext, omark, oid) => {
    console.log(oindex);
    console.log(otext);
    console.log(omark);
    console.log(oid);

    setOptionText(otext);
    setOptionMark(omark);
    setOptionIndex(oid);
  };

  const updateOptionToTheList = (oid) => {
    if (OptionText === "" || OptionMark === "") {
      return toast.error("All fields must be filled!");
    }

    if (isNaN(Number(OptionMark))) {
      return toast.error("Mark must be a number!");
    }

    // Find the index of the option to be updated
    const index = options.findIndex((option) => option._id === oid);
    if (index === -1) {
      return toast.error("Option not found!");
    }

    // Create the updated option object
    const updatedOption = {
      _id: oid,
      OptionText,
      OptionMark: Number(OptionMark),
    };

    // Update the option in the options array
    const updatedOptions = [...options];
    updatedOptions[index] = updatedOption;
    setOptions(updatedOptions);

    // Clear input fields
    setOptionText("");
    setOptionMark("");
  };

  return (
    <div className="create-Question-request-container">
      <span className="text-heading-type-1">Prototype Question Form</span>
      <div className="create-Question-first-row">
        <div classname="first-column">
          <div className="first-row">
            <form className="Create-Question-form-area">
              <div className="Question-set">
                <div className="label-box">
                  <label className="Question-label">Enter Your Question</label>
                </div>
                <textarea
                  className="postContent"
                  rows={4}
                  cols={35}
                  placeholder="Enter Question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
                <br />
                <br />
              </div>
            </form>
          </div>

          <div className="second-row">
            <input type="file" onChange={onChangeFile}></input>
            <br />
            <br />
            <img src={ImgUrl} width={175} height={150} />
            <br />
            <button className="img-btn" onClick={uploadImage}>
              Set image
            </button>
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
              <label className="Question-label">Option mark</label>
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
            onClick={() => updateOptionToTheList(optionindex)}
          >
            Add Option
          </button>
        </div>

        <div className="entered-Option-list-displayer">
          {options.length >= 1 ? (
            options.map((Option, index) => {
              const { _id, OptionText, OptionMark } = Option;

              return (
                <div className="material-container" key={index}>
                  <div className="material-cont-details">
                    <span>Option: {OptionText}</span>
                    <span>Mark: {OptionMark}</span>
                  </div>

                  <div className="material-cont-buttons">
                    <button
                      className="bidding-option-modify-btn"
                      onClick={() =>
                        handleOptuionEditbtn(index, OptionText, OptionMark, _id)
                      }
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

      <button
        className="submit-Question-btn"
        onClick={() => QuestionFormHandler()}
      >
        Submit Question
      </button>
    </div>
  );
}

export default UpdateQuestionForm;
