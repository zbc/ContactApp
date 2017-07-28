import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ImageInput from './ImageInput';
import serializeForm from 'form-serialize';

class CreateContact extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        const value = serializeForm(event.target, {hash :true});
        this.props.onCreateContact(value);
    }

    render() {
        return (
            <div>
                <Link to="/" className="close-create-contact">Close</Link>
                <form className="create-contact-form" onSubmit={this.handleSubmit}>
                    <ImageInput className="create-contact-avatar-input"
                                maxHeight={64}
                                name="avatarURL"/>
                    <div className="create-contact-details">
                        <input type="text" name="name" placeholder="name" />
                        <input type="text" name="email" placeholder="email" />
                        <button>Add to contact</button>
                    </div>
                </form>
            </div> 
        )
    }
}

export default CreateContact;
