import { Card, CardBody } from "@windmill/react-ui";
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

function CourseDetails() {
  const { courseid } = useParams();
  const [values, setValues] = useState(null);

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

  useEffect(() => {
    getCourseInfo();
  }, []);

  if (!values) {
    return <p>Loading course details...</p>;
  }

  return (
    <>

<SectionTitle>{values.courseId}</SectionTitle>

      <SectionTitle>{values.courseName}</SectionTitle>
      <Card className="mb-8 shadow-md">
        <CardBody>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {values.description}
          </p>
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

      <SectionTitle>Lectures</SectionTitle>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <Card>
          <CardBody>
            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">
              Lecture 1 : Introduction
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga,
              cum commodi a omnis numquam quod? Totam exercitationem quos hic
              ipsam at qui cum numquam, sed amet ratione! Ratione, nihil
              dolorum.
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">
              Lecture 2 : Open Ai
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga,
              cum commodi a omnis numquam quod? Totam exercitationem quos hic
              ipsam at qui cum numquam, sed amet ratione! Ratione, nihil
              dolorum.
            </p>
          </CardBody>
        </Card>

      </div>

      {/* You can add more details here based on the course data */}
    </>
  );
}

export default CourseDetails;
