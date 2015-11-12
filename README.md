# Desired Interface

Personalizing a web page is all about recording actions a user takes by keeping a count of how many times the action occurs, and then retrieving those counts to do something with.

### Authenticating

To use Brand Flakes, we just need to insert this snippet into our application just before the closing `head` tag:

```JavaScript
!function(b,f,l,a,k,e,s){b.BrandFlakesObject=l;b[l]||(b[l]=function(){
(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;e=f.createElement(a);
s=f.getElementsByTagName(a)[0];e.src=k;s.parentNode.insertBefore(e,s)}
(window,document,'BrandFlakes','script','//localhost:3000/public/brand-flakes.js');

BrandFlakes('create', 'UA-XXXXX-X', 'auto');
```

Replace `UA-XXXXX-X` with the application ID given to you when you set up your account. 

Brand Flakes is now configured and ready to use on your site! See below for some examples on how to use it in response to user actions.

### Gathering metrics

```javascript
<script>
// The user clicked the shopping cart
BrandFlakes('record', 'some-user-id', 'shopping-cart-clicked');

// The user visited a page containing "North Face" in the URL
BrandFlakes('record', 'some-user-id', 'north-face');

// Metrics can be recorded for ANYTHING at any time
BrandFlakes('record', 'some-user-id', 'literally-any-metric-we-want-to-track');
</script>
```

What `'record'` does is just increment the number of times that this action has been recorded. For example, if this is the first time the user has clicked the shopping cart, Brand Flakes will store the value `1` for this key. Every time `'record'` is called from here on, that value is incremented. See below for how to retreive those counts. 

Here, `'some-user-id'` is a special identifier that is up to you. Most likely, when your user logs in, they are stored in your database with unique id to identify them. If that is the case, you should use that. This is how Brand Flakes identifies users and personalizes the experience to match their interests. 

### Retrieving action counts

```javascript
<script>
// Retrieve the number of times the user has visited North Face pages
var northFaceInterest = BrandFlakes('get', 'some-user-id', 'north-face');

/*
 * Do something clever with that metric, like set the font size of their favorite products
 */
 WordCloud.setFontSize('North Face', northFaceInterest * 0.2);
 </script>
```

# Syncing between devices

User actions are sent *in real time* to a separate server using the DDP protocol (Meteor) using any kind of user id as the key. This way, actions taken on the desktop version of the website will be reflected when the same user visits the site on mobile, or any other device. Following actions taken on the mobile version of the site are then tracked in the same way, given that the user is logged in or identified in some way.
