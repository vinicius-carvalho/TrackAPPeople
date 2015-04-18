# Require any additional compass plugins here.

# Paths configuration
css_dir = "www/css"
fonts_dir = "www/fonts"
images_dir = "www/img"
sass_dir = "sass"

# Output style of the compiled CSS
output_style = (environment == :production) ? :compressed : :expanded

# Prefere relative paths in the CSS
relative_assets = true

# Display the original location (SCSS file and line) of the selector
# Useful for debugging
line_comments = true

# SCSS and not SASS
preferred_syntax = :scss
