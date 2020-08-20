# Backend API Challenge

## Technologies used

Node.js, Express, Javascript, Mocha, Chai, Memory-cache

## Purpose

The purpose of this project was to build out a Node.js backend that would return specific payloads based on the url parameters.

## Steps

1. Create a route with the following criteria:
    - Request:
        - Route: /api/ping
        - Method: GET
    - Response:
        - Response body (JSON):{"success": true}
        - Response status code: 200
2. Create a route with the following criteria:
    - Request:
        - Route: /api/posts
        - Method: GET
        - Query Parameters:
            - tags
                - Type: String (required)
                - Description: A comma separated list of tags
                - Default: N/A
                - Example: science,tech
            - sortBy
                - Type: String (optional)
                - Description: The field to sort the posts by. The acceptable fields are:
                    - id
                    - reads
                    - likes
                    - popularity
                - Default: id
                - Example: popularity
            - Direction
                - Type: String (optional)
                - Description: The direction for sorting. The acceptable fields are:
                    - desc
                    - asc
                - Default: asc
                - Example: asc
3. An important part of development is testing. In this step, we want to see tests written
for your routes. Do not use the solutions API route to perform testing in this step. Think
about the different ways to test the app, and the best way to get good coverage.

4. (Bonus) Making API calls to other servers can be expensive. How can you reduce the number of
calls you make to a server? You can cache the results of an API call on your server. Try
to implement a server side cache to our API. Two tips are 1) keep it simple, and 2) feel
free to use existing libraries/frameworks.
