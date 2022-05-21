import { gql } from '@apollo/client'

export const GET_SUBREDDIT_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getSubredditListByTopic(topic: $topic) {
      created_at
      id
      topic
    }
  }
`

export const GET_ALL_POST = gql`
  query MyQuery {
    getPostList {
      body
      created_at
      id
      image
      subreddit_id
      title
      username
      subreddit {
        created_at
        topic
        id
      }
      comments {
        created_at
        id
        post_id
        text
        username
      }
      votes {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`
