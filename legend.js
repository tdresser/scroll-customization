var COLORS = ["green", "orange", "purple", "blue"];

function addLegend() {
  var COMMENTS = ["Native scroller", "JS applyScroll", "JS distributeScroll", "JS scroller"];

  var legend = document.createElement("table");
  legend.style.borderSpacing = 0;
  legend.style.width="100%";
  var legend_row = document.createElement("tr");
  legend.appendChild(legend_row);
  for (var i = 0; i < COLORS.length; ++i) {
    var td = document.createElement("td");
    td.style.background = COLORS[i % 4];
    td.style.padding = "1em";
    td.innerHTML = COMMENTS[i];
    legend_row.appendChild(td);
  }
  document.body.appendChild(legend);
}
