# Frontend Applicant Test
Use this repository to create a simple app, with the following features/details, that paginates a list of users. Usage of React Hooks & ES6+ language features, when appropriate, is encouraged.

### Instructions / Details

- Create a public repo on GitHub/BitBucket with the source code from this repository
    - To download this repo: `git clone https://bitbucket.org/appsintegrations/react-frontend-applicant-test.git`
- Design is not taken into consideration but feel free to make it look nice if you wish.
- Please do not spend more than 4 hours on this.
- When finished, email us the link to the public repository. 

#### Part 1
- Fetch the users from [this endpoint](https://jsonplaceholder.typicode.com/users)
- Output an, alphabetically sorted, paginated list of users, displaying each user's name. There should be no more than 5 users listed at a time.
- Add two buttons called 'Previous' and 'Next', that, when clicked, paginate the list forwards or backwards.
- When on the first page, the 'Previous' button should be hidden. When on the last page, the 'Next' button should be hidden.
- Color the user's name green if their email address is from a .biz TLD.

*Example:* If there are 25 users, there would be 5 pages, each containing 5 users.

### Part 2
- Add a form below the paginated list with two input fields, one for name and one for email.
- Also include an "Add User" button.
- Clicking the "Add User" button should insert the form values, as a new user, into the list and reset the form values. 
- The user should be inserted into the correct, alphabetical, position within the list.
- The form should be validated prior to adding the new user.
    - The name field requires a first and last name to be valid.
    - The email field requires a valid email for it to be valid.
    - If either field is invalid, the user should not be able to add the user.
    - Display an error if an input is invalid.