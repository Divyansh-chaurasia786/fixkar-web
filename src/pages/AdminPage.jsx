import React, { Suspense } from 'react';
import { useAuth } from '../context/AuthContext';
import { AdminLoginView } from '../components/admin/AdminLoginView';
import '../styles/admin-console.css';

const AdminDashboardView = React.lazy(() => import('../components/admin/AdminDashboardView').then(m => ({ default: m.AdminDashboardView })));
const SuperAdminDashboardView = React.lazy(() => import('../components/admin/SuperAdminDashboardView').then(m => ({ default: m.SuperAdminDashboardView })));

export function AdminPage({ onNavigate }) {
  const { isAdminAuthenticated, isSuperAdminAuthenticated } = useAuth();

  return (
    <div className="admin-page-root" style={{ width: '100%' }}>
      {!isAdminAuthenticated ? (
        <AdminLoginView onNavigateHome={() => onNavigate('home')} />
      ) : (
        <Suspense fallback={
          <div style={{ minHeight: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38BDF8', fontFamily: 'monospace' }}>
            ⚡ Loading Secure Command Matrix...
          </div>
        }>
          {isSuperAdminAuthenticated ? (
            <SuperAdminDashboardView onNavigateHome={() => onNavigate('home')} />
          ) : (
            <AdminDashboardView onNavigateHome={() => onNavigate('home')} />
          )}
        </Suspense>
      )}
    </div>
  );
}
