import { gql } from '@apollo/client'

export const ADD_POST = gql`
  mutation AddPost(
    $body: String!
    $image: String!
    $subreddit_id: ID!
    $title: String!
    $username: String!
  ) {
    insertPost(
      body: $body
      image: $image
      subreddit_id: $subreddit_id
      title: $title
      username: $username
    ) {
      body
      created_at
      id
      image
      subreddit_id
      title
      username
    }
  }
`

export const ADD_SUBREDDIT = gql`
  mutation AddSubreddit($topic: String!) {
    insertSubreddit(topic: $topic) {
      id
      created_at
      topic
    }
  }
`

export const ADD_COMMENT = gql`
  mutation AddComment($post_id: ID!, $text: String!, $username: String!) {
    insertComment(post_id: $post_id, text: $text, username: $username) {
      created_at
      id
      post_id
      text
      username
    }
  }
`
