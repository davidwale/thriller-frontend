# Frontend for Point Transfer Web Application

Welcome to the frontend repository of this Point Transfer Web Application! This repository contains the code for the client-side interface of the application, allowing users to interact with the system and transfer points between each other.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
- [Dependencies](#dependencies)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)

## Introduction

This Point Transfer Web Application is designed to facilitate the transfer of points between users. It allows registered users to transfer points to other users, view their transaction history, and manage their account.

This frontend repository is built using React.js, a popular JavaScript library for building user interfaces. It interacts with the backend API to perform operations such as user authentication, points transfer, and fetching user data.

## Features

- User registration and login
- Transfer points to other users
- Real-time display of charges based on the amount entered
- View transaction history

## Getting Started

To get started with the frontend of our application, follow the setup instructions below.

## Dependencies

The frontend of our application relies on the following dependencies:

- React.js
- Axios (for making HTTP requests)
- React Router (for routing within the application)
- react-icons
- react-loader-spinner

## Setup Instructions

1. Clone this repository to your local machine:

git clone https://github.com/davidwale/thriller-frontend.git

2. Install the dependencies using npm or yarn:

npm install or yarn install

3. Configure the backend API endpoint:

   - Create a `.env.development` file in the project directory.

   - Add this line `REACT_APP_API_PATH=API_URL/api` replace API_URL with your api endpoint.

## Usage

Once you have set up the frontend and backend of the application, you can start the development server:

npm start

or

yarn start
