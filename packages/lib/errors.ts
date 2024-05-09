export class SiteWithAliasExists extends Error {
  constructor() {
    super('Site with this alias already exists.');
  }
}

export class SitePageDataCreationFailed extends Error {
  constructor() {
    super('Failed to create Site or Page data. Please try again.');
  }
}

export class SiteMissingID extends Error {
  constructor() {
    super('Missing site ID.');
  }
}

export class NoAdminRights extends Error {
  constructor() {
    super('You are not permitted to do that.');
  }
}
