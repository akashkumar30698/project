# HD Notes - Full-Stack Note-Taking Application

A modern, full-stack note-taking application with authentication and real-time synchronization.

## Features

- **Authentication**: Email/OTP and Google sign-in
- **Note Management**: Create, view, and delete notes
- **Real-time Sync**: Notes sync across devices
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Secure**: JWT-based authorization with Supabase

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Authentication**: Supabase Auth with OTP and OAuth
- **Icons**: Lucide React
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Supabase:
   - Create a new Supabase project at https://supabase.com
   - Copy your project URL and anon key
   - Create a `.env.local` file with your Supabase credentials:
     ```
     VITE_SUPABASE_URL=your_supabase_project_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. Set up the database schema (run these SQL commands in your Supabase SQL editor):
   ```sql
   -- Create profiles table
   CREATE TABLE profiles (
     id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
     name TEXT NOT NULL,
     email TEXT NOT NULL,
     date_of_birth DATE,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create notes table
   CREATE TABLE notes (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
     title TEXT NOT NULL,
     content TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Enable Row Level Security
   ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
   ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

   -- Create policies
   CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
   CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
   CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

   CREATE POLICY "Users can view own notes" ON notes FOR SELECT USING (auth.uid() = user_id);
   CREATE POLICY "Users can create notes" ON notes FOR INSERT WITH CHECK (auth.uid() = user_id);
   CREATE POLICY "Users can update own notes" ON notes FOR UPDATE USING (auth.uid() = user_id);
   CREATE POLICY "Users can delete own notes" ON notes FOR DELETE USING (auth.uid() = user_id);

   -- Create function to handle user profile creation
   CREATE OR REPLACE FUNCTION handle_new_user() 
   RETURNS TRIGGER AS $$
   BEGIN
     INSERT INTO public.profiles (id, name, email, date_of_birth)
     VALUES (
       NEW.id,
       COALESCE(NEW.raw_user_meta_data->>'name', ''),
       NEW.email,
       CASE 
         WHEN NEW.raw_user_meta_data->>'date_of_birth' IS NOT NULL 
         THEN (NEW.raw_user_meta_data->>'date_of_birth')::DATE 
         ELSE NULL 
       END
     );
     RETURN NEW;
   END;
   $$ LANGUAGE plpgsql SECURITY DEFINER;

   -- Create trigger for new user
   CREATE TRIGGER on_auth_user_created
     AFTER INSERT ON auth.users
     FOR EACH ROW EXECUTE FUNCTION handle_new_user();
   ```

5. Configure Google OAuth (optional):
   - Go to Supabase Dashboard > Authentication > Providers
   - Enable Google provider
   - Add your Google OAuth credentials

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at http://localhost:5173

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/          # React components
│   ├── AuthLayout.tsx   # Authentication layout
│   ├── SignUpForm.tsx   # User registration form
│   ├── SignInForm.tsx   # User login form
│   ├── OtpVerification.tsx # OTP verification
│   └── Dashboard.tsx    # Main dashboard with notes
├── contexts/            # React contexts
│   └── AuthContext.tsx  # Authentication context
├── lib/                 # Utilities and configurations
│   └── supabase.ts     # Supabase client setup
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## Features

### Authentication
- Email and password registration with OTP verification
- Google OAuth sign-in
- Secure JWT tokens
- Profile management

### Notes
- Create notes with title and content
- View all personal notes
- Delete notes
- Real-time synchronization
- Responsive grid layout

### Security
- Row Level Security (RLS) policies
- JWT token authorization
- User data isolation
- Secure API endpoints

## Deployment

This application can be deployed to any static hosting service like:
- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages

Make sure to add your environment variables to your hosting platform.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.