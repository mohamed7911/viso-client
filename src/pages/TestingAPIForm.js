import React, { useState } from 'react';
import './TestingAPIForm.css'
import axios from "axios"
import {saveAs} from 'file-saver'

const TestingAPIForm = () => {
  const [profession, setProfession] = useState('');
  const [country, setCountry] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [NIC, setNIC] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [education, setEducation] = useState('');
  const [format, setFormat] = useState('');

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(firstName,lastName,email,NIC,phoneNo,address,gender,profession,country);
    console.log(education);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({profession,country,firstName,lastName,email,NIC,phoneNo,address,gender,education})
  };
    fetch('http://localhost:3001/', requestOptions)
    setProfession('');
    setCountry('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setNIC('');
    setPhoneNo('');
    setAddress('');
    setGender('');
    setEducation('');
  }


  const handleSubmitDownload = async (event) => {
    event.preventDefault();
    if(format === 'PDF'){
    await axios.post(`http://localhost:3001/download`,format)//create pdf next=> get pdf
    .then(()=>
         axios.get(`http://localhost:3001/fetchPdf`,{responseType:'blob'})//to fetch the generated pdf
         .then((res)=>{
           const pdfBlob = new Blob([res.data],{type:'application/pdf'})
           console.log(pdfBlob)
           saveAs(pdfBlob,'InvoiceDocument.pdf')  //to save we use file saver
         }))
        }else{
          axios.get(`http://localhost:3001/`,{responseType:'blob'})//to fetch the generated pdf
          .then((res)=>{
            const pdfBlob = new Blob([res.data],{type:'application/docx'})
            console.log(pdfBlob)
            saveAs(pdfBlob,'InvoiceDocument.docx')  //to save we use file saver
          })
       }
        // setProfession('');
        // setCountry('');
        // setFirstName('');
        // setLastName('');
        // setEmail('');
        // setNIC('');
        // setPhoneNo('');
        // setAddress('');
        // setGender('');
        // setEducation('');
        // setFormat('');
        }

  return (
    <div>
        <div className="Testing">
        <form onSubmit={handleSubmit}>
        
            <label htmlFor="firstName">First Name:</label>
            <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            required
            />
            <label htmlFor="lastName">Last Name:</label>
            <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            />
            <label htmlFor="NIC">NIC:</label>
            <input
            type="text"
            id="NIC"
            value={NIC}
            onChange={(event) => setNIC(event.target.value)}
            required
            />
            <label htmlFor="address">Address:</label>
            <input
            type="text"
            id="address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            />
            <label htmlFor="phoneNO">Phone NO:</label>
            <input
            type="tel"
            id="phoneNO"
            value={phoneNo}
            onChange={(event) => setPhoneNo(event.target.value)}
            required
            />
            <label htmlFor="gender">Gender:</label>
            <select required value={gender}
                onChange={(e)=> setGender(e.target.value)}>
                <option value="">None</option>    
                <option value="male">male</option>
                <option value="female">female</option>
            </select>

            <label htmlFor="email">email:</label>
            <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            />
            
            <label htmlFor="profession">Profession:</label>
            <input
            type="text"
            id="profession"
            value={profession}
            onChange={(event) => setProfession(event.target.value)}
            required
            />

            <label htmlFor="country">Country:</label>
            <input
            type="text"
            id="country"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            required
            />

            <label htmlFor="education">Education:</label>
            <input
            type="textarea"
            size="100"
            id="education"
            
            value={education}
            onChange={(event) => setEducation(event.target.value)}
            required
            />
        

            <br></br>
            <button type="submit">SignUp</button>
        </form>
        
        </div>

        <br></br>
        <br></br>
        
        <div>
            <form onSubmit={handleSubmitDownload}>
            <h3>Download the file</h3>

            <label htmlFor="format">Format:</label>
            <select required value={format}
                onChange={(e)=> setFormat(e.target.value)}>
                <option value="">None</option>    
                <option value="Word">Word</option>
                <option value="PDF">PDF</option>
            </select>
            <br></br>
            <br></br>
            <button type="submit">Download</button>
            </form>
        </div>
    </div>
  );
};

export default TestingAPIForm;
