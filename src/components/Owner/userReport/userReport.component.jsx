import { useAuth0 } from '@auth0/auth0-react';
import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { RoleContext } from '../../../context/role.context';
import {
  getActivistUsers,
  getBusinessUsers,
  getNonprofitUsers,
  getUserStatistics,
} from '../../../services/Owner.services';
import { UpdateUserRole } from '../../../services/Users.services';
import { ReportRowOfTable } from '../reportRowOfTable/rowOfTable.component';
import './userReport.css';

export const UserReport = () => {
  const { user } = useAuth0();
  const { role } = useContext(RoleContext);
  const [userType, setUserType] = useState('1');
  const [businessUser, setBusinessUser] = useState([]);
  const [activistUser, setActivistUser] = useState([]);
  const [nonprofitUser, setNonprofitUser] = useState([]);
  const [users, setUsers] = useState({});

  // Update user role as the owner
  const UpdateRole = async () => {
    let userRole = role[0].name;
    let email = user.email;
    await UpdateUserRole(userRole, email);
  };

  // Get Users Statistics
  const userStatistics = async () => {
    let statistics = await getUserStatistics();
    setUsers(statistics);
  };

  const reportInformation = async () => {
    let Nonprofit = await getNonprofitUsers();
    setNonprofitUser(Nonprofit);
    let Business = await getBusinessUsers();
    setBusinessUser(Business);
    let Activist = await getActivistUsers();
    setActivistUser(Activist);
  };

  useEffect(() => {
    UpdateRole();
    userStatistics();
    reportInformation();
  }, []);

  if (userType === '1') {
    if (nonprofitUser === undefined) {
      return <p>Loading...</p>;
    } else {
      return (
        <div className='report'>
          <header className='report-header'>
            <h3>User Report</h3>
          </header>
          <aside>
            <div className='Application-Statistics'>
              <div className='Application-Statistics-box'>
                <div>
                  <p className='Statistics-Num'>{users.totalUsers}</p>
                  <p className='Statistics-text'>General User</p>
                </div>
              </div>
              <div className='Application-Statistics-box'>
                <div>
                  <p className='Statistics-Num'>{users.Nonprofit}</p>
                  <p className='Statistics-text'>Nonprofit Users</p>
                </div>
              </div>
              <div className='Application-Statistics-box'>
                <div>
                  <p className='Statistics-Num'>{users.Business}</p>
                  <p className='Statistics-text'>Business Users</p>
                </div>
              </div>
              <div className='Application-Statistics-box'>
                <div>
                  <p className='Statistics-Num'>{users.Activist}</p>
                  <p className='Statistics-text'>Activist Users</p>
                </div>
              </div>
            </div>
          </aside>

          <div className='menu'>
            <select
              name='user-report'
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value='1'>Nonprofit</option>
              <option value='2'>Business </option>
              <option value='3'>Activist</option>
            </select>
          </div>
          <div className='content'>
            {
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>User Email</th>
                    <th>Association Name</th>
                    <th>Number Of Campaign Created</th>
                  </tr>
                </thead>
                <tbody>
                  {nonprofitUser &&
                    nonprofitUser.map((nonprofit) => {
                      const { email, associationName, createdCampaigns } =
                        nonprofit;
                      return (
                        <ReportRowOfTable
                          param={email}
                          param2={associationName}
                          param3={createdCampaigns}
                        ></ReportRowOfTable>
                      );
                    })}
                </tbody>
              </Table>
            }
          </div>
        </div>
      );
    }
  } else if (userType === '2') {
    if (businessUser === undefined) {
      return <p>Loading...</p>;
    } else {
      return (
        <div className='report'>
          <header className='report-header'>
            <h3>User Report</h3>
          </header>
          <aside>
            <div className='Application-Statistics'>
              <div className='Application-Statistics-box'>
                <div>
                  <p className='Statistics-Num'>{users.totalUsers}</p>
                  <p className='Statistics-text'>General User</p>
                </div>
              </div>
              <div className='Application-Statistics-box'>
                <div>
                  <p className='Statistics-Num'>{users.Nonprofit}</p>
                  <p className='Statistics-text'>Nonprofit Users</p>
                </div>
              </div>
              <div className='Application-Statistics-box'>
                <div>
                  <p className='Statistics-Num'>{users.Business}</p>
                  <p className='Statistics-text'>Business Users</p>
                </div>
              </div>
              <div className='Application-Statistics-box'>
                <div>
                  <p className='Statistics-Num'>{users.Activist}</p>
                  <p className='Statistics-text'>Activist Users</p>
                </div>
              </div>
            </div>
          </aside>

          <div className='menu'>
            <select
              name='user-report'
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value='1'>Nonprofit</option>
              <option value='2'>Business </option>
              <option value='3'>Activist</option>
            </select>
          </div>
          <div className='content'>
            {
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>User Email</th>
                    <th>Company Name</th>
                    <th>Number Of Donated Products</th>
                  </tr>
                </thead>
                <tbody>
                  {businessUser &&
                    businessUser.map((business) => {
                      const { email, companyName, donatedProductAmount } =
                        business;
                      return (
                        <ReportRowOfTable
                          param={email}
                          param2={companyName}
                          param3={donatedProductAmount}
                        ></ReportRowOfTable>
                      );
                    })}
                </tbody>
              </Table>
            }
          </div>
        </div>
      );
    }
  } else if (userType === '3') {
    if (activistUser === undefined) {
      return <p>Loading...</p>;
    } else {
      return (
        <div className='report'>
          <header className='report-header'>
            <h3>User Report</h3>
          </header>
          <aside>
            <div className='Application-Statistics'>
              <div className='Application-Statistics-box'>
                <div>
                  <p className='Statistics-Num'>{users.totalUsers}</p>
                  <p className='Statistics-text'>General User</p>
                </div>
              </div>
              <div className='Application-Statistics-box'>
                <div>
                  <p className='Statistics-Num'>{users.Nonprofit}</p>
                  <p className='Statistics-text'>Nonprofit Users</p>
                </div>
              </div>
              <div className='Application-Statistics-box'>
                <div>
                  <p className='Statistics-Num'>{users.Business}</p>
                  <p className='Statistics-text'>Business Users</p>
                </div>
              </div>
              <div className='Application-Statistics-box'>
                <div>
                  <p className='Statistics-Num'>{users.Activist}</p>
                  <p className='Statistics-text'>Activist Users</p>
                </div>
              </div>
            </div>
          </aside>

          <div className='menu'>
            <select
              name='user-report'
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value='1'>Nonprofit</option>
              <option value='2'>Business </option>
              <option value='3'>Activist</option>
            </select>
          </div>
          <div className='content'>
            {
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>User Email</th>
                    <th>Campaign Name</th>
                    <th>Number Of Tweets </th>
                    <th>Last Day Of Work </th>
                  </tr>
                </thead>
                <tbody>
                  {activistUser &&
                    activistUser.map((activist) => {
                      const {
                        email,
                        campaignName,
                        numberOfTweets,
                        lastDayOfWork,
                      } = activist;
                      return (
                        <ReportRowOfTable
                          param={email}
                          param2={campaignName}
                          param3={numberOfTweets}
                          param4={lastDayOfWork}
                        ></ReportRowOfTable>
                      );
                    })}
                </tbody>
              </Table>
            }
          </div>
        </div>
      );
    }
  } else {
    if (nonprofitUser === undefined) {
      return <p>Loading...</p>;
    } else {
      return (
        <div className='report'>
          <header className='report-header'>
            <h3>User Report</h3>
          </header>
          <aside>
            <div className='Application-Statistics'>
              <div className='Application-Statistics-box'>
                <div>
                  <p className='Statistics-Num'>{users.totalUsers}</p>
                  <p className='Statistics-text'>General User</p>
                </div>
              </div>
              <div className='Application-Statistics-box'>
                <div>
                  <p className='Statistics-Num'>{users.Nonprofit}</p>
                  <p className='Statistics-text'>Nonprofit Users</p>
                </div>
              </div>
              <div className='Application-Statistics-box'>
                <div>
                  <p className='Statistics-Num'>{users.Business}</p>
                  <p className='Statistics-text'>Business Users</p>
                </div>
              </div>
              <div className='Application-Statistics-box'>
                <div>
                  <p className='Statistics-Num'>{users.Activist}</p>
                  <p className='Statistics-text'>Activist Users</p>
                </div>
              </div>
            </div>
          </aside>
          <div className='menu'>
            <select
              name='user-report'
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value='1'>Nonprofit</option>
              <option value='2'>Business </option>
              <option value='3'>Activist</option>
            </select>
          </div>
          Not Found Report
        </div>
      );
    }
  }
};
