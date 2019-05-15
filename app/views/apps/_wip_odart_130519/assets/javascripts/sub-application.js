
$(document).ready(function() {


//
// GLOBAL VARIABLES
//
// var root = appDirName;
// console.log(root);
var pageName = $("section#viewID").data('page-name');
console.log(pageName)
var userType = localStorage.getItem("userType");

//
// GLOBAL FUNCTIONS
//

//
// set banner org name
//

// localStorage.setItem("userOrg","Met Office")
$(".company-name").text(localStorage.getItem("userOrg"));

//
// beis or dp
//
if ( userType == 0 ) {
  $("#beisNav.header-organisation").removeClass("hide");
} else {
  $("#partnerNav.header-organisation").removeClass("hide");
}

//
// History back button
//
$(".govuk-back-link").click(function(e){
  e.preventDefault();
  window.history.back();
})

//
// Word count
//
var wordLen = $("#wordlimit").data("max-length-in-words");
var len;
    $(".words-left").html(wordLen+ ' words left');
    $('#wordlimit').keydown(function(event) {
        len = $('#wordlimit').val().split(/[\s]+/);
        console.log(len.length + " words are typed out of an available " + wordLen);
        wordsLeft = (wordLen) - len.length;
        if (len.length <= wordLen) {
            $('.words-left').html(wordsLeft+ ' words left');
        } else {
            $('.words-left').html((wordsLeft *= -1 ) + ' words too many');
        }
    });

//
// _PAGE FUNCTIONS
//
switch (pageName) {
   case 'trackerSubmitJourneyLogic':
       trackerSubmitJourneyLogic();
       break;
   case 'submitDataTable':
       submitDataTable();
       break;
   case 'beisReportingDashboard':
       beisReportingDashboard();
       break;
   case 'approveTrackerUserJourney':
       approveTrackerUserJourney();
       break;
   case 'odartLanding':
       odartLanding();
       break;
   case 'beisDashboard':
       beisDashboard();
       break;
   case 'biesReporting':
       biesReporting();
       break;
   default: break;
}

function biesReporting(){
  $("body").addClass("wide");


// accordion

$(".related .relatedBody").addClass("hide");


$(".related .relatedHeader").click(function(e){
  $(this).next().toggleClass("hide");
  $(this).children(".fa").toggleClass("fa-plus");
  $(this).children(".fa").toggleClass("fa-minus");
  // $(this).parent($("i").toggleClass("fa-minus"));
  // $(this).parent().css("background","red");
  // $(this).parent().css("background","red").closest("i").toggleClass("fa-plus");
  // $(".relatedHeader i", this).toggleClass("fa-minus");
});

// filter drop downs

$('#select-region').selectize({
});
$('#select-country').selectize({
  maxItems: 3
});
$('#select-approval').selectize({
  maxItems: 3
});
$('#select-activity').selectize({
  maxItems: 3
});
$('#select-dp').selectize({
  maxItems: 10
});

$('#select-keywords').selectize({
    delimiter: ',',
    persist: false,
    create: function(input) {
        return {
            value: input,
            text: input
        }
    }
})


var $width = $("#fundDistribution").parent().width()

  // set the dimensions and margins of the graph
  var margin = {top: 80, right: 30, bottom: 50, left:110},
      // width = 460 - margin.left - margin.right,
      width = $("#fundDistribution").parent().width() - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select("#fundDistribution")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  //read data
  d3.csv("/public/files/ebolaChart.csv", function(data) {

    // Get the different categories and count them
    var categories = ["Congo", "Cote d'Ivoire", "DR of Congo", "Gabon", "Guinea", "Leone", "Liberia", "Mali", "Nigeria","Senegal","Sierra Leone","South Africa","South Sudan","Uganda" ]
    var n = categories.length

    // Compute the mean of each group
    allMeans = []
    for (i in categories){
      currentGroup = categories[i]
      mean = d3.mean(data, function(d) { return +d[currentGroup] })
      allMeans.push(mean)
    }

    // Create a color scale using these means.
    var myColor = d3.scaleSequential()
      .domain([0,100])
      .interpolator(d3.interpolateViridis);

    // Add X axis
    var x = d3.scaleLinear()
      .domain([-10, 120])
      .range([ 0, width ]);
    svg.append("g")
      .attr("class", "xAxis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickValues([0,25, 50, 75, 100]).tickSize(-height) )
      .select(".domain").remove()

    // Add X axis label:
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + 40)
        .text("Spend over time (days)");

    // Create a Y scale for densities
    var y = d3.scaleLinear()
      .domain([0, 0.25])
      .range([ height, 0]);

    // Create the Y axis for names
    var yName = d3.scaleBand()
      .domain(categories)
      .range([0, height])
      .paddingInner(1)
    svg.append("g")
      .call(d3.axisLeft(yName).tickSize(0))
      .select(".domain").remove()

    // Compute kernel density estimation for each column:
    var kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(40)) // increase this 40 for more accurate density.
    var allDensity = []
    for (i = 0; i < n; i++) {
        key = categories[i]
        density = kde( data.map(function(d){  return d[key]; }) )
        allDensity.push({key: key, density: density})
    }

    // Add areas
    svg.selectAll("areas")
      .data(allDensity)
      .enter()
      .append("path")
        .attr("transform", function(d){return("translate(0," + (yName(d.key)-height) +")" )})
        .attr("fill", function(d){
          grp = d.key ;
          index = categories.indexOf(grp)
          value = allMeans[index]
          return myColor( value  )
        })
        .datum(function(d){return(d.density)})
        .attr("opacity", 0.7)
        .attr("stroke", "#000")
        .attr("stroke-width", 0.1)
        .attr("d",  d3.line()
            .curve(d3.curveBasis)
            .x(function(d) { return x(d[0]); })
            .y(function(d) { return y(d[1]); })
        )

  })

  // This is what I need to compute kernel density estimation
  function kernelDensityEstimator(kernel, X) {
    return function(V) {
      return X.map(function(x) {
        return [x, d3.mean(V, function(v) { return kernel(x - v); })];
      });
    };
  }
  function kernelEpanechnikov(k) {
    return function(v) {
      return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
    };
  }


//
// load table from google sheets
//

// Load sheets tab
//https://docs.google.com/spreadsheets/d/e/2PACX-1vQB7ZF2mUhIfHa7faqxPB3tXYdQWp9GIEm05KHwkJMygMZjpWb_fOVfQ8SvFU7WkkV58Uw78-PNsnAs/pubhtml
//https://docs.google.com/spreadsheets/d/12wkNTS4OYOjbFABbEchxClTYI4cZU9k7PSdHS-i4PZ8/edit?usp=sharing
       var googleDoc = 'https://docs.google.com/spreadsheets/d/12wkNTS4OYOjbFABbEchxClTYI4cZU9k7PSdHS-i4PZ8/edit?usp=sharing';
       // var googleDoc = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQB7ZF2mUhIfHa7faqxPB3tXYdQWp9GIEm05KHwkJMygMZjpWb_fOVfQ8SvFU7WkkV58Uw78-PNsnAs/pubhtml';

       function googleTables() {
           Tabletop.init({
               key: googleDoc,
               callback: showInfoA,
               simpleSheet: false
           })
       }
       function showInfoA(data, tabletop) {
           loadTableArray(data);
       }

       function loadTableArray(data) {
           var content = "";
           var sheetLength = data.sheet1.elements.length;
           for (i = 0; i < data.sheet1.elements.length; i++) {
             if ( i == sheetLength - 1 ) {
               content += '<tr class="govuk-table__row">';
               content += '<td class="govuk-table__header">' + data.sheet1.elements[i].delivery_partner + '</td>';
               content += '<td class="govuk-table__header">' + data.sheet1.elements[i].actuals + '</td>';
               content += '<td class="govuk-table__header">' + data.sheet1.elements[i].forecast + '</td>';
               content += '<td class="govuk-table__header">' + data.sheet1.elements[i].narrative + '</td>';
               content += '<td class="govuk-table__header">' + data.sheet1.elements[i].delivery_status +'</td>';
               content += '<td class="govuk-table__header">' + data.sheet1.elements[i].tracker_status +'</td>';
               content += '<td class="govuk-table__header">' + data.sheet1.elements[i].budget_month +'</td>';
               content += '<td class="govuk-table__header">' + data.sheet1.elements[i].budget_activity +'</td>';
               content += '</tr>';
             } else {
               content += '<tr class="govuk-table__row">';
               content += '<td class="govuk-table__cell">' + data.sheet1.elements[i].delivery_partner + '</td>';
               content += '<td class="govuk-table__cell">' + data.sheet1.elements[i].actuals + '</td>';
               content += '<td class="govuk-table__cell">' + data.sheet1.elements[i].forecast + '</td>';
               content += '<td class="govuk-table__cell">' + data.sheet1.elements[i].narrative + '</td>';
               content += '<td class="govuk-table__cell">' + data.sheet1.elements[i].delivery_status +'</td>';
               content += '<td class="govuk-table__cell">' + data.sheet1.elements[i].tracker_status +'</td>';
               content += '<td class="govuk-table__cell">' + data.sheet1.elements[i].budget_month +'</td>';
               content += '<td class="govuk-table__cell">' + data.sheet1.elements[i].budget_activity +'</td>';
               content += '</tr>';
             }

                   }
           renderTable(content);
           $("#resultCount").text(sheetLength - 1)
       }

       function renderTable(content) {
               $("#trackerReviewTable tbody").html(content);
       }

googleTables();

}

function odartLanding(){
// var myemail = "@yahoo";
$(".govuk-button").click(function(e){
  e.preventDefault();
  myemail = $("#email").val();

  switch (myemail) {
     case 'louise.emerson@bbsrc.ukri.org':
          localStorage.setItem("userType",1)
          localStorage.setItem("userOrg","BBSRC")
          localStorage.setItem("userName","Louise")
         break;
     case 'frances.medaney@bbsrc.ukri.org':
          localStorage.setItem("userType",1)
          localStorage.setItem("userOrg","Biotechnology and Biological Sciences Research Council")
          localStorage.setItem("userName","Frances")
         break;
     case 'emily.harris@ahrc.ukri.org':
          localStorage.setItem("userType",1)
          localStorage.setItem("userOrg","Arts and Humanities Research Council")
          localStorage.setItem("userName","Emily")
         break;
     case 'theresa.meacham@bbsrc.ukri.org':
          localStorage.setItem("userType",1)
          localStorage.setItem("userOrg","Biotechnology and Biological Sciences Research Council")
          localStorage.setItem("userName","Theresa")
         break;
     case 'rebecca.tanner@ukri.org':
          localStorage.setItem("userType",0)
          localStorage.setItem("userOrg","UKRI")
          localStorage.setItem("userName","Rebecca")
         break;
     case 'ryan.ahmed@royalsociety.org':
          localStorage.setItem("userType",1)
          localStorage.setItem("userOrg","Royal Society")
          localStorage.setItem("userName","Ryan")
         break;
     case 'ben.austin@britishcouncil.org':
          localStorage.setItem("userType",1)
          localStorage.setItem("userOrg","British Council")
          localStorage.setItem("userName","Ben")
         break;
     case 'kemi.olafare@britishcouncil.org':
          localStorage.setItem("userType",1)
          localStorage.setItem("userOrg","British Council")
          localStorage.setItem("userName","Kemi")
         break;
     case 'alexander.lauder-bliss@newtonfund.ac.uk':
          localStorage.setItem("userType",0)
          localStorage.setItem("userOrg","Newton Fund")
          localStorage.setItem("userName","Alexander")
         break;
         case 'odeta.butkute@beis.gov.uk':
          localStorage.setItem("userType",0)
          localStorage.setItem("userOrg","BEIS")
          localStorage.setItem("userName","Admin")
         default: break;
   }

if ( localStorage.getItem("userType") == 0 ) {
  window.location.href = "beis/dashboard";
} else {
  window.location.href = "partner/dashboard";
}

   // if (myemail.endsWith('@beis.gov.uk')) {
   //   // go to beis view
   //     console.log("it ends in @beis.gov.uk")
   //     localStorage.setItem("userType",0)
   //     localStorage.setItem("userOrg","BEIS")
   //     window.location.href = "beis/dashboard";
   // } else {
   //   // go to delivery partner view
   //   localStorage.setItem("userType",1)
   //   window.location.href = "partner/dashboard";
   // }


})
}

function beisDashboard(){



  var chart = c3.generate({
    bindto: "#timeChart",
      data: {
          columns: [
              ['data1', 300, 350, 300, 0, 0, 0],
              ['data2', 130, 100, 140, 200, 150, 50]
          ],
          types: {
              data1: 'area',
              data2: 'area-spline'
          }
      }
  });


  var chart = c3.generate({
    bindto: "#guageChart",
      data: {
          columns: [
              ['data', 91.4]
          ],
          type: 'gauge',
          onclick: function (d, i) { console.log("onclick", d, i); },
          onmouseover: function (d, i) { console.log("onmouseover", d, i); },
          onmouseout: function (d, i) { console.log("onmouseout", d, i); }
      },
      gauge: {
  //        label: {
  //            format: function(value, ratio) {
  //                return value;
  //            },
  //            show: false // to turn off the min/max labels.
  //        },
  //    min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
  //    max: 100, // 100 is default
  //    units: ' %',
  //    width: 39 // for adjusting arc thickness
      },
      color: {
          pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
          threshold: {
  //            unit: 'value', // percentage is default
  //            max: 200, // 100 is default
              values: [30, 60, 90, 100]
          }
      },
      size: {
          height: 180
      }
  });

}

function beisReportingDashboard(){
}

function approveTrackerUserJourney(){
  alert("boom")
  $(".govuk-button").click(function(e){
    e.preventDefault();
    state = $("input[name=choose-journey]:checked").val()
    console.log(state);
    if (state === "approve") {
        window.location.href = "data-table/start";
    } else {
      window.location.href = "file-upload/start";
    }
  })
}

function submitDataTable(){
  $(".subsection__header").click(function(){
    $(this).next().toggle();
    $(this).parent().toggleClass("subsection--is-open");
    // $(this).after('<tr><td>my data</td><td>more data</td></tr>');
  })

  // js table

  data = [
      ['Policy workshops and working group participation',"GCRF001",100034.00,,,,],
      ['Carbon collection project', "GCRF002",100034.00,,,,],
      ['Filtration tooling', "GCRF003",10900.00,,,,],
      ['Environmental Remediation Account for Central Asia (ERA)', "GCRF004",100033.00,,,,],
      ['Design of Adapt Environmental and Climate Resilience Programme', "GCRF005",100034.00,,,,],
      ['Technical Assistance Package on Environment and Climate for Papua Island', "GCRF006",100033.00,,,,],
      ['Provision of finance to the Rwanda Fund for Climate Change and Environment', "GCRF007",58422.39,,,,],
      ['Implementation of Adapt Environmental and Climate Resilience in Sudan', "GCRF008",44699.56,,,,],
      ['Implementation of Adapt Environmental and Climate Resilience in Sudan', "GCRF009",50309.56,,,,],
      ['Advisory support on business environment reform', "GCRF010",57826.04,,,,],
      ['PMEH - Polution Management and Environmental Health', "GCRF011",10900.00,,,,],
      ['Polution Management and Environmental Health - International Climate Fund', "GCRF012",100034.00,,,,],
      ['Polution Management and Environmental Health - Energy water research', "GCRF013",10900.00,,,,],
      ['SHEAR - To provide scientific results that will improve sub Saharan resilience to respond to natural hazards and emergencies - Joint project with Natural Environment Research Council', "GCRF014",48356.27,,,,],
      ['Strengthening social and environmental risk management via Not for Profits and Civil Society organisations', "GCRF015",84898.98,,,,]
    ];

  $('#jexcel-0').jexcel({
      data:data,
      colHeaders: ['Activity name', 'Acitvity ID', 'Apr 19', 'May 19', 'Jun 19', 'Q2', 'Narrative (optional)'],
      colWidths: [ 200, 120, 70, 100, 100, 100, 250 ],
      columns: [
          { type: 'text',readOnly:true,wordWrap:true},
          { type: 'text',readOnly:true},
          { type: 'text', readOnly:true},
          { type: 'numeric'},
          { type: 'numeric'},
          { type: 'numeric'},
          { type: 'text',wordWrap:true}
      ],
      nestedHeaders:[
          [
              { title:'', colspan:'2' },
              { title:'Cash', colspan:'3' },
              { title:'Accruals', colspan:'1' },
              { title:'', colspan:'1' },
          ]
        ]
  });

  $('#jexcel-1').jexcel({
      data:data,
      colHeaders: ['Activity name', 'Acitvity ID', 'Apr 19', 'May 19', 'Jun 19', 'Q2', 'Narrative'],
      colWidths: [ 200, 120, 70, 100, 100, 100, 250 ],
      columns: [
          { type: 'text',readOnly:true,wordWrap:true},
          { type: 'text',readOnly:true},
          { type: 'text', readOnly:true},
          { type: 'numeric'},
          { type: 'numeric'},
          { type: 'numeric'},
          { type: 'text',wordWrap:true}
      ],
      nestedHeaders:[
          [
              { title:'', colspan:'2' },
              { title:'Cash', colspan:'3' },
              { title:'Accruals', colspan:'1' },
              { title:'', colspan:'1' },
          ]
        ]
  });
}

function trackerSubmitJourneyLogic(){
    $(".govuk-button").click(function(e){
      e.preventDefault();
      state = $("input[name=choose-journey]:checked").val()
      if (state === "online") {
          window.location.href = "data-table/start";
      } else {
          window.location.href = "file-upload/start";
      }
    })
  }

function beisReportingDashboard(){
  var chart = c3.generate({
      bindto: '#chart',
      data: {
        columns: [
          ['data1', 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250],
          ['data2', 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 321, 22],
          ['data3', 50, 20, 10, 40, 15, 25, 30, 200, 222, 332, 533, 432],
          ['data4', 50, 20, 10, 40, 15, 25, 30, 200, 221, 342, 112, 235]
        ],
          type: 'area',
          colors: {
              data1: '#d53880',
              data2: '#2e358b',
              data3: '#912b88',
              data3: '#cccccc'
          },
          names: {
              data1: 'Levy in',
              data2: 'Traiing costs',
              data3: 'Co-investment',
              data4: 'Transfers'
          }
      },
      subchart: {
              show: true
          },
          zoom: {
          enabled: true
          }

  });
}


//
// OLD FUNCTIONS
//
function fatStandard(){
    $(document).keypress(function(e) {
        if(e.which == 13) {
            alert("fire")
            e.preventDefault();
            $("#epa .details").addClass("hidden");
            $("#epa details").removeClass("hidden");
        }
    });
}

function forecastViewCommitments(){
    userAuth = localStorage.getItem("userAuth");
                if (userAuth != "false") {
           //$("#forecasted").hide()

        } else {
           $("#forecasted").hide()
        }
}

function forecastViewLevy(){
      $(".button").click(function(e){
        e.preventDefault();
        if (localStorage.getItem("userAuth") == "false") {
            window.location.href = "view-commitments";
        } else {
            window.location.href = "add-cohort-wizard";
        }
    })
}

function forecastProjectLevy(){
      $(".button").click(function(e){
        e.preventDefault();
        state = $("input[name=radio-group]:checked").val()
        if (state === "project") {
            localStorage.setItem("forecastLevy","true")
            window.location.href = "english-percentage";
        } else {
            localStorage.setItem("forecastLevy","false")
            window.location.href = "add-levy-wizard";
        }
    })
}

function forecastAlreadyHaveAccount(){
      $(".button").click(function(e){
        e.preventDefault();
        state = $("input[name=radio-group]:checked").val()

        if (state === "login") {
            window.location.href = "../../../index";
        } else {
            // non levy payer
            window.location.href = "project-levy";
        }
    })
}

function forecastYourPaybill(){


     $("#paybill").mask("999,999,999",{reverse: true});

    $(".button").click(function(e){
        e.preventDefault();
        paybill = $("#paybill").val();
        paybill = Number(paybill.replace(/\D/g,''));

        if ( paybill > 3000000 ) {
           console.log("levy payer") // levy payer
            localStorage.setItem("levyPayer","true");
            window.location.href = "have-account";
        } else {
            // non levy payer
             console.log("non levy payer") ;
            localStorage.setItem("levyPayer","false");
            window.location.href = "add-cohort-wizard";
        }
    })

}
function forecastStart(){
    $(".button").click(function(e){
        e.preventDefault();
        userType = localStorage.getItem("userAuth");
        if ( userType != "true") {
            window.location.href = "yourpaybill";
        } else {
            window.location.href = "loading";
        }
    })
}


function financeTransactions(){

var from_$input = $('#input_from').pickadate(),
from_picker = from_$input.pickadate('picker')

var to_$input = $('#input_to').pickadate(),
to_picker = to_$input.pickadate('picker')


// Check if there’s a “from” or “to” date to start with.
if ( from_picker.get('value') ) {
to_picker.set('min', from_picker.get('select'))
}
if ( to_picker.get('value') ) {
from_picker.set('max', to_picker.get('select'))
}

// When something is selected, update the “from” and “to” limits.
from_picker.on('set', function(event) {
if ( event.select ) {
to_picker.set('min', from_picker.get('select'))
}
else if ( 'clear' in event ) {
to_picker.set('min', false)
}
})
to_picker.on('set', function(event) {
if ( event.select ) {
from_picker.set('max', to_picker.get('select'))
}
else if ( 'clear' in event ) {
from_picker.set('max', false)
}
})


$('tr').click(function () {
$(this).next('tr').toggle();
});

}


function reportWide(){
$("body").addClass("wide");



userAuth = localStorage.getItem("userAuth");

if ( userAuth != "true" ) {
} else {
    $("#noForecasts").hide();
    $("#existingForecasts").removeClass("hidden");
}
$("#saveForecast").click(function(e){
    e.preventDefault();
    if ( userAuth  != "true") {
        // a quick save to the existing forecasts
        window.location.href = "../../../index";
        $(".success-summary a").hide();
    } else {
        //sender user to register
        $(".success-summary h3").text("FORECAST SAVED");
        $(".success-summary p").text("YOU CAN ACCESS IT FROM THE MANAGE LIST");
    }
});

var chart = c3.generate({
bindto: '#chart',
data: {
  columns: [
    ['data1', 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250],
    ['data2', 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 321, 22],
    ['data3', 50, 20, 10, 40, 15, 25, 30, 200, 222, 332, 533, 432],
    ['data4', 50, 20, 10, 40, 15, 25, 30, 200, 221, 342, 112, 235]
  ],
    type: 'area',
    colors: {
        data1: '#d53880',
        data2: '#2e358b',
        data3: '#912b88',
        data3: '#cccccc'
    },
    names: {
        data1: 'Levy in',
        data2: 'Traiing costs',
        data3: 'Co-investment',
        data4: 'Transfers'
    }
},
subchart: {
        show: true
    },
    zoom: {
    enabled: true
    }

});

};







// global js



    $(".link-back").click(function(e){
       e.preventDefault();
            window.history.back();
    });

/*----- TABS -----*/
    $(".tab-content").not("#tab-1").css("display", "none");

    //tabs pattern
    $(".tabs-menu a").click(function(event) {
    event.preventDefault();
    $(this).parent().addClass("current");
    $(this).parent().siblings().removeClass("current");
    var tab = $(this).attr("href");
    $(".tab-content").not(tab).css("display", "none");
    $(tab).fadeIn();
    });




// $('#jexcel-1').jexcel('setStyle', [{ }]);



    });
