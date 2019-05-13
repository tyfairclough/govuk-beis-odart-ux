
$(document).ready(function() {


//
// GLOBAL VARIABLES
//
var root = "/apps/{{currentApp.appDirName}}/views/";
console.log(root);
var pageName = $("section#viewID").data('page-name');
console.log(pageName)
var userType = localStorage.getItem("userType");

//
// GLOBAL FUNCTIONS
//

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
}

function odartLanding(){
// var myemail = "@yahoo";
$(".govuk-button").click(function(e){
  e.preventDefault();
  myemail = $("#email").val();
  if (myemail.endsWith('@beis.gov.uk')) {
    // go to beis view
      console.log("it ends in @beis.gov.uk")
      localStorage.setItem("userType",0)
      window.location.href = "beis/dashboard";
  } else {
    // go to delivery partner view
    localStorage.setItem("userType",1)
    window.location.href = "partner/dashboard";
  }
})
// var myemail = 'test@yahoo.com'



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
