import {
  Avatar,
  Badge,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableRow,
} from '@windmill/react-ui'
import { CartIcon, ChatIcon, MoneyIcon, PeopleIcon } from '../icons'
import { Doughnut, Line } from 'react-chartjs-2'
import React, { useEffect, useState } from 'react'
import {
  doughnutLegends,
  doughnutOptions,
  lineLegends,
  lineOptions,
} from '../utils/demo/chartsData'

import CTA from '../components/CTA'
import ChartCard from '../components/Chart/ChartCard'
import ChartLegend from '../components/Chart/ChartLegend'
import InfoCard from '../components/Cards/InfoCard'
import PageTitle from '../components/Typography/PageTitle'
import RoundIcon from '../components/RoundIcon'
import response from '../utils/demo/tableData'
import axios from 'axios'

function Users() {
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/getAll')
      console.log(response.data)
      setData(response.data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }
  // pagination setup
  const resultsPerPage = 10
  const totalResults = response.length

  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    fetchUsers()
  }, [page])

  return (
    <>
      <PageTitle>Dashboard</PageTitle>

      <CTA />

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total clients" value="6389">
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

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Client</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Created At Date</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar className="hidden mr-3 md:block" src={user.profilePicture} alt="User image" />
                    <div>
                      <p className="font-semibold">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.phone}</span>
                </TableCell>
                <TableCell>
                  <Badge type={user.role}>{user.role}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{new Date(user.createdAt).toLocaleDateString()}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer>

      <PageTitle>Charts</PageTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="Revenue">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        <ChartCard title="Traffic">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>
      </div>
    </>
  )
}

export default Users
