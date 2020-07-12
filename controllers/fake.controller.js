const axios  = require('axios');

const getAirlines = (req, res) => {
    const data = [
        {
            source: 'Mumbai',
            destination: 'Delhi',
            fromDate: '2020-06-05',
            toDate: '2020-06-10'
        },
        {
            source: 'Delhi',
            destination: 'Chennai',
            fromDate: '2020-05-05',
            toDate: '2020-06-05'
        },
        {
            source: 'Chennai',
            destination: 'Hydrabad',
            fromDate: '2020-04-05',
            toDate: '2020-04-05'
        },
        {
            source: 'Mumbai',
            destination: 'Hydrabad',
            fromDate: '2020-06-05',
            toDate: '2020-06-06'
        },
        {
            source: 'Mumbai',
            destination: 'Chennai',
            fromDate: '2020-06-05',
            toDate: '2020-06-10'
        },
        {
            source: 'Mumbai',
            destination: 'Delhi',
            fromDate: '2020-05-05',
            toDate: '2020-06-05'
        },
        {
            source: 'Delhi',
            destination: 'Mumbai',
            fromDate: '2020-04-05',
            toDate: '2020-04-05'
        },
        {
            source: 'Mumbai',
            destination: 'Delhi',
            fromDate: '2020-06-05',
            toDate: '2020-06-10'
        },
        {
            source: 'Chennai',
            destination: 'Mumbai',
            fromDate: '2020-06-05',
            toDate: '2020-06-10'
        },
        {
            source: 'Chennai',
            destination: 'Hydrabad',
            fromDate: '2020-05-05',
            toDate: '2020-06-05'
        },
        {
            source: 'Hydrabad',
            destination: 'Mumbai',
            fromDate: '2020-04-05',
            toDate: '2020-04-05'
        },
        {
            source: 'Hydrabad',
            destination: 'Delhi',
            fromDate: '2020-06-05',
            toDate: '2020-06-10'
        },
        {
            source: 'Mumbai',
            destination: 'Pune',
            fromDate: '2020-06-05',
            toDate: '2020-06-10'
        },
        {
            source: 'Pune',
            destination: 'Delhi',
            fromDate: '2020-05-05',
            toDate: '2020-06-05'
        },
        {
            source: 'Pune',
            destination: 'Delhi',
            fromDate: '2020-06-05',
            toDate: '2020-06-11'
        },
        {
            source: 'Mumbai',
            destination: 'Delhi',
            fromDate: '2020-04-05',
            toDate: '2020-04-05'        },
        {
            source: 'Mumbai',
            destination: 'Pune',
            fromDate: '2020-06-05',
            toDate: '2020-06-10'
        },
        {
            source: 'Mumbai',
            destination: 'Pune',
            fromDate: '2020-05-05',
            toDate: '2020-06-05'
        },
        {
            source: 'Delhi',
            destination: 'Pune',
            fromDate: '2020-01-05',
            toDate: '2020-01-10'
        },
        {
            source: 'Pune',
            destination: 'Delhi',
            fromDate: '2020-05-05',
            toDate: '2020-06-05'
        }
    ];
    let filterData = Array.from(data);
    let paginatedData = [];
    let {
        source,
        destination,
        fromDate,
        toDate,
        page,
        size
    } = req.query;

    if (filterData.length && source) {
        filterData = filterData.filter(item => item.source.toLowerCase().includes(source.toLowerCase()));
    }

    if (filterData.length && destination) {
        filterData = filterData.filter(item => item.destination.toLowerCase().includes(destination.toLowerCase()));
    }

    if (filterData.length && fromDate) {
        filterData = filterData.filter(item => new Date(item.fromDate) >= new Date(fromDate.toString()));
}

    if (filterData.length && toDate) {
        filterData = filterData.filter(item => new Date(item.toDate) <= new Date(toDate.toString()));
    }

    if(page && size) {
        let startIndex = page * 1 * size * 1;
        let endIndex = startIndex + size * 1;
        let paginatedData = Array.from(filterData);
        filterData = [];
        for(let i = startIndex; i < endIndex; i++ ) {
            filterData.push(paginatedData[i]);
        }
    }

    filterData = filterData.filter(item => item);

    return res.send(filterData);
}

const getBlogs = (req, res) => {
    let queryParams = req.query;
    axios.get("https://public-api.wordpress.com/rest/v1.1/sites/en.blog.wordpress.com/posts/", {
        params: queryParams
    })
    .then((resp) => {
        res.status(200).send(resp.data)
    }, (error) => {
        res.status(400).send(error)
    });
};

const getBlog = (req, res) => {
    let id = req.params.id
    axios.get(`https://public-api.wordpress.com/rest/v1.1/sites/en.blog.wordpress.com/posts/${id}`)
    .then((resp) => {
        res.status(200).send(resp.data)
    }, (error) => {
        res.status(400).send(error)
    });    
};

const getRelatedBlog  = (req, res) => {
    let id = req.params.id;

    axios.get(`https://public-api.wordpress.com/rest/v1/sites/107403796/posts/${id}/related`)
    .then((resp) => {
        res.status(200).send(resp.data)
    }, (error) => {
        res.status(400).send(error)
    });
};

module.exports = {
    getAirlines,
    getBlogs,
    getBlog,
    getRelatedBlog
}