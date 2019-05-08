
$(document).ready(function() {

var root = "/apps/{{currentApp.appDirName}}/views/";
console.log(root);
var className = $("main").attr('id');
console.log("hello")
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

// _global

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

   switch (className) {
       case 'reportWide':
           reportWide();
           break;
       case 'forecast-index':
           forecastIndex();
           break;
       case 'another-page':
           anotherPage();
       break;
       case 'fat-standard':
           fatStandard();
       break;
       case 'index':
           index();
       break;
       case 'finance-transactions':
           financeTransactions();
       break;
       case 'forecast-start':
           forecastStart();
       break;
       case 'forecastYourPaybill':
           forecastYourPaybill();
       break;
       case 'forecastProjectLevy':
           forecastProjectLevy();
       break;
       case 'forecastViewLevy':
           forecastViewLevy();
       break;
       case 'forecastViewCommitments':
           forecastViewCommitments();
       break;
       case 'forecastAlreadyHaveAccount':
           forecastAlreadyHaveAccount();
       break;
       default: break;
}

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

function forecastIndex(){
     var chart = c3.generate({
    bindto: '#chart',
         size: {
        height: 580
    },
    data: {
      columns: [
        ['data1', 898, 898, 898, 898, 898, 898, 898, 898, 898, 898, 898, 898, 898, 898, 898, 898, 898, 898, 898, 898, 898, 898, 898, 898, 898, 898, 898, 898, 898, 898, 898, 898, 898, 898, 898, 898, 898, 898, 898, 898, 898, 898, 898, 898, 898, 898, 898, 898,898],
        ['data2', 898, 1796, 2694, 3592, 4490, 5388, 6286, 7184, 8082, 9878, 10776, 11674,12572,13470,14368,15266,16164,17062,17960,18858,19756,20654,21552,21552,21552,21552,21552,21552,21552,21552,21552,1450,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        ['data3',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2100,2100,2100,2100,2100,2100,2100,2100,2100,2100,2100,2100,2100,2100,2100,2100,2100],
        ['data4',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1865,2010,2010,2010,2010,2010,2010,2010,2010,2010,2010,2010,2010,2010,2010,2010],
        ['data5',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16787,18092,18092,18092,18092,18092,18092,18092,18092,18092,18092,18092,18092,18092,18092,18092]
      ],
        type: 'spline',
        colors: {
            data1: '#d53880',
            data2: '#2e358b',
            data3: '#912b88',
            data3: '#cccccc'
        },
        names: {
            data1: 'Levy in',
            data2: 'Balance',
            data3: 'Cost of training',
            data4: 'Your co-investment',
            data5: 'Government co-investment'
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


// js table

data = [
    ['{activityName}', "{activityID}", 2000, 2000,2000,2000,"This is a change example"],
    ['{activityName}', "{activityID}", 2000, 2000,2000,2000,"This is a change example"],
    ['{activityName}', "{activityID}", 2000, 2000,2000,2000,"This is a change example"],
    ['{activityName}', "{activityID}", 2000, 2000,2000,2000,"This is a change example"],
    ['{activityName}', "{activityID}", 2000, 2000,2000,2000,"This is a change example"],
    ['{activityName}', "{activityID}", 2000, 2000,2000,2000,"This is a change example"],
    ['{activityName}', "{activityID}", 2000, 2000,2000,2000,"This is a change example"],
    ['{activityName}', "{activityID}", 2000, 2000,2000,2000,"This is a change example"],
    ['{activityName}', "{activityID}", 2000, 2000,2000,2000,"This is a change example"],
    ['{activityName}', "{activityID}", 2000, 2000,2000,2000,"This is a change example"],
    ['{activityName}', "{activityID}", 2000, 2000,2000,2000,"This is a change example"],
    ['{activityName}', "{activityID}", 2000, 2000,2000,2000,"This is a change example"],
    ['{activityName}', "{activityID}", 2000, 2000,2000,2000,"This is a change example"],
    ['{activityName}', "{activityID}", 2000, 2000,2000,2000,"This is a change example"],
    ['{activityName}', "{activityID}", 2000, 2000,2000,2000,"This is a change example"],
    ['{activityName}', "{activityID}", 2000, 2000,2000,2000,"This is a change example"],
    ['{activityName}', "{activityID}", 2000, 2000,2000,2000,"This is a change example"]
  ];

$('#jexcel-1').jexcel({
    data:data,
    colHeaders: ['Activity Name', 'ID', 'Actual', 'Accrual Q1', 'Accrual Q2', 'Accrual Q3', 'Narrative'],
    colWidths: [ 180, 80, 80, 100, 100, 100, 195 ],
    columns: [
        { type: 'text' },
        { type: 'text' },
        { type: 'numeric' },
        { type: 'numeric' },
        { type: 'numeric' },
        { type: 'numeric' },
        { type: 'text' }
    ]
});
$('#jexcel-2').jexcel({
    data:data,
    colHeaders: ['Activity Name', 'ID', 'Actual', 'Accrual Q1', 'Accrual Q2', 'Accrual Q3', 'Narrative'],
    colWidths: [ 180, 80, 80, 100, 100, 100, 195 ],
    columns: [
        { type: 'text' },
        { type: 'text' },
        { type: 'numeric' },
        { type: 'numeric' },
        { type: 'numeric' },
        { type: 'numeric' },
        { type: 'text' }
    ],
    style:[
        { A1: 'background-color: orange; ' },
        { B1: 'background-color: orange; ' },
        { C1: 'background-color: orange; ' },
        { D1: 'background-color: orange; ' },
    ]
});

$('#jexcel-1').jexcel('setStyle', [{ A1:'font-size:40px'}]);



    });
