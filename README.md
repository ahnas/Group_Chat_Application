
# Group Chat Application

This is a real-time Group chat application built with React for the frontend and Django for the backend. The application allows users to register,log in, send and receive messages via WebSocket, and interact in a chat environment.

## Features

- **User Registration**: New users can register for an account by providing their username, email, and password.
- **User Authentication**: Users can log in to the chat application with their credentials stored in `localStorage`.
- **Real-time Messaging**: The chat messages are sent and received in real-time using WebSocket.
- **Auto-scroll to Latest Message**: The chat automatically scrolls to the most recent message.
- **Message Formatting**: Each message displays the sender's name and timestamp.
- **Logout**: Users can log out from the application and are redirected to the login page.


## Requirements

- **React**: Frontend framework for building the user interface.
- **Django**: Backend framework to handle WebSocket connections.
- **WebSocket**: For real-time messaging between the frontend and backend.
- **LocalStorage**: Used for storing the logged-in username and access token.
- **date-fns**: For formatting timestamps of messages.

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ahnas/Group_Chat_Application.git
cd Group_Chat_Application
```

### 2. Install Dependencies

#### Frontend (React)

Navigate to the `group_chat_frontend` directory and install the required dependencies:

```bash
cd group_chat_frontend
npm install
```

#### Backend (Django)

Ensure you have Python and Django installed. Navigate to the `group_chat_backend` directory and install the required dependencies:

```bash
cd group_chat_backend
pip install -r requirements.txt
```

### 3. Start the Backend Server

Run the Django server to enable WebSocket connections:

```bash
cd group_chat_backend
daphne -b 127.0.0.1 -p 8000 backend.asgi:application

# python manage.py runserver
```

### 4. Start the Frontend Server

In a new terminal, navigate to the `group_chat_frontend` directory and start the React development server:

```bash
cd group_chat_frontend
npm start
```

The application should now be running on `http://localhost:3000` for the frontend and `http://localhost:8000` for the backend.

## Usage

1. Open the app in your browser (`http://localhost:3000`).
2. Log in or Register with your username and access token (stored in `localStorage`).
3. Start chatting with other users in real-time.
4. Press "Enter" to send a message or click the "Send" button.
5. Click the "Logout" button to log out.

## Technologies Used

- **Frontend**: React, React Router
- **Backend**: Django, Django Channels (for WebSockets)
- **Real-time Communication**: WebSocket
- **Storage**: LocalStorage
- **Date Formatting**: date-fns

## Contributing

If you want to contribute to this project, feel free to fork the repository and submit a pull request with your changes.

1. Fork the repo
2. Create a new branch for your feature
3. Make your changes
4. Commit your changes with a message
5. Push to your fork
6. Open a pull request

