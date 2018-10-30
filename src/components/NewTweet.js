import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleAddTweet } from '../actions/tweets'
import { Redirect } from "react-router-dom";

class NewTweet extends Component {

    state = {
        value: '',
        toHome: false
    }

    handleChange = ({ target: { value } }) => {

        this.setState((prevState) => ({
            value
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { value } = this.state
        const { dispatch, id } = this.props

        dispatch(handleAddTweet(value, id))

        this.setState((prevState) => ({
            value: '',
            toHome: id ? false : true
        }))
    }

    render() {
        const { value, toHome } = this.state

        //Redirect to / if submitted => declarative way
        if (toHome === true) {
            return <Redirect to='/' />
        }


        const tweetLeft = 280 - value.length

        return (
            <div>
                <h3 className='center'> Compose new Tweet</h3>
                <form className='new-tweet' onSubmit={this.handleSubmit}>
                    <textarea
                        placeholder="What's happening?"
                        value={value}
                        onChange={this.handleChange}
                        className='textarea'
                        maxLength={280} />
                    {tweetLeft <= 100 && (
                        <div className='tweet-length'>
                            {tweetLeft}
                        </div>
                    )}
                    <button
                        className='btn'
                        type='submit'
                        disabled={value === ''}>
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

export default connect()(NewTweet);
