---
layout: post
title:  "Using Azure Logic Apps for Connecting Social Media"
date:   2018-01-02
excerpt: "Played around with logic apps to trigger social media integrated processes and continuous deployment with my website"
tag:
- logic apps 
- azure functions
- social media
- app services
- azure
comments: true
---
# Using Azure Logic Apps for API Integration and Continuous Deployment
  
    
Say you have a website, and you post new content (Blogs, Videos, Photos, Products) on it every so often. In order for you to get more hits on the page your content is on, you share that content via social media like Twitter, Instagram, Facebook etc. There's a good amount of integrators that allow you to post content to all social media platforms autonomously like Hootsuite, Buffer & Sprout.

Those are great when you want to post solely through the integration platforms to your social media accounts. But what if you host your own website and require integration that is triggered when new content is uploaded to your site directory?

This is where triggered SaaS solutions like [IFTTT](https://ifttt.com/) and [Azure Logic Apps](https://azure.microsoft.com/en-us/services/logic-apps/) are pretty useful. You can use FTP triggers that are initiated when content is uploaded to your site directory and invoke a process of actions that target social media platforms or other things. The benefit here, is that you dont need to manage how the API integration points connect, the solution manages that for you. In this example I use Azure Logic Apps to trigger a process that pushes blog posts written in markdown to Medium. I chose Azure Logic Apps since my jekyll blog site is hosted there [see my previous post](http://www.naterose.io/creating-a-simple-jekyll-website-on-azure/).

## Basic Logic App Template - Instagram to Twitter

To get you familiar with the Logic App Designer, lets use one of the templates to set up a simple triggered pipe of API actions. Select the Post tweet for new Instagram Posts template. You will be prompted to authorize Azure to have access to your Twitter & Instagram accounts. Sign In to your accounts.

<img src="https://natewebsite.blob.core.windows.net/post5/img1.png" width="300">

The template is pretty self explanatory but here are a few things to note:

* The Instagram upload post trigger can me configured to customize the interval of how often the API is checked for new content.
* The GET request that contains the content from your post has additional fields pertaining to your post that can be used for what ever you're looking to do.
    * I.E. User Info, Height of Image, Media ID, List of tags etc.

<img src="https://natewebsite.blob.core.windows.net/post5/img00.PNG" width="500">

## Trigger Logic Apps via FTP from Jekyll Site

My Jekyll site is hosted using Azure Web Apps on Linux. To upload a new post, I simply add a new md file in the `_posts` directory. I want to be able to publish a new Medium story every time I upload a post. To start lets create a trigger that is invoked anytime a file is added to my site.

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

Now we need to test our trigger. You can do this by simply uploading a new file to the site or `cp` the contents of an existing file as a new name in the directory.
* Navigate to your Linux Web App for your Site.
* In the App Service Tabs select **Advanced Tools** under the Development Tools category.
* Click **Go** to navigate
* Inside the Kudu menu blah

Once you have triggered the logic app you will see the success status displayed in the portal blade. Refresh your Request Bin and you will see the contents of your file in the body

<img src="https://natewebsite.blob.core.windows.net/post5/img5.png" width="500">

## Using Azure Functions with your Logic App

When we return back to the designer we can select our next action to be **Write a Medium Story**. Unfortunately, the connector only accepts the story to be in HTML format.

<img src="https://natewebsite.blob.core.windows.net/post5/img7.PNG" width="500">

So we'll have to create some quick code that converts our mark down file to HTML for the medium connector to push to their API for publishing a new story.

We'll create a **function app** to do this. A Function in Azure is serverless code that runs on cloud VMs managed completely by a cloud service provider.You add your code, libraries and classes, the cloud infrastructure will handle the scaling of that code.

Lets go ahead and create an Azure Function App through the portal. Be sure to uniquely name your function, place it in your existing resource group, and target a hosting plan for it to be added to.

Once the Azure Function has been successfully deployed, we will create a new HTTP Triggered function app in C#.

<img src="https://natewebsite.blob.core.windows.net/post5/img11.png" width="500">

For our Markdown to HTML conversion we'll use the [CommonMark.NET](https://github.com/Knagis/CommonMark.NET) library available as a C# NuGet package. We can add this package to our function app to reference using a project.json file.

Create a project.json file by selecting the *View Files* tab to the right. Then select **+Add** and name your file `project.json`.

Use this code for your JSO file.
``` json
{
    "frameworks": {
        "net46":{
            "dependencies": {
                "CommonMark.Net": "0.15.1",
                "Newtonsoft.Json": "11.0.2"
                    }
                }
            }
}
```

Now we can add our code to our function app. In the function I use regex expressions to extract the title of our post to pass as a JSON property along with the post's contents.

``` C#
using System.Net;
using System.Text.RegularExpressions;
using CommonMark;
using Newtonsoft.Json;
using System.Text;

public static async Task<HttpResponseMessage> Run(HttpRequestMessage req, TraceWriter log)
{
    log.Info("C# HTTP trigger function processed a request.");

    //[Blob("sample-images-md/{name}", FileAccess.Write)] Stream imageMedium)
    var result = "";
    string postTitle = "";

    if (req != null)
    {

    // parse query parameter
    string input = await req.Content.ReadAsStringAsync();

    //remove website metadata in context
    var resultString = Regex.Replace(input, @"^[^_]*---", "", RegexOptions.IgnorePatternWhitespace); 

    //extract the title
    var titlePattern= @"[\n\r].*title:\s*([^\n\r]*)";
    Regex rgx = new Regex(titlePattern);
    //Checks if theres a match for the 'title:' string and returns that line 
    var matcher = rgx.Match(input);
    if (matcher.Success){
        var titleHit = matcher.Groups[0].Value;
        log.Info(titleHit);
        var quotePattern = "\\\"(.*?)\\\"";
        rgx = new Regex(quotePattern);
        //Removes all chars except the String inside the quotations
        var matcher2 = rgx.Match(titleHit);
        if (matcher2.Success){
            postTitle = matcher2.Groups[0].Value;
            postTitle = postTitle.Trim('"');
        }
    }

    //Convert MD content into HTML 
    result = CommonMark.CommonMarkConverter.Convert(resultString);

    //For Testing
    //log.Info(result);
    //log.Info(postTitle);
    }

    //Serialize into JSON object
    var myObj = new {title = postTitle, post = result};
    var jsonToReturn = JsonConvert.SerializeObject(myObj);

    //Send JSON as response
    return new HttpResponseMessage(HttpStatusCode.OK) {
        Content = new StringContent(jsonToReturn, Encoding.UTF8, "application/json")
    };

}
```

Azure Functions allow us to test the function as well through the UI. On the right side ot the window select the **Test** tab and enter your sample markdown file in the `request body`. Run your function and you will see the Output and status code at the bottom of the Test window.

<img src="https://natewebsite.blob.core.windows.net/post5/img12.PNG" width="500">

Navigate back to your Logic App and add an Azure Function as an action. You will see your newly created function listed. Select and add the FTP triggered dynamic content property `File Content` as your request body.

<img src="https://natewebsite.blob.core.windows.net/post5/img13.PNG" width="500">

> Feel free to also add another request bin to verify the response object of the Function app using a HTTP POST action.

Now we'll add a **Parse JSON** Action to extract the post title that we send in our Function response. 

Copy the output body from your Function App (either through the TEST window in the Function UI or Request bin)

Select the *Use sample payload to generate schema* and paste your output response.

Click **Done** and your schema properties will be generated to be used in your logic app flow.

Finally the next Action we add is the **Medium Write a Story**.

Add the Parse JSON Dynamic Property `post` for the `Content (as html)` property. Also add the Parse JSON Dynamic Property `title` for the `Title` property on the Medium Action

Be sure to switch the Publish Status to **Draft** as well.

<img src="https://natewebsite.blob.core.windows.net/post5/img14.PNG" width="500">

If you'd like to also add an alert to this Logic App Flow to notify you when a post has been drafted and pending review, Add a **Send Email** Action with the Medium properties for you to easily navigate to the draft and make necessary edits before submitting publicly.

<img src="https://natewebsite.blob.core.windows.net/post5/img15.png" width="500">

Your final Logic App sequence should look similar to the flow below. Trigger your Logic App by adding a new file to your posts directory.

<img src="https://natewebsite.blob.core.windows.net/post5/img16.png" width="500">

Here's a capture of the email that gets generated.

<img src="https://natewebsite.blob.core.windows.net/post5/img17.png" width="400">

Navigate to the post URL and you will see the drafted post that was triggered from the Jekyll site.

<img src="https://natewebsite.blob.core.windows.net/post5/img18.png" width="500">


## Things to Consider..

* **Pass a path to the File instead of the content:** HTTP post max size limit depends on the server configuration. If you have a rather long post, or to avoid data leakage, pass the file path into the Function App. Use an FTP connection from the function to access the file as an input and store the converted file to a blob output. Use this new file to pass the contents to the Medium Action connector.
* **Extract the tags:** Similar to what we did with the post title, collect the tags from the post using some regex expression and pass that to your Medium action.
* **Medium Connector Preview:** This API connector is in preview, eventually the framework will get to a point that you can simply pass an html for your new post and the Medium post is auto-generated.
* **Request Bin has been discontinued:** Earlier in the post, I used request bin to use for validating the request body from logic app applications. You can easily switch this out with any other dump server that echoes HTTP posts. I used  [Post Test Server](http://ptsv2.com/) for my dump.
