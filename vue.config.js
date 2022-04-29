module.exports = {
    outputDir: 'docs',
    publicPath : '/',
    devServer: {
        proxy: {
            '/1790387': {
                "target":"http://apis.data.go.kr",
                "changeOrigin":true,
                "secure":false
            },
        }
    }
}