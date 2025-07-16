"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const vue = require("vue");
const core = require("@vue-flow/core");
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var heap$1 = { exports: {} };
heap$1.exports;
(function(module2) {
  (function() {
    var Heap2, defaultCmp, floor, heapify, heappop, heappush, heappushpop, heapreplace, insort, min, nlargest, nsmallest, updateItem, _siftdown, _siftup;
    floor = Math.floor, min = Math.min;
    defaultCmp = function(x, y) {
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    };
    insort = function(a, x, lo, hi, cmp) {
      var mid;
      if (lo == null) {
        lo = 0;
      }
      if (cmp == null) {
        cmp = defaultCmp;
      }
      if (lo < 0) {
        throw new Error("lo must be non-negative");
      }
      if (hi == null) {
        hi = a.length;
      }
      while (lo < hi) {
        mid = floor((lo + hi) / 2);
        if (cmp(x, a[mid]) < 0) {
          hi = mid;
        } else {
          lo = mid + 1;
        }
      }
      return [].splice.apply(a, [lo, lo - lo].concat(x)), x;
    };
    heappush = function(array, item, cmp) {
      if (cmp == null) {
        cmp = defaultCmp;
      }
      array.push(item);
      return _siftdown(array, 0, array.length - 1, cmp);
    };
    heappop = function(array, cmp) {
      var lastelt, returnitem;
      if (cmp == null) {
        cmp = defaultCmp;
      }
      lastelt = array.pop();
      if (array.length) {
        returnitem = array[0];
        array[0] = lastelt;
        _siftup(array, 0, cmp);
      } else {
        returnitem = lastelt;
      }
      return returnitem;
    };
    heapreplace = function(array, item, cmp) {
      var returnitem;
      if (cmp == null) {
        cmp = defaultCmp;
      }
      returnitem = array[0];
      array[0] = item;
      _siftup(array, 0, cmp);
      return returnitem;
    };
    heappushpop = function(array, item, cmp) {
      var _ref;
      if (cmp == null) {
        cmp = defaultCmp;
      }
      if (array.length && cmp(array[0], item) < 0) {
        _ref = [array[0], item], item = _ref[0], array[0] = _ref[1];
        _siftup(array, 0, cmp);
      }
      return item;
    };
    heapify = function(array, cmp) {
      var i, _i, _len, _ref1, _results, _results1;
      if (cmp == null) {
        cmp = defaultCmp;
      }
      _ref1 = (function() {
        _results1 = [];
        for (var _j = 0, _ref = floor(array.length / 2); 0 <= _ref ? _j < _ref : _j > _ref; 0 <= _ref ? _j++ : _j--) {
          _results1.push(_j);
        }
        return _results1;
      }).apply(this).reverse();
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        i = _ref1[_i];
        _results.push(_siftup(array, i, cmp));
      }
      return _results;
    };
    updateItem = function(array, item, cmp) {
      var pos;
      if (cmp == null) {
        cmp = defaultCmp;
      }
      pos = array.indexOf(item);
      if (pos === -1) {
        return;
      }
      _siftdown(array, 0, pos, cmp);
      return _siftup(array, pos, cmp);
    };
    nlargest = function(array, n, cmp) {
      var elem, result, _i, _len, _ref;
      if (cmp == null) {
        cmp = defaultCmp;
      }
      result = array.slice(0, n);
      if (!result.length) {
        return result;
      }
      heapify(result, cmp);
      _ref = array.slice(n);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        elem = _ref[_i];
        heappushpop(result, elem, cmp);
      }
      return result.sort(cmp).reverse();
    };
    nsmallest = function(array, n, cmp) {
      var elem, los, result, _i, _j, _len, _ref, _ref1, _results;
      if (cmp == null) {
        cmp = defaultCmp;
      }
      if (n * 10 <= array.length) {
        result = array.slice(0, n).sort(cmp);
        if (!result.length) {
          return result;
        }
        los = result[result.length - 1];
        _ref = array.slice(n);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          elem = _ref[_i];
          if (cmp(elem, los) < 0) {
            insort(result, elem, 0, null, cmp);
            result.pop();
            los = result[result.length - 1];
          }
        }
        return result;
      }
      heapify(array, cmp);
      _results = [];
      for (_j = 0, _ref1 = min(n, array.length); 0 <= _ref1 ? _j < _ref1 : _j > _ref1; 0 <= _ref1 ? ++_j : --_j) {
        _results.push(heappop(array, cmp));
      }
      return _results;
    };
    _siftdown = function(array, startpos, pos, cmp) {
      var newitem, parent, parentpos;
      if (cmp == null) {
        cmp = defaultCmp;
      }
      newitem = array[pos];
      while (pos > startpos) {
        parentpos = pos - 1 >> 1;
        parent = array[parentpos];
        if (cmp(newitem, parent) < 0) {
          array[pos] = parent;
          pos = parentpos;
          continue;
        }
        break;
      }
      return array[pos] = newitem;
    };
    _siftup = function(array, pos, cmp) {
      var childpos, endpos, newitem, rightpos, startpos;
      if (cmp == null) {
        cmp = defaultCmp;
      }
      endpos = array.length;
      startpos = pos;
      newitem = array[pos];
      childpos = 2 * pos + 1;
      while (childpos < endpos) {
        rightpos = childpos + 1;
        if (rightpos < endpos && !(cmp(array[childpos], array[rightpos]) < 0)) {
          childpos = rightpos;
        }
        array[pos] = array[childpos];
        pos = childpos;
        childpos = 2 * pos + 1;
      }
      array[pos] = newitem;
      return _siftdown(array, startpos, pos, cmp);
    };
    Heap2 = function() {
      Heap3.push = heappush;
      Heap3.pop = heappop;
      Heap3.replace = heapreplace;
      Heap3.pushpop = heappushpop;
      Heap3.heapify = heapify;
      Heap3.updateItem = updateItem;
      Heap3.nlargest = nlargest;
      Heap3.nsmallest = nsmallest;
      function Heap3(cmp) {
        this.cmp = cmp != null ? cmp : defaultCmp;
        this.nodes = [];
      }
      Heap3.prototype.push = function(x) {
        return heappush(this.nodes, x, this.cmp);
      };
      Heap3.prototype.pop = function() {
        return heappop(this.nodes, this.cmp);
      };
      Heap3.prototype.peek = function() {
        return this.nodes[0];
      };
      Heap3.prototype.contains = function(x) {
        return this.nodes.indexOf(x) !== -1;
      };
      Heap3.prototype.replace = function(x) {
        return heapreplace(this.nodes, x, this.cmp);
      };
      Heap3.prototype.pushpop = function(x) {
        return heappushpop(this.nodes, x, this.cmp);
      };
      Heap3.prototype.heapify = function() {
        return heapify(this.nodes, this.cmp);
      };
      Heap3.prototype.updateItem = function(x) {
        return updateItem(this.nodes, x, this.cmp);
      };
      Heap3.prototype.clear = function() {
        return this.nodes = [];
      };
      Heap3.prototype.empty = function() {
        return this.nodes.length === 0;
      };
      Heap3.prototype.size = function() {
        return this.nodes.length;
      };
      Heap3.prototype.clone = function() {
        var heap2;
        heap2 = new Heap3();
        heap2.nodes = this.nodes.slice(0);
        return heap2;
      };
      Heap3.prototype.toArray = function() {
        return this.nodes.slice(0);
      };
      Heap3.prototype.insert = Heap3.prototype.push;
      Heap3.prototype.top = Heap3.prototype.peek;
      Heap3.prototype.front = Heap3.prototype.peek;
      Heap3.prototype.has = Heap3.prototype.contains;
      Heap3.prototype.copy = Heap3.prototype.clone;
      return Heap3;
    }();
    if (module2 !== null ? module2.exports : void 0) {
      module2.exports = Heap2;
    } else {
      window.Heap = Heap2;
    }
  }).call(commonjsGlobal);
})(heap$1);
var heapExports = heap$1.exports;
var heap = heapExports;
function Node$2(x, y, walkable) {
  this.x = x;
  this.y = y;
  this.walkable = walkable === void 0 ? true : walkable;
}
var Node_1 = Node$2;
var DiagonalMovement$b = {
  Always: 1,
  Never: 2,
  IfAtMostOneObstacle: 3,
  OnlyWhenNoObstacles: 4
};
var DiagonalMovement_1 = DiagonalMovement$b;
var Node$1 = Node_1;
var DiagonalMovement$a = DiagonalMovement_1;
function Grid(width_or_matrix, height, matrix) {
  var width;
  if (typeof width_or_matrix !== "object") {
    width = width_or_matrix;
  } else {
    height = width_or_matrix.length;
    width = width_or_matrix[0].length;
    matrix = width_or_matrix;
  }
  this.width = width;
  this.height = height;
  this.nodes = this._buildNodes(width, height, matrix);
}
Grid.prototype._buildNodes = function(width, height, matrix) {
  var i, j, nodes = new Array(height);
  for (i = 0; i < height; ++i) {
    nodes[i] = new Array(width);
    for (j = 0; j < width; ++j) {
      nodes[i][j] = new Node$1(j, i);
    }
  }
  if (matrix === void 0) {
    return nodes;
  }
  if (matrix.length !== height || matrix[0].length !== width) {
    throw new Error("Matrix size does not fit");
  }
  for (i = 0; i < height; ++i) {
    for (j = 0; j < width; ++j) {
      if (matrix[i][j]) {
        nodes[i][j].walkable = false;
      }
    }
  }
  return nodes;
};
Grid.prototype.getNodeAt = function(x, y) {
  return this.nodes[y][x];
};
Grid.prototype.isWalkableAt = function(x, y) {
  return this.isInside(x, y) && this.nodes[y][x].walkable;
};
Grid.prototype.isInside = function(x, y) {
  return x >= 0 && x < this.width && (y >= 0 && y < this.height);
};
Grid.prototype.setWalkableAt = function(x, y, walkable) {
  this.nodes[y][x].walkable = walkable;
};
Grid.prototype.getNeighbors = function(node, diagonalMovement) {
  var x = node.x, y = node.y, neighbors = [], s0 = false, d0 = false, s1 = false, d1 = false, s2 = false, d2 = false, s3 = false, d3 = false, nodes = this.nodes;
  if (this.isWalkableAt(x, y - 1)) {
    neighbors.push(nodes[y - 1][x]);
    s0 = true;
  }
  if (this.isWalkableAt(x + 1, y)) {
    neighbors.push(nodes[y][x + 1]);
    s1 = true;
  }
  if (this.isWalkableAt(x, y + 1)) {
    neighbors.push(nodes[y + 1][x]);
    s2 = true;
  }
  if (this.isWalkableAt(x - 1, y)) {
    neighbors.push(nodes[y][x - 1]);
    s3 = true;
  }
  if (diagonalMovement === DiagonalMovement$a.Never) {
    return neighbors;
  }
  if (diagonalMovement === DiagonalMovement$a.OnlyWhenNoObstacles) {
    d0 = s3 && s0;
    d1 = s0 && s1;
    d2 = s1 && s2;
    d3 = s2 && s3;
  } else if (diagonalMovement === DiagonalMovement$a.IfAtMostOneObstacle) {
    d0 = s3 || s0;
    d1 = s0 || s1;
    d2 = s1 || s2;
    d3 = s2 || s3;
  } else if (diagonalMovement === DiagonalMovement$a.Always) {
    d0 = true;
    d1 = true;
    d2 = true;
    d3 = true;
  } else {
    throw new Error("Incorrect value of diagonalMovement");
  }
  if (d0 && this.isWalkableAt(x - 1, y - 1)) {
    neighbors.push(nodes[y - 1][x - 1]);
  }
  if (d1 && this.isWalkableAt(x + 1, y - 1)) {
    neighbors.push(nodes[y - 1][x + 1]);
  }
  if (d2 && this.isWalkableAt(x + 1, y + 1)) {
    neighbors.push(nodes[y + 1][x + 1]);
  }
  if (d3 && this.isWalkableAt(x - 1, y + 1)) {
    neighbors.push(nodes[y + 1][x - 1]);
  }
  return neighbors;
};
Grid.prototype.clone = function() {
  var i, j, width = this.width, height = this.height, thisNodes = this.nodes, newGrid = new Grid(width, height), newNodes = new Array(height);
  for (i = 0; i < height; ++i) {
    newNodes[i] = new Array(width);
    for (j = 0; j < width; ++j) {
      newNodes[i][j] = new Node$1(j, i, thisNodes[i][j].walkable);
    }
  }
  newGrid.nodes = newNodes;
  return newGrid;
};
var Grid_1 = Grid;
var Util$5 = {};
function backtrace(node) {
  var path = [[node.x, node.y]];
  while (node.parent) {
    node = node.parent;
    path.push([node.x, node.y]);
  }
  return path.reverse();
}
Util$5.backtrace = backtrace;
function biBacktrace(nodeA, nodeB) {
  var pathA = backtrace(nodeA), pathB = backtrace(nodeB);
  return pathA.concat(pathB.reverse());
}
Util$5.biBacktrace = biBacktrace;
function pathLength(path) {
  var i, sum = 0, a, b, dx, dy;
  for (i = 1; i < path.length; ++i) {
    a = path[i - 1];
    b = path[i];
    dx = a[0] - b[0];
    dy = a[1] - b[1];
    sum += Math.sqrt(dx * dx + dy * dy);
  }
  return sum;
}
Util$5.pathLength = pathLength;
function interpolate(x0, y0, x1, y1) {
  var abs = Math.abs, line = [], sx, sy, dx, dy, err, e2;
  dx = abs(x1 - x0);
  dy = abs(y1 - y0);
  sx = x0 < x1 ? 1 : -1;
  sy = y0 < y1 ? 1 : -1;
  err = dx - dy;
  while (true) {
    line.push([x0, y0]);
    if (x0 === x1 && y0 === y1) {
      break;
    }
    e2 = 2 * err;
    if (e2 > -dy) {
      err = err - dy;
      x0 = x0 + sx;
    }
    if (e2 < dx) {
      err = err + dx;
      y0 = y0 + sy;
    }
  }
  return line;
}
Util$5.interpolate = interpolate;
function expandPath(path) {
  var expanded = [], len = path.length, coord0, coord1, interpolated, interpolatedLen, i, j;
  if (len < 2) {
    return expanded;
  }
  for (i = 0; i < len - 1; ++i) {
    coord0 = path[i];
    coord1 = path[i + 1];
    interpolated = interpolate(coord0[0], coord0[1], coord1[0], coord1[1]);
    interpolatedLen = interpolated.length;
    for (j = 0; j < interpolatedLen - 1; ++j) {
      expanded.push(interpolated[j]);
    }
  }
  expanded.push(path[len - 1]);
  return expanded;
}
Util$5.expandPath = expandPath;
function smoothenPath(grid, path) {
  var len = path.length, x0 = path[0][0], y0 = path[0][1], x1 = path[len - 1][0], y1 = path[len - 1][1], sx, sy, ex, ey, newPath, i, j, coord, line, testCoord, blocked;
  sx = x0;
  sy = y0;
  newPath = [[sx, sy]];
  for (i = 2; i < len; ++i) {
    coord = path[i];
    ex = coord[0];
    ey = coord[1];
    line = interpolate(sx, sy, ex, ey);
    blocked = false;
    for (j = 1; j < line.length; ++j) {
      testCoord = line[j];
      if (!grid.isWalkableAt(testCoord[0], testCoord[1])) {
        blocked = true;
        break;
      }
    }
    if (blocked) {
      lastValidCoord = path[i - 1];
      newPath.push(lastValidCoord);
      sx = lastValidCoord[0];
      sy = lastValidCoord[1];
    }
  }
  newPath.push([x1, y1]);
  return newPath;
}
Util$5.smoothenPath = smoothenPath;
function compressPath(path) {
  if (path.length < 3) {
    return path;
  }
  var compressed = [], sx = path[0][0], sy = path[0][1], px = path[1][0], py = path[1][1], dx = px - sx, dy = py - sy, lx, ly, ldx, ldy, sq, i;
  sq = Math.sqrt(dx * dx + dy * dy);
  dx /= sq;
  dy /= sq;
  compressed.push([sx, sy]);
  for (i = 2; i < path.length; i++) {
    lx = px;
    ly = py;
    ldx = dx;
    ldy = dy;
    px = path[i][0];
    py = path[i][1];
    dx = px - lx;
    dy = py - ly;
    sq = Math.sqrt(dx * dx + dy * dy);
    dx /= sq;
    dy /= sq;
    if (dx !== ldx || dy !== ldy) {
      compressed.push([lx, ly]);
    }
  }
  compressed.push([px, py]);
  return compressed;
}
Util$5.compressPath = compressPath;
var Heuristic$4 = {
  /**
   * Manhattan distance.
   * @param {number} dx - Difference in x.
   * @param {number} dy - Difference in y.
   * @return {number} dx + dy
   */
  manhattan: function(dx, dy) {
    return dx + dy;
  },
  /**
   * Euclidean distance.
   * @param {number} dx - Difference in x.
   * @param {number} dy - Difference in y.
   * @return {number} sqrt(dx * dx + dy * dy)
   */
  euclidean: function(dx, dy) {
    return Math.sqrt(dx * dx + dy * dy);
  },
  /**
   * Octile distance.
   * @param {number} dx - Difference in x.
   * @param {number} dy - Difference in y.
   * @return {number} sqrt(dx * dx + dy * dy) for grids
   */
  octile: function(dx, dy) {
    var F = Math.SQRT2 - 1;
    return dx < dy ? F * dx + dy : F * dy + dx;
  },
  /**
   * Chebyshev distance.
   * @param {number} dx - Difference in x.
   * @param {number} dy - Difference in y.
   * @return {number} max(dx, dy)
   */
  chebyshev: function(dx, dy) {
    return Math.max(dx, dy);
  }
};
var Heap$2 = heap;
var Util$4 = Util$5;
var Heuristic$3 = Heuristic$4;
var DiagonalMovement$9 = DiagonalMovement_1;
function AStarFinder$2(opt) {
  opt = opt || {};
  this.allowDiagonal = opt.allowDiagonal;
  this.dontCrossCorners = opt.dontCrossCorners;
  this.heuristic = opt.heuristic || Heuristic$3.manhattan;
  this.weight = opt.weight || 1;
  this.diagonalMovement = opt.diagonalMovement;
  if (!this.diagonalMovement) {
    if (!this.allowDiagonal) {
      this.diagonalMovement = DiagonalMovement$9.Never;
    } else {
      if (this.dontCrossCorners) {
        this.diagonalMovement = DiagonalMovement$9.OnlyWhenNoObstacles;
      } else {
        this.diagonalMovement = DiagonalMovement$9.IfAtMostOneObstacle;
      }
    }
  }
  if (this.diagonalMovement === DiagonalMovement$9.Never) {
    this.heuristic = opt.heuristic || Heuristic$3.manhattan;
  } else {
    this.heuristic = opt.heuristic || Heuristic$3.octile;
  }
}
AStarFinder$2.prototype.findPath = function(startX, startY, endX, endY, grid) {
  var openList = new Heap$2(function(nodeA, nodeB) {
    return nodeA.f - nodeB.f;
  }), startNode = grid.getNodeAt(startX, startY), endNode = grid.getNodeAt(endX, endY), heuristic = this.heuristic, diagonalMovement = this.diagonalMovement, weight = this.weight, abs = Math.abs, SQRT2 = Math.SQRT2, node, neighbors, neighbor, i, l, x, y, ng;
  startNode.g = 0;
  startNode.f = 0;
  openList.push(startNode);
  startNode.opened = true;
  while (!openList.empty()) {
    node = openList.pop();
    node.closed = true;
    if (node === endNode) {
      return Util$4.backtrace(endNode);
    }
    neighbors = grid.getNeighbors(node, diagonalMovement);
    for (i = 0, l = neighbors.length; i < l; ++i) {
      neighbor = neighbors[i];
      if (neighbor.closed) {
        continue;
      }
      x = neighbor.x;
      y = neighbor.y;
      ng = node.g + (x - node.x === 0 || y - node.y === 0 ? 1 : SQRT2);
      if (!neighbor.opened || ng < neighbor.g) {
        neighbor.g = ng;
        neighbor.h = neighbor.h || weight * heuristic(abs(x - endX), abs(y - endY));
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.parent = node;
        if (!neighbor.opened) {
          openList.push(neighbor);
          neighbor.opened = true;
        } else {
          openList.updateItem(neighbor);
        }
      }
    }
  }
  return [];
};
var AStarFinder_1 = AStarFinder$2;
var AStarFinder$1 = AStarFinder_1;
function BestFirstFinder(opt) {
  AStarFinder$1.call(this, opt);
  var orig = this.heuristic;
  this.heuristic = function(dx, dy) {
    return orig(dx, dy) * 1e6;
  };
}
BestFirstFinder.prototype = new AStarFinder$1();
BestFirstFinder.prototype.constructor = BestFirstFinder;
var BestFirstFinder_1 = BestFirstFinder;
var Util$3 = Util$5;
var DiagonalMovement$8 = DiagonalMovement_1;
function BreadthFirstFinder(opt) {
  opt = opt || {};
  this.allowDiagonal = opt.allowDiagonal;
  this.dontCrossCorners = opt.dontCrossCorners;
  this.diagonalMovement = opt.diagonalMovement;
  if (!this.diagonalMovement) {
    if (!this.allowDiagonal) {
      this.diagonalMovement = DiagonalMovement$8.Never;
    } else {
      if (this.dontCrossCorners) {
        this.diagonalMovement = DiagonalMovement$8.OnlyWhenNoObstacles;
      } else {
        this.diagonalMovement = DiagonalMovement$8.IfAtMostOneObstacle;
      }
    }
  }
}
BreadthFirstFinder.prototype.findPath = function(startX, startY, endX, endY, grid) {
  var openList = [], diagonalMovement = this.diagonalMovement, startNode = grid.getNodeAt(startX, startY), endNode = grid.getNodeAt(endX, endY), neighbors, neighbor, node, i, l;
  openList.push(startNode);
  startNode.opened = true;
  while (openList.length) {
    node = openList.shift();
    node.closed = true;
    if (node === endNode) {
      return Util$3.backtrace(endNode);
    }
    neighbors = grid.getNeighbors(node, diagonalMovement);
    for (i = 0, l = neighbors.length; i < l; ++i) {
      neighbor = neighbors[i];
      if (neighbor.closed || neighbor.opened) {
        continue;
      }
      openList.push(neighbor);
      neighbor.opened = true;
      neighbor.parent = node;
    }
  }
  return [];
};
var BreadthFirstFinder_1 = BreadthFirstFinder;
var AStarFinder = AStarFinder_1;
function DijkstraFinder(opt) {
  AStarFinder.call(this, opt);
  this.heuristic = function(dx, dy) {
    return 0;
  };
}
DijkstraFinder.prototype = new AStarFinder();
DijkstraFinder.prototype.constructor = DijkstraFinder;
var DijkstraFinder_1 = DijkstraFinder;
var Heap$1 = heap;
var Util$2 = Util$5;
var Heuristic$2 = Heuristic$4;
var DiagonalMovement$7 = DiagonalMovement_1;
function BiAStarFinder$2(opt) {
  opt = opt || {};
  this.allowDiagonal = opt.allowDiagonal;
  this.dontCrossCorners = opt.dontCrossCorners;
  this.diagonalMovement = opt.diagonalMovement;
  this.heuristic = opt.heuristic || Heuristic$2.manhattan;
  this.weight = opt.weight || 1;
  if (!this.diagonalMovement) {
    if (!this.allowDiagonal) {
      this.diagonalMovement = DiagonalMovement$7.Never;
    } else {
      if (this.dontCrossCorners) {
        this.diagonalMovement = DiagonalMovement$7.OnlyWhenNoObstacles;
      } else {
        this.diagonalMovement = DiagonalMovement$7.IfAtMostOneObstacle;
      }
    }
  }
  if (this.diagonalMovement === DiagonalMovement$7.Never) {
    this.heuristic = opt.heuristic || Heuristic$2.manhattan;
  } else {
    this.heuristic = opt.heuristic || Heuristic$2.octile;
  }
}
BiAStarFinder$2.prototype.findPath = function(startX, startY, endX, endY, grid) {
  var cmp = function(nodeA, nodeB) {
    return nodeA.f - nodeB.f;
  }, startOpenList = new Heap$1(cmp), endOpenList = new Heap$1(cmp), startNode = grid.getNodeAt(startX, startY), endNode = grid.getNodeAt(endX, endY), heuristic = this.heuristic, diagonalMovement = this.diagonalMovement, weight = this.weight, abs = Math.abs, SQRT2 = Math.SQRT2, node, neighbors, neighbor, i, l, x, y, ng, BY_START = 1, BY_END = 2;
  startNode.g = 0;
  startNode.f = 0;
  startOpenList.push(startNode);
  startNode.opened = BY_START;
  endNode.g = 0;
  endNode.f = 0;
  endOpenList.push(endNode);
  endNode.opened = BY_END;
  while (!startOpenList.empty() && !endOpenList.empty()) {
    node = startOpenList.pop();
    node.closed = true;
    neighbors = grid.getNeighbors(node, diagonalMovement);
    for (i = 0, l = neighbors.length; i < l; ++i) {
      neighbor = neighbors[i];
      if (neighbor.closed) {
        continue;
      }
      if (neighbor.opened === BY_END) {
        return Util$2.biBacktrace(node, neighbor);
      }
      x = neighbor.x;
      y = neighbor.y;
      ng = node.g + (x - node.x === 0 || y - node.y === 0 ? 1 : SQRT2);
      if (!neighbor.opened || ng < neighbor.g) {
        neighbor.g = ng;
        neighbor.h = neighbor.h || weight * heuristic(abs(x - endX), abs(y - endY));
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.parent = node;
        if (!neighbor.opened) {
          startOpenList.push(neighbor);
          neighbor.opened = BY_START;
        } else {
          startOpenList.updateItem(neighbor);
        }
      }
    }
    node = endOpenList.pop();
    node.closed = true;
    neighbors = grid.getNeighbors(node, diagonalMovement);
    for (i = 0, l = neighbors.length; i < l; ++i) {
      neighbor = neighbors[i];
      if (neighbor.closed) {
        continue;
      }
      if (neighbor.opened === BY_START) {
        return Util$2.biBacktrace(neighbor, node);
      }
      x = neighbor.x;
      y = neighbor.y;
      ng = node.g + (x - node.x === 0 || y - node.y === 0 ? 1 : SQRT2);
      if (!neighbor.opened || ng < neighbor.g) {
        neighbor.g = ng;
        neighbor.h = neighbor.h || weight * heuristic(abs(x - startX), abs(y - startY));
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.parent = node;
        if (!neighbor.opened) {
          endOpenList.push(neighbor);
          neighbor.opened = BY_END;
        } else {
          endOpenList.updateItem(neighbor);
        }
      }
    }
  }
  return [];
};
var BiAStarFinder_1 = BiAStarFinder$2;
var BiAStarFinder$1 = BiAStarFinder_1;
function BiBestFirstFinder(opt) {
  BiAStarFinder$1.call(this, opt);
  var orig = this.heuristic;
  this.heuristic = function(dx, dy) {
    return orig(dx, dy) * 1e6;
  };
}
BiBestFirstFinder.prototype = new BiAStarFinder$1();
BiBestFirstFinder.prototype.constructor = BiBestFirstFinder;
var BiBestFirstFinder_1 = BiBestFirstFinder;
var Util$1 = Util$5;
var DiagonalMovement$6 = DiagonalMovement_1;
function BiBreadthFirstFinder(opt) {
  opt = opt || {};
  this.allowDiagonal = opt.allowDiagonal;
  this.dontCrossCorners = opt.dontCrossCorners;
  this.diagonalMovement = opt.diagonalMovement;
  if (!this.diagonalMovement) {
    if (!this.allowDiagonal) {
      this.diagonalMovement = DiagonalMovement$6.Never;
    } else {
      if (this.dontCrossCorners) {
        this.diagonalMovement = DiagonalMovement$6.OnlyWhenNoObstacles;
      } else {
        this.diagonalMovement = DiagonalMovement$6.IfAtMostOneObstacle;
      }
    }
  }
}
BiBreadthFirstFinder.prototype.findPath = function(startX, startY, endX, endY, grid) {
  var startNode = grid.getNodeAt(startX, startY), endNode = grid.getNodeAt(endX, endY), startOpenList = [], endOpenList = [], neighbors, neighbor, node, diagonalMovement = this.diagonalMovement, BY_START = 0, BY_END = 1, i, l;
  startOpenList.push(startNode);
  startNode.opened = true;
  startNode.by = BY_START;
  endOpenList.push(endNode);
  endNode.opened = true;
  endNode.by = BY_END;
  while (startOpenList.length && endOpenList.length) {
    node = startOpenList.shift();
    node.closed = true;
    neighbors = grid.getNeighbors(node, diagonalMovement);
    for (i = 0, l = neighbors.length; i < l; ++i) {
      neighbor = neighbors[i];
      if (neighbor.closed) {
        continue;
      }
      if (neighbor.opened) {
        if (neighbor.by === BY_END) {
          return Util$1.biBacktrace(node, neighbor);
        }
        continue;
      }
      startOpenList.push(neighbor);
      neighbor.parent = node;
      neighbor.opened = true;
      neighbor.by = BY_START;
    }
    node = endOpenList.shift();
    node.closed = true;
    neighbors = grid.getNeighbors(node, diagonalMovement);
    for (i = 0, l = neighbors.length; i < l; ++i) {
      neighbor = neighbors[i];
      if (neighbor.closed) {
        continue;
      }
      if (neighbor.opened) {
        if (neighbor.by === BY_START) {
          return Util$1.biBacktrace(neighbor, node);
        }
        continue;
      }
      endOpenList.push(neighbor);
      neighbor.parent = node;
      neighbor.opened = true;
      neighbor.by = BY_END;
    }
  }
  return [];
};
var BiBreadthFirstFinder_1 = BiBreadthFirstFinder;
var BiAStarFinder = BiAStarFinder_1;
function BiDijkstraFinder(opt) {
  BiAStarFinder.call(this, opt);
  this.heuristic = function(dx, dy) {
    return 0;
  };
}
BiDijkstraFinder.prototype = new BiAStarFinder();
BiDijkstraFinder.prototype.constructor = BiDijkstraFinder;
var BiDijkstraFinder_1 = BiDijkstraFinder;
var Heuristic$1 = Heuristic$4;
var Node = Node_1;
var DiagonalMovement$5 = DiagonalMovement_1;
function IDAStarFinder(opt) {
  opt = opt || {};
  this.allowDiagonal = opt.allowDiagonal;
  this.dontCrossCorners = opt.dontCrossCorners;
  this.diagonalMovement = opt.diagonalMovement;
  this.heuristic = opt.heuristic || Heuristic$1.manhattan;
  this.weight = opt.weight || 1;
  this.trackRecursion = opt.trackRecursion || false;
  this.timeLimit = opt.timeLimit || Infinity;
  if (!this.diagonalMovement) {
    if (!this.allowDiagonal) {
      this.diagonalMovement = DiagonalMovement$5.Never;
    } else {
      if (this.dontCrossCorners) {
        this.diagonalMovement = DiagonalMovement$5.OnlyWhenNoObstacles;
      } else {
        this.diagonalMovement = DiagonalMovement$5.IfAtMostOneObstacle;
      }
    }
  }
  if (this.diagonalMovement === DiagonalMovement$5.Never) {
    this.heuristic = opt.heuristic || Heuristic$1.manhattan;
  } else {
    this.heuristic = opt.heuristic || Heuristic$1.octile;
  }
}
IDAStarFinder.prototype.findPath = function(startX, startY, endX, endY, grid) {
  var startTime = (/* @__PURE__ */ new Date()).getTime();
  var h = (function(a, b) {
    return this.heuristic(Math.abs(b.x - a.x), Math.abs(b.y - a.y));
  }).bind(this);
  var cost = function(a, b) {
    return a.x === b.x || a.y === b.y ? 1 : Math.SQRT2;
  };
  var search = (function(node, g, cutoff, route2, depth) {
    if (this.timeLimit > 0 && (/* @__PURE__ */ new Date()).getTime() - startTime > this.timeLimit * 1e3) {
      return Infinity;
    }
    var f = g + h(node, end) * this.weight;
    if (f > cutoff) {
      return f;
    }
    if (node == end) {
      route2[depth] = [node.x, node.y];
      return node;
    }
    var min, t2, k, neighbour;
    var neighbours = grid.getNeighbors(node, this.diagonalMovement);
    for (k = 0, min = Infinity; neighbour = neighbours[k]; ++k) {
      if (this.trackRecursion) {
        neighbour.retainCount = neighbour.retainCount + 1 || 1;
        if (neighbour.tested !== true) {
          neighbour.tested = true;
        }
      }
      t2 = search(neighbour, g + cost(node, neighbour), cutoff, route2, depth + 1);
      if (t2 instanceof Node) {
        route2[depth] = [node.x, node.y];
        return t2;
      }
      if (this.trackRecursion && --neighbour.retainCount === 0) {
        neighbour.tested = false;
      }
      if (t2 < min) {
        min = t2;
      }
    }
    return min;
  }).bind(this);
  var start = grid.getNodeAt(startX, startY);
  var end = grid.getNodeAt(endX, endY);
  var cutOff = h(start, end);
  var j, route, t;
  for (j = 0; true; ++j) {
    route = [];
    t = search(start, 0, cutOff, route, 0);
    if (t === Infinity) {
      return [];
    }
    if (t instanceof Node) {
      return route;
    }
    cutOff = t;
  }
  return [];
};
var IDAStarFinder_1 = IDAStarFinder;
var Heap = heap;
var Util = Util$5;
var Heuristic = Heuristic$4;
function JumpPointFinderBase$4(opt) {
  opt = opt || {};
  this.heuristic = opt.heuristic || Heuristic.manhattan;
  this.trackJumpRecursion = opt.trackJumpRecursion || false;
}
JumpPointFinderBase$4.prototype.findPath = function(startX, startY, endX, endY, grid) {
  var openList = this.openList = new Heap(function(nodeA, nodeB) {
    return nodeA.f - nodeB.f;
  }), startNode = this.startNode = grid.getNodeAt(startX, startY), endNode = this.endNode = grid.getNodeAt(endX, endY), node;
  this.grid = grid;
  startNode.g = 0;
  startNode.f = 0;
  openList.push(startNode);
  startNode.opened = true;
  while (!openList.empty()) {
    node = openList.pop();
    node.closed = true;
    if (node === endNode) {
      return Util.expandPath(Util.backtrace(endNode));
    }
    this._identifySuccessors(node);
  }
  return [];
};
JumpPointFinderBase$4.prototype._identifySuccessors = function(node) {
  var grid = this.grid, heuristic = this.heuristic, openList = this.openList, endX = this.endNode.x, endY = this.endNode.y, neighbors, neighbor, jumpPoint, i, l, x = node.x, y = node.y, jx, jy, d, ng, jumpNode, abs = Math.abs;
  neighbors = this._findNeighbors(node);
  for (i = 0, l = neighbors.length; i < l; ++i) {
    neighbor = neighbors[i];
    jumpPoint = this._jump(neighbor[0], neighbor[1], x, y);
    if (jumpPoint) {
      jx = jumpPoint[0];
      jy = jumpPoint[1];
      jumpNode = grid.getNodeAt(jx, jy);
      if (jumpNode.closed) {
        continue;
      }
      d = Heuristic.octile(abs(jx - x), abs(jy - y));
      ng = node.g + d;
      if (!jumpNode.opened || ng < jumpNode.g) {
        jumpNode.g = ng;
        jumpNode.h = jumpNode.h || heuristic(abs(jx - endX), abs(jy - endY));
        jumpNode.f = jumpNode.g + jumpNode.h;
        jumpNode.parent = node;
        if (!jumpNode.opened) {
          openList.push(jumpNode);
          jumpNode.opened = true;
        } else {
          openList.updateItem(jumpNode);
        }
      }
    }
  }
};
var JumpPointFinderBase_1 = JumpPointFinderBase$4;
var JumpPointFinderBase$3 = JumpPointFinderBase_1;
var DiagonalMovement$4 = DiagonalMovement_1;
function JPFNeverMoveDiagonally$1(opt) {
  JumpPointFinderBase$3.call(this, opt);
}
JPFNeverMoveDiagonally$1.prototype = new JumpPointFinderBase$3();
JPFNeverMoveDiagonally$1.prototype.constructor = JPFNeverMoveDiagonally$1;
JPFNeverMoveDiagonally$1.prototype._jump = function(x, y, px, py) {
  var grid = this.grid, dx = x - px, dy = y - py;
  if (!grid.isWalkableAt(x, y)) {
    return null;
  }
  if (this.trackJumpRecursion === true) {
    grid.getNodeAt(x, y).tested = true;
  }
  if (grid.getNodeAt(x, y) === this.endNode) {
    return [x, y];
  }
  if (dx !== 0) {
    if (grid.isWalkableAt(x, y - 1) && !grid.isWalkableAt(x - dx, y - 1) || grid.isWalkableAt(x, y + 1) && !grid.isWalkableAt(x - dx, y + 1)) {
      return [x, y];
    }
  } else if (dy !== 0) {
    if (grid.isWalkableAt(x - 1, y) && !grid.isWalkableAt(x - 1, y - dy) || grid.isWalkableAt(x + 1, y) && !grid.isWalkableAt(x + 1, y - dy)) {
      return [x, y];
    }
    if (this._jump(x + 1, y, x, y) || this._jump(x - 1, y, x, y)) {
      return [x, y];
    }
  } else {
    throw new Error("Only horizontal and vertical movements are allowed");
  }
  return this._jump(x + dx, y + dy, x, y);
};
JPFNeverMoveDiagonally$1.prototype._findNeighbors = function(node) {
  var parent = node.parent, x = node.x, y = node.y, grid = this.grid, px, py, dx, dy, neighbors = [], neighborNodes, neighborNode, i, l;
  if (parent) {
    px = parent.x;
    py = parent.y;
    dx = (x - px) / Math.max(Math.abs(x - px), 1);
    dy = (y - py) / Math.max(Math.abs(y - py), 1);
    if (dx !== 0) {
      if (grid.isWalkableAt(x, y - 1)) {
        neighbors.push([x, y - 1]);
      }
      if (grid.isWalkableAt(x, y + 1)) {
        neighbors.push([x, y + 1]);
      }
      if (grid.isWalkableAt(x + dx, y)) {
        neighbors.push([x + dx, y]);
      }
    } else if (dy !== 0) {
      if (grid.isWalkableAt(x - 1, y)) {
        neighbors.push([x - 1, y]);
      }
      if (grid.isWalkableAt(x + 1, y)) {
        neighbors.push([x + 1, y]);
      }
      if (grid.isWalkableAt(x, y + dy)) {
        neighbors.push([x, y + dy]);
      }
    }
  } else {
    neighborNodes = grid.getNeighbors(node, DiagonalMovement$4.Never);
    for (i = 0, l = neighborNodes.length; i < l; ++i) {
      neighborNode = neighborNodes[i];
      neighbors.push([neighborNode.x, neighborNode.y]);
    }
  }
  return neighbors;
};
var JPFNeverMoveDiagonally_1 = JPFNeverMoveDiagonally$1;
var JumpPointFinderBase$2 = JumpPointFinderBase_1;
var DiagonalMovement$3 = DiagonalMovement_1;
function JPFAlwaysMoveDiagonally$1(opt) {
  JumpPointFinderBase$2.call(this, opt);
}
JPFAlwaysMoveDiagonally$1.prototype = new JumpPointFinderBase$2();
JPFAlwaysMoveDiagonally$1.prototype.constructor = JPFAlwaysMoveDiagonally$1;
JPFAlwaysMoveDiagonally$1.prototype._jump = function(x, y, px, py) {
  var grid = this.grid, dx = x - px, dy = y - py;
  if (!grid.isWalkableAt(x, y)) {
    return null;
  }
  if (this.trackJumpRecursion === true) {
    grid.getNodeAt(x, y).tested = true;
  }
  if (grid.getNodeAt(x, y) === this.endNode) {
    return [x, y];
  }
  if (dx !== 0 && dy !== 0) {
    if (grid.isWalkableAt(x - dx, y + dy) && !grid.isWalkableAt(x - dx, y) || grid.isWalkableAt(x + dx, y - dy) && !grid.isWalkableAt(x, y - dy)) {
      return [x, y];
    }
    if (this._jump(x + dx, y, x, y) || this._jump(x, y + dy, x, y)) {
      return [x, y];
    }
  } else {
    if (dx !== 0) {
      if (grid.isWalkableAt(x + dx, y + 1) && !grid.isWalkableAt(x, y + 1) || grid.isWalkableAt(x + dx, y - 1) && !grid.isWalkableAt(x, y - 1)) {
        return [x, y];
      }
    } else {
      if (grid.isWalkableAt(x + 1, y + dy) && !grid.isWalkableAt(x + 1, y) || grid.isWalkableAt(x - 1, y + dy) && !grid.isWalkableAt(x - 1, y)) {
        return [x, y];
      }
    }
  }
  return this._jump(x + dx, y + dy, x, y);
};
JPFAlwaysMoveDiagonally$1.prototype._findNeighbors = function(node) {
  var parent = node.parent, x = node.x, y = node.y, grid = this.grid, px, py, dx, dy, neighbors = [], neighborNodes, neighborNode, i, l;
  if (parent) {
    px = parent.x;
    py = parent.y;
    dx = (x - px) / Math.max(Math.abs(x - px), 1);
    dy = (y - py) / Math.max(Math.abs(y - py), 1);
    if (dx !== 0 && dy !== 0) {
      if (grid.isWalkableAt(x, y + dy)) {
        neighbors.push([x, y + dy]);
      }
      if (grid.isWalkableAt(x + dx, y)) {
        neighbors.push([x + dx, y]);
      }
      if (grid.isWalkableAt(x + dx, y + dy)) {
        neighbors.push([x + dx, y + dy]);
      }
      if (!grid.isWalkableAt(x - dx, y)) {
        neighbors.push([x - dx, y + dy]);
      }
      if (!grid.isWalkableAt(x, y - dy)) {
        neighbors.push([x + dx, y - dy]);
      }
    } else {
      if (dx === 0) {
        if (grid.isWalkableAt(x, y + dy)) {
          neighbors.push([x, y + dy]);
        }
        if (!grid.isWalkableAt(x + 1, y)) {
          neighbors.push([x + 1, y + dy]);
        }
        if (!grid.isWalkableAt(x - 1, y)) {
          neighbors.push([x - 1, y + dy]);
        }
      } else {
        if (grid.isWalkableAt(x + dx, y)) {
          neighbors.push([x + dx, y]);
        }
        if (!grid.isWalkableAt(x, y + 1)) {
          neighbors.push([x + dx, y + 1]);
        }
        if (!grid.isWalkableAt(x, y - 1)) {
          neighbors.push([x + dx, y - 1]);
        }
      }
    }
  } else {
    neighborNodes = grid.getNeighbors(node, DiagonalMovement$3.Always);
    for (i = 0, l = neighborNodes.length; i < l; ++i) {
      neighborNode = neighborNodes[i];
      neighbors.push([neighborNode.x, neighborNode.y]);
    }
  }
  return neighbors;
};
var JPFAlwaysMoveDiagonally_1 = JPFAlwaysMoveDiagonally$1;
var JumpPointFinderBase$1 = JumpPointFinderBase_1;
var DiagonalMovement$2 = DiagonalMovement_1;
function JPFMoveDiagonallyIfNoObstacles$1(opt) {
  JumpPointFinderBase$1.call(this, opt);
}
JPFMoveDiagonallyIfNoObstacles$1.prototype = new JumpPointFinderBase$1();
JPFMoveDiagonallyIfNoObstacles$1.prototype.constructor = JPFMoveDiagonallyIfNoObstacles$1;
JPFMoveDiagonallyIfNoObstacles$1.prototype._jump = function(x, y, px, py) {
  var grid = this.grid, dx = x - px, dy = y - py;
  if (!grid.isWalkableAt(x, y)) {
    return null;
  }
  if (this.trackJumpRecursion === true) {
    grid.getNodeAt(x, y).tested = true;
  }
  if (grid.getNodeAt(x, y) === this.endNode) {
    return [x, y];
  }
  if (dx !== 0 && dy !== 0) {
    if (this._jump(x + dx, y, x, y) || this._jump(x, y + dy, x, y)) {
      return [x, y];
    }
  } else {
    if (dx !== 0) {
      if (grid.isWalkableAt(x, y - 1) && !grid.isWalkableAt(x - dx, y - 1) || grid.isWalkableAt(x, y + 1) && !grid.isWalkableAt(x - dx, y + 1)) {
        return [x, y];
      }
    } else if (dy !== 0) {
      if (grid.isWalkableAt(x - 1, y) && !grid.isWalkableAt(x - 1, y - dy) || grid.isWalkableAt(x + 1, y) && !grid.isWalkableAt(x + 1, y - dy)) {
        return [x, y];
      }
    }
  }
  if (grid.isWalkableAt(x + dx, y) && grid.isWalkableAt(x, y + dy)) {
    return this._jump(x + dx, y + dy, x, y);
  } else {
    return null;
  }
};
JPFMoveDiagonallyIfNoObstacles$1.prototype._findNeighbors = function(node) {
  var parent = node.parent, x = node.x, y = node.y, grid = this.grid, px, py, dx, dy, neighbors = [], neighborNodes, neighborNode, i, l;
  if (parent) {
    px = parent.x;
    py = parent.y;
    dx = (x - px) / Math.max(Math.abs(x - px), 1);
    dy = (y - py) / Math.max(Math.abs(y - py), 1);
    if (dx !== 0 && dy !== 0) {
      if (grid.isWalkableAt(x, y + dy)) {
        neighbors.push([x, y + dy]);
      }
      if (grid.isWalkableAt(x + dx, y)) {
        neighbors.push([x + dx, y]);
      }
      if (grid.isWalkableAt(x, y + dy) && grid.isWalkableAt(x + dx, y)) {
        neighbors.push([x + dx, y + dy]);
      }
    } else {
      var isNextWalkable;
      if (dx !== 0) {
        isNextWalkable = grid.isWalkableAt(x + dx, y);
        var isTopWalkable = grid.isWalkableAt(x, y + 1);
        var isBottomWalkable = grid.isWalkableAt(x, y - 1);
        if (isNextWalkable) {
          neighbors.push([x + dx, y]);
          if (isTopWalkable) {
            neighbors.push([x + dx, y + 1]);
          }
          if (isBottomWalkable) {
            neighbors.push([x + dx, y - 1]);
          }
        }
        if (isTopWalkable) {
          neighbors.push([x, y + 1]);
        }
        if (isBottomWalkable) {
          neighbors.push([x, y - 1]);
        }
      } else if (dy !== 0) {
        isNextWalkable = grid.isWalkableAt(x, y + dy);
        var isRightWalkable = grid.isWalkableAt(x + 1, y);
        var isLeftWalkable = grid.isWalkableAt(x - 1, y);
        if (isNextWalkable) {
          neighbors.push([x, y + dy]);
          if (isRightWalkable) {
            neighbors.push([x + 1, y + dy]);
          }
          if (isLeftWalkable) {
            neighbors.push([x - 1, y + dy]);
          }
        }
        if (isRightWalkable) {
          neighbors.push([x + 1, y]);
        }
        if (isLeftWalkable) {
          neighbors.push([x - 1, y]);
        }
      }
    }
  } else {
    neighborNodes = grid.getNeighbors(node, DiagonalMovement$2.OnlyWhenNoObstacles);
    for (i = 0, l = neighborNodes.length; i < l; ++i) {
      neighborNode = neighborNodes[i];
      neighbors.push([neighborNode.x, neighborNode.y]);
    }
  }
  return neighbors;
};
var JPFMoveDiagonallyIfNoObstacles_1 = JPFMoveDiagonallyIfNoObstacles$1;
var JumpPointFinderBase = JumpPointFinderBase_1;
var DiagonalMovement$1 = DiagonalMovement_1;
function JPFMoveDiagonallyIfAtMostOneObstacle$1(opt) {
  JumpPointFinderBase.call(this, opt);
}
JPFMoveDiagonallyIfAtMostOneObstacle$1.prototype = new JumpPointFinderBase();
JPFMoveDiagonallyIfAtMostOneObstacle$1.prototype.constructor = JPFMoveDiagonallyIfAtMostOneObstacle$1;
JPFMoveDiagonallyIfAtMostOneObstacle$1.prototype._jump = function(x, y, px, py) {
  var grid = this.grid, dx = x - px, dy = y - py;
  if (!grid.isWalkableAt(x, y)) {
    return null;
  }
  if (this.trackJumpRecursion === true) {
    grid.getNodeAt(x, y).tested = true;
  }
  if (grid.getNodeAt(x, y) === this.endNode) {
    return [x, y];
  }
  if (dx !== 0 && dy !== 0) {
    if (grid.isWalkableAt(x - dx, y + dy) && !grid.isWalkableAt(x - dx, y) || grid.isWalkableAt(x + dx, y - dy) && !grid.isWalkableAt(x, y - dy)) {
      return [x, y];
    }
    if (this._jump(x + dx, y, x, y) || this._jump(x, y + dy, x, y)) {
      return [x, y];
    }
  } else {
    if (dx !== 0) {
      if (grid.isWalkableAt(x + dx, y + 1) && !grid.isWalkableAt(x, y + 1) || grid.isWalkableAt(x + dx, y - 1) && !grid.isWalkableAt(x, y - 1)) {
        return [x, y];
      }
    } else {
      if (grid.isWalkableAt(x + 1, y + dy) && !grid.isWalkableAt(x + 1, y) || grid.isWalkableAt(x - 1, y + dy) && !grid.isWalkableAt(x - 1, y)) {
        return [x, y];
      }
    }
  }
  if (grid.isWalkableAt(x + dx, y) || grid.isWalkableAt(x, y + dy)) {
    return this._jump(x + dx, y + dy, x, y);
  } else {
    return null;
  }
};
JPFMoveDiagonallyIfAtMostOneObstacle$1.prototype._findNeighbors = function(node) {
  var parent = node.parent, x = node.x, y = node.y, grid = this.grid, px, py, dx, dy, neighbors = [], neighborNodes, neighborNode, i, l;
  if (parent) {
    px = parent.x;
    py = parent.y;
    dx = (x - px) / Math.max(Math.abs(x - px), 1);
    dy = (y - py) / Math.max(Math.abs(y - py), 1);
    if (dx !== 0 && dy !== 0) {
      if (grid.isWalkableAt(x, y + dy)) {
        neighbors.push([x, y + dy]);
      }
      if (grid.isWalkableAt(x + dx, y)) {
        neighbors.push([x + dx, y]);
      }
      if (grid.isWalkableAt(x, y + dy) || grid.isWalkableAt(x + dx, y)) {
        neighbors.push([x + dx, y + dy]);
      }
      if (!grid.isWalkableAt(x - dx, y) && grid.isWalkableAt(x, y + dy)) {
        neighbors.push([x - dx, y + dy]);
      }
      if (!grid.isWalkableAt(x, y - dy) && grid.isWalkableAt(x + dx, y)) {
        neighbors.push([x + dx, y - dy]);
      }
    } else {
      if (dx === 0) {
        if (grid.isWalkableAt(x, y + dy)) {
          neighbors.push([x, y + dy]);
          if (!grid.isWalkableAt(x + 1, y)) {
            neighbors.push([x + 1, y + dy]);
          }
          if (!grid.isWalkableAt(x - 1, y)) {
            neighbors.push([x - 1, y + dy]);
          }
        }
      } else {
        if (grid.isWalkableAt(x + dx, y)) {
          neighbors.push([x + dx, y]);
          if (!grid.isWalkableAt(x, y + 1)) {
            neighbors.push([x + dx, y + 1]);
          }
          if (!grid.isWalkableAt(x, y - 1)) {
            neighbors.push([x + dx, y - 1]);
          }
        }
      }
    }
  } else {
    neighborNodes = grid.getNeighbors(node, DiagonalMovement$1.IfAtMostOneObstacle);
    for (i = 0, l = neighborNodes.length; i < l; ++i) {
      neighborNode = neighborNodes[i];
      neighbors.push([neighborNode.x, neighborNode.y]);
    }
  }
  return neighbors;
};
var JPFMoveDiagonallyIfAtMostOneObstacle_1 = JPFMoveDiagonallyIfAtMostOneObstacle$1;
var DiagonalMovement = DiagonalMovement_1;
var JPFNeverMoveDiagonally = JPFNeverMoveDiagonally_1;
var JPFAlwaysMoveDiagonally = JPFAlwaysMoveDiagonally_1;
var JPFMoveDiagonallyIfNoObstacles = JPFMoveDiagonallyIfNoObstacles_1;
var JPFMoveDiagonallyIfAtMostOneObstacle = JPFMoveDiagonallyIfAtMostOneObstacle_1;
function JumpPointFinder(opt) {
  opt = opt || {};
  if (opt.diagonalMovement === DiagonalMovement.Never) {
    return new JPFNeverMoveDiagonally(opt);
  } else if (opt.diagonalMovement === DiagonalMovement.Always) {
    return new JPFAlwaysMoveDiagonally(opt);
  } else if (opt.diagonalMovement === DiagonalMovement.OnlyWhenNoObstacles) {
    return new JPFMoveDiagonallyIfNoObstacles(opt);
  } else {
    return new JPFMoveDiagonallyIfAtMostOneObstacle(opt);
  }
}
var JumpPointFinder_1 = JumpPointFinder;
var PathFinding = {
  "Heap": heap,
  "Node": Node_1,
  "Grid": Grid_1,
  "Util": Util$5,
  "DiagonalMovement": DiagonalMovement_1,
  "Heuristic": Heuristic$4,
  "AStarFinder": AStarFinder_1,
  "BestFirstFinder": BestFirstFinder_1,
  "BreadthFirstFinder": BreadthFirstFinder_1,
  "DijkstraFinder": DijkstraFinder_1,
  "BiAStarFinder": BiAStarFinder_1,
  "BiBestFirstFinder": BiBestFirstFinder_1,
  "BiBreadthFirstFinder": BiBreadthFirstFinder_1,
  "BiDijkstraFinder": BiDijkstraFinder_1,
  "IDAStarFinder": IDAStarFinder_1,
  "JumpPointFinder": JumpPointFinder_1
};
var pathfinding = PathFinding;
function getNextPointFromPosition(point, position) {
  switch (position) {
    case "top":
      return { x: point.x, y: point.y - 1 };
    case "bottom":
      return { x: point.x, y: point.y + 1 };
    case "left":
      return { x: point.x - 1, y: point.y };
    case "right":
      return { x: point.x + 1, y: point.y };
  }
}
function guaranteeWalkablePath(grid, point, position) {
  let node = grid.getNodeAt(point.x, point.y);
  while (!node.walkable) {
    grid.setWalkableAt(node.x, node.y, true);
    const next = getNextPointFromPosition(node, position);
    node = grid.getNodeAt(next.x, next.y);
  }
}
const gridRatio$1 = 10;
function graphToGridPoint(graphPoint, smallestX, smallestY) {
  let x = graphPoint.x / gridRatio$1;
  let y = graphPoint.y / gridRatio$1;
  let referenceX = smallestX / gridRatio$1;
  let referenceY = smallestY / gridRatio$1;
  if (referenceX < 1) {
    while (referenceX !== 1) {
      referenceX++;
      x++;
    }
  } else if (referenceX > 1) {
    while (referenceX !== 1) {
      referenceX--;
      x--;
    }
  }
  if (referenceY < 1) {
    while (referenceY !== 1) {
      referenceY++;
      y++;
    }
  } else if (referenceY > 1) {
    while (referenceY !== 1) {
      referenceY--;
      y--;
    }
  }
  return { x, y };
}
function gridToGraphPoint(gridPoint, smallestX, smallestY) {
  let x = gridPoint.x * gridRatio$1;
  let y = gridPoint.y * gridRatio$1;
  let referenceX = smallestX;
  let referenceY = smallestY;
  if (referenceX < gridRatio$1) {
    while (referenceX !== gridRatio$1) {
      referenceX = referenceX + gridRatio$1;
      x = x - gridRatio$1;
    }
  } else if (referenceX > gridRatio$1) {
    while (referenceX !== gridRatio$1) {
      referenceX = referenceX - gridRatio$1;
      x = x + gridRatio$1;
    }
  }
  if (referenceY < gridRatio$1) {
    while (referenceY !== gridRatio$1) {
      referenceY = referenceY + gridRatio$1;
      y = y - gridRatio$1;
    }
  } else if (referenceY > gridRatio$1) {
    while (referenceY !== gridRatio$1) {
      referenceY = referenceY - gridRatio$1;
      y = y + gridRatio$1;
    }
  }
  return { x, y };
}
function round(x, multiple = 10) {
  return Math.round(x / multiple) * multiple;
}
function roundDown(x, multiple = 10) {
  return Math.floor(x / multiple) * multiple;
}
function roundUp(x, multiple = 10) {
  return Math.ceil(x / multiple) * multiple;
}
const gridRatio = 10;
function createGrid(graph, nodes, source, target) {
  const { xMin, yMin, width, height } = graph;
  const mapColumns = width / gridRatio;
  const mapRows = height / gridRatio;
  const grid = new pathfinding.Grid(mapColumns, mapRows);
  nodes.forEach((node) => {
    const nodeStart = graphToGridPoint(node.topLeft, xMin, yMin);
    const nodeEnd = graphToGridPoint(node.bottomRight, xMin, yMin);
    for (let x = nodeStart.x; x < nodeEnd.x; x++) {
      for (let y = nodeStart.y; y < nodeEnd.y; y++) {
        grid.setWalkableAt(x, y, false);
      }
    }
  });
  const startGrid = graphToGridPoint(
    {
      x: round(source.x, gridRatio),
      y: round(source.y, gridRatio)
    },
    xMin,
    yMin
  );
  const endGrid = graphToGridPoint(
    {
      x: round(target.x, gridRatio),
      y: round(target.y, gridRatio)
    },
    xMin,
    yMin
  );
  const startingNode = grid.getNodeAt(startGrid.x, startGrid.y);
  guaranteeWalkablePath(grid, startingNode, source.position);
  const endingNode = grid.getNodeAt(endGrid.x, endGrid.y);
  guaranteeWalkablePath(grid, endingNode, target.position);
  const start = getNextPointFromPosition(startingNode, source.position);
  const end = getNextPointFromPosition(endingNode, target.position);
  return { grid, start, end };
}
function getMidPoint(Ax, Ay, Bx, By) {
  const Zx = (Ax - Bx) / 2 + Bx;
  const Zy = (Ay - By) / 2 + By;
  return [Zx, Zy];
}
function quadraticBezierCurve(points) {
  const X = 0;
  const Y = 1;
  let point = points[0];
  const first = points[0];
  let svgPath = `M${first[X]},${first[Y]}M`;
  for (let i = 0; i < points.length; i++) {
    const next = points[i];
    const midPoint = getMidPoint(point[X], point[Y], next[X], next[Y]);
    svgPath += ` ${midPoint[X]},${midPoint[Y]}`;
    svgPath += `Q${next[X]},${next[Y]}`;
    point = next;
  }
  const last = points[points.length - 1];
  svgPath += ` ${last[0]},${last[1]}`;
  return svgPath;
}
function drawSmoothLinePath(source, target, path) {
  const points = [[source.x, source.y], ...path, [target.x, target.y]];
  return quadraticBezierCurve(points);
}
function generatePath(grid, start, end) {
  const finder = new pathfinding.AStarFinder({
    diagonalMovement: pathfinding.DiagonalMovement.Always,
    allowDiagonal: true,
    dontCrossCorners: true
  });
  let path = [];
  try {
    path = finder.findPath(start.x, start.y, end.x, end.y, grid);
    path = pathfinding.Util.smoothenPath(grid, path);
  } catch {
  }
  return path;
}
function getBoundingBoxes(storeNodes, nodePadding = 0, graphPadding = 0, roundTo = 0) {
  nodePadding = Math.max(Math.round(nodePadding), 0);
  graphPadding = Math.max(Math.round(graphPadding), 0);
  roundTo = Math.max(Math.round(roundTo), 0);
  nodePadding = Number.isInteger(nodePadding) ? nodePadding : 0;
  graphPadding = Number.isInteger(graphPadding) ? graphPadding : 0;
  roundTo = Number.isInteger(roundTo) ? roundTo : 0;
  let xMax = Number.MIN_SAFE_INTEGER;
  let yMax = Number.MIN_SAFE_INTEGER;
  let xMin = Number.MAX_SAFE_INTEGER;
  let yMin = Number.MAX_SAFE_INTEGER;
  const nodes = storeNodes.map((node) => {
    const {
      computedPosition: { x, y },
      dimensions
    } = node;
    const width2 = Math.max(dimensions.width || 0, 1);
    const height2 = Math.max(dimensions.height || 0, 1);
    const position = {
      x: x || 0,
      y: y || 0
    };
    const topLeft2 = {
      x: position.x - nodePadding,
      y: position.y - nodePadding
    };
    const bottomLeft2 = {
      x: position.x - nodePadding,
      y: position.y + height2 + nodePadding
    };
    const topRight2 = {
      x: position.x + width2 + nodePadding,
      y: position.y - nodePadding
    };
    const bottomRight2 = {
      x: position.x + width2 + nodePadding,
      y: position.y + height2 + nodePadding
    };
    if (roundTo > 0) {
      topLeft2.x = roundDown(topLeft2.x, roundTo);
      topLeft2.y = roundDown(topLeft2.y, roundTo);
      bottomLeft2.x = roundDown(bottomLeft2.x, roundTo);
      bottomLeft2.y = roundUp(bottomLeft2.y, roundTo);
      topRight2.x = roundUp(topRight2.x, roundTo);
      topRight2.y = roundDown(topRight2.y, roundTo);
      bottomRight2.x = roundUp(bottomRight2.x, roundTo);
      bottomRight2.y = roundUp(bottomRight2.y, roundTo);
    }
    if (topLeft2.y < yMin) {
      yMin = topLeft2.y;
    }
    if (topLeft2.x < xMin) {
      xMin = topLeft2.x;
    }
    if (bottomRight2.y > yMax) {
      yMax = bottomRight2.y;
    }
    if (bottomRight2.x > xMax) {
      xMax = bottomRight2.x;
    }
    return {
      id: node.id,
      width: width2,
      height: height2,
      topLeft: topLeft2,
      bottomLeft: bottomLeft2,
      topRight: topRight2,
      bottomRight: bottomRight2
    };
  });
  xMax = xMax + graphPadding;
  yMax = yMax + graphPadding;
  xMin = xMin - graphPadding;
  yMin = yMin - graphPadding;
  const topLeft = {
    x: xMin,
    y: yMin
  };
  const bottomLeft = {
    x: xMin,
    y: yMax
  };
  const topRight = {
    x: xMax,
    y: yMin
  };
  const bottomRight = {
    x: xMax,
    y: yMax
  };
  const width = Math.abs(topLeft.x - topRight.x);
  const height = Math.abs(topLeft.y - bottomLeft.y);
  const graph = {
    topLeft,
    bottomLeft,
    topRight,
    bottomRight,
    width,
    height,
    xMax,
    yMax,
    xMin,
    yMin
  };
  return { nodes, graph };
}
const _hoisted_1$1 = ["d", "marker-end", "marker-start"];
const __default__$1 = {
  name: "PathFindingEdge",
  compatConfig: { MODE: 3 },
  inheritAttrs: false
};
const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
  ...__default__$1,
  props: {
    id: {},
    source: {},
    target: {},
    sourceX: {},
    sourceY: {},
    targetX: {},
    targetY: {},
    selected: { type: Boolean, default: false },
    animated: { type: Boolean },
    sourcePosition: { default: core.Position.Bottom },
    targetPosition: { default: core.Position.Top },
    label: {},
    labelStyle: { default: () => ({}) },
    labelShowBg: { type: Boolean, default: true },
    labelBgStyle: { default: () => ({}) },
    labelBgPadding: {},
    labelBgBorderRadius: {},
    style: {},
    markerEnd: {},
    markerStart: {},
    sourceHandleId: {},
    targetHandleId: {},
    sourceNode: {},
    targetNode: {},
    type: {},
    updatable: { type: Boolean },
    curvature: {},
    interactionWidth: {},
    data: {},
    events: {}
  },
  setup(__props) {
    const props = __props;
    const nodePadding = 10;
    const graphPadding = 20;
    const roundCoordinatesTo = gridRatio;
    const { getNodes } = core.useVueFlow();
    const centered = vue.computed(
      () => core.getSimpleBezierPath({
        ...props
      })
    );
    const source = vue.computed(() => ({
      x: props.sourceX,
      y: props.sourceY,
      position: props.sourcePosition
    }));
    const target = vue.computed(() => ({
      x: props.targetX,
      y: props.targetY,
      position: props.targetPosition
    }));
    const bb = vue.computed(() => getBoundingBoxes(getNodes.value, nodePadding, graphPadding, roundCoordinatesTo));
    const gridPath = vue.computed(() => {
      let path2 = [];
      if (target.value.x && source.value.x && getNodes.value.length) {
        const { grid, start, end } = createGrid(bb.value.graph, bb.value.nodes, source.value, target.value);
        path2 = generatePath(grid, start, end);
      }
      return path2;
    });
    const path = vue.computed(() => {
      var _a;
      let svgPath = "";
      if ((_a = gridPath.value) == null ? void 0 : _a.length) {
        const graphPath = gridPath.value.map((gridPoint) => {
          const [x, y] = gridPoint;
          const graphPoint = gridToGraphPoint({ x, y }, bb.value.graph.xMin, bb.value.graph.yMin);
          return [graphPoint.x, graphPoint.y];
        });
        svgPath = drawSmoothLinePath(source.value, target.value, graphPath);
      }
      return svgPath;
    });
    const attrs = vue.useAttrs();
    return (_ctx, _cache) => {
      return gridPath.value && gridPath.value.length <= 2 ? (vue.openBlock(), vue.createBlock(vue.unref(core.BezierEdge), vue.normalizeProps(vue.mergeProps({ key: 0 }, { ...props, ...vue.unref(attrs) })), null, 16)) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
        vue.createElementVNode("path", {
          style: vue.normalizeStyle({ ..._ctx.style, ...vue.unref(attrs).style }),
          class: "vue-flow__edge-path",
          d: path.value,
          "marker-end": _ctx.markerEnd,
          "marker-start": _ctx.markerStart
        }, null, 12, _hoisted_1$1),
        _ctx.label ? (vue.openBlock(), vue.createBlock(vue.unref(core.EdgeText), {
          key: 0,
          x: centered.value[1],
          y: centered.value[2],
          label: _ctx.label,
          "label-style": _ctx.labelStyle,
          "label-show-bg": _ctx.labelShowBg,
          "label-bg-style": _ctx.labelBgStyle,
          "label-bg-padding": _ctx.labelBgPadding,
          "label-bg-border-radius": _ctx.labelBgBorderRadius
        }, null, 8, ["x", "y", "label", "label-style", "label-show-bg", "label-bg-style", "label-bg-padding", "label-bg-border-radius"])) : vue.createCommentVNode("", true)
      ], 64));
    };
  }
});
var PI = Math.PI;
function modulate(value, rangeA, rangeB, clamp) {
  var fromLow = rangeA[0], fromHigh = rangeA[1];
  var toLow = rangeB[0], toHigh = rangeB[1];
  var result = toLow + (value - fromLow) / (fromHigh - fromLow) * (toHigh - toLow);
  {
    if (toLow < toHigh) {
      if (result < toLow) {
        return toLow;
      }
      if (result > toHigh) {
        return toHigh;
      }
    } else {
      if (result > toLow) {
        return toLow;
      }
      if (result < toHigh) {
        return toHigh;
      }
    }
  }
  return result;
}
function rotatePoint(x, y, cx, cy, angle) {
  var s = Math.sin(angle);
  var c = Math.cos(angle);
  var px = x - cx;
  var py = y - cy;
  var nx = px * c - py * s;
  var ny = px * s + py * c;
  return [nx + cx, ny + cy];
}
function getDistance(x0, y0, x1, y1) {
  return Math.hypot(y1 - y0, x1 - x0);
}
function getAngle(x0, y0, x1, y1) {
  return Math.atan2(y1 - y0, x1 - x0);
}
function projectPoint(x0, y0, a, d) {
  return [Math.cos(a) * d + x0, Math.sin(a) * d + y0];
}
function getPointBetween(x0, y0, x1, y1, d) {
  if (d === void 0) {
    d = 0.5;
  }
  return [x0 + (x1 - x0) * d, y0 + (y1 - y0) * d];
}
function getSector(a, s) {
  if (s === void 0) {
    s = 8;
  }
  return Math.floor(s * (0.5 + a / (PI * 2) % s));
}
function getAngliness(x0, y0, x1, y1) {
  return Math.abs((x1 - x0) / 2 / ((y1 - y0) / 2));
}
function getArrow(x0, y0, x1, y1, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$bow = _options.bow, bow = _options$bow === void 0 ? 0 : _options$bow, _options$stretch = _options.stretch, stretch = _options$stretch === void 0 ? 0.5 : _options$stretch, _options$stretchMin = _options.stretchMin, stretchMin = _options$stretchMin === void 0 ? 0 : _options$stretchMin, _options$stretchMax = _options.stretchMax, stretchMax = _options$stretchMax === void 0 ? 420 : _options$stretchMax, _options$padStart = _options.padStart, padStart = _options$padStart === void 0 ? 0 : _options$padStart, _options$padEnd = _options.padEnd, padEnd = _options$padEnd === void 0 ? 0 : _options$padEnd, _options$flip = _options.flip, flip = _options$flip === void 0 ? false : _options$flip, _options$straights = _options.straights, straights = _options$straights === void 0 ? true : _options$straights;
  var angle = getAngle(x0, y0, x1, y1);
  var dist = getDistance(x0, y0, x1, y1);
  var angliness = getAngliness(x0, y0, x1, y1);
  if (dist < (padStart + padEnd) * 2 || bow === 0 && stretch === 0 || straights && [0, 1, Infinity].includes(angliness)) {
    var ps = Math.max(0, Math.min(dist - padStart, padStart));
    var pe = Math.max(0, Math.min(dist - ps, padEnd));
    var _projectPoint = projectPoint(x0, y0, angle, ps), _px = _projectPoint[0], _py = _projectPoint[1];
    var _projectPoint2 = projectPoint(x1, y1, angle + Math.PI, pe), _px2 = _projectPoint2[0], _py2 = _projectPoint2[1];
    var _getPointBetween = getPointBetween(_px, _py, _px2, _py2, 0.5), _mx = _getPointBetween[0], _my = _getPointBetween[1];
    return [_px, _py, _mx, _my, _px2, _py2, angle, angle, angle];
  }
  var rot = (getSector(angle) % 2 === 0 ? 1 : -1) * (flip ? -1 : 1);
  var arc = bow + modulate(dist, [stretchMin, stretchMax], [1, 0]) * stretch;
  var _getPointBetween2 = getPointBetween(x0, y0, x1, y1, 0.5), mx = _getPointBetween2[0], my = _getPointBetween2[1];
  var _getPointBetween3 = getPointBetween(x0, y0, x1, y1, 0.5 - arc), cx = _getPointBetween3[0], cy = _getPointBetween3[1];
  var _rotatePoint = rotatePoint(cx, cy, mx, my, Math.PI / 2 * rot);
  cx = _rotatePoint[0];
  cy = _rotatePoint[1];
  var a0 = getAngle(x0, y0, cx, cy);
  var _projectPoint3 = projectPoint(x0, y0, a0, padStart), px0 = _projectPoint3[0], py0 = _projectPoint3[1];
  var a1 = getAngle(x1, y1, cx, cy);
  var _projectPoint4 = projectPoint(x1, y1, a1, padEnd), px1 = _projectPoint4[0], py1 = _projectPoint4[1];
  var as = getAngle(cx, cy, x0, y0);
  var ae = getAngle(cx, cy, x1, y1);
  var _getPointBetween4 = getPointBetween(px0, py0, px1, py1, 0.5), mx1 = _getPointBetween4[0], my1 = _getPointBetween4[1];
  var _getPointBetween5 = getPointBetween(px0, py0, px1, py1, 0.5 - arc), cx1 = _getPointBetween5[0], cy1 = _getPointBetween5[1];
  var _rotatePoint2 = rotatePoint(cx1, cy1, mx1, my1, Math.PI / 2 * rot);
  cx1 = _rotatePoint2[0];
  cy1 = _rotatePoint2[1];
  var _getPointBetween6 = getPointBetween(cx, cy, cx1, cy1, 0.5), cx2 = _getPointBetween6[0], cy2 = _getPointBetween6[1];
  return [px0, py0, cx2, cy2, px1, py1, ae, as, angle];
}
const _hoisted_1 = ["d", "marker-end", "marker-start"];
const __default__ = {
  name: "PerfectArrow",
  compatConfig: { MODE: 3 },
  inheritAttrs: false
};
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...__default__,
  props: {
    id: {},
    source: {},
    target: {},
    sourceX: {},
    sourceY: {},
    targetX: {},
    targetY: {},
    selected: { type: Boolean },
    animated: { type: Boolean },
    sourcePosition: {},
    targetPosition: {},
    label: {},
    labelStyle: {},
    labelShowBg: { type: Boolean },
    labelBgStyle: {},
    labelBgPadding: {},
    labelBgBorderRadius: {},
    style: {},
    markerEnd: {},
    markerStart: {},
    sourceHandleId: {},
    targetHandleId: {},
    options: { default: () => ({
      padStart: 3,
      padEnd: 3,
      stretch: 0.2
    }) }
  },
  setup(__props) {
    const props = __props;
    const centered = vue.computed(
      () => core.getSimpleBezierPath({
        ...props
      })
    );
    const arrow = vue.computed(() => {
      return getArrow(props.sourceX, props.sourceY, props.targetX, props.targetY, {
        ...props.options
      });
    });
    const attrs = vue.useAttrs();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
        vue.createElementVNode("path", {
          style: vue.normalizeStyle({ ..._ctx.style, ...vue.unref(attrs).style }),
          class: "vue-flow__edge-path vue-flow__perfect-arrow",
          d: `M${arrow.value[0]},${arrow.value[1]} Q${arrow.value[2]},${arrow.value[3]} ${arrow.value[4]},${arrow.value[5]}`,
          "marker-end": _ctx.markerEnd,
          "marker-start": _ctx.markerStart
        }, null, 12, _hoisted_1),
        _ctx.label ? (vue.openBlock(), vue.createBlock(vue.unref(core.EdgeText), {
          key: 0,
          x: centered.value[1],
          y: centered.value[2],
          label: _ctx.label,
          "label-style": _ctx.labelStyle,
          "label-show-bg": _ctx.labelShowBg,
          "label-bg-style": _ctx.labelBgStyle,
          "label-bg-padding": _ctx.labelBgPadding,
          "label-bg-border-radius": _ctx.labelBgBorderRadius
        }, null, 8, ["x", "y", "label", "label-style", "label-show-bg", "label-bg-style", "label-bg-padding", "label-bg-border-radius"])) : vue.createCommentVNode("", true)
      ], 64);
    };
  }
});
exports.PathFindingEdge = _sfc_main$1;
exports.PerfectArrow = _sfc_main;
