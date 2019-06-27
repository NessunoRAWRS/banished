module.exports = {
    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/assets/css/_variables.scss";`
            }
        }
    },
    devServer: {
        proxy: 'https://www.pathofexile.com'
    }
};