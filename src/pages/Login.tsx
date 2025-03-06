
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  useEffect(() => {
    document.title = 'Login | KilometerTracker';
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-background to-secondary">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at top right, rgba(59, 130, 246, 0.1), transparent 70%)",
        }}
      />
      
      <LoginForm />
      
      <p className="mt-8 text-sm text-muted-foreground">
        © {new Date().getFullYear()} KilometerTracker. All rights reserved.
      </p>
    </div>
  );
};

export default Login;
