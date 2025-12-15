import { nanoid } from "nanoid";
import { useState } from "react";
import "./App.css";
import data from "./mock-data.json";

function App() {
  // contacts variable holds an array that the initial value is set up
  // with data parameter in the parentheses of useState.
  const [contacts, setContacts] = useState(data);
  // initialize an object that different property has each input.
  const [addFormData, setAddFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: ""

  });

  const handleAddFormChange = (e) => {
    e.preventDefault();

    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;

    // To make a copy of current state of addFormData.
    const newFormData = { ...addFormData};
    // [] is used for the value of the variable fieldName as the key.
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (e) => {
    e.preventDefault();

    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
    }

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);

  }


  return (
    <div className='app-container'>
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Phone Number</th>
          <th>Email</th>
        </tr>
        </thead>
        <tbody>
          {/* map function outputs a row for each contact in our contacts array*/}
          {contacts.map((contact)=>(
          <tr>
            <td>{contact.fullName}</td>
            <td>{contact.address}</td>
            <td>{contact.phoneNumber}</td>
            <td>{contact.email}</td>
          </tr>
          ))}
        </tbody>
      </table>

      <h2>Add a Contact</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input 
        type="text" 
        name="fullName" 
        required= "required" 
        placeholder="Enter a name... "
        onChange={handleAddFormChange}/>
        <input 
        type="text" 
        name="address" 
        required= "required" 
        placeholder="Enter an address... "
        onChange={handleAddFormChange}/>
        <input 
        type="text" 
        name="phoneNumber" 
        required= "required" 
        placeholder="Enter a phone number... "
        onChange={handleAddFormChange}/>
        
        <input 
        type="text" 
        name="email" 
        required= "required" 
        placeholder="Enter an email... "
        onChange={handleAddFormChange}/>
        
        <button type="submit">Submit</button>
      </form>
      
    </div>
  )
}

export default App;