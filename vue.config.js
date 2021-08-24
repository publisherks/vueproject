module.exports = {
    baseUrl: '/docs/',
    outputDir: 'docs',
    publicPath : process.env.NODE_ENV === 'production' ? '/vueproject/' : '/',
}