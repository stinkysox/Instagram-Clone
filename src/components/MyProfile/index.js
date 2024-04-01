import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'

const MyProfile = () => {
  const [myProfileArray, setMyProfileArray] = useState({})
  const [apiStatus, setApiStatus] = useState('Loading')

  useEffect(() => {
    const jwtToken = Cookies.get('jwt_token')

    const fetchMyProfileData = async () => {
      const url = 'https://apis.ccbp.in/insta-share/my-profile'
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }

      try {
        const response = await fetch(url, options)
        if (!response.ok) {
          setApiStatus('Failed')
        }
        const data = await response.json()
        const {profile} = data
        console.log(profile)
        const updatedData = {
          id: profile.id,
          userId: profile.user_id,
          userName: profile.user_name,
          followersCount: profile.followers_count,
          followingCount: profile.following_count,
          userPosts: profile.posts,
          profilePic: profile.profile_pic,
          userBio: profile.user_bio,
          postsCount: profile.posts_count,
          userStories: profile.stories,
        }
        setMyProfileArray(updatedData)
        setApiStatus('Success')
      } catch (error) {
        setApiStatus('Failed')
        console.error('Error fetching user data:', error)
      }
    }

    fetchMyProfileData()

    return () => {}
  }, [])

  const renderLoadingScreen = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  const renderUserDetails = () => {
    const {
      userBio,
      userName,
      followersCount,
      followingCount,
      userPosts,
      profilePic,
      postsCount,
      userStories,
    } = myProfileArray

    return (
      <>
        <div className="user-details-container-bg">
          <div className="user-profilepic-contianer">
            <img
              className="user-profile-pic"
              src={profilePic}
              alt="my profile"
            />
          </div>
          <div className="user-details-container">
            <p className="user-username">{userName}</p>
            <div className="following-details-container">
              <p>
                <span className="count">{postsCount} </span>
                posts
              </p>
              <p>
                <span className="count">{followersCount} </span>
                followers
              </p>
              <p>
                <span className="count">{followingCount} </span>
                following
              </p>
            </div>
            <p className="username-two">{userName}</p>
            <p className="user-bio">{userBio}</p>
          </div>
        </div>
        <ul className="stories-container">
          {userStories.map(eachItem => (
            <li className="stories-item">
              <img
                className="stories-image"
                alt="my story"
                src={eachItem.image}
              />
            </li>
          ))}
        </ul>
        <hr className="hr-line" />
        <div className="posts-container">
          <div className="posts-top-container">
            <img src="https://i.postimg.cc/Y9wthvJH/Vector.jpg" alt="" />
            <p className="post-heading">Posts</p>
          </div>
          {userPosts.length !== 0 ? (
            <ul className="ul-posts">
              {userPosts.map(eachItem => (
                <li className="user-post-item">
                  <img
                    className="user-post-image"
                    alt="my post"
                    src={eachItem.image}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div>
              <img src="https://i.postimg.cc/766rCSmj/Group-7355.png" alt="" />
              <p className="no-posts-text">No Posts Yet</p>
            </div>
          )}
        </div>
      </>
    )
  }

  const renderMyProfileBasedOnApiStatus = () => {
    switch (apiStatus) {
      case 'Loading':
        return renderLoadingScreen()
      case 'Success':
        return renderUserDetails()
      default:
        return null
    }
  }
  return (
    <div className="my-profile-bg-container">
      <Header />
      {renderMyProfileBasedOnApiStatus()}
    </div>
  )
}

export default MyProfile
