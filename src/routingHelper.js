routes = [
  {
    method: 'GET',
    path: '/',
    name: "home"
  },
  {
    method: 'GET',
    path: '/login',
    name: "login" // TODO: criar o método no controller
  },
  {
    method: 'GET',
    path: '/logout',
    name: "logout" // TODO: criar o método no controller
  },
  {
    method: 'GET',
    path: '/profile',
    name: "profile" // TODO: criar o método no controller
  },
  {
    method: 'GET',
    path: '/companies/new',
    name: "newPartnerCompany" // TODO: criar o método no controller
  },
  {
    method: 'GET',
    path: '/events/new',
    name: "newEvent" // TODO: criar o método no controller
  },
  {
    method: 'GET',
    path: '/members/new',
    name: "newMember" // TODO: criar o método no controller
  },
  {
    method: 'GET',
    path: '/companies/search',
    name: "searchCompanies" // TODO: criar o método no controller
  },
  {
    method: 'GET',
    path: '/events/search',
    name: "searchEvents" // TODO: criar o método no controller
  },
  {
    method: 'GET',
    path: '/members/search',
    name: "searchMembers" // TODO: criar o método no controller
  },
  {
    method: 'POST',
    path: '/companies/new',
    name: 'newPartnerCompanyPOST'
  },
  {
    method: 'GET',
    path: '/companies/remove',
    name: "removeCompany" // TODO: criar o método no controller
  }
];

function setupRoute(server, route, controller) {
  server.route({
    method: route.method,
    path: route.path,
    handler: controller[route.name]
  });
}

module.exports = {
  routes,
  setupRoute
};