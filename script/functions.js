let functions = new Array();
functions[0] = function (x) { return new Complex(Math.asin(Math.abs(Math.sin((x + Math.PI) / 2))), 0)};            // 三角波
functions[1] = function (x) { return new Complex(Math.atan(Math.tan(x * Math.PI)), 0)};                                       // 锯齿波
functions[2] = function (x) { return new Complex(Math.ceil(Math.cos(x)) - 0.5, 0)};                                                 // 方波
