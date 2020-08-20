/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [
  {
    url: "/dashboard/analytics",
    name: 'Dashboard',
    // tag: '2',
    tagColor: 'warning',
    icon: 'HomeIcon',
    i18n: 'Dashboard',
  },
  {
    header: 'Modules',
    icon: 'PackageIcon',
    i18n: 'Módulos',
    items: [
      {
        url: '/apps/tickets/tickets-list',
        name: 'Tickets',
        slug: 'app-tickets-list',
        icon: 'BookmarkIcon',
        i18n: 'Bilhetes',
        isDisabled: true
      },
      {
        url: '/apps/clients/clients-list',
        name: 'Clients',
        slug: 'app-clients-list',
        icon: 'UserIcon',
        i18n: 'Clientes',
        isDisabled: true
      },
      {
        url: '/apps/partner-brands/clients-list',
        name: 'Partner Brands',
        slug: 'app-partner-brands-list',
        icon: 'BriefcaseIcon',
        i18n: 'Marcas Parceiras',
        isDisabled: true
      },
      {
        url: '/apps/awards/clients-list',
        name: 'Awards',
        slug: 'app-awards-list',
        icon: 'GiftIcon',
        i18n: 'Prêmios',
        isDisabled: true
      },
     ],
  },
  {
    header: 'Configurations',
    icon: 'SettingsIcon',
    i18n: 'Configurações',
    items: [
      {
        url: '/apps/modules/modules-list',
        name: 'Modules',
        slug: 'app-modules-list',
        icon: 'GridIcon',
        i18n: 'Módulos',
        isDisabled: false
      },
      {
          url: '/apps/user/user-list',
          name: 'Users',
          slug: 'app-user-list',
          icon: 'UsersIcon',
          i18n: 'Usuários',
          isDisabled: false
      },
      {
          url: '/apps/categories/categories-list',
          name: 'Categories',
          slug: 'app-categories-list',
          icon: 'TagIcon',
          i18n: 'Categorias',
          isDisabled: false
      },
     ],
  },
]

