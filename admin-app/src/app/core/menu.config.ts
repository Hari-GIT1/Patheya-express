export const MENU_ITEMS = [

  {
    label: 'Dashboard',

    icon: 'fas fa-chart-line',

    route: '/dashboard',

    roles: [

      'super_admin',

      'operations_admin',

      'finance_admin',

      'support_admin',

      'marketing_admin'

    ]
  },

  {
    label: 'Orders',

    icon: 'fas fa-shopping-bag',

    route: '/orders',

    roles: [

      'super_admin',

      'operations_admin'

    ]
  },

  {
    label: 'Pending Restaurants',

    icon: 'fas fa-store',

    route: '/pending-restaurants',

    roles: [

      'super_admin',

      'operations_admin'

    ]
  },

  {
    label: 'Finance',

    icon: 'fas fa-wallet',

    route: '/finance',

    roles: [

      'super_admin',

      'finance_admin'

    ]
  },

  {
    label: 'Support',

    icon: 'fas fa-headset',

    route: '/support',

    roles: [

      'super_admin',

      'support_admin'

    ]
  },

  {
    label: 'Marketing',

    icon: 'fas fa-bullhorn',

    route: '/marketing',

    roles: [

      'super_admin',

      'marketing_admin'

    ]
  },

  {
    label: 'Admin Management',

    icon: 'fas fa-user-shield',

    route: '/admin-management',

    roles: [

      'super_admin'

    ]
  }

];