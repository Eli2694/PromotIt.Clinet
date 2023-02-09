import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import {
  getCampaignStatistics,
  getDonationCampaignInfo,
  getTotalCampaignInfo,
  getTweetsCampaignInfo,
} from '../../../services/Owner.services';
import { ReportRowOfTable } from '../reportRowOfTable/rowOfTable.component';
import './campaignReport.css';

export const CampaignReport = () => {
  const [campaignState, setCampaignState] = useState('1');
  const [campaignDonation, setCampaignDonation] = useState([]);
  const [campaignTweets, setCampaignTweets] = useState([]);
  const [totalCampaigns, setTotalCampaigns] = useState([]);
  const [campaignAmount, setCampaignAmount] = useState(0);
  const [campaignDate, setCampaignDate] = useState('2023-01-13');
  const [onchangeDate, setOnchangeDate] = useState('');

  const getCampaignInformation = async () => {
    let campaignsAmount = await getCampaignStatistics();
    setCampaignAmount(campaignsAmount);
    let total = await getTotalCampaignInfo(campaignDate);
    setTotalCampaigns(total);
    let donation = await getDonationCampaignInfo(campaignDate);
    setCampaignDonation(donation);
    let tweets = await getTweetsCampaignInfo(campaignDate);
    setCampaignTweets(tweets);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(onchangeDate);
    setCampaignDate(onchangeDate);
  };

  useEffect(() => {
    getCampaignInformation();
  }, [campaignDate]);

  if (campaignState === '1') {
    if (totalCampaigns === undefined) {
      return <p>Loading...</p>;
    } else {
      return (
        <div className='report'>
          <header className='report-header'>
            <h3>Campaign Report</h3>
          </header>
          <aside>
            <div className='Application-Statistics'>
              <div className='Application-Statistics-box'>
                <div>
                  <p className='Statistics-Num'>{campaignAmount}</p>
                  <p className='Statistics-text'>Total Number Of Campaigns</p>
                </div>
              </div>
            </div>
          </aside>
          <aside>
            <form onSubmit={handleSubmit} className='date'>
              <label>Choose a date to display campaigns from</label>
              <input
                type='text'
                required
                placeholder='yyyy-MM-dd'
                onChange={(e) =>
                  setOnchangeDate(e.target.value.replace(/'/g, ''))
                }
              />
              <button>Submit</button>
            </form>
          </aside>
          <div className='menu'>
            <select
              name='user-report'
              onChange={(e) => setCampaignState(e.target.value)}
            >
              <option value='1'>General</option>
              <option value='2'>Donation </option>
              <option value='3'>Tweets</option>
            </select>
          </div>
          <div className='content'>
            {
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Association Name</th>
                    <th>Campaign Name</th>
                    <th>Campaign Creation Date</th>
                  </tr>
                </thead>
                <tbody>
                  {totalCampaigns &&
                    totalCampaigns.map((campaigns) => {
                      const { associationName, campaignName, creationDate } =
                        campaigns;
                      return (
                        <ReportRowOfTable
                          param={associationName}
                          param2={campaignName}
                          param3={creationDate}
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
  } else if (campaignState === '2') {
    if (campaignDonation === undefined) {
      return <p>Loading...</p>;
    } else {
      return (
        <div className='report'>
          <header className='report-header'>
            <h3>Campaign Report</h3>
          </header>
          <aside>
            <div className='Application-Statistics'>
              <div className='Application-Statistics-box'>
                <div>
                  <p className='Statistics-Num'>{campaignAmount}</p>
                  <p className='Statistics-text'>Total Number Of Campaigns</p>
                </div>
              </div>
            </div>
          </aside>
          <aside>
            <form onSubmit={handleSubmit} className='date'>
              <label>Choose a date to display campaigns from</label>
              <input
                type='text'
                required
                placeholder='yyyy-MM-dd'
                onChange={(e) =>
                  setOnchangeDate(e.target.value.replace(/'/g, ''))
                }
              />
              <button>Submit</button>
            </form>
          </aside>

          <div className='menu'>
            <select
              name='user-report'
              onChange={(e) => setCampaignState(e.target.value)}
            >
              <option value='1'>General</option>
              <option value='2'>Donation </option>
              <option value='3'>Tweets</option>
            </select>
          </div>
          <div className='content'>
            {
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Campaign Creation Date</th>
                    <th>Campaign Name</th>
                    <th>Total Donation Amount In $</th>
                  </tr>
                </thead>
                <tbody>
                  {campaignDonation &&
                    campaignDonation.map((donation) => {
                      const { date, name, amount } = donation;
                      return (
                        <ReportRowOfTable
                          param={date}
                          param2={name}
                          param3={amount}
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
  } else if (campaignState === '3') {
    if (campaignTweets === undefined) {
      return <p>Loading...</p>;
    } else {
      return (
        <div className='report'>
          <header className='report-header'>
            <h3>Campaign Report</h3>
          </header>
          <aside>
            <div className='Application-Statistics'>
              <div className='Application-Statistics-box'>
                <div>
                  <p className='Statistics-Num'>{campaignAmount}</p>
                  <p className='Statistics-text'>Total Number Of Campaigns</p>
                </div>
              </div>
            </div>
          </aside>
          <aside>
            <form onSubmit={handleSubmit} className='date'>
              <label>Choose a date to display campaigns from</label>
              <input
                type='text'
                required
                placeholder='yyyy-MM-dd'
                onChange={(e) =>
                  setOnchangeDate(e.target.value.replace(/'/g, ''))
                }
              />
              <button>Submit</button>
            </form>
          </aside>

          <div className='menu'>
            <select
              name='user-report'
              onChange={(e) => setCampaignState(e.target.value)}
            >
              <option value='1'>General</option>
              <option value='2'>Donation </option>
              <option value='3'>Tweets</option>
            </select>
          </div>
          <div className='content'>
            {
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Campaign Creation Date</th>
                    <th>Campaign Name</th>
                    <th>Total Number Of Tweets </th>
                  </tr>
                </thead>
                <tbody>
                  {campaignTweets &&
                    campaignTweets.map((tweets) => {
                      const { date, name, amount } = tweets;
                      return (
                        <ReportRowOfTable
                          param={date}
                          param2={name}
                          param3={amount}
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
    return (
      <div className='report'>
        <header className='report-header'>
          <h3>Campaign Report</h3>
        </header>
        <aside>
          <div className='Application-Statistics'>
            <div className='Application-Statistics-box'>
              <div>
                <p className='Statistics-Num'>{campaignAmount}</p>
                <p className='Statistics-text'>Total Number Of Campaigns</p>
              </div>
            </div>
          </div>
        </aside>
        <div className='menu'>
          <select
            name='user-report'
            onChange={(e) => setCampaignState(e.target.value)}
          >
            <option value='1'>General</option>
            <option value='2'>Donation </option>
            <option value='3'>Tweets</option>
          </select>
        </div>
        Not Found Campaign State
      </div>
    );
  }
};
