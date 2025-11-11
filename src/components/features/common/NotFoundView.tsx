import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export const NotFoundView = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'hsl(0, 0%, 96%)',
      paddingTop: '80px',
    }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1 style={{
          marginBottom: '1.5rem',
          fontSize: '4rem',
          fontWeight: '200',
          letterSpacing: '4px',
          color: 'hsl(0, 0%, 15%)',
        }}>404</h1>
        <p style={{
          marginBottom: '2rem',
          fontSize: '1.2rem',
          fontWeight: '300',
          letterSpacing: '1px',
          color: 'hsl(0, 0%, 45%)',
        }}>Página no encontrada</p>
        <a href="/" style={{
          color: 'hsl(355, 76%, 35%)',
          textDecoration: 'none',
          fontSize: '0.9rem',
          letterSpacing: '2px',
          fontWeight: '300',
          transition: 'opacity 0.3s ease',
        }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
           onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
          VOLVER AL INICIO
        </a>
      </div>
    </div>
  );
};

