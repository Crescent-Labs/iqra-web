import React, { Component } from 'react';
import Header from './Header.jsx';

export default class Contact extends Component {
    render() {
        return (
            <div>
                <Header />
                <p className="contact-message">Whether you have feedback, suggestions,
                questions, or anything else, we'd love to hear from you!</p>
                <form
                    action="https://formspree.io/info@iqraapp.com"
                    method="POST"
                    className="contact-form"
                >
                    <div className="row">
                        <div className="input-field col s6">
                            <input type="text" name="name" id="name" required />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="input-field col s6">
                            <input type="email" name="_replyto" id="email" required />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field col s12">
                            <input type="text" name="_subject" id="subject" required />
                            <label htmlFor="subject">Subject</label>
                        </div>
                        <div className="input-field col s12">
                            <textarea
                                name="message"
                                id="message"
                                className="materialize-textarea"
                                required
                            ></textarea>
                            <label htmlFor="message">Message</label>
                        </div>
                        <input type="hidden" name="_format" value="plain" />
                        <input type="text" name="_gotcha" className="gotcha" />
                        <input type="hidden" name="_next" value="/thanks" />
                        <div className="input-field col s12">
                            <button type="submit" className="btn contact-submit">Send</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
