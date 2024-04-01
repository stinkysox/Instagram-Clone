import {useState} from 'react'
import {Link} from 'react-router-dom'
import './index.css'
import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import Cookies from 'js-cookie'

const Post = props => {
  const {details} = props
  const {
    comments,
    postId,
    createdAt,
    likesCount,
    userName,
    profilePic,
    userId,
    imageUrl,
    caption,
  } = details

  const [isLiked, setLikeStatus] = useState(false)
  const [like, setLikeCount] = useState(likesCount)

  const onLiked = async clickedPostId => {
    setLikeStatus(prevIsLiked => !prevIsLiked)

    setLikeCount(prevState => (isLiked ? prevState - 1 : prevState + 1))

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/posts/${clickedPostId}/like`
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        like_status: !isLiked,
      }),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
  }

  return (
    <li className="post-item">
      <div className="profile-pic-section">
        <img
          className="profile-pic"
          src={profilePic}
          alt="post author profile"
        />
        <Link to={`/users/${userId}`}>
          <p className="user-name">{userName}</p>
        </Link>
      </div>
      <img className="post-image" src={imageUrl} alt="post" />
      <div className="like-share-btn-container">
        {isLiked ? (
          <button
            className="like-btn"
            type="button"
            data-testid="unLikeIcon"
            aria-label="Like"
            onClick={() => onLiked(postId)}
          >
            <FcLike />
          </button>
        ) : (
          <button
            className="like-btn"
            type="button"
            data-testid="likeIcon"
            aria-label="Like"
            onClick={() => onLiked(postId)}
          >
            <BsHeart />
          </button>
        )}

        <button className="like-btn" aria-label="Comment" type="button">
          <FaRegComment />
        </button>
        <button className="like-btn" aria-label="Share" type="button">
          <BiShareAlt />
        </button>
      </div>
      <div className="post-details-container">
        <p className="likes-count">{`${like} likes`}</p>
        <p className="caption-text">{caption}</p>
        {comments.map(comment => (
          <p key={comment.userId} className="comment-text">
            <span className="commenter">{comment.userName} </span>
            {comment.commentText}
          </p>
        ))}
        <p className="created-at">{createdAt}</p>
      </div>
    </li>
  )
}

export default Post
