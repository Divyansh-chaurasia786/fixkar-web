import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

class StudioErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[Fixkar Studio Runtime Guard]', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: '#040711',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <div style={{
            background: 'rgba(10, 15, 26, 0.95)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            borderRadius: '20px',
            padding: '32px',
            maxWidth: '560px',
            textAlign: 'center',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)'
          }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '12px', color: '#FCA5A5' }}>Fixkar Studio Notice</h2>
            <p style={{ fontSize: '0.86rem', color: '#CBD5E1', marginBottom: '16px', lineHeight: 1.6 }}>
              {this.state.error ? this.state.error.message || String(this.state.error) : 'The workspace encountered an issue.'}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.hash = '';
                window.location.reload();
              }}
              style={{
                background: '#2563EB',
                border: 'none',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '999px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.88rem'
              }}
            >
              Reload Fixkar Studio
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StudioErrorBoundary>
      <App />
    </StudioErrorBoundary>
  </React.StrictMode>
);
