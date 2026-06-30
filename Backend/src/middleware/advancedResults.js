/**
 * Reusable Advanced Querying Middleware.
 * Dynamically handles filtering, searching, sorting, selecting, and pagination
 * on any Mongoose model, making controllers incredibly thin and clean.
 */
const advancedResults = (model, populate) => async (req, res, next) => {
    let query;

    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude from data-matching filters (they are query operations)
    const removeFields = ['select', 'sort', 'page', 'limit', 'search'];
    removeFields.forEach(param => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Format operators ($gt, $gte, $lt, $lte, $in) from URL parameters
    // Example: ?age[gte]=18 -> {"age":{"gte":"18"}} -> {"age":{"$gte":"18"}}
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // Finding resource with filter conditions
    const filterObject = JSON.parse(queryStr);
    query = model.find(filterObject);

    // Regex text search on 'name' or 'email' fields
    // Example: ?search=john
    if (req.query.search) {
        const searchRegex = new RegExp(req.query.search, 'i');
        query = query.find({
            $or: [
                { name: searchRegex },
                { email: searchRegex }
            ]
        });
    }

    // Select fields
    // Example: ?select=name,email -> query.select('name email')
    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    // Sort
    // Example: ?sort=-createdAt,name -> query.sort('-createdAt name')
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('-createdAt'); // Default sort by newest first
    }

    // Pagination setup
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    // Count total matched records for pagination info
    const totalQuery = { ...filterObject };
    if (req.query.search) {
        const searchRegex = new RegExp(req.query.search, 'i');
        totalQuery.$or = [
            { name: searchRegex },
            { email: searchRegex }
        ];
    }
    const total = await model.countDocuments(totalQuery);

    query = query.skip(startIndex).limit(limit);

    // Run populate if present
    if (populate) {
        query = query.populate(populate);
    }

    // Executing query
    const results = await query;

    // Pagination metadata for client
    const pagination = {};

    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        };
    }

    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        };
    }

    // Attach results object to response
    res.advancedResults = {
        success: true,
        count: results.length,
        total,
        pagination,
        data: results
    };

    next();
};

module.exports = advancedResults;
