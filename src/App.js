import "./App.css";
import Aos from "aos";
import "aos/dist/aos.css";
import Hero from "../src/components/hero/Hero";
import Header from "./components/header/Header";
import NavMobile from "./components/nav/NavMobile";
import Stats from "./components/stats/Stats";
import Why from "./components/stats/Why";
import Trade from "./components/sections/Trade";

import { useEffect, useState } from "react";
import Calculate from "./components/sections/Calculate";
import Features from "./components/sections/Features";
import NewsLetter from "./components/sections/NewsLetter";
import Footer from "./components/sections/Footer";

import React from "react"; // Import React and useState
import { Web3Storage } from "web3.storage";
function App() {
  //state management
  const [navMobile, setNavMobile] = useState(false);
  //aos init
  useEffect(() => {
    Aos.init({
      duration: 2500,
      delay: 400,
    });
  });

  const [allFiles, setAllFiles] = useState([]);
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const getAccessToken = () => {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDhhOTM2OWQxMzU5ODA5QzM1ZDhiODRjMGVjNDA5NzRGN0QyODhmYTUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTE1MTgwMjA2NjUsIm5hbWUiOiJpcGZzX2ZpbGUifQ.Xoq3NEHglUKD1qFBo5-URotk8WB3Dbcnnn5MTSiLaww"; // Replace with your actual access token
  };

  const makeStorageClient = () => {
    return new Web3Storage({ token: getAccessToken() });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setAllFiles([...allFiles, file]);
      setUploadMessage("");
    } else {
      setUploadMessage("No file selected");
    }
  };

  const handleUpload = async () => {
    if (allFiles.length > 0) {
      // Check if any files are selected
      const client = makeStorageClient();
      const uploadResults = [];

      for (const file of allFiles) {
        const name = file.name; // Get the original file name
        const cid = await client.put([file], { name }); // Upload the file with its original name
        uploadResults.push({ name, cid });
      }

      console.log("Uploaded files:", uploadResults);
      setAllFiles([]); // Clear the uploaded files array
    } else {
      setUploadMessage("No files selected for upload");
    }
  };

  const listUploads = async () => {
    const client = makeStorageClient();
    const uploads = [];
    for await (const upload of client.list()) {
      uploads.push({
        name: upload.name,
        cid: upload.cid,
        size: upload.dagSize,
      });
    }
    setUploadedFiles(uploads);
  };

  return (
    <div className="overflow-hidden">
      {/* <Header setNavMobile={setNavMobile} /> */}

      <Hero />
      
      {/* Mobile Nav */}
      {/* <div className={`${navMobile ? 'right-0' : '-right-full'} fixed z-10 top-0 h-full transition-all duration-200`}>
        <NavMobile setNavMobile={setNavMobile} />
      </div> */}
      {/* <Stats />
      <Why />
      <Calculate /> */}
      {/* <Trade /> */}
      {/* <Features /> */}
      {/* <NewsLetter />
      <Footer /> */}
    </div>
  );
}

export default App;
