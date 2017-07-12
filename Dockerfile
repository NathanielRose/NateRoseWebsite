# The 'FROM' instruction specifies the base image. I am extending 
# the jekyll/jekyll image
FROM jekyll/jekyll

# Expose 4000 for our app
EXPOSE  4000

# Make a directory for out application
RUN mkdir \app

# Copy local files to our app directory 
ADD . /home 


CMD ["jekyll", "serve", "--force_polling", "-s", "./"]
