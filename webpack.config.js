var path = require("path");

module.exports = {
  entry: "./src/js/DatePicker.js",
  output: {
     library: "reg-date-picker",
     libraryTarget: 'umd', 
     path: path.resolve(__dirname, "dist"),
     filename: "DatePicker.bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test:/\.less$/,
        loader: "style-loader!css-loader!less-loader"
      },
      {
        test: /.(png|gif|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/, 
        loader: "url-loader?limit=100000&outputPath=img/"
      }      
    ]
  }
};