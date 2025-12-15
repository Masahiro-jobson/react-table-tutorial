import { nanoid } from "nanoid";
import { Fragment, useState } from "react";
import "./App.css";
import EditableRow from "./components/EditableRow";
import ReadOnlyRow from "./components/ReadOnlyRow";
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
    email: "",

  });

  const [editFormData, setEditFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });


  const [editContactId, setEditContactId] = useState(null);

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
  
  const handleEditFormChange = (e) => {
    e.preventDefault();
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;

    const newFormData = { ...editFormData};
    newFormData[fieldName] = fieldValue;
    
    setEditFormData(newFormData);

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

  const handleEditFormSubmit = (e) => {
    e.preventDefault();

    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
    }

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId)

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);


  }

  const handleEditClick = (e, contact) => {
    e.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      fullName: contact.fullName,
      address: contact.address,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
    }

    setEditFormData(formValues);
  }

  const handleCancelClick = () => {
    setEditContactId(null);
  }

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts]

    const index = contacts.findIndex((contact)=> contact.id === contactId)

    newContacts.splice(index, 1);

    setContacts(newContacts);
  }

  return (
    <div className='app-container'>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
            {/* map function outputs a row for each contact in our contacts array*/}
            {contacts.map((contact)=>(
            <Fragment>
              {editContactId === contact.id ? (
                // Left side is child component and right side is Parent component
                <EditableRow 
                editFormData = {editFormData} 
                handleEditFormChange = {handleEditFormChange}
                handleCancelClick = {handleCancelClick}
                />
              ): (
              <ReadOnlyRow 
              contact={contact} 
              handleEditClick = {handleEditClick}
              handleDeleteClick = {handleDeleteClick}
              />)}
            </Fragment>
            ))}
          </tbody>
        </table>
      </form>

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