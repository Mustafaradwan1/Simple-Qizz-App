let model = document.querySelector('.model')
let startqizz = document.querySelector('.startqizz')
let select = document.querySelector('select')
let btnselect = document.querySelector('.btnselect')
let counts = document.querySelector('.count span')
let spans = document.querySelector('.spans')
let qizzarea = document.querySelector('.qizz-area')
let answerarea = document.querySelector('.answer-area')
let btnnext = document.querySelector('.btnnext')
let btns = document.querySelector('.btns')
let countdown = document.querySelector('.countdown')
let rusoltes = document.querySelector('.rusoltes')
let catagory = document.querySelector('.catagory span')
let box = document.querySelector('.box')

let current = 0;
let rightquestion=0;
let  intarveltime;

startqizz.addEventListener('click',()=>{
    model.style.left="-120%";
    catagory.innerHTML = select.value;
    getdata(select.value)
})

async function getdata(api){
    let getapi = await fetch(`qizz${api}.json`);
    let resalutapi = await getapi.json()
     
    const resalutrandom = resalutapi.sort((a,b)=> 0.5-Math.random())
    const resalutdata = resalutrandom.slice(0,10);
    let numlength = resalutdata.length;
    spansconuts(resalutdata.length)
    qizzdata(resalutdata[current],numlength)
    timerdown()
    btnnext.onclick = ()=>{

        let rightanswer = resalutdata[current].right_answer;
        current++
        checkanswer(rightanswer)
        answerarea.innerHTML = '';
        qizzarea.innerHTML = '';
        qizzdata(resalutdata[current],numlength)
        spanactive()
        clearInterval(intarveltime)
        timerdown()
        getresoult(numlength)
    }
}
let dataanswer ;
function qizzdata(obj,num){
    if(current < num){
        
        let titleqizz = document.createElement("h2");
        titleqizz.className = 'wow fadeInRight'
        titleqizz.innerHTML = obj.title;
        qizzarea.appendChild(titleqizz);
        for(let i = 1; i <= 4; i++){
            
            let answer = document.createElement('div')
            answer.classList = ('wow fadeInRight')
            answer.id = ('wrapper')
            let check = document.createElement('input')
            check.name = "qustion"
            check.type = "radio"
            check.id = `answer_${i}`;
            check.dataset.answer = obj[`answer_${i}`];
            let label = document.createElement('label')
            label.classList = (`option-${i}`)
            label.dataset.answer = obj[`answer_${i}`];
            label.htmlFor = `answer_${i}`;
            let divdot = document.createElement('div')
            divdot.classList = ('dot')
            let span = document.createElement('span')
            span.innerHTML =  obj[`answer_${i}`];
            label.appendChild(divdot);
            label.appendChild(span);
            answerarea.appendChild(answer);
            answer.appendChild(check)
            answer.appendChild(label)
            if(i === 1){
                check.checked = true
            }
        }
    }
}
function checkanswer(ranswer){
    let checks = document.getElementsByName('qustion')
    let getdataset ;
    for(let i = 0; i < checks.length; i++){

        if(checks[i].checked){
            getdataset = checks[i].dataset.answer
        }
    }
    if(getdataset === ranswer){
        rightquestion++
    }

}

function spansconuts(num){
    counts.innerHTML = num

for(let i = 0; i < num; i++){
let span = document.createElement('span')
if(i === 0){
    span.classList.add('active')
}
spans.appendChild(span)
}
}

function spanactive(){
    let spans = Array.from(document.querySelectorAll('.spans span'))
    spans.forEach((span,i)=>{
        if(current === i){
            span.classList = "active";
        }
    })
}

function getresoult(num){
    let resolutes;
    
    if(current === num){
        spans.remove()
        qizzarea.remove()
        answerarea.remove()
        btns.remove()
        countdown.remove()
        if(rightquestion > (num / 2) && rightquestion <= 7 ){
            resolutes = `
            <h2>good , <span class="text-danger"> ${rightquestion} </span> from <span class="text-danger">${num}</span></h2>
            <h2 class="finsh wow fadeInRight">finshed</h2>
            `
        }else if(rightquestion > 7 && rightquestion <= num){
            resolutes = `
            <h2>very good , <span class="text-danger"> ${rightquestion} </span> from <span class="text-danger">${num}</span></h2>
            <h2 class="finsh wow fadeInRight">finshed</h2>
            `
        }
        else{
            resolutes =   `
            <h2>bad , <span class="text-danger"> ${rightquestion} </span> from <span class="text-danger">${num}</span></h2>
            <h2 class="finsh wow fadeInRight">finshed</h2>
            `
            box.style.height = "200px!impotant"
        }
        rusoltes.innerHTML = resolutes;
    }
}
let timer = document.querySelector('.timer');
function timerdown(){
    let sec = 30;
    intarveltime = setInterval(() => {
        let min = Math.floor(sec / 60);
        let reSec = sec % 60;
        min = min < 10 ? `0${min}` : min;
        reSec = reSec < 10 ? `0${reSec}` : reSec;
        sec = sec > 0 ? sec-1 : sec;
        timer.innerHTML = ` ${reSec} : ${min}`;

        if(sec === 0 ){
            clearInterval(intarveltime); 
            btnnext.click()
        }

    }, 1000);
}





