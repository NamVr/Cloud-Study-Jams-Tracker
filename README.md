# Cloud Jam Tracker

Welcome to the my version of **Google Cloud Study Jams Tracker** for GDG Chandigarh University! This open-source project is a dynamic, feature-rich web application built to track and display the progress of participants in the Google Cloud Study Jams. It provides a gamified and engaging experience for the community.

## ✨ About The Project

This platform was created to provide live progress updates, leaderboards, and important resources for participants of the Google Cloud Study Jams organized by GDG CU. It aims to foster a sense of competition and community by visualizing individual and team achievements.

### Built With

The project leverages a modern, robust, and scalable tech stack:

*   [Next.js](https://nextjs.org/) - The React Framework for the Web
*   [React](https://react.dev/) - A JavaScript library for building user interfaces
*   [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript for robust applications
*   [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework

## 🚀 Key Features

As per the project blueprint, the tracker includes:

-   **🏠 Landing Page**: A central dashboard displaying key metrics like total participants, overall completion rate, and a countdown timer. It also highlights the top performers of the day.
-   **📚 Syllabus & Learning Path**: A dedicated section with 20 course cards, showing difficulty levels, completion status, and links to resources.
-   **🏆 Progress & Leaderboard**: A live leaderboard of all participants, highlighting the top performers with special badges and medals.
-   **🤝 Team Leaderboard**: A view to showcase team rankings, mentor profiles, and team-wise progress charts.
-   **ℹ️ About Section**: A static page with information about the Study Jams program, GDG CU, and the organizing team.
-   **🌙 Dark Mode**: A sleek, user-friendly dark mode toggle, with the default set to dark for a modern feel.
-   **📱 Fully Responsive**: A beautiful and consistent experience across all devices, from mobile to desktop.

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your development machine:

*   **Node.js**: Version 18.18.0 or later. You can download it from [nodejs.org](https://nodejs.org/).
*   **npm**, **yarn**, or **pnpm**: A package manager for JavaScript. This guide will use `npm`.

### Installation

1.  **Clone the repository**
    ```sh
    git clone https://github.com/NamVr/Cloud-Study-Jams-Tracker.git
    cd Cloud-Study-Jams-Tracker
    ```

2.  **Install dependencies**
    ```sh
    npm install
    ```

3.  **Run the development server**
    ```sh
    npm run dev
    ```

4.  Open http://localhost:3000 with your browser to see the result.

### Understanding the Data

The project currently uses static data from JSON files to populate the leaderboards and user progress.

*   `src/database.json`: This file contains the main database of all participants, including their progress, rank, and team information.

To customize the data, you can modify these files. The structure is self-explanatory and easy to update. Python scripts will be provided soon to create the JSON database.

## 🔧 Hosting & Deployment

The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.

Check out the Next.js deployment documentation for more details on how to deploy to Vercel or other platforms like Netlify, AWS, or your own server.

### Steps for Vercel Deployment

1.  **Push your code** to a Git repository (GitHub, GitLab, Bitbucket).
2.  **Import your project** on Vercel.
3.  Vercel will automatically detect that you are using Next.js and will configure the build settings for you.
4.  **Deploy!** Your application will be live in minutes.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

Don't forget to give the project a star! Thanks again!

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📧 Contact

Project Link: https://github.com/NamVr/Cloud-Study-Jams-Tracker

---