import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

interface User {
  createdAt: string;
}

interface Schedule {
  createdAt: string;
}

interface Subscription {
  createdAt: string;
}

const OperationReport: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/users`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSchedules = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/schedules`,{
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        setSchedules(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSubscriptions = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/subscription`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        const data = await response.json();
        setSubscriptions(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchApplications();
    fetchSchedules();
    fetchSubscriptions();
  }, []);

  const getMonthlyData = (items: { createdAt: string }[]) => {
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    return months.map((month) => ({
      month,
      count: items.filter((item) => new Date(item.createdAt).getMonth() + 1 === month).length,
    }));
  };

  const getYearlyData = (items: { createdAt: string }[]) => {
    const years = Array.from(new Set(items.map((item) => new Date(item.createdAt).getFullYear())));
    return years.map((year) => ({
      year,
      count: items.filter((item) => new Date(item.createdAt).getFullYear() === year).length,
    }));
  };

  console.log("users===",users)
  console.log("schedules===",schedules)
  console.log("subscriptions===",subscriptions)

  const applicationsMonthlyData = getMonthlyData(users);
  const schedulesMonthlyData = getMonthlyData(schedules);
  const subscriptionsYearlyData = getYearlyData(subscriptions);

  const generatePDFReport = () => {
    const doc = new jsPDF();

    doc.text('Applications Report', 20, 10);
    (doc as any).autoTable({
      head: [['Month', 'Number of Applications',]],
      body: applicationsMonthlyData.map((data) => [data.month, data.count]),
    });

    doc.addPage();
    doc.text('Schedules Report', 20, 10);
    (doc as any).autoTable({
      head: [['Month', 'Number of Schedules']],
      body: schedulesMonthlyData.map((data) => [data.month, data.count]),
    });

    doc.addPage();
    doc.text('Subscriptions Report', 20, 10);
    (doc as any).autoTable({
      head: [['Year', 'Number of Subscriptions']],
      body: subscriptionsYearlyData.map((data) => [data.year, data.count]),
    });

    doc.save('report.pdf');
  };

  const generateExcelReport = () => {
    const workbook = XLSX.utils.book_new();

    const applicationsSheet = XLSX.utils.json_to_sheet(
      applicationsMonthlyData.map((data) => ({
        Month: data.month,
        'Number of Applications': data.count,
      }))
    );
    XLSX.utils.book_append_sheet(workbook, applicationsSheet, 'Applications');

    const schedulesSheet = XLSX.utils.json_to_sheet(
      schedulesMonthlyData.map((data) => ({
        Month: data.month,
        'Number of Schedules': data.count,
      }))
    );
    XLSX.utils.book_append_sheet(workbook, schedulesSheet, 'Schedules');

    const subscriptionsSheet = XLSX.utils.json_to_sheet(
      subscriptionsYearlyData.map((data) => ({
        Year: data.year,
        'Number of Subscriptions': data.count,
      }))
    );
    XLSX.utils.book_append_sheet(workbook, subscriptionsSheet, 'Subscriptions');

    XLSX.writeFile(workbook, 'report.xlsx');
  };

  return (
    <section className='w-full h-full p-4 grid grid-cols-2 gap-9'>
      <div className='col-span-2 flex justify-end items-center gap-4 mt-4 border-b'>
        <button
          className='bg-[#5f0e0e] text-white py-2 px-4 rounded'
          onClick={generatePDFReport}
        >
          Generate PDF Report
        </button>
        <button
          className='bg-[#287BCB] text-white py-2 px-4 rounded'
          onClick={generateExcelReport}
        >
          Generate Excel Report
        </button>
      </div>
      <div className='h-[300px] bg-white p-4 rounded shadow-2xl'>
        <h2 className='text-lg font-bold mb-4'>Monthly Applications</h2>
        <BarChart width={400} height={250} data={applicationsMonthlyData}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='month' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='count' fill='#8884d8' />
        </BarChart>
      </div>
      <div className='h-[300px] bg-white p-4 rounded shadow-2xl'>
        <h2 className='text-lg font-bold mb-4'>Monthly Schedules</h2>
        <LineChart width={400} height={250} data={schedulesMonthlyData}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='month' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='count' stroke='#8884d8' />
        </LineChart>
      </div>
      <div className='h-[300px] bg-white p-4 rounded shadow-2xl'>
        <h2 className='text-lg font-bold mb-4'>Yearly Subscriptions</h2>
        <BarChart width={400} height={250} data={subscriptionsYearlyData}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='year' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='count' fill='#82ca9d' />
        </BarChart>
      </div>
    </section>
  );
};

export default OperationReport;
