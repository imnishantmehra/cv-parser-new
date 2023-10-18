import React, { useState, useRef, useEffect } from "react";

// react-bootstrap components
import Dropzone from "react-dropzone";
import { useDropzone } from "react-dropzone";
import NavDropdown from "react-bootstrap/NavDropdown";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";

import { Button, Card, Container, Row, Col } from "react-bootstrap";
// File Pond
import { FilePond, registerPlugin } from "./react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { useLocation } from "react-router-dom";
import Loader from "./Loader";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType
);

function ProfileGenerator() {
  const [userData, setUserData] = useState({});
  const [logoFiles, setLogoFiles] = useState([]);
  // File Pond
  const cvRef = useRef(null);
  const logoRef = useRef(null);


  const [files, setFiles] = useState([]);
  const [files2, setFiles2] = useState([]);
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [phone, setPhone] = useState("");
  const [filesLogo, setFilesLogo] = useState('<i class="fa-regular fa-image"></i>');
  const storedCompany = localStorage.removeItem("company");
  const storedWebsite = localStorage.removeItem("website");
  const storedPhone = localStorage.removeItem("phone");

  const [loading, setLoading] = useState(false); // Add loading state

  const location = useLocation();
  const firstName = location.state?.firstName;

  //Use History
  let history = useHistory();

  useEffect(() => {
    console.log("FilePond instance has initialized", cvRef.current);
    console.log("FilePond instance has initialized", logoRef.current);
  }, []);

  // CV State Update
  const handleUpdateFiles = (fileItems) => {
    setFiles(fileItems.map((fileItem) => fileItem.file));
  };

  // Logo State Update
  const handleUpdateFiles2 = (fileItems) => {
    setFiles2(fileItems.map((fileItem) => fileItem.file));
  };
  //File Pond ENds

  const handleSubmit = async (e) => {
    e.preventDefault();

 // Check if any of the input fields are empty
 if (!company || !website || !phone) {
  toast.error("Please fill all three input fields", {
    position: toast.POSITION.TOP_CENTER,
    className: "toast-message",
  });
  return;
}


    setLoading(true); // Set loading state to true

    // Local storage for normal login
    let store = JSON.parse(localStorage.getItem("login"));
    // console.log("store is", store);
    let authToken = store.token;

    const formData = new FormData();
    formData.append("resume", files[0]);
    formData.append("resume_logo", files2[0]);
    formData.append("company_name", company);
    formData.append("phone_no", phone);
    formData.append("officialy_company_website", website);

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}upload/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        console.log("result is", response);

        const result = await response.json();
        if (result.success) {
          toast.success("File uploaded successfully", {
            position: toast.POSITION.TOP_CENTER,
            className: "toast-message",
          });
          history.push("/admin/savedresume");
        }
      } else {
        toast.warning("First You Need To Upgrade Your Plan", {
          position: toast.POSITION.TOP_CENTER,
          className: "toast-message",
        });
        throw new Error("Request failed with status: " + response.status);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);

    setCompany("");
    setWebsite("");
    setPhone("");
    setFiles([]);
    setFiles2([]);
  };

  useEffect(() => {
    getDataFromAPI();
  }, []);

  //Get Logo APIs
  async function getDataFromAPI() {
    // Local storage for normal login
    let store = JSON.parse(localStorage.getItem("login"));
    // console.log("store is", store);
    let authToken = store.token;

    fetch(`${process.env.REACT_APP_BASE_URL}getlogo`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data are", data);
        setCompany(data.company_name);
        setWebsite(data.officialy_company_website);
        setPhone(data.phone_no);
        setFilesLogo('<img src="'+data.resume_logo_url+'"/>');
      
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
    
      <Container fluid>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Row style={{ background: "#1b1b1b", height: "" }}>
            {/* cv  Starts*/}
            <Col style={{ backgroundColor: "black", height: "" }}>
              <FilePond
                ref={cvRef}
                files={files}
                allowMultiple={true}
                imagePreviewMaxHeight={200}
                server={{
                  process: (fieldName, file, metadata, load) => {
                    setTimeout(() => {
                      load(Date.now());
                    }, 1500);
                  },
                  load: (source, load) => {
                    fetch(source)
                      .then((res) => res.blob())
                      .then(load);
                  },
                }}
                onupdatefiles={handleUpdateFiles}
                labelIdle={
                  '<div><span className="filepond--label-action">Drop Down Your CV </span><br/><span className="custom-icon"><i class="fa-sharp fa-regular fa-file-pdf"></i></span></div>'
                }
                
              />
            </Col>
          </Row>

          {/*Row 2 Company Name and Website Address*/}

          <Row
            className="d-flex align-items-center"
            style={{
              background: "",
              padding: "30px 0",
              height: "",
              margin: "60px 0px",
              borderRadius: "6px",
            }}
          >
            {/* Company Name Starts*/}

            <Col
              className=""
              style={{ backgroundColor: "", paddingLeft: "10px" }}
            >
              <div className="input-field">
                <input
                  type="text"
                  required
                  spellCheck="false"
                  name="company_name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  id="company_name_id"
                />
                <label>Company Name</label>
              </div>
            </Col>

            {/* Website Name Starts*/}

            <Col style={{ backgroundColor: "", paddingRight: "10px" }}>
              <div className="input-field">
                <input
                  type="text"
                  required
                  spellCheck="false"
                  name="officialy_company_website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  id="web_name_id"
                />
                <label>Website Address</label>
              </div>
            </Col>

            {/* Phone Number Starts*/}

            <Col
              className=""
              style={{ backgroundColor: "", paddingLeft: "10px" }}
            >
              <div className="input-field">
                <input
                  type="text"
                  required
                  spellCheck="false"
                  name="phone_no"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  id="phone_name_id"
                />
                <label>Phone Number</label>
              </div>
            </Col>

            {loading && <Loader />}

            {/* Template Logo Starts*/}

            <Col
            md={12}
            style={{
              backgroundColor: "",
              height: "",

              marginTop: "20px",
              padding: "0 10px",
              cursor: "pointer",
              borderRadius: "6px",
            }}
          >
            <FilePond
              ref={logoRef}
              files={logoFiles}
              allowMultiple={true}
              imagePreviewMaxHeight={10}
              server={{
                process: (fieldName, file, metadata, load) => {
                  setTimeout(() => {
                    load(Date.now());
                  }, 1500);
                },
                load: (source, load) => {
                  fetch(source)
                    .then((res) => res.blob())
                    .then(load);
                },
              }}
              onupdatefiles={handleUpdateFiles2}
              id="template_logo"

              acceptedFileTypes={"image/png"}
              acceptedFileExtensions={[".jpg", ".jpeg", ".png", ".gif"]}
              labelIdle={
                '<div><span class="filepond--label-action">Upload Your Template Logo</span><br/><span class="custom-icon manual_upload">'+filesLogo+'</span></div>'
              }
            />
          </Col>
          </Row>
          <div className=" text-center" style={{padding:'0 10px'}}>
            <button className="home_navigation_getDemo2" type="submit">
              Generate My Profile
            </button>
          </div>
        </form>
      </Container>
    </>
  );
}

export default ProfileGenerator;
