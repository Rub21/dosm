# Download osm data for a polygon

### Install
```
https://github.com/Rub21/dosm.git
cd dosm/
npm link
```

Make sure you have installed [osmconvert](https://wiki.openstreetmap.org/wiki/Osmconvert)

### Usage

```
dosm -d ayac.geojson --api=overpass --zoom=16
```

Avalible APIs: `overpass`, `osm`.