Tumblr Kapcsolati Terkep
========================

2022. februári magyar tumblr adatok alapján generálva.

* A piros nyilak jelzik azon embereket, akik egymás legkedveltebb blogjaik
* A fekete nyilak jelzik azokat, akik a nyíl irányában a legkedveltebb blog, azonban az ellentétes irányban csak top 20
* A szürke nyilak jelzik azokat, akik a nyíl irányában a legkedveltebb blog, azonban az ellentétes irányben még a top 20-ba se fért bele

How to generate
===============

1. Use `graphviz_red.rb` from tumblr-tools to generate the SVG:

```sh
dot -Ksfdp -Txdot -o output_span_nc_sfdp.xdot love_span_nc.dot
gvmap -e output_span_nc_sfdp.xdot | neato -n2 -Tsvg > source.svg
```

2. Generate the tilemap

```sh
vips dzsave source.svg mydz --suffix .gif
```

3. Move generated files to `tiles` and update index.html with the correct width and height from `mydz.dzi`

4. Run extract_coords:

```sh
./extract_coords.rb source.svg > blogs.js
```