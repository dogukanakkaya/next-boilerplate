/* eslint-disable @typescript-eslint/no-var-requires */
const { withSuperjson } = require('next-superjson');

module.exports = {
    ...withSuperjson()({}),
    images: {
        domains: ['lh3.googleusercontent.com']
    }
};