# 설명

간단한 뮤직플레이어 컴포넌트를 만들어보았다.

- progress bar를 클릭하여 음악 재생 시점을 조절할 수 있다.
- 음악이 끝나면 자동으로 넘어간다.

# CSS

1. inherit: 말그대로 부모의 값을 상속받아서 그대로 쓰는 것이다.

```css
.parent {
  width: 100px;
}

.child {
  width: inherit;
  /* 100px 그대로 쓴다는 뜻 */
}
```

2. `position: relative` 라고 하고 `bottom,top,left,right`를 설정하면 부모를 기준으로 위치가 설정이 됨.(body가 아님!)

3. `animation-play-state:paused`라고 하면 애니메이션의 상태를 정할 수 있다. paused라고 하면 애니메이션이 말그대로 멈춘상태를 유지하는 거다.

4. calc함수 쓸때 띄어쓰기 잘 할것
   `calc(100% - 40px)` 이라고 적어야 함

5. progress바의 `width:40%`는 부모의 width 40%를 의미하는 것임.

6. progress바의 transition은 바가 채워지는 속도를 조절하기 위함임.

7. after 가상 선택자는 ghost element라고 보면 됨. 이제 좀 알겠다 ㅋㅋ

   - 참고로 가상 선택자의 위치 설정하는 방법을 유심히 봐두기. translate3d의 용법을 잘 알 수 있음.

8. img를 music-container랑 img-container 안에 넣는 이유는 밖으로 벗어나지 않게 해서 쉽게 통제하기 위함이다.

# JS

1. audio.duration/currentTime은 static이다. 고로 전역에 선언하면 안된다.

2. `progressBar.addEventListener`가 arrow function을 호출한다면 arrow Function 안에 있는 *this*는 `window`가 된다. 왜냐면 arrow function은 선언된 위치를 context로 참조하기 때문이다. 따라서 `this = progressBar`가 되게 하려면 익명함수 또는 일반 함수를 pass해야 한다. 만약 _this_ 를 바꾸고 싶다면 bind를 쓰면 된다.

3. forEach안에 element 이름을 class라고 했더니 오류가 남. keyword로 이미 쓰고 있는 이름을 parameter 이름으로 세팅하지 말자.

4. 웹을 켜자마자 audio.play() 라고 선언하면 오류가 난다. 왜냐면 browser는 기본적으로 사용자가 audio를 auto play되길 원치 않는 다고 전제하기 때문(그런이유 때문인지, play는 promise를 return 한다).

따라서, event를 추가하거나 promise.then을 통해서 구현해주자.

5. 그냥 갑자기 든 생각인데, 컴포넌트 만들 때 무조건 render안해줘도 된다. setState에서 render를 추가하지 않고 App에서 render안에 모아서 한꺼번에 해도 된다.

정답은 없다. 항상 그때그때 필요한것만 필요한때에 사용하는 습관을 들이자.

6. 역시... 처음부터 완벽하게 하려고 하지 말고, 지저분해도 좋으니깐 일단 적어보면 된다. 그럼 어느정도 가닥이 잡히게 되어있다.

7. this.setState 있는 this.playSong 메소드가 setState보다 뒤에 선언되어있는데도 실행될 수 있는 이유.

버튼을 클릭하는 순간 호출된다. 호출될때는 이미 App에 있는 모든것이 평가되어 memory안에 주소를 통해 저장되어있는 상태이다.

따라서 , 엄밀히 따지면 화면 맨 아래에서 this.setState를 부르는 격이 된다.

8. App에서 각종 부품을 관리하는 이유는 , 메소드를 만들때 필요한 모든 컴포넌트가 한 곳에 다 몰려있기 때문이다.

nav에서 play/pause를 관리하려면 컴포넌트를 또 넘겨줘야한다.

물론 깔끔해지겠지만 효율적이지 못하다는 판단이 들어서 App에서 한꺼번에 관리하기로 했다.

9. json파일을 fetch할 때 정확한 주소경로를 적자!

10. loadData가 this.setState보다 먼저 평가되었음에도 loadData안에서 this.setState를 사용가능한 이유.

- loadData는 async 함수이기 때문에 micro task queue로 넘어가기 때문.

11. 알아보니깐 `timeupdate` , `ended` 이벤트가 audio에 있었다. 담 부터는 무슨 기능을 만들기 전에 비슷한 built-in 기능을 제공하고 있는지 MDN에서 찾아보자.

12. music, images, JS, CSS 파일 경로를 제대로 명시해주자! 경로가 '/' 로 시작하면 최상위 root, 즉 깃헙페이지에서는 'https://yeonghunko.github.io/' 에서 시작한다.

근데, https://yeonghunko.github.io/music-player에서 시작해야하므로, '/'를 빼줘야 한다. 

# HTML

1. audio같은 경우는 특별하게 관리하고 싶어서 id를 설정했네.
