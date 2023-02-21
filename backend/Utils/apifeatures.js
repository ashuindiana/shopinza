class ApiFeatures {
  constructor(dbMethod, queryStr) {
    this.dbMethod = dbMethod;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.dbMethod = this.dbMethod.find({ ...keyword });
    return this;
  }

  filter() {
    const queryStrCopy = { ...this.queryStr };

    //Fields to be removed
    const toBeRemovedFields = ["keyword", "page", "limit"];

    toBeRemovedFields.forEach((data) => delete queryStrCopy[data]);

    //Filter for price and rating
    let queryStrCopy2 = JSON.stringify(queryStrCopy);
    queryStrCopy2 = queryStrCopy2.replace(
      /\b(gt|lt|gte|lte)\b/g,
      (key) => `$${key}`
    );

    this.dbMethod = this.dbMethod.find(JSON.parse(queryStrCopy2));
    return this;
  }

  pagination(resultsPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultsPerPage * (currentPage - 1);
    this.dbMethod = this.dbMethod.limit(resultsPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
