import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { formatTweet, formatDate } from '../utils/helpers'
import { TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti'
import { handleToggleTweet } from '../actions/tweets'

class Tweet extends Component {

    handleLike = (e) => {
        e.preventDefault()

        //todo: handle Like Tweet
        const { dispatch, tweet: { id, hasLiked }, authedUser } = this.props
        console.log(hasLiked);

        dispatch(handleToggleTweet({
            id,
            hasLiked,
            authedUser
        }))
    }

    toParent = (e, id) => {
        e.preventDefault()
        console.log(id);
        
        //Redirect to parent Tweet
        this.props.history.push(`/tweet/${id}`) //imperative way, in this case we need to import withRouter HOC
    }

    render() {
        const { tweet } = this.props

        if (tweet === null)
            return <p>This tweet doesn't exist.</p>

        const {
            name, avatar, timestamp, text, hasLiked, likes, replies, id, parent
        } = tweet

        return (
            <Link to={`/tweet/${id}`} className='tweet'>
                <img
                    src={avatar}
                    alt={`Avatar of ${name}`}
                    className='avatar' />
                <div className='tweet-info'>

                    <div>
                        <span>{name}</span>
                        <div>{formatDate(timestamp)}</div>
                        {parent && (
                            <button className='replying-to' onClick={(e) => this.toParent(e, parent.id)}>
                                Replying to @{parent.author}
                            </button>
                        )}
                        <p>{text}</p>
                    </div>

                    <div className='tweet-icons'>
                        <TiArrowBackOutline className='tweet-icon' onClick={(e) => parent && this.toParent(e, parent.id)} />
                        <span>{replies !== 0 & replies}</span>
                        <button className='heart-button' onClick={this.handleLike}>
                            {hasLiked === true
                                ? <TiHeartFullOutline color='#e0245e' className='tweet-icon' />
                                : <TiHeartOutline className='tweet-icon' />}
                        </button>
                        <span>{likes !== 0 && likes}</span>
                    </div>
                </div>
            </Link>
        )
    }
}

const mapStateToProps = ({ authedUser, users, tweets }, { id }) => {
    const tweet = tweets[id]
    const parentTweet = tweet ? tweets[tweet.replyingTo] : null

    return {
        authedUser,
        tweet: tweet ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet) : null
    }
}

//the connected component now will have the react router props
export default withRouter(connect(mapStateToProps)(Tweet));
