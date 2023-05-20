import React, {  useEffect, useState } from "react";
import { Form } from "./FormAddContacts/FormAddContacts";
import { nanoid } from 'nanoid';
import { ContactList } from "./Contacts/Contacts";
import { Search } from "./Search/Search";
import { Container, Title, ListTitle } from './Container/Container.Styled'

export function App () {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault(); 
    const isNameExists = contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    )
    if (isNameExists) {
      alert(`${name} is already in contacts.`);
      return;
    }

    if (name !== '' && number !== '') {
      const contact = {
        id: nanoid(),
        name,
        number,
      };

      setContacts((prevContacts) => [...prevContacts, contact]);
      setName('');
      setNumber('');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleDeleteContact = (id) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
  };

  const handleFilterChange = (e) => {
    const { value } = e.target;
    setFilter(value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = getFilteredContacts();
  return (
   
     <Container>
      <Title>Phonebook</Title>
<Form name={name}
number={number}
handleInputChange={handleInputChange}
 handleSubmit={handleSubmit}></Form>
<ListTitle>Contacts</ListTitle>
<Search filter= {filter} handleFilterChange = {handleFilterChange}></Search>
<ContactList contacts={filteredContacts} onDeleteContact={handleDeleteContact}> </ContactList> 
    </Container>  )
  } 
