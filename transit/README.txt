Sarah Ruckhaus
COMP 20 Assignment 3
14 March 2014

Most of my time was spent on setting up the polylines and station markers, adding the schedule to the info windows, reverse geocoding, and initially setting up the Google Maps API.

Sometime between Monday and Thursday, the keys for Lat and Lng in Google Maps
objects must have changed (used to be 'd' and 'e', are now 'k' and 'A' as of 3/13).
If finding the nearest station does not work when you grade it, that's probably why.
--Error would be where haversine() is called in findNearest() (line 216)

Did not work in Firefox (used Chrome)

People collaborated with: 0
Total hours spent: ~10
Times my repo was corrupt and needed to be recloned: 2
Seeing an awesome final product: priceless.

Sources:
============================================================================
--http://www.convertcsv.com/csv-to-json.htm to convert the CSV
  station data to JSON. I spent an hour or two working with that on 3/6,
  but during that time, my repo became corrupt and I lost that.
--http://you.arenot.me/2010/06/29/google-maps-api-v3-0-multiple-markers-multiple-infowindows/
  to get multiple info windows working on the map
--http://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-in-javascript
  for rounding prototype
--http://stackoverflow.com/questions/1129216/sorting-objects-in-an-array-by-a-field-value-in-javascript
  for sorting schedule by time
--http://stackoverflow.com/questions/2993563/how-do-i-return-a-variable-from-google-maps-javascript-geocoder-callback
  for help with reverse geocoding
============================================================================
