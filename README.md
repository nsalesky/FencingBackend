# FencingBackend

## Description

This is a backend API for a web platform focused on creating, managing, and participating in fencing tournaments. While the platform
will eventually branch out and include other sports and events, fencing is the primary focus for now. The key challenge that this project aims to address
is the difficulty in managing and participating in fencing tournaments. This project will allow users to synchronize bout scores and data to make it easier
for participants to know how they are doing in a given tournament and also to make it easier for referees to manage noting scores by automating this process.
Another key goal of this project is to make it easier for fencers to find upcoming tournaments and post tournaments of their own, whether publically or through
a private code.

## Tech Stack

This API is built with Typescript and uses Node.js, Express, Apollo Server (for GraphQL), and MongoDB.

## What's completed so far
1. The basic infrastructure for user registration and login
2. User authentication for all GraphQL queries and mutations
3. Broad tournament creation, browsing, and registration

## Next Steps

1. Expand the tournaments database to store the actual state of the tournament, including the initial participant seeding, pool statistics, and direct-elimination
brackets with final results

## Key Challenges
1. It took me a while to figure out the best tech setup for this API. I developed the first version in Rust and built the user registration and login features
before I realized that Rust was not the best choice for this project. After settling on Node.js, my progress accelerated significantly.
2. Figuring out how to handle authentication for the GraphQL queries took a while, but I eventually settled on a design that works well

## What I would do differently
Nothing yet, I feel very good about the general design of this project so far.
