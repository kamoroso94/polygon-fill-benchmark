const {
  pointsToEdges, setPixel, getPixel, getYMin, getYMax, lerp
} = require('./util');

// Seed Fill
module.exports = function seedFill(points, img, seed) {
  if(points.length < 3) return;

  // construct edge list
  const edges = pointsToEdges(points);
  // verify seed
  if(!isPointInPolygon(seed, edges)) throw new Error('seed not in polygon');

  // initialize stack
  const stack = [seed];
  while(stack.length > 0) {
    const [x, y] = stack.pop();
    setPixel(img, x, y);

    // visit neighbors
    for(let h = -1; h <= 1; h++) {
      for(let k = -1; k <= 1; k++) {
        if(h != 0 && k != 0 || h == 0 && k == 0) continue;
        const point = [x + h, y + k];

        // neighbor is in polygon
        if(!getPixel(img, ...point) && isPointInPolygon(point, edges)) {
          stack.push(point);
        }
      }
    }
  }
};

// odd-even rule
function isPointInPolygon([x, y], edges) {
  let isIn = false;
  for(const edge of edges) {
    if(y >= getYMin(edge) && y < getYMax(edge)) {
      // ray crosses edge
      if(lerp(y, edge) >= x) isIn = !isIn;
    }
  }
  return isIn;
}
