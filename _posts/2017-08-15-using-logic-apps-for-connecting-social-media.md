---
layout: post
title:  "Using Logic Apps for Connecting Social Media"
date:   2017-08-15
excerpt: "Played around with logic apps to trigger social media integrated processes and continuous deployment with my website"
tag:
- logic apps 
- azure functions
- social media
- app services
- azure
comments: true
---
# Using Logic apps for API Integration and Continuous Deployment
  
    
Say you have a website, and you post new content (Blogs, Videos, Photos, Products) on it every so often. In order for you to get more hits on the page your content is on, you share via social media like Twitter, Instagram, Facebook etc. There are a good amount of integrators that allow you to post content to all social media platforms like Hootsuite, Buffer & Sprout.

Those are great when you want to post solely through the integration platforms to your social media accounts. But what if you host your own website and require integration that is triggered when new content is uploaded to your site directory?

This is where SaaS solutions like [IFTTT](https://ifttt.com/) and [Azure Logic Apps](https://azure.microsoft.com/en-us/services/logic-apps/) are pretty useful. You can use FTP triggers that are initiated when content is uploaded to your site directory and invoke a process of actions that target social media platforms or other things. The benefits here is that you dont need to manage how the API integration points connect, the solution manages that for you. In this example I use Azure Logic Apps to trigger a process that pushes blog posts written in markdown to Medium. I chose Azure Logic Apps since my jekyll blog site is hosted there (see my previous post).

## Basic Logic App Template - Instagram to Twitter

To get you familiar with the Logic App Designer, lets use one of the templates to set up a simple triggered pipe of API actions. Select the Post tweet for new Instagram Posts template. You will be promoted to authorize  Azure to have access to you Twitter & Instagram accounts. Sign In to your accounts.

<img src="https://natewebsite.blob.core.windows.net/post5/img1.png" width="300">

The template is pretty self explanatory but here are a few things to note:

* The Instagram upload post trigger can me configured to customize the interval of how often the API is checked for new content.
* The GET request that contains the content from your post has additional fields pertaining to your post that can be used for what ever you're looking to do.
    * I.E. User Info, Height of Image, Media ID, List of tags etc.

<img src="https://natewebsite.blob.core.windows.net/post5/img00.PNG" width="500">

## Trigger Logic Apps via FTP from Jekyll Site

My Jekyll site is hosted using Azure Web Apps on Linux. To upload a new post, I simply add a new md file in the `_posts` directory. We want to be able to publish a new Medium story every time I upload a post. To start lets create a trigger that is invoked anytime a file is added to my site.

Create a new Logic App.

Search and select the trigger: **When a file is added to a FTP server**

<img src="https://natewebsite.blob.core.windows.net/post5/img6.PNG" width="500">

Name the FTP  `connection name` and Grab the FTP `server address`, `user name` & `password` from the Linux Web App Publish Settings.
> You server address will look similar to ftp://waws-prod-am2-125.ftp.azurewebsites.windows.net/

Navigate to the blog post directory. Set the directory of how often you would like to check the site for new context in this folder. For testing purposes lets select every minute.

<img src="https://natewebsite.blob.core.windows.net/post5/img2.png" width="500">

Now lets send the output of our trigger to a [Request Bin](http://requestb.in).

Navigate to Request Bin and follow the instructions to create a webhook.

In the Logic App Designer add a new HTTP action.

Select POST as the Method and your new requestb.in URL for the Uri field. For the Body field use the File Content tab in quotations

<img src="https://natewebsite.blob.core.windows.net/post5/img3.png" width="500">

Now we need to test our trigger. You can do this by simply uploading a new file to the site or cp the contents of an existing file as a new name in the directory.
* Navigate to your Linux Web App for your Site.
* In the App Service Tabs select **Advanced Tools** under the Development Tools category.
* Click **Go** to navigate
* Inside the Kudu menu blah

Once you have triggered the logic app you will see the success status displayed in the portal blade. Refresh your Request Bin and you will see the contents of your file in the body

<img src="https://natewebsite.blob.core.windows.net/post5/img5.png" width="500">

## Using Azure Functions with your Logic App

When we return back to the designer we can select our next action to be post a Medium Story. Unfortunately, the connector only accepts the story to be in HTML format.

<img src="https://natewebsite.blob.core.windows.net/post5/img7.PNG" width="500">