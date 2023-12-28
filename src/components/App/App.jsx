import PropTypes from 'prop-types';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { ContactListHeader, Container, PhonebookHeader, Section } from './App.styled';

const LOCALSTORAGE_KEY = 'contacts-key';

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
    componentDidMount() {
        const savedState = localStorage.getItem(LOCALSTORAGE_KEY);

        if (savedState) {
            const savedContacts = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
            this.setState({ contacts: savedContacts });
        }
    }

    componentDidUpdate(_, prevState) {
        const { contacts } = this.state;
        if (prevState.contacts !== contacts) {
            if (!contacts.length) {
                localStorage.removeItem(LOCALSTORAGE_KEY);
            } else {
                localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(contacts));
            }
        }
    }

    formSubmitHandler = data => {
        const { contacts } = this.state;

        const contact = {
            id: nanoid(),
            ...data,
        };

        const inContacts = contacts.some(
            ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
        );

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
        const { contacts, filter } = this.state;

        const visibleContacts = this.getVisibleContacts();
        return (
            <Section>
                <Container>
                    <PhonebookHeader>Phonebook</PhonebookHeader>
                    <ContactForm onSubmit={this.formSubmitHandler} />

                    <ContactListHeader>Contacts</ContactListHeader>
                    {contacts.length > 0 ? (
                        <>
                            <Filter value={filter} onChange={this.handleChange} />
                            {visibleContacts.length > 0 ? (
                                <ContactList
                                    contacts={visibleContacts}
                                    onDeleteContact={this.deleteContact}
                                />
                            ) : (
                                <p>No contacts found</p>
                            )}
                        </>
                    ) : (
                        "There's nothing here"
                    )}
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
