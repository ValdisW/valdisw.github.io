let functions = new Array();
functions[0] = function (x) { return new Complex(Math.asin(Math.abs(Math.sin((x + Math.PI) / 2)))/Math.PI*2, 0)};            // 三角波
functions[1] = function (x) { if (x >= 0) return new Complex(x % 1, 0); else return new Complex(x % 1 + 1, 0)};                                       // 锯齿波
functions[2] = function (x) { return new Complex(Math.ceil(Math.cos(x)) - 0.5, 0)};                                                 // 方波
