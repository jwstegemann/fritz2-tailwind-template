// must be in the jsMain/resource folder
const mainCssFile = 'styles.css';

// tailwind config (https://tailwindcss.com/docs/configuration)
const tailwind = {
    darkMode: 'media',
    plugins: [
        // require('@tailwindcss/forms') // optional
    ],
    variants: {},
    theme: {
        extend: {},
    },
    content: {
        files: [
            '*.{js,html,css}',
            './kotlin/**/*.{js,html,css}'
        ],
        transform: {
            js: (content) => {
                return content.replaceAll(/(\\r)|(\\n)|(\\r\\n)/g,' ')
            }
        }
    },
};


// webpack tailwind css settings
((config) => {
    ((config) => {
        let entry = config.output.path + '/../processedResources/js/main/' + mainCssFile;
        config.entry.main.push(entry);
        config.module.rules.push({
            test: /\.css$/,
            use: [
                {loader: 'style-loader'},
                {loader: 'css-loader'},
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [
                                require("tailwindcss")({config: tailwind}),
                                require("autoprefixer"),
                                require("cssnano")
                            ]
                        }
                    }
                }
            ]
        });
    })(config);
})(config);