# Polygon Fill Algorithms Benchmark
Benchmarks two separate polygon filling algorithms on polygons of different
shapes and sizes.  The algorithms available are Scanline Polygon Fill (SLPF) and
Seed Fill.  The shapes available to benchmark on are the square, diamond, and
star shapes.  A given size in pixels determines the scale of the shape
to be filled.

## Usage
```
$ ./benchmark -a algorithm -p polygon -s size
```

### Flags
- `-a`, `--algorithm`:  Takes one of the values `slpf` or `seedFill`, required.
This describes which algorithm will be benchmarked, either Scanline Polygon Fill
or Seed Fill, respectively.
- `-h`, `--help`:  Shows the help screen.
- `-p`, `--polygon`:  Takes one of the values `square`, `diamond`, or `star`,
required.  This describes which shape the algorithm must fill.
- `-s`, `--size`:  Takes a numeric value, default 512.  This describes the size
of the shape the algorithm must fill.
- `-t`, `--tests`:  Takes a numeric value, default 1.  This describes the
number of tests to average over.

## Examples
The following runs the SLPF algorithm to draw a star of size 1024px.
```
$ ./benchmark -a slpf -p star -s 1024
```

The following runs the Seed Fill algorithm to draw a diamond of size 512px
ten times.
```
$ ./benchmark -a seedFill -p diamond -t 10
```
