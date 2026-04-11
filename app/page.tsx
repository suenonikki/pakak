'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activePage, setActivePage] = useState('home');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    // Load the dashboard script after component mounts
    if (isLoggedIn) {
      const script = document.createElement('script');
      script.src = '/dashboard.js';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <>
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          :root {
            --background: #F5E4CF;
            --foreground: #1a1a2e;
            --card: #ffffff;
            --card-foreground: #1a1a2e;
            --primary: #275CCC;
            --primary-foreground: #F5E4CF;
            --secondary: #e8d4bd;
            --secondary-foreground: #275CCC;
            --muted-foreground: #6b7280;
            --border: #d4c4ad;
            --water-light: #a8d4f5;
            --water-medium: #5ba8e6;
            --water-dark: #275CCC;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: var(--background);
            color: var(--foreground);
            overflow-x: hidden;
          }

          .login-container {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background: linear-gradient(135deg, var(--primary), #5ba8e6);
            padding: 20px;
          }

          .login-card {
            background: var(--card);
            border-radius: 24px;
            padding: 40px;
            max-width: 400px;
            width: 100%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          }

          .login-header {
            text-align: center;
            margin-bottom: 32px;
          }

          .login-title {
            font-size: 28px;
            font-weight: bold;
            color: var(--foreground);
            margin-bottom: 8px;
          }

          .login-subtitle {
            font-size: 14px;
            color: var(--muted-foreground);
          }

          .form-group {
            margin-bottom: 16px;
          }

          .form-label {
            display: block;
            font-size: 14px;
            font-weight: 600;
            color: var(--foreground);
            margin-bottom: 8px;
          }

          .form-input {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid var(--border);
            border-radius: 12px;
            font-size: 14px;
            color: var(--foreground);
            background: var(--card);
            transition: all 0.3s;
            box-sizing: border-box;
          }

          .form-input:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(39, 92, 204, 0.1);
          }

          .login-button {
            width: 100%;
            padding: 12px 16px;
            background: var(--primary);
            color: var(--primary-foreground);
            border: none;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            margin-top: 24px;
          }

          .login-button:hover:not(:disabled) {
            background: #1f4aa8;
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(39, 92, 204, 0.3);
          }

          .login-button:disabled {
            background: var(--border);
            color: var(--muted-foreground);
            cursor: not-allowed;
            opacity: 0.6;
          }

          @media (max-width: 640px) {
            .login-card {
              padding: 32px 24px;
            }

            .login-title {
              font-size: 24px;
            }
          }
        `}</style>

        <div className="login-container">
          <div className="login-card">
            <div className="login-header">
              <h1 className="login-title">💧 Water Monitor</h1>
              <p className="login-subtitle">Sign in to your account</p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label className="form-label" htmlFor="username">Username</label>
                <input 
                  id="username"
                  className="form-input"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  aria-label="Username input"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="password">Password</label>
                <input 
                  id="password"
                  className="form-input"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-label="Password input"
                />
              </div>

              <button 
                className="login-button"
                type="submit"
                disabled={!username.trim() || !password.trim()}
                aria-label="Login button"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --background: #F5E4CF;
          --foreground: #1a1a2e;
          --card: #ffffff;
          --card-foreground: #1a1a2e;
          --primary: #275CCC;
          --primary-foreground: #F5E4CF;
          --secondary: #e8d4bd;
          --secondary-foreground: #275CCC;
          --muted-foreground: #6b7280;
          --border: #d4c4ad;
          --water-light: #a8d4f5;
          --water-medium: #5ba8e6;
          --water-dark: #275CCC;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background-color: var(--background);
          color: var(--foreground);
          overflow-x: hidden;
        }

        .container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        main {
          flex: 1;
          overflow-y: auto;
          padding-bottom: 100px;
        }

        .content {
          padding: 32px 24px;
        }

        .top-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          padding: 12px 0;
          border-bottom: 2px solid rgba(39, 92, 204, 0.1);
        }

        .nav-left {
          display: flex;
          gap: 8px;
        }

        .nav-button {
          background: var(--card);
          border: 2px solid transparent;
          padding: 10px 20px;
          border-radius: 16px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          color: var(--muted-foreground);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .nav-button:hover {
          background-color: var(--primary);
          color: var(--primary-foreground);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(39, 92, 204, 0.2);
        }

        .nav-button.active {
          background-color: var(--primary);
          color: var(--primary-foreground);
          border-color: var(--primary);
          box-shadow: 0 6px 16px rgba(39, 92, 204, 0.3);
        }

        .header {
          margin-bottom: 32px;
        }

        .header-subtitle {
          font-size: 14px;
          color: var(--muted-foreground);
          margin-bottom: 4px;
        }

        .header-title {
          font-size: 24px;
          font-weight: bold;
          color: var(--foreground);
        }

        .alert {
          display: flex;
          gap: 12px;
          padding: 16px;
          margin-bottom: 24px;
          border-radius: 16px;
          background-color: rgba(39, 92, 204, 0.1);
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .alert-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 18px;
        }

        .alert-content {
          flex: 1;
        }

        .alert-title {
          font-weight: 600;
          color: var(--foreground);
          margin-bottom: 4px;
        }

        .alert-message {
          font-size: 14px;
          color: var(--muted-foreground);
        }

        .alert-close {
          background: none;
          border: none;
          color: var(--muted-foreground);
          cursor: pointer;
          font-size: 24px;
          font-weight: bold;
          transition: color 0.2s;
        }

        .alert-close:hover {
          color: var(--foreground);
        }

        .hidden {
          display: none;
        }

        .water-card {
          border-radius: 24px;
          background: linear-gradient(to bottom, #d4edfc, #a8d4f5);
          padding: 24px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          margin-bottom: 24px;
        }

        .water-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
        }

        .water-card-left {
          flex: 1;
        }

        .water-card-label {
          font-size: 14px;
          font-weight: 500;
          color: var(--primary);
          margin-bottom: 4px;
        }

        .water-card-value {
          font-size: 24px;
          font-weight: bold;
          color: var(--foreground);
        }

        .water-card-right {
          text-align: right;
        }

        .water-card-goal-label {
          font-size: 14px;
          color: var(--muted-foreground);
          margin-bottom: 4px;
        }

        .water-card-goal {
          font-weight: 600;
          color: var(--foreground);
        }

        .glass-container {
          position: relative;
          width: 128px;
          height: 208px;
          margin: 0 auto 24px;
          border-radius: 16px;
          border: 4px solid rgba(255, 255, 255, 0.7);
          background-color: rgba(255, 255, 255, 0.3);
          box-shadow: inset 0 4px 12px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .glass-fill {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to bottom, #5ba8e6, #275CCC);
          transition: height 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .glass-wave {
          position: absolute;
          top: -2px;
          left: 0;
          width: 100%;
          height: 15px;
        }

        .glass-percentage {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          font-weight: bold;
          color: white;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          z-index: 2;
        }

        .bubble {
          position: absolute;
          background-color: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          left: 12px;
          animation: float 2s ease-in-out infinite;
        }

        .bubble.bubble1 {
          width: 8px;
          height: 8px;
          bottom: 8px;
          animation-duration: 2s;
        }

        .bubble.bubble2 {
          width: 6px;
          height: 6px;
          bottom: 16px;
          right: 16px;
          animation-duration: 2.5s;
          animation-delay: 0.5s;
        }

        .bubble.bubble3 {
          width: 4px;
          height: 4px;
          bottom: 24px;
          left: 20px;
          animation-duration: 1.8s;
          animation-delay: 0.3s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-20px) scale(1.1);
            opacity: 0.6;
          }
        }

        @keyframes wave {
          0%, 100% {
            transform: translateX(0) translateY(0);
          }
          50% {
            transform: translateX(-5px) translateY(2px);
          }
        }

        .chart-card {
          border-radius: 24px;
          background: linear-gradient(to bottom, #d4edfc, #a8d4f5);
          padding: 24px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          margin-bottom: 24px;
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .chart-info {
          flex: 1;
          min-width: 200px;
        }

        .chart-label {
          font-size: 14px;
          font-weight: 500;
          color: var(--primary);
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .chart-title {
          font-size: 24px;
          font-weight: bold;
          color: var(--foreground);
          margin-bottom: 8px;
        }

        .chart-time {
          font-size: 12px;
          color: var(--muted-foreground);
          font-weight: 500;
        }

        .chart-consumed {
          text-align: right;
        }

        .chart-consumed-label {
          font-size: 12px;
          color: var(--muted-foreground);
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 500;
        }

        .chart-consumed-value {
          font-weight: bold;
          color: var(--foreground);
          font-size: 24px;
        }

        .chart-container {
          position: relative;
          width: 100%;
          height: 280px;
          margin-bottom: 0;
          background-color: rgba(255, 255, 255, 0.5);
          border-radius: 20px;
          padding: 20px 20px 40px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(255, 255, 255, 0.3);
          overflow: visible;
        }

        .chart-svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .button-group {
          display: flex;
          gap: 16px;
          justify-content: center;
          align-items: center;
        }

        .btn {
          border: none;
          border-radius: 50%;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .btn:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        }

        .btn:active {
          transform: scale(0.95);
        }

        .btn-minus {
          width: 48px;
          height: 48px;
          background-color: rgba(255, 255, 255, 0.6);
          color: var(--primary);
          font-size: 24px;
          font-weight: bold;
        }

        .btn-add {
          width: 56px;
          height: 56px;
          background-color: var(--primary);
          color: var(--primary-foreground);
          font-size: 24px;
          font-weight: bold;
        }

        .btn-add100 {
          width: 48px;
          height: 48px;
          background-color: rgba(255, 255, 255, 0.6);
          font-size: 13px;
          font-weight: 600;
          color: var(--primary);
        }

        .grid-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-top: 24px;
        }

        .stat-card {
          border-radius: 16px;
          background-color: var(--card);
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .stat-header {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
          align-items: center;
        }

        .stat-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-icon.red {
          background-color: #fee2e2;
          color: #ef4444;
        }

        .stat-icon.orange {
          background-color: #fed7aa;
          color: #f59e0b;
        }

        .stat-label {
          font-size: 14px;
          color: var(--muted-foreground);
        }

        .stat-value {
          font-size: 28px;
          font-weight: bold;
          color: var(--foreground);
          margin-bottom: 4px;
        }

        .stat-unit {
          font-size: 13px;
          color: var(--muted-foreground);
        }

        .summary-card {
          border-radius: 16px;
          background-color: var(--card);
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          margin-top: 24px;
        }

        .card-title {
          font-weight: 600;
          color: var(--foreground);
          margin-bottom: 16px;
        }

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          text-align: center;
        }

        .summary-item-value {
          font-size: 20px;
          font-weight: bold;
          color: var(--primary);
          margin-bottom: 4px;
        }

        .summary-item-label {
          font-size: 11px;
          color: var(--muted-foreground);
        }

        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: var(--foreground);
          margin-bottom: 16px;
          margin-top: 24px;
        }

        .devices-container {
          margin-bottom: 24px;
        }

        .device-card {
          border-radius: 16px;
          background-color: var(--secondary);
          padding: 16px;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 16px;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .device-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background-color: rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          flex-shrink: 0;
        }

        .device-info {
          flex: 1;
        }

        .device-name {
          font-size: 16px;
          font-weight: 600;
          color: var(--foreground);
          margin-bottom: 4px;
        }

        .device-status {
          font-size: 12px;
          color: var(--muted-foreground);
        }

        .device-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        .battery {
          font-size: 12px;
          color: var(--muted-foreground);
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .connected-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 12px;
          background-color: rgba(16, 185, 129, 0.1);
          color: #10b981;
          font-size: 12px;
          font-weight: 600;
        }

        .connected-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #10b981;
        }

        .page-container {
          display: none;
          animation: fadeIn 0.3s ease-in;
        }

        .page-container.active {
          display: block;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .activity-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .activity-card {
          background: var(--card);
          padding: 20px;
          border-radius: 16px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          border-left: 4px solid var(--primary);
        }

        .activity-time {
          font-size: 12px;
          color: var(--muted-foreground);
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .activity-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--foreground);
          margin-bottom: 4px;
        }

        .activity-details {
          font-size: 14px;
          color: var(--muted-foreground);
        }

        .profile-header {
          display: flex;
          align-items: center;
          gap: 16px;
          background: var(--card);
          padding: 24px;
          border-radius: 16px;
          margin-bottom: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .profile-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary), var(--water-medium));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          flex-shrink: 0;
        }

        .profile-info h2 {
          font-size: 20px;
          font-weight: 600;
          color: var(--foreground);
          margin-bottom: 4px;
        }

        .profile-info p {
          font-size: 14px;
          color: var(--muted-foreground);
        }

        .profile-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .stat-box {
          background: var(--card);
          padding: 16px;
          border-radius: 16px;
          text-align: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .stat-box-value {
          font-size: 24px;
          font-weight: bold;
          color: var(--primary);
          margin-bottom: 4px;
        }

        .stat-box-label {
          font-size: 12px;
          color: var(--muted-foreground);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        @media (max-width: 640px) {
          .content {
            padding: 24px 16px;
          }

          .summary-grid {
            grid-template-columns: 1fr;
            text-align: left;
            gap: 12px;
          }

          .device-meta {
            flex-direction: column;
            align-items: flex-end;
            gap: 8px;
          }

          .nav-left {
            gap: 4px;
          }

          .nav-button {
            padding: 8px 16px;
            font-size: 13px;
          }

          .profile-header {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>

      <div className="container">
        <main>
          <div className="content">
            <div className="top-nav">
              <div className="nav-left">
                <button 
                  className={`nav-button ${activePage === 'home' ? 'active' : ''}`}
                  onClick={() => setActivePage('home')}
                >
                  📊 Home
                </button>
              </div>
              <div className="nav-left">
                <button 
                  className={`nav-button ${activePage === 'activity' ? 'active' : ''}`}
                  onClick={() => setActivePage('activity')}
                >
                  ⚡ Activity
                </button>
                <button 
                  className={`nav-button ${activePage === 'profile' ? 'active' : ''}`}
                  onClick={() => setActivePage('profile')}
                >
                  👤 Profile
                </button>
              </div>
            </div>

            <div className={`page-container ${activePage === 'home' ? 'active' : ''}`}>
              <div className="header">
                <p className="header-subtitle">Good morning</p>
                <h1 className="header-title">Stay Hydrated</h1>
              </div>

            <div id="alert" className="alert">
              <div className="alert-icon">💧</div>
              <div className="alert-content">
                <div className="alert-title">Great job!</div>
                <div className="alert-message" id="alert-message">You have reached your daily hydration goal! 🎉</div>
              </div>
              <button className="alert-close" onClick={() => (document.getElementById('alert') as HTMLElement).classList.add('hidden')}>×</button>
            </div>

            <div className="water-card">
              <div className="water-card-header">
                <div className="water-card-left">
                  <p className="water-card-label">Water Intake</p>
                  <p className="water-card-value"><span id="intake-value">1340</span>ml</p>
                </div>
                <div className="water-card-right">
                  <p className="water-card-goal-label">Goal</p>
                  <p className="water-card-goal">1000ml</p>
                </div>
              </div>

              <div className="glass-container">
                <div className="glass-fill" id="glass-fill" style={{height: '100%'}}>
                  <svg className="glass-wave" viewBox="0 0 100 15" preserveAspectRatio="none">
                    <path d="M0,8 Q25,0 50,8 T100,8 L100,15 L0,15 Z" fill="#5ba8e6" style={{animation: 'wave 2s ease-in-out infinite'}}/>
                  </svg>
                  <div className="bubble bubble1"></div>
                  <div className="bubble bubble2"></div>
                  <div className="bubble bubble3"></div>
                </div>
                <div className="glass-percentage" id="glass-percentage">100%</div>
              </div>

              <div className="button-group">
                <button className="btn btn-minus" onClick={() => (window as any).addWater(-100)}>−</button>
                <button className="btn btn-add" onClick={() => (window as any).addWater(250)}>+</button>
                <button className="btn btn-add100" onClick={() => (window as any).addWater(100)}>+100</button>
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <div className="chart-info">
                  <p className="chart-label">Water Intake</p>
                  <p className="chart-title">Today</p>
                </div>
                <div className="water-stats">
                  <div className="stat">
                    <p className="stat-label">Consumed</p>
                    <p className="stat-value"><span id="water-consumed">1000</span>ml</p>
                  </div>
                  <div className="stat">
                    <p className="stat-label">Remaining</p>
                    <p className="stat-value"><span id="water-remaining">0</span>ml</p>
                  </div>
                </div>
                <div className="chart-consumed">
                  <p className="chart-consumed-label">Total Consumed</p>
                  <p className="chart-consumed-value"><span id="chart-total-ml">1000</span>ml</p>
                </div>
              </div>

              <div className="chart-container">
                <svg className="chart-svg" id="drinking-chart" viewBox="0 0 600 150" preserveAspectRatio="none">
                  <line x1="0" y1="30" x2="600" y2="30" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
                  <line x1="0" y1="60" x2="600" y2="60" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
                  <line x1="0" y1="90" x2="600" y2="90" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
                  <line x1="0" y1="120" x2="600" y2="120" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>

                  <text x="5" y="35" fontSize="10" fill="var(--muted-foreground)" dy="0.3em">1000ml</text>
                  <text x="5" y="65" fontSize="10" fill="var(--muted-foreground)" dy="0.3em">750ml</text>
                  <text x="5" y="95" fontSize="10" fill="var(--muted-foreground)" dy="0.3em">500ml</text>
                  <text x="5" y="125" fontSize="10" fill="var(--muted-foreground)" dy="0.3em">250ml</text>

                  <line x1="40" y1="0" x2="40" y2="140" stroke="rgba(255,255,255,0.5)" strokeWidth="2"/>
                  <line x1="40" y1="140" x2="600" y2="140" stroke="rgba(255,255,255,0.5)" strokeWidth="2"/>

                  <defs>
                    <linearGradient id="chart-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#5ba8e6', stopOpacity: 0.4}} />
                      <stop offset="100%" style={{stopColor: '#275CCC', stopOpacity: 0.05}} />
                    </linearGradient>
                  </defs>
                  <polyline id="chart-area" points="" fill="url(#chart-gradient)" stroke="none"/>
                  <polyline id="chart-line" points="" fill="none" stroke="#275CCC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <g id="chart-points"></g>

                  <text x="50" y="155" fontSize="10" fill="var(--muted-foreground)" textAnchor="start">12 AM</text>
                  <text x="150" y="155" fontSize="10" fill="var(--muted-foreground)" textAnchor="middle">4 AM</text>
                  <text x="250" y="155" fontSize="10" fill="var(--muted-foreground)" textAnchor="middle">8 AM</text>
                  <text x="350" y="155" fontSize="10" fill="var(--muted-foreground)" textAnchor="middle">12 PM</text>
                  <text x="450" y="155" fontSize="10" fill="var(--muted-foreground)" textAnchor="middle">4 PM</text>
                  <text x="550" y="155" fontSize="10" fill="var(--muted-foreground)" textAnchor="middle">8 PM</text>
                </svg>
              </div>
            </div>

            <div className="grid-2">
              <div className="stat-card">
                <div className="stat-header">
                  <div className="stat-icon red">❤️</div>
                  <span className="stat-label">Heart Rate</span>
                </div>
                <p className="stat-value" id="heart-rate">118</p>
                <p className="stat-unit">BPM</p>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <div className="stat-icon orange">🌡️</div>
                  <span className="stat-label">Body Temp</span>
                </div>
                <p className="stat-value" id="temp-value">36.8</p>
                <p className="stat-unit">°C</p>
              </div>
            </div>

            <div className="summary-card">
              <h3 className="card-title">Today&apos;s Summary</h3>
              <div className="summary-grid">
                <div>
                  <p className="summary-item-value" id="hydration-percent">100%</p>
                  <p className="summary-item-label">Hydration</p>
                </div>
                <div>
                  <p className="summary-item-value">8</p>
                  <p className="summary-item-label">Drinks</p>
                </div>
                <div>
                  <p className="summary-item-value">45</p>
                  <p className="summary-item-label">Active min</p>
                </div>
              </div>
            </div>

            <h2 className="section-title">Connected Devices</h2>
            <div className="devices-container">
              <div className="device-card">
                <div className="device-icon">⌚</div>
                <div className="device-info">
                  <p className="device-name">Smart Wristband</p>
                  <p className="device-status">Last sync: Just now</p>
                </div>
                <div className="device-meta">
                  <span className="battery">🔋 78%</span>
                  <div className="connected-badge">
                    <div className="connected-dot"></div>
                    Connected
                  </div>
                </div>
              </div>

              <div className="device-card">
                <div className="device-icon">💧</div>
                <div className="device-info">
                  <p className="device-name">HydroFlow Tumbler</p>
                  <p className="device-status">Water level: 65%</p>
                </div>
                <div className="device-meta">
                  <span className="battery">🔋 92%</span>
                  <div className="connected-badge">
                    <div className="connected-dot"></div>
                    Connected
                  </div>
                </div>
              </div>
            </div>
            </div>

            {/* Activity Page */}
            <div className={`page-container ${activePage === 'activity' ? 'active' : ''}`}>
              <div className="header">
                <p className="header-subtitle">Your Daily Activities</p>
                <h1 className="header-title">Activity Log</h1>
              </div>

              <div className="activity-grid">
                <div className="activity-card">
                  <div className="activity-time">Today, 6:00 AM</div>
                  <div className="activity-title">Morning Hydration</div>
                  <div className="activity-details">Drank 250ml of water to start the day</div>
                </div>

                <div className="activity-card">
                  <div className="activity-time">Today, 9:00 AM</div>
                  <div className="activity-title">Mid-Morning Boost</div>
                  <div className="activity-details">Drank 200ml during work break</div>
                </div>

                <div className="activity-card">
                  <div className="activity-time">Today, 12:30 PM</div>
                  <div className="activity-title">Lunch Time Hydration</div>
                  <div className="activity-details">Drank 300ml with lunch</div>
                </div>

                <div className="activity-card">
                  <div className="activity-time">Today, 3:00 PM</div>
                  <div className="activity-title">Afternoon Refresh</div>
                  <div className="activity-details">Drank 150ml to stay focused</div>
                </div>

                <div className="activity-card">
                  <div className="activity-time">Today, 6:00 PM</div>
                  <div className="activity-title">Evening Hydration</div>
                  <div className="activity-details">Drank 100ml before dinner</div>
                </div>
              </div>

              <div className="summary-card">
                <h3 className="card-title">Activity Summary</h3>
                <div className="summary-grid">
                  <div>
                    <p className="summary-item-value">5</p>
                    <p className="summary-item-label">Total Drinks</p>
                  </div>
                  <div>
                    <p className="summary-item-value">1000ml</p>
                    <p className="summary-item-label">Total Volume</p>
                  </div>
                  <div>
                    <p className="summary-item-value">5h 45m</p>
                    <p className="summary-item-label">Time Span</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Page */}
            <div className={`page-container ${activePage === 'profile' ? 'active' : ''}`}>
              <div className="profile-header">
                <div className="profile-avatar">👤</div>
                <div className="profile-info">
                  <h2>Alex Johnson</h2>
                  <p>Health & Wellness Enthusiast</p>
                </div>
              </div>

              <div className="profile-stats">
                <div className="stat-box">
                  <div className="stat-box-value">28</div>
                  <div className="stat-box-label">Age</div>
                </div>
                <div className="stat-box">
                  <div className="stat-box-value">72</div>
                  <div className="stat-box-label">Heart Rate</div>
                </div>
                <div className="stat-box">
                  <div className="stat-box-value">98%</div>
                  <div className="stat-box-label">O2 Level</div>
                </div>
              </div>

              <div className="summary-card">
                <h3 className="card-title">Weekly Statistics</h3>
                <div className="summary-grid">
                  <div>
                    <p className="summary-item-value">89%</p>
                    <p className="summary-item-label">Avg Hydration</p>
                  </div>
                  <div>
                    <p className="summary-item-value">7500ml</p>
                    <p className="summary-item-label">Weekly Total</p>
                  </div>
                  <div>
                    <p className="summary-item-value">42</p>
                    <p className="summary-item-label">Days Streak</p>
                  </div>
                </div>
              </div>

              <div className="summary-card">
                <h3 className="card-title">Goals & Preferences</h3>
                <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                  <div style={{padding: '12px 0', borderBottom: '1px solid rgba(0,0,0,0.05)'}}>
                    <p style={{fontWeight: 600, marginBottom: '4px', color: 'var(--foreground)'}}>Daily Goal</p>
                    <p style={{color: 'var(--muted-foreground)', fontSize: '14px'}}>1000ml per day</p>
                  </div>
                  <div style={{padding: '12px 0', borderBottom: '1px solid rgba(0,0,0,0.05)'}}>
                    <p style={{fontWeight: 600, marginBottom: '4px', color: 'var(--foreground)'}}>Reminder Frequency</p>
                    <p style={{color: 'var(--muted-foreground)', fontSize: '14px'}}>Every 2 hours</p>
                  </div>
                  <div style={{padding: '12px 0'}}>
                    <p style={{fontWeight: 600, marginBottom: '4px', color: 'var(--foreground)'}}>Member Since</p>
                    <p style={{color: 'var(--muted-foreground)', fontSize: '14px'}}>January 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
