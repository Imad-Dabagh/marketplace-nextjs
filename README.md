# Modern Full-Stack Marketplace

A fully functional, modern marketplace application built with the latest web technologies including Next.js, React, Tailwind CSS, and MongoDB. The platform provides a seamless experience for users to browse, create, and manage product listings with a robust authentication system and beautiful UI.

## 🚀 Features

- **Authentication & Authorization**: Secure login and registration using NextAuth.js with credential management and role-based access control (Admin & User roles).
- **Interactive UI**: Fluid animations and interactions using Framer Motion and shadcn/ui.
- **Product Listings**: Comprehensive CRUD operations for marketplace listings.
- **Image Uploads**: Seamless image handling and cloud storage integration via Cloudinary.
- **Advanced Routing**: Utilizes Next.js App Router features including intercepting routes (e.g., auth modals) and parallel routes.
- **User Dashboard & Profile**: Dedicated spaces for users to manage their listings and profile details.
- **Admin Panel**: Dedicated admin routes for platform management.
- **Form Validation**: Robust client and server-side validation using Zod.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Frontend**: [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/), [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database**: [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Validation**: [Zod](https://zod.dev/)
- **Image Hosting**: [Cloudinary](https://cloudinary.com/)

## 📂 Project Structure

```text
├── app/
│   ├── (auth)/        # Authentication routes (login, register)
│   ├── (main)/        # Main app routes (dashboard, listings, profile, admin)
│   ├── @authModal/    # Intercepting route for auth modal
│   └── api/           # Backend API routes
├── components/        # Reusable React components (UI & Layout)
├── models/            # Mongoose schemas (User, Listing, Category)
├── lib/               # Utility functions and configurations
├── public/            # Static assets
└── data/              # Mock data or initial seeds
```

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- Node.js (v18 or higher)
- npm, pnpm, or yarn
- A MongoDB URI
- A Cloudinary Account

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd marketplace-nextjs
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add the following based on the `.env.example` file:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   
   # Cloudinary Variables
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the app:**
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
