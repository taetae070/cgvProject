document.addEventListener('DOMContentLoaded',()=>{

    //모달창
    let popupDialog = document.querySelector('dialog'),
    dayCheck = document.querySelector('#oneday_close'),
    popupClose = popupDialog.querySelector('button');

    //쿠키 생성
    function setCookie(name, value, day){
        let date = new Date();
        date.setDate(date.getDate() + day);
        document.cookie = `${name}=${value};expires=${date.toUTCString()}`;
    }
    //setCookie('ABC','home',7);
    //console.log(document.cookie);

    //쿠키확인
    function checkCookie(name){
        let cookieArr = document.cookie.split(';');
        let visited = false;

        for(let cookie of cookieArr){
            if(cookie.search(name) > -1){
                visited =true;
                break;
            }
        }

        //dialog 표시여부
        if(!visited){
            popupDialog.setAttribute('open','');
        }
    }
  
    
    //쿠키삭제
   // setCookie('ABC','home', -1);

    //쿠키여부를 확인하여 dialog 표시하기
    checkCookie('ABC');

    //닫기버튼
    popupClose.addEventListener('click',()=>{
        popupDialog.removeAttribute('open');
        if(dayCheck.checked){
            setCookie('ABC', 'home', 1);
        }else{
            setCookie('ABC','home',-1); 
        }
    });

    console.log(dayCheck.checked);

    const mainVideo =  document.querySelector('.video1');
    const iframeV =  document.querySelector('iframe');
    mainVideo.addEventListener('click', () => {
        iframeV.style.display = 'block';
    })


    // 헤더 변수
    let header = document.querySelector('header'),
        gnbList = document.querySelectorAll('header .gnb > ul > li'),
        subBG = document.querySelector('header::after'),
        spth = document.querySelector('.sp_theater');
    
    // 배너 변수
    let slideWrapper = document.querySelector('.spot');
    let slideContainer = document.querySelector('.video_wrap');
    let slide = slideContainer.querySelectorAll('li');
    let slideCount = slide.length;
    let currentIdx = 0;
    let timer;
    let pager = slideWrapper.querySelector('.pager');
    let pagerHTML ='';


    // 무비차트 변수
    let movieChart = document.querySelector('.movieChart_list'),
        swiper = movieChart.querySelector('.tk'),
        poSter = swiper.querySelectorAll('li'),
        poSterCount = poSter.length,

        movieChartNF = document.querySelector('.movieChart_nf'),
                
        slideWidth = 270,
        slidemargin = 59,
        maxSlides = 4,
        moveSlide = slideWidth + slidemargin,

        btn_slide =movieChart.querySelector('.btn_slide'),
        prevBtn =btn_slide.querySelector('.prev'),
        nextBtn = btn_slide.querySelector('.next'),

        btn_Movie=document.querySelector('#btn_Movie'),
        btn_FMovie=document.querySelector('#btn_FMovie'),

        
        

        //상영에정작wrap
        swiper_Fwrap=movieChart.querySelector('.kt'),
        Fposter = swiper_Fwrap.querySelectorAll("li"),
        FpoSterCount = Fposter.length;
        
               
        
        //무비차트
        swiper.style.width= moveSlide*poSterCount-slidemargin + 'px';

        function goToSlide(idx){
            movieChartNF.style.marginLeft = `${-idx * (moveSlide * 4)}px`
            if (currentIdx==0) {
                prevBtn.classList.toggle('hidden');
                nextBtn.classList.toggle('hidden');
            } else {
                prevBtn.classList.toggle('hidden');
                nextBtn.classList.toggle('hidden');
            }
        };
            
            prevBtn.addEventListener('click',(e)=>{
                e.preventDefault();
                currentIdx = (--currentIdx + 2) % 2;
                goToSlide(currentIdx);
            })
    
    
            nextBtn.addEventListener('click',(e)=>{
                e.preventDefault();
                currentIdx = ++currentIdx % 2;
                goToSlide(currentIdx);
            })
    
        

        
        //상영예정작
        swiper_Fwrap.style.width= moveSlide*FpoSterCount-slidemargin + 'px';
        


            //무비차트만 보이게
            btn_Movie.addEventListener('click',(e)=>{
                e.preventDefault();
                e.currentTarget.classList.add('active');

                btn_FMovie.classList.remove('active');
                

                swiper.classList.remove('hidden');
                swiper_Fwrap.classList.add('hidden');

            })

             //상영예정작 클릭하면, 무비차트 안보이고 상영예정작 보이게
            btn_FMovie.addEventListener('click',(e)=>{
                e.preventDefault();
                e.currentTarget.classList.add('active');

                btn_Movie.classList.remove('active');
                

                swiper.classList.add('hidden');
                swiper_Fwrap.classList.remove('hidden');
                

            })

            
                
    // 특별관 변수
    let imgWrap = document.querySelectorAll('.img_wrap');
    let gradBtn = document.querySelectorAll('.btn_spth_n');
    
    



    // 헤더
    window.addEventListener('scroll',()=>{
        if(window.pageYOffset > spth.offsetTop-70){
            header.classList.add('scroll');
        }else{
            header.classList.remove('scroll');
        }
    });
    for(let gl of gnbList){
        gl.addEventListener('mouseover',()=>{
            header.style.borderBottomColor = 'rgba(255,255,255,.7)';
        });
        gl.addEventListener('mouseout',()=>{
            header.style.borderBottomColor = 'transparent';
        });
    }

    // fixed 버튼
    let topBtn = document.querySelector('.btn_top'),
        fxdWrap = document.querySelector('.fixedBtn_wrap');
    topBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        window.scrollTo({left:0, top:0, behavior:'smooth'});
    })
    
    window.addEventListener('scroll',()=>{
        if(window.pageYOffset > 300){
            fxdWrap.classList.add('active');
        }else{
            fxdWrap.classList.remove('active');
        }
    });

    
    // 배너
    /* 슬라이드 가로 배치하기 */
    slide.forEach((item,idx)=>{
        item.style.left = `${idx*100}%`;
        // pagerHTML = pagerHTML + `<a href="">${idx}</a>`;
        pagerHTML += `<a href="">${idx}</a>`;
    });
    pager.innerHTML = pagerHTML;
    let pagerBtn = pager.querySelectorAll('a');

    //슬라이드 이동함수 
    function goToslide(idx){
        slideContainer.style.left = `${-100*idx}%`;
        currentIdx = idx;
    }

    pagerBtn.forEach((item,idx)=>{
        item.addEventListener('click',(e)=>{
            e.preventDefault();
            goToslide(idx);
        });
    })

        // 특별관
    gradBtn.forEach((item, idx) => {
        item.addEventListener('mouseover',() => {
            gradBtn.forEach((item, idx) => {
                imgWrap[idx].style.display = "none";
            });
            imgWrap[idx].style.display = "block";
        });
        
        item.addEventListener('mouseout',() => {
            gradBtn.forEach((item, idx) => {
                imgWrap[idx].style.display = "none";
            });
        });
    });
    
    let familysiteHead = document.querySelector('.familysite_head');
    familysiteHead.addEventListener('click',(e)=>{
        let options = document.querySelector('.sel_option_list');
        if(options.style.display == 'none'){
            options.style.display = 'block'; 
        }else{
            options.style.display = 'none';
        }
    });






});
