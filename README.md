# wfh-request-system

## Overview
This is a Work-from-Home (WFH) Management Software designed to help users log in, track WFH requests from others via a calendar table, and submit their own requests. The project showcases the implementation of a modern React application, emphasizing effective state management, smooth user interactions, real-time data updates, and a clean, user-friendly UI/UX design.

### Key Features

* Login
* Dashboard show WFH Requests and User Information
* View WFH Requests
* Request WFH through Calendar
* Request WFH through Form
* Toggle theme
* Validation - Restrict 3 users per day for WFH request
* Network Mock JSON API - Prepopulate table with 3 users
* Persistent Data with local storage
* Custom Hooks
* Unit tests
* TypeScript
* Deployed to Vercel


## Key Architectural Decisions
Set up with React and Vite with Tailwind.css for styling.

* Vite: I like Vite with React, as development is much faster for hot reloading and bundling and find it useful if creating SSG and SSR applications over CRA. It does have some frustrations, as I mention in Challenges Faced, but overall I like to use it with React applications.
* TailwindCSS: I am a huge fan of TailwindCSS and use it on 99% of projects now. I like the way you can use Tailwind classes and responsive design is much easier.
* Event Emitter: As I often use Websockeets for a full stack application, not ever used it for a React only side without a backend, so wanted to implement my own emitter. HOWEVER, due to issues I couldn't really get this working, see Challenges Faced.
* Feature based architecture: Though I tend to use Next.js for most of my applications and like the App Router and the architecure; I like to set up my projects based on features as easier to find code.
* API Mock: I used Mocky.io which I haven't used before and was very easy to implement. I used this one as it was free and the first one I found.
* State Management: I used two state management; ContextAPI for the User logged in and for handling WFH requests, I used Zustand. I thought about using Redux, but for preference I chose Zustand as more familiar with it, simpler to implement, easy to persist the store, easier to implement and I think Redux works better for bigger applications than this one.
* Storage: To persist data, used Local Storage, which I set through Zustand store.
* Calendar: My aim was to get the app working with a MVP o just set it for a week. In a real application, will have more than one week and let the user choose which month and week etc.

## Challenges Faced 

* Vite and unit testing - Why
* Real time updates - Why
* Calendar - Why
* Repopulating the data - Why
* Unit tests - Why

## Outstanding Items Not Delivered
Though tried to implement all in time; a couple of items were not delivered.

* Real time updates - See Challenges faced. Ran into issues getting events to work on the frontend among tabs. As time was running out and other features needed to be applied. I put this on hold. SOLUTION - Will try to get event emitter to work or apply web sockets after Christmas.
* Register - This was a Nice To Have and ran out of time to implement.
* Tooltip - This was a Nice To Have and almost implemented and stopped due to time.
* Transitions - This was a Nice To Have and almost implemented and stopped due to time.
* Weekly Calendar - At the moment the calendar WFH requests is just for the 23rd December to 27th December. In a real application, would extend to weeks for the whole year.


## Getting Started
1. Clone project.
2. Run `npm i` to install the modules.
3. Run `npm run dev` in the root directory.
4. The terminal will show which localhost port to use. By default the site will be at `http://localhost:5173/`.

## Using the application
1. In the Login screen, follow the validation instructions and enter any name, email, password and role (role has no importance, just a job description)
2. Once logged in, you will be redirected to the Dashboard.
3. Default API mock users will load into the Calendar.
4. Your logged in user will appear at the top of the table.
5. Either add the range of dates you wish to request or select the day in the row in the table for the user logged in.
6. Once a request has been sent, you can hover over the request in the calendar to delete it.
7. You can open another tab and add other users (but real time updates are not applied).
8. To reset the data added and clear the storage, click Logout.

## Code

## Deployment



