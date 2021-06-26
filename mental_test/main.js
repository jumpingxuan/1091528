$(function () {
    var picture=new Array;
    let total = 0;
    //儲存目前作答到第幾題
    var currentQuiz = null;
    //當按鈕按下後，要做的事情
    $("#startButton").on("click", function () {
        if (currentQuiz == null) {
            //設定目前作答從第0題開始
            currentQuiz = 0;
            //顯示題目
            $("#question").text(questions[0].question);
            //將選項區清空(可以試著先不寫)
            $("#options").empty();
            //將選項逐個加入
            questions[0].answers.forEach(function (element, index, array) {
                $("#options").append(`<input name='options' type='radio'
            value='${index}'><label>${element[0]}</label><br><br>`);
            });
            //將按鈕上的文字換成Next
            $("#startButton").attr("value", "Next");
        } else {
            //已經開始作答從這邊繼續
            $.each($(":radio"), function (i, val) {
                if (val.checked) {
                    total += questions[currentQuiz].answers[i][1];//total去加上那個選項的值
                    var finalResult = total;
                    if (currentQuiz == 9) {

                        currentQuiz = null;
                        $("#startButton").attr("value", "重新開始");

                        if (finalResult >= 7) {
                            $("#question").text(finalAnswers[0]);
                            $("#options").empty();
                            $("#options").append(`${finalAswers[0]}<br><br>`);
                           
                        }
                        else {
                            $("#question").text(finalAnswers[1]);
                            $("#options").empty();
                            $("#options").append(`${finalAswers[1]}<br><br>`);
                           
                        }
                       
                    } else {
                        currentQuiz++;
                        $("#question").text(questions[currentQuiz].question);
                        $("#options").empty();
                        questions[0].answers.forEach(function (element, index, array) {
                            $("#options").append(`<input name='options' type='radio'
                    value='${index}'><label>${element[0]}</label><br><br>`);
                        });
                    }
                    return false;//選完選項後就可以跳出
                }
            });
        }
    });
});