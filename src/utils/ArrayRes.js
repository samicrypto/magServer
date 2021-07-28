// Sort Limit Skip Pgination function
function slsp(options) {
    const sort = {};
    if (options.sortBy) {
      const parts = options.sortBy.split(':');
      sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }
    const limit = options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 10;
    const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;
    const skip = (page - 1) * limit;

    return { sort, limit, skip, page }
};

function arrayRes(body, limit, page, message, statusCode) {
    const totalResults = body.length;
    let totalPages = Math.ceil(totalResults / limit);
    if(!limit) { totalPages = Math.ceil(totalResults / 10); }
    const result = {
      body,
      page,
      limit,
      totalPages,
      totalResults,
      message,
      statusCode
    };
    
    return result;
}

module.exports = { slsp, arrayRes };