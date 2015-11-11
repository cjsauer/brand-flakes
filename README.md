# Desired Interface

Personalizing a web page is all about recording actions a user takes by keeping a count of how many times the action occurs, and then retrieving those counts to do something with.

### Recording actions

```javascript
<script>
// The user clicked the shopping cart
BrandFlakes.recordAction('shopping-cart-clicked');

// The user visited a page containing "North Face" in the URL
BrandFlakes.recordAction('north-face');

// Metrics can be recorded for ANYTHING at any time
BrandFlakes.recordAction('literally-any-metric-we-want-to-track');
</script>
```

### Retrieving action counts

```javascript
<script>
// Retrieve the number of times the user has visited North Face pages
var northFaceInterest = BrandFlakes.getMetric('north-face');

/*
 * Do something clever with that metric, like set the font size of their favorite products
 */
 WordCloud.setFontSize('North Face', northFaceInterest * 0.2);
 </script>
```

# Syncing between devices

User actions are sent *in real time* to a separate server using the DDP protocol (Meteor) using any kind of user id as the key. This way, actions taken on the desktop version of the website will be reflected when the same user visits the site on mobile. Following actions taken on the mobile version of the site are then tracked in the same way. 
