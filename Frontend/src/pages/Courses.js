import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from '@windmill/react-ui'
import { CartIcon, ChatIcon, MoneyIcon, PeopleIcon } from '../icons'
import React, { useState } from 'react'

import InfoCard from '../components/Cards/InfoCard'
import PageTitle from '../components/Typography/PageTitle'
import RoundIcon from '../components/RoundIcon'
import SectionTitle from '../components/Typography/SectionTitle'

function Courses() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }
  return (
    <>
      <PageTitle>Courses</PageTitle>

      <SectionTitle>Semester 1</SectionTitle>

      <div className="my-4">
          <Button onClick={openModal} layout="outline" size="large">
            Add Course
          </Button>
        </div>

      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="CS-101" value="Computer Science">
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Account balance" value="$ 46,760.89">
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="New sales" value="376">
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Pending contacts" value="35">
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Add Course</ModalHeader>
        <ModalBody>

         <div className="px-4 py-3 mb-8 bg-white  dark:bg-gray-800">
        <Label>
          <span>Course ID</span>
          <Input className="mt-1" placeholder="Jane Doe" />
        </Label>

        <Label className="mt-4">
          <span>Course Name</span>
          <Input className="mt-1" placeholder="Jane Doe" />
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
            <Button>Accept</Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large">
              Accept
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default Courses
