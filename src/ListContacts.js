import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import sortBy from 'sort-by';
import escapeRegExp from 'escape-string-regexp';

class ListContacts extends Component {

    static propTypes = {
        contacts : PropTypes.array.isRequired,
        onDeleteContact : PropTypes.func.isRequired
    }

    state = {
        query:''
    }

    updateQuery = (query) => {
        this.setState({
            query : query.trim()
        })
    }

    clearQuery = () => {
        this.setState({
            query: ''
        })
    }

    render() {
        const {contacts, onDeleteContact} = this.props;
        const {query} = this.state;

        let showContacts;

        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i');
            showContacts = contacts.filter((contact) => match.test(contact.name)) 
        } else {
            showContacts = contacts;
        }

        showContacts.sort(sortBy('name'));
        
        return (
            <div className='list-contacts'>
                <div className='list-contacts-top'>
                    <input className='search-contacts'
                        type='text'
                        placeholder='Search Contacts'
                        value={query}
                        onChange = {(event) => {this.updateQuery(event.target.value)}}
                    />
                    <Link to='/create'
                        className='add-contact'>
                        Add Contact
                    </Link>
                </div>

                {showContacts.length !== contacts.length && (
                <div className='showing-contacts'>
                    <span>Now showing {showContacts.length} of {contacts.length} total</span> 
                    <button onClick={this.clearQuery}>Reset All</button>
                </div>
                )}

                <ol className='contact-list'>
                    {showContacts.map((contact) => (
                        <li key={contact.id} className='contact-list-item'>
                            <div className='contact-avatar' style={{
                                backgroundImage: `url(${contact.avatarURL})`
                            }}/> 
                        <div className='contact-details'>
                            <p>{contact.name}</p>
                            <p>{contact.email}</p>
                        </div>
                        <button onClick={() => {onDeleteContact(contact)}} className='contact-remove'>Remove</button>
                    </li>
                    ))}
                </ol> 
            </div>
        )
    }
}



export default ListContacts;
