import {
  Card,
  CardBody,
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@windmill/react-ui";
import { CartIcon, ChatIcon, MoneyIcon, PeopleIcon } from "../icons";
import React, { useEffect, useState } from "react";

import { API } from "../backendapi";
import CTA from "../components/CTA";
import InfoCard from "../components/Cards/InfoCard";
import PageTitle from "../components/Typography/PageTitle";
import RoundIcon from "../components/RoundIcon";
import SectionTitle from "../components/Typography/SectionTitle";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function CourseDetails() {
  console.log("Rendering CourseDetails");
  const { courseid } = useParams();
  const [values, setValues] = useState(null);
  const [refresh, setIsRefresh] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    courseId: courseid,
    description: "",
  });
  const [lectures, setLectures] = useState([]);

  // useEffect(() => {}, [refresh]);

  useEffect(() => {
    // getCourseInfo();
    getLecturesForCourse();
  }, [refresh]);

  const getCourseInfo = async () => {
    let data = { id: courseid };
    // console.log(API);
    try {
      let res = await axios({
        url: `${API}/courses/getCourseById`,
        method: "POST",
        data: data,
      });
      setValues(res.data.data);
      console.log("Done", res.data);
    } catch (error) {
      throw error;
    }
  };

  const getLecturesForCourse = async () => {
    let data = { courseId: courseid };
    try {
      let res = await axios({
        url: `${API}/lectures/getLectures`,
        method: "POST",
        data: data,
      });
      setValues(res.data.data);
      console.log(res.data.data.lectures);
      setLectures(res.data.data.lectures);
    } catch (error) {
      throw error;
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios({
        url: `${API}/lectures/create`,
        method: "POST",
        data: formData,
      });
      if (response.data.success) {
        alert("Lecture created successfully!");
        closeModal();
        setIsRefresh(!refresh); // Trigger refresh to re-fetch courses
      }
    } catch (error) {
      console.error("Error creating lecture:", error);
      alert("Failed to create lecture.");
    }
  };

  if (!values) {
    return <p>Loading course details...</p>;
  }

  const AddLectureModal = () => {
    return (
      <>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalHeader>Add Lecture</ModalHeader>
          <ModalBody>
            <div className="px-4 py-3 mb-8 bg-white dark:bg-gray-800">
              <Label className="mt-4">
                <span>Lecture ID</span>
                <Input
                  className="mt-1"
                  placeholder="Enter Lecture ID"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                />
              </Label>

              <Label className="mt-4">
                <span>Title</span>
                <Input
                  className="mt-1"
                  placeholder="Enter Lecture Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </Label>

              <Label className="mt-4">
                <span>Description</span>
                <Input
                  className="mt-1"
                  placeholder="Enter Lecture Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Label>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="hidden sm:block">
              <Button layout="outline" onClick={closeModal}>
                Cancel
              </Button>
            </div>
            <div className="hidden sm:block">
              <Button onClick={handleSubmit}>Create Lecture</Button>
            </div>
            <div className="block w-full sm:hidden">
              <Button block size="large" layout="outline" onClick={closeModal}>
                Cancel
              </Button>
            </div>
            <div className="block w-full sm:hidden">
              <Button block size="large" onClick={handleSubmit}>
                Create Lecture
              </Button>
            </div>
          </ModalFooter>
        </Modal>
      </>
    );
  };

  return (
    <>
      {AddLectureModal()}
      <SectionTitle>{values.courseId}</SectionTitle>
      <SectionTitle>{values.courseName}</SectionTitle>
      <Card className="mb-8 shadow-md">
        <CardBody>
          <p className="text-sm text-gray-600 dark:text-gray-400">{values.description}</p>
        </CardBody>
      </Card>

      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total Students" value="100">
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total Lectures" value="1">
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Quiz" value="5">
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Example" value="35">
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>

      <div className="my-4">
        <Button onClick={openModal} layout="outline" size="large">
          Add Lectures
        </Button>
      </div>

      <SectionTitle>Lectures</SectionTitle>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        {lectures.map((lecture, index) => (
          <Card key={index}>
            <CardBody>
              <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">{lecture.title}</p>
              <p className="text-gray-600 dark:text-gray-400">{lecture.description}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* You can add more details here based on the course data */}
    </>
  );
}

export default CourseDetails;
