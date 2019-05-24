
$(document).ready(function() {


//
// GLOBAL VARIABLES
//
// var root = appDirName;
// console.log(root);
var pageName = $("section#viewID").data('page-name');
console.log(pageName)
var userType = localStorage.getItem("userType");

var state =  getQueryVariable("state");
var projectCount = localStorage.getItem("projectCount");

if (projectCount == null ) {
  localStorage.setItem("projectCount",0)
}

//
// GLOBAL FUNCTIONS
//
//get url variables
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}



//
// set banner org name
//
// localStorage.setItem("userOrg","Met Office")
$(".userOrg").text(localStorage.getItem("userOrg"));
$(".userName").text(localStorage.getItem("userName"));

//
// beis or dp
//
if ( userType == 0 ) {
  $("#beisNav.header-organisation").removeClass("hide");
} else {
  $("#deliveryPartner.header-organisation").removeClass("hide");
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
var wordLen = $(".wordlimit").data("max-length-in-words");
var len;
    $(".words-left").html(wordLen+ ' words left');
    $('.wordlimit').keydown(function(event) {
        len = $('.wordlimit').val().split(/[\s]+/);
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
   case 'biesReportingStandard':
       biesReportingStandard();
       break;
   case 'biesReportingCustom':
       biesReportingCustom();
       break;
   case 'trackerCompleteReview':
       trackerCompleteReview();
       break;
   case 'submitDataTable':
       submitDataTable();
       break;
   case 'beisTrackerDashboard':
       beisTrackerDashboard();
       break;
   case 'trackerDetailsReview':
       trackerDetailsReview();
       break;
   case 'partnerAddProject':
       partnerAddProject();
       break;
   case 'partnerAddActivity':
       partnerAddActivity();
       break;
   case 'partnerActivitiesDashboard':
       partnerActivitiesDashboard();
       break;
   case 'partnerAddProjectCheckAnswers':
       partnerAddProjectCheckAnswers();
       break;
   default: break;
}

function trackerCompleteReview(){
  $("input").click(function(e){
    state = $("input[name=choose-journey]:checked").val()
      if ( state == "decline") {
        $(".govuk-radios__conditional").removeClass("govuk-radios__conditional--hidden")
      } else {
        $(".govuk-radios__conditional").addClass("govuk-radios__conditional--hidden")
      }
  })


}

function partnerAddProjectCheckAnswers(){

$(".govuk-button").click(function(e){
  e.preventDefault();
  projectCount = localStorage.getItem("projectCount");
  localStorage.setItem("projectCount",projectCount++);
  window.location = $(this).attr("href");
})

}

function partnerAddActivity(){
  console.log("log")
  $('#select-newton-country').selectize({
    maxItems: 5
  });
  $('#select-pillars').selectize({
  });
  $('#select-status').selectize({
  });
  $('#select-match').selectize({
  });
}

function partnerActivitiesDashboard(projectCount){

  if (state == "newProject") {
    // show added project feedback
    $("#newProject.govuk-panel--confirmation").removeClass("hide");
    // $("#emptyState").addClass("hide")
  } else if ( state == "newActivity"){
    $("#newActivity.govuk-panel--confirmation").removeClass("hide");
  }
  projectCount = localStorage.getItem("projectCount");
  console.log("porject count is: " + projectCount);
  if (projectCount != 0) {
    $(".js-accordion-with-descriptions, #addProject").removeClass("hide");
    $("#emptyState").addClass("hide");
  }

}

function partnerAddProject(){


  $("#odaEligible .govuk-button").click(function(e){
    e.preventDefault();
    state = $("input[name=choose-oda]:checked").val()

    if (state == "yes") {
      // continue
      $("#odaEligible").hide();
      $("#chooseFund").show();
    } else {
      // fail page
      $("#odaEligible").hide();
      $("#odaEligibleWhatNext").show();

    }
  })

  $('#select-fund').selectize();

  $("#fundSelected").click(function(e){
    e.preventDefault();
    state = $("#select-fund").find(":selected").val();
    // state = $("input[name=select-fund]").chosen().val()
    //.chosen().val();
    console.log(state)
    $("#chooseFund").hide();
    if ( state >= 9 ){
      // open newton
      $("#projectNewton").removeClass("hide");
      $('.select-oda-channel').selectize();
      $('.select-aid').selectize();

    } else {
      // open gcrf
      $("#projectGCRF").removeClass("hide");
      $('.select-oda-channel').selectize();
      $('.select-aid').selectize();

    }

  })
}

function trackerDetailsReview(){
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

  // $("#activityReview_2")

  var viewportHeightAvailable = ($(document).height()*0.6);
  // var viewportHeightAvailable = 800;
  console.log(viewportHeightAvailable)
  var data = [
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow','Add comment',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow','Add comment',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow','Add comment',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow','Add comment',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow','Add comment',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow','Add comment',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow','Add comment',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow','Add comment',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow','Add comment',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow','Add comment',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow','Add comment',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow','Add comment',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow','Add comment',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow','Add comment',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow','Add comment',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow','Add comment',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow','Add comment',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow','Add comment',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow','Add comment',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow','Add comment',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow','Add comment',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow','Add comment',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow','Add comment',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow','Add comment',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000]
  ];

  var container = document.getElementById('activityReview_2');
  var hot = new Handsontable(container, {
    data: data,
    licenseKey: 'non-commercial-and-evaluation',
    rowHeaders: true,
    allowInsertRow: false,
    allowInsertColumn: false,
    allowEmpty: false,
    allowRemoveColumn: false,
    allowRemoveRow: false,


    nestedHeaders: [
      [{label: '', colspan: 5}, {label: 'Actuals', colspan: 10}, {label: 'Forecast', colspan: 16}],
      [{label: '', colspan: 5}, {label: 'Cash', colspan: 5},{label: 'Accruals', colspan: 5}, {label: 'Cash', colspan: 8}, {label: 'Accruals', colspan: 8}],
      ['Activity', 'ID', 'Status', 'Narrative','','Q1 18','Q2 18','Q3 18','Q4 18','Q1 19','Q1 18','Q2 18','Q3 18','Q4 18','Q1 19','Q2 19','Q3 19','Q4 19','Q1 20','Q2 20','Q3 20','Q4 20','Q1 21','Q2 19','Q3 19','Q4 19','Q1 20','Q2 20','Q3 20','Q4 20','Q1 21']
    ],

  /*    hiddenColumns: {
      columns: [4, 5, 6,7],
      indicators: true
    },

  */
  //
  // hiddenColumns: {
  //   // set columns that are hidden by default
  //   // columns: [5, 10, 15],
  //   // show where are hidden columns
  //   indicators: true
  // },
    manualColumnFreeze: true,
    manualColumnMove: false,
    manualRowMove: true,
    fixedColumnsLeft: 4,
    colHeaders: true,
    colWidths: 100,
    width: '100%',
    height: viewportHeightAvailable,
    fixedColumnsLeft: 4,
    filters: true,
    dropdownMenu: false
  });

  // filter drop downs

  $('#select-fund').selectize({
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
}

function beisTrackerDashboard(){

  if ( state == "reviewed") {
    // show review feedback
    $("#sentToBeis").removeClass("hide");
  }

  $('#select-fund').selectize({
    sortField: 'text',
    allowEmptyOption: true
  });
  $('#select-status').selectize({
    sortField: 'text',
    allowEmptyOption: true
  });

  // LOADS tracker TAB
  var googleDoc = 'https://docs.google.com/spreadsheets/d/12wkNTS4OYOjbFABbEchxClTYI4cZU9k7PSdHS-i4PZ8/edit?usp=sharing';
  // var googleDoc = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQB7ZF2mUhIfHa7faqxPB3tXYdQWp9GIEm05KHwkJMygMZjpWb_fOVfQ8SvFU7WkkV58Uw78-PNsnAs/pubhtml';
  // console.log(googleDoc)

         function googleTables() {
             Tabletop.init({
                 key: googleDoc,
                 callback: getGSheetData,
                 simpleSheet: false
             })
         }


         function getGSheetData(data, tabletop) {
             renderTable(data);
             // console.log(data);
         }

         function renderTable(data) {
             var content = "";
             var sheetLength = data.trackerApprovalSheet.elements.length - 1;
             for (i = 0; i < data.trackerApprovalSheet.elements.length; i++) {
               if ( i ==  sheetLength ){
                 content += '<tr class="govuk-table__row" data-row="100"><td class="govuk-table__header" colspan="4"></td><td class="govuk-table__header">'+data.trackerApprovalSheet.elements[i].budget_month+'</td><td class="govuk-table__header">'+data.trackerApprovalSheet.elements[i].budget_activity+'</td><td class="govuk-table__header"></td></tr>';
               } else {
                             content += '<tr class="govuk-table__row" data-row="'+i+'">';
                             content += '<td class="govuk-table__cell"><a href="trackers/tracker">' + data.trackerApprovalSheet.elements[i].delivery_partner + '</a></td>';
                             content += '<td class="govuk-table__cell">' + data.trackerApprovalSheet.elements[i].funds +'</td>';
                             content += '<td class="govuk-table__cell">' + data.trackerApprovalSheet.elements[i].status + '</td>';
                             content += '<td class="govuk-table__cell">' + data.trackerApprovalSheet.elements[i].qa_status + '</td>';
                             // console.log(data.trackerApprovalSheet.elements[i].budget_month_num);
                             if (data.trackerApprovalSheet.elements[i].budget_month_num > 1 ) {
                               // console.log("over budget")
                               content += '<td class="govuk-table__cell govuk-over__cell"><div id="warning-1">Over budget</div>' + data.trackerApprovalSheet.elements[i].budget_month + '</td>';
                             } else if (data.trackerApprovalSheet.elements[i].budget_month_num < 0 ) {
                               // console.log("under budget")
                               content += '<td class="govuk-table__cell govuk-under__cell"><div id="warning-1">Under budget</div><span>' + data.trackerApprovalSheet.elements[i].budget_month + '</span></td>';
                             } else {
                               // console.log("just right")
                               content += '<td class="govuk-table__cell">' + data.trackerApprovalSheet.elements[i].budget_month + '</td>';
                             }

                             if (data.trackerApprovalSheet.elements[i].budget_activity_num > 1 ) {
                               // console.log("over budget")
                               content += '<td class="govuk-table__cell govuk-over__cell"><div id="warning-1">Over budget</div>' + data.trackerApprovalSheet.elements[i].budget_activity + '</td>';
                             } else if (data.trackerApprovalSheet.elements[i].budget_month_num < 0 ) {
                               // console.log("under budget")
                               content += '<td class="govuk-table__cell govuk-under__cell"><div id="warning-1">Under budget</div><span>' + data.trackerApprovalSheet.elements[i].budget_activity + '</span></td>';
                             } else {
                               // console.log("just right")
                               content += '<td class="govuk-table__cell">' + data.trackerApprovalSheet.elements[i].budget_activity + '</td>';
                             }
                             // content += '<td class="govuk-table__cell">' + data.trackerApprovalSheet.elements[i].budget_activity + '</td>';
                             content += '<td class="govuk-table__cell"><a href="tracker/index">Review activities</a></td>';
                             content += '</tr>';
                     }
                   }
               $("tbody").html(content);
         }
googleTables();
}



function biesReportingCustom(){
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
}
function biesReportingStandard(){
  $("body").addClass("wide");
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
}
function biesReporting(){

}

function odartLanding(){
// var myemail = "@yahoo";
$(".govuk-button").click(function(e){
  e.preventDefault();
  myemail = $("#email").val();

  switch (myemail) {
     case 'partner':
          localStorage.setItem("userType",1)
          localStorage.setItem("userOrg","BBSRC")
          localStorage.setItem("userName","Joanna")
         break;
     case 'beis':
          localStorage.setItem("userType",0)
          localStorage.setItem("userOrg","BEIS")
          localStorage.setItem("userName","Simone")
         break;
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
     case 'ty.fairclough@gmail.com':
          localStorage.setItem("userType",1)
          localStorage.setItem("userOrg","Kickass Funding Pty")
          localStorage.setItem("userName","Ty")
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

  // var chart = c3.generate({
  //   bindto: "#timeChart",
  //     data: {
  //         columns: [
  //             ['data1', 300, 350, 300, 0, 0, 0],
  //             ['data2', 130, 100, 140, 200, 150, 50]
  //         ],
  //         types: {
  //             data1: 'area',
  //             data2: 'area-spline'
  //         }
  //     }
  // });
  // var chart = c3.generate({
  //   bindto: "#guageChart",
  //     data: {
  //         columns: [
  //             ['data', 91.4]
  //         ],
  //         type: 'gauge',
  //         onclick: function (d, i) { console.log("onclick", d, i); },
  //         onmouseover: function (d, i) { console.log("onmouseover", d, i); },
  //         onmouseout: function (d, i) { console.log("onmouseout", d, i); }
  //     },
  //     gauge: {
  // //        label: {
  // //            format: function(value, ratio) {
  // //                return value;
  // //            },
  // //            show: false // to turn off the min/max labels.
  // //        },
  // //    min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
  // //    max: 100, // 100 is default
  // //    units: ' %',
  // //    width: 39 // for adjusting arc thickness
  //     },
  //     color: {
  //         pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
  //         threshold: {
  // //            unit: 'value', // percentage is default
  // //            max: 200, // 100 is default
  //             values: [30, 60, 90, 100]
  //         }
  //     },
  //     size: {
  //         height: 180
  //     }
  // });

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


$("body").addClass("wide")
  // js table

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

  $('#select-fund').selectize({
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


  var viewportHeightAvailable = ($(document).height()*0.6);
  // var viewportHeightAvailable = 800;
  console.log(viewportHeightAvailable)
  var data = [
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000],
    ['Nationally Appropriate Mitigating Actions Facility: Administration', 'GB-PD-300102019', 'Grey', 'We made some changes to the profile of the grant to help with the PI\'s cash flow',54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54000,54999,54999,54999,54999,54999,75000]
  ];

  var container = document.getElementById('jexcel-0');
  var hot = new Handsontable(container, {
    data: data,
    licenseKey: 'non-commercial-and-evaluation',
    rowHeaders: true,
    allowInsertRow: false,
    allowInsertColumn: false,
    allowEmpty: false,
    allowRemoveColumn: false,
    allowRemoveRow: false,


    nestedHeaders: [
      [{label: '', colspan: 4}, {label: 'Actuals', colspan: 10}, {label: 'Forecast', colspan: 16}],
      [{label: '', colspan: 4}, {label: 'Cash', colspan: 5},{label: 'Accruals', colspan: 5}, {label: 'Cash', colspan: 8}, {label: 'Accruals', colspan: 8}],
      ['Activity', 'ID', 'Status', 'Narrative', 'Q1 18','Q2 18','Q3 18','Q4 18','Q1 19','Q1 18','Q2 18','Q3 18','Q4 18','Q1 19','Q2 19','Q3 19','Q4 19','Q1 20','Q2 20','Q3 20','Q4 20','Q1 21','Q2 19','Q3 19','Q4 19','Q1 20','Q2 20','Q3 20','Q4 20','Q1 21']
    ],

/*    hiddenColumns: {
      columns: [4, 5, 6,7],
      indicators: true
    },

*/
//
// hiddenColumns: {
//   // set columns that are hidden by default
//   // columns: [5, 10, 15],
//   // show where are hidden columns
//   indicators: true
// },
    manualColumnFreeze: true,
    manualColumnMove: false,
    manualRowMove: true,
    fixedColumnsLeft: 4,
    colHeaders: true,
    colWidths: 100,
    width: '100%',
    height: viewportHeightAvailable,
    fixedColumnsLeft: 4,
    filters: true,
    dropdownMenu: false
  });

}

function trackerSubmitJourneyLogic(){
    $(".govuk-button").click(function(e){
      e.preventDefault();
      state = $("input[name=choose-journey]:checked").val()
      if (state === "online") {
          window.location.href = "start";
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
