# natural-coast
a default 0-0-0.mbtiles created from Natural Earth Coastline (10m)

# how to use
1. copy the 0-0-0.mbtiles to your mbtiles folder of spinel, pietra, tile-block or other module-based vector tile server.
2. the layer is 'Coastline'.
3. the maxzoom is 9.

# how to build the 0-0-0.mbtiles
## install
```console
git clone git@github.com:hfu/natural-coast
cd natural-coast
npm install
```

### build
```console
mkdir src
cd src
curl -OL https://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/physical/ne_10m_coastline.zip
unzip ne_10m_coastline.zip
ogr2ogr -f GeoJSONSeq ne_10m_coastline.ndjson ne_10m_coastline.shp
cd ..
node index.js | tippecanoe -z 9 -f -o 0-0-0.mbtiles
```
Because naturalearthdata.com seems to use redirects, the -L option was required to download the data.

You need to have version 2.4.0 or later of ogr2ogr, which is a part of gdal. As of 2018-11, gdal 2.4.0 is still in dev stage.

# source data
[Natural Earth, 1:10m Physical Vectors](https://www.naturalearthdata.com/downloads/10m-physical-vectors/) - Coastline