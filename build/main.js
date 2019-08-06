enchant();

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//VARIABLES
var SCREEN_WIDTH  = 798;
var SCREEN_HEIGHT = 1024;
var game = null;
var time = 0;
var speedSelected = 0;
var levelSelected = 1;
var questionSelected = 0;
var score = 0;
var nbMistakes = 0;

//TIMES FOR LEVELS
var TIME_LVL1 = 30;
var TIME_LVL2 = 10;
var TIME_LVL3 = 6;

//VARIABLES FOR CHECK QUESTION
var lastWrongQuestion;
var lastWrongQuestionAnswer;
var lastWrongQuestionAnswer2;
var lastQuestionLvl1 = false;
var arrayLastQuestion;

//LIST OF QUESTION SELECTED BY LEVELS (FOR NON REPETITION)
var selectedQuestionLvl1 = [];
var selectedQuestionLvl2 = [];
var selectedQuestionLvl3 = [];
var selectedQuestionLvl4 = [];

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//LEVEL 1 DATABASE

var level1 = [
    [[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10]],
    [[10],[9],[8],[7],[6],[5],[4],[3],[2],[1],[0]],
    [[0],[2],[4],[6],[8],[10]],
    [[10],[8],[6],[4],[2],[0]],
    [[1],[3],[5],[7],[9]],
    [[9],[7],[5],[3],[1]],
];

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//LEVEL 2 DATABASE

var level2 = [
    [[0],[5],[10],[15],[20]],
    [[0],[10],[20],[30],[40],[50],[60]],
    [[8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18],[19],[20]],
    [[20],[19],[18],[17],[16],[15],[14],[13],[12],[11],[10],[9],[8]],
    [[6],[8],[10],[12],[14],[16],[18],[20]],
    [[20],[18],[16],[14],[12],[10],[8],[6]],
];

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//LEVEL 3 DATABASE

var level3 = [
    [[20],[15],[10],[5],[0]],
    [[10],[15],[20],[25],[30],[35],[40]],
    [[40],[35],[30],[25],[20],[15],[10]],
    [[18],[19],[20],[21],[22],[23],[24],[25],[26],[27],[28],[29],[30],[31],[32],[33],[34],[35],[36],[37],[38],[39],[40]],
    [[40],[39],[38],[37],[36],[35],[34],[33],[32],[31],[30],[29],[28],[27],[26],[25],[24],[23],[22],[21],[20],[19],[18]],
    [[7],[9],[11],[13],[15],[17],[19]],
    [[19],[17],[15],[13],[11],[9],[7]],
];

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//LEVEL 4 DATABASE

var level4 = [
    [[35],[40],[45],[50],[55],[60]],
    [[60],[55],[50],[45],[40],[35]],
    [[41],[42],[43],[44],[45],[46],[47],[48],[49],[50],[51],[52],[53],[54],[55],[56],[57],[58],[59],[60]],
    [[60],[59],[58],[57],[56],[55],[54],[53],[52],[51],[50],[49],[48],[47],[46],[45],[44],[43],[42],[41]],
    [[22],[24],[26],[28],[30],[32],[34],[36],[38],[40],[42],[44],[46],[48],[50],[52],[54],[56],[58],[60]],
    [[60],[58],[56],[54],[52],[50],[48],[46],[44],[42],[40],[38],[36],[34],[32],[30],[28],[26],[24],[22]],
    [[21],[23],[25],[27],[29],[31],[33],[35],[37],[39],[41],[43],[45],[47],[49],[51],[53],[55],[57],[59]],
    [[59],[57],[55],[53],[51],[49],[47],[45],[43],[41],[39],[37],[35],[33],[31],[29],[27],[25],[23],[21]],
];

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//HOME PAGE

window.onload = function(){
    //INITIALISATION
    var game = new Game(SCREEN_WIDTH, SCREEN_HEIGHT);
    game.fps = 60;

    //PRELOADS
    game.preload('./sounds/correct.mp3','./sounds/incorrect.mp3','./sounds/clear.mp3','./sounds/mainTheme.mp3','./sounds/openTheme.mp3','./sounds/results.mp3','./images/back.png');

    game.onload = function(){

        var scene = game.rootScene;
        scene.backgroundColor = "lightblue";

        //FUNCTTION TO CREATE BUTTON
        CreateButton =  Class.create(Button, {
            initialize:function(text, x, y){
            Button.call(this, text, "blue", 100, 150);
            this._style.textAlign = 'center';
            this.font = "32px/3.2 'HGS教科書体','avenir next','Helvetica','ヒラギノ角ゴ ProN','Hiragino Kaku Gothic ProN','HG正楷書体-PRO','ＭＳ ゴシック','sans-serif'";
            this.x = x;
            this.y = y;
            scene.addChild(this);
        }
        });

        //TITLE
        var title = new Label();
        title.width = SCREEN_WIDTH*2;
        title.text = "いくつがはいる？";
        title.width = 700;
        title.font = "80px/3.2 'HGS教科書体','avenir next','Helvetica','ヒラギノ角ゴ ProN','Hiragino Kaku Gothic ProN','HG正楷書体-PRO','ＭＳ ゴシック','sans-serif'";
        title.moveTo((SCREEN_WIDTH - title._boundWidth)/2, 250);
        scene.addChild(title);

        //START BUTTON
        var startButton = new CreateButton("►", SCREEN_WIDTH/2-85, 500);
        startButton.addEventListener(Event.TOUCH_END, function(e){
            game.replaceScene(game.speedSelection());
            game.assets['./sounds/openTheme.mp3'].play();
        });

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//SPEED SELECTION PAGE

        game.speedSelection = function(){
        var scene = new Scene();
        scene.backgroundColor = "lightblue";

        //FUNCTTION TO CREATE BUTTON
        CreateButton =  Class.create(Button, {
            initialize:function(text, x, y){
            Button.call(this, text, "blue", 100, 150);
            this._style.textAlign = 'center';
            this.font = "32px/3.2 'HGS教科書体','avenir next','Helvetica','ヒラギノ角ゴ ProN','Hiragino Kaku Gothic ProN','HG正楷書体-PRO','ＭＳ ゴシック','sans-serif'";
            this.x = x;
            this.y = y;
            scene.addChild(this);
        }
        });

        //TITLE
        var title = new Label();
        title.text = "はやさ";
        title.font = "90px/3.2 'HGS教科書体','avenir next','Helvetica','ヒラギノ角ゴ ProN','Hiragino Kaku Gothic ProN','HG正楷書体-PRO','ＭＳ ゴシック','sans-serif'";
        title.moveTo((SCREEN_WIDTH- title._boundWidth)/2, 50);
        scene.addChild(title);

        //BACK BUTTON
        var back = new Sprite(76, 64);
        back.image = game.assets['./images/back.png'];
        back.scale(0.5, 0.5);
        back.moveTo(SCREEN_WIDTH-100, 10);
        back.addEventListener(Event.TOUCH_END, function(e){
            game.replaceScene(game.rootScene);
        });
        scene.addChild(back);

        //SPEED 1 BUTTON
        var speed1 = new CreateButton("⭐", SCREEN_WIDTH/2-85, 300);
        speed1.addEventListener(Event.TOUCH_END, function(e){
            speedSelected = 1;
            nbMistakes = 0;
            questionSelected = 1;
            levelSelected = 1;
            score = 0;
            selectedQuestionLvl1 = [];
            selectedQuestionLvl2 = [];
            selectedQuestionLvl3 = [];
            selectedQuestionLvl4 = [];
            lastQuestionLvl1 = false;
            game.assets['./sounds/openTheme.mp3'].stop();
            game.assets['./sounds/mainTheme.mp3'].play();
            game.pushScene(game.level());
        });

        //SPEED 2 BUTTON
        var speed2 = new CreateButton("⭐⭐", SCREEN_WIDTH/2-85, 450);
        speed2.addEventListener(Event.TOUCH_END, function(e){
            speedSelected = 2;
            nbMistakes = 0;
            questionSelected = 1;
            levelSelected = 1;
            score = 0;
            selectedQuestionLvl1 = [];
            selectedQuestionLvl2 = [];
            selectedQuestionLvl3 = [];
            selectedQuestionLvl4 = [];
            lastQuestionLvl1 = false;
            game.assets['./sounds/openTheme.mp3'].stop();
            game.assets['./sounds/mainTheme.mp3'].play();
            game.pushScene(game.level());
        });

        //SPEED 3 BUTTON
        var speed3 = new CreateButton("⭐⭐⭐", SCREEN_WIDTH/2-85, 600);
        speed3.addEventListener(Event.TOUCH_END, function(e){
            speedSelected = 3;
            nbMistakes = 0;
            questionSelected = 1;
            levelSelected = 1;
            score = 0;
            selectedQuestionLvl1 = [];
            selectedQuestionLvl2 = [];
            selectedQuestionLvl3 = [];
            selectedQuestionLvl4 = [];
            lastQuestionLvl1 = false;
            game.assets['./sounds/openTheme.mp3'].stop();
            game.assets['./sounds/mainTheme.mp3'].play();
            game.pushScene(game.level());
        });

        return scene;
        };

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//LEVEL PAGE

        game.level = function(){
        var scene = new Scene();
        scene.backgroundColor = "lightblue";

        //VARIABLES FOR DISPLAY ANSWER
        var count = 0;
        var count2 = 0;

        //CREATE BUTTON FUNCTION
        CreateButton =  Class.create(Button, {
            initialize:function(text, x, y){
            Button.call(this, text, "blue", 70, 50);
            this._style.textAlign = 'center';
            this.font = "32px/2.3 'HGS教科書体','avenir next','Helvetica','ヒラギノ角ゴ ProN','Hiragino Kaku Gothic ProN','HG正楷書体-PRO','ＭＳ ゴシック','sans-serif'";
            this.x = x;
            this.y = y;
            scene.addChild(this);
        }
        });

        //CREATE LARGE BUTTON FUNCTION
        CreateLargeButton =  Class.create(Button, {
            initialize:function(text, x, y){
            Button.call(this, text, "blue", 70, 95);
            this._style.textAlign = 'center';
            this.font = "31px/2.3 'HGS教科書体','avenir next','Helvetica','ヒラギノ角ゴ ProN','Hiragino Kaku Gothic ProN','HG正楷書体-PRO','ＭＳ ゴシック','sans-serif'";
            this.x = x;
            this.y = y;
            scene.addChild(this);
        }
        });

        //TITLE
        var title = new Label();
        if (speedSelected == 1){
            time = TIME_LVL1;
            title.text = "⭐" + " レベル" + levelSelected;
        }
        if (speedSelected == 2){
            time = TIME_LVL2;
            title.text = "⭐⭐" + " レベル" + levelSelected;
        }
        if (speedSelected == 3){
            time = TIME_LVL3;
            title.text = "⭐⭐⭐" + " レベル" + levelSelected;
        }
        title.width = SCREEN_WIDTH*2;
        title.font = "60px/3.2 'HGS教科書体','avenir next','Helvetica','ヒラギノ角ゴ ProN','Hiragino Kaku Gothic ProN','HG正楷書体-PRO','ＭＳ ゴシック','sans-serif'";
        title.moveTo((SCREEN_WIDTH- title._boundWidth)/2, 100);
        scene.addChild(title);

        //COUNTDOWN
        var timer = new TimeLabel(0,0,'countdown');
        timer.time = time;
        scene.addChild(timer);

        //TIME VALIDITY TIME AND INITIALISATION FOR CHECK QUESTION
        scene.onenterframe = function(){
            if(timer.time < 0){
                scene.onenterframe = null;
                //LEVEL 1 CASE
                if(levelSelected == 1){
                    //GET ELEMENTS FOR LAST QUESTION
                    lastWrongQuestion = questionText;
                    lastWrongQuestionAnswer = realAnswer;
                    lastQuestionLvl1 = true;
                    arrayLastQuestion = arrayQuestion;
                }
                //OTHER CASES
                if(levelSelected != 1){
                    //GET ELEMENTS FOR LAST QUESTION
                    lastWrongQuestion = questionText;
                    lastWrongQuestionAnswer = realAnswer;
                    lastWrongQuestionAnswer2 =realAnswer2;
                    arrayLastQuestion = arrayQuestion;
                }
                game.replaceScene(game.results())
            }
        }

        //BACK BUTTON
        var back = new Sprite(76, 64);
        back.image = game.assets['./images/back.png'];
        back.scale(0.5, 0.5);
        back.moveTo(SCREEN_WIDTH-100, 10);
        back.addEventListener(Event.TOUCH_END, function(e){
            game.popScene(game.speedSelection());
            game.assets['./sounds/mainTheme.mp3'].stop();
            game.assets['./sounds/openTheme.mp3'].play();
        });
        scene.addChild(back);

        //INITIALISATION OF ANSWERS
        var answer = '?';
        var answer2 = '?';

        //ANSWER PANEL

        //BUTTON 1
        var answerButton1 = new CreateButton("1", 75, SCREEN_HEIGHT/1.4);
        answerButton1.addEventListener(Event.TOUCH_END, function(e){
            if(answer!='?'){answer2=1}
            else{answer=1}
        });

        //BUTTON 2
        var answerButton2 = new CreateButton("2", 75+(105*1), SCREEN_HEIGHT/1.4);
        answerButton2.addEventListener(Event.TOUCH_END, function(e){
            if(answer!='?'){answer2=2}
            else{answer=2}
        });

        //BUTTON 3
        var answerButton3 = new CreateButton("3", 75+(105*2), SCREEN_HEIGHT/1.4);
        answerButton3.addEventListener(Event.TOUCH_END, function(e){
            if(answer!='?'){answer2=3}
            else{answer=3}
        });

        //BUTTON 4
        var answerButton4 = new CreateButton("4", 75+(105*3), SCREEN_HEIGHT/1.4);
        answerButton4.addEventListener(Event.TOUCH_END, function(e){
            if(answer!='?'){answer2=4}
            else{answer=4}
        });

        //BUTTON 5
        var answerButton5 = new CreateButton("5", 75+(105*4), SCREEN_HEIGHT/1.4);
        answerButton5.addEventListener(Event.TOUCH_END, function(e){
            if(answer!='?'){answer2=5}
            else{answer=5}
        });

        //BUTTON C
        var buttonC = new CreateLargeButton("C", 75+(105*5), SCREEN_HEIGHT/1.4);
            buttonC.addEventListener(Event.TOUCH_END, function(e){
                answer = '?';
                answer2 = '?';
        });

        //BUTTON 6
        var answerButton6 = new CreateButton("6", 75, SCREEN_HEIGHT/1.2);
        answerButton6.addEventListener(Event.TOUCH_END, function(e){
            if(answer!='?'){answer2=6}
            else{answer=6}
        });

        //BUTTON 7
        var answerButton7 = new CreateButton("7", 75+(105*1), SCREEN_HEIGHT/1.2);
        answerButton7.addEventListener(Event.TOUCH_END, function(e){
            if(answer!='?'){answer2=7}
            else{answer=7}
        });

        //BUTTON 8
        var answerButton8 = new CreateButton("8", 75+(105*2), SCREEN_HEIGHT/1.2);
        answerButton8.addEventListener(Event.TOUCH_END, function(e){
            if(answer!='?'){answer2=8}
            else{answer=8}
        });

        //BUTTON 9
        var answerButton9 = new CreateButton("9", 75+(105*3), SCREEN_HEIGHT/1.2);
        answerButton9.addEventListener(Event.TOUCH_END, function(e){
            if(answer!='?'){answer2=9}
            else{answer=9}
        });

        //BUTTON 0
        var answerButton0 = new CreateButton("0", 75+(105*4), SCREEN_HEIGHT/1.2);
        answerButton0.addEventListener(Event.TOUCH_END, function(e){
            if(answer!='?'){answer2=0}
            else{answer=0}
        });

        //INDICE BUTTON
        var hintoButton = new CreateLargeButton("ヒント", 75+(105*5), SCREEN_HEIGHT/1.2);
        hintoButton.addEventListener(Event.TOUCH_END, function(e){
            //TO POP AND DEPOP THE ADVICE
            if(indiceLabel.text != ''){
                indiceLabel.text = '';
            }
            //TO CALCULATE THE ADVICE
            else{
                for (var i = 0; i < arrayQuestion.length; i++) {
                    if(arrayQuestion[i]!='?' && arrayQuestion[i+1]!='?'){
                        if(arrayQuestion[i+1]-arrayQuestion[i]>0){
                            indiceLabel.text=arrayQuestion[i+1]-arrayQuestion[i]+'ずつふえる';
                        }
                        if(arrayQuestion[i+1]-arrayQuestion[i]<0){
                            indiceLabel.text=arrayQuestion[i]-arrayQuestion[i+1]+'ずつへる';
                        }
                    }
                }
            }

        });

        //QUESTION
        var question = new Label();
        question.width = SCREEN_WIDTH*2;

        //LEVEL 1 CASE
        if(levelSelected == 1){
            //CHECK TO NOT SAME QUESTION
            //VAR TO SELECT A QUESTION IN DATABASE
            var lineSelection = 0;

            lineSelection = Math.floor(Math.random() * level1.length);

            while(selectedQuestionLvl1.indexOf(lineSelection) != -1){
                //IF IS ALREADY IN LIST
                lineSelection = Math.floor(Math.random() * level1.length);
            }

            selectedQuestionLvl1.push(lineSelection);

            //GENERATE ANSWER AND "?"
            var numberSelection = Math.floor(Math.random() * level1[lineSelection].length-4);
            if (numberSelection<0) numberSelection = 0;

            var arrayQuestion = [[level1[lineSelection][numberSelection]],[level1[lineSelection][numberSelection+1]],[level1[lineSelection][numberSelection+2]],[level1[lineSelection][numberSelection+3]]];
            
            var answerSelection = Math.floor(Math.random() * arrayQuestion.length);

            //TO GET NUMBER UNDER 10
            while(arrayQuestion[answerSelection]>9){
                answerSelection = Math.floor(Math.random() * arrayQuestion.length);
            }

            realAnswer = arrayQuestion[answerSelection];

            arrayQuestion[answerSelection] = '?';

            //DISPLAY
            var questionText = arrayQuestion[0]+" - "+arrayQuestion[1]+" - "+arrayQuestion[2]+" - "+arrayQuestion[3];
            question.text = questionText;
        };

        //LEVEL 2 CASE
        if(levelSelected == 2){
            //CHECK TO NOT SAME QUESTION
            lineSelection = 0;

            lineSelection = Math.floor(Math.random() * level2.length);

            while(selectedQuestionLvl2.indexOf(lineSelection) != -1){
                //IF IS ALREADY IN LIST
                lineSelection = Math.floor(Math.random() * level1.length);
            }

            selectedQuestionLvl2.push(lineSelection);

            //GENERATE ANSWER AND "?"
            var numberSelection = Math.floor(Math.random() * level2[lineSelection].length-4);
            if (numberSelection<0) numberSelection = 0;

            var arrayQuestion = [[level2[lineSelection][numberSelection]],[level2[lineSelection][numberSelection+1]],[level2[lineSelection][numberSelection+2]],[level2[lineSelection][numberSelection+3]]];
            
            var answerSelection = Math.floor(Math.random() * arrayQuestion.length);

            //TO GET NUMBER UPPER 10
            while(arrayQuestion[answerSelection]<10){
                answerSelection = Math.floor(Math.random() * arrayQuestion.length);
            }

            realAnswer = Math.floor(arrayQuestion[answerSelection]/10);
            realAnswer2 = arrayQuestion[answerSelection]%10;

            arrayQuestion[answerSelection] = '?';

            //DISPLAY
            var questionText = arrayQuestion[0]+" - "+arrayQuestion[1]+" - "+arrayQuestion[2]+" - "+arrayQuestion[3];
            question.text = questionText;
        };

        //LEVEL 3 CASE
        if(levelSelected == 3){
            //CHECK TO NOT SAME QUESTION
            lineSelection = 0;

            lineSelection = Math.floor(Math.random() * level3.length);

            while(selectedQuestionLvl3.indexOf(lineSelection) != -1){
                //IF IS ALREADY IN LIST
                lineSelection = Math.floor(Math.random() * level1.length);
            }

            selectedQuestionLvl3.push(lineSelection);

            //GENERATE ANSWER AND "?"
            var numberSelection = Math.floor(Math.random() * level3[lineSelection].length-4);
            if (numberSelection<0) numberSelection = 0;

            var arrayQuestion = [[level3[lineSelection][numberSelection]],[level3[lineSelection][numberSelection+1]],[level3[lineSelection][numberSelection+2]],[level3[lineSelection][numberSelection+3]]];
            
            var answerSelection = Math.floor(Math.random() * arrayQuestion.length);

            while(arrayQuestion[answerSelection]<10){
                answerSelection = Math.floor(Math.random() * arrayQuestion.length);
            }

            realAnswer = Math.floor(arrayQuestion[answerSelection]/10);
            realAnswer2 = arrayQuestion[answerSelection]%10;

            arrayQuestion[answerSelection] = '?';

            //DISPLAY
            var questionText = arrayQuestion[0]+" - "+arrayQuestion[1]+" - "+arrayQuestion[2]+" - "+arrayQuestion[3];
            question.text = questionText;
        };

        //LEVEL 4 CASE
        if(levelSelected == 4){
            //CHECK TO NOT SAME QUESTION
            lineSelection = 0;

            lineSelection = Math.floor(Math.random() * level4.length);

            while(selectedQuestionLvl4.indexOf(lineSelection) != -1){
                //IF IS ALREADY IN LIST
                lineSelection = Math.floor(Math.random() * level1.length);
            }

            selectedQuestionLvl4.push(lineSelection);

            //GENERATE ANSWER AND "?"
            var numberSelection = Math.floor(Math.random() * level4[lineSelection].length-4);
            if (numberSelection<0) numberSelection = 0;

            var arrayQuestion = [[level4[lineSelection][numberSelection]],[level4[lineSelection][numberSelection+1]],[level4[lineSelection][numberSelection+2]],[level4[lineSelection][numberSelection+3]]];
            
            var answerSelection = Math.floor(Math.random() * arrayQuestion.length);

            while(arrayQuestion[answerSelection]<10){
                answerSelection = Math.floor(Math.random() * arrayQuestion.length);
            }

            realAnswer = Math.floor(arrayQuestion[answerSelection]/10);
            realAnswer2 = arrayQuestion[answerSelection]%10;

            arrayQuestion[answerSelection] = '?';

            //DISPLAY
            var questionText = arrayQuestion[0]+" - "+arrayQuestion[1]+" - "+arrayQuestion[2]+" - "+arrayQuestion[3];
            question.text = questionText;
        };

        question.font = "90px/3.2 'HGS教科書体','avenir next','Helvetica','ヒラギノ角ゴ ProN','Hiragino Kaku Gothic ProN','HG正楷書体-PRO','ＭＳ ゴシック','sans-serif'";
        question.moveTo((SCREEN_WIDTH- question._boundWidth)/2, 200);
        scene.addChild(question);

        //ANSWER
        var answerLabel = new Label();
        answerLabel.font = "60px/3.2 'HGS教科書体','avenir next','Helvetica','ヒラギノ角ゴ ProN','Hiragino Kaku Gothic ProN','HG正楷書体-PRO','ＭＳ ゴシック','sans-serif'";
        answerLabel.moveTo((SCREEN_WIDTH-275)/2, 350);
        scene.addChild(answerLabel);

        //ADVICE
        var indiceLabel = new Label();
        indiceLabel.width = SCREEN_WIDTH*2;
        indiceLabel.font = "60px/3.2 'HGS教科書体','avenir next','Helvetica','ヒラギノ角ゴ ProN','Hiragino Kaku Gothic ProN','HG正楷書体-PRO','ＭＳ ゴシック','sans-serif'";
        indiceLabel.moveTo(((SCREEN_WIDTH- indiceLabel._boundWidth)/2)-50, 500);
        scene.addChild(indiceLabel);

        //ANSWER VALIDITY TEST
        scene.addEventListener('enterframe', function () {

            //CORRECT ADVICE POSITION (CENTER IT)
            indiceLabel.moveTo(((SCREEN_WIDTH- indiceLabel._boundWidth)/2)+5, 500);

            //LEVEL 1 CASE
            if(levelSelected == 1){
                //DISPLAY
                answerLabel.text = "こたえ : "+answer;
                //CORRECT
                if(answer == realAnswer){
                    count ++;
                    if(count>30){
                        count = 0;
                        game.assets['./sounds/correct.mp3'].play();
                        answer = "?";
                        answer2 = "?";
                        score++;
                        questionSelected ++;
                        if (questionSelected==6){
                            questionSelected=1;
                            levelSelected++;
                        }
                        game.replaceScene(game.level());  
                    }
                }
                //INCORRECT
                if(answer != realAnswer && answer != '?'){
                    count2 ++;
                    if (count2>30){
                        count2=0;
                        game.assets['./sounds/incorrect.mp3'].play();
                        nbMistakes ++;
                        timer.time --;
                        answer = '?';
                    }
                    
                }
            }

            //OTHERS CASES
            else{
                //DISPLAY
                answerLabel.text = "こたえ: "+answer+" "+answer2;
                //CORRECT
                if(answer == realAnswer && answer2 == realAnswer2){
                    count++;
                    if(count>30){
                        count=0;
                        game.assets['./sounds/correct.mp3'].play();
                        answer = "?";
                        answer2 = "?";
                        score++;
                        questionSelected ++;
                        if (questionSelected==6){
                            questionSelected=1;
                            levelSelected++;
                            if (levelSelected==5) game.replaceScene(game.clear());
                            else game.replaceScene(game.level());
                        }
                        else game.replaceScene(game.level());
                    }
                    
                }
                //INCORRECT
                if(answer != '?' && answer2 != '?'){
                    count2++;
                    if(count2>30){
                        count2=0;
                        if(answer!=realAnswer || answer2!= realAnswer2){
                            game.assets['./sounds/incorrect.mp3'].play();
                            nbMistakes++;
                            timer.time--;
                            answer = '?';
                            answer2 = '?';
                        }
                    }
                }
            }
        });

        return scene;
        };

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------        
//RESULTS PAGE (NOT CLEAR)

    game.results = function(){
        var scene = new Scene();
        scene.backgroundColor = "lightblue";

        //TO CHANGE MUSIC
        game.assets['./sounds/mainTheme.mp3'].stop();
        game.assets['./sounds/results.mp3'].play();

        //CREATE BUTTON FUNCTION
        CreateButton =  Class.create(Button, {
            initialize:function(text, x, y){
            Button.call(this, text, "blue", 100, 150);
            this._style.textAlign = 'center';
            this.font = "32px/3.2 'HGS教科書体','avenir next','Helvetica','ヒラギノ角ゴ ProN','Hiragino Kaku Gothic ProN','HG正楷書体-PRO','ＭＳ ゴシック','sans-serif'";
            this.x = x;
            this.y = y;
            scene.addChild(this);
        }
        });

        //BACK BUTTON
        var back = new Sprite(76, 64);
        back.image = game.assets['./images/back.png'];
        back.scale(0.5, 0.5);
        back.moveTo(SCREEN_WIDTH-100, 10);
        back.addEventListener(Event.TOUCH_END, function(e){
            game.replaceScene(game.speedSelection());
            game.assets['./sounds/results.mp3'].stop();
            game.assets['./sounds/openTheme.mp3'].play();
        });
        scene.addChild(back);

        //SCORE
        var scoreDisplay = new Label();
        scoreDisplay.text = "スコア: "+score;
        scoreDisplay.font = "60px/3.2 'HGS教科書体','avenir next','Helvetica','ヒラギノ角ゴ ProN','Hiragino Kaku Gothic ProN','HG正楷書体-PRO','ＭＳ ゴシック','sans-serif'";
        scoreDisplay.moveTo((SCREEN_WIDTH- scoreDisplay._boundWidth)/2, 200);
        scene.addChild(scoreDisplay);

        //MISTAKES
        var mistakeDisplay = new Label();
        mistakeDisplay.text = "エラー: "+nbMistakes;
        mistakeDisplay.font = "60px/3.2 'HGS教科書体','avenir next','Helvetica','ヒラギノ角ゴ ProN','Hiragino Kaku Gothic ProN','HG正楷書体-PRO','ＭＳ ゴシック','sans-serif'";
        mistakeDisplay.moveTo((SCREEN_WIDTH- mistakeDisplay._boundWidth)/2, 320);
        scene.addChild(mistakeDisplay);

        //CHECK BUTTON
        var check = new CreateButton("チェック", SCREEN_WIDTH/2-85, 500);
            check.addEventListener(Event.TOUCH_END, function(e){
            game.replaceScene(game.checkPage());
        });
        
        return scene;
        };

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------        
//CLEAR LEVEL PAGE

    game.clear = function(){
        var scene = new Scene();
        scene.backgroundColor = "lightblue";

        //TO CHANGE MUSIC
        game.assets['./sounds/mainTheme.mp3'].stop();
        game.assets['./sounds/clear.mp3'].play();

        //CREATE BUTTON FUNCTION
        CreateButton =  Class.create(Button, {
            initialize:function(text, x, y){
            Button.call(this, text, "blue", 100, 150);
            this._style.textAlign = 'center';
            this.font = "32px/3.2 'HGS教科書体','avenir next','Helvetica','ヒラギノ角ゴ ProN','Hiragino Kaku Gothic ProN','HG正楷書体-PRO','ＭＳ ゴシック','sans-serif'";
            this.x = x;
            this.y = y;
            scene.addChild(this);
        }
        });

        //TITLE
        var title = new Label();
        title.width = SCREEN_WIDTH*2;
        title.text = "すばらしい、";
        title.font = "70px/3.2 'HGS教科書体','avenir next','Helvetica','ヒラギノ角ゴ ProN','Hiragino Kaku Gothic ProN','HG正楷書体-PRO','ＭＳ ゴシック','sans-serif'";
        title.moveTo((SCREEN_WIDTH- title._boundWidth)/2+35, 100);
        scene.addChild(title);

        //TITLE (2nd line)
        var title2 = new Label();
        title2.width = SCREEN_WIDTH*2;
        title2.text = "よくできました！ 🎉";
        title2.font = "70px/3.2 'HGS教科書体','avenir next','Helvetica','ヒラギノ角ゴ ProN','Hiragino Kaku Gothic ProN','HG正楷書体-PRO','ＭＳ ゴシック','sans-serif'";
        title2.moveTo((SCREEN_WIDTH- title2._boundWidth)/2, 190);
        scene.addChild(title2);

        //LEVEL CLEAR
        var levelClear = new Label();
        if (speedSelected == 1){
            levelClear.text = "⭐";
        }
        if (speedSelected == 2){
            levelClear.text = "⭐⭐";
        }
        if (speedSelected == 3){
            levelClear.text = "⭐⭐⭐";
        }
        levelClear.font = "40px/3.2 'HGS教科書体','avenir next','Helvetica','ヒラギノ角ゴ ProN','Hiragino Kaku Gothic ProN','HG正楷書体-PRO','ＭＳ ゴシック','sans-serif'";
        levelClear.moveTo((SCREEN_WIDTH- levelClear._boundWidth)/2, 330);
        scene.addChild(levelClear);

        //SCORE
        var scoreDisplay = new Label();
        scoreDisplay.text = "スコア: "+score;
        scoreDisplay.font = "60px/3.2 'HGS教科書体','avenir next','Helvetica','ヒラギノ角ゴ ProN','Hiragino Kaku Gothic ProN','HG正楷書体-PRO','ＭＳ ゴシック','sans-serif'";
        scoreDisplay.moveTo((SCREEN_WIDTH- scoreDisplay._boundWidth)/2, 400);
        scene.addChild(scoreDisplay);

        //MISTAKES
        var mistakeDisplay = new Label();
        mistakeDisplay.text = "エラー: "+nbMistakes;
        mistakeDisplay.font = "60px/3.2 'HGS教科書体','avenir next','Helvetica','ヒラギノ角ゴ ProN','Hiragino Kaku Gothic ProN','HG正楷書体-PRO','ＭＳ ゴシック','sans-serif'";
        mistakeDisplay.moveTo((SCREEN_WIDTH- mistakeDisplay._boundWidth)/2, 490);
        scene.addChild(mistakeDisplay);

        //BACK BUTTON
        var back = new Sprite(76, 64);
        back.image = game.assets['./images/back.png'];
        back.scale(0.5, 0.5);
        back.moveTo(SCREEN_WIDTH-100, 10);
        back.addEventListener(Event.TOUCH_END, function(e){
            game.replaceScene(game.speedSelection());
            game.assets['./sounds/clear.mp3'].stop();
            game.assets['./sounds/openTheme.mp3'].play();
        });
        scene.addChild(back);

        //START BUTTON
        var start = new CreateButton("►", SCREEN_WIDTH/2-85, 650);
        start.addEventListener(Event.TOUCH_END, function(e){
            game.replaceScene(game.speedSelection());
            game.assets['./sounds/clear.mp3'].stop();
            game.assets['./sounds/openTheme.mp3'].play();

        });

        return scene;
        };

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------        
//CHECK QUESTION PAGE

    game.checkPage = function(){
        var scene = new Scene();
        scene.backgroundColor = "lightblue";
        var count = 0;
        var count2 = 0;

        //TO CHANGE MUSIC
        game.assets['./sounds/results.mp3'].stop();
        game.assets['./sounds/mainTheme.mp3'].play();

        //CREATE BUTTON FUNCTION
        CreateButton =  Class.create(Button, {
            initialize:function(text, x, y){
            Button.call(this, text, "blue", 70, 50);
            this._style.textAlign = 'center';
            this.font = "32px/2.3 'HGS教科書体','avenir next','Helvetica','ヒラギノ角ゴ ProN','Hiragino Kaku Gothic ProN','HG正楷書体-PRO','ＭＳ ゴシック','sans-serif'";
            this.x = x;
            this.y = y;
            scene.addChild(this);
        }
        });

        //CREATE LARGE BUTTON FUNCTION
        CreateLargeButton =  Class.create(Button, {
            initialize:function(text, x, y){
            Button.call(this, text, "blue", 70, 95);
            this._style.textAlign = 'center';
            this.font = "31px/2.3 'HGS教科書体','avenir next','Helvetica','ヒラギノ角ゴ ProN','Hiragino Kaku Gothic ProN','HG正楷書体-PRO','ＭＳ ゴシック','sans-serif'";
            this.x = x;
            this.y = y;
            scene.addChild(this);
        }
        });

        //TITLE
        var title = new Label();
        title.text = "チェック";
        title.width = SCREEN_WIDTH*2;
        title.font = "50px/3.2 'HGS教科書体','avenir next','Helvetica','ヒラギノ角ゴ ProN','Hiragino Kaku Gothic ProN','HG正楷書体-PRO','ＭＳ ゴシック','sans-serif'";
        title.moveTo((SCREEN_WIDTH- title._boundWidth)/2, 50);
        scene.addChild(title);

        //BACK BUTTON
        var back = new Sprite(76, 64);
        back.image = game.assets['./images/back.png'];
        back.scale(0.5, 0.5);
        back.moveTo(SCREEN_WIDTH-100, 10);
        back.addEventListener(Event.TOUCH_END, function(e){
            game.popScene(game.speedSelection());
            game.assets['./sounds/mainTheme.mp3'].stop();
            game.assets['./sounds/openTheme.mp3'].play();
        });
        scene.addChild(back);

        //INITIALISATION OF ANSWERS
        var answer = '?';
        var answer2 = '?';

        //BUTTON 1
        var answerButton1 = new CreateButton("1", 75, SCREEN_HEIGHT/1.4);
        answerButton1.addEventListener(Event.TOUCH_END, function(e){
            if(answer!='?'){answer2=1}
            else{answer=1}
        });

        //BUTTON 2
        var answerButton2 = new CreateButton("2", 75+(105*1), SCREEN_HEIGHT/1.4);
        answerButton2.addEventListener(Event.TOUCH_END, function(e){
            if(answer!='?'){answer2=2}
            else{answer=2}
        });

        //BUTTON 3
        var answerButton3 = new CreateButton("3", 75+(105*2), SCREEN_HEIGHT/1.4);
        answerButton3.addEventListener(Event.TOUCH_END, function(e){
            if(answer!='?'){answer2=3}
            else{answer=3}
        });

        //BUTTON 4
        var answerButton4 = new CreateButton("4", 75+(105*3), SCREEN_HEIGHT/1.4);
        answerButton4.addEventListener(Event.TOUCH_END, function(e){
            if(answer!='?'){answer2=4}
            else{answer=4}
        });

        //BUTTON 5
        var answerButton5 = new CreateButton("5", 75+(105*4), SCREEN_HEIGHT/1.4);
        answerButton5.addEventListener(Event.TOUCH_END, function(e){
            if(answer!='?'){answer2=5}
            else{answer=5}
        });

        //BUTTON C
        var buttonC = new CreateLargeButton("C", 75+(105*5), SCREEN_HEIGHT/1.4);
            buttonC.addEventListener(Event.TOUCH_END, function(e){
                answer = '?';
                answer2 = '?';
        });

        //BUTTON 6
        var answerButton6 = new CreateButton("6", 75, SCREEN_HEIGHT/1.2);
        answerButton6.addEventListener(Event.TOUCH_END, function(e){
            if(answer!='?'){answer2=6}
            else{answer=6}
        });

        //BUTTON 7
        var answerButton7 = new CreateButton("7", 75+(105*1), SCREEN_HEIGHT/1.2);
        answerButton7.addEventListener(Event.TOUCH_END, function(e){
            if(answer!='?'){answer2=7}
            else{answer=7}
        });

        //BUTTON 8
        var answerButton8 = new CreateButton("8", 75+(105*2), SCREEN_HEIGHT/1.2);
        answerButton8.addEventListener(Event.TOUCH_END, function(e){
            if(answer!='?'){answer2=8}
            else{answer=8}
        });

        //BUTTON 9
        var answerButton9 = new CreateButton("9", 75+(105*3), SCREEN_HEIGHT/1.2);
        answerButton9.addEventListener(Event.TOUCH_END, function(e){
            if(answer!='?'){answer2=9}
            else{answer=9}
        });

        //BUTTON 0
        var answerButton0 = new CreateButton("0", 75+(105*4), SCREEN_HEIGHT/1.2);
        answerButton0.addEventListener(Event.TOUCH_END, function(e){
            if(answer!='?'){answer2=0}
            else{answer=0}
        });

        //INDICE BUTTON
        var hintoButton = new CreateLargeButton("ヒント", 75+(105*5), SCREEN_HEIGHT/1.2);
        hintoButton.addEventListener(Event.TOUCH_END, function(e){
            //TO POP AND DEPOP THE ADVICE
            if(indiceLabel.text != ''){
                indiceLabel.text = '';
            }
            //TO CALCULATE THE ADVICE
            else{
                for (var i = 0; i < arrayLastQuestion.length; i++) {
                    if(arrayLastQuestion[i]!='?' && arrayLastQuestion[i+1]!='?'){
                        if(arrayLastQuestion[i+1]-arrayLastQuestion[i]>0){
                            indiceLabel.text=arrayLastQuestion[i+1]-arrayLastQuestion[i]+'ずつふえる';
                        }
                        if(arrayLastQuestion[i+1]-arrayLastQuestion[i]<0){
                            indiceLabel.text=arrayLastQuestion[i]-arrayLastQuestion[i+1]+'ずつへる';
                        }
                    }
                }
            }

        });

        //QUESTION
        var question = new Label();
        question.width = SCREEN_WIDTH*2;
        question.text = lastWrongQuestion;
        question.font = "90px/3.2 'HGS教科書体','avenir next','Helvetica','ヒラギノ角ゴ ProN','Hiragino Kaku Gothic ProN','HG正楷書体-PRO','ＭＳ ゴシック','sans-serif'";
        question.moveTo((SCREEN_WIDTH- question._boundWidth)/2, 200);
        scene.addChild(question);

        //ANSWER
        var answerLabel = new Label();
        answerLabel.font = "60px/3.2 'HGS教科書体','avenir next','Helvetica','ヒラギノ角ゴ ProN','Hiragino Kaku Gothic ProN','HG正楷書体-PRO','ＭＳ ゴシック','sans-serif'";
        answerLabel.moveTo((SCREEN_WIDTH-275)/2, 350);
        scene.addChild(answerLabel);

        //ADVICE
        var indiceLabel = new Label();
        indiceLabel.width = SCREEN_WIDTH*2;
        indiceLabel.font = "60px/3.2 'HGS教科書体','avenir next','Helvetica','ヒラギノ角ゴ ProN','Hiragino Kaku Gothic ProN','HG正楷書体-PRO','ＭＳ ゴシック','sans-serif'";
        indiceLabel.moveTo(((SCREEN_WIDTH- indiceLabel._boundWidth)/2)-50, 500);
        scene.addChild(indiceLabel);

        //ANSWER VALIDITY TEST
        scene.addEventListener('enterframe', function () {

            //CORRECT ADVICE POSITION
            indiceLabel.moveTo(((SCREEN_WIDTH- indiceLabel._boundWidth)/2)+5, 500);

            //LEVEL 1 CASE
            if(lastQuestionLvl1 == true){
                answerLabel.text = "こたえ : "+answer;
                if(answer == lastWrongQuestionAnswer){
                    count ++;
                    if(count>30){
                        count=0;
                        game.assets['./sounds/correct.mp3'].play();
                        answer = "?";
                        answer2 = "?";
                        game.replaceScene(game.checkClear());
                    }
                    
                }
                if(answer != lastWrongQuestionAnswer && answer != '?'){
                    count2++;
                    if(count2>30){
                        count2=0;
                        game.assets['./sounds/incorrect.mp3'].play();
                        answer = '?';
                    }
                }
            }

            //OTHER CASES
            else{
                answerLabel.text = "こたえ: "+answer+" "+answer2;
                if(answer == lastWrongQuestionAnswer && answer2 == lastWrongQuestionAnswer2){
                    count++;
                    if (count>30){
                        count=0;
                        game.assets['./sounds/correct.mp3'].play();
                        answer = "?";
                        answer2 = "?";
                        game.replaceScene(game.checkClear());
                    }
                }
                if(answer != '?' && answer2 != '?'){
                    count2++;
                    if(count2>30){
                        count2=0;
                        if(answer!=lastWrongQuestionAnswer || answer2!= lastWrongQuestionAnswer2){
                            game.assets['./sounds/incorrect.mp3'].play();
                            answer = '?';
                            answer2 = '?';
                        }
                    }
                }

            }
        });

        return scene;
        };

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------        
//CLEAR LEVEL PAGE AFTER CHECK QUESTION

    game.checkClear = function(){
        var scene = new Scene();
        scene.backgroundColor = "lightblue";

        //TO CHANGE MUIC
        game.assets['./sounds/mainTheme.mp3'].stop();
        game.assets['./sounds/clear.mp3'].play();

        //CREATE BUTTON
        CreateButton =  Class.create(Button, {
            initialize:function(text, x, y){
            Button.call(this, text, "blue", 100, 150);
            this._style.textAlign = 'center';
            this.font = "32px/3.2 'HGS教科書体','avenir next','Helvetica','ヒラギノ角ゴ ProN','Hiragino Kaku Gothic ProN','HG正楷書体-PRO','ＭＳ ゴシック','sans-serif'";
            this.x = x;
            this.y = y;
            scene.addChild(this);
        }
        });

        //TITLE
        var title = new Label();
        title.width = SCREEN_WIDTH*2;
        title.text = "すばらしい、";
        title.font = "70px/3.2 'HGS教科書体','avenir next','Helvetica','ヒラギノ角ゴ ProN','Hiragino Kaku Gothic ProN','HG正楷書体-PRO','ＭＳ ゴシック','sans-serif'";
        title.moveTo((SCREEN_WIDTH- title._boundWidth)/2+35, 150);
        scene.addChild(title);

        //TITLE (2nd line)
        var title2 = new Label();
        title2.width = SCREEN_WIDTH*2;
        title2.text = "よくできました！ 🎉";
        title2.font = "70px/3.2 'HGS教科書体','avenir next','Helvetica','ヒラギノ角ゴ ProN','Hiragino Kaku Gothic ProN','HG正楷書体-PRO','ＭＳ ゴシック','sans-serif'";
        title2.moveTo((SCREEN_WIDTH- title2._boundWidth)/2, 275);
        scene.addChild(title2);

        //LEVEL CLEAR
        var levelClear = new Label();
        if (speedSelected == 1){
            levelClear.text = "⭐";
        }
        if (speedSelected == 2){
            levelClear.text = "⭐⭐";
        }
        if (speedSelected == 3){
            levelClear.text = "⭐⭐⭐";
        }
        levelClear.font = "40px/3.2 'HGS教科書体','avenir next','Helvetica','ヒラギノ角ゴ ProN','Hiragino Kaku Gothic ProN','HG正楷書体-PRO','ＭＳ ゴシック','sans-serif'";
        levelClear.moveTo((SCREEN_WIDTH- levelClear._boundWidth)/2, 400);
        scene.addChild(levelClear);

        //BACK BUTTON
        var back = new Sprite(76, 64);
        back.image = game.assets['./images/back.png'];
        back.scale(0.5, 0.5);
        back.moveTo(SCREEN_WIDTH-100, 10);
        back.addEventListener(Event.TOUCH_END, function(e){
            game.replaceScene(game.speedSelection());
            game.assets['./sounds/clear.mp3'].stop();
            game.assets['./sounds/openTheme.mp3'].play();
        });
        scene.addChild(back);

        //START BUTTON
        var start = new CreateButton("►", SCREEN_WIDTH/2-85, 600);
        start.addEventListener(Event.TOUCH_END, function(e){
            game.replaceScene(game.speedSelection());
            game.assets['./sounds/clear.mp3'].stop();
            game.assets['./sounds/openTheme.mp3'].play();
        });

        return scene;
        };

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    };
    //game.onload

    game.start();
};
//windows.onload