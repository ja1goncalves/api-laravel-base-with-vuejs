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
  // {
  //   url: "/apps/email",
  //   name: "Email",
  //   slug: "email",
  //   icon: "MailIcon",
  //   i18n: "Email",
  // },
  {
    url: "/dashboard/analytics",
    name: 'Dashboard',
    // tag: '2',
    tagColor: 'warning',
    icon: 'HomeIcon',
    i18n: 'Dashboard',
    // submenu: [
    //   {
    //     url: '/dashboard/analytics',
    //     name: 'Analytics',
    //     slug: 'dashboard-analytics',
    //     i18n: 'Analytics'
    //   },
    //   {
    //     url: '/dashboard/ecommerce',
    //     name: 'eCommerce',
    //     slug: 'dashboard-ecommerce',
    //     i18n: 'eCommerce'
    //   }
    // ]
  },
  {
    header: 'Modules',
    icon: 'PackageIcon',
    i18n: 'Módulos',
    items: [
        {
            url: '/apps/user/user-list',
            name: 'Users',
            slug: 'app-user-list',
            icon: 'UsersIcon',
            i18n: 'Usuários',
            isDisabled: false
        },
     ],
  },
  {
    header: 'Apps',
    icon: 'PackageIcon',
    i18n: 'Apps',
    items: [
      {
        url: '/apps/email',
        name: 'Email',
        slug: 'email',
        icon: 'MailIcon',
        i18n: 'Email'
      },
      // {
      //   url: '/apps/chat',
      //   name: 'Chat',
      //   slug: 'chat',
      //   icon: 'MessageSquareIcon',
      //   i18n: 'Chat'
      // },
      // {
      //   url: '/apps/todo',
      //   name: 'Todo',
      //   slug: 'todo',
      //   icon: 'CheckSquareIcon',
      //   i18n: 'Todo'
      // },
      {
        url: '/apps/calendar/vue-simple-calendar',
        name: 'Calendar',
        slug: 'calendar-simple-calendar',
        icon: 'CalendarIcon',
        tagColor: 'success',
        i18n: 'Calendar'
      },
      {
        url: null,
        name: 'eCommerce',
        icon: 'ShoppingCartIcon',
        i18n: 'eCommerce',
        submenu: [
          {
            url: '/apps/eCommerce/shop',
            name: 'Shop',
            slug: 'ecommerce-shop',
            i18n: 'Shop'
          },
          {
            url: '/apps/eCommerce/item/',
            name: 'Item Details',
            slug: 'ecommerce-item-detail-view',
            i18n: 'ItemDetails'
          },
          {
            url: '/apps/eCommerce/wish-list',
            name: 'Wish List',
            slug: 'ecommerce-wish-list',
            i18n: 'WishList'
          },
          {
            url: '/apps/eCommerce/checkout',
            name: 'Checkout',
            slug: 'ecommerce-checkout',
            i18n: 'Checkout'
          }
        ]
      },
    ]
  },
  // {
  //   header: 'Forms & Table',
  //   icon: 'Edit3Icon',
  //   i18n: 'FormsAndTable',
  //   items: [
  //     {
  //       url: null,
  //       name: 'Form Elements',
  //       icon: 'CopyIcon',
  //       i18n: 'FormElements',
  //       submenu: [
  //         // {
  //         //  url: '/forms/form-elements/select',
  //         //  name: "Select",
  //         //  slug: "form-element-select",
  //         //  i18n: "Select",
  //         // },
  //         {
  //           url: '/forms/form-elements/switch',
  //           name: 'Switch',
  //           slug: 'form-element-switch',
  //           i18n: 'Switch'
  //         },
  //         {
  //           url: '/forms/form-elements/checkbox',
  //           name: 'Checkbox',
  //           slug: 'form-element-checkbox',
  //           i18n: 'Checkbox'
  //         },
  //         {
  //           url: '/forms/form-elements/radio',
  //           name: 'Radio',
  //           slug: 'form-element-radio',
  //           i18n: 'Radio'
  //         },
  //         {
  //           url: '/forms/form-elements/input',
  //           name: 'Input',
  //           slug: 'form-element-input',
  //           i18n: 'Input'
  //         },
  //         {
  //           url: '/forms/form-elements/number-input',
  //           name: 'Number Input',
  //           slug: 'form-element-number-input',
  //           i18n: 'NumberInput'
  //         },
  //         {
  //           url: '/forms/form-elements/textarea',
  //           name: 'Textarea',
  //           slug: 'form-element-textarea',
  //           i18n: 'Textarea'
  //         }
  //       ]
  //     },
  //     {
  //       url: '/forms/form-layouts',
  //       name: 'Form Layouts',
  //       icon: 'PackageIcon',
  //       slug: 'forms-form-layouts',
  //       i18n: 'FormLayouts'
  //     },
  //     {
  //       url: '/forms/form-wizard',
  //       name: 'Form Wizard',
  //       icon: 'PackageIcon',
  //       slug: 'extra-component-form-wizard',
  //       i18n: 'FormWizard'
  //     },
  //     {
  //       url: '/forms/form-validation',
  //       name: 'Form Validation',
  //       icon: 'CheckCircleIcon',
  //       slug: 'extra-component-form-validation',
  //       i18n: 'FormValidation'
  //     },
  //     {
  //       url: '/forms/form-input-group',
  //       name: 'Form Input Group',
  //       icon: 'MenuIcon',
  //       slug: 'extra-component-form-input-group',
  //       i18n: 'FormInputGroup'
  //     },
  //     {
  //       url: '/ui-elements/table',
  //       name: 'Table',
  //       slug: 'table',
  //       icon: 'GridIcon',
  //       i18n: 'Table'
  //     },
  //     {
  //       url: '/ui-elements/ag-grid-table',
  //       name: 'agGrid Table',
  //       slug: 'ag-grid-table',
  //       icon: 'GridIcon',
  //       i18n: 'agGridTable'
  //     }
  //   ]
  // },
  {
    header: 'Pages',
    icon: 'FileIcon',
    i18n: 'Pages',
    items: [
      {
        url: '/pages/profile',
        slug: 'page-profile',
        name: 'Profile',
        icon: 'UserIcon',
        i18n: 'Profile'
      },
      {
        url: '/pages/faq',
        slug: 'page-faq',
        name: 'FAQ',
        icon: 'HelpCircleIcon',
        i18n: 'FAQ'
      },
      {
        url: '/pages/invoice',
        slug: 'page-invoice',
        name: 'Invoice',
        icon: 'InfoIcon',
        i18n: 'Invoice'
      },
    ]
  },
]

