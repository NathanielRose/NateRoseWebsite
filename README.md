# Jekyll Blog Website on Azure App Services 
  
    
So I was searching around the internet for the best way to make a simple website for technical blogging. I want to start sharing learnings and experiences with certain frameworks and projects with the community to get constructive open conversations.

Before starting my search, I had a few requirements going in...

* **No WordPress!**
* Blog post entries should be written in a markdown file (since I'm used to writing them for Github repositories).
*  Minimalist Site that is optimized and responsive for mobile viewing.
* Integration to Social Media sites (Medium & Twitter).
* Triggers that automatically push new posts to said sites when new post has been added to the site.
* Simple Navigation menu

To condense several hours worth of ~~Googling~~ *Binging*, I made this quick chart of how I landed on using Jekyll as my blog framework.

 > **Note** - Had issues with ghost and didnt bother to really see why I was getting an error just for signing up with the service. Left a bad taste in my mouth so... I'll pass. [See Here](assets\img\github_readme\ghosterror.png)


## Getting Started with Jekyll

**Why Jekyll** - 
* Jekyll is **SIMPLE**
* Uses Markdown for content
* Ruby for Infrastructure and plumbing
* Version control is built in
* Its used widely

To start you should find a Jekyll theme that suitsthe style you're looking for. You can find Jekyll themes [here](http://jekyllthemes.org/). 
I decided to use the **[Moon](https://taylantatli.github.io/Moon)** theme. Moon is a minimal, one column jekyll theme but I made a few edits. Here are some things you get with the Moon them:
* Minimal, you can focus on your content
* Responsive
* Disqus integration
* Syntax highlighting
* Optional post image
* Social icons
* Page for sharing projects
* Optional background image
* Simple navigation menu
* MathJax support

## How to use the Moon Theme

### Installation
* Fork the [Moon repo](https://github.com/nathanielrose/Moon/fork)
* Edit `_config.yml` file.
* Remove sample posts from `_posts` folder and add yours.
* Edit `index.md` file in `about` folder.
* Change repo name to `YourUserName.github.io`

### Site Setup
A quick checklist of the files you’ll want to edit to get up and running can be found [here](https://github.com/TaylanTatli/Moon/blob/master/_posts/2016-03-21-moon-theme.md)  

### My Site Wide Configuration Edits
`_config.yml` is main spot you'll make your edits. Open it up and personalize it. Most variables are self explanatory but here's an explanation of each if needed:

#### jekyll issues

If you go bare and install Taylan's original Moon theme and run into Gem issues such as `verify_gemfile_dependencies_are_found!`, try this:
``` 
PS C:\> gem cleanup

PS C:\> bundle update

PS C:\> bundle exec jekyll new website

New jekyll site installed in C:/.

```
#### Adding a new post

Inside the sits _post directory, create a new md file and label it in this format:  `year`-`month`-`day`-[Post_Title].md 

Jekyll will then recompile the directory and add use this post layout to create a new page for the post.

#### Change site variables

If you want to change the site background color or tex color use the `_sass/variable.scss` file to change the value

#### Changing the favicon

Inside _includes/head.html you will see the section that handles setting the site values for the favicons. Simply edit the values to your images and the site will render it appropriately. *Will require to serve the site again.*

#### Add a new tab in the navigation bar

Inside the `_data/navigation.yml` See below on how to add custom tabs to the navigation bar
 ``` ruby 
 title: Resume
  url: /assets/NathanielRose_CV.pdf
```

## Running your Jekyll site in a Docker Container

To implement continuous integration and continuous deployment for hosting the site, I decided to package the jekyll site into a docker image. This allows you to control the dependencies for your jekyll environment in a packaged method.

Install [Docker for Windows](https://docs.docker.com/docker-for-windows/install/).

Register for [DockerHub](https://hub.docker.com/).

Sign into your DockerHub account using the Docker configuration settings icon.

Below is the Dockerfile I used for my jekyll website. Add it to your ite directory.

``` Dockerfile
# The 'FROM' instruction specifies the base image. I am extending 
# the jekyll/jekyll image
FROM jekyll/jekyll

# Expose 4000 for our app
EXPOSE  4000

# Make a directory for out application
WORKDIR  /app

# Copy local files to our app directory 
COPY . /app


CMD ["jekyll", "serve", "--force_polling", "-s", "./"]

```

Open a powershell window from your jekyll site directory.

Run the following two commands:

``` Powershell

> docker build -t <yourdockerhubusername>/jekyll .

> docker run -p 4000:4000 <yourdockerhubusername>/jekyll
```

After the ruby gems are installed and dependencies are compiled you'll receive the ip address of where your jekyll docker container site is being served.

``` cmd
Bundle complete! 6 Gemfile dependencies, 36 gems now installed.
Use `bundle info [gemname]` to see where a bundled gem is installed.
The latest bundler is 1.15.3, but you are currently running 1.15.1.
To update, run `gem install bundler`
Configuration file: ./_config.yml
            Source: ./
       Destination: /app/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
                    done in 5.055 seconds.
 Auto-regeneration: enabled for './'
Configuration file: ./_config.yml
    Server address: http://0.0.0.0:4000/
  Server running... press ctrl-c to stop.
  ```
Navigate to that ip address and you will see your site running.

<img src="assets\img\github_readme\localdocker.png" width="700">

Use ctrl-c to return back to the powershell line.

To remove the container  run the `docker images` command to get the `Container ID`.

Then run the following commands to remove the container and image from your environment.

``` powershell
> docker rm --force <containerID>

> docker rmi --force <yourdockerhubusername>/jekyll

```

## Deploying your Jekyll Docker image to Azure

Now that we have our site running successfully in a local Docker container, lets push it to our website host or cloud provider. In this example I am using Microsoft Azure as my cloud provider and targeting the Azure Web Ap Service on Linux preview. We will configure our web app to restart each time a new image is pushed to our Docker Hub repository for the site.

To get started lets push our local jekyll site image to DockerHub

``` cmd

> docker push <yourdockerhubusername>/jekyll

```
> Be sure that you are signed into your docker hub account on Docker locally.

Navigate to hub.docker.com and you will your new docker image in the Repository listings.

In the Azure portal, under **Settings** for your App Service, open the Docker Container setting.

For **Image Source**, select Docker Hub.

For **Repository Access**, select Public.

Enter your image name and click **Save**.

<img src="assets\img\github_readme\dockerhubsetting.png" width="500">

Follow this [tutorial](https://docs.microsoft.com/en-us/azure/app-service-web/app-service-linux-ci-cd) and add a WebHook to your jekyll repo using your Web App publish profile. This will trigger your App service to restart when a new image is pushed.

In addition, be sure your app service has an Application Setting similar to below.

<img src="assets\img\github_readme\appsettings.png" width="700">
