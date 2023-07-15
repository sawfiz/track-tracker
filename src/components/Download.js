import React from 'react';
import { utils as XLSXUtils, write as XLSXWrite } from 'xlsx';
import { db } from '../config/firebase';
import { saveAs } from 'file-saver';
// import { saveAs as fileDownload } from 'react-file-download';
import { collection, getDocs } from 'firebase/firestore';

const exportFirestoreDataToExcel = async (table) => {
  const collectionRef = collection(db, table); 
  const querySnapshot = await getDocs(collectionRef);
  
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  console.log("🚀 ~ file: Download.js:13 ~ exportFirestoreDataToExcel ~ data:", data)

  return data;
};

const handleExportToExcel = async (table) => {
  try {
    const data = await exportFirestoreDataToExcel(table);

    const worksheet = XLSXUtils.json_to_sheet(data);
    const workbook = XLSXUtils.book_new();
    XLSXUtils.book_append_sheet(workbook, worksheet, 'Sheet 1');
    
    const excelBuffer = XLSXWrite(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const excelData = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    // Download the Excel file
    saveAs(excelData, `${table}_data.xlsx`);
  } catch (error) {
    console.error('Error exporting data:', error);
    // Handle any error that occurred during the export
  }
};



export default function Download() {
  return (
    <div>
      <hr></hr>
      <h5>Export to Excel</h5>
         <div><button onClick={()=>handleExportToExcel("users")}>Download Users</button></div>
         <div>{'-'}</div>
         <div><button onClick={()=>handleExportToExcel("attendance")}>Download Attendance</button></div>
    </div>
  )
}
