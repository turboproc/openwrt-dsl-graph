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
                        E('h2', {'style': "height: 40px"}, [ _('DSL spectrum') ]),
                        E('p', {}, 'Graphs below show SNr ratio and Bits/tone across DSL spectrum'),
                        E('div', {'style':'display:none', 'id':'usdB'}, data[0] ),
                        E('div', {'style':'display:none','id':'dsdB'}, data[1] ),
                        E('div', {'style':'display:none','id':'usBits'}, data[2] ),
                        E('div', {'style':'display:none','id':'dsBits'}, data[3] ),
                        E('div', {'style': "height: 300px"},
                                 E('canvas', {
                                      'id': 'dbChart'},
                                      ["chart"])
                        ),
                        E('div', {'style': "height: 300px"},
                                 E('canvas', {
                                       'id': 'bitsChart'},
                                      ["chart2"])
                        ),
                        E('script', {}, '[\'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.8.0/chart.min.js\',\'https://dsl-02.mynet.lan/luci-static/resources/view/status/dsl-graph.js\'].forEach(function(src) {var script = document.createElement(\'script\');script.src = src;script.async = false;document.head.appendChild(script);}); '
                        )
                ]);


        //console.log(v);
        return v;
        },

        handleSaveApply: null,
        handleSave: null,
        handleReset: null
});
