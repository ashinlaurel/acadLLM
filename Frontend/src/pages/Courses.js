import {
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
import InfoCard from "../components/Cards/InfoCard";
import PageTitle from "../components/Typography/PageTitle";
import RoundIcon from "../components/RoundIcon";
import SectionTitle from "../components/Typography/SectionTitle";
import axios from "axios";

function Courses() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setIsRefresh] = useState(false);
  const [values, setValues] = useState([]);
  const [formData, setFormData] = useState({
    courseId: "",
    courseName: "",
    description: "",
  });

  useEffect(() => {
    thegetter();
  }, [refresh]);

  async function thegetter() {
    let payload = {
      search: "TODO",
    };
    try {
      let response = await axios({
        url: `${API}/courses/getAll`,
        method: "POST",
        data: payload,
      });

      // Extract the 'data' array from the response and set it to values
      if (response.data.success) {
        setValues(response.data.data); // Set the array of courses to the state
        console.log("Fetched courses:", response.data.data);
      } else {
        console.error("Failed to fetch courses");
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }

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

  // Submit form
  const handleSubmit = async () => {
    try {
      const response = await axios({
        url: `${API}/courses/create`,
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

  const AddCourseModal = () => {
    return (
      <>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalHeader>Add Course</ModalHeader>
          <ModalBody>
            <div className="px-4 py-3 mb-8 bg-white dark:bg-gray-800">
              <Label className="mt-4">
                <span>Course ID</span>
                <Input
                  className="mt-1"
                  placeholder="Enter Course ID"
                  name="courseId"
                  value={formData.courseId}
                  onChange={handleChange}
                />
              </Label>

              <Label className="mt-4">
                <span>Lecture Title</span>
                <Input
                  className="mt-1"
                  placeholder="Enter Lecture Title"
                  name="courseName"
                  value={formData.courseName}
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
      {AddCourseModal()}
      <PageTitle>Courses</PageTitle>

      <SectionTitle>Semester 1</SectionTitle>

      <div className="my-4">
        <Button onClick={openModal} layout="outline" size="large">
          Add Course
        </Button>
      </div>

      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        {(values || []).map((course, index) => (
          <InfoCard key={index} title={course.courseId} value={course.courseName}>
            <RoundIcon
              icon={PeopleIcon}
              iconColorClass="text-orange-500 dark:text-orange-100"
              bgColorClass="bg-orange-100 dark:bg-orange-500"
              className="mr-4"
            />
          </InfoCard>
        ))}
      </div>
    </>
  );
}

export default Courses;
