const config = {
  // Enable source maps in development mode
  sourceMap: true,

  // Prevent minification in development mode
  minify: process.env.NODE_ENV === "production",

  // Increase verbosity for better debugging information
  verbose: true
}

export default config
