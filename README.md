# openwrt-dsl-graph
Additional files to add a DSL spectrum line statistics graph to OpenWRT.

The page is included in the Status dropdown menu and appears as 
'DSL line statistics'

This repositiory contains two solutions, one solution based on the standard 
chart.js package for rendering the graphs, a second solution based of a small
bespoke rendering package, just sufficient to create the graphs required and
significant faster.

The solution being used depends on the dsl_analysis*.js file being used. The
file of choice needs to be renamed to dsl_analysis.js

A local copy of it chart.min.js is included. This will allow the graph to be
rendered even in an offline situation.

Example of the graph is shown below
![alt text](https://github.com/turboproc/openwrt-dsl-graph/blob/main/pics/dsl-spectrum.png)
