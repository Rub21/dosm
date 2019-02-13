# Download OpenStreetMap data for a polygon

# Install

```
npm install -g dosm
```

or

```
https://github.com/Rub21/dosm.git
cd dosm/
npm link
```

Make sure you have installed [osmconvert](https://wiki.openstreetmap.org/wiki/Osmconvert)

# Usage

### Download osm file

```
dosm -d ayac.geojson --api=overpass --zoom=16
```

Avalible APIs: `overpass`, `osm`.

### Download Tiles by Boundary

We need to export the env variables:

```
export TMS_URL=https://a.tiles.mapbox.com/v4/digitalglobe.2lnpeioh
export MBTOKEN=pk.xxxx
```

```
dosm -t boundary.geojson --zoom=16
```

### Download Tiles by tiles's Id

We need to export the env variables:

```
export TMS_URL=https://a.tiles.mapbox.com/v4/digitalglobe.2lnpeioh
export MBTOKEN=pk.xxxx
```

```
dosm -i tiles.geojson --zoom=16
```

Tiles would come from geokit.

```
docker run --rm -v ${PWD}:/app developmentseed/geokit:latest geokit point2tile centroids.geojson --zoom=18 --buffer=0.1 > tiles.geojson
```