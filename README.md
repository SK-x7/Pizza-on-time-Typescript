# PizzaOnTime - A TypeScript Learning Project

## About the Project

**PizzaOnTime** is a fully client-rendered web application built with **React and Vite**. The main goal of this project was to enhance my **TypeScript** skills while building a functional and interactive pizza ordering system. Users can browse the menu, customize ingredients, place orders, and manage them using a secure PIN system.

## Live Demo
🚀 **Project Link**: https://pizza-on-time.vercel.app  

## Features

- **Menu Display**: Users can browse and select different pizzas from the menu.
- **Ingredient Customization**: Customize ingredients before placing an order.
- **Order Management**: Users set a PIN when placing an order, which is later required for modifications or cancellations.
- **Authentication**: Secure user authentication using **Supabase Auth**.
- **State Management**: Efficient state handling with **Redux Toolkit**.
- **Routing**: Implemented navigation using **React Router DOM**.
- **Data Fetching**: Utilized actions and various loader hooks in React Router DOM for efficient data fetching.
- **Notifications**: Toast messages using **React Hot Toast**.
- **Styling**: Fully responsive design using **Tailwind CSS**.

## Tech Stack

- **Frontend**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Database & Authentication**: [Supabase](https://supabase.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/SK-x7/Pizza-on-time-Typescript.git
   cd [path to your cloned folder]
   ```

2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Create a .env file in root directory:
   ```sh
   VITE_API_URL=https://react-fast-pizza-api.onrender.com/api
   VITE_SUPABASE_URL = YOUR_SUPABASE_URL
   VITE_SUPABASE_APIKEY = YOUR_SUPABASE_APIKEY
    ```

4. Start the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. Open the project in your browser at:
   ```
   http://localhost:5173
   ```

---

## Future Enhancements

🚀 **Planned Features:**
- Persistent state across sessions.
- Enhanced UI/UX with smoother animations.
- Performance optimizations and improved data fetching strategies.

---

### Author
👨‍💻 **Satyen Kharadi**  
📧 Contact: satyenkharadi@gmail.com  

---

Enjoy your pizza! 🍕

