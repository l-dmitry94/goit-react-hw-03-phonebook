import PropTypes from 'prop-types';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { ContactListHeader, Container, PhonebookHeader, Section } from './App.styled';

class App extends Component {
    state = {
        contacts: [
            { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
            { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
            { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
            { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ],
        filter: '',
    };

    formSubmitHandler = data => {
        const { contacts } = this.state;

        const contact = {
            id: nanoid(),
            ...data,
        };

        const inContacts = contacts.some(({ name }) => name.toLowerCase() === contact.name.toLowerCase());

        if (inContacts) {
            alert(`${contact.name} is already in contacts.`);
            return;
        }

        this.setState(({ contacts }) => ({
            contacts: [contact, ...contacts],
        }));
    };

    handleChange = event => {
        this.setState({
            filter: event.currentTarget.value,
        });
    };

    getVisibleContacts = () => {
        const { contacts, filter } = this.state;
        
        const normilizedFilter = filter.toLowerCase();
        return contacts.filter(contact => contact.name.toLowerCase().includes(normilizedFilter));
    };

    deleteContact = contactId => {
        this.setState(prevState => ({
            contacts: prevState.contacts.filter(({ id }) => id !== contactId),
        }));
    };

    render() {
        const { filter } = this.state;

        const visibleContacts = this.getVisibleContacts();
        return (
            <Section>
                <Container>
                    <PhonebookHeader>Phonebook</PhonebookHeader>
                    <ContactForm onSubmit={this.formSubmitHandler} />

                    <ContactListHeader>Contacts</ContactListHeader>
                    <Filter value={filter} onChange={this.handleChange} />
                    <ContactList contacts={visibleContacts} onDeleteContact={this.deleteContact} />
                </Container>
            </Section>
        );
    }
}

App.propTypes = {
    filter: PropTypes.string,
    visibleContacts: PropTypes.func,
};

export default App;
