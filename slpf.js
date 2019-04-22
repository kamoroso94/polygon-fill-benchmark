const {
  pointsToEdges, getYMin, getXofYMin, getXofYMax, setPixel, lerp, getYMax
} = require('./util');

// Scnaline Polygon Fill
module.exports = function slpf(points, img) {
  if(points.length < 3) return;
  const setPixelAlias = setPixel.bind(null, img);

  // initialize ET and AET
  const ET = pointsToEdges(points)
    .sort((e1, e2) => getYMin(e2) - getYMin(e1));
  const AET = [];
  let yScan = getYMin(ET[ET.length - 1]);

  // repeat until both ET and AET are empty
  while(ET.length > 0 || AET.length > 0) {
    // manage AET
    moveEdges(yScan, ET, AET);
    removeEdges(yScan, AET);
    AET.sort((e1, e2) => {
    	const cmp = getXofYMin(e1) - getXofYMin(e2);
      return cmp == 0 ? getXofYMax(e1) - getXofYMax(e2) : cmp;
    });
    // fill spans on scanline
    const spans = getSpans(yScan, AET);
    drawSpans(spans, yScan, setPixelAlias);
    yScan++;
  }
};

// move active edges from ET to AET
function moveEdges(yScan, ET, AET) {
  while(ET.length > 0 && yScan == getYMin(ET[ET.length - 1])) {
    AET.push(ET.pop());
  }
}

// remove inactive edges from AET
function removeEdges(yScan, AET) {
  for(let i = 0; i < AET.length; i++) {
    if(yScan >= getYMax(AET[i])) {
      const last = AET.pop();
      if(i < AET.length) {
        AET[i] = last;
        i--;
      }
    }
  }
}

// find spans along scanline
function getSpans(yScan, AET) {
  const spans = [];
  for(const edge of AET) {
    spans.push(lerp(yScan, edge));
  }
  return spans;
}

function drawSpans(spans, yScan, setPixel) {
  for(let i = 0; i < spans.length; i += 2) {
    fillSpan(spans[i], spans[i + 1], yScan, setPixel);
  }
}

// fill pixels within a span
function fillSpan(x1, x2, y, setPixel) {
  for(let x = x1; x < x2; x++) {
    setPixel(x, y);
  }
}
