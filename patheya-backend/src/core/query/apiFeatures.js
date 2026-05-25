class APIFeatures {

  constructor(

    query,

    queryString

  ) {

    this.query = query;

    this.queryString =
      queryString;

  }

  // ==========================
  // FILTER
  // ==========================

  filter() {

    const queryObj = {

      ...this.queryString

    };

    const excludedFields = [

      'page',

      'sort',

      'limit',

      'fields',

      'search'

    ];

    excludedFields.forEach(

      el => delete queryObj[el]

    );

    this.query =
      this.query.find(queryObj);

    return this;

  }

// ==========================
// SEARCH
// ==========================

search(fields = []) {

  if (

    this.queryString.search &&

    fields.length > 0

  ) {

    const keyword =
      this.queryString.search;

    const searchQuery = {

      $or: fields.map(field => ({

        [field]: {

          $regex: keyword,

          $options: 'i'

        }

      }))

    };

    this.query =
      this.query.find(
        searchQuery
      );

  }

  return this;

}

  // ==========================
  // SORT
  // ==========================

  sort() {

    if (this.queryString.sort) {

      const sortBy =
        this.queryString.sort
          .split(',')
          .join(' ');

      this.query =
        this.query.sort(sortBy);

    }

    else {

      this.query =
        this.query.sort(
          '-createdAt'
        );

    }

    return this;

  }

  // ==========================
  // FIELD LIMITING
  // ==========================

  limitFields() {

    if (

      this.queryString.fields

    ) {

      const fields =
        this.queryString.fields
          .split(',')
          .join(' ');

      this.query =
        this.query.select(fields);

    }

    return this;

  }

  // ==========================
  // PAGINATION
  // ==========================

  paginate() {

    const page =
      this.queryString.page * 1 || 1;

    const limit =
      this.queryString.limit * 1 || 10;

    const skip =
      (page - 1) * limit;

    this.query =
      this.query
        .skip(skip)
        .limit(limit);

    return this;

  }

}

module.exports =
  APIFeatures;