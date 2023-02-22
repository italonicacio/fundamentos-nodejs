const {
  withPromises : {
    authenticate,
    listPosts,
    getPost
  }
} = require('../helpers/social-media')


// Código abaixo tem o problema do ultimo then não ter acesso ao token, e o getPost precisa do token de acesso
// const getFirstPost = (username, password) =>
//   authenticate(username, password)
//     .then(token => listPosts(token))
//     .then(posts => getPost())


const getFirstPost = (username, password) =>
  authenticate(username, password)
    .then(token => 
      listPosts(token)
        .then(([{ id }]) => getPost(token, id))
    )
    
const listPostsLinear = (token) =>
  listPosts(token)
    .then(posts => ({ posts, token }))

const getPostsLinear = ({ token, posts: [{ id }] }) => 
  getPost(token, id)

const getFirstPostLinear = (username, password) =>
  authenticate(username, password)
    .then(listPostsLinear)
    .then(getPostsLinear)

// getFirstPost('staart', 'nodelife')
// // getFirstPost('b', 'a')
//   .then(console.log)
//   .catch(console.error)

getFirstPostLinear('staart', 'nodelife')
// getFirstPost('b', 'a')
  .then(console.log)
  .catch(console.error)
