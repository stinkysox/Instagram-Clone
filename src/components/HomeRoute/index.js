import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import ReactSlick from '../ReactSlick'
import Post from '../Posts'

class Home extends Component {
  state = {
    storiesApi: 'Loading',
    postsApi: 'Loading',
    storiesArray: [],
    posts: [],
    searchValue: '',
  }

  componentDidMount() {
    this.getStories()
    this.getPosts()
  }

  onRetry = () => {
    this.setState({postsApi: 'Loading'}, this.getPosts)
  }

  handleSearchResults = value => {
    this.setState({searchValue: value})
  }

  getStories = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error('Failed to fetch stories')
      }
      const data = await response.json()
      const {users_stories: usersStories} = data
      const updatedData = usersStories.map(eachItem => ({
        userId: eachItem.user_id,
        userName: eachItem.user_name,
        storyUrl: eachItem.story_url,
      }))
      this.setState({storiesApi: 'Success', storiesArray: updatedData})
    } catch (error) {
      console.error('Error fetching stories:', error)
      this.setState({storiesApi: 'Failure'})
    }
  }

  getPosts = async () => {
    const {searchValue} = this.state
    const url = `https://apis.ccbp.in/insta-share/posts?search=${searchValue}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }
      const data = await response.json()
      const {posts} = data
      const updatedData = posts.map(eachItem => ({
        comments: eachItem.comments.map(comment => ({
          userId: comment.user_id,
          userName: comment.user_name,
          commentText: comment.comment,
        })),
        postId: eachItem.post_id,
        createdAt: eachItem.created_at,
        likesCount: eachItem.likes_count,
        userName: eachItem.user_name,
        profilePic: eachItem.profile_pic,
        userId: eachItem.user_id,
        caption: eachItem.post_details.caption,
        imageUrl: eachItem.post_details.image_url,
      }))
      this.setState({postsApi: 'Success', posts: updatedData})
    } catch (error) {
      console.error('Error fetching posts:', error.error_msg)
      this.setState({postsApi: 'Failure'})
    }
  }

  renderStoriesBasedOnApiStatus = () => {
    const {storiesApi} = this.state
    switch (storiesApi) {
      case 'Loading':
        return this.renderLoadingScreen()
      case 'Success':
        return this.renderStoriesScreen()
      case 'Failure':
        return this.renderFailureScreen()
      default:
        return null
    }
  }

  renderPostsBasedonApi = () => {
    const {postsApi} = this.state
    switch (postsApi) {
      case 'Loading':
        return this.renderLoadingScreen()
      case 'Success':
        return this.renderPostsView()
      case 'Failure':
        return this.renderFailureScreen()
      default:
        return null
    }
  }

  renderFailureScreen = () => (
    <div className="failure-container">
      <img src="https://i.postimg.cc/cLFWBs6p/alert-triangle.png" alt="" />
      <p>Something went wrong. Please try again</p>
      <button type="button" className="retry-btn" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  renderPostsView = () => {
    const {posts} = this.state

    return (
      <>
        {posts.map(eachPost => (
          <Post key={eachPost.postId} details={eachPost} />
        ))}
      </>
    )
  }

  renderStoriesScreen = () => {
    const {storiesArray} = this.state
    return <ReactSlick details={storiesArray} />
  }

  renderLoadingScreen = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  render() {
    return (
      <>
        <Header
          handleSearchResults={this.handleSearchResults}
          getPosts={this.getPosts}
        />
        <div className="home-bg-container">
          {this.renderStoriesBasedOnApiStatus()}
          <ul className="posts-container">{this.renderPostsBasedonApi()}</ul>
        </div>
      </>
    )
  }
}

export default Home
