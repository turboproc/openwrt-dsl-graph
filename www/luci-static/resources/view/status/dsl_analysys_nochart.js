'use strict';
'require view';
'require fs';
'require ui';


return view.extend({
        load: function() {

                  return Promise.all([
                      fs.exec_direct('/sbin/dsl_cpe_pipe.sh', ['g997sansg', '0']),
                      fs.exec_direct('/sbin/dsl_cpe_pipe.sh', ['g997sansg', '1']),
                      fs.exec_direct('/sbin/dsl_cpe_pipe.sh', ['g997bansg', '0']),
                      fs.exec_direct('/sbin/dsl_cpe_pipe.sh', ['g997bansg', '1'])
                  ]);
        },


        render: function(data) {

                var v = E([], [
                        E('h2', {'style': "height: 40px"}, [ _('DSL line statistics') ]),
                        E('p', {}, 'Graphs below show Sginal to Noise ratio and Bits/tone across DSL spectrum'),
                        E('div', {'style':'display:none', 'id':'usdB'}, data[0] ),
                        E('div', {'style':'display:none','id':'dsdB'}, data[1] ),
                        E('div', {'style':'display:none','id':'usBits'}, data[2] ),
                        E('div', {'style':'display:none','id':'dsBits'}, data[3] ),
                        E('div', {'style': "height: 300px"},
                                 E('canvas', {
                                      'id': 'dbChart',
                                      'height': 360,
                                      'width': 1024},
                                      ["chart"])
                        ),
                        E('div', {'style': "height: 300px"},
                                 E('canvas', {
                                       'id': 'bitsChart',
                                       'height': 360,
                                       'width': 1024},
                                      ["chart2"])
                        ),
                        //E('script', {}, '[\'/luci-static/resources/view/status/chart.min.js\',\'/luci-static/resources/view/status/dsl-graph.js\'].forEach(function(src) {var script = document.createElement(\'script\');script.src = src;script.async = false;document.head.appendChild(script);}); '
                        //)
                        E('script', {'src':'/luci-static/resources/view/status/dsl-graph-new.js'}, {}
                        )
                ]);


        //console.log(v);
        return v;
        },

        handleSaveApply: null,
        handleSave: null,
        handleReset: null
});
