# Desired Interface

Personalizing a web page is all about recording actions a user takes by keeping a count of how many times the action occurs, and then retrieving those counts to do something with.

### Authenticating

Before using Brand Flakes, we need to authenticate this application:

```JavaScript
BrandFlakes.authenticate('my-app-id', 'my-app-secret');
```

*Please be aware that this is very insecure!! We are stubbing it in this way for future improvement.*

### Gathering metrics

```javascript
<script>
// The user clicked the shopping cart
BrandFlakes.incrementMetric('some-user-id', 'shopping-cart-clicked');

// The user visited a page containing "North Face" in the URL
BrandFlakes.incrementMetric('some-user-id', 'north-face');

// Metrics can be recorded for ANYTHING at any time
BrandFlakes.incrementMetric('some-user-id', 'literally-any-metric-we-want-to-track');
</script>
```

### Retrieving action counts

```javascript
<script>
// Retrieve the number of times the user has visited North Face pages
var northFaceInterest = BrandFlakes.getMetric('some-user-id', 'north-face');

/*
 * Do something clever with that metric, like set the font size of their favorite products
 */
 WordCloud.setFontSize('North Face', northFaceInterest * 0.2);
 </script>
```

# Syncing between devices

User actions are sent *in real time* to a separate server using the DDP protocol (Meteor) using any kind of user id as the key. This way, actions taken on the desktop version of the website will be reflected when the same user visits the site on mobile, or any other device. Following actions taken on the mobile version of the site are then tracked in the same way, given that the user is logged in or identified in some way.
