## authRouter
- post /signup
- post /login
- post /logout

## profileRouter
-Get /profile/view
-PATCH /profile/edit
-PATCH  /profile/password

## ConnectionRequestRouter
-post /request/send/interested/:userID
-post /request/send/ignored/:userID
-post /request/review/accepted:requestID
-post /request/review/rejected/:requestID

## userRouter
-Get /user/connections
-Get  /user/request/recieved
-Get /user/feed -gets you the profile of no of users

status: ignore, interested, accepted, ignored
