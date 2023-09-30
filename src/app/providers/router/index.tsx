import type { Router } from '@remix-run/router'
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { BaseLayout } from 'app/layouts/base'
import { GuestLayout } from 'app/layouts/guest'

const BenchesPage = lazy(() => import('pages/benches'))
const HomePage = lazy(() => import('pages/home'))
const LoginPage = lazy(() => import('pages/login'))
const TagsPage = lazy(() => import('pages/tags'))
const UIKitPage = lazy(() => import('pages/UIKit'))
const UsersPage = lazy(() => import('pages/users'))
const AdminsPage = lazy(() => import('pages/admins'))
const ReportsCommentsPage = lazy(() => import('pages/reports-comments'))

// TODO: Добавить atomic-router

export const router: Router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/uikit',
        element: <UIKitPage />
      },
      {
        path: '/benches',
        element: <BenchesPage />
      },
      {
        path: '/users',
        element: <UsersPage />,
      },
      {
        path: '/admins',
        element: <AdminsPage />,
      },
      {
        path: '/tags',
        element: <TagsPage />,
      },
      {
        path: '/reports-comments',
        element: <ReportsCommentsPage />,
      },
    ]
  },
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />
      }
    ]
  },
])
