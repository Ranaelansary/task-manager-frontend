# Clone the Repository
```bash
git clone https://github.com/RanaElansary/task-manager-frontend.git                                                                                                                          
cd task-manager-frontend
```
## Frontend

- React + TypeScript
- React Router DOM (for page navigation)
- Axios (HTTP client)
- LocalStorage for JWT persistence
  
# Frontend Setup(new terminal):
```bash
cd front-end
npm install
npm start
```


Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Important Decisions During Implementation

### Frontend 

1. **Using React with TypeScript**  
   The frontend is built using React and TypeScript.  

   **Why?**  
   - Makes the UI dynamic  
   - TypeScript reduces errors

2. **Custom UI (No Library)**  
   I did not use Bootstrap or Material UI.  
   I wrote my own CSS.  

   **Why?**  
   - Full control over design  
   - Better understanding of CSS

3. **Dividing UI into Components**  
   The app is split into small parts like:  
   - Login form  
   - Signup form  
   - Task form  
   - Task list  

   **Why?**  
   - Reusable code  
   - Easier to edit later

4. **Using Axios for API Calls**  
   Axios is used to connect frontend with backend.  
   Token is sent automatically with each request.  

   **Why?**  
   - Cleaner code  
   - Easier API communication

5. **Using Auth Context**  
   Authentication data is saved in AuthContext.  

   **Why?**  
   - Keeps login info available everywhere  
   - Easy logout and login

6. **Protecting Pages**  
   Task page is only visible after login.  

   **Why?**  
   - Better security  
   - Better user experience


