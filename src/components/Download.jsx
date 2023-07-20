// Libraries
import React from 'react';
import { utils as XLSXUtils, write as XLSXWrite } from 'xlsx';
import { saveAs } from 'file-saver';
import { collection, getDocs } from 'firebase/firestore';
import Button from 'react-bootstrap/esm/Button';

// Config
import { db } from '../config/firebase';

const exportFirestoreDataToExcel = async (table) => {
  const collectionRef = collection(db, table);
  const querySnapshot = await getDocs(collectionRef);

  const data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  console.log(
    '🚀 ~ file: Download.js:13 ~ exportFirestoreDataToExcel ~ data:',
    data
  );

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

export default function Download({ table }) {
  return (
    <Button variant="secondary" onClick={() => handleExportToExcel(table)}>
      ⏬ {table}
    </Button>
  );
}
