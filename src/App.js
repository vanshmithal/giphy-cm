import logo from './logo.svg'
import './App.css'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { useState, useEffect } from 'react'

const gf = new GiphyFetch('lShB9e5TS657aodfSnygL0n62BHoYrtp')

function App() {
  const [data, setData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [postText, setPostText] = useState('')
  const [postGifUrl, setPostGifUrl] = useState('')
  const [posts, setPosts] = useState([])

  //For fetching GIFs from Giphy
  useEffect(() => {
    const fetchGifs = async () => {
      const gifData = await gf.search(searchText).then((data) => {
        setData(data.data)
      })
    }
    fetchGifs()
  }, [searchText])

  // Handler for Post button
  function postClick() {
    var tempPosts = posts
    tempPosts.push({ text: postText, gif: postGifUrl })
    console.log(tempPosts, posts)
    setPosts(tempPosts)
    setSearchText('')
    setPostText('')
    setPostGifUrl('')
  }

  return (
    <div className='App'>
      <h1>Facebook Post</h1>
      <div className='cont'>
        <div className='heading'>
          <p>Compose Post</p>
        </div>
        <div className='post-box-dp'>
          <img src={logo} className='logo' alt='logo' />
          <div className='post-box'>
            <input
              className='text-field post-text'
              type='text'
              value={postText}
              onChange={(e) => {
                setPostText(e.target.value)
              }}
              placeholder='Post something...'
            />
            {postGifUrl && <img src={postGifUrl} className='gif' alt='gif' />}
          </div>
        </div>
        <br />
        <div className='gif-area'>
          <input
            className='text-field'
            type='text'
            placeholder='Add GIF...'
            onChange={(e) => {
              setSearchText(e.target.value)
            }}
            value={searchText}
          />
          <button
            onClick={postClick}
            type='submit'
            disabled={postText || postGifUrl ? false : true}
          >
            Post
          </button>
        </div>

        <div className='gif-cont'>
          {searchText && <h5>Powered by Giphy</h5>}
          {data.map((d) => {
            return (
              <img
                key={d.id}
                className='gif'
                src={d.images.fixed_height.url}
                alt='gif'
                onClick={() => setPostGifUrl(d.images.fixed_height.url)}
              />
            )
          })}
        </div>
      </div>

      <div className='post-cont'>
        <h3 style={{ color: 'rgb(7, 115, 187)' }}>Recent Posts</h3>
        {posts.map((post, index) => {
          return (
            <div key={index} className='post'>
              <p style={{ margin: '10px' }}>You posted:</p>

              <div className='post-content-dp'>
                <img src={logo} className='logo' alt='logo' />
                <div className='post-content'>
                  <p>{post.text}</p>
                  <img src={post.gif} className='gif' alt='gif' />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
