import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@windmill/react-ui";
import {  PeopleIcon } from "../icons";
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';

import { API } from "../backendapi";
import InfoCard from "../components/Cards/InfoCard";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import PageTitle from "../components/Typography/PageTitle";
import RoundIcon from "../components/RoundIcon";
import SectionTitle from "../components/Typography/SectionTitle";
import axios from "axios";

function Lectures() {

  const [refresh, setIsRefresh] = useState(false);
  const [values, setValues] = useState([]);
  const location = useLocation();
  const { lectureid } = useParams();
  const lecture = location.state?.lecture;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [pdfs, setPdfs] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'application/pdf',
    onDrop: (acceptedFiles) => {
      setUploadedFiles(acceptedFiles);
    },
  });

  useEffect(() => {
    fetchPDFs();
  }, [refresh, lectureid]);

  const fetchPDFs = async () => {
    try {
      const response = await axios.get(`${API}/lectures/getPDFs/${lectureid}`);
      if (response.data.success) {
        setPdfs(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch PDFs:', error);
    }
  };

  if (!lecture) {
    return <p>Loading lecture data...</p>;
  }

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  const handleUpload = async () => {
    if (uploadedFiles.length === 0) {
      console.log('No files to upload');
      return;
    }

    const formData = new FormData();
    uploadedFiles.forEach((file) => {
      formData.append('files', file);  // Change 'pdfs' to 'files'
    });
    formData.append('lectureId', lectureid);

    try {
      const response = await axios.post(`${API}/lectures/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload successful:', response.data);
      setUploadedFiles([]);
      closeModal();
      setIsRefresh(!refresh);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <>
      <PageTitle>{lecture.title}</PageTitle>
      <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">{lecture.description}</p>
      <div className="mb-8">
        <Button onClick={openModal}>Add PDF's</Button>
      </div>

      {/* Display PDFs */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
        {pdfs.map((pdf) => (
          <div
            key={pdf._id}
            className="p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
          >
            <div className="flex flex-col">
              <div className="mb-4">
                <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Uploaded on: {new Date(pdf.createdAt).toLocaleDateString()}
                </p>
                <a
                  href={`${API}${pdf.pdfUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View PDF
                </a>
              </div>
              {/* PDF Preview */}
              <div className="w-full h-[400px] border border-gray-300 rounded">
                <object
                  data={`${API}${pdf.pdfUrl}`}
                  type="application/pdf"
                  className="w-full h-full"
                >
                  <p>Unable to display PDF preview. Please click "View PDF" to open.</p>
                </object>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Upload PDFs</ModalHeader>
        <ModalBody>
          <div {...getRootProps()} className="border-2 border-dashed border-gray-300 p-6 text-center">
            <input {...getInputProps()} />
            <p>Drag 'n' drop some PDF files here, or click to select files</p>
          </div>
          {uploadedFiles.length > 0 && (
            <div className="mt-4">
              <h4>Uploaded files:</h4>
              <ul>
                {uploadedFiles.map((file) => (
                  <li key={file.name}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button className="w-full sm:w-auto" layout="outline" onClick={closeModal}>
            Cancel
          </Button>
          <Button className="w-full sm:w-auto" onClick={handleUpload}>
            Upload
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Lectures;
