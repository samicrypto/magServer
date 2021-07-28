const roles = ['user', 'admin'];

const scope = {
  // Admin Route Scope
  CU:       'create:user',
  SU:       'show:users',
  SUBI:     'show:user-by-id',

  // App File Route Scope
  CAF:      'create:app-file',
  EAF:      'edit: app-file',
  UA:       'upload: apk',
  CNV:      'check: new-version',

  // Tutorial File Route Scope
  CTF:      'create: tutorial-file',
  UI:       'upload:image',
  UV:       'upload:video',
  UA:       'upload:audio',
  UD:       'upload:docs',
  PTF:      'paginate: tutorial-file',
  GTFD:     'get: tutorial-file-details',
  ETF:      'edit: tutorial-file',
  DTF:      'delete: tutorial-file'
};

const admin = [ scope.CU, scope.SU ];
const user  = [ scope.SUBI, scope.CAF, scope.EAF, scope.UA, scope.CTF ];

roleRights = (role) => {
  switch(role) {
    case 'admin':
      return admin.concat(user);

    case 'user':
      return user;
  }
};


module.exports = {
  scope,
  roles,
  roleRights,
};
