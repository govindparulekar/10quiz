/*
10Q quiz Web app
copyrights@ 2019
All rights are reserved
*/

var right_cnt=0;
var question_no=0;
var obj;
var catog,diff;
var $next_btn=$('#next');

$(window).one('load',function(){
    var req=new XMLHttpRequest();
    if(localStorage.getItem('cat')==null){
        catog='9';
    }
    else{
        catog=localStorage.getItem('cat');
    }
    if(localStorage.getItem('dif')==null){
        diff='medium';
    }
    else{
        diff=localStorage.getItem('dif');
    }
    req.onload=function(){
        obj=JSON.parse(req.response);
        console.log(catog);
        console.log(obj);
   
       loadQuestionAndOptions(obj);
   };
   req.onerror=function(){
       $('#question').text('Something went wrong..');
       $('#error-msg').show();
       $next_btn.remove();
       $('#home').remove();
   
   };
   //console.log(catog);
   req.open('GET','https://opentdb.com/api.php?amount=10&category='+catog+'&difficulty='+diff+'&type=multiple');
   req.send();
});

$next_btn.on('click',function(){
    loadQuestionAndOptions(obj);
});
//$('li').one('click',check);

function check(){
    if(this.textContent!=obj.results[question_no-1].correct_answer){//highlight wrong ans
        this.classList.add('list-group-item-danger');
        //wrong_cnt++;
       // console.log(wrong_cnt);
    }
    else{
        right_cnt++;
        console.log(right_cnt);
    }
    //console.log(right_cnt);
    $('li').each(function(){//highlight right ans
        if(this.textContent==obj.results[question_no-1].correct_answer){
            this.classList.add('list-group-item-success');
        }
    });
    $('li').off('click');

}

function loadQuestionAndOptions(obj){// load questions and options
    if(question_no==10){
        //localStorage.setItem('wrongs',wrong_cnt);
        localStorage.setItem('rights',right_cnt);

        var scroll_url=window.location.href.replace('_quiz','score');
        console.log((scroll_url));
        window.location.href=scroll_url;
        return;
    }

    $('li').removeClass('list-group-item-danger');
    $('li').removeClass('list-group-item-success');
    $('li').on('click',check);
    $('#question').text(obj.results[question_no].question);

    options=shuffle();// got shuffled options
    console.log(shuffle());
    var i=0;
    $('.option').each(function(){
        $(this).text(options[i]);
        i++;
    });
    question_no++;
    
}
/*
I had to use this function bcz api gives me array of 3 incorrect
answers and one correct ans. So to put correct ans in options in such a way that
it should not be at same position every time I placed every option randomly with correct ans.   
*/
function shuffle(){//shuffle options with correct ans
    var options=[];
    var i=0;
    rand=Math.floor(Math.random()*4);
    options[rand]=obj.results[question_no].correct_answer;
    while(!(0 in options&&1 in options&&2 in options&&3 in options)){
        rand=Math.floor(Math.random()*4);
        if(!(rand in options)){
            options[rand]=obj.results[question_no].incorrect_answers[i];
            i++;
        }
        
    }
    return options;
}



