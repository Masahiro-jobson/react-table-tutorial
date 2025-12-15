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
      <form>
        <input 
        type="text" 
        name="fullName" 
        required= "required" 
        placeholder="Enter a name... "/>
        <input 
        type="text" 
        name="address" 
        required= "required" 
        placeholder="Enter an address... "/>
        <input 
        type="text" 
        name="phoneNumber" 
        required= "required" 
        placeholder="Enter a phone number... "/>
        <input 
        type="text" 
        name="email" 
        required= "required" 
        placeholder="Enter an email... "/>
        <button type="submit">Submit</button>
      </form>
      
    </div>
  )
}

export default App;