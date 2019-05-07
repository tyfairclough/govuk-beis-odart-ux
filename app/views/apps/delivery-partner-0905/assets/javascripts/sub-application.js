
$(document).ready(function() {

$(".govuk-back-link").click(function(e){
  e.preventDefault();
  window.history.back();
})

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

$('#jexcel-1').jexcel({
    data:data,
    colHeaders: ['Activity name', 'Acitvity ID', 'Apr 19', 'May 19', 'Jun 19', 'Q3', 'Narrative'],
    colWidths: [ 150, 120, 70, 100, 100, 100, 195 ],
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

// $('#jexcel-1').jexcel('setStyle', [{ }]);



    });
