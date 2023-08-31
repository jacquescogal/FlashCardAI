# FlashCardAI
Grading your own understanding of flashcards can be subjective and draining. Introducing FlashCard AI: where GPT-4 🤖 takes on the role of your  personal grader and mentor 🧑‍🏫, providing you with an enhanced and objective learning experience.

Check it out: https://www.flashcardai.app

Technologies: React, Python Flask and AWS ecosystem (Elastic Beanstalk, S3 + CloudFront, Lambda + API Gateway, DynamoDB and etc.)
## Main Idea
Create a web app that can automate the feedback process for users reviewing their flash cards.

## Purpose
Dive deep into AWS cloud and GPT API. Improve react and python flask aptitude.
# Features
## Where is the backend code?
The webapp has been launched with user sessions enabled. To protect users, the backend code has been obfuscated and backend code in the commit history is outdated and unused. i will share some non-sensitive details of the backend and cloud implementation.

## Frontend - React with SCSS stylings
Served on S3 bucket and distributed on cloudfront.
**Landing Page**: Introduces the user and allows for login/registration

**Home Page**: Post-login or guest session entry. Has decks, cards in the decks and ability to create, read, update and delete decks/cards.

### Frontend example UI Flow:
Landing Page -> Guest Session (Temp storage, resets when visiting the landing page) / User Login (Deck data attached to account) -> Create/View Deck (A) -> Create/Edit/Delete Cards -> Review Cards -> Save review details -> Loop back to A

## Backend - Python Flask and Lambda
Python flask is hosted on EC2 with load balancers and allows for streaming of gpt webhooks.

Lambda functions are configured to be triggered by calls to an api gateway. Decoupled from the flask restAPI, it allows for convenient testing and changes to be made. Furthermore, the cost structure favours non-frequent tasks such as registration and login.
The bcrypt algorithm is used to salt and hash passwords. It is intentionally slow to discourage offline dictionary attacks by attrition. Lambda function can use their computing resources for this task, unloading the flask backend.

### Backend example flow:
**Login**: Accept username and password (flask) -> API (API gateway) -> Retrieve doc from db with username as key. Check the password provided with the **salted and bcrypt hashed** one from the db. -> Return statusCode 200 if all is well

## Database and AWS
DynamoDB and elasticache are the main storage resources used for this project.

DynamoDB is a key-pair document store. Relationships between documents are not a concern at this stage, so this was an appropriate chouice in terms of speed and cost.

Elasticache is a distributed cache. As I am using a load balanced EC2 flask backend, the cache is used to share data for appropriate session treatments. For example, JWT token invalidated list or login attempts from IP address.

# Key challenges/considerations and solution

| Challenge        | Considerations           | Solution  |
| ------------- |:-------------:| -----:|
| User session needs password authentication     |Users may use the same password for everything. Cannot risk vulnerability when data is in transit or rest.  |Get SSL certificate for domain, enforce HTTPS protocol for all connections and salt+bcrypt hash passwords at rest  |
| User session needs to be uniquely identified    |Attackers must not be able to practically impersonate another user.       | JWT token with secret key received on login. The token can be set to expire. The flask instances will know the expiry of token with and client will have to request for a new one if token was invalidated. |
| Cost of OpenAI API key | Minimize cost but allow users access to POC      |  Set a daily quota and per second token amount in the API gateway used to trigger lambda function approving the use of the GPT API. |

# Future Works
1. Mobile screens: Optimize for mobile screens
2. File upload: Allow user to upload decks as text files describing deck contents
3. Metrics: Introduce metrics to track users' performance
4. Email notification system: Integrate email notification system for account authentication and password recovery
5. Dynamic MCQ: Introduce a MCQ feature. The user will key term and answer. The engine will produce other options dynamically that are contextually and/or semantically similar.
6. Tone and persona options: Allow users to define the leniency and tone of the engine as well as their persona perceived by engine. Personalizes the teacher to the student. Using prompt engineering.
7. Optimize token usage: Pipeline smaller LLM model to optimize inputs by user for minimizing token and improving the quality of response by GPT-4.
8. Fine-tuning model: Explore GPT-3.5-FineTune model to optimize response results.

# Biggest Takeaways
1. Learning more about the AWS ecosystem especially AWS lambda, how to host backend and frontend apps, architect the cloud applications and see the finOPS angle when it comes to costs.
2. Buying and owning a domain, configuring DNS and setting up SSL.
3. Managing user sessions with JWT tokens, using IAM roles for resource access management and API key management.
4. Prompt engineering and exploring the methods by which AI can improve or complement learning.
