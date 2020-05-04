# Project name: health-tracker-api
# Server tech: NodeJS, Express 
# Database: MongoDB (remote)

# install dependencies
# npm install

# Run project 
# npm run start
# npm run dev

# Project structure
# index
# routes
#   - users routes 
#   - meals routes 
# models
#   - users model 
#   - meals model 
# controller
#   - users controller 
#   - meals controller 


# API
# users
#   - Users CRUD
#   - Meals CRUD, Get all meals by using filters
#   - auth API
#       - login
#       - logout

# All API are running on localhost:8000
# login API
#   - POST(/api/login)
#   - Body(email, password)
#   - on success session created 
# logout API
#   - GET(/api/logout)
#   - on success session destroyed

# All CRUD operations were using model and followed REST guidelines

# Other API
# /api/auth/change-password/
#   - used for reset and changed password
#   - POST
#   - Body(email, password)

# /api/meals/all/meals
#   - used to fetch meals by various filters
#   - GET(params: fromDate, toDate, user_id)

