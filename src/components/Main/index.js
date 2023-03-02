import React, { useState } from 'react';
import download from 'downloadjs';
import axios from 'axios';

import './Main.css';

export default function Main() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);

  function handleTemplate(event) {
    if (!event.target.files) return;
    setFile(event.target.files[0]);
  }

  function handleExcel(event) {
    if (!event.target.files) return;
    setData(event.target.files[0]);
  }

  async function handleGenerate() {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('data', data);
    await axios
      .post('https://simple-backend-ffmw.vercel.app/api/upload', formData)
      .then((res) => {
        console.log(res.statusText);
      });
  }

  function handleDownload() {
    fetch('https://simple-backend-ffmw.vercel.app/api/download').then(
      (response) => {
        response.blob().then((blob) => {
          // let url = window.URL.createObjectURL(blob);
          // let a = document.createElement('a');
          // a.href = url;
          // a.download = 'a.txt';
          // a.click();
          download(blob);
        });
      }
    );
  }

  return (
    <main>
      <div className='template'>
        <h1>Template</h1>
        <h3>STEP 1. Upload Template</h3>
        <figure>
          <img
            src='https://firebasestorage.googleapis.com/v0/b/file-uploader-firebase.appspot.com/o/templatePreview.png?alt=media&token=74fba46c-e377-49a5-86e4-2f4224500f2d'
            alt='Template Example'
          />
          <figcaption>Your Template</figcaption>
        </figure>
        <input type='file' name='file' onChange={handleTemplate} />
      </div>
      <div className='data'>
        <h1>Data</h1>
        <h3>STEP 2. Upload Excel Sheet</h3>
        <figure>
          <img
            src='https://firebasestorage.googleapis.com/v0/b/file-uploader-firebase.appspot.com/o/excelPreview.png?alt=media&token=e71b7bfd-229f-4e30-80b8-e69278cb94db'
            alt='template example'
          />
          <figcaption>Excel Example</figcaption>
        </figure>
        <input type='file' name='data' onChange={handleExcel} />
      </div>
      <div className='output'>
        <h1>Output</h1>

        <h3>STEP 3. Get Your PDF</h3>

        <figure>
          <img
            src='https://firebasestorage.googleapis.com/v0/b/file-uploader-firebase.appspot.com/o/resultPreview.png?alt=media&token=08a1245e-ad39-42e5-a792-08077fa8164b'
            alt='template example'
          />
          <figcaption>Output Preview</figcaption>
        </figure>
        <button type='button' onClick={handleGenerate}>
          Upload Files
        </button>

        <button type='button' onClick={handleDownload}>
          Download Result
        </button>
      </div>
    </main>
  );
}
