# Drive tutorial

## TODO

- [x] Set up database and data model
- [x] Move folder Open state to url (hoist navigation)
- [x] Add auth
- [x] Add file uploading
- [x] Add analytics using posthog

## notes - 36min

- [x] we set up the db for development and connected to it
- [x] add the schema of the tables
- [x] Manually insert examples
- [x]  render them in the ui

## notes - 1.07.11min

- [x] inserted mock data into db

## notes 1.25.11min

- [x] Change folder to link components, remove client state
- [x] clean up database and data fetching patterns

## notes 2:20:46 min

- [x] Add ownership to files
- [x]  Upload fiiles to the correct folder
- [x]  Delete files button
- [x] Allow files thay arent images to be uploaded
- [x] Display file type and file sizes correctly in the view
- [x] Retrieve the file type from uploadthing and save it in db
- [x] real homepage

## notes 2:40.44

- [x] Real homepage + onboarding

## followup

[ ] folder deletion - make sure to recursively delete all files and folders
[ ] create a server action that takes a name, parentid, and creates a folder with that name and parentid; (don't forget to set the owner id)

### Toasts

[ ] Notifications for user actions

### Access Control

[ ] When a user is signed in, they cannot view other users files
[ ] Try doing file sharing

### Make a file view page

[ ] make a page within which to view the file from

### Loading state for file

[ ] Grey out the file while it's being deleted

### folder and file management

[ ] Make the folder name editable
[ ] Make the file name editable
