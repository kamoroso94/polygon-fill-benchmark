module.exports = {
  getPixel(img, x, y) {
    if(!img[x]) return false;
    return img[x][y] || false;
  },

  setPixel(img, x, y) {
    if(!img[x]) img[x] = [];
    img[x][y] = true;
  },

  // linear interpolation
  // finds x-value from scanline intersecting edge
  lerp(yScan, [[x1, y1], [x2, y2]]) {
    return Math.floor((yScan - y1) / (y2 - y1) * (x2 - x1) + x1);
  },

  // returns minimum y-value of two points
  getYMin([[, y1], [, y2]]) {
    return y1 <= y2 ? y1 : y2;
  },

  // returns maximum y-value of two points
  getYMax([[, y1], [, y2]]) {
    return y1 > y2 ? y1 : y2;
  },

  // returns the x-value of the point with the minimum y-value
  getXofYMin([[x1, y1], [x2, y2]]) {
    return y1 <= y2 ? x1 : x2;
  },

  // returns the x-value of the point with the maximum y-value
  getXofYMax([[x1, y1], [x2, y2]]) {
    return y1 > y2 ? x1 : x2;
  },

  // converts list of points to list of non-horizontal edges
  pointsToEdges(points) {
    let edges = [];
    let p1 = points[points.length - 1];
    for(let i = 0; i < points.length; i++) {
      const p2 = points[i];
      // ignore horizontal edges
      if(p1[1] != p2[1]) edges.push([p1, p2]);
      p1 = p2;
    }
    return edges;
  }
};
